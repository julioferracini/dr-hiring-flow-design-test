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
import { ScreenTransition, screenTransitions } from "./transitions";
import type { Locale } from "./i18n/types";

type ScreenType = "flowSelector" | "languageSelector" | "initialLoading" | "offerhub" | "installment" | "simulation" | "suggested" | "dueDate" | "summary" | "terms" | "loading" | "feedback" | "success";

const VALID_LOCALES: Record<string, Locale> = {
  "pt-br": "pt-BR", "pt": "pt-BR",
  "es-mx": "es-MX", "es": "es-MX",
  "en-us": "en-US", "en": "en-US",
};

interface RouteInfo {
  flow: "A" | "B" | null;
  useCase: string | null;
  lang: Locale | null;
}

function parseRoute(): RouteInfo {
  const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
  const params = new URLSearchParams(window.location.search);

  let flow: "A" | "B" | null = null;
  let useCase: string | null = null;

  if (path === "/flowa" || path === "/flow-a" || path.startsWith("/flowa/") || path.startsWith("/flow-a/")) flow = "A";
  else if (path === "/flowb" || path === "/flow-b" || path.startsWith("/flowb/") || path.startsWith("/flow-b/")) flow = "B";
  else if (path.startsWith("/usecase/")) useCase = path.replace("/usecase/", "");

  const langParam = params.get("lang")?.toLowerCase() ?? "";
  const lang = VALID_LOCALES[langParam] ?? null;

  return { flow, useCase, lang };
}

const SCREEN_PATHS: Record<ScreenType, string> = {
  flowSelector: "",
  languageSelector: "/language",
  initialLoading: "/loading",
  offerhub: "/offer-hub",
  simulation: "/simulation",
  suggested: "/suggested",
  installment: "/installment-value",
  dueDate: "/due-date",
  summary: "/summary",
  terms: "/terms",
  loading: "/loading",
  feedback: "/feedback",
  success: "/success",
};

