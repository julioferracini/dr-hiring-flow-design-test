import { tokens, colors } from "../../constants";
import { Divider } from "./Divider";

interface ListRowProps {
  label: string;
  value: React.ReactNode;
  showDivider?: boolean;
  labelColor?: string;
  valueColor?: string;
}

export function ListRow({
  label,
  value,
  showDivider = true,
  labelColor = colors.text.muted,
  valueColor = colors.text.primary,
}: ListRowProps) {
  return (
    <>
      <div className="flex items-center justify-between py-[14px] w-full">
        <span
          style={{
            fontFamily: tokens.fonts.nuSans,
            fontWeight: tokens.fontWeights.normal,
            fontSize: tokens.fontSize.base,
            color: labelColor,
            letterSpacing: tokens.letterSpacing.tight,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: tokens.fonts.nuSans,
            fontWeight: tokens.fontWeights.medium,
            fontSize: tokens.fontSize.base,
            color: valueColor,
            letterSpacing: tokens.letterSpacing.tight,
            textAlign: "right",
          }}
        >
          {value}
        </span>
      </div>
      {showDivider && <Divider height={1} color={colors.border.default} />}
    </>
  );
}
