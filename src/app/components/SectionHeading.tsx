import { motion } from "motion/react";

interface SectionHeadingProps {
  index: string;       // e.g. "01"
  label: string;       // e.g. "About"
  subtitle?: string;   // optional sub-line beneath the big title
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  label,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      className={`mb-16 ${isCenter ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Index tag */}
      <div
        className={`flex items-center gap-3 mb-3 ${isCenter ? "justify-center" : ""}`}
      >
        <span
          className="text-gray-300"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {index}
        </span>
        {/* tiny rule */}
        <span className="block w-8 h-px bg-gray-200" />
      </div>

      {/* Big bold label */}
      <h2
        className="text-gray-900 leading-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 0.95,
        }}
      >
        {label}
        <span
          className="text-gray-200"
          style={{ fontWeight: 700 }}
        >
          .
        </span>
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className={`mt-4 text-gray-400 max-w-md ${isCenter ? "mx-auto" : ""}`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
