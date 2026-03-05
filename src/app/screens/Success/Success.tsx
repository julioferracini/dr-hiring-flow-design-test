import { motion } from "motion/react";
import { colors, tokens } from "../../constants";
import { useTranslation } from "../../i18n/context";

export default function SuccessScreen() {
  const { t } = useTranslation();
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center overflow-clip relative md:rounded-[40px] size-full">
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Success Icon */}
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#DDF5E5' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.svg 
            width="48" height="48" viewBox="0 0 24 24" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.path 
              d="M20 6L9 17L4 12" 
              stroke="#0C7A3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>

        {/* Success Message */}
        <motion.div
          className="flex flex-col items-center gap-3 px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 
            className="text-[32px] font-medium text-center"
            style={{ fontFamily: tokens.fonts.graphik, color: colors.text.primary, letterSpacing: '-0.96px' }}
          >
            {t('success.subtitle')}
          </h1>
          <p 
            className="text-[16px] text-center max-w-[300px]"
            style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', lineHeight: '1.5' }}
          >
            {t('success.message')}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}