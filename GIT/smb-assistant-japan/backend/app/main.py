from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload, chat, settings as settings_route, history

app = FastAPI(title="SMB Assistant Japan API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(settings_route.router, prefix="/api")
app.include_router(history.router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
