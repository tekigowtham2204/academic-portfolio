import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const links = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "tekigowtham04@gmail.com",
    href: "mailto:tekigowtham04@gmail.com",
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+91 83417 25726",
    href: "tel:+918341725726",
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    value: "linkedin.com/in/gowthambhaskar",
    href: "https://linkedin.com/in/gowthambhaskar",
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    value: "github.com/tekigowtham2204",
    href: "https://github.com/tekigowtham2204",
  },
];

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="contact" className="py-32 px-6 relative" ref={containerRef}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-50/30 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/3 w-60 h-60 bg-purple-50/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          index="05"
          label="Contact"
          subtitle="Interested in collaborating or have an opportunity? I'd love to hear from you."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-300 no-underline"
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
            >
              <div className="text-gray-400 group-hover:text-gray-700 transition-colors">
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
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
                  {link.label}
                </p>
                <p
                  className="text-gray-700 truncate"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 450,
                  }}
                >
                  {link.value}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0"
              />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-4xl mx-auto mt-24 pt-8 border-t border-gray-100 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p
          className="text-gray-400"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 400,
          }}
        >
          Designed & built by Gowtham Bhaskar Teki
        </p>
      </motion.div>
    </section>
  );
}