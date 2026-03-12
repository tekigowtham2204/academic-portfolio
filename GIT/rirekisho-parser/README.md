# Rirekisho Parser API

Resume-parsing API for Japanese rirekisho (履歴書). Upload a PDF or image and receive structured JSON with extracted fields.

## Extracted Fields

| Field | Type | Notes |
|---|---|---|
| `full_name_kanji` | string | 漢字の氏名 |
| `full_name_furigana` | string | ふりがな |
| `date_of_birth` | string | As printed on resume |
| `age` | int | |
| `education` | array | school, degree, graduation_year |
| `work_history` | array | company, role, duration, responsibilities |
| `skills_and_certifications` | array of strings | |
| `jlpt_level` | string | N1–N5 if listed |
| `self_introduction` | string | 志望動機 section |
| `pr_section` | string | 自己PR section |

Missing fields are returned as `null`.

## Setup

```bash
cd rirekisho-parser
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

Copy `.env.example` → `.env` and add your OpenAI API key.

> **Note:** `pdf2image` requires [Poppler](https://github.com/oschwartz10612/poppler-windows/releases/) for PDF → image conversion. Add the Poppler `bin` folder to your PATH.

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

## Usage

```bash
curl -X POST http://localhost:8000/parse \
  -F "file=@resume.pdf"
```

Interactive docs at `http://localhost:8000/docs`.

## License

MIT
