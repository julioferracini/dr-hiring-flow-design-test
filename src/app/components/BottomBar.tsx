import { motion, AnimatePresence } from "motion/react";
import { tokens, colors } from "../constants";

interface BottomBarProps {
  variant: 'simulation' | 'date' | 'summary';
  onContinue?: () => void;
  onViewTerms?: () => void;
  
  // For simulation variant
  total?: number;
  originalPrice?: number;
  isFastChange?: boolean;
  isDisabled?: boolean;
  
  // For date variant
  selectedDate?: Date | null;
}

function AnimatedNumber({ value, delay = 0, lineHeight = 1, isFastChange = false }: { value: string, delay?: number, lineHeight?: number, isFastChange?: boolean }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: isFastChange ? -8 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isFastChange ? 8 : 12 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 0.9,
        delay: isFastChange ? 0 : delay
      }}
      style={{ display: "inline-block", lineHeight }}
    >
      {value}
    </motion.span>
  );
}

function MagicDivider() {
  return (
    <motion.div 
      className="bg-[#efefef] h-[2px] shrink-0 w-full" 
      data-name="Divider"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
  );
}

export default function BottomBar({ variant, onContinue, onViewTerms, total, originalPrice, isFastChange, isDisabled, selectedDate }: BottomBarProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  // Simulation variant
  if (variant === 'simulation') {
    return (
      <div className="absolute left-1/2 -translate-x-1/2 content-stretch flex flex-col items-start bottom-0 w-full max-h-[100px]">
        <MagicDivider />
        <div className="relative shrink-0 w-full h-full" style={{ backgroundColor: colors.neutral.white }}>
          <div className="content-stretch flex flex-col gap-[8px] items-center justify-center pt-[16px] pb-[32px] px-[20px] relative shrink-0 w-full h-full">
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px not-italic overflow-clip relative text-ellipsis whitespace-pre-wrap">
                <p className="font-semibold leading-[1.3] overflow-hidden relative shrink-0 text-[18px] w-full" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary }}>
                  Total: $ <AnimatedNumber value={total?.toFixed(2) || '0.00'} delay={0.2} lineHeight={0.7} isFastChange={isFastChange} />
                </p>
                <p className="[text-decoration-skip-ink:none] decoration-solid font-medium leading-[1.5] line-through overflow-hidden relative shrink-0 text-[16px] tracking-[-0.16px] w-full" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: tokens.fontWeights.medium, color: colors.text.secondary }}>
                  $ {originalPrice?.toFixed(2) || '0.00'}
                </p>
              </div>
              <motion.button
                className={`content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] min-h-[48px] px-[24px] py-[16px] relative rounded-[28px] shrink-0 transition-all ${
                  isDisabled 
                    ? 'bg-[rgba(130,10,209,0.5)] cursor-not-allowed' 
                    : 'bg-[#820ad1] cursor-pointer'
                }`}
                style={{ boxShadow: '0px 1px 0px 0px rgba(31,0,47,0.05)' }}
                onClick={isDisabled ? undefined : onContinue}
                whileHover={isDisabled ? {} : { scale: 1.02 }}
                whileTap={isDisabled ? {} : { scale: 0.98 }}
                disabled={isDisabled}
              >
                <div className={`flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white whitespace-nowrap transition-opacity ${
                  isDisabled ? 'opacity-60' : 'opacity-100'
                }`} style={{ fontFamily: tokens.fonts.nuSans, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                  <p className="leading-[1.3] overflow-hidden">Next</p>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08),inset_0px_-1px_0px_0px_rgba(31,2,48,0.46)]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Date variant
  if (variant === 'date') {
    const buttonText = selectedDate ? `Continue to ${formatDate(selectedDate)}` : 'Continue';

    return (
      <motion.div
        className="absolute backdrop-blur-[8px] bg-[rgba(255,255,255,0.84)] bottom-0 content-stretch flex flex-col items-center justify-center left-0 right-0 w-full max-h-[100px]"
        data-name="Bottom Wrapper"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 35,
          mass: 0.8
        }}
      >
        <div className="bg-[#efefef] h-[2px] shrink-0 w-full" data-name="Divider" />
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center pt-[16px] pb-[32px] px-[20px] relative shrink-0 w-full h-full">
          <motion.button
            className="bg-[#820ad1] content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] min-h-[48px] px-[24px] py-[16px] relative rounded-[28px] shrink-0 w-full cursor-pointer"
            data-name="Button"
            onClick={onContinue}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ boxShadow: '0px 2px 8px rgba(130, 10, 209, 0.25)' }}
          >
            <motion.div 
              className="flex flex-col font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white tracking-[-0.16px] whitespace-nowrap" 
              style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, fontWeight: tokens.fontWeights.medium }}
              key={buttonText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p className="leading-[1.3] overflow-hidden">{buttonText}</p>
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Summary variant
  return (
    <motion.div 
      className="absolute backdrop-blur-[8px] bg-[rgba(236,233,238,0.64)] bottom-0 content-stretch flex flex-col items-center left-1/2 -translate-x-1/2 w-full max-h-[100px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="bg-[#efefef] h-[2px] shrink-0 w-full" data-name="Divider" />
      <div className="content-stretch flex flex-col items-center justify-between gap-[8px] pt-[16px] pb-[32px] px-[20px] relative w-full flex-1">
        <motion.button
          className="bg-[#820ad1] content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] min-h-[48px] px-[24px] py-[16px] relative rounded-[28px] shrink-0 w-full cursor-pointer"
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ boxShadow: '0px 2px 8px rgba(130, 10, 209, 0.25)' }}
        >
          <div className="flex flex-col font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white tracking-[-0.16px] whitespace-nowrap" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers }}>
            <p className="leading-[1.3] overflow-hidden">Continue</p>
          </div>
        </motion.button>
        
        <motion.div 
          className="flex flex-col items-center w-full shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center tracking-[0.12px] w-full" style={{ fontFamily: tokens.fonts.nuSans, fontFeatureSettings: tokens.fontFeatures.numbers, color: 'rgba(0,0,0,0.64)' }}>
            <p className="whitespace-pre-wrap">
              <span className="leading-[1.3]">By confirming, you accept the </span>
              <motion.span 
                className="leading-[1.3] cursor-pointer" 
                style={{ color: colors.primary.purple }}
                onClick={onViewTerms}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ opacity: 0.6 }}
              >
                Terms & Conditions.
              </motion.span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}