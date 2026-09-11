import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router";
import { useLenis } from "./SmoothScrollProvider";

interface NavItem {
  name: string;
  type: "section" | "route";
  target: string;
}

const navItems: NavItem[] = [
  { name: "About", type: "section", target: "about" },
  { name: "Experience", type: "section", target: "experience" },
  { name: "Projects", type: "section", target: "projects" },
  { name: "Skills", type: "section", target: "skills" },
  { name: "Education", type: "route", target: "/education" },
  { name: "Resume", type: "route", target: "/resume" },
  { name: "Contact", type: "section", target: "contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/" || location.pathname === "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (isHomePage) {
        const sections = ["about", "experience", "projects", "skills", "contact"];
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(sections[i]);
              return;
            }
          }
        }
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavClick = (item: NavItem) => {
    setMobileMenuOpen(false);

    if (item.type === "route") {
      navigate(item.target);
      return;
    }

    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(item.target);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -80, duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
      return;
    }

    const el = document.getElementById(item.target);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isItemActive = (item: NavItem) => {
    if (item.type === "route") {
      return location.pathname === item.target;
    }
    return isHomePage && activeSection === item.target;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]"
    >
      <nav
        className={`flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-gray-200/70 shadow-lg shadow-black/5"
            : "bg-white/65 backdrop-blur-md border-gray-200/40"
        }`}
      >
        <button
          onClick={() => {
            if (!isHomePage) {
              navigate("/");
            } else {
              if (lenis) {
                lenis.scrollTo(0, { duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }
          }}
          className="px-3.5 py-1.5 rounded-full text-gray-900 cursor-pointer font-bold transition-transform hover:scale-105"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}
        >
          GT
        </button>

        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`relative px-3.5 py-1.5 rounded-full cursor-pointer transition-colors duration-300 ${
                  active
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 450 }}
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gray-900 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleNavClick({ name: "Contact", type: "section", target: "contact" })}
          className="hidden md:block ml-1 px-4 py-1.5 bg-gray-900 text-white rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 500 }}
        >
          Hire Me
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-gray-700 cursor-pointer"
          aria-label="Toggle Menu"
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
            className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/70 shadow-2xl p-3"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  isItemActive(item)
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem" }}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick({ name: "Contact", type: "section", target: "contact" })}
              className="w-full mt-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl cursor-pointer text-center font-medium"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem" }}
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}