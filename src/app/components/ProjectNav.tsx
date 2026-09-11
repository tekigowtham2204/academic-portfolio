import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectNavProps {
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <motion.div
      className="flex items-stretch justify-between gap-4 mt-20 pt-10 border-t border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="group flex-1 flex items-center gap-3 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 no-underline"
        >
          <ArrowLeft
            size={16}
            className="text-gray-300 group-hover:text-gray-600 group-hover:-translate-x-1 transition-all duration-200 flex-shrink-0"
          />
          <div className="min-w-0">
            <p
              className="text-gray-400 mb-0.5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Previous
            </p>
            <p
              className="text-gray-700 truncate"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          to={`/projects/${next.slug}`}
          className="group flex-1 flex items-center justify-end gap-3 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 no-underline text-right"
        >
          <div className="min-w-0">
            <p
              className="text-gray-400 mb-0.5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Next
            </p>
            <p
              className="text-gray-700 truncate"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={16}
            className="text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
          />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </motion.div>
  );
}
