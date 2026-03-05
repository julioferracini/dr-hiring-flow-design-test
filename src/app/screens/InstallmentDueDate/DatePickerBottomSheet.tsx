import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-i7zhhrerey";
import calendarSvgPaths from "../../../imports/svg-jb6igx72th";
import { colors, tokens } from "../../constants";

interface DatePickerBottomSheetProps {
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

function CloseIcon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24.002px] top-1/2" data-name="close-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0024 24.0024">
        <g id="close">
          <path d={svgPaths.p5753700} fill="black" fillOpacity="0.64" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function IconAction({ onClick }: { onClick: () => void }) {
  return (
    <motion.div 
      className="relative rounded-[64px] shrink-0 size-[32px] cursor-pointer" 
      data-name="Icon Action"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <CloseIcon />
    </motion.div>
  );
}

function TouchTarget({ onClick }: { onClick: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-name="Touch Target">
      <IconAction onClick={onClick} />
    </div>
  );
}

function Leading({ onClick }: { onClick: () => void }) {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[12px] overflow-clip top-1/2" data-name="Leading">
      <TouchTarget onClick={onClick} />
    </div>
  );
}

function TopBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Top Bar">
      <Leading onClick={onClose} />
    </div>
  );
}

function TopBarWrapper({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Top Bar">
      <TopBar onClose={onClose} />
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[24px] pt-[8px] px-[24px] relative w-full">
          <p className="leading-[1.2] not-italic relative shrink-0 text-[28px] tracking-[-0.84px] w-full whitespace-pre-wrap" style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600, color: 'rgba(0,0,0,0.96)' }}>
            Choose a payment date
          </p>
        </div>
      </div>
    </div>
  );
}

function Weekdays() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] not-italic overflow-clip relative shrink-0 text-[12px] text-center tracking-[0.12px]" data-name="Weekdays" style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600, color: 'rgba(31,2,48,0.62)' }}>
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
        <div key={index} className="flex flex-col justify-center relative shrink-0 w-[44px]">
          <p className="leading-[1.3] whitespace-pre-wrap">{day}</p>
        </div>
      ))}
    </div>
  );
}

