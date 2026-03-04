# Negotiation Flow Prototype

Interactive mobile prototype (375x812) for negotiation flows. Two distinct flows let users explore different interaction models for the same financial product. Everything runs client-side with real amortization math, three languages, and production-grade micro-interactions.

**Stack:** React 18 · TypeScript · Motion · Tailwind CSS v4 · Vite

---

## Quick Start

### Prerequisites

| Tool    | Version  | Check             |
| ------- | -------- | ----------------- |
| Node.js | >= 18    | `node -v`         |
| pnpm    | >= 8     | `pnpm -v`         |

> **npm** or **yarn** work too — replace `pnpm` accordingly.

### Clone & Run

```bash
git clone git@github.com:julioferracini/dr-hiring-flow-design-test.git
cd dr-hiring-flow-design-test
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build      # outputs to dist/
pnpm preview    # preview the production build locally
```

---

## Deploy to Vercel

The project is a standard Vite app — Vercel auto-detects everything.

**Option A — Push to GitHub, import on Vercel:**

1. Push your branch to GitHub
2. Go to [vercel.com/new](https://vercel.com/new), import the repo
3. Vercel auto-detects Vite. Click **Deploy**

**Option B — CLI:**

```bash
npx vercel --prod
```

**Vercel settings (auto-detected):**

| Setting          | Value          |
| ---------------- | -------------- |
| Framework Preset | Vite           |
| Build Command    | `pnpm build`   |
| Output Directory | `dist`         |
| Install Command  | `pnpm install` |

---

## Flows

| Flow  | Core Screen            | How It Works                                                                                   |
| ----- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| **A** | Simulation (slider)    | User drags a slider to pick 2–60 installments. Real-time recalculation with animated numbers.  |
| **B** | Suggested Conditions   | User enters a monthly budget. System suggests a best-match plan plus secondary options.         |

Both flows share downstream screens: DueDate → Summary → Terms → PIN → Loading → Feedback.

---

## Screens

| #  | Screen                 | Description                                                            |
| -- | ---------------------- | ---------------------------------------------------------------------- |
| 1  | Flow Selector          | Choose Flow A or Flow B                                                |
| 2  | Language Selector      | Pick pt-BR, es-MX, or en-US                                           |
| 3  | Offer Hub              | Three renegotiation offers (cash, short-term, long-term)               |
| 4  | Installment Value      | ATM-style numeric keypad for monthly target                            |
| 5A | Simulation             | *(Flow A)* Slider with roulette-animated numbers and downpayment alert |
| 5B | Suggested Conditions   | *(Flow B)* Best-match card, secondary options, bottom sheet list       |
| 6  | Due Date               | Calendar bottom sheet for payment date selection                       |
| 7  | Summary                | Full review with installments, interest, and edit capability           |
| 8  | Terms & Conditions     | Scrollable legal copy, confirm after reading                           |
| 9  | PIN                    | 4-digit confirmation overlay                                          |
| 10 | Loading                | Three-step progress animation                                         |
| 11 | Feedback               | Post-success with payment CTA                                         |

---

## Project Structure

```
src/
  main.tsx                          Entry point
  app/
    App.tsx                         Navigation (history-stack, no React Router)
    constants/                      Colors, tokens, financial rules, currencies
    hooks/                          useFinancialCalculator, useOfferEngine
    i18n/                           Translations (pt-BR, es-MX, en-US)
    components/                     Shared UI (ScreenNavBar, IOSBottomSheet, BottomActionBar, …)
    screens/                        All screen components
  imports/                          Figma-exported SVG modules
  assets/                           Image assets
  styles/                           Global CSS, fonts, Tailwind v4 theme
```

---

## Branch Strategy

```
main        ← production-ready
  └── develop   ← integration branch
       ├── feature/…
       └── fix/…
```

### Working on a feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# work, commit, push
git add .
git commit -m "feat(scope): description"
git push -u origin feature/my-feature
```

This project follows [Conventional Commits](https://www.conventionalcommits.org/):
`feat`, `fix`, `refactor`, `style`, `docs`, `perf`, `chore`.

---

## Key Technical Decisions

- **Navigation:** History-stack pattern in `App.tsx` (no React Router). Supports back, forward, and jump-to.
- **Financial math:** PRICE amortization (BR, MX) and flat-discount (US). Interpolated discount model.
- **i18n:** Custom React Context with `t()`, `formatCurrency()`, `formatDate()`. Three complete locale files.
- **Animations:** Spring physics via Motion. Roulette numbers, pulse badges, draggable bottom sheets.
- **Design tokens:** Centralized in `constants/colors.ts` and `constants/tokens.ts`.

---

## Documentation

Detailed internal docs live in the `docs/` folder:

| File                                                  | Topic                                           |
| ----------------------------------------------------- | ----------------------------------------------- |
| [docs/reproduction-guide.md](docs/reproduction-guide.md) | Full reproduction guide: architecture, logic, i18n |
| [docs/flow-implementation.md](docs/flow-implementation.md) | Flow implementation details and state management   |
| [docs/bottomsheet-behavior.md](docs/bottomsheet-behavior.md) | Bottom sheet animation behavior and timing          |
| [docs/bottomsheet-usage.md](docs/bottomsheet-usage.md)   | IOSBottomSheet component API and usage              |

---

## Troubleshooting

| Problem                    | Solution                                                       |
| -------------------------- | -------------------------------------------------------------- |
| `pnpm install` fails       | Delete `node_modules` and `pnpm-lock.yaml`, retry              |
| Port 3000 in use           | `pnpm dev -- --port 3001`                                      |
| Blank page after deploy    | Check `base` in `vite.config.ts` matches your deploy path      |
| Motion import error        | Use `from "motion/react"`, NOT `"framer-motion"`               |

---

**Julio Ferracini** — [@julioferracini](https://nubank.enterprise.slack.com/team/U074WLC2SJG) on Slack
