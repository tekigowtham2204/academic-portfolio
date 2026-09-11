import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function BackButton({
  label = "Back",
  to,
}: {
  label?: string;
  to?: string;
}) {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer group"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.85rem",
        fontWeight: 450,
      }}
    >
      <ArrowLeft
        size={16}
        className="group-hover:-translate-x-1 transition-transform duration-200"
      />
      {label}
    </motion.button>
  );
}
