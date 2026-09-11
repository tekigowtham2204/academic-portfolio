import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { SectionHeading } from "./SectionHeading";
import { projects } from "../data/portfolio-data";

type Category = "All" | "Full Stack" | "AgriTech";
const categories: Category[] = ["All", "Full Stack", "AgriTech"];

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
          subtitle="4 featured platforms spanning Full-Stack Architecture, AI Quality Gates, and AgriTech."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border cursor-pointer ${
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
      <Link
        to={`/projects/${project.slug}`}
        className="block no-underline"
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
              className="p-2.5 rounded-full border border-gray-200 text-gray-400 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-300 flex-shrink-0 ml-4"
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

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
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

            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 group-hover:translate-x-1 transition-transform"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Read Case Study
              <ArrowRight size={13} />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
