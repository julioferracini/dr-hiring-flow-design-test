/**
 * Flow Selector Screen
 * Tela inicial do protótipo — escolha entre Flow A e Flow B.
 * Sempre exibida na abertura/refresh.
 */

import { motion } from 'motion/react';
import { ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { tokens } from '../../constants';

interface FlowSelectorProps {
  onSelectFlow: (flow: 'A' | 'B') => void;
}

const FLOWS = [
  {
    id: 'A' as const,
    icon: 'sliders' as const,
    label: 'Simulation',
    sublabels: ['Simulação', 'Simulación'],
    status: 'active' as const,
  },
  {
    id: 'B' as const,
    icon: 'sparkles' as const,
    label: 'Suggested Conditions',
    sublabels: ['Sugestão de condições', 'Condiciones sugeridas'],
    status: 'active' as const,
  },
];

export default function FlowSelector({ onSelectFlow }: FlowSelectorProps) {
  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Status Bar */}
      <div className="h-[44px] bg-[#820AD1] w-full">
        <div className="flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] size-full">
          <div
            className="flex flex-col font-semibold justify-center leading-[0] text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap"
            style={{ fontFamily: "'SF Pro Text', sans-serif" }}
          >
            <p className="leading-[20px]">09:07</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#820AD1] px-[24px] pt-[24px] pb-[48px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-white text-[32px] leading-[1.2] mb-[12px]"
            style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 700 }}
          >
            Debt Resolution
          </h1>
          <p
            className="text-white/80 text-[16px] leading-[1.4]"
            style={{ fontFamily: tokens.fonts.nuSans }}
          >
            Choose a flow to start the prototype
          </p>
        </motion.div>
      </div>

      {/* Flow List */}
      <div className="flex-1 overflow-y-auto px-[24px] pt-[32px] pb-[24px]">
        <motion.div
          className="space-y-[12px]"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {FLOWS.map((flow, index) => {
            const isActive = flow.status === 'active';

            return (
              <motion.button
                key={flow.id}
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
                onClick={() => isActive && onSelectFlow(flow.id)}
                disabled={!isActive}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={isActive ? { scale: 1.02 } : {}}
                whileTap={isActive ? { scale: 0.98 } : {}}
              >
                <div className="flex items-start gap-[16px]">
                  {/* Icon */}
                  <div className="w-[40px] h-[40px] flex items-center justify-center shrink-0 mt-[2px]">
                    {flow.icon === 'sliders' ? (
                      <SlidersHorizontal className="size-[20px]" style={{ color: isActive ? '#820AD1' : 'rgba(0,0,0,0.3)' }} strokeWidth={2} />
                    ) : (
                      <Sparkles className="size-[20px]" style={{ color: isActive ? '#820AD1' : 'rgba(0,0,0,0.3)' }} strokeWidth={2} />
                    )}
                  </div>

                  {/* Flow info */}
                  <div className="text-left">
                    {/* Flow label badge */}
                    <div className="flex items-center gap-[8px] mb-[4px]">
                      <span
                        className="text-[11px] font-semibold uppercase tracking-[0.6px] px-[8px] py-[2px] rounded-full"
                        style={{
                          fontFamily: tokens.fonts.nuSans,
                          backgroundColor: isActive ? 'rgba(130,10,209,0.10)' : 'rgba(0,0,0,0.06)',
                          color: isActive ? '#820AD1' : 'rgba(0,0,0,0.38)',
                        }}
                      >
                        Flow {flow.id}
                      </span>
                    </div>

                    {/* Primary name */}
                    <div
                      className="text-[#1f0230] text-[17px] leading-[1.3]"
                      style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600 }}
                    >
                      {flow.label}
                    </div>

                    {/* Multilingual sublabels */}
                    <div
                      className="text-[#1f0230]/50 text-[13px] leading-[1.4] mt-[2px]"
                      style={{ fontFamily: tokens.fonts.nuSans }}
                    >
                      {flow.sublabels.join(' · ')}
                    </div>
                  </div>
                </div>

                {/* Right side: badge or chevron */}
                {flow.status === 'soon' ? (
                  <div className="bg-[#F3F2F3] rounded-full px-[12px] py-[6px] shrink-0">
                    <span
                      className="text-[#820AD1] text-[12px] font-semibold"
                      style={{ fontFamily: tokens.fonts.nuSans }}
                    >
                      soon
                    </span>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.08 + 0.2,
                    }}
                    className="shrink-0"
                  >
                    <ChevronRight className="size-[24px] text-[#820AD1]" strokeWidth={2.5} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Footer note */}
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
            Both flows available
          </p>
        </motion.div>
      </div>
    </div>
  );
}