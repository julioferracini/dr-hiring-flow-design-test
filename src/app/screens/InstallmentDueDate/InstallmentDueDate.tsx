import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-h2o8ic8eql";
import { colors, tokens } from "../../constants";
import BottomBar from "../../components/BottomBar";
import DatePickerBottomSheet from "./DatePickerBottomSheet";
import { ScreenNavBar } from "../../components/ScreenNavBar";
// ==================== Top Bar Components ====================

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

function MagicTopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0.67)] backdrop-blur-md content-stretch flex flex-col items-center relative md:rounded-tl-[32px] md:rounded-tr-[32px] shrink-0 w-full" data-name="[Magic] Top Bar">
      <TopBar onBack={onBack} />
    </div>
  );
}

// ==================== Header Component ====================

function Title({ hasDownpayment }: { hasDownpayment?: boolean }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] pt-[12px] px-[20px] relative w-full">
          <p className="font-semibold leading-[1.1] not-italic relative shrink-0 text-[32px] tracking-[-0.96px] w-full whitespace-pre-wrap" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: 600, color: colors.text.primary }}>
            {hasDownpayment ? 'When can you make the Downpayment?' : 'When can you make the first payment?'}
          </p>
        </div>
      </div>
    </div>
  );
}

function Content({ onBack, hasDownpayment }: { onBack?: () => void; hasDownpayment?: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Content">
      <MagicTopBar onBack={onBack} />
      <Title hasDownpayment={hasDownpayment} />
    </div>
  );
}

function MagicHeader({ onBack, hasDownpayment }: { onBack?: () => void; hasDownpayment?: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="[Magic] Header">
      <Content onBack={onBack} hasDownpayment={hasDownpayment} />
    </div>
  );
}

function Header({ onBack, hasDownpayment }: { onBack?: () => void; hasDownpayment?: boolean }) {
  return (
    <div className="bg-[rgba(255,255,255,0.67)] backdrop-blur-md content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Header">
      <MagicHeader onBack={onBack} hasDownpayment={hasDownpayment} />
    </div>
  );
}

// ==================== Installment Item Component ====================

function TopDivider() {
  return <div className="h-px shrink-0 w-full" data-name="Top divider" />;
}

interface InstallmentContentProps {
  installments: number;
  monthlyPayment: number;
  savings: number;
  total: number;
  downpayment?: number;
}

function DownpaymentWrapper({ downpayment }: { downpayment: number }) {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Primary Wrapper">
      <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative self-stretch shrink-0 text-[14px] tracking-[-0.14px] w-[245px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, fontWeight: tokens.fontWeights.medium, color: 'rgba(0,0,0,0.96)' }}>
        <p className="leading-[1.3] whitespace-pre-wrap">
          Downpayment: ${downpayment.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function PrimaryWrapper({ installments, monthlyPayment }: { installments: number; monthlyPayment: number }) {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Primary Wrapper">
      <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative self-stretch shrink-0 text-[14px] tracking-[-0.14px] w-[245px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, fontWeight: tokens.fontWeights.medium, color: 'rgba(0,0,0,0.96)' }}>
        <p className="leading-[1.3] whitespace-pre-wrap">
          {installments} installments of ${monthlyPayment.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function DescriptionWrapper({ savings, total }: { savings: number; total: number }) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description Wrapper">
      <div className="flex flex-col h-full justify-center leading-[1.3] not-italic relative shrink-0 text-[12px] w-[245px] whitespace-pre-wrap" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, color: 'rgba(0,0,0,0.64)' }}>
        <p className="mb-0" style={{ fontFeatureSettings: tokens.fontFeatures.numbers, color: colors.success.text }}>
          ${savings.toFixed(2)} off
        </p>
        <p style={{ fontFeatureSettings: tokens.fontFeatures.numbers }}>Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}

function TextWrapper({ installments, monthlyPayment, savings, total, downpayment }: InstallmentContentProps) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text Wrapper">
      {downpayment !== undefined && downpayment > 0 && <DownpaymentWrapper downpayment={downpayment} />}
      <PrimaryWrapper installments={installments} monthlyPayment={monthlyPayment} />
      <DescriptionWrapper savings={savings} total={total} />
    </div>
  );
}

function InstallmentContent({ installments, monthlyPayment, savings, total, downpayment }: InstallmentContentProps) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px overflow-clip relative self-stretch z-[2]" data-name="Content">
      <TextWrapper installments={installments} monthlyPayment={monthlyPayment} savings={savings} total={total} downpayment={downpayment} />
    </div>
  );
}

function ContentArea({ installments, monthlyPayment, savings, total, downpayment }: InstallmentContentProps) {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Content area">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[16px] isolate items-start justify-center px-[24px] py-[16px] relative w-full">
          <InstallmentContent installments={installments} monthlyPayment={monthlyPayment} savings={savings} total={total} downpayment={downpayment} />
        </div>
      </div>
    </div>
  );
}

