import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Category = "All" | "Full Stack" | "AgriTech" | "Data Analytics" | "LLM / AI";

const categories: Category[] = ["All", "Full Stack", "AgriTech", "Data Analytics", "LLM / AI"];

const projects = [
  {
    id: 1,
    title: "Stuviora — AI-Powered Student Freelancing Platform",
    role: "Full Stack · AI Integration · Product",
    category: "Full Stack" as Category,
    period: "2025 – Present",
    description:
      "India's first AI-powered student freelancing platform where every deliverable passes an AI quality check before reaching the client — built end-to-end with Next.js 16, Supabase, Razorpay escrow, and Claude as the quality gate.",
    highlights: [
      "End-to-end marketplace with student portal, client portal, admin, and university B2B partner portal across 7 build milestones",
      "AI quality gate powered by Claude reviews every deliverable before client delivery, ensuring platform-level trust at scale",
      "Razorpay Route integration with escrow and 85/15 revenue split; Inngest async jobs for payment processing and AI pipelines",
    ],
    tags: ["Next.js 16", "Supabase", "Anthropic Claude", "Razorpay", "Tailwind CSS", "TypeScript"],
    repositoryUrl: "https://github.com/tekigowtham2204/stuviora",
  },
  {
    id: 2,
    title: "KisanMitra — Agricultural Market Intelligence for Indian Farmers",
    role: "Full Stack · AgriTech · PWA",
    category: "AgriTech" as Category,
    period: "2025",
    description:
      "Open-source multilingual progressive web app delivering live mandi prices, MSP intelligence, weather advisories, government schemes, and direct market access to Indian farmers.",
    highlights: [
      "Real-time commodity pricing across Indian mandis with location-based 7-day weather forecasts and crop-specific guidance",
      "Minimum Support Price tracking for 23+ crops and access to 50+ government agricultural schemes in one place",
      "Data aggregated from eNAM, Agmarknet, and data.gov.in APIs; deployed on GitHub Pages with automated CI/CD via GitHub Actions",
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "PWA", "GitHub Pages", "AgriTech"],
    repositoryUrl: "https://github.com/tekigowtham2204/KisanMitra",
  },
  {
    id: 3,
    title: "AI Agent Activation Funnel & Growth Analysis",
    role: "Data Analytics · Growth",
    category: "Data Analytics" as Category,
    period: "May '26",
    description:
      "Mapped end-to-end AI agent activation funnel using SQL cohort queries and Mixpanel event analysis, identifying high-drop-off cohorts and reducing user churn by 15%.",
    highlights: [
      "Mapped end-to-end AI agent activation funnel using SQL cohort queries and Mixpanel event analysis, reducing user churn by 15%",
      "Designed and executed A/B testing experiment for onboarding optimization with statistically rigorous method, resulting in 25% improvement in feature adoption rate",
      "Automated growth reporting by engineering custom n8n workflows integrating Amplitude data with Slack, shortening the weekly business review cycle by 12 hours",
    ],
    tags: ["SQL", "Python", "Mixpanel", "Amplitude", "n8n", "A/B Testing"],
    repositoryUrl: "https://github.com/tekigowtham2204/ai-product-portfolio",
  },
  {
    id: 4,
    title: "AI Voice Support Agent with Local LLMs",
    role: "LLM APIs · NLP · AI Engineering",
    category: "LLM / AI" as Category,
    period: "May '26",
    description:
      "Architected and deployed a fully local AI calling agent on open-source LLMs achieving 30% lower voice response latency and 90% reduction in cloud inference costs.",
    highlights: [
      "Deployed fully local AI calling agent on open-source LLMs (Mistral, Llama 3), achieving 30% lower voice response latency and 90% reduction in cloud inference costs",
      "Built real-time Amplitude dashboards tracking call completion rate, sentiment analysis, and escalation rates, enabling a 40% increase in call completion rates",
      "Implemented a RAG-based knowledge retrieval system providing real-time product context, reducing hallucination rates in technical support by 60%",
    ],
    tags: ["Mistral", "Llama 3", "RAG", "Amplitude", "NLP", "Local LLM"],
    repositoryUrl: "https://github.com/tekigowtham2204/ai-product-portfolio",
  },
  {
    id: 5,
    title: "Enterprise LLM Cost Modeling & Optimization",
    role: "LLM APIs · Excel · Financial Modeling",
    category: "LLM / AI" as Category,
    period: "May '26",
    description:
      "Built a token-level cost model comparing frontier LLMs against local SLMs across five enterprise use-case scenarios to drive build-vs-buy strategy decisions.",
    highlights: [
      "Built token-level cost model comparing frontier LLMs (GPT-4o, Claude) against local SLMs (Mistral, Llama 3) across five enterprise use-case scenarios",
      "Modeled infrastructure requirements, latency tradeoffs, and quality constraints into a comprehensive build-vs-buy decision framework, enabling 30% faster technology strategy decisions",
      "Developed Python-based benchmarking tool to automate latency testing across different quantization levels (4-bit vs 8-bit), optimizing for sub-100ms inference",
    ],
    tags: ["Python", "Excel", "GPT-4o", "Claude", "Mistral", "Llama 3", "Cost Modeling"],
    repositoryUrl: "https://github.com/tekigowtham2204/ai-product-portfolio",
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
          subtitle="5 projects spanning Full Stack, AgriTech, Data Analytics, and LLM Engineering."
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
