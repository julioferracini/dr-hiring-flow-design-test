import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-h2o8ic8eql";
import imgLeading from "figma:asset/b2baec999158d1ea5a2d33a31da4c4eb97f205be.png";
import { colors, tokens } from "../../constants";
import BottomActionBar from "../../components/BottomActionBar";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import { useTranslation } from "../../i18n/context";

interface SummaryScreenProps {
  installments: number;
  monthlyPayment: number;
  savings: number;
  total: number;
  downpayment?: number;
  hasDownpayment?: boolean;
  dueDate: Date;
  onBack?: () => void;
  onContinue?: () => void;
  onEdit?: () => void;
  onViewTerms?: () => void;
}

function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Status Bar">
      <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] relative size-full">
        {/* Empty - spacing only */}
      </div>
    </div>
  );
}

function MagicIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="[Magic] Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] Icon">
          <path d={svgPaths.p6108900} fill={colors.text.primary} fillOpacity="0.62" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Leading({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div 
      className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[10px] overflow-clip size-[44px] top-1/2 cursor-pointer" 
      data-name="Leading"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[44px]">
        <div className="content-stretch flex items-center justify-center max-h-[44px] max-w-[44px] min-h-[44px] min-w-[44px] relative rounded-[64px] shrink-0 size-[44px]">
          <div className="content-stretch flex items-center justify-center p-[6px] relative shrink-0 w-[32px]">
            <MagicIcon />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Title() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] h-[22px] items-center justify-center left-[calc(50%-0.5px)] max-w-[223px] top-1/2" data-name="Title">
      <div className="content-stretch flex items-center justify-center relative shrink-0">
        <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-center text-ellipsis whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
          <p className="leading-[1.3] overflow-hidden">Summary</p>
        </div>
      </div>
    </div>
  );
}

function TopBar({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  return <ScreenNavBar variant="back" onAction={onBack} title={t('summary.title')} />;
}

function Header({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0.64)] content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full">
        <StatusBar />
        <TopBar onBack={onBack} />
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-white rounded-[40px]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-t-transparent"
        style={{ borderColor: `${colors.primary.purple} transparent ${colors.primary.purple} ${colors.primary.purple}` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function CalendarIcon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p3d613380} fill={colors.primary.purple} />
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[72px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <path d={svgPaths.p2bf800} fill="#F6ECFF" />
      </svg>
      <CalendarIcon />
    </div>
  );
}

function Leading1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative rounded-[64px] shrink-0">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[64px]">
        <div className="absolute inset-0 overflow-hidden rounded-[64px]">
          <img alt="" className="absolute left-[-23.56%] max-w-none size-[143.63%] top-[-0.44%]" src={imgLeading} />
        </div>
        <div className="absolute bg-gradient-to-b from-[82.267%] from-[rgba(0,0,0,0)] inset-0 rounded-[64px] to-black" />
      </div>
      <Avatar />
    </div>
  );
}

interface MainTitleProps {
  monthlyPayment: number;
  savings: number;
}

function MainTitle({ monthlyPayment, savings }: MainTitleProps) {
  const { t, formatCurrency } = useTranslation();
  return (
    <motion.div 
      className="content-stretch flex flex-col gap-[12px] items-center pb-[20px] relative shrink-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
        <Leading1 />
      </div>
      
      <div className="content-stretch flex items-start justify-center relative shrink-0 w-[335px]">
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[336px]">
          <div className="content-stretch flex flex-col items-center relative shrink-0">
            <div className="flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center w-[335px]" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(31,2,48,0.62)' }}>
              <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.yourMonthlyPayment')}</p>
            </div>
            <div className="content-stretch flex flex-col gap-[10px] items-center px-[110px] py-[7px] relative shrink-0 w-[336px]">
              <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-center whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSansDisplay, color: colors.text.primary }}>
                <p className="leading-[1.1]">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div className="bg-[#ddf5e5] content-stretch flex items-center max-w-[359px] min-h-[20px] overflow-clip px-[4px] py-[2px] relative rounded-[4px] shrink-0">
                <p className="flex-[1_0_0] font-semibold leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: '#0c7a3a', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                  {t('summary.totalDiscount', { amount: formatCurrency(savings) })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[14px] text-center text-ellipsis w-[307px] whitespace-pre-wrap" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(31,2,48,0.62)' }}>
        {t('summary.renegotiationNote')}
      </p>
    </motion.div>
  );
}

interface PaymentPlanBlockProps {
  installments: number;
  monthlyPayment: number;
  dueDate: Date;
  downpayment?: number;
  hasDownpayment?: boolean;
  onEdit?: () => void;
}

