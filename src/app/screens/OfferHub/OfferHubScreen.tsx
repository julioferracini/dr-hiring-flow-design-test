import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import OfferBox from "../../components/OfferBox";
import RouletteNumber from "../../components/RouletteNumber";
import PulseDiscount from "../../components/PulseDiscount";
import svgPaths from "../../../imports/svg-46afikd1dx";
import { tokens } from "../../constants";
import { useTranslation } from "../../i18n/context";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import { useOfferEngine } from "../../hooks/useOfferEngine";
import { CURRENCY_CONFIGS, EXAMPLE_VALUES } from "../../constants/currencies";

type TabType = "all" | "credit" | "loans";

interface OfferHubScreenProps {
  onClose: () => void;
  onOfferSelect: (offerType: string) => void;
}

function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <path
          d={svgPaths.p15d88280}
          fill="#1F0230"
          fillOpacity="0.62"
        />
      </svg>
    </div>
  );
}

export default function OfferHubScreen({
  onClose,
  onOfferSelect,
}: OfferHubScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const { offerCash, offerShort, offerLong, clientData } = useOfferEngine();
  const debtData = EXAMPLE_VALUES[locale];

  // ─── Formatação local (sem conversão USD) — valores já em moeda local ─────
  const formatLocal = useMemo(() => {
    const config = CURRENCY_CONFIGS[locale];
    return (num: number): string => {
      const absValue = Math.abs(num);
      const integerPart = Math.floor(absValue);
      const decimalPart = Math.round(
        (absValue - integerPart) * Math.pow(10, config.decimalPlaces)
      );
      const integerStr = integerPart
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
      const decimalStr = decimalPart
        .toString()
        .padStart(config.decimalPlaces, "0");
      const numberStr = `${integerStr}${config.decimalSeparator}${decimalStr}`;
      const space = config.spaceAfterSymbol ? " " : "";
      return `${config.symbol}${space}${numberStr}`;
    };
  }, [locale]);

  // ─── Dados derivados do Offer Engine por tab ──────────────────────────────
  const currentData = useMemo(() => {
    const totalDebt = clientData.total_debt;
    const ccBalance = debtData.ccBalance;
    const loanBalance = debtData.loanBalance;

    // Ratios for sub-product tabs
    const ccRatio = totalDebt > 0 ? ccBalance / totalDebt : 0.5;
    const loanRatio = totalDebt > 0 ? loanBalance / totalDebt : 0.5;

    // Helper to round to 2 decimals
    const r2 = (n: number) => Math.round(n * 100) / 100;

    if (activeTab === "all") {
      const originalBalance = totalDebt;
      const cashPrice = offerCash.payment_once ?? offerCash.base_amount;
      const discountAmount = r2(originalBalance - cashPrice);
      // Max savings from the installment offers
      const shortSavings = offerShort.original_debt - offerShort.total_paid;
      const longSavings = offerLong.original_debt - offerLong.total_paid;
      const maxInstallmentSavings = r2(Math.max(shortSavings, longSavings, 0));
      // Lowest monthly from the long offer
      const lowestMonthly = offerLong.monthly_payment ?? offerShort.monthly_payment ?? 0;

      return {
        totalBalance: formatLocal(cashPrice),
        originalBalance: formatLocal(originalBalance),
        discount: t("offerHub.discount", { amount: formatLocal(discountAmount) }),
        offers: [
          {
            id: "all-monthly",
            variant: "highlighted" as const,
            badge: t("offerHub.badge"),
            badgeColor: "purple" as const,
            title: t("offerHub.offerSolveAllMonthly"),
            paymentInfo: t("offerHub.firstPaymentFrom", {
              amount: formatLocal(r2(lowestMonthly)),
            }),
            benefitText: t("offerHub.upToAmount", {
              amount: formatLocal(maxInstallmentSavings > 0 ? maxInstallmentSavings : discountAmount),
            }),
            benefitColor: "green" as const,
            buttonText: t("offerHub.cta"),
            flowType: "simulation",
          },
          {
            id: "all-now",
            variant: "normal" as const,
            badge: undefined,
            badgeColor: "purple" as const,
            title: t("offerHub.offerSolveAllNow"),
            paymentInfo: t("offerHub.payOnlyAmount", {
              amount: formatLocal(cashPrice),
            }),
            benefitText: t("offerHub.discount", {
              amount: formatLocal(discountAmount),
            }),
            benefitColor: "green" as const,
            buttonText: t("offerHub.payButton"),
            flowType: "duedate",
          },
        ],
      };
    }

    if (activeTab === "credit") {
      const originalBalance = r2(ccBalance);
      const cashPrice = r2(ccBalance * (1 - offerCash.discount_percent));
      const discountAmount = r2(originalBalance - cashPrice);
      const shortMonthly = offerShort.monthly_payment
        ? r2(offerShort.monthly_payment * ccRatio)
        : 0;

      return {
        totalBalance: formatLocal(cashPrice),
        originalBalance: formatLocal(originalBalance),
        discount: t("offerHub.discount", { amount: formatLocal(discountAmount) }),
        offers: [
          {
            id: "credit-consolidate",
            variant: "highlighted" as const,
            badge: t("offerHub.badgeMonthlyPayments"),
            badgeColor: "purple" as const,
            title: t("offerHub.offerConsolidateDebts"),
            paymentInfo: t("offerHub.firstPaymentFrom", {
              amount: formatLocal(shortMonthly),
            }),
            benefitText: t("offerHub.upToAmount", {
              amount: formatLocal(discountAmount),
            }),
            benefitColor: "green" as const,
            buttonText: t("offerHub.cta"),
            flowType: "simulation",
          },
          {
            id: "credit-finance",
            variant: "normal" as const,
            badge: undefined,
            badgeColor: "purple" as const,
            title: t("offerHub.offerFinanceCurrentBill"),
            paymentInfo: t("offerHub.firstPaymentFrom", {
              amount: formatLocal(cashPrice),
            }),
            benefitText: t("offerHub.stayUpToDate"),
            benefitColor: "green" as const,
            buttonText: t("offerHub.checkDetailsButton"),
            flowType: "simulation",
          },
          {
            id: "credit-pay",
            variant: "normal" as const,
            badge: undefined,
            badgeColor: "purple" as const,
            title: t("offerHub.offerPayCurrentBill"),
            paymentInfo: t("offerHub.currentBalanceAmount", {
              amount: formatLocal(originalBalance),
            }),
            benefitText: t("offerHub.stayUpToDate"),
            benefitColor: "green" as const,
            buttonText: t("offerHub.payButton"),
            flowType: "duedate",
          },
        ],
      };
    }

    // loans tab
    const originalBalance = r2(loanBalance);
    const cashPrice = r2(loanBalance * (1 - offerCash.discount_percent));
    const discountAmount = r2(originalBalance - cashPrice);
    const shortMonthly = offerShort.monthly_payment
      ? r2(offerShort.monthly_payment * loanRatio)
      : 0;

    return {
      totalBalance: formatLocal(cashPrice),
      originalBalance: formatLocal(originalBalance),
      discount: t("offerHub.discount", { amount: formatLocal(discountAmount) }),
      offers: [
        {
          id: "loan-renegotiate",
          variant: "highlighted" as const,
          badge: t("offerHub.badgeBestDiscount"),
          badgeColor: "purple" as const,
          title: t("offerHub.offerPayLateLoan"),
          paymentInfo: t("offerHub.payAmount", {
            amount: formatLocal(shortMonthly),
          }),
          benefitText: t("offerHub.upToAmount", {
            amount: formatLocal(discountAmount),
          }),
          benefitColor: "green" as const,
          buttonText: t("offerHub.payButton"),
          flowType: "simulation",
        },
        {
          id: "loan-installments",
          variant: "normal" as const,
          badge: undefined,
          badgeColor: "purple" as const,
          title: t("offerHub.offerPayLateInstallments"),
          paymentInfo: t("offerHub.payAmount", {
            amount: formatLocal(r2(loanBalance * 0.15)),
          }),
          benefitText: t("offerHub.stayUpToDate"),
          benefitColor: "green" as const,
          buttonText: t("offerHub.payButton"),
          flowType: "duedate",
        },
      ],
    };
  }, [activeTab, t, locale, formatLocal, clientData, offerCash, offerShort, offerLong, debtData]);

  // Reset scroll to top when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  const handleOfferClick = (_offerId: string, flowType: string) => {
    onOfferSelect(flowType);
  };

  return (
    <div className="absolute inset-0 bg-white overflow-hidden">
      {/* Header */}
      <div className="absolute bg-[rgba(255,255,255,0.64)] backdrop-blur-md content-stretch flex flex-col items-center left-0 top-0 w-full z-10 right-0">
        {/* Status Bar */}
        <div className="h-[44px] relative w-full">
          <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] relative size-full">
            <div className="flex flex-col font-sf-pro font-semibold justify-center leading-[0] not-italic relative text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap">
              <p className="leading-[20px]">09:07</p>
            </div>
          </div>
        </div>

        {/* Top Bar */}
        <div className="h-[64px] relative w-full">
          <ScreenNavBar
            variant="close"
            onAction={onClose}
            title={t("offerHub.title")}
          />
        </div>
      </div>

      {/* Fixed Segmented Control */}
      <div className="absolute left-0 right-0 top-[108px] z-20 bg-[rgba(255,255,255,0.64)] backdrop-blur-md px-[24px] pt-[16px] pb-[12px]">
        <div className="bg-[#f8f6f8] h-[48px] relative rounded-[64px] w-full">
          <div className="flex flex-row items-center overflow-x-auto overflow-y-clip size-full">
            <div className="content-stretch flex items-center p-[2px] relative size-full">
              {/* Animated Background */}
              <motion.div
                className="absolute bg-white h-[44px] rounded-[999px] shadow-[inset_0px_-1px_0px_0px_rgba(31,0,47,0.1),inset_0px_0px_0px_1px_rgba(31,0,47,0.02)]"
                layout
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                style={{
                  left: activeTab === "all" ? "2px" : activeTab === "credit" ? "calc(33.333% + 0.666px)" : "calc(66.666% + 1.333px)",
                  width: "calc(33.333% - 1.333px)",
                }}
              />

              {/* All debts */}
              <button className="flex-[1_0_0] h-[44px] relative z-10" onClick={() => setActiveTab("all")}>
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center px-[16px] relative size-full">
                    <p
                      className={`font-semibold text-[12px] text-center whitespace-nowrap transition-colors duration-200 ${
                        activeTab === "all" ? "text-[#820ad1]" : "text-[rgba(31,2,48,0.62)]"
                      }`}
                      style={{ fontFamily: tokens.fonts.nuSans }}
                    >
                      {t("offerHub.tabs.all")}
                    </p>
                  </div>
                </div>
              </button>

              {/* Credit card */}
              <button className="flex-[1_0_0] h-[44px] relative z-10" onClick={() => setActiveTab("credit")}>
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center px-[16px] relative size-full">
                    <p
                      className={`font-semibold text-[12px] text-center whitespace-nowrap transition-colors duration-200 ${
                        activeTab === "credit" ? "text-[#820ad1]" : "text-[rgba(31,2,48,0.62)]"
                      }`}
                      style={{ fontFamily: tokens.fonts.nuSans }}
                    >
                      {t("offerHub.tabs.credit")}
                    </p>
                  </div>
                </div>
              </button>

              {/* Loans */}
              <button className="flex-[1_0_0] h-[44px] relative z-10" onClick={() => setActiveTab("loans")}>
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center px-[16px] relative size-full">
                    <p
                      className={`font-semibold text-[12px] text-center whitespace-nowrap transition-colors duration-200 ${
                        activeTab === "loans" ? "text-[#820ad1]" : "text-[rgba(31,2,48,0.62)]"
                      }`}
                      style={{ fontFamily: tokens.fonts.nuSans }}
                    >
                      {t("offerHub.tabs.loans")}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 overflow-y-auto pt-[184px] pb-[16px]"
      >
        <div className="content-stretch flex flex-col gap-[16px] items-center px-[24px] w-full">
          {/* Main Values with Roulette Animation */}
          <div className="content-stretch flex flex-col items-center overflow-x-auto overflow-y-clip py-[12px] relative w-full">
            <div className="content-stretch flex items-start justify-center relative w-full">
              <div className="content-stretch flex flex-col items-center relative w-full">
                <div className="content-stretch flex flex-col items-center relative">
                  <p
                    className="font-normal text-[16px] text-[rgba(31,2,48,0.62)] text-center leading-[1.3] whitespace-pre-wrap"
                    style={{ fontFamily: tokens.fonts.nuSans }}
                  >
                    {t("offerHub.totalBalance")}
                  </p>

                  {/* Original Balance — locale-aware "from X to:" */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`original-${currentData.originalBalance}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="font-normal text-[12px] text-[rgba(31,2,48,0.62)] text-center tracking-[0.12px] leading-[1.3]"
                      style={{ fontFeatureSettings: "'tnum'", fontFamily: tokens.fonts.nuSans }}
                    >
                      <span>{t("offerHub.balanceFrom")} </span>
                      <span
                        className="line-through"
                        style={{ fontFeatureSettings: "'tnum'", fontFamily: tokens.fonts.graphik }}
                      >
                        {currentData.originalBalance}
                      </span>
                      <span> {t("offerHub.balanceTo")}</span>
                    </motion.p>
                  </AnimatePresence>

                  {/* Animated Total Balance with Roulette */}
                  <div className="content-stretch flex flex-col gap-[10px] items-center px-[20px] py-[7px] relative w-full">
                    <div className="flex flex-col font-nu-display font-medium justify-center leading-[0] not-italic relative text-[#1f0230] text-[36px] text-center whitespace-nowrap">
                      <p className="leading-[1.1]" style={{ fontFeatureSettings: "'lnum', 'pnum'" }}>
                        <RouletteNumber value={currentData.totalBalance} delay={0} />
                      </p>
                    </div>

                    {/* Discount Badge */}
                    <PulseDiscount discount={currentData.discount} delay={150} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Boxes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`offers-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="content-stretch flex flex-col gap-[16px] items-center w-full"
            >
              {currentData.offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="w-full"
                >
                  <OfferBox
                    variant={offer.variant}
                    badge={offer.badge}
                    badgeColor={offer.badgeColor}
                    title={offer.title}
                    paymentInfo={offer.paymentInfo}
                    benefitText={offer.benefitText}
                    benefitColor={offer.benefitColor}
                    buttonText={offer.buttonText}
                    onButtonClick={() => handleOfferClick(offer.id, offer.flowType)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}