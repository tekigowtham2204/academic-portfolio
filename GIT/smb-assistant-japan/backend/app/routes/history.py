from fastapi import APIRouter, Query
from pydantic import BaseModel
from app.db import supabase

router = APIRouter(tags=["history"])


class HistoryMessage(BaseModel):
    role: str
    content: str
    detected_language: str | None = None
    sources: list[str] | None = None
    created_at: str | None = None


class SaveRequest(BaseModel):
    session_id: str
    role: str
    content: str
    detected_language: str | None = None
    sources: list[str] | None = None


@router.post("/history")
async def save_message(req: SaveRequest):
    supabase.table("chat_sessions").insert(
        {
            "session_id": req.session_id,
            "role": req.role,
            "content": req.content,
            "detected_language": req.detected_language,
            "sources": req.sources or [],
        }
    ).execute()
    return {"ok": True}


@router.get("/history")
async def get_history(session_id: str = Query(...)):
    result = (
        supabase.table("chat_sessions")
        .select("role, content, detected_language, sources, created_at")
        .eq("session_id", session_id)
        .order("created_at")
        .execute()
    )
    return {"messages": result.data or []}
