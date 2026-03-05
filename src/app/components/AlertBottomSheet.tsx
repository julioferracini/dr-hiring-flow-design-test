import { motion } from "motion/react";
import { colors, tokens } from "../constants";
import { BottomSheetHandle } from "./primitives";

interface AlertBottomSheetProps {
  /** Callback ao fechar/confirmar o alerta */
  onClose: () => void;
  /** Valor mínimo exigido — default $24.00 */
  minimumValue?: string;
}

export default function AlertBottomSheet({
  onClose,
  minimumValue = "$24.00",
}: AlertBottomSheetProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center md:rounded-[40px] overflow-hidden"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Sheet */}
      <motion.div
        className="relative w-full bg-white rounded-t-[32px] shadow-lg"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <BottomSheetHandle className="pt-[12px] pb-[8px]" />

        {/* Content */}
        <div className="px-[24px] pt-[8px] pb-[36px] flex flex-col items-center gap-[16px]">
          {/* Ícone */}
          <div
            className="w-[64px] h-[64px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#FEF0F0" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#E53E3E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Título */}
          <h3
            className="text-center"
            style={{
              fontFamily: tokens.fonts.graphik,
              fontWeight: tokens.fontWeights.medium,
              fontSize: "24px",
              color: colors.text.primary,
              letterSpacing: "-0.72px",
              lineHeight: "1.2",
            }}
          >
            Value too low
          </h3>

          {/* Descrição */}
          <p
            className="text-center"
            style={{
              fontFamily: tokens.fonts.nuSans,
              fontSize: "16px",
              color: "rgba(0,0,0,0.64)",
              lineHeight: "1.5",
            }}
          >
            The minimum monthly payment must be at least{" "}
            <span
              style={{ fontWeight: 600, color: colors.text.primary }}
            >
              {minimumValue}
            </span>
            . Please enter a higher amount to continue.
          </p>

          {/* Botão */}
          <motion.button
            className="w-full h-[48px] rounded-[28px] flex items-center justify-center mt-[4px]"
            style={{
              backgroundColor: colors.primary.purple,
              boxShadow: "0px 2px 12px rgba(130,10,209,0.28)",
            }}
            onClick={onClose}
            whileTap={{ scale: 0.97 }}
          >
            <span
              style={{
                fontFamily: tokens.fonts.graphik,
                fontWeight: tokens.fontWeights.medium,
                fontSize: "16px",
                color: "#FFFFFF",
                letterSpacing: "-0.16px",
              }}
            >
              Got it
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
