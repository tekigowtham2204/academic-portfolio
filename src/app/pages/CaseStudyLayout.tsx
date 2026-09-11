import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BackButton } from "../components/BackButton";
import { ProjectNav } from "../components/ProjectNav";
import type { Project } from "../data/portfolio-data";
import { projects } from "../data/portfolio-data";

interface CaseStudyLayoutProps {
  project: Project;
}

export default function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <div className="mb-10">
          <BackButton label="Back to Projects" to="/#projects" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-gray-400"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
              }}
            >
              {project.role}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span
              className="text-gray-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 400,
              }}
            >
              {project.period}
            </span>
          </div>

          <h1
            className="text-gray-900 mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>

          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors no-underline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 450,
            }}
          >
            {project.externalUrl.replace(/https?:\/\//, "").replace(/\/$/, "")}
            <ArrowUpRight size={14} />
          </a>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 450,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 my-12" />

        {/* Overview */}
        <CaseSection title="Overview" index="01" delay={0.1}>
          {project.overview.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4 last:mb-0" style={bodyStyle}>
              {p}
            </p>
          ))}
        </CaseSection>

        {/* The Problem */}
        <CaseSection title="The Problem" index="02" delay={0.15}>
          {project.problem.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4 last:mb-0" style={bodyStyle}>
              {p}
            </p>
          ))}
        </CaseSection>

        {/* My Role & Approach */}
        <CaseSection title="My Role & Approach" index="03" delay={0.2}>
          {project.myRole.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4 last:mb-0" style={bodyStyle}>
              {p}
            </p>
          ))}
        </CaseSection>

        {/* Architecture */}
        <CaseSection title="Architecture" index="04" delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.architectureSections.map((section) => (
              <motion.div
                key={section.label}
                className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <h4
                  className="text-gray-900 mb-3"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {section.label}
                </h4>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-gray-500"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.8rem",
                        lineHeight: 1.5,
                      }}
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </CaseSection>

        {/* Key Features & Impact */}
        <CaseSection title="Key Features & Impact" index="05" delay={0.3}>
          <div className="space-y-6">
            {project.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h4
                  className="text-gray-900 mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {feature.title}
                </h4>
                <p className="text-gray-500" style={bodyStyle}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </CaseSection>

        {/* Project Navigation */}
        <ProjectNav
          prev={prev ? { slug: prev.slug, title: prev.shortTitle } : null}
          next={next ? { slug: next.slug, title: next.shortTitle } : null}
        />
      </div>
    </section>
  );
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.92rem",
  lineHeight: 1.75,
  fontWeight: 400,
};

function CaseSection({
  title,
  index,
  delay = 0,
  children,
}: {
  title: string;
  index: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="mb-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-gray-300"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
          }}
        >
          {index}
        </span>
        <span className="w-6 h-px bg-gray-200" />
        <h3
          className="text-gray-900"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}
