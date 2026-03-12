import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Mail, GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-4xl mx-auto">

        {/* Bold section heading */}
        <SectionHeading index="01" label="About" />

        {/* Bio */}
        <motion.div
          style={{ y: textY }}
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-gray-800"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Aspiring{" "}
            <span className="text-gray-400">GenAI Product Manager</span> with
            hands-on experience building{" "}
            <span className="text-gray-400">LLM-powered products</span> across
            Healthcare, EdTech, and FinTech. Combines user-centric problem
            framing with technical fluency in{" "}
            <span className="text-gray-400">RAG pipelines</span>, prompt
            engineering, and agentic AI systems. Skilled in authoring PRDs,
            defining success metrics, and scoping MVPs using frameworks like
            RICE, JTBD, and OKRs.
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            {
              icon: <MapPin size={18} />,
              label: "Location",
              value: "Phagwara, Punjab, India",
            },
            {
              icon: <Mail size={18} />,
              label: "Email",
              value: "tekigowtham04@gmail.com",
            },
            {
              icon: <GraduationCap size={18} />,
              label: "Education",
              value: "B.Tech ECE — LPU (2023-2027)",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="p-6 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-gray-200 transition-colors"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="text-gray-400 mb-3">{item.icon}</div>
              <p
                className="text-gray-400 mb-1"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {item.label}
              </p>
              <p
                className="text-gray-800"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 450,
                }}
              >
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}