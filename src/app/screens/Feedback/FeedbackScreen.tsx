import { useState, useEffect } from "react";
import { motion } from "motion/react";
import svgPaths from "../../../imports/svg-htj6n9r419";
import imgFeedback from "figma:asset/7850f91201840d11465ee9d7c0fcafe2717b64a8.png";
import { tokens } from "../../constants";
import { useTranslation } from "../../i18n/context";

interface FeedbackScreenProps {
  onMakePayment?: () => void;
  onDoLater?: () => void;
  onClose?: () => void;
}

function Flag() {
  return (
    <div className="relative shrink-0 size-[84px]">
      <div className="absolute inset-[0_16.64%_0_17.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.5882 84">
          <g clipPath="url(#clip0_333_15613)">
            <path d={svgPaths.p30718800} fill="#AA68FF" />
            <path d={svgPaths.pbaaa70} fill="#AA68FF" />
            <path d={svgPaths.p3c34fe00} fill="#820AD1" />
            <mask height="37" id="mask0_333_15613" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="31" x="25" y="0">
              <path d={svgPaths.p30718800} fill="url(#paint0_linear_333_15613)" />
            </mask>
            <g mask="url(#mask0_333_15613)">
              <path d={svgPaths.p30718800} fill="#CEBAF4" />
            </g>
            <path d={svgPaths.pff1fa00} fill="#820AD1" opacity="0.8" />
            <mask height="39" id="mask1_333_15613" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="31" x="0" y="5">
              <path d={svgPaths.pbaaa70} fill="url(#paint1_linear_333_15613)" />
            </mask>
            <g mask="url(#mask1_333_15613)">
              <path d={svgPaths.pbaaa70} fill="#CEBAF4" />
            </g>
            <path d={svgPaths.p2c157e00} fill="#AA68FF" opacity="0.8" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_333_15613" x1="25.163" x2="55.2239" y1="18.2206" y2="18.2206">
              <stop />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_333_15613" x1="0.364469" x2="30.5427" y1="24.2797" y2="24.2797">
              <stop />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_333_15613">
              <rect fill="white" height="84" width="55.5882" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p15d88280} fill="#1F0230" fillOpacity="0.62" />
      </svg>
    </div>
  );
}

export default function FeedbackScreen({ onMakePayment, onDoLater, onClose }: FeedbackScreenProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="content-stretch flex flex-col items-center justify-end overflow-clip p-[16px] relative size-full">
      {/* Background with Image and Loop Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[40px] overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -8, 0]
        }}
        transition={{ 
          scale: { duration: 1, ease: "easeOut" },
          opacity: { duration: 0.8 },
          y: { 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }
        }}
      >
        <div className="absolute bg-[#bab8ff] inset-0 rounded-[40px]" />
        <motion.img
          alt=""
          className="absolute max-w-none object-cover rounded-[40px] size-full"
          src={imgFeedback}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
          animate={{
            rotateX: [0, 2, 0],
            rotateY: [0, -2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </motion.div>

      {/* Floating Bottom Card */}
      <motion.div
        className="bg-white relative rounded-[24px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] shrink-0 w-full z-10"
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          delay: 0.3
        }}
      >
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          {/* Flag Icon */}
          <motion.div
            className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.6
            }}
          >
            <Flag />
          </motion.div>

          {/* Title + Description */}
          <motion.div
            className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex flex-col font-medium justify-center leading-[1.2] relative shrink-0 text-[28px] text-[rgba(0,0,0,0.96)] w-full" style={{ fontFamily: tokens.fonts.nuSansDisplay }}>
              <p className="mb-0">{t('feedback.headline1')}</p>
              <p>{t('feedback.headline2')}</p>
            </div>
            <div className="flex flex-col justify-center leading-[1.5] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.64)] w-full" style={{ fontFamily: tokens.fonts.nuSans }}>
              <p className="mb-0">{t('feedback.body1')}</p>
              <p>{t('feedback.body2')}</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button
              className="bg-[#820ad1] h-[48px] w-full rounded-[64px] cursor-pointer"
              onClick={onMakePayment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center h-full px-[24px] py-[12px]">
                <div className="font-semibold text-[16px] text-white text-center" style={{ fontFamily: tokens.fonts.nuSans }}>
                  {t('feedback.makePayment')}
                </div>
              </div>
            </motion.button>

            <motion.button
              className="bg-[#efefef] h-[48px] w-full rounded-[64px] cursor-pointer"
              onClick={onDoLater}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(239,239,239,0.8)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center h-full px-[24px] py-[12px]">
                <div className="font-semibold text-[16px] text-[rgba(0,0,0,0.96)] text-center" style={{ fontFamily: tokens.fonts.nuSans }}>
                  {t('feedback.doLater')}
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Header with Close Button */}
      <motion.div
        className="absolute top-0 left-0 w-full z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="h-[44px] pb-[10px] pl-[32px] pr-[24px] pt-[18px]" />
        <div className="h-[64px] relative">
          <motion.button
            className="absolute left-[10px] top-1/2 -translate-y-1/2 size-[44px] flex items-center justify-center cursor-pointer"
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-sm content-stretch flex items-center justify-center relative rounded-[64px] shrink-0 size-[32px]">
              <CloseIcon />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}