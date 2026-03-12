import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLenis } from "./SmoothScrollProvider";

const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <nav
        className={`flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-gray-200/60 shadow-lg shadow-black/5"
            : "bg-white/60 backdrop-blur-md border-gray-200/40"
        }`}
      >
        <motion.button
          onClick={() => {
            if (lenis) {
              lenis.scrollTo(0, { duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="px-4 py-2 rounded-full text-gray-900 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
        >
          GT
        </motion.button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item)}
              className={`relative px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 ${
                activeSection === item.toLowerCase()
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 450 }}
            >
              {activeSection === item.toLowerCase() && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gray-900 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={() => scrollTo("contact")}
          className="hidden md:block ml-1 px-5 py-2 bg-gray-900 text-white rounded-full cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}
        >
          Hire Me
        </motion.button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-gray-700 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-xl p-3"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="w-full mt-1 px-4 py-3 bg-gray-900 text-white rounded-xl cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}