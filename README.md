# Debt Resolution Prototype

> Interactive mobile prototype for debt renegotiation flows, built as a design-engineering exploration tool.

<p align="center">
  <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" alt="Vercel" height="36" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://www.cursor.com/apple-touch-icon.png" alt="Cursor" height="36" />
  &nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <strong>Built with</strong> Figma Make &bull; Deployed on Vercel &bull; Developed in Cursor &bull; Tested via Maze
</p>

---

## What Is This

A fully functional mobile prototype (375x812) simulating a debt installment negotiation experience. Two distinct flows let users explore different interaction models for the same financial product. Everything runs client-side with real amortization math, three languages, and production-grade micro-interactions.

**Stack:** React 18 + TypeScript + Motion + Tailwind CSS v4 + Vite

---

## Flows

| Flow | Core Screen | How It Works |
|------|-------------|--------------|
| **A** | Simulation | Slider-driven. User drags between 2-60 installments and sees real-time recalculation with animated numbers. |
| **B** | Suggested Conditions | Target-value driven. User enters a monthly budget; the system suggests a best-match plan plus secondary options with cascading micro-interactions. |

Both flows share the same downstream screens (DueDate, Summary, Terms, PIN, Loading, Feedback).

---

## Screens

| # | Screen | Path | Description |
|---|--------|------|-------------|
| 1 | **Flow Selector** | `screens/FlowSelector` | Entry point. Choose between Flow A (slider icon) or Flow B (sparkles icon). |
| 2 | **Language Selector** | `screens/LanguageSelector` | Pick a language: pt-BR, es-MX, or en-US. Sets the i18n context for the entire session. |
| 3 | **Offer Hub** | `screens/OfferHub` | Three renegotiation offers (cash, short-term, long-term) calculated from locale-specific rates. |
| 4 | **Installment Value** | `screens/InstallmentValue` | ATM-style numeric keypad. User types a monthly target value. Validates minimum and shows rotating tips. |
| 5A | **Simulation** | `screens/Simulation` | *(Flow A)* MUI slider with roulette-animated numbers, savings pulse badge, and auto-triggered downpayment alert at 20+ installments. |
| 5B | **Suggested Conditions** | `screens/Suggested` | *(Flow B)* Best-match card with purple badge, two secondary options, bottom sheet with 1-60 installment list, and ATM keypad for value editing. |
| 6 | **Due Date** | `screens/DueDate` | Calendar bottom sheet. Select a payment date from a 6-day range. Shows plan summary with discount and downpayment info. |
| 7 | **Summary** | `screens/Summary` | Full review: installments, monthly amount, due date, downpayment, interest breakdown. Edit button routes back to the correct flow. |
| 8 | **Terms & Conditions** | `screens/TermsConditions` | Scrollable legal copy. Confirm button enables after reading. |
| 9 | **PIN** | `screens/Pin` | 4-digit confirmation overlay (z-40) on top of Terms. Auto-validates on last digit. |
| 10 | **Loading** | `screens/Loading` | Three-step progress animation with branded messaging. |
| 11 | **Feedback** | `screens/Feedback` | Post-success screen. "Make first payment" or "Do it later" — both restart the prototype. |
| - | **Success** | `screens/Success` | Confirmation state (used in alternative flows). |
| - | **Downpayment Value** | `screens/DownPaymentValue` | Numeric input for downpayment amount (triggered when installments > 20). |
| - | **Downpayment Date** | `screens/DownPaymentDate` | Date picker for downpayment scheduling. |

---

## Running Locally

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # Production build -> dist/
```

Requires Node >= 18 and pnpm >= 8.

---

## Deploying

The project is configured for Vercel with zero configuration (Vite auto-detected).

```bash
# Option 1: Push to GitHub, import on vercel.com/new
git push origin main

# Option 2: Direct deploy via CLI
npx vercel --prod
```

See [CURSOR_REPRODUCTION_GUIDE.en.md](./CURSOR_REPRODUCTION_GUIDE.en.md) for the full step-by-step including Git setup, Vercel configuration, and custom domains.

---

## Documentation

| File | What It Covers |
|------|---------------|
| [CURSOR_REPRODUCTION_GUIDE.en.md](./CURSOR_REPRODUCTION_GUIDE.en.md) | Complete reproduction guide: architecture, business logic, i18n, animations, deployment |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Directory tree and file responsibilities |
| [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) | Changelog from initial scaffold to V1 |

---

## Key Technical Decisions

- **Navigation:** History-stack pattern in `App.tsx` (not React Router). Supports contextual back, forward, and jump-to navigation.
- **Financial math:** PRICE amortization (BR, MX) and flat-discount (US placeholder). Interpolated discount model: 20% at 2 installments down to 3% at 60.
- **i18n:** Custom React Context with `t()` function, `formatCurrency()`, and `formatDate()`. Three complete locale files.
- **Animations:** Spring physics via Motion. Roulette numbers, pulse badges, slot-machine cascades, draggable bottom sheets.
- **Zero duplication:** SuggestedScreen reuses `useFinancialCalculator().calculate()` from Simulation. Shared components across all screens.

---

## Contact

Questions, feedback, or access issues:

**Julio Ferracini** — [@julioferracini](https://nubank.enterprise.slack.com/team/U074WLC2SJG) on Slack

---

<sub>V1 closed — March 2026</sub>
