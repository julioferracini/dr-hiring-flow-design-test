/**
 * i18n Type Definitions
 * Sistema de internacionalização com type-safety completo
 */

// Locales suportados
export type Locale = 'en-US' | 'pt-BR' | 'es-MX';

// Status do idioma
export type LocaleStatus = 'active' | 'soon';

// Metadados do idioma
export interface LocaleMetadata {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string; // emoji
  status: LocaleStatus;
  testLabel: string; // "Testar em [língua]" na própria língua
}

// Estrutura de tradução
export interface Translations {
  common: {
    continue: string;
    back: string;
    close: string;
    confirm: string;
    cancel: string;
    next: string;
    previous: string;
    done: string;
    skip: string;
  };
  languageSelector: {
    title: string;
    subtitle: string;
  };
  entryPoint: {
    title: string;
    subtitle: string;
    selectLanguage: string;
  };
  offerHub: {
    title: string;
    subtitle: string;
    tabs: {
      all: string;
      credit: string;
      loans: string;
    };
    totalBalance: string;
    originalBalance: string;
    savings: string;
    discount: string;
    badge: string;
    cta: string;
    lastUpdate: string;
    // Connector words for balance display
    balanceFrom: string;
    balanceTo: string;
    // Offer content — reusable patterns with {amount}
    upToAmount: string;
    firstPaymentFrom: string;
    payAmount: string;
    payOnlyAmount: string;
    currentBalanceAmount: string;
    stayUpToDate: string;
    payButton: string;
    checkDetailsButton: string;
    // Offer titles
    offerSolveAllMonthly: string;
    offerSolveAllNow: string;
    offerConsolidateDebts: string;
    offerFinanceCurrentBill: string;
    offerPayCurrentBill: string;
    offerPayLateLoan: string;
    offerPayLateInstallments: string;
    // Extra badges
    badgeMonthlyPayments: string;
    badgeBestDiscount: string;
  };
  simulation: {
    title: string;
    subtitle: string;
    installments: string;
    installmentsCount: string;
    monthlyPayment: string;
    totalSavings: string;
    total: string;
    downPayment: string;
    downPaymentRequired: string;
    downPaymentRequiredMessage: string;
    downPaymentMinimum: string;
    downPaymentMaximum: string;
    keepForAllInstallments: string;
    keepForAllInstallmentsSubtitle: string;
    sliderMoreDiscount: string;
    sliderMoreTime: string;
    rangeLabel: string;
    rangeDownPayment: string;
    continue: string;
    gotIt: string;
    confirm: string;
    close: string;
  };
  suggested: {
    title: string;
    targetLabel: string;
    bestMatchBadge: string;
    installmentsOf: string;
    installmentOf: string;
    discountAmount: string;
    totalLabel: string;
    noDownpayment: string;
    downpaymentOf: string;
    moreOptions: string;
    moreOptionsSubtitle: string;
    faqTitle: string;
    sheetTitle: string;
    editValueTitle: string;
    confirm: string;
    infoSheetTitle: string;
  };
  installmentValue: {
    title: string;
    subtitle: string;
    monthlyPayment: string;
    installments: string;
    totalAmount: string;
    savings: string;
    continue: string;
    // Input screen keys
    heading: string;
    clearButton: string;
    tips: string[];
    loadingText: string;
    simulateWith: string;
    simulate: string;
    minimumError: string;
  };
  dueDate: {
    title: string;
    subtitle: string;
    selectDate: string;
    continue: string;
    // Extended keys
    heading: string;
    paymentScheduleInfo: string;
    sectionTitle: string;
    otherDates: string;
    downpayment: string;
    installmentsOf: string;
    amountOff: string;
    totalAmount: string;
    // Calendar keys
    calendarTitle: string;
    calendarInfo: string;
    calendarSelectDate: string;
  };
  downPaymentValue: {
    title: string;
    subtitle: string;
    amount: string;
    percentage: string;
    minimum: string;
    maximum: string;
    continue: string;
  };
  downPaymentDate: {
    title: string;
    subtitle: string;
    selectDate: string;
    continue: string;
  };
  summary: {
    title: string;
    subtitle: string;
    downPayment: string;
    downPaymentDate: string;
    monthlyPayment: string;
    installments: string;
    firstDueDate: string;
    totalAmount: string;
    totalSavings: string;
    confirm: string;
    // Keys missing from original type — added in i18n audit
    yourMonthlyPayment: string;
    totalDiscount: string;
    renegotiationNote: string;
    sectionPaymentPlan: string;
    changeButton: string;
    numberOfInstallments: string;
    installmentAmount: string;
    paymentAmount: string;
    downpaymentDueDate: string;
    firstInstallmentDate: string;
    monthlyPaymentDate: string;
    everyDay: string;
    sectionBillingDetails: string;
    totalAmountFinanced: string;
    totalInterest: string;
    monthlyInterest: string;
    totalAmountToPay: string;
    // Bottom bar note
    confirmNote: string;
    termsLinkText: string;
  };
  terms: {
    title: string;
    subtitle: string;
    accept: string;
    decline: string;
    readAll: string;
    heading: string;
    bodySubtitle: string;
    confirmButton: string;
    paragraphs: Array<{ bold?: boolean; text: string }>;
  };
  pin: {
    title: string;
    subtitle: string;
    confirm: string;
  };
  loading: {
    title: string;
    subtitle: string;
    processing: string;
    step1: string;
    step2: string;
  };
  success: {
    title: string;
    subtitle: string;
    message: string;
    done: string;
  };
  feedback: {
    title: string;
    subtitle: string;
    question: string;
    optionGood: string;
    optionBad: string;
    submit: string;
    headline1: string;
    headline2: string;
    body1: string;
    body2: string;
    makePayment: string;
    doLater: string;
  };
  errors: {
    generic: string;
    network: string;
    invalidAmount: string;
    invalidDate: string;
    required: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
  dates: {
    today: string;
    tomorrow: string;
    yesterday: string;
    monthShort: string[];
    monthLong: string[];
    dayShort: string[];
    dayLong: string[];
    weekdayInitial: string[];
  };
}

// Context value
export interface I18nContextValue {
  locale: Locale;
  translations: Translations;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  formatCurrency: (value: number, options?: CurrencyFormatOptions) => string;
  formatDate: (date: Date, format?: DateFormat) => string;
}

// Opções de formatação de moeda
export interface CurrencyFormatOptions {
  showSymbol?: boolean;
  showCode?: boolean;
  decimalPlaces?: number;
}

// Formatos de data
export type DateFormat = 'short' | 'medium' | 'long' | 'full';

// Storage key
export const LOCALE_STORAGE_KEY = 'debt-resolution-locale';