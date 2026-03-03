import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "./svg-3llmf9dm72";

function TimeWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Time Wrapper">
      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1f0230] text-[15px] text-center tracking-[-0.24px] whitespace-nowrap" style={{ fontFamily: 'SF Pro Text, sans-serif' }}>
        <p className="leading-[20px]">11:08</p>
      </div>
    </div>
  );
}

function Carrier() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.661px]" data-name="Carrier">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.6611 20">
        <g id="Carrier">
          <path d={svgPaths.p25c9c700} fill="var(--fill-0, #1F0230)" id="Signal" />
          <path d={svgPaths.p8fa51f0} fill="var(--fill-0, #1F0230)" id="Wi-Fi" />
          <g id="Battery">
            <rect height="10.3333" id="Border" opacity="0.35" rx="3.5" stroke="var(--stroke-0, #1F0230)" width="21" x="43.833" y="4.83333" />
            <path d={svgPaths.p2deda380} fill="var(--fill-0, #1F0230)" id="Cap" opacity="0.4" />
            <rect fill="var(--fill-0, #1F0230)" height="7.33333" id="Capacity" rx="2.3" width="18" x="45.333" y="6.33333" />
          </g>
        </g>
      </svg>
    </div>
  );
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

function Title1() {
  return <div className="content-stretch flex items-center justify-center shrink-0" data-name="Title" />;
}

function Title() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] h-[22px] items-center justify-center left-[calc(50%-0.5px)] max-w-[223px] top-1/2" data-name="Title">
      <Title1 />
    </div>
  );
}

function MagicIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="[Magic] Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] Icon">
          <path d={svgPaths.p6108900} fill="var(--fill-0, #1F0230)" fillOpacity="0.62" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function IconAction1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[6px] relative shrink-0 w-[32px]" data-name="Icon Action">
      <MagicIcon />
    </div>
  );
}

function IconAction() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[44px] max-w-[44px] min-h-[44px] min-w-[44px] relative rounded-[64px] shrink-0 size-[44px]" data-name="Icon Action">
      <IconAction1 />
    </div>
  );
}

function TouchTarget() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[44px]" data-name="Touch Target">
      <IconAction />
    </div>
  );
}

function Leading() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[10px] overflow-clip size-[44px] top-1/2" data-name="Leading">
      <TouchTarget />
    </div>
  );
}

function TopBar() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Top Bar">
      <Title />
      <Leading />
    </div>
  );
}

function MagicTopBar() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-name="[Magic] Top Bar">
      <StatusBar />
      <TopBar />
    </div>
  );
}

function Title2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] pt-[12px] px-[20px] relative w-full">
          <p className="font-medium leading-[1.1] not-italic relative shrink-0 text-[#1f0230] text-[36px] text-center tracking-[-1.08px] w-full whitespace-pre-wrap" style={{ fontFamily: 'Graphik, GraphikFallback, -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif', fontFeatureSettings: "'ss05'", fontWeight: '500' }}>
            Customize your monthly payments
          </p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Content">
      <MagicTopBar />
      <Title2 />
    </div>
  );
}

function MagicHeader() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="[Magic] Header">
      <Content />
    </div>
  );
}

interface InputProps {
  value: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  useCounter?: boolean;
}

