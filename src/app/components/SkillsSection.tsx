import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const skillCategories = [
  {
    title: "GenAI & LLMs",
    items: ["GPT-4", "Gemini", "Prompt Engineering", "RAG", "LangChain", "Fine-tuning Evaluation", "Agentic AI"],
  },
  {
    title: "Product",
    items: [
      "PRDs",
      "OKRs",
      "RICE Scoring",
      "Roadmapping",
      "User Stories",
      "A/B Testing",
      "Go-to-Market Strategy",
    ],
  },
  {
    title: "Research",
    items: [
      "User Interviews",
      "Persona Development",
      "JTBD",
      "Competitive Analysis",
      "Usability Testing",
    ],
  },
  {
    title: "Tools & Data",
    items: ["Figma", "Miro", "Notion", "Jira", "Python", "SQL", "Google Analytics", "VS Code", "Antigravity"],
  },
];

const certifications = [
  { name: "Generative AI — Udemy", pdfUrl: "/certificates/gen-ai.pdf" },
  { name: "Product Management — Udemy", pdfUrl: "/certificates/product-management.pdf" },
  { name: "Machine Learning — Udemy", pdfUrl: "/certificates/machine-learning.pdf" },
];

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="skills" className="py-32 px-6 relative" ref={containerRef}>
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-purple-50/40 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          index="05"
          label="Skills"
          subtitle="Technical toolkit and professional certifications."
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-300 h-full"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <h3
                  className="text-gray-900 mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <motion.span
                      key={item}
                      className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-colors cursor-default"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 450,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 rounded-3xl border border-gray-100 bg-white"
        >
          <h3
            className="text-gray-900 mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <motion.a
                key={cert.name}
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="w-8 h-px bg-gray-200 group-hover:w-12 group-hover:bg-gray-400 transition-all duration-300" />
                <span
                  className="text-gray-600 group-hover:text-gray-900 transition-colors"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 450,
                  }}
                >
                  {cert.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}