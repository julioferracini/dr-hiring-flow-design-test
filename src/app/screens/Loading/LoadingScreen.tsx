import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-osjlv45m9o";
import { tokens } from "../../constants";
import { useTranslation } from "../../i18n/context";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Step 1: Preparing your fresh start (0-50%)
    const step1Duration = 1800; // Reduzido de 2000ms
    const step1Interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 50) {
          clearInterval(step1Interval);
          return 50;
        }
        return prev + 2;
      });
    }, step1Duration / 25);

    // After 1.8 seconds, move to step 2
    const step1Timer = setTimeout(() => {
      setStep(2);
      
      // Step 2: Done! (50-100%)
      const step2Duration = 1200; // Reduzido de 1500ms
      const step2Interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(step2Interval);
            return 100;
          }
          return prev + 2;
        });
      }, step2Duration / 25);

      // After step 2 completes, transition to feedback screen
      const completeTimer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, step2Duration + 300);

      return () => {
        clearInterval(step2Interval);
        clearTimeout(completeTimer);
      };
    }, step1Duration);

    return () => {
      clearInterval(step1Interval);
      clearTimeout(step1Timer);
    };
  }, [onComplete]);

  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-end overflow-clip relative size-full">
      {/* Status Bar */}
      <motion.div
        className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col justify-center text-[15px] text-center text-white tracking-[-0.24px] font-['SF_Pro_Text']">
          <p className="leading-[20px]">11:08</p>
        </div>
        <div className="h-[20px] w-[67.661px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.6611 20">
            <path d={svgPaths.p25c9c700} fill="white" />
            <path d={svgPaths.p8fa51f0} fill="white" />
            <rect height="10.3333" opacity="0.35" rx="3.5" stroke="white" width="21" x="43.833" y="4.83333" />
            <path d={svgPaths.p2deda380} fill="white" opacity="0.4" />
            <rect fill="white" height="7.33333" rx="2.3" width="18" x="45.333" y="6.33333" />
          </svg>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 w-full relative flex items-end justify-center pb-[80px]">
        <div className="flex flex-col gap-[32px] items-center w-full px-[24px]">
          {/* Title Stack - Altura otimizada */}
          <div className="relative w-full h-[200px] flex items-end pb-[20px]">
            {/* Step 1: Preparing your fresh start */}
            <motion.div
              className="absolute w-full bottom-[20px]"
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: step === 2 ? -90 : 0,
                opacity: step === 2 ? 0.2 : 1
              }}
              transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <p 
                className="font-medium text-[36px] text-[rgba(0,0,0,0.96)] tracking-[-1.08px] leading-[1.1]"
                style={{ fontFamily: tokens.fonts.graphik, fontWeight: tokens.fontWeights.medium }}
              >
                {t('loading.step1')}
              </p>
            </motion.div>

            {/* Step 2: Done! */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  className="absolute w-full bottom-[20px]"
                  initial={{ y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  <p 
                    className="font-medium text-[36px] text-[rgba(0,0,0,0.96)] tracking-[-1.08px] leading-[1.1]"
                    style={{ fontFamily: tokens.fonts.graphik, fontWeight: tokens.fontWeights.medium }}
                  >
                    {t('loading.step2')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="h-[4px] w-full bg-[#efefef] rounded-[8px] relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#820AD1] rounded-[8px]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ 
                duration: 0.2, 
                ease: [0.25, 0.1, 0.25, 1]
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}