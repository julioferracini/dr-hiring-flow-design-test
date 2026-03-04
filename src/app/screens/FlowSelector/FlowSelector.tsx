/**
 * Flow Selector Screen
 * Tela inicial do protótipo — escolha entre Flow A e Flow B.
 * Sempre exibida na abertura/refresh.
 *
 * "Use Case Tests" dropdown shows future-ready test scenarios
 * that follow the same URL/language routing architecture.
 * URL pattern: /usecase/<slug>?lang=<locale>
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, SlidersHorizontal, Sparkles, CreditCard, Landmark, Handshake } from 'lucide-react';
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

const USE_CASES = [
  {
    slug: 'debt-resolution',
    icon: 'handshake' as const,
    label: 'Debt Resolution',
    sublabels: ['Collections and renegotiation products'],
    status: 'soon' as const,
  },
  {
    slug: 'credit-card',
    icon: 'credit-card' as const,
    label: 'Credit Card',
    sublabels: ['Card hiring flows and use cases'],
    status: 'soon' as const,
  },
  {
    slug: 'lending',
    icon: 'landmark' as const,
    label: 'Lending',
    sublabels: ['Loans and financing use cases'],
    status: 'soon' as const,
  },
];

const USE_CASE_ICONS: Record<string, React.ReactNode> = {
  'handshake': <Handshake className="size-[18px]" strokeWidth={2} />,
  'credit-card': <CreditCard className="size-[18px]" strokeWidth={2} />,
  'landmark': <Landmark className="size-[18px]" strokeWidth={2} />,
};

export default function FlowSelector({ onSelectFlow }: FlowSelectorProps) {
  const [useCasesOpen, setUseCasesOpen] = useState(false);

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#820AD1] px-[24px] pt-[24px] pb-[48px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-white text-[24px] leading-[1.2] mb-[6px]"
            style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 800, letterSpacing: '-0.72px' }}
          >
            Negotiation Flow Prototype (Emulator)
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
      <div className="flex-1 overflow-y-auto px-[24px] pt-[28px] pb-[24px]">
        {/* Section label */}
        <motion.p
          className="text-[#1f0230]/40 text-[11px] font-semibold uppercase tracking-[0.8px] px-[4px] mb-[14px]"
          style={{ fontFamily: tokens.fonts.nuSans }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Mockups – experiments
        </motion.p>

        <div className="space-y-[12px]">
          {FLOWS.map((flow, index) => {
            const isActive = flow.status === 'active';

            return (
              <motion.button
                key={flow.id}
                className={`
                  w-full bg-white rounded-[16px] p-[20px]
                  flex items-center justify-between
                  shadow-[0_1px_6px_rgba(0,0,0,0.06)]
                  transition-all duration-200
                  ${
                    isActive
                      ? 'hover:shadow-[0_2px_10px_rgba(130,10,209,0.1)] active:scale-[0.98]'
                      : 'opacity-60 cursor-not-allowed'
                  }
                `}
                onClick={() => isActive && onSelectFlow(flow.id)}
                disabled={!isActive}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 + 0.3 }}
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
        </div>

        {/* Product lines — collapsible section */}
        <motion.div
          className="mt-[28px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.p
            className="text-[#1f0230]/40 text-[11px] font-semibold uppercase tracking-[0.8px] px-[4px] mb-[2px]"
            style={{ fontFamily: tokens.fonts.nuSans }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Product lines
          </motion.p>

          <button
            className="w-full flex items-center justify-between px-[4px] py-[12px] cursor-pointer"
            onClick={() => setUseCasesOpen(prev => !prev)}
          >
            <span
              className="text-[#1f0230]/60 text-[13px] font-semibold uppercase tracking-[0.8px]"
              style={{ fontFamily: tokens.fonts.nuSans }}
            >
              Use Case Tests
            </span>
            <motion.div
              animate={{ rotate: useCasesOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ChevronDown className="size-[18px] text-[#1f0230]/40" strokeWidth={2.5} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {useCasesOpen && (
              <motion.div
                className="space-y-[10px] overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {USE_CASES.map((uc) => (
                  <div
                    key={uc.slug}
                    className="w-full bg-white rounded-[16px] p-[16px] flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.04)] opacity-55"
                  >
                    <div className="flex items-center gap-[14px]">
                      <div
                        className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(130,10,209,0.06)', color: 'rgba(0,0,0,0.28)' }}
                      >
                        {USE_CASE_ICONS[uc.icon]}
                      </div>

                      <div className="text-left">
                        <div
                          className="text-[#1f0230] text-[15px] leading-[1.3]"
                          style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600 }}
                        >
                          {uc.label}
                        </div>
                        <div
                          className="text-[#1f0230]/40 text-[12px] leading-[1.4] mt-[1px]"
                          style={{ fontFamily: tokens.fonts.nuSans }}
                        >
                          {uc.sublabels.join(' · ')}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F3F2F3] rounded-full px-[10px] py-[4px] shrink-0">
                      <span
                        className="text-[#820AD1]/60 text-[11px] font-semibold"
                        style={{ fontFamily: tokens.fonts.nuSans }}
                      >
                        soon
                      </span>
                    </div>
                  </div>
                ))}

                <p
                  className="text-[#1f0230]/30 text-[12px] leading-[1.5] text-center pt-[8px] pb-[4px]"
                  style={{ fontFamily: tokens.fonts.nuSans }}
                >
                  /usecase/credit-card?lang=es-MX
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}

      </div>
    </div>
  );
}