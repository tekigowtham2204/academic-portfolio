from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from langdetect import detect, LangDetectException
from app.services.vector_store import search_similar
from app.services.openai_service import chat_completion
from app.services.rate_limiter import check_rate_limit

router = APIRouter(tags=["chat"])

SYSTEM_PROMPTS = {
    "ja": (
        "あなたは日本の中小企業向けの丁寧なビジネスアシスタントです。"
        "必ず日本語の敬語（です・ます調）で回答してください。"
        "簡潔かつ正確に、プロフェッショナルな対応をお願いします。"
        "不明な点がある場合は、その旨を明確にお伝えください。"
    ),
    "en": (
        "You are a helpful business assistant for a small Japanese company. "
        "Always respond fully in English. Use a professional tone. "
        "Be concise, accurate, and clear. "
        "If you are unsure, say so clearly."
    ),
}


def detect_language(text: str) -> str:
    """Detect whether the input is Japanese or English.

    Returns 'ja' or 'en'. Defaults to 'en' if detection is ambiguous.
    """
    try:
        lang = detect(text)
        return "ja" if lang == "ja" else "en"
    except LangDetectException:
        return "en"


class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    model: str | None = None


class ChatResponse(BaseModel):
    reply: str
    sources: list[str]
    detected_language: str


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, request: Request, _rl=Depends(check_rate_limit)):
    # 1. Detect input language
    detected = detect_language(req.message)

    # 2. Retrieve top 5 similar chunks
    results = await search_similar(req.message, top_k=5)
    context_parts = [r["content"] for r in results if r.get("content")]
    source_files = list({r["filename"] for r in results if r.get("filename")})
    context_text = "\n---\n".join(context_parts) if context_parts else "No documents found."

    # 3. Build context-augmented prompt with language-specific system prompt
    messages = [
        {"role": "system", "content": SYSTEM_PROMPTS[detected]},
        {
            "role": "system",
            "content": f"Relevant context from uploaded documents:\n{context_text}",
        },
        {"role": "user", "content": req.message},
    ]

    # 4. Send to GPT-4o
    reply = await chat_completion(messages, model=req.model)
    return ChatResponse(reply=reply, sources=source_files, detected_language=detected)
