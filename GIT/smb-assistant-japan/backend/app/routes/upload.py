import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.document import (
    extract_text_from_pdf,
    extract_text_from_txt,
    chunk_text,
)
from app.services.vector_store import store_chunks
from app.config import settings

router = APIRouter(tags=["upload"])

ALLOWED_TYPES = {
    "application/pdf": "pdf",
    "text/plain": "txt",
}


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    content_type = file.content_type or ""
    if content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and TXT files are supported.",
        )

    file_bytes = await file.read()
    if len(file_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be under 10 MB.")

    file_type = ALLOWED_TYPES[content_type]
    if file_type == "pdf":
        text = extract_text_from_pdf(file_bytes)
    else:
        text = extract_text_from_txt(file_bytes)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from file.")

    chunks = chunk_text(
        text,
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
    )

    doc_id = str(uuid.uuid4())
    await store_chunks(doc_id, file.filename or "untitled", chunks)

    return {
        "doc_id": doc_id,
        "filename": file.filename,
        "chunks": len(chunks),
        "message": "Document uploaded and indexed successfully.",
    }