function InstallmentItem({ installments, monthlyPayment, savings, total, downpayment }: InstallmentContentProps) {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Installment item">
      <TopDivider />
      <ContentArea installments={installments} monthlyPayment={monthlyPayment} savings={savings} total={total} downpayment={downpayment} />
    </div>
  );
}

// ==================== Due Date Section ====================

interface DateOption {
  date: Date;
  label: string;
  sublabel: string;
}

function generateDateOptions(): DateOption[] {
  const today = new Date();
  const options: DateOption[] = [];
  
  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };
  
  const getDayName = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };
  
  // Today
  options.push({
    date: new Date(today),
    label: formatDate(today),
    sublabel: 'Today'
  });
  
  // Tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  options.push({
    date: tomorrow,
    label: formatDate(tomorrow),
    sublabel: 'Tomorrow'
  });
  
  // Day after tomorrow
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  options.push({
    date: dayAfter,
    label: formatDate(dayAfter),
    sublabel: getDayName(dayAfter)
  });
  
  return options;
}

function Secondary({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div 
      className="content-stretch flex items-center justify-end pr-[12px] relative shrink-0 cursor-pointer" 
      data-name="Secondary"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-right tracking-[-0.14px] whitespace-nowrap" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, fontWeight: tokens.fontWeights.medium, color: colors.primary.purple }}>
        <p className="leading-[1.3]">Other dates</p>
      </div>
    </motion.div>
  );
}

function MagicSectionTitle({ onOtherDates }: { onOtherDates?: () => void }) {
  return (
    <div className="h-[48px] max-h-[48px] min-h-[48px] relative shrink-0 w-full" data-name="[Magic] Section Title">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] pl-[20px] pr-[8px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[16px] tracking-[-0.16px]" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, fontWeight: tokens.fontWeights.medium, color: 'rgba(0,0,0,0.96)' }}>
            <p className="leading-[1.3] whitespace-pre-wrap">Due date</p>
          </div>
          <Secondary onClick={onOtherDates} />
        </div>
      </div>
    </div>
  );
}

interface DateTileProps {
  label: string;
  sublabel: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}

function TileContent({ label, sublabel, selected }: { label: string; sublabel: string; selected: boolean }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.3] min-h-px min-w-px not-italic relative text-[12px] whitespace-pre-wrap" data-name="Content">
      <motion.p 
        className="font-medium relative shrink-0 w-full" 
        style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, fontWeight: tokens.fontWeights.medium }}
        animate={{ color: selected ? colors.primary.purple : 'rgba(0,0,0,0.96)' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {label}
      </motion.p>
      <motion.p 
        className="relative shrink-0 w-full" 
        style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers }}
        animate={{ color: selected ? colors.primary.purple : 'rgba(0,0,0,0.64)' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {sublabel}
      </motion.p>
    </div>
  );
}

function BottomContent({ label, sublabel, selected }: { label: string; sublabel: string; selected: boolean }) {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full" data-name="Bottom Content">
      <TileContent label={label} sublabel={sublabel} selected={selected} />
    </div>
  );
}

function TileContainer({ label, sublabel, selected }: { label: string; sublabel: string; selected: boolean }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-between min-h-px min-w-px relative" data-name="Container">
      <BottomContent label={label} sublabel={sublabel} selected={selected} />
    </div>
  );
}

