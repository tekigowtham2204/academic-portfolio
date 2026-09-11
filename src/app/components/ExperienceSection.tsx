import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SectionHeading } from "./SectionHeading";
import { experience } from "../data/portfolio-data";

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
          <ExperienceCard key={experience.id} exp={experience} index={0} />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: typeof experience;
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
              {exp.current && (
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
              )}
              <span
                className="text-gray-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                }}
              >
                {exp.period}
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
              {exp.role}
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
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors duration-200 underline underline-offset-2 decoration-gray-200 hover:decoration-gray-400"
              >
                {exp.company}
              </a>{" "}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                }}
                className="text-gray-300"
              >
                — {exp.companyDesc}
              </span>
            </p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {exp.responsibilities.map((item, idx) => (
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

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
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

          <Link
            to="/experience/syncgaze"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors no-underline group-hover:translate-x-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Read Detailed Breakdown
            <ArrowRight size={13} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
