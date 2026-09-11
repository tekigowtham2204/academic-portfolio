import { motion } from "motion/react";
import { Download, Printer, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { BackButton } from "../components/BackButton";
import { experience, projects, education, skills, contactLinks } from "../data/portfolio-data";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back and Action Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-10 print:hidden">
          <BackButton label="Back to Home" to="/" />
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-xs font-medium cursor-pointer transition-all shadow-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Printer size={14} />
              Print / Save as PDF
            </button>
            <a
              href="mailto:tekigowtham07@gmail.com?subject=Opportunity%20Inquiry%20-%20Teki%20Gowtham%20Bhaskar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-medium cursor-pointer transition-all hover:bg-gray-800 shadow-sm no-underline"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Mail size={14} />
              Contact Directly
            </a>
          </div>
        </div>

        {/* Paper Container for Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-8 sm:p-14 rounded-3xl border border-gray-100 shadow-xl shadow-black/[0.03] print:p-0 print:border-none print:shadow-none"
        >
          {/* Header */}
          <div className="border-b border-gray-100 pb-8 mb-8">
            <h1
              className="text-gray-900 mb-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "2.2rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Teki Gowtham Bhaskar
            </h1>
            <p
              className="text-gray-500 mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              AI Product Developer • Full-Stack AI Engineer
            </p>

            <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-gray-400" />
                <a href="mailto:tekigowtham07@gmail.com" className="hover:text-gray-900 text-gray-600">tekigowtham07@gmail.com</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-gray-400" />
                <a href="tel:+918341725726" className="hover:text-gray-900 text-gray-600">+91 8341725726</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Linkedin size={13} className="text-gray-400" />
                <a href="https://linkedin.com/in/gowthambhaskar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 text-gray-600">linkedin.com/in/gowthambhaskar</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Github size={13} className="text-gray-400" />
                <a href="https://github.com/tekigowtham2204" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 text-gray-600">github.com/tekigowtham2204</a>
              </span>
            </div>
          </div>

          {/* Section: Skills */}
          <div className="mb-8">
            <h2
              className="text-xs uppercase font-bold text-gray-900 tracking-wider mb-4 border-b border-gray-100 pb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Skills
            </h2>
            <div className="space-y-2 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div>
                <strong className="text-gray-900 font-semibold">Languages: </strong>
                <span className="text-gray-600">Python, SQL, TypeScript, JavaScript</span>
              </div>
              <div>
                <strong className="text-gray-900 font-semibold">Tools/Platforms: </strong>
                <span className="text-gray-600">Excel, Notion, Linear, Figma, GitHub, LangChain</span>
              </div>
              <div>
                <strong className="text-gray-900 font-semibold">Technologies: </strong>
                <span className="text-gray-600">LLM API Integration (Claude, OpenAI), Prompt Engineering, RAG Systems, Local LLM Deployment, AI Agent Architecture</span>
              </div>
              <div>
                <strong className="text-gray-900 font-semibold">Engineering: </strong>
                <span className="text-gray-600">Multi-Tenant Architecture, Role-Based Access Control, Asynchronous Processing, Webhooks, API Integration, Database Design</span>
              </div>
            </div>
          </div>

          {/* Section: Experience */}
          <div className="mb-8">
            <h2
              className="text-xs uppercase font-bold text-gray-900 tracking-wider mb-4 border-b border-gray-100 pb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Experience
            </h2>
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <div>
                  <strong className="text-sm text-gray-900 font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Syncgaze
                  </strong>{" "}
                  <span className="text-xs text-gray-500">| AI Product Developer • Full-time • India</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Aug '25 – Present</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                {experience.responsibilities.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Projects */}
          <div className="mb-8">
            <h2
              className="text-xs uppercase font-bold text-gray-900 tracking-wider mb-4 border-b border-gray-100 pb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Projects
            </h2>
            <div className="space-y-6">
              {projects.slice(0, 3).map((p) => (
                <div key={p.id}>
                  <div className="flex items-baseline justify-between mb-1">
                    <div>
                      <strong className="text-sm text-gray-900 font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {p.shortTitle}
                      </strong>{" "}
                      <span className="text-xs text-gray-500">| {p.role} | </span>
                      <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-900 underline font-medium">
                        Link
                      </a>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{p.period}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <li>{p.description}</li>
                    {p.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div>
            <h2
              className="text-xs uppercase font-bold text-gray-900 tracking-wider mb-4 border-b border-gray-100 pb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Education
            </h2>
            <div className="space-y-4 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="flex items-baseline justify-between">
                <div>
                  <strong className="text-gray-900 font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Lovely Professional University
                  </strong>{" "}
                  <span className="text-gray-500">| Phagwara, Punjab</span>
                  <div className="text-gray-600 mt-0.5">Electronics and Communication Engineering; CGPA: 6.64</div>
                </div>
                <span className="text-gray-400 font-medium">Aug '21 – Present</span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <strong className="text-gray-900 font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Tirumala Junior College
                  </strong>{" "}
                  <span className="text-gray-500">| Andhra Pradesh</span>
                  <div className="text-gray-600 mt-0.5">MPC Stream; Percentage: 97%</div>
                </div>
                <span className="text-gray-400 font-medium">May '23</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Back Button */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center print:hidden">
          <BackButton label="Back to Home" to="/" />
        </div>
      </div>
    </section>
  );
}
