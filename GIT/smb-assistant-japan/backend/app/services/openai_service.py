from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.config import settings

_embeddings = OpenAIEmbeddings(
    model=settings.embedding_model,
    openai_api_key=settings.openai_api_key,
)

_llm = ChatOpenAI(
    model=settings.chat_model,
    openai_api_key=settings.openai_api_key,
    temperature=0.4,
)


async def get_embedding(text: str) -> list[float]:
    return await _embeddings.aembed_query(text)


async def get_embeddings_batch(texts: list[str]) -> list[list[float]]:
    return await _embeddings.aembed_documents(texts)


async def chat_completion(
    messages: list[dict],
    model: str | None = None,
) -> str:
    llm = _llm
    if model and model != settings.chat_model:
        llm = ChatOpenAI(
            model=model,
            openai_api_key=settings.openai_api_key,
            temperature=0.4,
        )

    lc_messages = []
    for m in messages:
        if m["role"] == "system":
            lc_messages.append(SystemMessage(content=m["content"]))
        else:
            lc_messages.append(HumanMessage(content=m["content"]))

    resp = await llm.ainvoke(lc_messages)
    return resp.content or ""
