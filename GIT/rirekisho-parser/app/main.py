import os

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

from app.extractor import extract_resume
from app.scorer import score_candidate
from app.schemas import ResumeData, ScoreRequest, ScoreResponse

load_dotenv()

app = FastAPI(
    title="Rirekisho Parser API",
    description="Upload a Japanese rirekisho (PDF or image) and get structured JSON back.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN", "http://localhost:3000")],
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_TYPES = {
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
}


def _get_openai_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not configured")
    return OpenAI(api_key=api_key)


@app.post("/parse", response_model=ResumeData)
async def parse_resume(file: UploadFile = File(...)):
    """Accept a PDF or image of a Japanese rirekisho and return extracted fields."""

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. Accepted: PDF, PNG, JPEG, WebP.",
        )

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        client = _get_openai_client()
        result = extract_resume(file_bytes, file.content_type, client)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=422,
            detail=f"Failed to parse resume: {exc}",
        )

    return result


@app.post("/score", response_model=ScoreResponse)
async def score_resume(body: ScoreRequest):
    """Score a parsed resume against a job description."""

    try:
        client = _get_openai_client()
        result = score_candidate(body.resume, body.job_description, client)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=422,
            detail=f"Failed to score resume: {exc}",
        )

    return result


@app.get("/health")
async def health():
    return {"status": "ok"}
