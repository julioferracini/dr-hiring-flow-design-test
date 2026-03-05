import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-1wpiflmaxu";
import { colors, tokens } from "../../constants";
import BottomActionBar from "../../components/BottomActionBar";
import DatePickerCalendar from "../../components/DatePickerCalendar";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import { useTranslation } from "../../i18n/context";
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

function TopBar({ onBack }: { onBack?: () => void }) {
  return <ScreenNavBar variant="back" onAction={onBack} />;
}

function Header({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
        <div className="bg-[rgba(255,255,255,0.67)] backdrop-blur-md content-stretch flex flex-col items-center relative md:rounded-tl-[32px] md:rounded-tr-[32px] shrink-0 w-full">
          <TopBar onBack={onBack} />
        </div>
        <div className="relative shrink-0 w-full" data-name="Title">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] pt-[12px] px-[24px] relative w-full">
              <p className="font-semibold leading-[1.1] not-italic relative shrink-0 text-[32px] w-full whitespace-pre-wrap" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: 600, color: colors.text.primary, letterSpacing: '-0.96px' }}>
                {t('dueDate.heading')}
              </p>
              <p className="leading-[1.3] relative shrink-0 text-[16px] w-full" style={{ fontFamily: tokens.fonts.nuSans, color: 'rgba(31,2,48,0.62)' }}>
                {t('dueDate.paymentScheduleInfo')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PaymentSummaryProps {
  downpayment?: number;
  installments: number;
  monthlyPayment: number;
  savings: number;
  total: number;
  hasDownpayment: boolean;
}

function PaymentSummary({ downpayment, installments, monthlyPayment, savings, total, hasDownpayment }: PaymentSummaryProps) {
  const { t, formatCurrency } = useTranslation();
  return (
    <motion.div 
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <AnimatePresence mode="wait">
        {hasDownpayment && downpayment !== undefined && (
          <motion.div
            key="downpayment-block"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full overflow-hidden"
          >
            {/* Downpayment Block */}
            <div className="bg-white px-[24px] pt-[16px] pb-[32px] w-full">
              <div className="flex items-center gap-[4px]">
                <p className="leading-[1.3] text-[14px] tracking-[-0.14px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, color: 'rgba(0,0,0,0.96)' }}>
                  {t('dueDate.downpayment')}
                </p>
                <p className="font-semibold leading-[1.3] text-[14px] tracking-[-0.14px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: 600, color: 'rgba(0,0,0,0.96)' }}>
                  {formatCurrency(downpayment)}
                </p>
              </div>
            </div>
            {/* Divider between Downpayment and Installments */}
            <div className="h-[2px] w-full bg-[#efefef]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Installments Block */}
      <div className="bg-white px-[24px] py-[16px] w-full">
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center gap-[4px]">
            <p className="leading-[1.3] text-[14px] tracking-[-0.14px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, color: 'rgba(0,0,0,0.96)' }}>
              {t('dueDate.installmentsOf', { count: installments })}
            </p>
            <p className="font-semibold leading-[1.3] text-[14px] tracking-[-0.14px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: 600, color: 'rgba(0,0,0,0.96)' }}>
              {formatCurrency(monthlyPayment)}
            </p>
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="leading-[1.3] text-[12px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, color: colors.success.text }}>
              {t('dueDate.amountOff', { amount: formatCurrency(savings) })}
            </p>
            <p className="leading-[1.3] text-[12px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, color: 'rgba(0,0,0,0.64)' }}>
              {t('dueDate.totalAmount', { amount: formatCurrency(total) })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Thick Divider between Payment Summary and Due Date */}
      <div className="h-[2px] w-full bg-[#efefef]" />
    </motion.div>
  );
}

interface DueDateSelectorProps {
  dates: Array<{ day: number; month: string; label: string; value: Date }>;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onShowOtherDates?: () => void;
}

function DueDateSelector({ dates, selectedDate, onSelectDate, onShowOtherDates }: DueDateSelectorProps) {
  const { t, locale } = useTranslation();
  return (
    <motion.div 
      className="content-stretch flex flex-col items-start py-[12px] relative shrink-0 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="h-[48px] relative shrink-0 w-full px-[24px] flex items-center justify-between">
        <p className="font-medium leading-[1.3] text-[16px] tracking-[-0.16px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: tokens.fontWeights.medium, color: 'rgba(0,0,0,0.96)' }}>
          {t('dueDate.sectionTitle')}
        </p>
        {onShowOtherDates && (
          <motion.button
            className="font-medium leading-[1.3] text-[14px] tracking-[-0.14px] cursor-pointer"
            style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: tokens.fontWeights.medium, color: colors.primary.purple }}
            onClick={onShowOtherDates}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ opacity: 0.6 }}
          >
            {t('dueDate.otherDates')}
          </motion.button>
        )}
      </div>

      <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[8px] relative shrink-0 w-full">
        {dates.map((date, index) => {
          const isSelected = selectedDate && 
            selectedDate.getDate() === date.value.getDate() && 
            selectedDate.getMonth() === date.value.getMonth();
          
          return (
            <motion.button
              key={`${date.day}-${date.month}-${index}`}
              className={`flex-1 min-h-[72px] rounded-[16px] p-[16px] flex flex-col justify-end cursor-pointer overflow-hidden ${
                isSelected ? 'bg-[#faf6ff] border border-solid border-[#820ad1]' : 'bg-white border border-solid border-[#efefef]'
              }`}
              onClick={() => onSelectDate(date.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${date.day}-${date.month}`}
                  initial={index === 2 ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={index === 2 ? { opacity: 0, y: -20 } : false}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20,
                    delay: 0.15,
                    opacity: { duration: 0.25, delay: 0.1 }
                  }}
                  className="flex flex-col gap-[2px] items-start"
                >
                  <p 
                    className="font-medium leading-[1.3] text-[12px]" 
                    style={{ 
                      fontFamily: tokens.fonts.graphik, 
                      fontFeatureSettings: tokens.fontFeatures.graphik, 
                      fontWeight: tokens.fontWeights.medium,
                      color: isSelected ? colors.primary.purple : 'rgba(0,0,0,0.96)'
                    }}
                  >
                    {locale === 'en-US'
                      ? `${date.month.charAt(0).toUpperCase() + date.month.slice(1)} ${String(date.day).padStart(2, '0')}`
                      : `${String(date.day).padStart(2, '0')} ${date.month.charAt(0).toUpperCase() + date.month.slice(1)}`}
                  </p>
                  <p 
                    className="leading-[1.3] text-[12px]" 
                    style={{ 
                      fontFamily: tokens.fonts.graphik, 
                      fontFeatureSettings: tokens.fontFeatures.graphik,
                      color: isSelected ? colors.primary.purple : 'rgba(0,0,0,0.64)'
                    }}
                  >
                    {date.label}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

interface DueDateScreenProps {
  onBack?: () => void;
  onContinue?: (date: Date) => void;
  installments: number;
  monthlyPayment: number;
  savings: number;
  total: number;
  downpayment?: number;
  hasDownpayment: boolean;
}

export default function DueDateScreen({
  onBack,
  onContinue,
  installments,
  monthlyPayment,
  savings,
  total,
  downpayment,
  hasDownpayment
}: DueDateScreenProps) {
  const { t, translations, locale } = useTranslation();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Helper: locale-aware month name
  const getMonth = (d: Date) => translations.dates.monthShort[d.getMonth()];
  // Helper: locale-aware day label
  const getDayLabel = (d: Date) => {
    if (d.toDateString() === today.toDateString()) return translations.dates.today;
    if (d.toDateString() === tomorrow.toDateString()) return translations.dates.tomorrow;
    return translations.dates.dayShort[d.getDay()];
  };

  // Pré-seleciona hoje — barra de ação já aparece visível
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [showCalendar, setShowCalendar] = useState(false);
  const [labelKey, setLabelKey] = useState(0);
  const [customThirdDate, setCustomThirdDate] = useState<Date>(() => {
    const d = new Date(today);
    d.setDate(today.getDate() + 2);
    return d;
  });

  // Tiles derivados — reagem à mudança de locale automaticamente
  const tiles = [
    { day: today.getDate(), month: getMonth(today), label: getDayLabel(today), value: today },
    { day: tomorrow.getDate(), month: getMonth(tomorrow), label: getDayLabel(tomorrow), value: tomorrow },
    { day: customThirdDate.getDate(), month: getMonth(customThirdDate), label: getDayLabel(customThirdDate), value: customThirdDate },
  ];

  const handleContinue = () => {
    if (selectedDate && onContinue) {
      onContinue(selectedDate);
    }
  };

  const handleCalendarDateSelect = (date: Date) => {
    setSelectedDate(date);
    const isToday = date.toDateString() === today.toDateString();
    const isNextDay = date.toDateString() === tomorrow.toDateString();
    if (!isToday && !isNextDay) {
      setCustomThirdDate(date);
    }
    // Delay roulette até o bottom sheet terminar de fechar (~400ms spring)
    setTimeout(() => {
      setLabelKey(prev => prev + 1);
    }, 400);
  };

  const handleTileSelect = (date: Date) => {
    setSelectedDate(date);
    setLabelKey(prev => prev + 1);
  };

  // Label como ReactNode: texto de continue estático + data com roulette
  const MONTHS = translations.dates.monthShort;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const formattedDate = selectedDate
    ? locale === 'en-US'
      ? `${capitalize(MONTHS[selectedDate.getMonth()])} ${String(selectedDate.getDate()).padStart(2, '0')}`
      : `${String(selectedDate.getDate()).padStart(2, '0')} ${capitalize(MONTHS[selectedDate.getMonth()])}`
    : null;

  const continueText = t('dueDate.continue');
  const buttonLabel = formattedDate ? (
    <>
      <span>{continueText}&nbsp;</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={labelKey}
          initial={{ y: 13, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -13, opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block' }}
        >
          {formattedDate}
        </motion.span>
      </AnimatePresence>
    </>
  ) : (
    <span>{continueText}</span>
  );

  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative size-full" data-name="DueDate">
      <Header onBack={onBack} />
      
      <div className="bg-[rgba(255,255,255,0.64)] content-stretch flex flex-col items-center relative shrink-0 w-full">
        <PaymentSummary 
          downpayment={downpayment}
          installments={installments}
          monthlyPayment={monthlyPayment}
          savings={savings}
          total={total}
          hasDownpayment={hasDownpayment}
        />
      </div>

      {/* Conteúdo scrollável com padding-bottom para a barra fixa */}
      <div className="flex-1 w-full bg-white overflow-y-auto pb-[120px]">
        <DueDateSelector 
          dates={tiles}
          selectedDate={selectedDate}
          onSelectDate={handleTileSelect}
          onShowOtherDates={() => setShowCalendar(true)}
        />
      </div>

      {/* Barra de ação — immediate=true pois há data pré-selecionada */}
      <BottomActionBar
        buttonLabel={buttonLabel}
        onAction={handleContinue}
        disabled={!selectedDate}
        immediate={true}
      />

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <DatePickerCalendar
            selectedDate={selectedDate}
            onSelectDate={handleCalendarDateSelect}
            onClose={() => setShowCalendar(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}