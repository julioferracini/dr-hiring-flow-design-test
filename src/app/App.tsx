import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SimulationScreen, SuggestedScreen, InstallmentValueScreen, DueDateScreen, SummaryScreen, TermsConditionsScreen, SuccessScreen } from "./screens";
import PinScreen from "./screens/Pin/PinScreen";
import LoadingScreen from "./screens/Loading/LoadingScreen";
import FeedbackScreen from "./screens/Feedback/FeedbackScreen";
import OfferHubScreen from "./screens/OfferHub/OfferHubScreen";
import LanguageSelector from "./screens/LanguageSelector/LanguageSelector";
import { FlowSelectorScreen } from "./screens/FlowSelector";
import { colors } from "./constants";
import { I18nProvider, useTranslation } from "./i18n/context";
import type { Locale } from "./i18n/types";

type ScreenType = "flowSelector" | "languageSelector" | "initialLoading" | "offerhub" | "installment" | "simulation" | "suggested" | "dueDate" | "summary" | "terms" | "loading" | "feedback" | "success";

const VALID_LOCALES: Record<string, Locale> = {
  "pt-br": "pt-BR", "pt": "pt-BR",
  "es-mx": "es-MX", "es": "es-MX",
  "en-us": "en-US", "en": "en-US",
};

function parseRoute(): { flow: "A" | "B" | null; lang: Locale | null } {
  const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
  const params = new URLSearchParams(window.location.search);

  let flow: "A" | "B" | null = null;
  if (path === "/flowa" || path === "/flow-a") flow = "A";
  else if (path === "/flowb" || path === "/flow-b") flow = "B";

  const langParam = params.get("lang")?.toLowerCase() ?? "";
  const lang = VALID_LOCALES[langParam] ?? null;

  return { flow, lang };
}

