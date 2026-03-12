from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["settings"])

AVAILABLE_MODELS = [
    {"id": "gpt-4o", "name": "GPT-4o"},
    {"id": "gpt-4o-mini", "name": "GPT-4o Mini"},
]

AVAILABLE_LANGUAGES = [
    {"id": "en", "label": "English"},
    {"id": "ja", "label": "日本語 (Japanese)"},
]


class SettingsResponse(BaseModel):
    models: list[dict]
    languages: list[dict]


@router.get("/settings/options", response_model=SettingsResponse)
async def get_options():
    return SettingsResponse(models=AVAILABLE_MODELS, languages=AVAILABLE_LANGUAGES)
