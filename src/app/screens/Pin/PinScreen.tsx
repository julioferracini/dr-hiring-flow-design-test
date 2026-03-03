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

export default function PinScreen({ onComplete, onClose }: PinScreenProps) {
  const { t } = useTranslation();
  const [pin, setPin] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus no mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Complete quando tiver 4 dígitos
  useEffect(() => {
    if (pin.length === 4) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pin, onComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setPin(value);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <IOSBottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      height="medium"
      showHandle={true}
      enableSwipeDown={true}
      adjustForKeyboard={true}
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

        {/* Content - Centralizado */}
        <div className="flex-1 flex flex-col items-center justify-start px-[24px] pt-[16px]">
          {/* Title */}
          <div className="w-full text-center mb-[32px]">
            <p
              className="font-medium text-[20px] text-[rgba(0,0,0,0.96)] tracking-[-0.4px] leading-[1.2]"
              style={{ fontFamily: tokens.fonts.graphik }}
            >
              {t('pin.title')}
            </p>
          </div>

          {/* Pin Dots - Centralizado */}
          <div className="flex gap-[16px] justify-center mb-[24px] w-full">
            <PinDot filled={pin.length >= 1} />
            <PinDot filled={pin.length >= 2} />
            <PinDot filled={pin.length >= 3} />
            <PinDot filled={pin.length >= 4} />
          </div>

          {/* Native Input - Hidden but focused */}
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

          {/* Helper Text */}
          <div className="text-center w-full">
            <p
              className="text-[14px] text-[rgba(0,0,0,0.62)] leading-[1.3]"
              style={{ fontFamily: tokens.fonts.graphik }}
            >
              {t('pin.subtitle')}
            </p>
          </div>
        </div>

        {/* Bottom Padding - Padronizado */}
        <div className="h-[32px]" />
      </div>
    </IOSBottomSheet>
  );
}