function PaymentPlanBlock({ installments, monthlyPayment, dueDate, downpayment, hasDownpayment, onEdit }: PaymentPlanBlockProps) {
  const { t, formatCurrency, formatDate } = useTranslation();
  const isSinglePayment = installments === 1;

  return (
    <motion.div 
      className="content-stretch flex flex-col items-start pb-[20px] relative shrink-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Section Title */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pb-[12px] pt-[20px] px-[20px] relative w-full">
            <div className="flex flex-[1_0_0] flex-col font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[20px]" style={{ fontFamily: tokens.fonts.nuSansDisplay, color: colors.text.primary }}>
              <p className="leading-[1.2] whitespace-pre-wrap">{t('summary.sectionPaymentPlan')}</p>
            </div>
            <motion.button
              className="content-stretch flex items-center min-h-[44px] relative shrink-0 cursor-pointer"
              onClick={onEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="content-stretch flex gap-[4px] h-[38px] items-center relative rounded-[8px] shrink-0">
                <div className="flex flex-[1_0_0] flex-col font-semibold justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-ellipsis whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.primary.purple, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                  <p className="leading-[1.3] overflow-hidden">{t('summary.changeButton')}</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[20px] relative w-full">
          <div className="relative rounded-[24px] shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
              {/* Downpayment Row - Only if hasDownpayment */}
              {hasDownpayment && downpayment && downpayment > 0 && (
                <div className="bg-white relative shrink-0 w-full">
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                        <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                          <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.downPayment')}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                        <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                          <p className="leading-[1.3] overflow-hidden">{formatCurrency(downpayment)}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0">
                        <div className="bg-[rgba(31,2,48,0.08)] h-px shrink-0 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Number of installments - hidden when single payment */}
              {!isSinglePayment && (
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.numberOfInstallments')}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{installments}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0">
                      <div className="bg-[rgba(31,2,48,0.08)] h-px shrink-0 w-full" />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Installment amount / Payment amount */}
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">{isSinglePayment ? t('summary.paymentAmount') : t('summary.installmentAmount')}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{formatCurrency(monthlyPayment)}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0">
                      <div className="bg-[rgba(31,2,48,0.08)] h-px shrink-0 w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* First installment date / Downpayment due date */}
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">
                          {hasDownpayment ? t('summary.downpaymentDueDate') : t('summary.firstInstallmentDate')}
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{formatDate(dueDate, 'long')}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0">
                      <div className="bg-[rgba(31,2,48,0.08)] h-px shrink-0 w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly payment date - hidden when single payment */}
              {!isSinglePayment && (
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.monthlyPaymentDate')}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{t('summary.everyDay', { day: dueDate.getDate() })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
            <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[24px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArrowDivider() {
  return (
    <motion.div 
      className="h-[40px] relative shrink-0 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="absolute bg-[#efefef] inset-[47.5%_0]" />
    </motion.div>
  );
}

interface BillingDetailsBlockProps {
  total: number;
  originalPrice: number;
}

function BillingDetailsBlock({ total, originalPrice }: BillingDetailsBlockProps) {
  const { t, formatCurrency } = useTranslation();
  const totalAmountFinanced = total;
  const totalInterest = 63.60;
  const monthlyInterest = 1.99;
  const totalAmountToPay = totalAmountFinanced + totalInterest;

  return (
    <motion.div 
      className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Section Title */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center pb-[12px] pl-[20px] pr-[8px] pt-[20px] relative w-full">
            <div className="flex flex-[1_0_0] flex-col font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[20px]" style={{ fontFamily: tokens.fonts.nuSansDisplay, color: colors.text.primary }}>
              <p className="leading-[1.2] whitespace-pre-wrap">{t('summary.sectionBillingDetails')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[20px] relative w-full">
          <div className="bg-white relative rounded-[24px] shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start overflow-clip py-[4px] relative rounded-[inherit] w-full">
              {/* Total amount financed */}
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.totalAmountFinanced')}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{formatCurrency(totalAmountFinanced)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total interest */}
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.totalInterest')}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{formatCurrency(totalInterest)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly interest */}
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.monthlyInterest')}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(0,0,0,0.96)', fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{monthlyInterest}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total amount to pay */}
              <div className="bg-white relative shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative">
                      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-full" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] whitespace-pre-wrap">{t('summary.totalAmountToPay')}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, color: colors.text.primary, fontFeatureSettings: tokens.fontFeatures.numbers }}>
                        <p className="leading-[1.3] overflow-hidden">{formatCurrency(totalAmountToPay)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(31,0,47,0.1),inset_0px_0px_0px_1px_rgba(31,0,47,0.02)]" />
            <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SummaryScreen({ 
  installments, 
  monthlyPayment, 
  savings, 
  total, 
  downpayment, 
  hasDownpayment, 
  dueDate,
  onBack, 
  onContinue,
  onEdit,
  onViewTerms
}: SummaryScreenProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const ORIGINAL_PRICE = 1589.50;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-hidden relative size-full" data-name="Summary">
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header onBack={onBack} />
          <div className="flex-1 overflow-y-auto w-full pb-[120px]">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <MainTitle monthlyPayment={monthlyPayment} savings={savings} />
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <PaymentPlanBlock 
                  installments={installments}
                  monthlyPayment={monthlyPayment}
                  dueDate={dueDate}
                  downpayment={downpayment}
                  hasDownpayment={hasDownpayment}
                  onEdit={onEdit}
                />
                <ArrowDivider />
                <BillingDetailsBlock total={total} originalPrice={ORIGINAL_PRICE} />
              </div>
            </div>
          </div>
          <BottomActionBar
            buttonLabel={t('common.continue')}
            onAction={onContinue}
            sublabel={
              <p
                className="text-[12px] text-center tracking-[0.12px]"
                style={{
                  fontFamily: tokens.fonts.nuSans,
                  color: "rgba(0,0,0,0.64)",
                  lineHeight: "1.3",
                }}
              >
                {t('summary.confirmNote')}{" "}
                <motion.span
                  className="cursor-pointer"
                  style={{ color: colors.primary.purple }}
                  onClick={onViewTerms}
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ opacity: 0.6 }}
                >
                  {t('summary.termsLinkText')}
                </motion.span>
              </p>
            }
          />
        </>
      )}
    </div>
  );
}