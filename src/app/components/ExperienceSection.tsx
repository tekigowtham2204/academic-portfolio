import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const experiences = [
  {
    id: 1,
    role: "Product Strategist",
    company: "Stulancer",
    companyUrl: "https://www.stulancers.com/",
    companyDesc: "A student-centric freelancing platform",
    period: "Oct 2025 — Present",
    responsibilities: [
      "Defining product vision and go-to-market strategy for a student-first freelancing marketplace",
      "Conducting user research with students and early clients to identify friction points and prioritise feature roadmaps",
      "Collaborating cross-functionally with design and engineering to scope and ship MVP features",
      "Tracking key activation and retention metrics; iterating product decisions based on data",
    ],
    tags: ["Product Strategy", "GTM", "User Research", "Roadmapping", "Marketplace"],
  },
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="experience" className="py-32 px-6 relative" ref={containerRef}>
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-emerald-50/40 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          index="02"
          label="Experience"
          subtitle="Building real-world products that solve real problems."
        />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
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
      style={{ y: cardY, opacity: cardOpacity }}
      className="group relative"
    >
      <motion.div
        className="p-8 md:p-10 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.03]"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                Current
              </span>
              <span
                className="text-gray-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                }}
              >
                {experience.period}
              </span>
            </div>
            <h3
              className="text-gray-900 mt-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.35rem",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {experience.role}
            </h3>
            <p
              className="text-gray-400 mt-1"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors duration-200 underline underline-offset-2 decoration-gray-200 hover:decoration-gray-400"
              >
                {experience.company}
              </a>{" "}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                }}
                className="text-gray-300"
              >
                — {experience.companyDesc}
              </span>
            </p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {experience.responsibilities.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-gray-500"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.87rem",
                lineHeight: 1.65,
              }}
            >
              <span className="w-1 h-1 rounded-full bg-gray-300 mt-2.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
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
    </motion.div>
  );
}