function DateTile({ label, sublabel, selected, onClick, index }: DateTileProps) {
  return (
    <motion.div
      className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] cursor-pointer overflow-hidden"
      data-name={`Tile ${index + 1}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundColor: selected ? '#faf6ff' : '#ffffff'
      }}
      transition={{ 
        opacity: { duration: 0.6, delay: 0.3 + (index * 0.08), ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.6, delay: 0.3 + (index * 0.08), ease: [0.16, 1, 0.3, 1] },
        backgroundColor: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <motion.div 
        className="flex flex-row items-end overflow-clip rounded-[inherit] size-full"
        key={`${label}-${sublabel}`}
        initial={index === 2 ? { y: '100%' } : false}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 280,
          damping: 28,
          mass: 0.7
        }}
      >
        <div className="content-stretch flex items-end p-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
            <TileContainer label={label} sublabel={sublabel} selected={selected} />
          </div>
        </div>
      </motion.div>
      <motion.div 
        aria-hidden="true" 
        className="absolute border border-solid inset-0 pointer-events-none rounded-[16px]"
        animate={{ borderColor: selected ? colors.primary.purple : '#efefef' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

function Row({ dates, selectedIndex, onSelectDate }: { dates: DateOption[]; selectedIndex: number | null; onSelectDate: (index: number) => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[20px] relative shrink-0 w-full" data-name="Row 1">
      {dates.map((date, index) => (
        <DateTile
          key={index}
          label={date.label}
          sublabel={date.sublabel}
          selected={selectedIndex === index}
          onClick={() => onSelectDate(index)}
          index={index}
        />
      ))}
    </div>
  );
}

function Tiles({ dates, selectedIndex, onSelectDate }: { dates: DateOption[]; selectedIndex: number | null; onSelectDate: (index: number) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start overflow-x-auto overflow-y-clip py-[8px] relative shrink-0 w-full" data-name="Tiles">
      <Row dates={dates} selectedIndex={selectedIndex} onSelectDate={onSelectDate} />
    </div>
  );
}

function Wrapper({ dates, selectedIndex, onSelectDate }: { dates: DateOption[]; selectedIndex: number | null; onSelectDate: (index: number) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start py-[8px] relative shrink-0 w-full" data-name="Wrapper">
      <Tiles dates={dates} selectedIndex={selectedIndex} onSelectDate={onSelectDate} />
    </div>
  );
}

interface DueDateProps {
  dates: DateOption[];
  selectedIndex: number | null;
  onSelectDate: (index: number) => void;
  onOtherDates: () => void;
}

function DueDate({ dates, selectedIndex, onSelectDate, onOtherDates }: DueDateProps) {
  return (
    <motion.div 
      className="bg-white content-stretch flex flex-col items-center overflow-clip py-[4px] relative shrink-0 w-full" 
      data-name="Due-date"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <MagicSectionTitle onOtherDates={onOtherDates} />
      <Wrapper dates={dates} selectedIndex={selectedIndex} onSelectDate={onSelectDate} />
    </motion.div>
  );
}

// ==================== Main Component ====================

export interface InstallmentDueDateProps {
  installments: number;
  monthlyPayment: number;
  savings: number;
  total: number;
  onBack?: () => void;
  onContinue?: (selectedDate: Date) => void;
  hasDownpayment?: boolean;
  downpayment?: number;
}

export default function InstallmentDueDate({ 
  installments, 
  monthlyPayment, 
  savings, 
  total,
  onBack,
  onContinue,
  hasDownpayment,
  downpayment
}: InstallmentDueDateProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [displayDates, setDisplayDates] = useState<DateOption[]>(generateDateOptions());

  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };
  
  const getDayName = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const handleSelectDate = (index: number) => {
    setSelectedDateIndex(index);
    setCustomDate(null); // Clear custom date when selecting a default tile
  };

  const handleOtherDates = () => {
    setShowBottomSheet(true);
  };

  const handleCustomDateSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    // Check if the selected date is already in the first 3 tiles
    if (date.getTime() === today.getTime() || 
        date.getTime() === tomorrow.getTime() || 
        date.getTime() === dayAfterTomorrow.getTime()) {
      // Reset to original dates and select the appropriate tile
      setDisplayDates(generateDateOptions());
      
      if (date.getTime() === today.getTime()) {
        setSelectedDateIndex(0);
      } else if (date.getTime() === tomorrow.getTime()) {
        setSelectedDateIndex(1);
      } else {
        setSelectedDateIndex(2);
      }
      setCustomDate(null);
    } else {
      // Replace the third tile with the custom date
      const newDates = generateDateOptions();
      newDates[2] = {
        date: date,
        label: formatDate(date),
        sublabel: getDayName(date)
      };
      setDisplayDates(newDates);
      setSelectedDateIndex(2);
      setCustomDate(date);
    }
    
    setShowBottomSheet(false);
  };

  const handleContinue = () => {
    if (selectedDateIndex !== null && onContinue) {
      onContinue(displayDates[selectedDateIndex].date);
    }
  };

  const selectedDate = selectedDateIndex !== null ? displayDates[selectedDateIndex].date : null;

  return (
    <>
      <motion.div 
        className="bg-white content-stretch flex flex-col items-start overflow-clip absolute inset-0" 
        data-name="InstallmentDueDate"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ 
          type: "spring",
          stiffness: 350,
          damping: 35,
          mass: 0.9
        }}
      >
        <Header onBack={onBack} hasDownpayment={hasDownpayment} />
        <InstallmentItem installments={installments} monthlyPayment={monthlyPayment} savings={savings} total={total} downpayment={downpayment} />
        
        {/* Divider */}
        <div className="bg-[#efefef] h-[1px] shrink-0 w-full" data-name="Divider" />
        
        <DueDate dates={displayDates} selectedIndex={selectedDateIndex} onSelectDate={handleSelectDate} onOtherDates={handleOtherDates} />

        <AnimatePresence>
          {selectedDateIndex !== null && (
            <BottomBar variant="date" onContinue={handleContinue} selectedDate={selectedDate} />
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showBottomSheet && (
          <DatePickerBottomSheet
            onClose={() => setShowBottomSheet(false)}
            onSelectDate={handleCustomDateSelect}
            selectedDate={customDate}
          />
        )}
      </AnimatePresence>
    </>
  );
}