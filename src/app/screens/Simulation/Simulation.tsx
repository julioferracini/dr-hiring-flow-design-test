import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import svgPaths from "../../../imports/svg-3llmf9dm72";
import { useTranslation } from "../../i18n/context";
import { CURRENCY_CONFIGS } from "../../constants/currencies";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import { useFinancialCalculator } from "../../hooks/useFinancialCalculator";

// ============================================================================
// CALC SUMMARY SHEET — Memória de cálculo (pré-Summary)
// ============================================================================

interface CalcSummarySheetProps {
  isOpen: boolean;
  onClose: () => void;
  installments: number;
  monthlyPayment: number;
  downpayment: number;
  totalPaid: number;
  totalInterest: number;
  effectiveRate: number;
  originalDebt: number;
  savings: number;
  needsDownpayment: boolean;
  formatNumber: (n: number) => string;
}

function CalcSummarySheet({
  isOpen,
  onClose,
  installments,
  monthlyPayment,
  downpayment,
  totalPaid,
  totalInterest,
  effectiveRate,
  originalDebt,
  savings,
  needsDownpayment,
  formatNumber,
}: CalcSummarySheetProps) {
  const { t, translations, locale } = useTranslation();
  const { rules } = useFinancialCalculator();
  const symbol = translations.currency.symbol;

  // Data da primeira parcela = hoje + 30 dias
  const today = new Date();
  const firstDue = new Date(today);
  firstDue.setDate(firstDue.getDate() + 30);
  const firstDueStr = firstDue.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const paymentDay = firstDue.getDate();

  type Row = {
    label: string;
    value: string;
    highlight?: boolean;
    isNegative?: boolean;
    isSavings?: boolean;
  };

  const rows: Row[] = [];

  rows.push({ label: t("simulation.total"), value: `${symbol} ${formatNumber(originalDebt)}` });

  if (needsDownpayment && downpayment > 0) {
    rows.push({ label: t("simulation.downPayment"), value: `${symbol} ${formatNumber(downpayment)}` });
  }

  if (rules.formula === "price" || rules.formula === "sac") {
    const pct = (effectiveRate * 100).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
    rows.push({ label: `Taxa (${rules.taxLabel})`, value: `${pct}% a.m.` });
  }

  rows.push({
    label: t("simulation.installments"),
    value: t("simulation.installmentsCount", { count: installments }),
  });

  rows.push({
    label: t("simulation.monthlyPayment"),
    value: `${symbol} ${formatNumber(monthlyPayment)}`,
    highlight: true,
  });

  rows.push({ label: t("dueDate.downpayment"), value: firstDueStr });

  rows.push({ label: t("dueDate.installmentsOf", { count: installments }), value: `todo dia ${paymentDay}` });

  if ((rules.formula === "price" || rules.formula === "sac") && totalInterest > 0) {
    rows.push({
      label: t("summary.totalInterest"),
      value: `${symbol} ${formatNumber(totalInterest)}`,
      isNegative: true,
    });

    if (savings > 0) {
      rows.push({
        label: "Total em descontos",
        value: `− ${symbol} ${formatNumber(savings)}`,
        isSavings: true,
      });
    }
  }

  rows.push({
    label: t("summary.totalAmountToPay"),
    value: `${symbol} ${formatNumber(totalPaid)}`,
    highlight: true,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="absolute inset-0 z-50 flex flex-col justify-end overflow-hidden"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />

          {/* Sheet */}
          <motion.div
            className="relative w-full bg-white rounded-t-[28px] overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.75 }}
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: "0px -4px 32px rgba(0,0,0,0.10)" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-[10px] pb-[4px]">
              <div
                className="w-[36px] h-[5px] rounded-full"
                style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
              />
            </div>

            {/* Title row */}
            <div className="flex items-center justify-between px-[20px] pt-[24px] pb-[16px]">
              <h2
                style={{
                  fontFamily: "'Graphik', sans-serif",
                  fontWeight: 600,
                  fontSize: "22px",
                  letterSpacing: "-0.66px",
                  color: "#1f0230",
                  fontFeatureSettings: "'ss05'",
                }}
              >
                {t("simulation.subtitle")}
              </h2>

              {/* Close */}
              <motion.button
                className="size-[36px] flex items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(31,2,48,0)" }}
                onClick={onClose}
                whileHover={{ backgroundColor: "rgba(31,2,48,0.06)" }}
                whileTap={{ scale: 0.9, backgroundColor: "rgba(31,2,48,0.14)" }}
                transition={{ duration: 0.12 }}
                aria-label="Fechar"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 11.1785L15.2441 16.4226L16.4226 15.2441L11.1785 10L16.4226 4.75592L15.2441 3.57741L10 8.82149L4.75592 3.57741L3.57741 4.75592L8.82149 10L3.57741 15.2441L4.75592 16.4226L10 11.1785Z"
                    fill="#1F0230"
                    fillOpacity="0.62"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Table */}
            <div className="px-[20px] pb-[12px] max-h-[55vh] overflow-y-auto">
              {rows.map((row, i) => (
                <div key={i}>
                  {i > 0 && (
                    <div
                      className="w-full h-[1px]"
                      style={{ backgroundColor: "rgba(31,2,48,0.07)" }}
                    />
                  )}
                  <div className="flex items-center justify-between py-[14px] gap-[12px]">
                    <span
                      style={{
                        fontFamily: "'Nu_Sans_Text', sans-serif",
                        fontWeight: row.isSavings ? 500 : 400,
                        fontSize: "14px",
                        color: row.isSavings ? "#1f0230" : "rgba(0,0,0,0.52)",
                        letterSpacing: "-0.14px",
                        flexShrink: 0,
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Nu_Sans_Text', sans-serif",
                        fontWeight: row.highlight ? 600 : 600,
                        fontSize: "14px",
                        letterSpacing: "-0.14px",
                        color: row.isSavings
                          ? "#2eab57"
                          : row.isNegative
                          ? "#c0392b"
                          : row.highlight
                          ? "#1f0230"
                          : "rgba(0,0,0,0.78)",
                        textAlign: "right",
                        maxWidth: "60%",
                      }}
                    >
                      {typeof row.value === "string" && /^\d+x$/i.test(row.value)
                        ? row.value.replace(/x$/i, " parcelas")
                        : row.value}
                    </span>
                  </div>
                </div>
              ))}


            </div>

            {/* CTA */}
            <div className="px-[20px] pb-[28px] pt-[8px]">
              <motion.button
                className="w-full h-[52px] rounded-[26px] flex items-center justify-center bg-[#820ad1]"
                style={{ boxShadow: "0px 2px 8px rgba(130,10,209,0.25)" }}
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  style={{
                    fontFamily: "'Nu_Sans_Text', sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#fff",
                  }}
                >
                  {t("common.close")}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Ícone Info — botão da navbar ──────────────────────────────────────────────
function InfoButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      className="size-[44px] flex items-center justify-center rounded-full cursor-pointer"
      onClick={onClick}
      style={{ backgroundColor: "#FFFFFF" }}
      whileHover={{ backgroundColor: "rgba(31,2,48,0.06)" }}
      whileTap={{ scale: 0.88, backgroundColor: "rgba(31,2,48,0.12)" }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      aria-label="Memória de cálculo"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="#1F0230"
          strokeOpacity="0.62"
          strokeWidth="1.75"
        />
        <path
          d="M12 11v5M12 8.01v.5"
          stroke="#1F0230"
          strokeOpacity="0.62"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </motion.button>
  );
}

// ============================================================================
// HEADER COMPONENTS
// ============================================================================

function TimeWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Time Wrapper">
      <div
        className="flex flex-col font-sf-pro justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap"
        style={{ fontWeight: 600 }}
      >
        <p className="leading-[20px]">11:08</p>
      </div>
    </div>
  );
}

function Carrier() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.661px]" data-name="Carrier">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 67.6611 20"
      >
        <g id="Carrier">
          <path d={svgPaths.p25c9c700} fill="var(--fill-0, white)" id="Signal" />
          <path d={svgPaths.p8fa51f0} fill="var(--fill-0, white)" id="Wi-Fi" />
          <g id="Battery">
            <rect
              height="10.3333"
              id="Border"
              opacity="0.35"
              rx="3.5"
              stroke="var(--stroke-0, white)"
              width="21"
              x="43.833"
              y="4.83333"
            />
            <path d={svgPaths.p2deda380} fill="var(--fill-0, white)" id="Cap" opacity="0.4" />
            <rect
              fill="var(--fill-0, white)"
              height="7.33333"
              id="Capacity"
              rx="2.3"
              width="18"
              x="45.333"
              y="6.33333"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TopBar({ onBack, onInfo }: { onBack?: () => void; onInfo?: () => void }) {
  return (
    <ScreenNavBar
      variant="back"
      onAction={onBack}
      rightAction={onInfo ? <InfoButton onClick={onInfo} /> : undefined}
    />
  );
}

function Header({ onBack, onInfo }: { onBack?: () => void; onInfo?: () => void }) {
  const { t } = useTranslation();
  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0 w-full"
      data-name="Content"
    >
      <div
        className="bg-[rgba(255,255,255,0.67)] backdrop-blur-md content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full overflow-visible"
        data-name="[Magic] Top Bar"
      >
        <div className="h-[44px] relative shrink-0 w-full" data-name="Status Bar">
          <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] relative size-full">
            <TimeWrapper />
            <Carrier />
          </div>
        </div>
        <TopBar onBack={onBack} onInfo={onInfo} />
      </div>
      <div className="relative shrink-0 w-full" data-name="Title">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] pt-[12px] px-[20px] relative w-full">
            <p
              className="font-graphik leading-[1.1] not-italic relative shrink-0 text-[#1f0230] text-[clamp(24px,7vw,32px)] text-center tracking-[-0.96px] w-full whitespace-pre-wrap"
              style={{ fontWeight: 600, fontFeatureSettings: "'ss05'" }}
            >
              {t("simulation.title")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ANIMATED NUMBER WITH ROULETTE EFFECT
// ============================================================================

function AnimatedNumber({
  value,
  delay = 0,
  fontSize = 44,
  fontWeight = 500,
  color = "#1f0230",
  fontFamily = "Graphik",
  letterSpacing = "-1px",
}: {
  value: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: string;
  letterSpacing?: string;
}) {
  const prevValueRef = useRef(value);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const prevNum = parseFloat(prevValueRef.current.replace(/[^0-9.-]/g, "")) || 0;
    const currNum = parseFloat(value.replace(/[^0-9.-]/g, "")) || 0;
    setDirection(currNum >= prevNum ? "up" : "down");
    prevValueRef.current = value;
  }, [value]);

  const lineH = Math.ceil(fontSize * 1.2);
  const travel = lineH;

  const sharedStyle: React.CSSProperties = {
    display: "block",
    fontSize: `${fontSize}px`,
    fontWeight,
    color,
    fontFamily: `'${fontFamily}', sans-serif`,
    fontVariantNumeric: "tabular-nums",
    fontFeatureSettings: fontFamily === "Graphik" ? "'ss05', 'tnum'" : "'tnum'",
    letterSpacing,
    lineHeight: `${lineH}px`,
    whiteSpace: "nowrap",
  };

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: `${lineH}px`,
        position: "relative",
        verticalAlign: "middle",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{
            y: direction === "up" ? travel : -travel,
            filter: "blur(6px)",
            opacity: 0.4,
          }}
          animate={{
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
          }}
          exit={{
            y: direction === "up" ? -travel : travel,
            filter: "blur(6px)",
            opacity: 0.4,
          }}
          transition={{
            y: { type: "tween", duration: 0.45, ease: [0.42, 0, 0.58, 1], delay },
            filter: { duration: 0.35, ease: [0.42, 0, 0.58, 1], delay },
            opacity: { duration: 0.35, ease: [0.42, 0, 0.58, 1], delay },
          }}
          style={sharedStyle}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ============================================================================
// INPUT FIELDS
// ============================================================================

