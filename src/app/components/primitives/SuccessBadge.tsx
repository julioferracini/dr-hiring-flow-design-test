import { colors, tokens } from "../../constants";

interface SuccessBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function SuccessBadge({ children, className = "" }: SuccessBadgeProps) {
  return (
    <div
      className={`inline-flex items-center px-[4px] py-[2px] rounded-[4px] ${className}`}
      style={{ backgroundColor: colors.success.background }}
    >
      <span
        style={{
          fontFamily: tokens.fonts.nuSans,
          fontWeight: tokens.fontWeights.semibold,
          fontSize: tokens.fontSize.xs,
          color: colors.success.text,
          lineHeight: tokens.lineHeight.normal,
          fontFeatureSettings: tokens.fontFeatures.numbers,
        }}
      >
        {children}
      </span>
    </div>
  );
}
