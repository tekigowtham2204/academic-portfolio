-- Supabase SQL: run this in the Supabase SQL Editor to set up the documents table and search function.

-- Enable the pgvector extension
create extension if not exists vector;

-- Documents table
create table if not exists documents (
  id bigserial primary key,
  doc_id text not null,
  filename text not null,
  chunk_index integer not null,
  content text not null,
  embedding vector(1536),
  created_at timestamptz default now()
);

-- Index for fast vector search
create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Similarity search function
create or replace function match_documents(
  query_embedding vector(1536),
  match_count int default 5
)
returns table (
  id bigint,
  doc_id text,
  filename text,
  chunk_index integer,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
    select
      d.id,
      d.doc_id,
      d.filename,
      d.chunk_index,
      d.content,
      1 - (d.embedding <=> query_embedding) as similarity
    from documents d
    order by d.embedding <=> query_embedding
    limit match_count;
end;
$$;

-- ============================================================
-- Chat history table
-- ============================================================
create table if not exists chat_sessions (
  id bigserial primary key,
  session_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  detected_language text,
  sources text[],
  created_at timestamptz default now()
);

create index if not exists chat_sessions_session_idx
  on chat_sessions (session_id, created_at);

-- ============================================================
-- Rate limiting table
-- ============================================================
create table if not exists rate_limits (
  id bigserial primary key,
  ip_address text not null,
  created_at timestamptz default now()
);

create index if not exists rate_limits_ip_day_idx
  on rate_limits (ip_address, created_at);
