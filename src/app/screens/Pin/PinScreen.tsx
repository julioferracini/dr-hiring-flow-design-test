import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import IOSBottomSheet from "../../components/IOSBottomSheet";
import svgPaths from "../../../imports/svg-ap41vbaqvh";
import { tokens } from "../../constants";
import { useTranslation } from "../../i18n/context";

interface PinScreenProps {
  onComplete?: () => void;
  onClose?: () => void;
}

function OutlinedUiActionsNavigationClose() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24.002px] top-1/2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0024 24.0024">
        <path d={svgPaths.p5753700} fill="black" fillOpacity="0.64" />
      </svg>
    </div>
  );
}

function PinDot({ filled }: { filled: boolean }) {
  return (
    <motion.div
      className="relative shrink-0 size-[48px] bg-[#efefef] rounded-[32px] flex items-center justify-center"
      animate={{ scale: filled ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {filled ? (
        <motion.div
          className="size-[16px] rounded-full bg-black"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
      ) : (
        <div className="size-[8px] rounded-full bg-black opacity-32" />
      )}
    </motion.div>
  );
}

const DELETE_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <line x1="18" y1="9" x2="12" y2="15" />
    <line x1="12" y1="9" x2="18" y2="15" />
  </svg>
);

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function Numpad({ onDigit, onDelete }: { onDigit: (d: string) => void; onDelete: () => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  return (
    <div className="grid grid-cols-3 gap-[8px] w-full max-w-[280px] mx-auto px-[16px] pb-[16px]">
      {keys.map((key, i) => {
        if (key === "") return <div key={i} />;

        const isDel = key === "del";

        return (
          <motion.button
            key={key}
            type="button"
            className="h-[52px] rounded-[16px] flex items-center justify-center cursor-pointer select-none"
            style={{
              backgroundColor: isDel ? "transparent" : "rgba(0,0,0,0.04)",
              color: isDel ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.88)",
              fontFamily: tokens.fonts.nuSans,
              fontWeight: 500,
              fontSize: isDel ? "16px" : "22px",
            }}
            onClick={() => (isDel ? onDelete() : onDigit(key))}
            whileTap={{ scale: 0.92, backgroundColor: isDel ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.10)" }}
            transition={{ duration: 0.08 }}
          >
            {isDel ? DELETE_ICON : key}
          </motion.button>
        );
      })}
    </div>
  );
}

export default function PinScreen({ onComplete, onClose }: PinScreenProps) {
  const { t } = useTranslation();
  const [pin, setPin] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);

  // Physical keyboard support (desktop)
  useEffect(() => {
    if (!isDesktop) return;
    const handler = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        setPin((prev) => (prev.length < 4 ? prev + e.key : prev));
      } else if (e.key === "Backspace") {
        setPin((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDesktop]);

  useEffect(() => {
    if (pin.length === 4) {
      const timer = setTimeout(() => onComplete?.(), 300);
      return () => clearTimeout(timer);
    }
  }, [pin, onComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) setPin(value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <IOSBottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      height={isDesktop ? "large" : "medium"}
      showHandle={true}
      enableSwipeDown={true}
      adjustForKeyboard={!isDesktop}
    >
      <div className="flex flex-col h-full w-full">
        {/* Header */}
        <div className="relative w-full h-[56px] px-[16px] flex items-center">
          <button
            className="size-[48px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            onClick={handleClose}
          >
            <div className="relative rounded-[64px] shrink-0 size-[32px] flex items-center justify-center">
              <OutlinedUiActionsNavigationClose />
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-start px-[24px] pt-[8px]">
          <div className="w-full text-center mb-[20px]">
            <p
              className="font-medium text-[20px] text-[rgba(0,0,0,0.96)] tracking-[-0.4px] leading-[1.2]"
              style={{ fontFamily: tokens.fonts.graphik }}
            >
              {t("pin.title")}
            </p>
          </div>

          <div className="flex gap-[16px] justify-center mb-[16px] w-full">
            <PinDot filled={pin.length >= 1} />
            <PinDot filled={pin.length >= 2} />
            <PinDot filled={pin.length >= 3} />
            <PinDot filled={pin.length >= 4} />
          </div>

          {/* Mobile: hidden native input for keyboard trigger */}
          {!isDesktop && (
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={handleInputChange}
              autoComplete="off"
              autoFocus
              className="w-full h-[1px] opacity-0 pointer-events-none"
            />
          )}
        </div>

        {/* Desktop: visual numpad */}
        {isDesktop && (
          <Numpad
            onDigit={(d) => setPin((prev) => (prev.length < 4 ? prev + d : prev))}
            onDelete={() => setPin((prev) => prev.slice(0, -1))}
          />
        )}

        <div className="h-[16px]" />
      </div>
    </IOSBottomSheet>
  );
}
