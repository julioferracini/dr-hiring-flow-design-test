import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { tokens } from "../constants";

interface PulseDiscountProps {
  discount: string;
  delay?: number;
}

export default function PulseDiscount({ discount, delay = 150 }: PulseDiscountProps) {
  const [displayDiscount, setDisplayDiscount] = useState(discount);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayDiscount(discount);
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [discount, delay]);

  return (
    <motion.div
      animate={shouldAnimate ? { 
        scale: [1, 1.08, 1],
      } : {}}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="bg-[#ddf5e5] content-stretch flex items-center max-w-[359px] min-h-[20px] overflow-clip px-[4px] py-[2px] relative rounded-[4px]"
    >
      <motion.p
        key={displayDiscount}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-[1_0_0] font-semibold leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#0c7a3a] text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap"
        style={{ fontFeatureSettings: "'tnum'", fontFamily: tokens.fonts.nuSans }}
      >
        {displayDiscount}
      </motion.p>
    </motion.div>
  );
}