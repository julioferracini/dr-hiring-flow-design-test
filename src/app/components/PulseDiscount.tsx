import { motion, AnimatePresence } from "motion/react";
import { tokens } from "../constants";

interface PulseDiscountProps {
  discount: string;
  delay?: number;
}

export default function PulseDiscount({ discount, delay = 150 }: PulseDiscountProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={discount}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          opacity: { duration: 0.35, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] },
          y: { duration: 0.4, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] },
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="bg-[#ddf5e5] content-stretch flex items-center max-w-[359px] min-h-[20px] overflow-clip px-[4px] py-[2px] relative rounded-[4px]"
        >
          <p
            className="flex-[1_0_0] font-semibold leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#0c7a3a] text-[12px] text-center text-ellipsis tracking-[-0.24px] whitespace-nowrap"
            style={{ fontFeatureSettings: "'tnum'", fontFamily: tokens.fonts.nuSans }}
          >
            {discount}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
