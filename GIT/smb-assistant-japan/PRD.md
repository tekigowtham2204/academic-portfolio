# PRD — SMB Assistant Japan

**Version:** 1.0  
**Author:** Gowtham Tek  
**Date:** 2025-01  
**Status:** V1 Shipped

---

## 1. Problem Statement

Small and medium businesses (SMBs) in Japan accumulate operational documents—contracts, manuals, invoices, HR policies—across PDF and text files but lack an affordable, bilingual way to query them. Staff waste time searching manually, and existing enterprise tools are English-only, expensive, or require IT support to configure.

## 2. Target Users

| Persona | Description |
|---------|-------------|
| **SMB Owner / Manager** | Non-technical, may be Japanese-only. Needs quick answers from uploaded business docs without reading entire files. |
| **Back-office Staff** | Handles finance, HR, compliance. Needs to find clauses, amounts, or policy details across many PDFs. |
| **Bilingual Consultant** | Works with Japanese SMBs in English. Needs seamless EN/JA switching without separate tools. |

## 3. Success Metrics

| Metric | Target (V1) |
|--------|-------------|
| Upload-to-first-answer time | < 60 seconds |
| Answer relevance (manual review) | ≥ 80% rated "useful" |
| Language detection accuracy | ≥ 95% for JA / EN |
| Uptime (Railway + Vercel) | 99% monthly |
| Daily active sessions | Track via Supabase (baseline) |

## 4. V1 Scope

### In Scope

| Feature | Detail |
|---------|--------|
| Document upload | PDF and TXT via drag-and-drop; 10 MB max; text extraction (PyPDF2) |
| Chunking & embedding | LangChain `RecursiveCharacterTextSplitter` — 512 tokens, 64 overlap, `cl100k_base`; `text-embedding-3-small` |
| Vector storage | Supabase pgvector; `match_documents` RPC for cosine similarity, top-5 retrieval |
| RAG chat | GPT-4o with context-injected system prompt; streaming not in V1 |
| Language detection | `langdetect` on every user message; auto-switch between keigo JA and professional EN prompts |
| Chat history | Per-session persistence in `chat_sessions` table; reloads on revisit within same tab |
| PDF export | jsPDF client-side export of full conversation |
| Rate limiting | 50 queries / day / IP; 429 HTTP error with message |
| Error boundary | React error boundary with bilingual friendly card |
| Settings | Language preference (ja/en/auto) and model selection (gpt-4o) |
| Deploy | Backend on Railway (Procfile + nixpacks); Frontend on Vercel |

### Out of Scope (V2+)

- Streaming / token-by-token response display
- Multi-user authentication (Supabase Auth)
- OCR for scanned PDFs (e.g. Tesseract, Azure Document Intelligence)
- Fine-tuned or local models
- Team workspaces with shared document libraries
- Usage analytics dashboard
- Mobile-native app
- Automated test suite (Playwright, pytest)

## 5. Technical Architecture

```
┌───────────────┐     HTTPS      ┌──────────────────┐
│  Next.js 14   │  ──────────▸   │   FastAPI         │
│  Tailwind CSS │  ◂──────────   │   LangChain       │
│  (Vercel)     │                │   langdetect      │
└───────────────┘                │   (Railway)       │
                                 └────────┬─────────┘
                                          │
                              ┌───────────▼───────────┐
                              │      Supabase          │
                              │  pgvector · sessions   │
                              │  rate_limits           │
                              └────────────────────────┘
                                          │
                              ┌───────────▼───────────┐
                              │      OpenAI API        │
                              │  text-embedding-3-small│
                              │  GPT-4o               │
                              └────────────────────────┘
```

## 6. Data Model

### `documents` (pgvector)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| content | text | Chunk text |
| metadata | jsonb | source filename, page |
| embedding | vector(1536) | text-embedding-3-small |

### `chat_sessions`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| session_id | text | Client-generated UUID |
| role | text | user / assistant |
| content | text | Message body |
| detected_language | text | ja / en |
| sources | text[] | Referenced doc names |
| created_at | timestamptz | Auto |

### `rate_limits`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| ip_address | text | Client IP |
| created_at | timestamptz | Auto; indexed for daily count |

## 7. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| OpenAI rate limits / outages | Error boundary + user-facing retry; rate limiter reduces our own load |
| Large PDF uploads stalling | 10 MB hard limit; chunked embedding in batches of 50 |
| Language detection false positives | Default to EN on ambiguity; user can override via Settings |
| Supabase free-tier limits | Monitor row counts; upgrade path documented |

---

*End of PRD.*