function AppContent() {
  const { setLocale } = useTranslation();
  const routeApplied = useRef(false);

  const [currentScreen, setCurrentScreen] = useState<ScreenType>("flowSelector");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [history, setHistory] = useState<ScreenType[]>([]);

  const [activeFlow, setActiveFlow] = useState<"A" | "B">("A");

  const [initialInstallments, setInitialInstallments] = useState(10);
  const [targetMonthlyValue, setTargetMonthlyValue] = useState(200);
  const [showPin, setShowPin] = useState(false);
  const [simulationData, setSimulationData] = useState({
    installments: 10,
    monthlyPayment: 0,
    savings: 0,
    total: 0,
    downpayment: 0,
    hasDownpayment: false,
    downpaymentFixed: false,
  });
  const [dueDate, setDueDate] = useState(new Date());

  // ── URL routing: read pathname + query params on mount ──
  useEffect(() => {
    if (routeApplied.current) return;
    routeApplied.current = true;

    const { flow, lang } = parseRoute();
    if (!flow) return;

    setActiveFlow(flow);

    if (lang) {
      setLocale(lang);
      setCurrentScreen("initialLoading");
    } else {
      setDirection("forward");
      setCurrentScreen("languageSelector");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-navigate após loading inicial
  useEffect(() => {
    if (currentScreen === "initialLoading") {
      const timer = setTimeout(() => {
        setCurrentScreen("offerhub");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLanguageSelect = (locale: Locale) => {
    setLocale(locale);
    setHistory([]);
    setCurrentScreen("initialLoading");
  };

  // ── Navegação forward — empilha tela atual no histórico
  const navigateForward = (screen: ScreenType) => {
    setHistory(prev => [...prev, currentScreen]);
    setDirection("forward");
    setCurrentScreen(screen);
  };

  // ── Navegação back — desempilha para a tela anterior real
  const navigateBack = () => {
    if (history.length === 0) return;
    const prevScreen = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setDirection("backward");
    // OfferHub tem transição especial com loading flash
    if (prevScreen === "offerhub") {
      setCurrentScreen("initialLoading");
      setTimeout(() => setCurrentScreen("offerhub"), 600);
    } else {
      setCurrentScreen(prevScreen);
    }
  };

  // ── Navegação back até tela específica (ex.: botão Edit da Summary)
  const navigateBackTo = (targetScreen: ScreenType) => {
    const idx = history.lastIndexOf(targetScreen);
    if (idx !== -1) {
      setHistory(h => h.slice(0, idx));
    } else {
      setHistory([]);
    }
    setDirection("backward");
    setCurrentScreen(targetScreen);
  };

  // ── Handlers de fluxo forward
  const handleInstallmentComplete = (installmentCount: number, rawMonetaryValue?: number) => {
    if (activeFlow === "B") {
      // Flow B: InstallmentValue → Suggested (usa valor monetário bruto)
      setTargetMonthlyValue(rawMonetaryValue ?? 200);
      navigateForward("suggested");
    } else {
      // Flow A: InstallmentValue → Simulation (usa contagem de parcelas)
      setInitialInstallments(installmentCount);
      navigateForward("simulation");
    }
  };

  const handleSimulationContinue = (data: {
    installments: number;
    monthlyPayment: number;
    savings: number;
    total: number;
    downpayment?: number;
    hasDownpayment?: boolean;
    downpaymentFixed?: boolean;
  }) => {
    setInitialInstallments(data.installments);
    setSimulationData({
      installments: data.installments,
      monthlyPayment: data.monthlyPayment,
      savings: data.savings,
      total: data.total,
      downpayment: data.downpayment || 0,
      hasDownpayment: data.hasDownpayment || false,
      downpaymentFixed: data.downpaymentFixed || false,
    });
    navigateForward("dueDate");
  };

  // ── Flow B: Suggested → DueDate (mesmo formato de dados)
  const handleSuggestedSelect = (data: {
    installments: number;
    monthlyPayment: number;
    savings: number;
    total: number;
    downpayment: number;
    hasDownpayment: boolean;
  }) => {
    setInitialInstallments(data.installments);
    setSimulationData({
      installments: data.installments,
      monthlyPayment: data.monthlyPayment,
      savings: data.savings,
      total: data.total,
      downpayment: data.downpayment,
      hasDownpayment: data.hasDownpayment,
      downpaymentFixed: false,
    });
    navigateForward("dueDate");
  };

  const handleDueDateContinue = (selectedDate: Date) => {
    setDueDate(selectedDate);
    navigateForward("summary");
  };

  const handleSummaryContinue = () => navigateForward("terms");
  const handleViewTermsFromSummary = () => navigateForward("terms");

  // Edit da Summary volta para simulation (Flow A) ou suggested (Flow B)
  const handleSummaryEdit = () => {
    if (activeFlow === "B") {
      navigateBackTo("suggested");
    } else {
      navigateBackTo("simulation");
    }
  };

  const handleTermsConfirm = () => setShowPin(true);

  const handlePinComplete = () => {
    setShowPin(false);
    navigateForward("loading");
  };

  const handlePinClose = () => setShowPin(false);

  const handleLoadingComplete = () => navigateForward("feedback");

  const handleRestartPrototype = () => {
    window.history.replaceState(null, "", "/");
    setHistory([]);
    setDirection("forward");
    setCurrentScreen("flowSelector");
    setActiveFlow("A");
    setInitialInstallments(10);
    setTargetMonthlyValue(200);
    setSimulationData({ installments: 10, monthlyPayment: 0, savings: 0, total: 0, downpayment: 0, hasDownpayment: false, downpaymentFixed: false });
    setDueDate(new Date());
  };

  const handleOfferHubClose = () => {
    window.history.replaceState(null, "", "/");
    setHistory([]);
    setCurrentScreen("flowSelector");
  };

  const handleOfferSelect = (flowType: string) => {
    if (flowType === "simulation") {
      navigateForward("installment");
    } else if (flowType === "duedate") {
      // Fluxo curto: OfferHub → DueDate (sem installment/simulation)
      setSimulationData({
        installments: 1,
        monthlyPayment: 1126.50,
        savings: 463.00,
        total: 1126.50,
        downpayment: 0,
        hasDownpayment: false,
        downpaymentFixed: false,
      });
      navigateForward("dueDate");
    }
  };

  // Variantes de transição
  const slideVariants = {
    enter: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "-100%" : "100%",
      opacity: 0
    })
  };

  const pageTransition = {
    type: "spring",
    stiffness: 260,
    damping: 26,
    mass: 0.9
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-100">
      <div className="w-full h-full md:w-[375px] md:h-[812px] md:rounded-[32px] md:shadow-2xl relative overflow-hidden bg-white">
        <AnimatePresence initial={false} custom={direction}>
          {currentScreen === "flowSelector" && (
            <motion.div key="flowSelector" className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FlowSelectorScreen
                onSelectFlow={(flow) => {
                  setActiveFlow(flow);
                  setDirection("forward");
                  setCurrentScreen("languageSelector");
                }}
              />
            </motion.div>
          )}

          {currentScreen === "languageSelector" && (
            <motion.div key="languageSelector" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <LanguageSelector
                onSelectLanguage={handleLanguageSelect}
                onBack={() => {
                  window.history.replaceState(null, "", "/");
                  setDirection("backward");
                  setCurrentScreen("flowSelector");
                }}
              />
            </motion.div>
          )}

          {currentScreen === "initialLoading" && (
            <motion.div key="initialLoading" className="absolute inset-0 bg-white flex items-center justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full border-4 border-t-transparent"
                style={{ borderColor: `${colors.primary.purple} transparent ${colors.primary.purple} ${colors.primary.purple}` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}

          {currentScreen === "offerhub" && (
            <motion.div key="offerhub" className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OfferHubScreen onClose={handleOfferHubClose} onOfferSelect={handleOfferSelect} />
            </motion.div>
          )}

          {currentScreen === "installment" && (
            <motion.div key="installment" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <InstallmentValueScreen
                onComplete={handleInstallmentComplete}
                onBack={navigateBack}
              />
            </motion.div>
          )}

          {currentScreen === "simulation" && (
            <motion.div key="simulation" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <SimulationScreen
                initialInstallments={initialInstallments}
                initialDownpayment={simulationData.downpayment > 0 ? simulationData.downpayment : undefined}
                initialDownpaymentFixed={simulationData.downpaymentFixed || undefined}
                onBack={navigateBack}
                onContinue={handleSimulationContinue}
              />
            </motion.div>
          )}

          {currentScreen === "suggested" && (
            <motion.div key="suggested" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <SuggestedScreen
                targetValue={targetMonthlyValue}
                onBack={navigateBack}
                onSelect={handleSuggestedSelect}
              />
            </motion.div>
          )}

          {currentScreen === "dueDate" && (
            <motion.div key="dueDate" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <DueDateScreen
                installments={simulationData.installments}
                monthlyPayment={simulationData.monthlyPayment}
                savings={simulationData.savings}
                total={simulationData.total}
                downpayment={simulationData.downpayment}
                hasDownpayment={simulationData.hasDownpayment}
                onBack={navigateBack}
                onContinue={handleDueDateContinue}
              />
            </motion.div>
          )}

          {currentScreen === "summary" && (
            <motion.div key="summary" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <SummaryScreen
                installments={simulationData.installments}
                monthlyPayment={simulationData.monthlyPayment}
                savings={simulationData.savings}
                total={simulationData.total}
                downpayment={simulationData.downpayment}
                hasDownpayment={simulationData.hasDownpayment}
                dueDate={dueDate}
                onBack={navigateBack}
                onContinue={handleSummaryContinue}
                onEdit={handleSummaryEdit}
                onViewTerms={handleViewTermsFromSummary}
              />
            </motion.div>
          )}

          {currentScreen === "terms" && (
            <motion.div key="terms" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <TermsConditionsScreen
                onBack={navigateBack}
                onConfirm={handleTermsConfirm}
              />
              {showPin && (
                <div className="absolute inset-0 z-40">
                  <PinScreen onComplete={handlePinComplete} onClose={handlePinClose} />
                </div>
              )}
            </motion.div>
          )}

          {currentScreen === "loading" && (
            <motion.div key="loading" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <LoadingScreen onComplete={handleLoadingComplete} />
            </motion.div>
          )}

          {currentScreen === "feedback" && (
            <motion.div key="feedback" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <FeedbackScreen
                onMakePayment={handleRestartPrototype}
                onDoLater={handleRestartPrototype}
                onClose={handleRestartPrototype}
              />
            </motion.div>
          )}

          {currentScreen === "success" && (
            <motion.div key="success" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit" transition={pageTransition}
              className="absolute inset-0 bg-white"
            >
              <SuccessScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}