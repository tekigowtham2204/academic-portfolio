import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Category = "All" | "PM Craft" | "Healthcare" | "EdTech" | "FinTech" | "Meta-GenAI" | "Mental Health";

const categories: Category[] = ["All", "PM Craft", "Healthcare", "EdTech", "FinTech", "Meta-GenAI", "Mental Health"];

const projects = [
  // ─── FLAGSHIP PRODUCTS ───
  {
    id: 1,
    title: "CareNote AI — Clinical Documentation Copilot",
    role: "Product Manager · Healthcare / MedTech",
    category: "Healthcare" as Category,
    period: "Jan – Apr 2025",
    description:
      "Interviewed 14 junior physicians; identified documentation consuming 34–40% of shift time as the primary burnout driver. Architected an ambient voice → ASR → structured prompt chain → LLM SOAP note pipeline with HITL checkpoints.",
    highlights: [
      "Authored full PRD; set success targets of ≥35% time reduction, NPS ≥40, and note accuracy F1 ≥0.87",
      "Prototype cut average note time from 18 min to under 6 min",
      "HITL checkpoints at diagnosis and medication steps for safety compliance",
    ],
    tags: ["GenAI", "LLM", "Healthcare", "RAG", "PRD"],
    repositoryUrl: "https://github.com/tekigowtham2204/carenote-ai",
  },
  {
    id: 2,
    title: "LearnPath AI — Adaptive Skill-Gap Engine",
    role: "Product Manager · EdTech / Learning",
    category: "EdTech" as Category,
    period: "Aug – Dec 2024",
    description:
      "Led 3-week discovery sprint with 18 student interviews; benchmarked 6 platforms via competitive analysis across 9 dimensions — found zero dynamic JD-aligned skill-gap tools.",
    highlights: [
      "Designed 3-stage GenAI loop: RAG-based skill extraction → semantic gap analysis vs. live JD corpus → personalised LLM micro-learning roadmap",
      "Validated with 22 users over 6 weeks; 78% reported higher skill-development confidence",
      "Roadmap pitched to LPU Centre for Innovation as a campus product candidate",
    ],
    tags: ["GenAI", "RAG", "EdTech", "User Research", "Roadmapping"],
    repositoryUrl: "https://github.com/tekigowtham2204/learnpath-ai",
  },
  {
    id: 3,
    title: "FinSense AI — Conversational Financial Clarity Engine",
    role: "Product Manager · FinTech",
    category: "FinTech" as Category,
    period: "May – Aug 2024",
    description:
      "Conducted 12 user interviews with first-generation investors (ages 19–23); found 80% had never read a mutual fund factsheet — framed as a financial literacy access gap.",
    highlights: [
      "Built RAG pipeline over SEBI-compliant documents with confidence-scoring guardrails routing low-certainty outputs to human escalation",
      "Documented 7 failure modes for risk management",
      "Task-completion rate for financial queries rose from 34% (Google Search) to 91% on prototype; received Best Product Concept at LPU internal showcase",
    ],
    tags: ["GenAI", "RAG", "FinTech", "Risk Design", "LLM"],
    repositoryUrl: "https://github.com/tekigowtham2204/finsense-ai",
  },

  // ─── PM CRAFT ───
  {
    id: 4,
    title: "PRD School — Learn PM by Doing, Not Reading",
    role: "PM Craft · GenAI Simulation",
    category: "PM Craft" as Category,
    period: "2025",
    description:
      "Every lesson is a real broken-product scenario — a metric drop, an angry user, a feature request with no context. An LLM coach plays your PM lead, pushes back on weak reasoning, and scores your PRD against a quality rubric.",
    highlights: [
      "6+ realistic PM crisis scenarios with hidden context reveals",
      "Socratic LLM coach that won't accept buzzwords",
      "6-dimension scoring: problem framing, data thinking, stakeholders, creativity, clarity, adaptability",
    ],
    tags: ["Prompt Engineering", "PRD", "LLM Orchestration", "Streamlit"],
    repositoryUrl: "https://github.com/tekigowtham2204/prd-school",
  },
  {
    id: 5,
    title: "OKR Sanity — Anti-Pattern Detector for OKRs",
    role: "PM Craft · Framework Tooling",
    category: "PM Craft" as Category,
    period: "2025",
    description:
      "Paste your team's OKRs and get flagged for vanity metrics, outputs disguised as outcomes, unmeasurable key results, O-KR misalignment, and aspirational vagueness. Opinionated by design.",
    highlights: [
      "5 anti-pattern detectors with severity scoring",
      "Actionable rewrite suggestions for each flagged OKR",
      "Batch analysis for entire team OKR sets",
    ],
    tags: ["LLM Classification", "Prompt Engineering", "Python", "Streamlit"],
    repositoryUrl: "https://github.com/tekigowtham2204/okr-sanity",
  },
  {
    id: 6,
    title: "PM Taste Checker — PRD Quality Grader with Teeth",
    role: "PM Craft · Quality Evaluation",
    category: "PM Craft" as Category,
    period: "2025",
    description:
      "Scores your PRD across six dimensions with line-level feedback. Tells you your problem statement is weak, your success metric is a vanity number, and your edge cases are missing.",
    highlights: [
      "6-dimension scoring: clarity, user understanding, metrics, specificity, edge cases, trade-offs",
      "Line-level annotations pointing to specific weak sentences",
      "Calibrated examples at each quality tier for self-assessment",
    ],
    tags: ["RAG", "LLM Evaluation", "Prompt Chaining", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/pmtaste-checker",
  },
  {
    id: 7,
    title: "JTBD Interviewer — AI That Runs Your User Interviews",
    role: "User Research · GenAI Simulation",
    category: "PM Craft" as Category,
    period: "2025",
    description:
      "Define a product and user — it simulates a live persona, dynamically adjusts follow-ups, and synthesizes a JTBD statement with an opportunity score. For PMs who need discovery velocity.",
    highlights: [
      "Dynamic persona simulation with consistent backstory and motivations",
      "Adaptive follow-up questions — no scripted flow",
      "Auto-generates JTBD statement with 1-10 opportunity score",
    ],
    tags: ["Persona Simulation", "LLM Orchestration", "RAG", "Streamlit"],
    repositoryUrl: "https://github.com/tekigowtham2204/jtbd-interviewer",
  },

  // ─── HEALTHCARE ───
  {
    id: 8,
    title: "CareNote Eval — Clinical Note Benchmark Suite",
    role: "Healthcare · LLM Evaluation",
    category: "Healthcare" as Category,
    period: "2025",
    description:
      "An open benchmark for evaluating LLM-generated SOAP notes across factual accuracy, completeness, diagnostic clarity, medication safety, and HIPAA compliance surface area.",
    highlights: [
      "5-dimension clinical evaluation with gold-standard annotations",
      "50+ curated scenarios built from CareNote AI failure modes",
      "Side-by-side model comparison dashboard",
    ],
    tags: ["LLM Evaluation", "RAG", "Clinical NLP", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/carenote-eval",
  },
  {
    id: 9,
    title: "HITL Checkpoint — Human-in-the-Loop for Medical LLMs",
    role: "Healthcare · Agentic AI · Safety",
    category: "Healthcare" as Category,
    period: "2025",
    description:
      "A reusable Python framework for inserting human review checkpoints into LLM pipelines at configurable confidence thresholds. Built for clinical contexts where hallucinated medication has real consequences.",
    highlights: [
      "Configurable confidence thresholds per output type (medication, diagnosis, procedure)",
      "Checkpoint UI with audit log and escalation routing",
      "Drop-in compatible with LangChain pipelines",
    ],
    tags: ["Agentic AI", "LangChain", "HITL Design", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/hitl-checkpoint",
  },
  {
    id: 10,
    title: "Burnout Signal — Passive Burnout Detection for Physicians",
    role: "Healthcare · Mental Wellness · NLP",
    category: "Healthcare" as Category,
    period: "2025",
    description:
      "Passively scores clinical texts over time for cognitive load markers: hedging language, reduced specificity, emotional depletion signals. Weekly trend graph, no manual journaling required.",
    highlights: [
      "NLP-based cognitive load marker detection from existing clinical documentation",
      "Weekly trend graphs tracking burnout trajectory",
      "Configurable alert thresholds when markers spike",
    ],
    tags: ["NLP", "Sentiment Analysis", "Prompt Engineering", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/burnout-signal",
  },

  // ─── EDTECH ───
  {
    id: 11,
    title: "LearnPath OSS — Open-Source Skill-Gap Engine",
    role: "EdTech · RAG · Career Intelligence",
    category: "EdTech" as Category,
    period: "2025",
    description:
      "Open-source extension of LearnPath AI. Paste resume + target JD — get gap analysis, week-by-week learning roadmap, and curated free resources. RAG layer fully swappable for community extensions.",
    highlights: [
      "Resume-to-JD skill gap analysis with semantic matching",
      "Week-by-week learning roadmap with milestone tracking",
      "Fully swappable RAG layer for custom course databases",
    ],
    tags: ["RAG", "LangChain", "Semantic Search", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/learnpath-oss",
  },
  {
    id: 12,
    title: "College Confusion AI — JTBD Career Advisor for Indian Undergrads",
    role: "EdTech · User Research · Conversational AI",
    category: "EdTech" as Category,
    period: "2025",
    description:
      "Uses Jobs-To-Be-Done to surface hidden assumptions about success — family expectations, status pressure, financial anxiety — before recommending anything. For students confused about identity, not careers.",
    highlights: [
      "JTBD framework surfaces hidden beliefs driving career decisions",
      "India-context aware: family expectations, status pressure, financial anxiety",
      "Conversational intake — no forms, natural discovery flow",
    ],
    tags: ["JTBD Framework", "Conversational AI", "Prompt Engineering", "Streamlit"],
    repositoryUrl: "https://github.com/tekigowtham2204/college-confusion-ai",
  },
  {
    id: 13,
    title: "ReturnPath — Skill-Gap Engine for Women Re-entering Workforce",
    role: "EdTech · Inclusion · Career Intelligence",
    category: "EdTech" as Category,
    period: "2025",
    description:
      "Accounts for recency bias in JD language, maps transferable skills from non-traditional experience, and generates a confidence-calibrated roadmap. Most upskilling tools assume continuous employment.",
    highlights: [
      "Recency bias detection in job descriptions",
      "Maps transferable skills from non-traditional break-period experience",
      "Confidence-calibrated roadmap showing strengths you undervalue",
    ],
    tags: ["RAG", "Bias Detection", "LLM Fine-tuning", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/returnpath",
  },

  // ─── FINTECH ───
  {
    id: 14,
    title: "DebtDecoder — Paste Any Loan Doc, Get the Catch",
    role: "FinTech · Financial Literacy · Document AI",
    category: "FinTech" as Category,
    period: "2025",
    description:
      "Paste any loan agreement, credit card T&C, or EMI offer — get a 5-line plain-English breakdown anchored to one question: what is the catch? The LLM never softens bad terms.",
    highlights: [
      "Document AI pipeline for parsing complex financial fine print",
      "5-line plain-English breakdown of hidden costs and catches",
      "Built from FinSense AI discovery that 80% of users never read a factsheet",
    ],
    tags: ["Document AI", "RAG", "Prompt Engineering", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/debtdecoder",
  },
  {
    id: 15,
    title: "SIP or Skip — Conversational Mutual Fund Evaluator",
    role: "FinTech · Conversational AI · Financial Literacy",
    category: "FinTech" as Category,
    period: "2025",
    description:
      "Describe your financial goal in plain language. The LLM asks 3 follow-ups, then outputs a one-page investment brief in PRD format: recommendation, rationale, risks, success metric, and review trigger.",
    highlights: [
      "Conversational intake — no forms, no financial jargon required",
      "PRD-format investment brief with recommendation + risks + success metric",
      "SEBI-aware recommendations aligned with Indian regulatory framework",
    ],
    tags: ["Conversational AI", "SEBI Compliance", "RAG", "Streamlit"],
    repositoryUrl: "https://github.com/tekigowtham2204/sip-or-skip",
  },
  {
    id: 16,
    title: "FinLoss Post-Mortem — Retrospective on Financial Decisions",
    role: "FinTech · Behavioral Finance · LLM Analysis",
    category: "FinTech" as Category,
    period: "2025",
    description:
      "After a bad financial decision, the LLM runs a structured post-mortem: which assumption failed, which cognitive bias was at play, and what the data actually said. Not a guilt trip — a retrospective.",
    highlights: [
      "Identifies cognitive biases: loss aversion, anchoring, herd behavior",
      "Decision vs. data comparison showing where reasoning diverged",
      "One concrete, actionable change for the next decision",
    ],
    tags: ["Behavioral Analysis", "LLM Reasoning", "Prompt Engineering", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/finloss-postmortem",
  },

  // ─── META-GENAI TOOLS ───
  {
    id: 17,
    title: "RAG Bench India — Indian-Language Document RAG Benchmark",
    role: "GenAI · Evaluation · Multilingual NLP",
    category: "Meta-GenAI" as Category,
    period: "2025",
    description:
      "Uses SEBI filings, Indian government policy documents, and multilingual healthcare texts. Evaluates retrieval precision, answer faithfulness, and hallucination rate across three embedding models.",
    highlights: [
      "Indian-context document corpus: SEBI, government, healthcare",
      "3-dimension evaluation: precision, faithfulness, hallucination",
      "Cross-model comparison across embedding approaches",
    ],
    tags: ["RAG", "LLM Evaluation", "Multilingual NLP", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/rag-bench-india",
  },
  {
    id: 18,
    title: "Prompt Failure Library — 200+ Documented LLM Failure Modes",
    role: "GenAI · Prompt Engineering · Safety",
    category: "Meta-GenAI" as Category,
    period: "2025",
    description:
      "Structured, searchable dataset of 200+ documented prompt failures across healthcare, finance, and education — with original prompt, failure type, severity, and a fixed version.",
    highlights: [
      "200+ failure cases across 3 domains with severity classification",
      "Searchable by domain, failure type, severity, and model",
      "Every failure includes a fixed version with explanation",
    ],
    tags: ["Prompt Engineering", "LLM Safety", "Dataset Curation", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/prompt-failure-library",
  },
  {
    id: 19,
    title: "AgentFlow PM — Visual Agentic AI Pipeline Designer",
    role: "GenAI · Agentic AI · No-Code",
    category: "Meta-GenAI" as Category,
    period: "2025",
    description:
      "Drag-and-drop interface to map: trigger → retrieval → LLM step → HITL checkpoint → output. Exports to a valid LangChain scaffold. For PMs who design pipelines but don't write LangChain code.",
    highlights: [
      "Visual pipeline builder with configurable nodes",
      "Flow validation catches dead ends and loops before export",
      "Exports to valid Python LangChain scaffold for engineering",
    ],
    tags: ["Agentic AI", "LangChain", "System Design", "React"],
    repositoryUrl: "https://github.com/tekigowtham2204/agentflow-pm",
  },
  {
    id: 20,
    title: "Confidence Router — LLM Output Confidence Scoring Middleware",
    role: "GenAI · LLM Safety · Production AI",
    category: "Meta-GenAI" as Category,
    period: "2025",
    description:
      "Reusable middleware that intercepts LLM outputs, scores confidence using entropy and self-consistency sampling, and routes low-confidence outputs to human review or fallback. Extracted from FinSense AI and CareNote AI.",
    highlights: [
      "Entropy + self-consistency scoring for output uncertainty",
      "Smart routing: high → pass, medium → review, low → fallback",
      "Drop-in compatible with LangChain and raw OpenAI/Gemini calls",
    ],
    tags: ["LLM Safety", "LangChain", "Confidence Scoring", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/confidence-router",
  },

  // ─── MENTAL HEALTH ───
  {
    id: 21,
    title: "PressureMap India — Emotional Audit for Indian Students",
    role: "Mental Wellness · Conversational AI · India",
    category: "Mental Health" as Category,
    period: "2025",
    description:
      "10-minute conversational intake mapping pressure across three axes unique to Indian student life: academic performance, family expectations, and social comparison. Outputs a visual pressure map with reframes.",
    highlights: [
      "3-axis pressure mapping: academic, family, social comparison",
      "Visual pressure map with one reframe per axis",
      "India-context aware — built because existing tools are all Western",
    ],
    tags: ["Conversational AI", "Prompt Engineering", "Data Viz", "Streamlit"],
    repositoryUrl: "https://github.com/tekigowtham2204/pressuremap-india",
  },
  {
    id: 22,
    title: "Exam Anxiety Coach — 48-Hour Pre-Exam Prep Tool",
    role: "Mental Wellness · EdTech · Conversational AI",
    category: "Mental Health" as Category,
    period: "2025",
    description:
      "Designed for 48 hours before JEE, GATE, NEET, board exams. Triages three failure modes: revision panic, sleep anxiety, and parental pressure spirals. Output is a tonight-and-tomorrow plan, not journaling prompts.",
    highlights: [
      "3-pattern triage for revision panic, sleep anxiety, parental pressure",
      "Concrete hourly schedule — not vague advice",
      "Smart skip list: what to deliberately NOT revise to reduce panic",
    ],
    tags: ["Conversational AI", "Crisis Triage", "Prompt Engineering", "Python"],
    repositoryUrl: "https://github.com/tekigowtham2204/exam-anxiety-coach",
  },
  {
    id: 23,
    title: "Rejection Debrief — PM-Style Post-Mortem on Rejections",
    role: "Mental Wellness · Career · LLM Analysis",
    category: "Mental Health" as Category,
    period: "2025",
    description:
      "Paste a rejection email and your application. The LLM runs a structured retrospective: what the evaluator likely saw, which assumption was wrong, and one specific thing to change. Not comfort — a retrospective.",
    highlights: [
      "Evaluator perspective reconstruction — what they likely saw",
      "Assumption analysis: which belief about yourself or the role was wrong",
      "One concrete, actionable change — not generic motivation",
    ],
    tags: ["Document Analysis", "LLM Reasoning", "Prompt Engineering", "Streamlit"],
    repositoryUrl: "https://github.com/tekigowtham2204/rejection-debrief",
  },
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 px-6 relative" ref={containerRef}>
      {/* Parallax background element */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          index="03"
          label="Projects"
          subtitle="20 verified-original GenAI projects across Healthcare, EdTech, FinTech, PM Craft, and Mental Health."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
              }}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-60">
                  {projects.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{ y: cardY, opacity: cardOpacity }}
      className="group relative"
    >
      <a
        href={project.repositoryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          className="p-8 md:p-10 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.03] cursor-pointer"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
        <div className="flex items-start justify-between mb-4">
          <div>
            <span
              className="text-gray-400 mb-1 block"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {project.role}
            </span>
            <span
              className="text-gray-300 mb-2 block"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 400,
              }}
            >
              {project.period}
            </span>
            <h3
              className="text-gray-900"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.35rem",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>
          </div>
          <motion.div
            className="p-2 rounded-full border border-gray-200 text-gray-400 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-300 flex-shrink-0 ml-4"
            whileHover={{ rotate: 45 }}
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        <p
          className="text-gray-500 mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {project.description}
        </p>

        <ul className="space-y-2 mb-6">
          {project.highlights.map((h, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-gray-500"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                lineHeight: 1.6,
              }}
            >
              <span className="w-1 h-1 rounded-full bg-gray-300 mt-2.5 flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        </motion.div>
      </a>
    </motion.div>
  );
}