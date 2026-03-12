from app.db import supabase
from app.services.openai_service import get_embedding, get_embeddings_batch


async def store_chunks(doc_id: str, filename: str, chunks: list[str]):
    """Embed all chunks in a batch and insert into Supabase pgvector."""
    embeddings = await get_embeddings_batch(chunks)

    rows = [
        {
            "doc_id": doc_id,
            "filename": filename,
            "chunk_index": idx,
            "content": chunk,
            "embedding": embedding,
        }
        for idx, (chunk, embedding) in enumerate(zip(chunks, embeddings))
    ]

    # Insert in batches of 50 to stay within payload limits
    batch_size = 50
    for i in range(0, len(rows), batch_size):
        supabase.table("documents").insert(rows[i : i + batch_size]).execute()


async def search_similar(query: str, top_k: int = 5) -> list[dict]:
    """Embed the query and retrieve the top-k most similar chunks."""
    embedding = await get_embedding(query)
    result = supabase.rpc(
        "match_documents",
        {"query_embedding": embedding, "match_count": top_k},
    ).execute()
    return result.data or []
