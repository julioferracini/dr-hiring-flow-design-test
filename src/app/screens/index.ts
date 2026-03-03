/**
 * Screens Index
 * Central export for all application screens
 * 
 * Exporta APENAS as telas usadas no fluxo principal (App.tsx).
 * Telas placeholder (EntryPoint, DownPaymentValue, etc.) foram removidas
 * para evitar falhas na cadeia de importação.
 */

export { SimulationScreen } from './Simulation';
export { SuggestedScreen } from './Suggested';
export { InstallmentValueScreen } from './InstallmentValue';
export { DueDateScreen } from './DueDate';
export { SummaryScreen } from './Summary';
export { TermsConditionsScreen } from './TermsConditions';
export { SuccessScreen } from './Success';