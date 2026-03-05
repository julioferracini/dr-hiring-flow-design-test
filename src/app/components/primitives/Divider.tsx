import { colors } from "../../constants";

interface DividerProps {
  color?: string;
  height?: number;
  className?: string;
}

export function Divider({
  color = colors.border.divider,
  height = 2,
  className = "",
}: DividerProps) {
  return (
    <div
      className={`w-full shrink-0 ${className}`}
      style={{ height: `${height}px`, backgroundColor: color }}
    />
  );
}
