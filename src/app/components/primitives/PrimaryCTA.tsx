import { motion } from "motion/react";
import { colors, tokens } from "../../constants";

interface PrimaryCTAProps {
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  height?: number;
  className?: string;
}

export function PrimaryCTA({
  label,
  onClick,
  disabled = false,
  height = 52,
  className = "",
}: PrimaryCTAProps) {
  return (
    <motion.button
      className={`w-full flex items-center justify-center ${className}`}
      style={{
        height: `${height}px`,
        borderRadius: tokens.radius["2xl"],
        backgroundColor: disabled ? colors.neutral.disabled : colors.primary.purple,
        boxShadow: disabled ? "none" : tokens.shadows.cta,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      <span
        style={{
          fontFamily: tokens.fonts.nuSans,
          fontWeight: tokens.fontWeights.semibold,
          fontSize: tokens.fontSize.md,
          color: disabled ? colors.neutral.disabledText : colors.text.inverse,
          letterSpacing: tokens.letterSpacing.snug,
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