interface DayProps {
  day: number;
  isDisabled?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

function Day({ day, isDisabled, isToday, isSelected, onClick }: DayProps) {
  const bgColor = isSelected ? '#faf6ff' : isToday ? '#f8f6f8' : '#ffffff';
  const textColor = isSelected ? colors.primary.purple : isDisabled ? 'rgba(31,2,48,0.3)' : 'rgba(0,0,0,0.96)';
  const fontWeight = isSelected || !isDisabled ? 600 : 400;

  return (
    <motion.div
      className={`overflow-clip relative rounded-[64px] shrink-0 size-[44px] ${!isDisabled && onClick ? 'cursor-pointer' : ''}`}
      data-name="Day"
      onClick={!isDisabled && onClick ? onClick : undefined}
      whileHover={!isDisabled && onClick ? { scale: 1.05 } : {}}
      whileTap={!isDisabled && onClick ? { scale: 0.95 } : {}}
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center relative shrink-0 left-1/2 not-italic size-[40px] text-[18px] text-center top-1/2"
        style={{ fontFamily: tokens.fonts.nuSans, fontWeight }}
        animate={{ color: textColor }}
        transition={{ duration: 0.2 }}
      >
        <p className="leading-[1.3] whitespace-pre-wrap">{day}</p>
      </motion.div>
      {isSelected && (
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-[inherit]" 
          style={{ boxShadow: `inset 0px 0px 0px 2px ${colors.primary.purple}, inset 0px 1px 0px 2px rgba(31,0,47,0.1)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
}

function generateCalendarDays(selectedDate: Date | null): { date: Date; isToday: boolean; isSelected: boolean; isDisabled: boolean; isAvailable: boolean }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // First day of the month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
  
  // Last day of the month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Maximum date is 6 days from today
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 6);
  
  const days: { date: Date; isToday: boolean; isSelected: boolean; isDisabled: boolean; isAvailable: boolean }[] = [];
  
  // Add previous month days (disabled)
  for (let i = 0; i < startDayOfWeek; i++) {
    const prevMonthDay = new Date(currentYear, currentMonth, -startDayOfWeek + i + 1);
    days.push({
      date: prevMonthDay,
      isToday: false,
      isSelected: false,
      isDisabled: true,
      isAvailable: false
    });
  }
  
  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0);
    
    const isToday = date.getTime() === today.getTime();
    const isAvailable = date >= today && date <= maxDate;
    const isSelected = selectedDate ? date.getTime() === selectedDate.getTime() : false;
    
    days.push({
      date,
      isToday,
      isSelected,
      isDisabled: !isAvailable,
      isAvailable
    });
  }
  
  // Add next month days to fill the grid (disabled)
  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(currentYear, currentMonth + 1, i);
      days.push({
        date: nextMonthDay,
        isToday: false,
        isSelected: false,
        isDisabled: true,
        isAvailable: false
      });
    }
  }
  
  return days;
}

function Calendar({ selectedDate, onSelectDate }: { selectedDate: Date | null; onSelectDate: (date: Date) => void }) {
  const days = generateCalendarDays(selectedDate);
  
  // Get month name
  const today = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthYear = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;
  
  // Group days into weeks
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Calendar">
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
        <div className="h-[24px] relative shrink-0 w-full" data-name="Header">
          <div className="-translate-y-1/2 absolute flex flex-col justify-center leading-[0] left-px not-italic text-[16px] top-[11.5px] whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600, color: colors.text.primary }}>
            <p className="leading-[1.3]">{monthYear}</p>
          </div>
        </div>
        <Weekdays />
      </div>
      
      <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0" data-name="Month">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-name="Week">
            {week.map((day, dayIndex) => (
              <Day
                key={`${weekIndex}-${dayIndex}`}
                day={day.date.getDate()}
                isDisabled={day.isDisabled}
                isToday={day.isToday}
                isSelected={day.isSelected}
                onClick={day.isAvailable ? () => onSelectDate(day.date) : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MagicIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="[Magic] Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] Icon">
          <path d={calendarSvgPaths.p346b4600} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function CalendarIconContainer() {
  return (
    <div className="bg-[rgba(31,2,48,0.3)] content-stretch flex items-center justify-center relative rounded-[64px] shrink-0 size-[32px]" data-name="Icon Action">
      <MagicIcon />
    </div>
  );
}

function MagicIconAction() {
  return (
    <div className="content-stretch flex items-center max-h-[48px] max-w-[48px] min-h-[48px] min-w-[48px] p-[8px] relative rounded-[64px] shrink-0" data-name="[Magic] Icon Action">
      <CalendarIconContainer />
    </div>
  );
}

function InfoContent({ day, suffix }: { day: number; suffix: string }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-start justify-center min-h-px min-w-px relative" data-name="Content">
      <motion.div 
        className="flex flex-col justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis tracking-[-0.14px] w-full" 
        style={{ fontFamily: tokens.fonts.graphik, color: 'rgba(0,0,0,0.64)', fontFeatureSettings: "'lnum', 'tnum'" }}
        key={day}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="leading-[1.3] whitespace-pre-wrap">Payments will always be on the {day}{suffix} of each month.</p>
      </motion.div>
    </div>
  );
}

function InfoLeading({ day, suffix }: { day: number; suffix: string }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Leading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[8px] relative w-full">
          <MagicIconAction />
          <InfoContent day={day} suffix={suffix} />
        </div>
      </div>
    </div>
  );
}

function InfoWrapper({ day, suffix }: { day: number; suffix: string }) {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[24px] w-full" data-name="Wrapper">
      <InfoLeading day={day} suffix={suffix} />
    </div>
  );
}

function InfoMessage({ selectedDate }: { selectedDate: Date | null }) {
  const day = selectedDate ? selectedDate.getDate() : new Date().getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
  
  return (
    <div 
      className="content-stretch flex flex-col items-start relative rounded-[16px] shrink-0 w-full" 
      data-name="Info"
    >
      <InfoWrapper day={day} suffix={suffix} />
    </div>
  );
}

function DatePicker({ selectedDate, onSelectDate }: { selectedDate: Date | null; onSelectDate: (date: Date) => void }) {
  return (
    <div className="content-stretch flex flex-col items-center p-[20px] relative shrink-0 w-full" data-name="Date Picker">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
        <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
      </div>
    </div>
  );
}

function Header({ onClose, selectedDate, onSelectDate }: { onClose: () => void; selectedDate: Date | null; onSelectDate: (date: Date) => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center pb-[24px] pt-[8px] relative shrink-0 w-full" data-name="Header">
      <TopBarWrapper onClose={onClose} />
      <Title />
      <DatePicker selectedDate={selectedDate} onSelectDate={onSelectDate} />
      <div className="px-[24px] w-full">
        <InfoMessage selectedDate={selectedDate} />
      </div>
    </div>
  );
}

export default function DatePickerBottomSheet({ onClose, onSelectDate, selectedDate }: DatePickerBottomSheetProps) {
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(selectedDate);

  const handleSelectDate = (date: Date) => {
    setTempSelectedDate(date);
  };

  const handleConfirm = () => {
    if (tempSelectedDate) {
      onSelectDate(tempSelectedDate);
      onClose();
    }
  };

  return (
    <>
      <motion.div
        className="absolute inset-0 bg-black/40 z-40 md:rounded-[40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={onClose}
      />
      
      <motion.div
        className="absolute bg-white bottom-0 content-stretch flex flex-col items-center left-1/2 -translate-x-1/2 overflow-clip py-[24px] md:rounded-[40px] rounded-t-[32px] z-50 max-w-[375px] w-full"
        data-name="Bottom Sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
          mass: 0.8,
          restDelta: 0.001
        }}
      >
        <Header onClose={onClose} selectedDate={tempSelectedDate} onSelectDate={handleSelectDate} />
        
        <motion.div 
          className="px-[24px] w-full mt-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.button
            className="bg-[#820ad1] content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] min-h-[48px] px-[24px] py-[12px] relative rounded-[64px] w-full cursor-pointer disabled:opacity-50"
            data-name="Button"
            onClick={handleConfirm}
            disabled={!tempSelectedDate}
            whileHover={tempSelectedDate ? { scale: 1.02 } : {}}
            whileTap={tempSelectedDate ? { scale: 0.98 } : {}}
            style={{ boxShadow: '0px 2px 8px rgba(130, 10, 209, 0.25)' }}
          >
            <div className="flex flex-col font-medium justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white tracking-[-0.16px] whitespace-nowrap" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.numbers, fontWeight: tokens.fontWeights.medium }}>
              <p className="leading-[1.3] overflow-hidden">Select date</p>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}