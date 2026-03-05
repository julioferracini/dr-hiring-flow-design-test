import { colors } from "../../constants";

interface BackChevronIconProps {
  size?: number;
  color?: string;
}

export function BackChevronIcon({
  size = 28,
  color = colors.text.primary,
}: BackChevronIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L10 14L18 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
