import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { colors, tokens } from "../constants";
import svgPaths from "../../imports/svg-l6ni0stbu4";
import { useTranslation } from "../i18n/context";

interface DatePickerCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0024 24.0024">
      <path d={svgPaths.p5753700} fill="black" fillOpacity="0.64" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <path d={svgPaths.p340e8f00} fill="#1F0230" fillOpacity="0.62" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="block" width="20" height="24" viewBox="0 0 20 32" fill="none">
      <path d={svgPaths.p1ba61180} fill="#B8B8B8" />
    </svg>
  );
}

export default function DatePickerCalendar({ selectedDate, onSelectDate, onClose }: DatePickerCalendarProps) {
  const { t, translations, locale } = useTranslation();
  // Local state for temporary selection
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(selectedDate);
  
  // Calculate the 6 selectable days starting from today
  const selectableDates = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dates: Date[] = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const isDateSelectable = (date: Date) => {
    return selectableDates.some(
      selDate => 
        selDate.getDate() === date.getDate() && 
        selDate.getMonth() === date.getMonth() && 
        selDate.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!tempSelectedDate) return false;
    return date.getDate() === tempSelectedDate.getDate() && 
           date.getMonth() === tempSelectedDate.getMonth() && 
           date.getFullYear() === tempSelectedDate.getFullYear();
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }

    // Pad the last week with empty slots so every row has 7 cells
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = translations.dates.monthLong;
  const weekdays = translations.dates.weekdayInitial;

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const selectedDateText = tempSelectedDate 
    ? t('dueDate.calendarInfo', { day: String(tempSelectedDate.getDate()) })
    : t('dueDate.selectDate');

  function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white w-full rounded-t-[40px] pb-[24px] pt-[24px] overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* Navbar with Close Button */}
        <div className="absolute top-0 left-0 right-0 w-full h-[64px] flex items-center px-[24px] z-10">
          <motion.button
            className="size-[32px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="size-[24px]">
              <CloseIcon />
            </div>
          </motion.button>
        </div>

        {/* Title */}
        <div className="px-[24px] pt-[56px] pb-[24px]">
          <h2 
            className="font-semibold text-[28px] leading-[1.2] tracking-[-0.84px]"
            style={{ 
              fontFamily: tokens.fonts.nuSans, 
              color: 'rgba(0,0,0,0.96)',
              fontFeatureSettings: "'ss05'"
            }}
          >
            {t('dueDate.calendarTitle')}
          </h2>
        </div>

        {/* Calendar */}
        <div className="px-[20px]">
          {/* Month Navigation */}
          <div className="h-[24px] relative mb-[24px] flex items-center justify-between">
            <p 
              className="font-semibold text-[16px] leading-[1.3]"
              style={{ 
                fontFamily: tokens.fonts.nuSans, 
                color: colors.text.primary 
              }}
            >
              {monthNames[currentMonth].charAt(0).toUpperCase() + monthNames[currentMonth].slice(1)} {currentYear}
            </p>
            <div className="flex items-center gap-[36px]">
              <button onClick={goToPreviousMonth} className="size-[20px] cursor-pointer rotate-180">
                <ChevronIcon />
              </button>
              <button onClick={goToNextMonth} className="size-[20px] cursor-pointer">
                <ChevronIcon />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="flex gap-[4px] mb-[12px]">
            {weekdays.map((day, index) => (
              <div 
                key={index} 
                className="flex-1 text-center font-semibold text-[12px] leading-[1.3] tracking-[0.12px]"
                style={{ 
                  fontFamily: tokens.fonts.nuSans,
                  color: 'rgba(31,2,48,0.62)',
                  fontFeatureSettings: "'lnum', 'tnum'"
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex flex-col gap-[4px]">
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex gap-[4px]">
                {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((date, dayIndex) => {
                  if (!date) {
                    return <div key={dayIndex} className="flex-1 h-[44px]" />;
                  }

                  const selectable = isDateSelectable(date);
                  const isTodayDate = isToday(date);
                  const isSelectedDate = isSelected(date);

                  let bgColor = "";
                  let textColor = "rgba(31,2,48,0.3)";
                  let fontWeight = "normal";
                  let border = false;

                  if (isSelectedDate) {
                    bgColor = "#faf6ff";
                    textColor = "#820ad1";
                    fontWeight = "semibold";
                    border = true;
                  } else if (isTodayDate) {
                    bgColor = "#f8f6f8";
                    textColor = "#1f0230";
                    fontWeight = "semibold";
                  } else if (selectable) {
                    textColor = "rgba(0,0,0,0.96)";
                    fontWeight = "semibold";
                  }

                  return (
                    <button
                      key={dayIndex}
                      onClick={() => selectable && setTempSelectedDate(date)}
                      disabled={!selectable}
                      className={`flex-1 h-[44px] rounded-full flex items-center justify-center relative ${
                        selectable ? 'cursor-pointer' : 'cursor-not-allowed'
                      }`}
                      style={{ backgroundColor: bgColor }}
                    >
                      <span
                        className={`text-[18px] leading-[1.3] ${fontWeight === 'semibold' ? 'font-semibold' : ''}`}
                        style={{ 
                          fontFamily: tokens.fonts.nuSans,
                          color: textColor
                        }}
                      >
                        {date.getDate()}
                      </span>
                      {border && (
                        <div className="absolute inset-0 pointer-events-none rounded-full" style={{
                          boxShadow: 'inset 0px 0px 0px 2px #820ad1, inset 0px 1px 0px 2px rgba(31,0,47,0.1)'
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Info Message */}
          {tempSelectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-[24px] bg-[#efefef] rounded-[24px] p-[8px] flex items-center gap-[8px]"
            >
              <div className="h-[32px] w-[32px] shrink-0 bg-white rounded-full flex items-center justify-center">
                <CalendarIcon />
              </div>
              <p 
                className="font-semibold text-[12px] leading-[1.3] tracking-[0.12px]"
                style={{ 
                  fontFamily: tokens.fonts.nuSans,
                  color: 'rgba(0,0,0,0.64)',
                  fontFeatureSettings: "'lnum', 'tnum'"
                }}
              >
                {selectedDateText}
              </p>
            </motion.div>
          )}
        </div>

        {/* Select Date Button */}
        <div className="px-[18px] mt-[24px]">
          <motion.button
            onClick={() => {
              if (tempSelectedDate) {
                onSelectDate(tempSelectedDate);
                onClose();
              }
            }}
            disabled={!tempSelectedDate}
            className="w-full h-[48px] rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: tempSelectedDate ? '#820ad1' : 'rgba(130,10,209,0.3)',
              cursor: tempSelectedDate ? 'pointer' : 'not-allowed'
            }}
            whileHover={tempSelectedDate ? { opacity: 0.9 } : {}}
            whileTap={tempSelectedDate ? { scale: 0.98 } : {}}
          >
            <span
              className="font-medium text-[16px] leading-[1.3] tracking-[-0.16px] text-white"
              style={{ 
                fontFamily: tokens.fonts.graphik,
                fontFeatureSettings: "'lnum', 'tnum'"
              }}
            >
              {t('dueDate.calendarSelectDate')}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}