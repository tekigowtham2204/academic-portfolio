import base64
import json
import io

from openai import OpenAI
from pdf2image import convert_from_bytes
from PIL import Image

from app.schemas import ResumeData

EXTRACTION_PROMPT = """You are an expert at reading Japanese rirekisho (履歴書) resumes.
Analyze the provided resume image and extract ALL of the following fields.
Return ONLY a valid JSON object — no markdown, no explanation.

Required JSON structure:
{
  "full_name_kanji": "漢字の氏名 or null",
  "full_name_furigana": "ふりがな or null",
  "date_of_birth": "YYYY-MM-DD or original format, or null",
  "age": integer or null,
  "education": [
    {"school": "...", "degree": "...", "graduation_year": "..."}
  ] or null,
  "work_history": [
    {"company": "...", "role": "...", "duration": "...", "responsibilities": "..."}
  ] or null,
  "skills_and_certifications": ["skill1", "cert1"] or null,
  "jlpt_level": "N1/N2/N3/N4/N5 or null",
  "self_introduction": "志望動機 section text or null",
  "pr_section": "自己PR section text or null"
}

Rules:
- If a field is not visible or not present, set it to null.
- For education and work_history, return an array of objects.
- Translate nothing — keep all Japanese text as-is.
- Return ONLY the JSON object, no surrounding text."""


def _image_to_base64(img: Image.Image) -> str:
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()


def _pdf_bytes_to_images(pdf_bytes: bytes) -> list[Image.Image]:
    return convert_from_bytes(pdf_bytes)


def extract_resume(file_bytes: bytes, content_type: str, client: OpenAI) -> ResumeData:
    """Convert uploaded file to image(s), send to GPT-4o vision, return parsed data."""

    if content_type == "application/pdf":
        images = _pdf_bytes_to_images(file_bytes)
    else:
        images = [Image.open(io.BytesIO(file_bytes))]

    image_messages = []
    for img in images:
        b64 = _image_to_base64(img)
        image_messages.append(
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/png;base64,{b64}", "detail": "high"},
            }
        )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": EXTRACTION_PROMPT},
                    *image_messages,
                ],
            }
        ],
        max_tokens=4096,
        temperature=0,
    )

    raw = response.choices[0].message.content.strip()
    # Strip possible markdown fences
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1]
        raw = raw.rsplit("```", 1)[0]

    data = json.loads(raw)
    return ResumeData(**data)
