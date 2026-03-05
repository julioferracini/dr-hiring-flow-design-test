/**
 * Screen Transition Config
 * Declarative map of which transition each screen uses.
 * Change a screen's transition by editing one line here.
 */

import type { TransitionType } from "./presets";

type ScreenType =
  | "flowSelector"
  | "languageSelector"
  | "initialLoading"
  | "offerhub"
  | "installment"
  | "simulation"
  | "suggested"
  | "dueDate"
  | "summary"
  | "terms"
  | "loading"
  | "feedback"
  | "success";

export const screenTransitions: Record<ScreenType, TransitionType> = {
  flowSelector: "fade",
  languageSelector: "slide",
  initialLoading: "fade",
  offerhub: "fade",
  installment: "slide",
  simulation: "slide",
  suggested: "slide",
  dueDate: "slide",
  summary: "slide",
  terms: "slide",
  loading: "slide",
  feedback: "slide",
  success: "slide",
};
