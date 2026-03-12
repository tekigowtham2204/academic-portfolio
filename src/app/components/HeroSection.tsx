import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { useLenis } from "./SmoothScrollProvider";
import heroPhoto from "../../assets/f526295bdde79bfd018746c5da9d08c05fa3c1c9.png";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yPos = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x: x * 15, y: yPos * 15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40" />
      </motion.div>

      <motion.div style={{ y }} className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 mb-8"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
              >
                <Sparkles size={14} />
                Open to Opportunities
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-900 mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Gowtham
              <br />
              Bhaskar Teki
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-500 max-w-md mx-auto lg:mx-0 mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Aspiring GenAI Product Manager building LLM-powered products
              across Healthcare, EdTech, and FinTech.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {["GenAI PM", "LLM Systems", "User Research", "Product Strategy", "RAG Pipelines"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 450 }}
                  >
                    {tag}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            className="relative order-1 lg:order-2 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative"
              animate={{
                rotateY: mousePos.x * 0.6,
                rotateX: -mousePos.y * 0.6,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 22 }}
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              {/* ── Rotated gradient backing card ── */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  borderRadius: "52% 48% 42% 58% / 44% 56% 44% 56%",
                  background: "linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 60%, #fce7f3 100%)",
                  transform: "rotate(7deg) scale(1.06)",
                  transformStyle: "preserve-3d",
                  translateZ: "-20px",
                }}
                animate={{
                  borderRadius: [
                    "52% 48% 42% 58% / 44% 56% 44% 56%",
                    "44% 56% 56% 44% / 52% 44% 56% 48%",
                    "52% 48% 42% 58% / 44% 56% 44% 56%",
                  ],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Dashed border outline ── */}
              <motion.div
                className="absolute -inset-3 z-0 border-2 border-dashed border-gray-200/60"
                style={{ borderRadius: "54% 46% 44% 56% / 46% 58% 42% 54%" }}
                animate={{
                  borderRadius: [
                    "54% 46% 44% 56% / 46% 58% 42% 54%",
                    "46% 54% 58% 42% / 54% 46% 58% 46%",
                    "54% 46% 44% 56% / 46% 58% 42% 54%",
                  ],
                  rotate: [0, 3, 0, -3, 0],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Main photo blob ── */}
              <motion.div
                className="relative z-10 overflow-hidden w-64 h-80 md:w-[300px] md:h-[380px]"
                style={{ borderRadius: "52% 48% 42% 58% / 44% 56% 44% 56%" }}
                animate={{
                  borderRadius: [
                    "52% 48% 42% 58% / 44% 56% 44% 56%",
                    "44% 56% 56% 44% / 52% 44% 56% 48%",
                    "52% 48% 42% 58% / 44% 56% 44% 56%",
                  ],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* subtle vignette */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, transparent 55%, rgba(255,255,255,0.25) 100%)",
                  }}
                />
                <img
                  src={heroPhoto}
                  alt="Gowtham Bhaskar Teki"
                  className="w-full h-full object-cover object-top scale-105"
                />
              </motion.div>

              {/* ── Corner brackets ── */}
              {[
                { pos: "top-0 left-0", b: "border-t-2 border-l-2 rounded-tl-lg" },
                { pos: "top-0 right-0", b: "border-t-2 border-r-2 rounded-tr-lg" },
                { pos: "bottom-0 left-0", b: "border-b-2 border-l-2 rounded-bl-lg" },
                { pos: "bottom-0 right-0", b: "border-b-2 border-r-2 rounded-br-lg" },
              ].map(({ pos, b }, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${pos} w-5 h-5 border-gray-400 ${b} z-20`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}

              {/* ── Floating badges ── */}
              <motion.div
                className="absolute -right-6 top-10 z-30 bg-white rounded-2xl shadow-xl shadow-black/8 px-4 py-2.5 border border-gray-100/80"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
              >
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>Degree</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#111827" }}>B.Tech ECE</p>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-14 z-30 bg-white rounded-2xl shadow-xl shadow-black/8 px-4 py-2.5 border border-gray-100/80"
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
              >
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>Focus</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#111827" }}>AI / ML</p>
              </motion.div>

              {/* ── Dot grid decoration ── */}
              <motion.div
                className="absolute -bottom-6 -right-6 z-0 grid grid-cols-4 gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-gray-300/70" />
                ))}
              </motion.div>

            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <button
          onClick={() => {
            const el = document.getElementById("about");
            if (!el) return;
            if (lenis) {
              lenis.scrollTo(el, { offset: -80, duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Scroll
          </span>
          <ArrowDown size={16} />
        </button>
      </motion.div>
    </motion.section>
  );
}