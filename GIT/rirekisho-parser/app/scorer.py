import json

from openai import OpenAI

from app.schemas import ResumeData, ScoreResponse

SCORING_PROMPT = """You are an expert recruiter evaluating a Japanese rirekisho (resume) against a job description.

## Scoring rubric (total 100 points)
- Work experience relevance to the job description: 0-40 points
- Education fit: 0-20 points
- Skill match: 0-25 points
- Self-introduction quality (志望動機 / 自己PR): 0-15 points

## Instructions
1. Compare the resume data to the job description.
2. Assign points for each category strictly within its range.
3. Sum the four category scores to produce the total score (0-100).
4. Write a short explanation (2-3 sentences) of the overall fit.
5. List red_flags: any concerns such as employment gaps over 6 months, experience that does not match the role, missing key skills, lack of relevant education, etc. Return an empty array if none.
6. List highlights: the top 3 reasons this candidate stands out. If fewer than 3 exist, list as many as you can.
7. ALL text in the output MUST be in English, even if the resume is in Japanese. Translate any Japanese content.

Return ONLY a valid JSON object with this structure — no markdown, no extra text:
{
  "score": <int 0-100>,
  "explanation": "<string>",
  "breakdown": {
    "work_experience_relevance": <int 0-40>,
    "education_fit": <int 0-20>,
    "skill_match": <int 0-25>,
    "self_introduction_quality": <int 0-15>
  },
  "red_flags": ["<string>", ...],
  "highlights": ["<string>", ...]
}"""


def score_candidate(resume: ResumeData, job_description: str, client: OpenAI) -> ScoreResponse:
    """Score a parsed resume against a job description using GPT-4o."""

    resume_json = resume.model_dump_json(indent=2)

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": SCORING_PROMPT,
            },
            {
                "role": "user",
                "content": (
                    f"## Resume data\n```json\n{resume_json}\n```\n\n"
                    f"## Job description\n{job_description}"
                ),
            },
        ],
        max_tokens=2048,
        temperature=0,
    )

    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1]
        raw = raw.rsplit("```", 1)[0]

    data = json.loads(raw)
    return ScoreResponse(**data)
