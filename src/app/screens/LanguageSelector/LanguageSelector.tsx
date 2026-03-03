/**
 * Language Selector Screen
 * Tela inicial para seleção de idioma
 */

import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ALL_LOCALES } from '../../i18n/config';
import type { Locale } from '../../i18n/types';
import { tokens } from '../../constants';

interface LanguageSelectorProps {
  onSelectLanguage: (locale: Locale) => void;
  onBack?: () => void;
}

export default function LanguageSelector({ onSelectLanguage, onBack }: LanguageSelectorProps) {
  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Status Bar */}
      <div className="h-[44px] bg-[#820AD1] w-full">
        <div className="flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] size-full">
          <div className="flex flex-col font-['SF_Pro_Text'] font-semibold justify-center leading-[0] text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap">
            <p className="leading-[20px]">09:07</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#820AD1] px-[24px] pt-[16px] pb-[48px]">
        {/* Back button */}
        {onBack && (
          <motion.button
            className="flex items-center gap-[4px] mb-[16px] -ml-[4px]"
            onClick={onBack}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.94 }}
          >
            <ChevronLeft className="size-[20px] text-white/80" strokeWidth={2.5} />
            <span
              className="text-white/80 text-[15px] leading-none"
              style={{ fontFamily: tokens.fonts.nuSans }}
            >
              Flows
            </span>
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-white text-[32px] font-bold leading-[1.2] mb-[12px]"
            style={{ fontFamily: tokens.fonts.nuSans }}
          >
            Debt Resolution
          </h1>
          <p
            className="text-white/80 text-[16px] leading-[1.4]"
            style={{ fontFamily: tokens.fonts.nuSans }}
          >
            Choose a language to view the conditions screen
          </p>
        </motion.div>
      </div>

      {/* Language List */}
      <div className="flex-1 overflow-y-auto px-[24px] pt-[32px] pb-[24px]">
        <motion.div
          className="space-y-[12px]"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {ALL_LOCALES.map((locale, index) => {
            const isActive = locale.status === 'active';
            
            return (
              <motion.button
                key={locale.code}
                className={`
                  w-full bg-white rounded-[16px] p-[20px]
                  flex items-center justify-between
                  shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                  transition-all duration-200
                  ${
                    isActive
                      ? 'hover:shadow-[0_4px_20px_rgba(130,10,209,0.15)] active:scale-[0.98]'
                      : 'opacity-60 cursor-not-allowed'
                  }
                `}
                onClick={() => isActive && onSelectLanguage(locale.code as Locale)}
                disabled={!isActive}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                whileHover={isActive ? { scale: 1.02 } : {}}
                whileTap={isActive ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-[16px]">
                  {/* Flag */}
                  <div className="text-[32px] leading-none">{locale.flag}</div>
                  
                  {/* Language Info */}
                  <div className="text-left">
                    <div
                      className="text-[#1f0230] text-[17px] font-semibold leading-[1.3]"
                      style={{ fontFamily: tokens.fonts.nuSans }}
                    >
                      {locale.nativeName}
                    </div>
                    {locale.status === 'active' && 'testLabel' in locale && (
                      <div
                        className="text-[#1f0230]/60 text-[14px] leading-[1.3] mt-[2px]"
                        style={{ fontFamily: tokens.fonts.nuSans }}
                      >
                        {locale.testLabel}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                {locale.status === 'soon' && (
                  <div className="bg-[#F3F2F3] rounded-full px-[12px] py-[6px]">
                    <span
                      className="text-[#820AD1] text-[12px] font-semibold"
                      style={{ fontFamily: tokens.fonts.nuSans }}
                    >
                      soon
                    </span>
                  </div>
                )}

                {/* Chevron Right for Active Languages */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.08 + 0.2,
                    }}
                  >
                    <ChevronRight 
                      className="size-[24px] text-[#820AD1]"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="mt-[32px] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p
            className="text-[#1f0230]/40 text-[14px] leading-[1.5]"
            style={{ fontFamily: tokens.fonts.nuSans }}
          >
            More languages coming soon
          </p>
        </motion.div>
      </div>
    </div>
  );
}