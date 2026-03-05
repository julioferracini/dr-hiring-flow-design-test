import { colors } from "../../constants";

interface BottomSheetHandleProps {
  width?: number;
  className?: string;
}

export function BottomSheetHandle({ width = 36, className = "" }: BottomSheetHandleProps) {
  return (
    <div className={`flex justify-center pt-[10px] pb-[2px] ${className}`}>
      <div
        className="h-[5px] rounded-full"
        style={{ width: `${width}px`, backgroundColor: colors.overlay.light }}
      />
    </div>
  );
}