function CurrencyValue({
  symbol,
  value,
  delay = 0,
  fontSize,
  fontWeight,
  color,
  fontFamily,
  letterSpacing,
}: {
  symbol?: string;
  value: string;
  delay?: number;
  fontSize: number;
  fontWeight: number;
  color: string;
  fontFamily: string;
  letterSpacing: string;
}) {
  const { translations } = useTranslation();
  const resolvedSymbol = symbol ?? translations.currency.symbol;
  const lineH = Math.ceil(fontSize * 1.2);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
      {/* Static currency symbol */}
      <span
        style={{
          fontSize: `${fontSize}px`,
          fontWeight,
          color,
          fontFamily: `'${fontFamily}', sans-serif`,
          fontFeatureSettings: fontFamily === "Graphik" ? "'ss05'" : undefined,
          letterSpacing,
          lineHeight: `${lineH}px`,
          display: "inline-block",
          flexShrink: 0,
        }}
      >
        {resolvedSymbol}
      </span>
      <AnimatedNumber
        value={value}
        delay={delay}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        fontFamily={fontFamily}
        letterSpacing={letterSpacing}
      />
    </span>
  );
}

function InputDownpayment({ value, onClick }: { value: string; onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="content-stretch flex flex-col gap-[8px] items-center justify-center p-[20px] relative shrink-0 flex-1 cursor-pointer"
      data-name="Input"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
      layoutId="downpayment-field"
    >
      <div className="content-stretch flex items-center relative shrink-0" data-name="Big">
        <CurrencyValue
          value={value}
          fontSize={24}
          fontWeight={500}
          color="#1f002f"
          fontFamily="Nu_Sans_Display"
          letterSpacing="0px"
        />
      </div>
      <div className="bg-[#efefef] h-[4px] shrink-0 w-[min(140px,40vw)]" data-name="Divider" />
      <div
        className="flex flex-col font-graphik justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] whitespace-nowrap"
        style={{ fontWeight: 400, fontFeatureSettings: "'ss05'" }}
      >
        <p className="leading-[1.5] overflow-hidden">{t("simulation.downPayment")}</p>
      </div>
    </motion.div>
  );
}

