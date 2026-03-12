from datetime import datetime, timezone, timedelta
from fastapi import Request, HTTPException
from app.db import supabase

DAILY_LIMIT = 50


async def check_rate_limit(request: Request):
    """Allow max 50 queries per day per client IP."""
    forwarded = request.headers.get("x-forwarded-for")
    ip = forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else "unknown")

    day_start = datetime.now(timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0
    ).isoformat()

    result = (
        supabase.table("rate_limits")
        .select("id", count="exact")
        .eq("ip_address", ip)
        .gte("created_at", day_start)
        .execute()
    )

    count = result.count if result.count is not None else 0
    if count >= DAILY_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Maximum 50 queries per day.",
        )

    supabase.table("rate_limits").insert({"ip_address": ip}).execute()