function AnimatedNumber({ value }: { value: string }) {
  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8,
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Input({ value, label, onClick, isActive, useCounter = false }: InputProps) {
  // Separate currency from value for animation
  const hasCurrency = value.startsWith('$ ');
  const displayValue = hasCurrency ? value.substring(2) : value;
  
  return (
    <motion.div
      className="content-stretch flex flex-col gap-[8px] items-center justify-center py-[24px] relative shrink-0 w-[375px] cursor-pointer"
      data-name="Input"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{ 
        backgroundColor: isActive ? "rgba(130, 10, 209, 0.05)" : "rgba(0, 0, 0, 0)"
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="content-stretch flex items-center justify-center relative shrink-0"
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <p className="font-medium leading-[1.1] not-italic relative shrink-0 text-[#1f002f] text-[44px] text-center tracking-[-1.32px] flex items-center" style={{ fontFamily: 'Graphik, GraphikFallback, -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif', fontFeatureSettings: "'ss05'", fontWeight: '500', WebkitFontSmoothing: 'antialiased' }}>
          {hasCurrency && <span className="inline-block mr-[8px]">$</span>}
          <AnimatedNumber value={displayValue} />
        </p>
      </motion.div>
      <motion.div 
        className="bg-[#efefef] h-[4px] shrink-0 w-[160px]" 
        data-name="Divider"
        animate={{ 
          backgroundColor: isActive ? "#820ad1" : "#efefef",
          scaleX: isActive ? 1.1 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      <div className="flex flex-col font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] whitespace-nowrap" style={{ fontFamily: 'Graphik, GraphikFallback, -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif', fontFeatureSettings: "'ss05'", fontWeight: '400' }}>
        <p className="leading-[1.5] overflow-hidden">{label}</p>
      </div>
    </motion.div>
  );
}

interface SavingsAlertProps {
  savings: number;
}

function SavingsAlert({ savings }: SavingsAlertProps) {
  const [isRecalculating, setIsRecalculating] = useState(false);

  useEffect(() => {
    setIsRecalculating(true);
    const timer = setTimeout(() => {
      setIsRecalculating(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [savings]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isRecalculating ? [1, 1.03, 1] : 1,
        boxShadow: isRecalculating 
          ? [
              "0 2px 8px rgba(12, 122, 58, 0.1)",
              "0 8px 24px rgba(12, 122, 58, 0.25)",
              "0 2px 8px rgba(12, 122, 58, 0.1)"
            ]
          : "0 2px 8px rgba(12, 122, 58, 0.1)"
      }}
      transition={{ 
        delay: 0.2, 
        duration: 0.4,
        scale: { duration: 0.7, ease: "easeInOut" },
        boxShadow: { duration: 0.7, ease: "easeInOut" }
      }}
      className="bg-[#ddf5e5] content-stretch flex items-center justify-center p-[8px] relative rounded-[16px] shrink-0 w-[327px]"
      data-name="Wrapper"
    >
      <div aria-hidden="true" className="absolute border border-[rgba(30,165,84,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-[1_0_0] h-[32px] items-center justify-center min-h-px min-w-px relative" data-name="Content">
        <div className="flex flex-col font-normal justify-center leading-[0] not-italic overflow-hidden text-[#0c7a3a] text-[14px] text-center text-ellipsis tracking-[0.14px] w-full" style={{ fontFamily: 'Nu Sans Text, sans-serif', fontFeatureSettings: "'lnum', 'tnum'" }}>
          <p className="whitespace-pre-wrap inline-block">
            <motion.span 
              className="leading-[1.3] inline-block"
              animate={{ 
                opacity: isRecalculating ? [1, 0.6, 1] : 1 
              }}
              transition={{ duration: 0.7 }}
            >
              {`Total savings `}
            </motion.span>
            <span className="font-semibold leading-[1.3] not-italic inline-block">
              <motion.span
                animate={{ 
                  opacity: isRecalculating ? [1, 0.6, 1] : 1 
                }}
                transition={{ duration: 0.7 }}
                className="inline-block"
              >
                ${" "}
              </motion.span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={savings.toFixed(2)}
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{ y: -20, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 350,
                    damping: 20,
                    mass: 0.8,
                    delay: 0.25
                  }}
                  className="inline-block"
                >
                  {savings.toFixed(2)}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ListGroup({ savings }: SavingsAlertProps) {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-[375px]" data-name="List group">
      <SavingsAlert savings={savings} />
    </div>
  );
}

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

function Slider({ value, onChange }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const minValue = 2;
  const maxValue = 60;
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const indicatorPosition = (percentage / 100) * (335 - 32); // 335 is approximate track width, 32 is indicator size

  const handleSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    // Update immediately - no skipping values
    onChange(newValue);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="content-stretch flex flex-col h-[92px] items-start py-[24px] relative shrink-0" data-name="Slider">
      <div className="content-stretch flex flex-col items-center py-[8px] relative shrink-0 w-[375px]" data-name="[Magic] Slider">
        <div className="content-stretch flex flex-col gap-[12px] items-end px-[20px] relative shrink-0 w-[375px]" data-name="Chart">
          <div className="h-[24px] relative shrink-0 w-full" data-name="Indicator Bar">
            <div className="-translate-y-1/2 absolute bg-[#e3e0e5] h-[4px] left-0 right-0 rounded-[8px] top-1/2" data-name="Track" />
            <motion.div 
              className="-translate-y-1/2 absolute h-[4px] left-0 top-1/2 rounded-[8px]" 
              data-name="Indicator"
              style={{ width: `${percentage}%` }}
              animate={{ width: `${percentage}%` }}
              transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.5 }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 4">
                <path d="M0 2C0 0.89543 0.895431 0 2 0H39C40.1046 0 41 0.895431 41 2C41 3.10457 40.1046 4 39 4H2C0.895431 4 0 3.10457 0 2Z" fill="#820AD1" />
              </svg>
            </motion.div>
            <motion.div 
              className="absolute size-[32px] top-[-4px] pointer-events-none" 
              data-name="indicator"
              style={{ left: `${indicatorPosition}px` }}
              animate={{ 
                left: `${indicatorPosition}px`,
                scale: isDragging ? 1.5 : 1
              }}
              transition={{ 
                left: { type: "spring", stiffness: 500, damping: 35, mass: 0.5 },
                scale: { type: "spring", stiffness: 400, damping: 20 }
              }}
            >
              <div className="absolute flex items-center justify-center size-[32px]">
                <div className="flex-none">
                  <div className="relative size-[32px]">
                    <svg className="block size-full drop-shadow-md" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" fill="#820AD1" r="16" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            <input
              type="range"
              min={minValue}
              max={maxValue}
              value={value}
              onInput={handleSliderInput}
              onChange={handleSliderInput}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              style={{ zIndex: 10 }}
            />
          </div>
          <div className="relative shrink-0 w-full" data-name="Value - Optional">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[4px] relative w-full">
                <div className="content-stretch flex flex-[1_0_0] font-semibold items-center justify-between leading-[0] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(31,2,48,0.62)] tracking-[0.12px] whitespace-nowrap" data-name="Labels" style={{ fontFamily: 'Nu Sans Text, sans-serif' }}>
                  <div className="flex flex-col justify-center relative shrink-0" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                    <p className="leading-[1.3]">More discount</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-right" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                    <p className="leading-[1.3]">More time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeIndicator() {
  return null;
}

function MagicDivider() {
  return (
    <div className="h-[2px] relative shrink-0 w-[375px]" data-name="[Magic] Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 2">
        <g id="[Magic] Divider">
          <line id="Line" stroke="var(--stroke-0, #1F0230)" strokeOpacity="0.08" strokeWidth="2" x2="375" y1="1" y2="1" />
        </g>
      </svg>
    </div>
  );
}

interface CheckoutBottomBarProps {
  total: number;
  originalPrice: number;
}

function MagicCheckoutBottomBar({ total, originalPrice }: CheckoutBottomBarProps) {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[687px] w-[375px]" data-name="[Magic] Checkout Bottom Bar">
      <MagicDivider />
      <div className="bg-white relative shrink-0 w-full" data-name="Container">
        <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Content">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px not-italic overflow-clip relative text-ellipsis whitespace-pre-wrap" data-name="Text">
              <p className="font-semibold leading-[1.3] overflow-hidden relative shrink-0 text-[#1f0230] text-[18px] w-full" style={{ fontFamily: 'Nu Sans Text, sans-serif' }}>
                Total: $<AnimatePresence mode="popLayout">
                  <motion.span
                    key={total.toFixed(2)}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      mass: 0.5
                    }}
                    className="inline-block"
                  >
                    {total.toFixed(2)}
                  </motion.span>
                </AnimatePresence>
              </p>
              <p className="[text-decoration-skip-ink:none] decoration-solid font-medium leading-[1.5] line-through overflow-hidden relative shrink-0 text-[16px] text-[rgba(31,2,48,0.62)] tracking-[-0.16px] w-full" style={{ fontFamily: 'Graphik, GraphikFallback, -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif', fontFeatureSettings: "'ss05'", fontWeight: '500' }}>
                $ {originalPrice.toFixed(2)}
              </p>
            </div>
            <motion.div
              className="bg-[#820ad1] content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] max-w-[359px] min-h-[48px] px-[24px] py-[12px] relative rounded-[64px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)] shrink-0 cursor-pointer"
              data-name="[Magic] Button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col font-semibold justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[14px] text-center text-ellipsis text-white whitespace-nowrap" style={{ fontFamily: 'Nu Sans Text, sans-serif', fontFeatureSettings: "'lnum', 'tnum'" }}>
                <p className="leading-[1.3] overflow-hidden">Next</p>
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(31,0,47,0.1),inset_0px_0px_0px_0px_rgba(31,0,47,0.02)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: number;
  onValueChange: (value: number) => void;
  type: "payment" | "installments";
}

function BottomSheet({ isOpen, onClose, title, value, onValueChange, type }: BottomSheetProps) {
  const [inputValue, setInputValue] = useState(
    type === "installments" ? value.toString() : value.toFixed(2)
  );

  useEffect(() => {
    setInputValue(type === "installments" ? value.toString() : value.toFixed(2));
  }, [value, type]);

  const handleConfirm = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      if (type === "installments") {
        // Clamp between 2 and 60
        onValueChange(Math.max(2, Math.min(60, Math.round(numValue))));
      } else {
        onValueChange(numValue);
      }
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 z-50 shadow-2xl"
            style={{ maxWidth: "375px", margin: "0 auto" }}
          >
            {/* Close Button X */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 left-6 w-8 h-8 flex items-center justify-center text-[#1f0230] opacity-60 hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <div className="w-[40px] h-[4px] bg-gray-300 rounded-full mx-auto mb-4" />
            
            <h3 className="font-medium text-[24px] text-[#1f0230] mb-8 text-center" style={{ fontFamily: 'Graphik, GraphikFallback, -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif', fontFeatureSettings: "'ss05'", fontWeight: '500' }}>
              {title}
            </h3>

            <div className="mb-8">
              <div className="flex items-center justify-center relative w-full">
                {type === "payment" && (
                  <span className="text-[44px] font-medium text-[#1f002f] mr-[8px]" 
                    style={{ 
                      fontFamily: 'Graphik, GraphikFallback, -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif', 
                      fontFeatureSettings: "'ss05'",
                      fontWeight: '500'
                    }}>
                    $
                  </span>
                )}
                <div style={{ minWidth: "0" }}>
                  <input
                    type="text"
                    inputMode={type === "installments" ? "numeric" : "decimal"}
                    value={inputValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (type === "installments") {
                        // Allow only integers for installments
                        if (/^\d*$/.test(val)) {
                          setInputValue(val);
                        }
                      } else {
                        // Allow numbers and decimal point for payment
                        if (/^\d*\.?\d{0,2}$/.test(val)) {
                          setInputValue(val);
                        }
                      }
                    }}
                    className="text-[44px] font-medium text-[#1f002f] outline-none bg-transparent"
                    style={{ 
                      fontFamily: 'Graphik, GraphikFallback, -apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif', 
                      fontFeatureSettings: "'ss05'",
                      fontWeight: '500',
                      width: "auto",
                      minWidth: "100px",
                      maxWidth: "250px",
                      textAlign: "center"
                    }}
                    autoFocus
                  />
                </div>
              </div>
              <div className="w-full h-[1px] bg-[#820ad1] mt-4" />
              {type === "installments" && (
                <p className="text-center text-[14px] text-[rgba(0,0,0,0.64)] mt-2">
                  Range: 2 - 60 months
                </p>
              )}
            </div>

            <motion.button
              onClick={handleConfirm}
              className="w-full py-3 px-6 rounded-full bg-[#820ad1] text-white font-semibold text-[14px]"
              style={{ fontFamily: 'Nu Sans Text, sans-serif' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirm
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Simulation() {
  const ORIGINAL_PRICE = 1589.50;
  const BASE_DISCOUNT_RATE = 0.20; // 20% base discount

  const [installments, setInstallments] = useState(10);
  const [debouncedInstallments, setDebouncedInstallments] = useState(10);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState<"payment" | "installments">("payment");
  const [activeInput, setActiveInput] = useState<"payment" | "installments" | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce the installments value for smooth transitions
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedInstallments(installments);
    }, 150); // 150ms delay makes the change perceptible

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [installments]);

  // Calculate values based on installments
  const calculateValues = (numInstallments: number) => {
    // More installments = less discount (sliding scale)
    const discountFactor = 1 - ((numInstallments - 2) / (60 - 2)) * 0.5; // Discount reduces by 50% at max
    const actualDiscount = BASE_DISCOUNT_RATE * discountFactor;
    const discountedPrice = ORIGINAL_PRICE * (1 - actualDiscount);
    const monthlyPayment = discountedPrice / numInstallments;
    const savings = ORIGINAL_PRICE - discountedPrice;

    return {
      monthlyPayment,
      total: discountedPrice,
      savings,
    };
  };

  const { monthlyPayment, total, savings } = calculateValues(debouncedInstallments);

  const openPaymentSheet = () => {
    setBottomSheetType("payment");
    setBottomSheetOpen(true);
    setActiveInput("payment");
  };

  const openInstallmentsSheet = () => {
    setBottomSheetType("installments");
    setBottomSheetOpen(true);
    setActiveInput("installments");
  };

  const handleCloseSheet = () => {
    setBottomSheetOpen(false);
    setActiveInput(null);
  };

  const handlePaymentChange = (value: number) => {
    // Calculate installments from desired monthly payment
    const discountedPrice = ORIGINAL_PRICE * 0.8; // Using base discount
    const newInstallments = Math.max(2, Math.min(60, Math.round(discountedPrice / value)));
    setInstallments(newInstallments);
  };

  const handleInstallmentsChange = (value: number) => {
    setInstallments(value);
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[40px] size-full" data-name="Simulation">
      <MagicHeader />
      <Input 
        value={`$ ${monthlyPayment.toFixed(2)}`} 
        label="Monthly payment" 
        onClick={openPaymentSheet}
        isActive={activeInput === "payment"}
      />
      <Input 
        value={installments.toString()} 
        label="Installments" 
        onClick={openInstallmentsSheet}
        isActive={activeInput === "installments"}
        useCounter
      />
      <ListGroup savings={savings} />
      <Slider value={installments} onChange={setInstallments} />
      <HomeIndicator />
      <MagicCheckoutBottomBar total={total} originalPrice={ORIGINAL_PRICE} />

      <BottomSheet
        isOpen={bottomSheetOpen}
        onClose={handleCloseSheet}
        title={bottomSheetType === "payment" ? "Monthly payment" : "Installments"}
        value={bottomSheetType === "payment" ? monthlyPayment : installments}
        onValueChange={bottomSheetType === "payment" ? handlePaymentChange : handleInstallmentsChange}
        type={bottomSheetType}
      />
    </div>
  );
}