function InputMonthlyPayment({
  value,
  onClick,
  isLarge = false,
}: {
  value: string;
  onClick?: () => void;
  isLarge?: boolean;
}) {
  const { t } = useTranslation();
  if (isLarge) {
    return (
      <motion.div
        className="content-stretch flex flex-col gap-[8px] items-center justify-center py-[20px] relative shrink-0 w-full cursor-pointer h-[148px]"
        data-name="Input"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        layout
        layoutId="monthly-field"
      >
        <div className="content-stretch flex items-center relative shrink-0" data-name="Big">
          <CurrencyValue
            value={value}
            delay={0.05}
            fontSize={44}
            fontWeight={500}
            color="#1f002f"
            fontFamily="Graphik"
            letterSpacing="-1.32px"
          />
        </div>
        <div
          className="bg-[#efefef] h-[4px] shrink-0 w-[min(220px,60vw)]"
          data-name="Divider"
        />
        <div
          className="flex flex-col font-graphik justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] whitespace-nowrap"
          style={{ fontWeight: 400, fontFeatureSettings: "'ss05'" }}
        >
          <p className="leading-[1.5] overflow-hidden">{t("simulation.monthlyPayment")}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="content-stretch flex flex-col gap-[8px] items-center justify-center p-[20px] relative shrink-0 flex-1 cursor-pointer"
      data-name="Input"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
      layoutId="monthly-field"
    >
      <div className="content-stretch flex items-center relative shrink-0" data-name="Big">
        <CurrencyValue
          value={value}
          delay={0.05}
          fontSize={24}
          fontWeight={500}
          color="#1f002f"
          fontFamily="Nu_Sans_Display"
          letterSpacing="0px"
        />
      </div>
      <div className="bg-[#efefef] h-[4px] shrink-0 w-[min(140px,40vw)]" data-name="Divider" />
      <div
        className="flex flex-col font-graphik justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] whitespace-nowrap"
        style={{ fontWeight: 400, fontFeatureSettings: "'ss05'" }}
      >
        <p className="leading-[1.5] overflow-hidden">{t("simulation.monthlyPayment")}</p>
      </div>
    </motion.div>
  );
}

function InputsHorizontal({
  downpaymentValue,
  monthlyValue,
  onDownpaymentClick,
  onMonthlyClick,
}: {
  downpaymentValue: string;
  monthlyValue: string;
  onDownpaymentClick: () => void;
  onMonthlyClick?: () => void;
}) {
  return (
    <motion.div
      className="content-stretch flex items-center justify-center relative shrink-0 w-full h-[148px]"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <InputDownpayment value={downpaymentValue} onClick={onDownpaymentClick} />
      <div className="flex h-[90px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[90px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 90 1"
              >
                <line stroke="#1F0230" strokeOpacity="0.08" x2="90" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <InputMonthlyPayment value={monthlyValue} onClick={onMonthlyClick} isLarge={false} />
    </motion.div>
  );
}

function InputInstallments({
  value,
  savings,
  onClick,
}: {
  value: number;
  savings: string;
  onClick: () => void;
}) {
  const { t, translations } = useTranslation();
  const currencySymbol = translations.currency.symbol;
  const formattedValue = value < 10 ? `0${value}` : value.toString();

  const bannerControls = useAnimation();
  const prevSavingsRef = useRef(savings);

  useEffect(() => {
    bannerControls.start({
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.4, delay: 0.15 },
        scale: { duration: 0.6, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prevSavingsRef.current !== savings) {
      prevSavingsRef.current = savings;
      const timer = setTimeout(() => {
        bannerControls.start({
          scale: [1, 1.045, 0.98, 1],
          boxShadow: [
            "0px 0px 0px 0px rgba(12, 122, 58, 0)",
            "0px 6px 24px 0px rgba(12, 122, 58, 0.05)",
            "0px 3px 12px 0px rgba(12, 122, 58, 0.04)",
            "0px 0px 0px 0px rgba(12, 122, 58, 0)",
          ],
          transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
        });
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [savings, bannerControls]);

  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-center justify-center py-[20px] relative shrink-0 w-full"
      data-name="Input"
    >
      <motion.div
        className="content-stretch flex items-center relative shrink-0 cursor-pointer"
        data-name="Big"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <p
          className="font-graphik leading-[1.1] not-italic relative shrink-0 text-[#1f0230] text-[clamp(36px,8vw,44px)] text-center tracking-[-1.32px] uppercase"
          style={{ fontWeight: 500, fontFeatureSettings: "'ss05', 'lnum', 'tnum'" }}
        >
          <AnimatedNumber value={formattedValue} delay={0.1} fontSize={44} fontWeight={500} />
        </p>
      </motion.div>
      <div
        className="bg-[#efefef] h-[4px] shrink-0 w-[min(160px,45vw)]"
        data-name="Divider"
      />
      <div
        className="flex flex-col font-graphik justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] whitespace-nowrap"
        style={{ fontWeight: 400, fontFeatureSettings: "'ss05'" }}
      >
        <p className="leading-[1.5] overflow-hidden">{t("simulation.installments")}</p>
      </div>

      {/* Savings Banner */}
      <div
        className="content-stretch flex flex-col items-center px-[20px] py-[16px] relative shrink-0 w-full"
        data-name="List group"
      >
        <motion.div
          className="bg-[#ddf5e5] flex items-center justify-center py-[15px] px-[16px] relative rounded-[16px] shrink-0 w-full"
          data-name="Wrapper"
          initial={{ opacity: 0, scale: 0.92, boxShadow: "0px 0px 0px 0px rgba(12, 122, 58, 0)" }}
          animate={bannerControls}
          transition={{
            opacity: { duration: 0.4, delay: 0.15 },
            scale: { duration: 0.6, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] },
          }}
        >
          <div
            aria-hidden="true"
            className="absolute border border-[rgba(30,165,84,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]"
          />

          <div
            className="flex items-center justify-center gap-[5px] w-full"
            style={{
              fontFamily: "'Nu_Sans_Text', sans-serif",
              fontSize: "14px",
              color: "#0c7a3a",
              letterSpacing: "0.14px",
              lineHeight: "1.4",
              fontFeatureSettings: "'lnum', 'tnum'",
            }}
          >
            <span style={{ fontWeight: 400, whiteSpace: "nowrap" }}>
              {t("simulation.totalSavings")}
            </span>
            <span style={{ fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
              {currencySymbol}
            </span>
            <span style={{ fontWeight: 700, display: "inline-flex", alignItems: "center" }}>
              <AnimatedNumber
                value={savings}
                delay={0.2}
                fontSize={14}
                fontWeight={700}
                color="#0c7a3a"
                fontFamily="Nu_Sans_Text"
                letterSpacing="0px"
              />
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// SLIDER
// ============================================================================

function useIsSmallScreen(breakpoint = 568) {
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight <= breakpoint : false
  );
  useEffect(() => {
    const check = () => setIsSmall(window.innerHeight <= breakpoint);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isSmall;
}

function InstallmentsSlider({
  minValue = 2,
  maxValue = 60,
  value = 10,
  onChange,
}: {
  minValue?: number;
  maxValue?: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    const updateDimensions = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const timer = setTimeout(updateDimensions, 100);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const thumbWidth = 32;
  const trackWidth = sliderWidth > 0 ? sliderWidth : 335;
  const maxThumbPosition = trackWidth - thumbWidth;
  const thumbPosition = (percentage / 100) * maxThumbPosition;
  const progressWidth = thumbPosition + thumbWidth / 2;

  const computeValueFromX = (clientX: number) => {
    if (!sliderRef.current) return value;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = x / rect.width;
    return Math.round(minValue + pct * (maxValue - minValue));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const handleMouseMove = (e: MouseEvent) => {
      onChange(Math.max(minValue, Math.min(maxValue, computeValueFromX(e.clientX))));
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      onChange(Math.max(minValue, Math.min(maxValue, computeValueFromX(touch.clientX))));
    };
    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      onChange(Math.max(minValue, Math.min(maxValue, computeValueFromX(e.clientX))));
    }
  };

  return (
    <div
      className="content-stretch flex flex-col items-center py-[16px] relative shrink-0 w-full px-[20px]"
      data-name="[Magic] Slider"
    >
      <div
        className="content-stretch flex flex-col gap-[12px] items-end relative shrink-0 w-full"
        data-name="Chart"
      >
        {/* Track + Thumb */}
        <div
          ref={sliderRef}
          className="h-[24px] relative shrink-0 w-full cursor-pointer"
          data-name="Indicator Bar"
          onClick={handleTrackClick}
        >
          {/* Track background */}
          <div
            className="-translate-y-1/2 absolute bg-[#e3e0e5] h-[4px] left-0 right-0 rounded-[8px] top-1/2"
            data-name="Track"
          />

          {/* Progress */}
          <motion.div
            className="-translate-y-1/2 absolute h-[4px] left-0 top-1/2 rounded-[8px]"
            animate={{ width: `${progressWidth}px` }}
            transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.5 }}
            data-name="Indicator"
            style={{
              background: "#820ad1",
            }}
          />

          {/* Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            animate={{ x: thumbPosition, scale: isDragging ? 1.35 : 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.5 }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
              width: `${thumbWidth}px`,
              height: `${thumbWidth}px`,
              borderRadius: "50%",
              backgroundColor: "#820ad1",
              boxShadow: isDragging
                ? "0px 4px 16px rgba(130,10,209,0.35)"
                : "none",
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "none",
              zIndex: 2,
            }}
            data-name="Thumb"
          />
        </div>

        {/* Labels — Mais desconto | Mais tempo (Figma exact) */}
        <div className="w-full flex items-center justify-between px-[4px]">
          <span
            style={{
              fontFamily: "'Nu_Sans_Text', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              color: "rgba(31,2,48,0.62)",
              letterSpacing: "0.12px",
              fontFeatureSettings: "'lnum', 'tnum'",
              lineHeight: "1.3",
            }}
          >
            {t("simulation.sliderMoreDiscount")}
          </span>
          <span
            style={{
              fontFamily: "'Nu_Sans_Text', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              color: "rgba(31,2,48,0.62)",
              letterSpacing: "0.12px",
              fontFeatureSettings: "'lnum', 'tnum'",
              lineHeight: "1.3",
              textAlign: "right",
            }}
          >
            {t("simulation.sliderMoreTime")}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CHECKOUT BOTTOM BAR
// ============================================================================

function CheckoutBottomBar({
  onContinue,
  total,
  originalPrice,
}: {
  onContinue: () => void;
  total: string;
  originalPrice: string;
}) {
  const { t, translations } = useTranslation();
  const symbol = translations.currency.symbol;

  return (
    <div
      className="bg-white w-full"
      style={{ borderTop: "1px solid rgba(31,2,48,0.08)" }}
      data-name="Bottom Bar"
    >
      {/* Side-by-side: texto (esq) + botão Continuar (dir) — fiel ao Figma */}
      <div className="flex gap-[24px] items-center p-[20px]">
        {/* Left: "Total: R$ X,XXX.XX" + riscado */}
        <div
          className="flex flex-col gap-[4px] flex-1 min-w-0 overflow-hidden"
          style={{ textOverflow: "ellipsis" }}
        >
          <p
            style={{
              fontFamily: "'Nu_Sans_Text', sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#1f0230",
              lineHeight: "1.3",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFeatureSettings: "'lnum', 'tnum'",
            }}
          >
            Total: {symbol} {total}
          </p>
          <p
            style={{
              fontFamily: "'Graphik', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              color: "rgba(31,2,48,0.62)",
              letterSpacing: "-0.16px",
              textDecoration: "line-through",
              lineHeight: "1.5",
              fontFeatureSettings: "'ss05'",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {symbol} {originalPrice}
          </p>
        </div>

        {/* Right: Continuar button */}
        <motion.button
          className="h-[48px] px-[24px] rounded-[64px] flex items-center justify-center bg-[#820ad1] shrink-0"
          style={{
            boxShadow:
              "0px 1px 0px 0px rgba(31,0,47,0.05), inset 0px 1px 0px 0px rgba(255,255,255,0.08), inset 0px -1px 0px 0px rgba(31,2,48,0.46)",
          }}
          onClick={onContinue}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <span
            style={{
              fontFamily: "'Nu_Sans_Text', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#fff",
              letterSpacing: "0px",
              fontFeatureSettings: "'lnum', 'tnum'",
              whiteSpace: "nowrap",
            }}
          >
            {t("simulation.continue")}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

// ============================================================================
// DOWNPAYMENT ALERT SHEET
// ============================================================================

function DownpaymentAlertSheet({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end" onClick={onClose}>
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        className="relative w-full bg-white rounded-t-[32px]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0px -4px 24px rgba(0, 0, 0, 0.12)" }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div
            className="w-[36px] h-[5px] rounded-full"
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          />
        </div>

        <div className="px-6 pb-8 pt-4">
          <div className="flex justify-center mb-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(130, 10, 209, 0.1)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#820AD1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h3
            className="text-center mb-3 font-graphik text-[#1f0230]"
            style={{
              fontWeight: 500,
              fontFeatureSettings: "'ss05'",
              fontSize: "24px",
              letterSpacing: "-0.72px",
            }}
          >
            {t("simulation.downPaymentRequired")}
          </h3>

          <p
            className="text-center mb-6 font-nu-sans"
            style={{
              fontWeight: 400,
              fontSize: "15px",
              color: "rgba(0,0,0,0.64)",
              lineHeight: "1.5",
            }}
            dangerouslySetInnerHTML={{ __html: t("simulation.downPaymentRequiredMessage") }}
          />

          <motion.button
            className="w-full h-[52px] rounded-[26px] flex items-center justify-center bg-[#820ad1]"
            style={{ boxShadow: "0px 2px 8px rgba(130, 10, 209, 0.25)" }}
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="font-nu-sans text-[#FFFFFF]"
              style={{ fontWeight: 600, fontSize: "15px" }}
            >
              {t("simulation.gotIt")}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// BOTTOM SHEET EDITOR
// ============================================================================

function BottomSheetEditor({
  isOpen,
  onClose,
  title,
  value,
  onValueChange,
  type,
  minValue,
  maxValue,
  isFixed,
  onToggleFixed,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: number;
  onValueChange: (value: number) => void;
  type: "downpayment" | "monthly" | "installments";
  minValue?: number;
  maxValue?: number;
  isFixed?: boolean;
  onToggleFixed?: (fixed: boolean) => void;
}) {
  const { t, translations, locale } = useTranslation();
  const symbol = translations.currency.symbol;
  const config = CURRENCY_CONFIGS[locale];

  // For monetary inputs, store raw digits (cents) as a string; for installments, store as-is
  const valueToRawDigits = (v: number) => Math.round(v * 100).toString();
  const [inputValue, setInputValue] = useState(
    type === "installments" ? value.toString() : valueToRawDigits(value)
  );
  const [localFixed, setLocalFixed] = useState(isFixed || false);
  const hasStartedTyping = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(type === "installments" ? value.toString() : valueToRawDigits(value));
    hasStartedTyping.current = false;
  }, [value, type]);

  useEffect(() => {
    setLocalFixed(isFixed || false);
  }, [isFixed]);

  useEffect(() => {
    if (isOpen) {
      hasStartedTyping.current = false;
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // For ATM-style: raw digits → numeric value (e.g. "12345" → 123.45)
  const numericValue = type === "installments"
    ? (parseInt(inputValue, 10) || 0)
    : (parseInt(inputValue, 10) || 0) / 100;

  const handleKeyPress = (key: string) => {
    if (type === "installments") {
      // Installments: simple left-to-right integer input
      if (key === "⌫") {
        hasStartedTyping.current = true;
        setInputValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        return;
      }
      if (key === "." || key === ",") return;
      if (!hasStartedTyping.current) {
        hasStartedTyping.current = true;
        setInputValue(key);
        return;
      }
      setInputValue((prev) => {
        const clean = prev === "0" ? "" : prev;
        return clean + key;
      });
      return;
    }

    // ATM-style monetary input: digits fill from right, fixed 2 decimal places
    if (key === "⌫") {
      hasStartedTyping.current = true;
      setInputValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      return;
    }
    if (key === "." || key === ",") return; // ignore decimal key in ATM mode
    if (!hasStartedTyping.current) {
      hasStartedTyping.current = true;
      setInputValue(key);
      return;
    }
    setInputValue((prev) => {
      const clean = prev === "0" ? "" : prev;
      const next = clean + key;
      // Cap at a reasonable length (e.g. 999999.99)
      if (next.length > 8) return prev;
      return next;
    });
  };

  const handleConfirm = () => {
    let final: number;
    if (type === "installments") {
      final = parseInt(inputValue, 10) || 0;
    } else {
      final = (parseInt(inputValue, 10) || 0) / 100;
    }
    if (minValue !== undefined) final = Math.max(minValue, final);
    if (maxValue !== undefined) final = Math.min(maxValue, final);
    onValueChange(final);
    onClose();
  };

  const handleToggleFixed = () => {
    const next = !localFixed;
    setLocalFixed(next);
    onToggleFixed?.(next);
  };

  const formatDisplay = () => {
    if (type === "installments") return inputValue;
    // ATM-style: raw digits → formatted with fixed 2 decimal places + thousands separator
    const cents = parseInt(inputValue, 10) || 0;
    const intPart = Math.floor(cents / 100).toString();
    const decPart = (cents % 100).toString().padStart(2, "0");
    // Add thousands separator
    const withThousands = config.thousandsSeparator
      ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator)
      : intPart;
    return `${withThousands}${config.decimalSeparator}${decPart}`;
  };

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "⌫"],
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="absolute inset-0 z-40 flex flex-col justify-end"
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />

          <motion.div
            className="relative w-full bg-white rounded-t-[28px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: "0px -4px 24px rgba(0,0,0,0.10)" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-[10px] pb-[2px]">
              <div
                className="w-[36px] h-[5px] rounded-full"
                style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
              />
            </div>

            {/* Title */}
            <div className="flex items-center justify-between px-[20px] pt-[12px] pb-[4px]">
              <h3
                style={{
                  fontFamily: "'Graphik', sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                  letterSpacing: "-0.6px",
                  color: "#1f0230",
                  fontFeatureSettings: "'ss05'",
                }}
              >
                {title}
              </h3>
              <motion.button
                className="size-[36px] flex items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(31,2,48,0)" }}
                onClick={onClose}
                whileHover={{ backgroundColor: "rgba(31,2,48,0.06)" }}
                whileTap={{ scale: 0.9, backgroundColor: "rgba(31,2,48,0.14)" }}
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 11.1785L15.2441 16.4226L16.4226 15.2441L11.1785 10L16.4226 4.75592L15.2441 3.57741L10 8.82149L4.75592 3.57741L3.57741 4.75592L8.82149 10L3.57741 15.2441L4.75592 16.4226L10 11.1785Z"
                    fill="#1F0230"
                    fillOpacity="0.5"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Display value */}
            <div className="flex flex-col items-center py-[16px] px-[20px]">
              <div className="flex items-baseline gap-[6px]">
                {type !== "installments" && (
                  <span
                    style={{
                      fontFamily: "'Graphik', sans-serif",
                      fontWeight: 500,
                      fontSize: "32px",
                      color: "#1f0230",
                      letterSpacing: "-0.96px",
                      fontFeatureSettings: "'ss05'",
                    }}
                  >
                    {symbol}
                  </span>
                )}
                <input
                  ref={inputRef}
                  readOnly
                  value={formatDisplay()}
                  autoFocus
                  style={{
                    fontFamily: "'Graphik', sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
                    color: "#1f0230",
                    letterSpacing: "-1.2px",
                    fontFeatureSettings: "'ss05', 'tnum'",
                    minWidth: "120px",
                    textAlign: "center",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    caretColor: "#820ad1",
                    width: `${Math.max(120, formatDisplay().length * 24)}px`,
                  }}
                />
                {type === "installments" && (
                  <span
                    style={{
                      fontFamily: "'Nu_Sans_Text', sans-serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      color: "rgba(0,0,0,0.44)",
                    }}
                  >
                    x
                  </span>
                )}
              </div>

              {/* Min/Max hint */}
              {(minValue !== undefined || maxValue !== undefined) && (
                <p
                  style={{
                    fontFamily: "'Nu_Sans_Text', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "rgba(0,0,0,0.4)",
                    marginTop: "4px",
                  }}
                >
                  {minValue !== undefined && t("simulation.downPaymentMinimum").replace("{amount}", `${symbol}${config.spaceAfterSymbol ? " " : ""}${minValue.toFixed(2).replace(".", config.decimalSeparator)}`)}
                  {minValue !== undefined && maxValue !== undefined && " · "}
                  {maxValue !== undefined && t("simulation.downPaymentMaximum").replace("{amount}", `${symbol}${config.spaceAfterSymbol ? " " : ""}${maxValue.toFixed(2).replace(".", config.decimalSeparator)}`)}

                </p>
              )}

              {/* Lock toggle for downpayment */}
              {type === "downpayment" && (
                <motion.button
                  className="flex items-center justify-between w-full mt-[12px] px-[16px] py-[10px] rounded-[12px]"
                  style={{
                    backgroundColor: localFixed
                      ? "rgba(130,10,209,0.06)"
                      : "rgba(0,0,0,0.03)",
                  }}
                  onClick={handleToggleFixed}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-start">
                    <span
                      style={{
                        fontFamily: "'Nu_Sans_Text', sans-serif",
                        fontWeight: 500,
                        fontSize: "13px",
                        color: localFixed ? "#820ad1" : "rgba(0,0,0,0.56)",
                        letterSpacing: "-0.13px",
                      }}
                    >
                      {t("simulation.keepForAllInstallments")}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Nu_Sans_Text', sans-serif",
                        fontWeight: 400,
                        fontSize: "11px",
                        color: localFixed ? "rgba(130,10,209,0.5)" : "rgba(0,0,0,0.32)",
                        marginTop: "1px",
                      }}
                    >
                      {t("simulation.keepForAllInstallmentsSubtitle")}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "40px",
                      height: "24px",
                      borderRadius: "12px",
                      backgroundColor: localFixed ? "#820ad1" : "rgba(0,0,0,0.16)",
                      position: "relative",
                      transition: "background-color 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    <motion.div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        position: "absolute",
                        top: "2px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                      }}
                      animate={{ left: localFixed ? "18px" : "2px" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </motion.button>
              )}
            </div>

            {/* Divider */}
            <div className="h-[1px] mx-[20px]" style={{ backgroundColor: "rgba(31,2,48,0.07)" }} />

            {/* Keypad */}
            <div className="px-[16px] pt-[8px] pb-[8px]">
              {keys.map((row, ri) => (
                <div key={ri} className="flex justify-between mb-[4px]">
                  {row.map((key, ki) => (
                    key === "" ? (
                      <div key={`empty-${ki}`} className="flex-1 mx-[4px] h-[52px]" />
                    ) : (
                      <motion.button
                        key={key}
                        className="flex-1 mx-[4px] h-[52px] rounded-[14px] flex items-center justify-center"
                        style={{
                          backgroundColor:
                            key === "⌫" ? "rgba(130,10,209,0.06)" : "rgba(31,2,48,0.04)",
                        }}
                        onClick={() => handleKeyPress(key)}
                        whileTap={{ scale: 0.92, backgroundColor: "rgba(130,10,209,0.12)" }}
                        transition={{ duration: 0.1 }}
                      >
                        <span
                          style={{
                            fontFamily: "'Nu_Sans_Text', sans-serif",
                            fontWeight: key === "⌫" ? 400 : 600,
                            fontSize: key === "⌫" ? "20px" : "20px",
                            color: key === "⌫" ? "#820ad1" : "#1f0230",
                            letterSpacing: "-0.4px",
                          }}
                        >
                          {key}
                        </span>
                      </motion.button>
                    )
                  ))}
                </div>
              ))}
            </div>

            {/* Confirm */}
            <div className="px-[20px] pb-[28px] pt-[8px]">
              <motion.button
                className="w-full h-[52px] rounded-[26px] flex items-center justify-center bg-[#820ad1]"
                style={{ boxShadow: "0px 2px 8px rgba(130,10,209,0.25)" }}
                onClick={handleConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  style={{
                    fontFamily: "'Nu_Sans_Text', sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#fff",
                  }}
                >
                  {t("simulation.confirm")}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// SIMULATION — MAIN COMPONENT
// ============================================================================

export function Simulation({
  initialInstallments = 10,
  initialDownpayment,
  initialDownpaymentFixed,
  onBack,
  onContinue,
}: {
  initialInstallments?: number;
  initialDownpayment?: number;
  initialDownpaymentFixed?: boolean;
  onBack?: () => void;
  onContinue?: (data: {
    installments: number;
    monthlyPayment: number;
    savings: number;
    total: number;
    downpayment?: number;
    hasDownpayment?: boolean;
    downpaymentFixed?: boolean;
  }) => void;
}) {
  const { t, locale } = useTranslation();
  const { rules, debtData, calculate } = useFinancialCalculator();
  const isSmallScreen = useIsSmallScreen();

  const ORIGINAL_PRICE = debtData.originalBalance;

  const [installments, setInstallments] = useState(initialInstallments);
  const [downpayment, setDownpayment] = useState(initialDownpayment ?? 0);
  const [downpaymentFixed, setDownpaymentFixed] = useState(initialDownpaymentFixed ?? false);
  const [showDownpaymentAlert, setShowDownpaymentAlert] = useState(false);
  const [hasShownAlertOnce, setHasShownAlertOnce] = useState(false);
  const [showCalcSummary, setShowCalcSummary] = useState(false);
  const [sheetState, setSheetState] = useState<{
    isOpen: boolean;
    type: "downpayment" | "monthly" | "installments";
    title: string;
  }>({
    isOpen: false,
    type: "monthly",
    title: "",
  });

  const values = calculate({
    installments,
    downpayment,
    totalDebt: ORIGINAL_PRICE,
    downpaymentFixed,
  });

  // Debounced savings
  const [displayedSavings, setDisplayedSavings] = useState(values.savings);
  const savingsDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (savingsDebounceRef.current) clearTimeout(savingsDebounceRef.current);
    savingsDebounceRef.current = setTimeout(() => {
      setDisplayedSavings(values.savings);
    }, 520);
    return () => {
      if (savingsDebounceRef.current) clearTimeout(savingsDebounceRef.current);
    };
  }, [values.savings]);

  // Initialize downpayment if starting > threshold (skip if provided via props)
  useEffect(() => {
    if (initialDownpayment !== undefined && initialDownpayment > 0) return;
    if (initialInstallments > rules.downPaymentThreshold && downpayment === 0) {
      setDownpayment(ORIGINAL_PRICE * rules.downPaymentMinPercent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInstallmentsChange = (newInstallments: number) => {
    const previousNeedsDownpayment = installments > rules.downPaymentThreshold;
    const nowNeedsDownpayment = newInstallments > rules.downPaymentThreshold;

    setInstallments(newInstallments);

    if (!previousNeedsDownpayment && nowNeedsDownpayment) {
      if (!hasShownAlertOnce) {
        setShowDownpaymentAlert(true);
        setHasShownAlertOnce(true);
      }
      if (!downpaymentFixed) {
        setDownpayment(ORIGINAL_PRICE * rules.downPaymentMinPercent);
      }
    }

    if (previousNeedsDownpayment && !nowNeedsDownpayment && !downpaymentFixed) {
      setDownpayment(0);
    }
  };

  const handleMonthlyPaymentChange = (newMonthly: number) => {
    // Busca iterativa: testa cada parcela possível e encontra a mais próxima
    let bestInst = installments;
    let bestDiff = Infinity;

    for (let n = rules.minInstallments; n <= rules.maxInstallments; n++) {
      const result = calculate({
        installments: n,
        downpayment,
        totalDebt: ORIGINAL_PRICE,
        downpaymentFixed,
      });
      const diff = Math.abs(result.monthlyPayment - newMonthly);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestInst = n;
      }
    }

    handleInstallmentsChange(bestInst);
  };

  const handleDownpaymentChange = (newDownpayment: number) => {
    const minDp = ORIGINAL_PRICE * rules.downPaymentMinPercent;
    const maxDp = ORIGINAL_PRICE * rules.downPaymentMaxPercent;
    const clampedDp = Math.max(minDp, Math.min(maxDp, newDownpayment));
    setDownpayment(clampedDp);
  };

  const openSheet = (type: "downpayment" | "monthly" | "installments") => {
    const titles = {
      downpayment: t("simulation.downPayment"),
      monthly: t("simulation.monthlyPayment"),
      installments: t("simulation.installments"),
    };
    setSheetState({ isOpen: true, type, title: titles[type] });
  };

  const closeSheet = () => {
    setSheetState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSheetValueChange = (value: number) => {
    if (sheetState.type === "downpayment") {
      handleDownpaymentChange(value);
    } else if (sheetState.type === "monthly") {
      handleMonthlyPaymentChange(value);
    } else {
      handleInstallmentsChange(value);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue({
        installments,
        monthlyPayment: values.monthlyPayment,
        savings: values.savings,
        total: values.total,
        downpayment: downpayment,
        hasDownpayment: values.needsDownpayment,
        downpaymentFixed,
      });
    }
  };

  const formatNumber = (num: number) => {
    const config = CURRENCY_CONFIGS[locale];
    const absValue = Math.abs(num);
    const integerPart = Math.floor(absValue);
    const decimalPart = Math.round(
      (absValue - integerPart) * Math.pow(10, config.decimalPlaces)
    );
    const integerStr = integerPart
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
    const decimalStr = decimalPart.toString().padStart(config.decimalPlaces, "0");
    return `${integerStr}${config.decimalSeparator}${decimalStr}`;
  };

  return (
    <div
      className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[40px] size-full min-w-[320px] max-w-[767px] mx-auto"
      data-name="Simulation Template"
    >
      {/* Header */}
      <div
        className="content-stretch flex flex-col items-center relative shrink-0 w-full"
        data-name="[Magic] Header"
      >
        <Header onBack={onBack} onInfo={() => setShowCalcSummary(true)} />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        {/* ── Bloco superior ── */}
        <div
          className={
            isSmallScreen
              ? "sticky top-0 z-[8] bg-white border-b border-[rgba(31,2,48,0.06)]"
              : ""
          }
        >
          <AnimatePresence mode="wait">
            {values.needsDownpayment ? (
              <InputsHorizontal
                key="horizontal"
                downpaymentValue={formatNumber(values.downpayment)}
                monthlyValue={formatNumber(values.monthlyPayment)}
                onDownpaymentClick={() => openSheet("downpayment")}
                onMonthlyClick={() => openSheet("monthly")}
              />
            ) : (
              <InputMonthlyPayment
                key="monthly-only"
                value={formatNumber(values.monthlyPayment)}
                onClick={() => openSheet("monthly")}
                isLarge={true}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="h-[8px] shrink-0" />

        {/* Installments + Savings Banner */}
        <InputInstallments
          value={installments}
          savings={formatNumber(displayedSavings)}
          onClick={() => openSheet("installments")}
        />

        {/* ── Slider ── */}
        <div
          className={
            isSmallScreen
              ? "sticky bottom-0 z-[8] bg-white border-t border-[rgba(31,2,48,0.06)]"
              : "flex-1 flex flex-col justify-center min-h-[80px]"
          }
        >
          <InstallmentsSlider
            value={installments}
            minValue={rules.minInstallments}
            maxValue={rules.maxInstallments}
            onChange={handleInstallmentsChange}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 w-full z-10">
        <CheckoutBottomBar
          onContinue={handleContinue}
          total={formatNumber(values.total)}
          originalPrice={formatNumber(ORIGINAL_PRICE)}
        />
      </div>

      {/* Home Indicator */}
      <div
        className="absolute content-stretch flex flex-col items-center justify-end left-0 bottom-0 pb-[8px] pt-[19px] w-full pointer-events-none z-20"
        data-name="Home Indicator"
      >
        <div className="h-[5px] rounded-[64px] shrink-0 w-[140px]" data-name="Line" />
      </div>

      {/* Downpayment alert */}
      <AnimatePresence>
        {showDownpaymentAlert && (
          <DownpaymentAlertSheet onClose={() => setShowDownpaymentAlert(false)} />
        )}
      </AnimatePresence>

      {/* Calc Summary Sheet */}
      <CalcSummarySheet
        isOpen={showCalcSummary}
        onClose={() => setShowCalcSummary(false)}
        installments={installments}
        monthlyPayment={values.monthlyPayment}
        downpayment={values.downpayment}
        totalPaid={values.total}
        totalInterest={values.totalInterest}
        effectiveRate={values.effectiveRate}
        originalDebt={ORIGINAL_PRICE}
        savings={values.savings}
        needsDownpayment={values.needsDownpayment}
        formatNumber={formatNumber}
      />

      {/* Bottom sheet editor */}
      <BottomSheetEditor
        isOpen={sheetState.isOpen}
        onClose={closeSheet}
        title={sheetState.title}
        value={
          sheetState.type === "downpayment"
            ? downpayment
            : sheetState.type === "monthly"
            ? values.monthlyPayment
            : installments
        }
        onValueChange={handleSheetValueChange}
        type={sheetState.type}
        minValue={
          sheetState.type === "downpayment"
            ? ORIGINAL_PRICE * rules.downPaymentMinPercent
            : undefined
        }
        maxValue={
          sheetState.type === "downpayment"
            ? ORIGINAL_PRICE * rules.downPaymentMaxPercent
            : undefined
        }
        isFixed={sheetState.type === "downpayment" ? downpaymentFixed : undefined}
        onToggleFixed={
          sheetState.type === "downpayment"
            ? (fixed) => setDownpaymentFixed(fixed)
            : undefined
        }
      />
    </div>
  );
}

export default Simulation;
