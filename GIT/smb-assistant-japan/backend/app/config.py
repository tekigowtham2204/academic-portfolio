from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str
    supabase_url: str
    supabase_service_key: str
    embedding_model: str = "text-embedding-3-small"
    chat_model: str = "gpt-4o"
    chunk_size: int = 512
    chunk_overlap: int = 64

    class Config:
        env_file = ".env"


settings = Settings()
