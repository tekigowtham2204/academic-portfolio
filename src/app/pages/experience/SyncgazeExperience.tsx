import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp, BarChart2, Database, Rocket } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { experience } from "../../data/portfolio-data";

export default function SyncgazeExperience() {
  const icons = [Rocket, BarChart2, Database];

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <div className="mb-10">
          <BackButton label="Back to Experience" to="/#experience" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Current Role
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span
              className="text-gray-400"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
              }}
            >
              {experience.period}
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
              {experience.companyDesc}
            </span>
          </div>

          <h1
            className="text-gray-900 mb-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {experience.role}
          </h1>

          <p
            className="text-gray-500 mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 500,
            }}
          >
            at{" "}
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 underline underline-offset-4 decoration-gray-200 hover:decoration-gray-600 transition-colors inline-flex items-center gap-1.5"
            >
              {experience.company}
              <ArrowUpRight size={16} />
            </a>
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {experience.tags.map((tag) => (
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

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {experience.impact.map((item) => (
            <div
              key={item.metric}
              className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 text-center"
            >
              <p
                className="text-gray-900 mb-1"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {item.value}
              </p>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {item.metric}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 my-12" />

        {/* Overview */}
        <ExpSection title="Role Overview" index="01" delay={0.1}>
          {experience.overview.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4 last:mb-0" style={bodyStyle}>
              {p}
            </p>
          ))}
        </ExpSection>

        {/* Core Contributions */}
        <ExpSection title="Key Contributions & Initiatives" index="02" delay={0.2}>
          <div className="space-y-8">
            {experience.detailedContributions.map((contrib, i) => {
              const Icon = icons[i % icons.length] || TrendingUp;
              return (
                <motion.div
                  key={contrib.title}
                  className="p-7 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.02]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700">
                      <Icon size={18} />
                    </div>
                    <h3
                      className="text-gray-900"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                      }}
                    >
                      {contrib.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {contrib.description.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600"
                        style={bodyStyle}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ExpSection>

        {/* Responsibilities Summary */}
        <ExpSection title="Core Responsibilities" index="03" delay={0.3}>
          <div className="p-7 rounded-3xl border border-gray-100 bg-gray-50/50">
            <ul className="space-y-3">
              {experience.responsibilities.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600"
                  style={bodyStyle}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </ExpSection>

        {/* Bottom Back Button */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <BackButton label="Back to All Experience" to="/#experience" />
        </div>
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

function ExpSection({
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