function AppContent() {
  const { setLocale, locale } = useTranslation();
  const routeApplied = useRef(false);
  const enteredViaDeepLink = useRef(false);

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

    const { flow, useCase, lang } = parseRoute();

    // Use case routes — reserved for future activation
    // When a use case is activated, add its screen flow here.
    if (useCase) {
      // For now, stay on FlowSelector (use cases are "soon")
      return;
    }

    if (!flow) return;

    enteredViaDeepLink.current = true;
    setActiveFlow(flow);

    if (lang) {
      setLocale(lang);
      setCurrentScreen("initialLoading");
    } else {
      setDirection("forward");
      setCurrentScreen("languageSelector");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Maze / analytics: keep URL in sync with current screen ──
  useEffect(() => {
    if (!routeApplied.current) return;

    if (currentScreen === "flowSelector") {
      window.history.replaceState(null, "", "/");
      return;
    }
    if (currentScreen === "languageSelector") {
      window.history.replaceState(null, "", `/flow${activeFlow}`);
      return;
    }
    const screenPath = SCREEN_PATHS[currentScreen] ?? "";
    const url = `/flow${activeFlow}${screenPath}?lang=${locale}`;
    window.history.replaceState(null, "", url);
  }, [currentScreen, activeFlow, locale]);

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
    window.history.replaceState(null, "", `/flow${activeFlow}?lang=${locale}`);
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
    enteredViaDeepLink.current = false;
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

  const safeAreaBg = (currentScreen === "flowSelector" || currentScreen === "languageSelector") ? "#820AD1" : "#ffffff";

  return (
    <div className="size-full flex items-center justify-center bg-gray-100">
      <div className="w-full h-full md:w-[375px] md:h-[812px] md:rounded-[32px] md:shadow-2xl relative overflow-hidden bg-white">
        <div
          className="absolute top-0 left-0 right-0 app-safe-fill transition-colors duration-300"
          style={{ backgroundColor: safeAreaBg }}
        />
        <div className="absolute left-0 right-0 bottom-0 app-safe-top">
        <AnimatePresence initial={false} custom={direction}>
          {currentScreen === "flowSelector" && (
            <ScreenTransition type={screenTransitions.flowSelector} screenKey="flowSelector" direction={direction}>
              <FlowSelectorScreen
                onSelectFlow={(flow) => {
                  setActiveFlow(flow);
                  window.history.replaceState(null, "", `/flow${flow}`);
                  setDirection("forward");
                  setCurrentScreen("languageSelector");
                }}
              />
            </ScreenTransition>
          )}

          {currentScreen === "languageSelector" && (
            <ScreenTransition type={screenTransitions.languageSelector} screenKey="languageSelector" direction={direction}>
              <LanguageSelector
                onSelectLanguage={handleLanguageSelect}
                onBack={enteredViaDeepLink.current ? undefined : () => {
                  window.history.replaceState(null, "", "/");
                  setDirection("backward");
                  setCurrentScreen("flowSelector");
                }}
              />
            </ScreenTransition>
          )}

          {currentScreen === "initialLoading" && (
            <ScreenTransition type={screenTransitions.initialLoading} screenKey="initialLoading" direction={direction} className="absolute inset-0 bg-white flex items-center justify-center">
              <motion.div
                className="w-8 h-8 rounded-full border-4 border-t-transparent"
                style={{ borderColor: `${colors.primary.purple} transparent ${colors.primary.purple} ${colors.primary.purple}` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </ScreenTransition>
          )}

          {currentScreen === "offerhub" && (
            <ScreenTransition type={screenTransitions.offerhub} screenKey="offerhub" direction={direction} className="absolute inset-0">
              <OfferHubScreen onClose={handleOfferHubClose} onOfferSelect={handleOfferSelect} />
            </ScreenTransition>
          )}

          {currentScreen === "installment" && (
            <ScreenTransition type={screenTransitions.installment} screenKey="installment" direction={direction}>
              <InstallmentValueScreen
                onComplete={handleInstallmentComplete}
                onBack={navigateBack}
              />
            </ScreenTransition>
          )}

          {currentScreen === "simulation" && (
            <ScreenTransition type={screenTransitions.simulation} screenKey="simulation" direction={direction}>
              <SimulationScreen
                initialInstallments={initialInstallments}
                initialDownpayment={simulationData.downpayment > 0 ? simulationData.downpayment : undefined}
                initialDownpaymentFixed={simulationData.downpaymentFixed || undefined}
                onBack={navigateBack}
                onContinue={handleSimulationContinue}
              />
            </ScreenTransition>
          )}

          {currentScreen === "suggested" && (
            <ScreenTransition type={screenTransitions.suggested} screenKey="suggested" direction={direction}>
              <SuggestedScreen
                targetValue={targetMonthlyValue}
                onBack={navigateBack}
                onSelect={handleSuggestedSelect}
              />
            </ScreenTransition>
          )}

          {currentScreen === "dueDate" && (
            <ScreenTransition type={screenTransitions.dueDate} screenKey="dueDate" direction={direction}>
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
            </ScreenTransition>
          )}

          {currentScreen === "summary" && (
            <ScreenTransition type={screenTransitions.summary} screenKey="summary" direction={direction}>
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
            </ScreenTransition>
          )}

          {currentScreen === "terms" && (
            <ScreenTransition type={screenTransitions.terms} screenKey="terms" direction={direction}>
              <TermsConditionsScreen
                onBack={navigateBack}
                onConfirm={handleTermsConfirm}
              />
              {showPin && (
                <div className="absolute inset-0 z-40">
                  <PinScreen onComplete={handlePinComplete} onClose={handlePinClose} />
                </div>
              )}
            </ScreenTransition>
          )}

          {currentScreen === "loading" && (
            <ScreenTransition type={screenTransitions.loading} screenKey="loading" direction={direction}>
              <LoadingScreen onComplete={handleLoadingComplete} />
            </ScreenTransition>
          )}

          {currentScreen === "feedback" && (
            <ScreenTransition type={screenTransitions.feedback} screenKey="feedback" direction={direction}>
              <FeedbackScreen
                onMakePayment={handleRestartPrototype}
                onDoLater={handleRestartPrototype}
                onClose={handleRestartPrototype}
              />
            </ScreenTransition>
          )}

          {currentScreen === "success" && (
            <ScreenTransition type={screenTransitions.success} screenKey="success" direction={direction}>
              <SuccessScreen />
            </ScreenTransition>
          )}
        </AnimatePresence>
        </div>
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