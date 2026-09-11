import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, MapPin } from "lucide-react";
import { BackButton } from "../components/BackButton";
import { education, certifications } from "../data/portfolio-data";

export default function EducationPage() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <div className="mb-10">
          <BackButton label="Back to Home" to="/" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
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
              Academic Background
            </span>
            <span className="block w-8 h-px bg-gray-200" />
          </div>

          <h1
            className="text-gray-900 mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
            }}
          >
            Education & Learning<span className="text-gray-300">.</span>
          </h1>

          <p
            className="text-gray-500 max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            A blend of formal engineering education, active leadership in university tech communities, and ongoing self-directed exploration in Artificial Intelligence.
          </p>
        </motion.div>

        {/* Formal Education */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span
              className="text-gray-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
              }}
            >
              01
            </span>
            <span className="w-6 h-px bg-gray-200" />
            <h2
              className="text-gray-900"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.35rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Academic Degrees
            </h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.02]"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 text-gray-400 mb-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                      }}
                    >
                      <MapPin size={13} />
                      {edu.location}
                    </span>
                    <h3
                      className="text-gray-900"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                      }}
                    >
                      {edu.institution}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span
                      className="inline-flex items-center gap-1 text-gray-400"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 400,
                      }}
                    >
                      <Calendar size={13} />
                      {edu.period}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 mb-6 flex items-center justify-between">
                  <span
                    className="text-gray-700 font-medium"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                    }}
                  >
                    {edu.degree}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-xs"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {edu.score}
                  </span>
                </div>

                <div>
                  <h4
                    className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Highlights & Context
                  </h4>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-gray-600"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.88rem",
                          lineHeight: 1.6,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span
              className="text-gray-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
              }}
            >
              02
            </span>
            <span className="w-6 h-px bg-gray-200" />
            <h2
              className="text-gray-900"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.35rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Professional Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.a
                key={cert.name}
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.02] flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div>
                  <div className="p-3 w-fit rounded-xl bg-gray-50 border border-gray-100 text-gray-700 mb-4 group-hover:scale-105 transition-transform">
                    <Award size={20} />
                  </div>
                  <h3
                    className="text-gray-900 mb-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {cert.name}
                  </h3>
                  <p
                    className="text-gray-400 text-xs"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Issued by {cert.issuer}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 group-hover:text-gray-900 transition-colors">
                  <span>View Certificate</span>
                  <ExternalLink size={13} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <BackButton label="Back to Home" to="/" />
        </div>
      </div>
    </section>
  );
}
