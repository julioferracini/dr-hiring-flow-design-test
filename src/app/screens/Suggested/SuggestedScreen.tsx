/**
 * SuggestedScreen — Flow B
 *
 * Mostra uma lista de condições sugeridas com base no valor alvo
 * informado na tela InstallmentValue. "Mais opções" abre um bottom
 * sheet com a lista completa de 1–60 parcelas.
 *
 * Reutiliza useFinancialCalculator (sem duplicação de lógica).
 */

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimationControls } from "motion/react";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import { useTranslation } from "../../i18n/context";
import { useFinancialCalculator } from "../../hooks/useFinancialCalculator";
import { CURRENCY_CONFIGS } from "../../constants/currencies";
import { tokens } from "../../constants";
import svgPaths from "../../../imports/svg-khcy39f05g";
import infoSvg from "../../../imports/svg-xzo4namtjs";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SuggestedScreenProps {
  targetValue: number; // valor alvo vindo do InstallmentValue
  onBack: () => void;
  onSelect: (data: {
    installments: number;
    monthlyPayment: number;
    savings: number;
    total: number;
    downpayment: number;
    hasDownpayment: boolean;
  }) => void;
}

interface PlanOption {
  installments: number;
  monthlyPayment: number;
  savings: number;
  total: number;
  downpayment: number;
  hasDownpayment: boolean;
  totalInterest: number;
  effectiveRate: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Formata valor monetário com separadores corretos do locale */
function fmtCurrency(value: number, locale: string) {
  const cfg = CURRENCY_CONFIGS[locale as keyof typeof CURRENCY_CONFIGS];
  const abs = Math.abs(value);
  const intPart = Math.floor(abs);
  const decPart = Math.round((abs - intPart) * 100);
  const intStr = intPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, cfg.thousandsSeparator);
  const decStr = decPart.toString().padStart(2, "0");
  const numStr = `${intStr}${cfg.decimalSeparator}${decStr}`;
  const space = cfg.spaceAfterSymbol ? " " : "";
  return `${cfg.symbol}${space}${numStr}`;
}

// ── Chevron right SVG (from Figma) ────────────────────────────────────────────

function ChevronRight({ opacity = 0.6 }: { opacity?: number }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <div className="absolute flex inset-[23.71%_34.99%_24.57%_34.99%] items-center justify-center">
        <div className="-rotate-90 flex-none h-[6.006px] w-[10.345px]">
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 10.3452 6.00592"
          >
            <path
              d={svgPaths.ped7e100}
              fill="#1F002F"
              fillOpacity={opacity}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Roulette Value (slot-machine animation on value change) ───────────────────

function RouletteValue({
  value,
  className,
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`inline-flex overflow-hidden align-bottom ${className ?? ""}`} style={{ ...style, position: "relative" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 18, opacity: 0, filter: "blur(2px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: "inline-block", fontWeight: "inherit", ...style }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Renders a template string with {placeholders} — static text stays plain,
 * only the replaced values get the slot-machine RouletteValue animation.
 */
function renderWithRoulette(
  template: string,
  replacements: Record<string, string>,
  rouletteStyle?: React.CSSProperties,
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\{(\w+)\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      parts.push(template.slice(lastIndex, match.index));
    }
    const name = match[1];
    const value = replacements[name] ?? match[0];
    parts.push(
      <RouletteValue key={`rv-${key++}`} value={value} style={rouletteStyle} />,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex));
  }

  return <>{parts}</>;
}

// ── Divider (from Figma) ──────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center">
      <div className="bg-[rgba(31,2,48,0.08)] h-px w-full" />
    </div>
  );
}

// ── FAQ icon (from Figma) ─────────────────────────────────────────────────────

function FaqIcon() {
  return (
    <div className="relative shrink-0 size-[40px]">
      <svg
        className="block size-full"
        fill="none"
        viewBox="0 0 40 40"
      >
        <path
          d={svgPaths.pc0b0400}
          fill="#E1E1E1"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path
            d={svgPaths.p2da05800}
            fill="black"
            fillOpacity="0.96"
          />
          <path
            d={svgPaths.p3d73a000}
            fill="black"
            fillOpacity="0.96"
          />
          <path
            d={svgPaths.p1373d100}
            fill="black"
            fillOpacity="0.96"
          />
        </svg>
      </div>
    </div>
  );
}

