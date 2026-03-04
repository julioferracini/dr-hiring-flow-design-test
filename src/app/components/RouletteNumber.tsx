import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { tokens } from "../constants";

interface RouletteNumberProps {
  value: string;
  delay?: number;
  className?: string;
}

export default function RouletteNumber({
  value,
  delay = 0,
  className = "",
}: RouletteNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
      setKey((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <span className={`inline-block ${className}`} style={{ fontFeatureSettings: "'lnum', 'pnum'", fontFamily: tokens.fonts.nuSansDisplay, letterSpacing: "-1.08px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${displayValue}-${key}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="inline-block"
          style={{ fontFeatureSettings: "'lnum', 'pnum'", fontFamily: tokens.fonts.nuSansDisplay, letterSpacing: "-1.08px" }}
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}