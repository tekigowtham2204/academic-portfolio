from pydantic import BaseModel, Field
from typing import Optional


class EducationEntry(BaseModel):
    school: Optional[str] = None
    degree: Optional[str] = None
    graduation_year: Optional[str] = None


class WorkEntry(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    duration: Optional[str] = None
    responsibilities: Optional[str] = None


class ResumeData(BaseModel):
    full_name_kanji: Optional[str] = None
    full_name_furigana: Optional[str] = None
    date_of_birth: Optional[str] = None
    age: Optional[int] = None
    education: Optional[list[EducationEntry]] = None
    work_history: Optional[list[WorkEntry]] = None
    skills_and_certifications: Optional[list[str]] = None
    jlpt_level: Optional[str] = None
    self_introduction: Optional[str] = None
    pr_section: Optional[str] = None


# --- Scoring models ---


class ScoreRequest(BaseModel):
    resume: ResumeData
    job_description: str = Field(..., min_length=1)


class ScoreBreakdown(BaseModel):
    work_experience_relevance: int = Field(..., ge=0, le=40)
    education_fit: int = Field(..., ge=0, le=20)
    skill_match: int = Field(..., ge=0, le=25)
    self_introduction_quality: int = Field(..., ge=0, le=15)


class ScoreResponse(BaseModel):
    score: int = Field(..., ge=0, le=100)
    explanation: str
    breakdown: ScoreBreakdown
    red_flags: list[str]
    highlights: list[str]
