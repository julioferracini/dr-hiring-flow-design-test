import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-uot5w47cju";
import { colors, tokens } from "../../constants";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import BottomActionBar from "../../components/BottomActionBar";
import AlertBottomSheet from "../../components/AlertBottomSheet";
import { useTranslation } from "../../i18n/context";

interface InstallmentValueProps {
  onComplete?: (monthlyValue: number, rawMonetaryValue?: number) => void;
  onBack?: () => void;
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

function Leading() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[10px] overflow-clip size-[44px] top-1/2" data-name="Leading">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[44px]">
        <div className="content-stretch flex items-center justify-center max-h-[44px] max-w-[44px] min-h-[44px] min-w-[44px] relative rounded-[64px] shrink-0 size-[44px]">
          <div className="content-stretch flex items-center justify-center p-[6px] relative shrink-0 w-[32px]">
            <MagicIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p6108900} fill={colors.text.primary} fillOpacity="0.62" />
      </svg>
    </div>
  );
}

function TopBar({ onBack }: { onBack?: () => void }) {
  return <ScreenNavBar variant="back" onAction={onBack} />;
}

function Header({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="[Magic] Header">
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full">
          <StatusBar />
          <TopBar onBack={onBack} />
        </div>
        <motion.div 
          className="relative shrink-0 w-full" 
          data-name="Title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] pt-[12px] px-[20px] relative w-full">
              <p className="font-medium leading-[1.1] not-italic relative shrink-0 text-[36px] w-full whitespace-pre-wrap" style={{ fontFamily: tokens.fonts.graphik, fontFeatureSettings: tokens.fontFeatures.graphik, fontWeight: tokens.fontWeights.medium, color: colors.text.primary, letterSpacing: '-1.08px' }}>
                {t('installmentValue.heading')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface MoneyInputProps {
  value: string;
  onChange: (value: string) => void;
  isVisible: boolean;
  onClear: () => void;
}

function MoneyInput({ value, onChange, isVisible, onClear }: MoneyInputProps) {
  const { translations } = useTranslation();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(true); // Start with focus

  // Force focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, []);

  // Keep focus when visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setIsFocused(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Format value with decimal mask
  const formatValue = (val: string): string => {
    // Remove all non-digits
    const digits = val.replace(/\D/g, '');
    
    if (digits === '') return '0.00';
    
    // Convert to number and divide by 100 to get decimal
    const number = parseInt(digits, 10) / 100;
    
    // Format with 2 decimal places
    return number.toFixed(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const digits = inputVal.replace(/\D/g, '');
    
    // Limit to reasonable amount (999999.99)
    if (digits.length <= 8) {
      onChange(digits);
    }
  };

  const handleClearClick = () => {
    console.log('Clean button clicked'); // Debug
    onClear();
    onChange(''); // Force clear through onChange too
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        setIsFocused(true);
      }
    }, 10);
  };

  const handleBlur = () => {
    console.log('Input blurred'); // Debug
    setIsFocused(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input focused'); // Debug
    setIsFocused(true);
    // If field has value when gaining focus, select all for easy replacement
    if (value !== '' && value !== '0') {
      setTimeout(() => {
        e.target.select();
      }, 0);
    }
  };

  const displayValue = formatValue(value);
  const hasValue = value !== '' && value !== '0';

  return (
    <motion.div 
      className="bg-white content-stretch flex flex-col items-center py-[24px] relative shrink-0 w-full" 
      data-name="Double Input"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full px-[24px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-[1_0_0] items-center min-h-[40px] min-w-px relative">
              <div className="flex items-baseline gap-[12px] relative">
                {/* Dollar Sign - sempre opacity 100% */}
                <div 
                  className="flex flex-col justify-center relative shrink-0 leading-[0] not-italic text-[28px]" 
                  style={{ 
                    fontFamily: tokens.fonts.graphik, 
                    fontFeatureSettings: tokens.fontFeatures.graphik, 
                    fontWeight: tokens.fontWeights.medium, 
                    letterSpacing: '-0.84px', 
                    color: 'rgba(0,0,0,0.64)'
                  }}
                >
                  <p className="leading-[1.2]">{translations.currency.symbol}</p>
                </div>
                
                {/* Input Container with cursor */}
                <div className="flex items-center relative">
                  <div className="flex flex-col justify-center relative shrink-0 min-w-[100px]">
                    <style>{`
                      .custom-cursor-input {
                        caret-color: #820ad1 !important;
                        caret-shape: bar !important;
                      }
                      
                      /* Force 2px width with multiple browser support strategies */
                      .custom-cursor-input {
                        caret-width: 2px !important;
                      }
                      
                      /* Webkit/Blink (Chrome, Safari, Edge) */
                      .custom-cursor-input::-webkit-input-placeholder {
                        caret-width: 2px !important;
                      }
                      
                      /* Firefox */
                      @-moz-document url-prefix() {
                        .custom-cursor-input {
                          caret-width: 2px !important;
                        }
                      }
                      
                      /* Additional webkit specific */
                      @supports (-webkit-appearance: none) {
                        .custom-cursor-input {
                          caret-width: 2px !important;
                          -webkit-text-fill-color: rgba(0,0,0,0.96);
                        }
                      }
                    `}</style>
                    <input 
                      ref={inputRef}
                      type="text"
                      inputMode="decimal"
                      value={displayValue}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      autoFocus
                      className="custom-cursor-input leading-[1.2] bg-transparent outline-none border-none w-full relative z-10"
                      style={{ 
                        fontFamily: tokens.fonts.graphik, 
                        fontFeatureSettings: tokens.fontFeatures.graphik, 
                        fontWeight: tokens.fontWeights.medium,
                        letterSpacing: '-0.84px',
                        fontSize: '28px',
                        color: 'rgba(0,0,0,0.96)',
                        opacity: hasValue ? 1 : 0.2,
                        caretColor: '#820ad1',
                        caretWidth: '2px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col h-[40px] items-end justify-center min-w-[40px] shrink-0">
              <AnimatePresence>
                {hasValue && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClearClick}
                    onMouseDown={(e) => { e.preventDefault(); }}
                    className="text-[14px] font-medium cursor-pointer bg-transparent border-none"
                    style={{ fontFamily: tokens.fonts.nuSans, color: colors.primary.purple }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('installmentValue.clearButton')}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Tip({ isVisible, isBarVisible }: { isVisible: boolean; isBarVisible: boolean }) {
  const { translations, formatCurrency } = useTranslation();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  // Mínimo local em centavos para o protótipo (24.00)
  const MIN_AMOUNT = 24.00;

  const tips = translations.installmentValue.tips.map(tip =>
    tip.replace('{amount}', formatCurrency(MIN_AMOUNT))
  );

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, tips.length]);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const keyboardHeight = windowHeight - viewportHeight;
        setKeyboardOffset(keyboardHeight > 100 ? keyboardHeight : 0);
      }
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
      return () => {
        window.visualViewport?.removeEventListener('resize', handleResize);
        window.visualViewport?.removeEventListener('scroll', handleResize);
      };
    }
  }, []);

  // Sobe o tip quando a barra de ação está visível
  const BAR_HEIGHT = 96; // aprox. altura da BottomActionBar sem sublabel
  const bottomOffset = 36 + keyboardOffset + (isBarVisible ? BAR_HEIGHT : 0);

  return (
    <motion.div
      className="absolute h-[56px] left-[24px] right-[24px] z-30"
      data-name="Tip EN"
      style={{ bottom: bottomOffset }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 16,
        bottom: bottomOffset,
      }}
      initial={{ opacity: 0, y: 16 }}
      transition={{
        opacity: { duration: 0.6, delay: isVisible ? 1.0 : 0, ease: [0.33, 1, 0.68, 1] },
        y: { duration: 0.6, delay: isVisible ? 1.0 : 0, ease: [0.33, 1, 0.68, 1] },
        bottom: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <div className="absolute content-stretch flex gap-[12px] h-[56px] items-center left-0 right-0 px-[16px] py-[12px] rounded-[24px] top-0" style={{ backgroundColor: '#f6ecff' }}>
        <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[24px]" style={{ borderColor: 'rgba(236,217,255,0.95)' }} />
        <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
          <div className="relative shrink-0 flex items-center justify-center" style={{ width: '20px', height: '32px' }}>
            <svg width="20" height="25" viewBox="3.333 7.667 13.334 16.666" fill="none" preserveAspectRatio="xMidYMid meet">
              <path d={svgPaths.p141ab00} fill={colors.primary.purple} />
            </svg>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-start justify-center min-h-px min-w-px relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTipIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col font-semibold justify-center leading-[0] not-italic overflow-hidden text-[12px] text-ellipsis w-full"
                style={{ fontFamily: tokens.fonts.nuSans, fontFeatureSettings: tokens.fontFeatures.numbers, color: colors.primary.purple, letterSpacing: '0.12px' }}
              >
                <p className="leading-[1.3] whitespace-pre-wrap">{tips[currentTipIndex]}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LoadingOverlay() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-50 rounded-[40px]"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-t-transparent"
          style={{ borderColor: `${colors.primary.purple} transparent ${colors.primary.purple} ${colors.primary.purple}` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p 
          className="text-[16px] font-semibold"
          style={{ fontFamily: tokens.fonts.nuSans, color: colors.primary.purple }}
        >
          {t('installmentValue.loadingText')}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function InstallmentValueScreen({ onComplete, onBack }: InstallmentValueProps) {
  const { t, translations, formatCurrency, locale } = useTranslation();
  const currencySymbol = translations.currency.symbol;
  const [inputValue, setInputValue] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  // ── Label animado do botão ──────────────────────────────────────────────────
  const [displayedValue, setDisplayedValue] = useState(0);
  const [labelKey, setLabelKey] = useState(0);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const currentNumericValue = inputValue === '' ? 0 : parseInt(inputValue, 10) / 100;

  // Debounce de 120ms para o efeito roulette no label
  useEffect(() => {
    if (currentNumericValue === 0) {
      setDisplayedValue(0);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayedValue(currentNumericValue);
      setLabelKey(prev => prev + 1);
    }, 120);
    return () => clearTimeout(timer);
  }, [currentNumericValue]);

  const hasAnyValue = inputValue !== '' && inputValue !== '0' && currentNumericValue > 0;
  const isAboveMinimum = currentNumericValue >= 24.00;

  // Delay de 1800ms para exibir a mensagem de erro — reseta se o valor
  // subir acima do mínimo ou for zerado antes do tempo esgotar
  useEffect(() => {
    if (hasAnyValue && !isAboveMinimum) {
      const timer = setTimeout(() => setShowError(true), 1800);
      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [hasAnyValue, isAboveMinimum]);

  const handleInputChange = (value: string) => setInputValue(value);
  const handleClear = () => setInputValue("");

  const calculateInstallments = (monthlyValue: number): number => {
    const ORIGINAL_PRICE = 1589.50;
    const BASE_DISCOUNT_RATE = 0.20;
    let closestInstallments = 2;
    let smallestDiff = Infinity;
    for (let installments = 2; installments <= 60; installments++) {
      const discountFactor = 1 - ((installments - 2) / (60 - 2)) * 0.5;
      const actualDiscount = BASE_DISCOUNT_RATE * discountFactor;
      const discountedPrice = ORIGINAL_PRICE * (1 - actualDiscount);
      const calculatedMonthly = discountedPrice / installments;
      const diff = Math.abs(calculatedMonthly - monthlyValue);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestInstallments = installments;
      }
    }
    return closestInstallments;
  };

  // Botão habilitado → simula
  const handleSimulate = () => {
    if (!isAboveMinimum) return;
    setIsLoading(true);
    setTimeout(() => {
      const installments = calculateInstallments(currentNumericValue);
      if (onComplete) onComplete(installments, currentNumericValue);
    }, 1500);
  };

  // Botão desabilitado → exibe alerta de valor mínimo
  const handleDisabledTap = () => {
    setShowAlert(true);
  };

  const formattedAmount = displayedValue > 0
    ? displayedValue.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '—';

  // Label como ReactNode: texto estático + número com roulette
  const buttonLabel = hasAnyValue ? (
    <>
      <span>{t('installmentValue.simulateWith', { symbol: currencySymbol, amount: '' })}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={labelKey}
          initial={{ y: 13, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -13, opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block' }}
        >
          {formattedAmount}
        </motion.span>
      </AnimatePresence>
    </>
  ) : (
    <span>{t('installmentValue.simulate')}</span>
  );

  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative size-full" data-name="Installment value">
      <Header onBack={onBack} />
      <MoneyInput
        value={inputValue}
        onChange={handleInputChange}
        isVisible={showContent}
        onClear={handleClear}
      />

      {/* ── Mensagem de erro — valor abaixo do mínimo ── */}
      <AnimatePresence>
        {showError && (
          <motion.div
            className="px-[24px] w-full flex items-start gap-[8px]"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{ flexShrink: 0, marginTop: '1px' }}
            >
              <path
                d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#E53535"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p style={{ fontFamily: tokens.fonts.nuSans, fontSize: '13px', color: '#C62828', lineHeight: '1.4', whiteSpace: 'pre-line' }}>
              {t('installmentValue.minimumError', { amount: formatCurrency(24.00) })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Tip isVisible={showContent && !hasAnyValue} isBarVisible={hasAnyValue} />

      <AnimatePresence>
        {hasAnyValue && (
          <BottomActionBar
            buttonLabel={buttonLabel}
            onAction={handleSimulate}
            onDisabledAction={handleDisabledTap}
            disabled={!isAboveMinimum}
            floatAboveKeyboard={true}
          />
        )}
      </AnimatePresence>

      {isLoading && <LoadingOverlay />}

      <AnimatePresence>
        {showAlert && (
          <AlertBottomSheet onClose={() => {
            setShowAlert(false);
            setInputValue("");
          }} />
        )}
      </AnimatePresence>
    </div>
  );
}