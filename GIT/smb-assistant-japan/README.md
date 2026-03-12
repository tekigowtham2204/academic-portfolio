# SMB Assistant Japan 🇯🇵

> Bilingual AI document assistant that helps small & medium businesses in Japan chat with their own PDFs — in English or Japanese.

![demo](./docs/demo.gif) <!-- replace with your own recording -->

---

## Features

- **RAG Chat** — LangChain pipeline with 512-token chunks, `text-embedding-3-small`, pgvector top-5 retrieval, GPT-4o answers.
- **Auto Language Detection** — `langdetect` switches between keigo Japanese and professional English system prompts on every message.
- **PDF / TXT Upload** — Drag-and-drop, extracts text, chunks, embeds, and stores in Supabase.
- **Chat History** — Persisted per session in Supabase; survives page reloads within the same tab.
- **Export to PDF** — One-click jsPDF export of the full conversation.
- **Rate Limiting** — 50 queries / day / IP address (429 error if exceeded).
- **Error Boundary** — Friendly bilingual error card if anything crashes.
- **Settings** — Choose language preference and AI model from the UI.

---

## Architecture

```
frontend/          Next.js 14 · Tailwind CSS · TypeScript
backend/           FastAPI · LangChain · OpenAI · langdetect
Supabase           pgvector (embeddings) · chat_sessions · rate_limits
```

## Prerequisites

| Tool | Minimum version |
|------|-----------------|
| Node.js | 18+ |
| Python | 3.11+ |
| Supabase project | Free tier works |
| OpenAI API key | GPT-4o access |

---

## Quick Start

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → paste and run `backend/supabase_setup.sql`.

### 2. Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
# source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env`:

```
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
```

Start the server:

```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy

### Backend → Railway

1. Push the `backend/` folder to a GitHub repo (or use Railway CLI).
2. Create a new Railway project → link the repo.
3. Set root directory to `backend/`.
4. Add environment variables: `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`.
5. Railway auto-detects `nixpacks.toml` / `Procfile` and deploys.
6. Copy the public URL (e.g. `https://smb-backend-xxx.up.railway.app`).

### Frontend → Vercel

1. Push the `frontend/` folder to a GitHub repo.
2. Import in [vercel.com](https://vercel.com) → set root directory to `frontend/`.
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://smb-backend-xxx.up.railway.app/api`
4. Deploy. Vercel reads `vercel.json` automatically.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/upload` | Drag-and-drop PDF / TXT upload |
| `/chat` | Bilingual RAG chat with source citations, PDF export |
| `/settings` | Language preference and AI model selection |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/upload` | Upload and index a document |
| POST | `/api/chat` | Send a chat message (rate-limited) |
| POST | `/api/history` | Save a chat message to history |
| GET | `/api/history?session_id=` | Retrieve session history |
| GET | `/api/settings/options` | Available models & languages |
| GET | `/docs` | Interactive Swagger UI |

---

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key with GPT-4o access |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service-role key |

### Frontend (`.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (e.g. `http://localhost:8000/api`) |

---

## License

MIT