// ── Value Editor Bottom Sheet ─────────────────────────────────────────────────

function ValueEditorSheet({
  isOpen,
  onClose,
  value,
  onValueChange,
  locale,
  title,
  confirmLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  value: number;
  onValueChange: (value: number) => void;
  locale: string;
  title: string;
  confirmLabel: string;
}) {
  const config = CURRENCY_CONFIGS[locale as keyof typeof CURRENCY_CONFIGS];
  const symbol = config.symbol;

  const valueToRawDigits = (v: number) => Math.round(v * 100).toString();
  const [inputValue, setInputValue] = useState(valueToRawDigits(value));
  const hasStartedTyping = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(valueToRawDigits(value));
    hasStartedTyping.current = false;
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      hasStartedTyping.current = false;
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
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
      const next = clean + key;
      if (next.length > 8) return prev;
      return next;
    });
  };

  const handleConfirm = () => {
    const final = (parseInt(inputValue, 10) || 0) / 100;
    if (final > 0) {
      onValueChange(final);
    }
    onClose();
  };

  const formatDisplay = () => {
    const cents = parseInt(inputValue, 10) || 0;
    const intPart = Math.floor(cents / 100).toString();
    const decPart = (cents % 100).toString().padStart(2, "0");
    const withThousands = config.thousandsSeparator
      ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator)
      : intPart;
    return `${withThousands}${config.decimalSeparator}${decPart}`;
  };

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "backspace"],
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
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] mx-[20px]" style={{ backgroundColor: "rgba(31,2,48,0.07)" }} />

            {/* Keypad */}
            <div className="px-[16px] pt-[8px] pb-[8px]">
              {keys.map((row, ri) => (
                <div key={ri} className="flex justify-between mb-[4px]">
                  {row.map((key, ki) =>
                    key === "" ? (
                      <div key={`empty-${ki}`} className="flex-1 mx-[4px] h-[52px]" />
                    ) : (
                      <motion.button
                        key={key}
                        className="flex-1 mx-[4px] h-[52px] rounded-[14px] flex items-center justify-center"
                        style={{
                          backgroundColor:
                            key === "backspace" ? "rgba(130,10,209,0.06)" : "rgba(31,2,48,0.04)",
                        }}
                        onClick={() => handleKeyPress(key)}
                        whileTap={{ scale: 0.92, backgroundColor: "rgba(130,10,209,0.12)" }}
                        transition={{ duration: 0.1 }}
                      >
                        <span
                          style={{
                            fontFamily: "'Nu_Sans_Text', sans-serif",
                            fontWeight: key === "backspace" ? 400 : 600,
                            fontSize: "20px",
                            color: key === "backspace" ? "#820ad1" : "#1f0230",
                            letterSpacing: "-0.4px",
                          }}
                        >
                          {key === "backspace" ? "⌫" : key}
                        </span>
                      </motion.button>
                    )
                  )}
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
                  {confirmLabel}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Bottom Sheet (lista completa) ─────────────────────────────────────────────

function AllOptionsSheet({
  isOpen,
  onClose,
  options,
  onSelect,
  locale,
  sheetTitle,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  options: PlanOption[];
  onSelect: (opt: PlanOption) => void;
  locale: string;
  sheetTitle: string;
  t: ReturnType<typeof useTranslation>["translations"]["suggested"];
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center rounded-[40px] overflow-hidden pointer-events-none">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="relative w-full bg-white rounded-t-[32px] shadow-[0px_-2px_20px_rgba(0,0,0,0.1)] pointer-events-auto flex flex-col"
            style={{ height: "85%" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 35,
              mass: 0.9,
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-[10px] pb-[6px]">
              <div className="w-[36px] h-[5px] bg-black/20 rounded-full" />
            </div>

            {/* Header with close button */}
            <div className="px-[24px] pt-[8px] pb-[24px]">
              <ScreenNavBar variant="close" onAction={onClose} />
              <p
                className="text-[#1f0230] text-[28px] tracking-[-0.84px] whitespace-pre-wrap"
                style={{
                  fontFamily: tokens.fonts.nuSans,
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                {sheetTitle}
              </p>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto pb-[40px]">
              <div className="flex flex-col">
                {options.map((opt) => {
                  const label =
                    opt.installments === 1
                      ? t.installmentOf.replace("{amount}", fmtCurrency(opt.monthlyPayment, locale))
                      : t.installmentsOf
                          .replace("{count}", String(opt.installments))
                          .replace("{amount}", fmtCurrency(opt.monthlyPayment, locale));

                  const hasDiscount = opt.savings > 0.5;

                  return (
                    <button
                      key={opt.installments}
                      className="relative w-full text-left cursor-pointer"
                      onClick={() => onSelect(opt)}
                    >
                      <div className="flex gap-[12px] items-center p-[16px] mx-[16px]">
                        <div className="flex-1 flex flex-col gap-[4px] min-w-0">
                          <p
                            className="text-[#1f002f] text-[14px]"
                            style={{
                              fontFamily: tokens.fonts.nuSans,
                              fontWeight: 600,
                              lineHeight: 1.3,
                              fontFeatureSettings: "'lnum', 'tnum'",
                            }}
                          >
                            {label}
                          </p>
                          <div
                            className="text-[14px]"
                            style={{
                              fontFamily: tokens.fonts.graphik,
                              lineHeight: 1.3,
                              fontFeatureSettings: "'lnum', 'tnum'",
                            }}
                          >
                            {hasDiscount && (
                              <p className="text-[#0c7a3a] mb-0">
                                {t.discountAmount.replace("{amount}", fmtCurrency(opt.savings, locale))}
                              </p>
                            )}
                            <p className="text-[rgba(0,0,0,0.64)]">
                              {opt.hasDownpayment && opt.downpayment > 0
                                ? t.downpaymentOf.replace("{amount}", fmtCurrency(opt.downpayment, locale))
                                : t.noDownpayment}
                            </p>
                          </div>
                        </div>
                        <ChevronRight />
                      </div>
                      <Divider />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Info button (from Figma — navbar trailing icon) ───────────────────────────

function InfoButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      className="size-[44px] flex items-center justify-center rounded-full cursor-pointer"
      onClick={onClick}
      style={{ backgroundColor: "rgba(31,2,48,0)" }}
      whileHover={{ backgroundColor: "rgba(31,2,48,0.06)" }}
      whileTap={{ scale: 0.88, backgroundColor: "rgba(31,2,48,0.12)" }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      aria-label="Info"
    >
      <div className="relative size-[20px]">
        <div className="absolute inset-[8.33%_7.69%_8.33%_8.97%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
            <path d={infoSvg.p26903680} fill="#1F0230" fillOpacity="0.62" />
            <path d={infoSvg.p2c7f7180} fill="#1F0230" fillOpacity="0.62" />
            <path d={infoSvg.p2085d070} fill="#1F0230" fillOpacity="0.62" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

// ── Calc Summary Sheet (pré-resumo da negociação) ─────────────────────────────

function CalcSummarySheet({
  isOpen, onClose, plan, locale, title, closeLabel, originalDebt, taxLabel,
}: {
  isOpen: boolean; onClose: () => void; plan: PlanOption; locale: string;
  title: string; closeLabel: string; originalDebt: number; taxLabel: string;
}) {
  const { t, translations } = useTranslation();
  const symbol = translations.currency.symbol;
  const fmt = (n: number) => fmtCurrency(n, locale).replace(symbol, "").replace(/^\s/, "");

  const today = new Date();
  const firstDue = new Date(today);
  firstDue.setDate(firstDue.getDate() + 30);
  const firstDueStr = firstDue.toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
  const paymentDay = firstDue.getDate();

  type Row = { label: string; value: string; highlight?: boolean; isNegative?: boolean; isSavings?: boolean };
  const rows: Row[] = [];

  rows.push({ label: t("simulation.total"), value: `${symbol} ${fmt(originalDebt)}` });
  if (plan.hasDownpayment && plan.downpayment > 0) {
    rows.push({ label: t("simulation.downPayment"), value: `${symbol} ${fmt(plan.downpayment)}` });
  }
  if (plan.effectiveRate > 0) {
    const pct = (plan.effectiveRate * 100).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    rows.push({ label: `Taxa (${taxLabel})`, value: `${pct}% a.m.` });
  }
  rows.push({ label: t("simulation.installments"), value: `${plan.installments} ${plan.installments === 1 ? "parcela" : "parcelas"}` });
  rows.push({ label: t("simulation.monthlyPayment"), value: `${symbol} ${fmt(plan.monthlyPayment)}`, highlight: true });
  rows.push({ label: t("dueDate.downpayment"), value: firstDueStr });
  rows.push({ label: t("dueDate.installmentsOf", { count: plan.installments }), value: translations.summary.everyDay.replace("{day}", String(paymentDay)) });
  if (plan.totalInterest > 0) {
    rows.push({ label: t("summary.totalInterest"), value: `${symbol} ${fmt(plan.totalInterest)}`, isNegative: true });
    if (plan.savings > 0) {
      rows.push({ label: translations.summary.totalSavings, value: `- ${symbol} ${fmt(plan.savings)}`, isSavings: true });
    }
  }
  rows.push({ label: t("summary.totalAmountToPay"), value: `${symbol} ${fmt(plan.total)}`, highlight: true });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[45] flex flex-col justify-end overflow-hidden" onClick={onClose}>
          <motion.div className="absolute inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} />
          <motion.div
            className="relative w-full bg-white rounded-t-[28px] overflow-hidden"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.75 }}
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: "0px -4px 32px rgba(0,0,0,0.10)" }}
          >
            <div className="flex justify-center pt-[10px] pb-[4px]">
              <div className="w-[36px] h-[5px] rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.12)" }} />
            </div>
            <div className="flex items-center justify-between px-[20px] pt-[24px] pb-[16px]">
              <h2 style={{ fontFamily: "'Graphik', sans-serif", fontWeight: 500, fontSize: "22px", letterSpacing: "-0.66px", color: "#1f0230", fontFeatureSettings: "'ss05'" }}>{title}</h2>
              <motion.button className="size-[36px] flex items-center justify-center rounded-full" style={{ backgroundColor: "rgba(31,2,48,0)" }} onClick={onClose} whileHover={{ backgroundColor: "rgba(31,2,48,0.06)" }} whileTap={{ scale: 0.9, backgroundColor: "rgba(31,2,48,0.14)" }} transition={{ duration: 0.12 }} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 11.1785L15.2441 16.4226L16.4226 15.2441L11.1785 10L16.4226 4.75592L15.2441 3.57741L10 8.82149L4.75592 3.57741L3.57741 4.75592L8.82149 10L3.57741 15.2441L4.75592 16.4226L10 11.1785Z" fill="#1F0230" fillOpacity="0.62" /></svg>
              </motion.button>
            </div>
            <div className="px-[20px] pb-[12px] max-h-[55vh] overflow-y-auto">
              {rows.map((row, i) => (
                <div key={i}>
                  {i > 0 && <div className="w-full h-[1px]" style={{ backgroundColor: "rgba(31,2,48,0.07)" }} />}
                  <div className="flex items-center justify-between py-[14px] gap-[12px]">
                    <span style={{ fontFamily: "'Nu_Sans_Text', sans-serif", fontWeight: row.isSavings ? 500 : 400, fontSize: "14px", color: row.isSavings ? "#1f0230" : "rgba(0,0,0,0.52)", letterSpacing: "-0.14px", flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontFamily: "'Nu_Sans_Text', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "-0.14px", color: row.isSavings ? "#2eab57" : row.isNegative ? "#c0392b" : row.highlight ? "#1f0230" : "rgba(0,0,0,0.78)", textAlign: "right", maxWidth: "60%" }}>{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-[20px] pb-[28px] pt-[8px]">
              <motion.button className="w-full h-[52px] rounded-[26px] flex items-center justify-center bg-[#820ad1]" style={{ boxShadow: "0px 2px 8px rgba(130,10,209,0.25)" }} onClick={onClose} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <span style={{ fontFamily: "'Nu_Sans_Text', sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff" }}>{closeLabel}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Edit pencil icon ──────────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667L2 11.5ZM13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C11.9867 1.93333 11.5667 1.93333 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333Z"
        fill="#820AD1"
      />
    </svg>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

export default function SuggestedScreen({
  targetValue,
  onBack,
  onSelect,
}: SuggestedScreenProps) {
  const { locale, translations } = useTranslation();
  const { rules, debtData, calculate } = useFinancialCalculator();
  const t = translations.suggested;

  const [showAllOptions, setShowAllOptions] = useState(false);
  const [showValueEditor, setShowValueEditor] = useState(false);
  const [showCalcSummary, setShowCalcSummary] = useState(false);
  const [currentTargetValue, setCurrentTargetValue] = useState(targetValue);

  // Delayed value update + pulse
  const pendingValueRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);
  const highlightControls = useAnimationControls();
  const [delayedBestMatch, setDelayedBestMatch] = useState<PlanOption | null>(null);

  // Animation phase state — sequential: base → list → highlight → faq
  const [phase, setPhase] = useState(0);
  const hasPlayedEntryPulse = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 350);
    const t2 = setTimeout(() => setPhase(2), 550);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(() => setPhase(4), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const currencyConfig = CURRENCY_CONFIGS[locale];

  const allOptions = useMemo(() => {
    const opts: PlanOption[] = [];
    for (let i = 1; i <= rules.maxInstallments; i++) {
      const result = calculate({ installments: i, downpayment: 0, totalDebt: debtData.originalBalance });
      opts.push({
        installments: i, monthlyPayment: result.monthlyPayment, savings: result.savings,
        total: result.total, downpayment: result.downpayment, hasDownpayment: result.needsDownpayment,
        totalInterest: result.totalInterest, effectiveRate: result.effectiveRate,
      });
    }
    return opts;
  }, [rules, debtData, calculate]);

  const bestMatch = useMemo(() => {
    let closest = allOptions[0];
    let minDiff = Math.abs(closest.monthlyPayment - currentTargetValue);
    for (const opt of allOptions) {
      const diff = Math.abs(opt.monthlyPayment - currentTargetValue);
      if (diff < minDiff) { minDiff = diff; closest = opt; }
    }
    return closest;
  }, [allOptions, currentTargetValue]);

  const secondaryOptions = useMemo(() => {
    const bIdx = bestMatch.installments;
    const max = rules.maxInstallments;
    const shorter = bIdx - 3 >= 1 ? bIdx - 3 : bIdx - 1 >= 1 ? bIdx - 1 : null;
    const longer  = bIdx + 3 <= max ? bIdx + 3 : bIdx + 1 <= max ? bIdx + 1 : null;
    const picks = new Set<number>();
    if (shorter !== null && shorter !== bIdx) picks.add(shorter);
    if (longer  !== null && longer  !== bIdx) picks.add(longer);
    if (picks.size < 2) {
      for (const offset of [5, 7, 2, 1]) {
        if (picks.size >= 2) break;
        const up = bIdx + offset; const down = bIdx - offset;
        if (up <= max && up !== bIdx && !picks.has(up)) picks.add(up);
        if (picks.size >= 2) break;
        if (down >= 1 && down !== bIdx && !picks.has(down)) picks.add(down);
      }
    }
    return [...picks].sort((a, b) => a - b).map((n) => allOptions[n - 1]).filter(Boolean);
  }, [allOptions, bestMatch, rules.maxInstallments]);

  useEffect(() => {
    const timer = setTimeout(() => { setDelayedBestMatch(bestMatch); }, 520);
    return () => clearTimeout(timer);
  }, [bestMatch]);

  const displayedBestMatch = delayedBestMatch ?? bestMatch;

  const handleSelect = useCallback((opt: PlanOption) => {
    setShowAllOptions(false);
    onSelect(opt);
  }, [onSelect]);

  const handleValueChange = useCallback((newValue: number) => {
    pendingValueRef.current = newValue;
  }, []);

  useEffect(() => {
    if (!showValueEditor && pendingValueRef.current !== null) {
      const pending = pendingValueRef.current;
      pendingValueRef.current = null;
      const timer = setTimeout(() => { setCurrentTargetValue(pending); }, 550);
      return () => clearTimeout(timer);
    }
  }, [showValueEditor]);

  useEffect(() => {
    if (isInitialMount.current) { isInitialMount.current = false; return; }
    const timer = setTimeout(() => {
      highlightControls.start({
        scale: [1, 1.03, 0.985, 1.01, 1],
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      });
    }, 380);
    return () => clearTimeout(timer);
  }, [currentTargetValue, highlightControls]);

  const formattedTarget = fmtCurrency(currentTargetValue, locale);
  const symbolPart = currencyConfig.symbol;
  const numberPart = formattedTarget.replace(symbolPart, "").trim();

  return (
    <div className="absolute inset-0 bg-white flex flex-col overflow-hidden">
      {/* ── Header ── */}
      <motion.div
        className="shrink-0 w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ScreenNavBar
          variant="back"
          onAction={onBack}
          className="mt-[44px]"
          rightAction={<InfoButton onClick={() => setShowCalcSummary(true)} />}
        />

        <div className="px-[20px] pt-[12px] pb-[20px]">
          <p
            className="text-[rgba(0,0,0,0.96)] text-[36px] tracking-[-1.08px] whitespace-pre-wrap"
            style={{ fontFamily: tokens.fonts.graphik, fontWeight: 500, lineHeight: 1.1 }}
          >
            {t.title}
          </p>
        </div>
      </motion.div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Money display — tappable to edit */}
        <motion.div
          className="px-[24px] pt-[24px] pb-[0px]"
          initial={{ opacity: 0, y: 12 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <button
            className="flex flex-col gap-[12px] w-full text-left cursor-pointer group"
            onClick={() => setShowValueEditor(true)}
          >
            <div className="flex gap-[12px] items-center overflow-clip">
              <span className="text-[28px] text-[rgba(0,0,0,0.64)] tracking-[-0.84px]" style={{ fontFamily: tokens.fonts.graphik, fontWeight: 500, lineHeight: 1.2 }}>
                {symbolPart}
              </span>
              <RouletteValue
                value={numberPart}
                className="text-[28px] text-[rgba(0,0,0,0.96)] tracking-[-0.84px]"
                style={{ fontFamily: tokens.fonts.graphik, fontWeight: 500, lineHeight: 1.2 }}
              />
              <div className="opacity-50 group-hover:opacity-100 transition-opacity ml-[2px]">
                <EditIcon />
              </div>
            </div>
            <div className="flex gap-[16px] items-center py-[8px]">
              <span className="text-[14px] text-[rgba(0,0,0,0.64)] flex-1" style={{ fontFamily: tokens.fonts.nuSans, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                {t.targetLabel}
              </span>
            </div>
          </button>
        </motion.div>

        {/* ── Best match (highlighted) ── */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              className="py-[12px] flex flex-col items-center px-[24px]"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              onAnimationComplete={() => {
                if (!hasPlayedEntryPulse.current) {
                  hasPlayedEntryPulse.current = true;
                  highlightControls.start({
                    scale: [1, 1.025, 0.995, 1],
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  });
                }
              }}
            >
              <motion.div className="w-full" animate={highlightControls} style={{ originX: 0.5, originY: 0.5 }}>
              <div className="relative rounded-[24px] w-full" style={{ boxShadow: "0 1px 1px rgba(31, 0, 47, 0.08)" }}>
                <div className="flex flex-col overflow-clip rounded-[inherit]">
                  <button className="bg-[#f6ecff] relative w-full text-left cursor-pointer" onClick={() => handleSelect(displayedBestMatch)}>
                    <div className="flex gap-[12px] items-center p-[16px]">
                      <div className="flex-1 flex flex-col gap-[4px] min-w-0">
                        <p className="text-[#1f002f] text-[14px]" style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                          {displayedBestMatch.installments === 1
                            ? renderWithRoulette(t.installmentOf, { amount: fmtCurrency(displayedBestMatch.monthlyPayment, locale) })
                            : renderWithRoulette(t.installmentsOf, { count: String(displayedBestMatch.installments), amount: fmtCurrency(displayedBestMatch.monthlyPayment, locale) })}
                        </p>
                        <div className="text-[12px]" style={{ fontFamily: tokens.fonts.graphik, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                          {displayedBestMatch.savings > 0.5 && (
                            <p className="text-[#0c7a3a] mb-0">
                              {renderWithRoulette(t.discountAmount, { amount: fmtCurrency(displayedBestMatch.savings, locale) })}
                            </p>
                          )}
                          <p className="text-[#1f0230]">
                            {displayedBestMatch.hasDownpayment && displayedBestMatch.downpayment > 0
                              ? renderWithRoulette(t.downpaymentOf, { amount: fmtCurrency(displayedBestMatch.downpayment, locale) })
                              : t.noDownpayment}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex flex-col items-end max-w-[144px]">
                        <div className="bg-[#ecd9ff] flex items-center justify-center px-[8px] py-[2px] rounded-[8px]">
                          <span className="text-[#820ad1] text-[12px] text-center tracking-[0.12px] whitespace-nowrap" style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                            {t.bestMatchBadge}
                          </span>
                        </div>
                      </div>
                      <ChevronRight />
                    </div>
                  </button>
                </div>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Secondary options + More options ── */}
        <motion.div
          className="py-[12px] flex flex-col items-center px-[24px]"
          layout="position"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="relative rounded-[24px] w-full">
            <div className="flex flex-col overflow-clip rounded-[inherit]">
              {secondaryOptions.map((opt, idx) => (
                <motion.button
                  key={`secondary-${idx}`}
                  className="bg-white relative w-full text-left cursor-pointer"
                  onClick={() => handleSelect(opt)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex gap-[12px] items-center p-[16px]">
                    <div className="flex-1 flex flex-col gap-[4px] min-w-0">
                      <p className="text-[#1f002f] text-[14px]" style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                        {renderWithRoulette(t.installmentsOf, { count: String(opt.installments), amount: fmtCurrency(opt.monthlyPayment, locale) })}
                      </p>
                      <div className="text-[14px]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                        {opt.savings > 0.5 && (
                          <p className="text-[#0c7a3a] mb-0" style={{ fontFamily: tokens.fonts.graphik, lineHeight: 1.3 }}>
                            {renderWithRoulette(t.discountAmount, { amount: fmtCurrency(opt.savings, locale) })}
                          </p>
                        )}
                        <p className="text-[rgba(0,0,0,0.64)]" style={{ fontFamily: tokens.fonts.graphik, lineHeight: 1.3 }}>
                          {opt.hasDownpayment && opt.downpayment > 0
                            ? renderWithRoulette(t.downpaymentOf, { amount: fmtCurrency(opt.downpayment, locale) })
                            : t.noDownpayment}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0" />
                    <ChevronRight />
                  </div>
                  <Divider />
                </motion.button>
              ))}

              <motion.button
                className="bg-white relative w-full text-left cursor-pointer"
                onClick={() => setShowAllOptions(true)}
                initial={{ opacity: 0, y: 8 }}
                animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: secondaryOptions.length * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex gap-[12px] items-center p-[16px]">
                  <div className="flex-1 flex flex-col gap-[4px] min-w-0">
                    <p className="text-[14px] text-[rgba(0,0,0,0.64)]" style={{ fontFamily: tokens.fonts.nuSans, fontWeight: 600, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                      {t.moreOptions}
                    </p>
                    <p className="text-[12px] text-[rgba(31,0,47,0.6)] tracking-[0.12px]" style={{ fontFamily: tokens.fonts.nuSans, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                      {t.moreOptionsSubtitle.replace("{max}", String(rules.maxInstallments))}
                    </p>
                  </div>
                  <div className="shrink-0" />
                  <ChevronRight />
                </div>
                <Divider />
              </motion.button>
            </div>
            <div aria-hidden className="absolute border border-[#efefef] inset-[-1px] pointer-events-none rounded-[25px]" />
          </div>
        </motion.div>

        {/* ── FAQ banner ── */}
        <motion.div
          className="px-[24px] py-[24px]"
          layout="position"
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="bg-[#efefef] rounded-[24px] overflow-hidden">
            <div className="flex items-center justify-between p-[16px]">
              <div className="flex-1 max-w-[209px]">
                <p className="text-[rgba(0,0,0,0.96)] text-[16px] tracking-[-0.16px]" style={{ fontFamily: tokens.fonts.graphik, fontWeight: 500, lineHeight: 1.3, fontFeatureSettings: "'lnum', 'tnum'" }}>
                  {t.faqTitle}
                </p>
              </div>
              <FaqIcon />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom sheets ── */}
      <AllOptionsSheet
        isOpen={showAllOptions}
        onClose={() => setShowAllOptions(false)}
        options={allOptions}
        onSelect={handleSelect}
        locale={locale}
        sheetTitle={t.sheetTitle}
        t={t}
      />

      <ValueEditorSheet
        isOpen={showValueEditor}
        onClose={() => setShowValueEditor(false)}
        value={currentTargetValue}
        onValueChange={handleValueChange}
        locale={locale}
        title={t.editValueTitle}
        confirmLabel={t.confirm}
      />

      <CalcSummarySheet
        isOpen={showCalcSummary}
        onClose={() => setShowCalcSummary(false)}
        plan={displayedBestMatch}
        locale={locale}
        title={t.infoSheetTitle}
        closeLabel={translations.common.close}
        originalDebt={debtData.originalBalance}
        taxLabel={rules.taxLabel}
      />
    </div>
  );
}