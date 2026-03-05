import { motion } from "motion/react";
import { colors } from "../../constants";

interface CloseButtonProps {
  onClick: () => void;
  size?: number;
  iconColor?: string;
}

export function CloseButton({
  onClick,
  size = 36,
  iconColor = colors.text.primary,
}: CloseButtonProps) {
  return (
    <motion.button
      className="flex items-center justify-center rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "rgba(31,2,48,0)",
      }}
      onClick={onClick}
      whileHover={{ backgroundColor: "rgba(31,2,48,0.06)" }}
      whileTap={{ scale: 0.9, backgroundColor: "rgba(31,2,48,0.14)" }}
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 11.1785L15.2441 16.4226L16.4226 15.2441L11.1785 10L16.4226 4.75592L15.2441 3.57741L10 8.82149L4.75592 3.57741L3.57741 4.75592L8.82149 10L3.57741 15.2441L4.75592 16.4226L10 11.1785Z"
          fill={iconColor}
          fillOpacity="0.5"
        />
      </svg>
    </motion.button>
  );
}
