import { motion } from "motion/react";
import { colors } from "../../constants";

interface LoadingSpinnerProps {
  size?: number;
  borderWidth?: number;
  color?: string;
}

export function LoadingSpinner({
  size = 32,
  borderWidth = 3,
  color = colors.primary.purple,
}: LoadingSpinnerProps) {
  return (
    <motion.div
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `${borderWidth}px solid ${colors.neutral.grayLight}`,
        borderTopColor: color,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}
