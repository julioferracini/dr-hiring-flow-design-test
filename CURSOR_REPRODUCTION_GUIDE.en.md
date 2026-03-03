# STEP-BY-STEP GUIDE: FINANCIAL SIMULATION PROTOTYPE V1

> **Version:** 1.0 (closed)
> **Language:** English (EN)
> **Stack:** React 18 + TypeScript + Motion + Tailwind CSS v4
> **Viewport:** Mobile-first 375x812px (responsive wrapper)

---

## PROJECT OVERVIEW

A mobile debt-resolution prototype with two parallel flows, full internationalization (pt-BR, es-MX, en-US), real financial amortization (PRICE table), and advanced micro-interactions.

**Two Flows:**

| Flow | Entry Screen | Core Screen | Description |
|------|-------------|-------------|-------------|
| **A** | FlowSelector -> LanguageSelector -> OfferHub -> InstallmentValue | **Simulation** (slider-based) | User drags a slider to pick installments (2-60). Real-time recalculation with animated numbers. |
| **B** | FlowSelector -> LanguageSelector -> OfferHub -> InstallmentValue | **SuggestedScreen** (AI-suggested) | Shows a "best match" card + secondary options based on the user's target monthly value. Bottom sheet with full 1-60 list & ATM keypad. |

**Shared screens (both flows):** DueDate -> Summary -> TermsConditions -> Pin -> Loading -> Feedback

---

## REQUIRED DEPENDENCIES

```json
{
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "motion": "^12.23.24",
  "lucide-react": "^0.487.0",
  "tailwindcss": "^4.1.12",
  "@tailwindcss/vite": "^4.1.12",
  "date-fns": "^3.6.0",
  "@mui/material": "^7.3.5",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.1",
  "@mui/icons-material": "^7.3.5"
}
```

**CRITICAL:**
- Use `import { motion, AnimatePresence } from "motion/react"` (NOT `framer-motion`).
- Use Tailwind CSS **v4** (no `tailwind.config.js` file; config via CSS).
- MUI is used only for the Slider component in the Simulation screen and some icons.
- `lucide-react` provides all other icons (ChevronRight, SlidersHorizontal, Sparkles, ChevronLeft, Info, etc.).

---

## PROJECT STRUCTURE

```
src/
  app/
    App.tsx                          # Main entry: I18nProvider + AppContent (history-stack navigation)
    constants/
      index.ts                       # Barrel export: colors, tokens, FINANCIAL_RULES
      colors.ts                      # Color tokens (primary.purple, text, success, neutral, overlay)
      tokens.ts                      # Design tokens (fonts, spacing, radius, spring physics, shadows)
      financialRules.ts              # Per-locale rules: rates, formulas, offers, downpayment thresholds
      currencies.ts                  # Currency formatting, conversion rates, EXAMPLE_VALUES per locale
      offerEngine.ts                 # Pure functions for 3-offer calculation (cash, short, long)
    hooks/
      useFinancialCalculator.ts      # Central financial hook: calculate() with PRICE/SAC/flat_discount
      useOfferEngine.ts              # Hook wrapper around offerEngine.ts
    i18n/
      types.ts                       # Locale type, Translations interface (all screen keys)
      config.ts                      # DEFAULT_LOCALE, SUPPORTED_LOCALES, isValidLocale
      context.tsx                    # I18nProvider, useTranslation hook (t, formatCurrency, formatDate)
      locales/
        en-US.ts                     # English translations
        pt-BR.ts                     # Portuguese (Brazil) translations
        es-MX.ts                     # Spanish (Mexico) translations
    components/
      ScreenNavBar.tsx               # Reusable top navigation bar (back button, title, trailing icon)
      IOSBottomSheet.tsx             # iOS-style draggable bottom sheet (used across screens)
      AlertBottomSheet.tsx           # Alert/error bottom sheet with spring animation
      BottomActionBar.tsx            # Sticky bottom CTA bar
      BottomBar.tsx                  # Alternative bottom bar component
      DatePickerCalendar.tsx         # Calendar component for date selection
      RouletteNumber.tsx             # Roulette/slot-machine number animation
      PulseDiscount.tsx              # Savings badge with pulse + ring expansion animation
      OfferBox.tsx                   # Offer card component for OfferHub
    screens/
      index.ts                       # Barrel: SimulationScreen, SuggestedScreen, InstallmentValueScreen, DueDateScreen, SummaryScreen, TermsConditionsScreen, SuccessScreen
      FlowSelector/                  # Entry screen: choose Flow A or B (Lucide icons)
      LanguageSelector/              # Language picker (pt-BR, es-MX, en-US)
      OfferHub/                      # Offer hub: 3 renegotiation offers
      InstallmentValue/              # ATM-style keypad for monthly value input
      Simulation/                    # [Flow A] Slider-based simulation
      Suggested/                     # [Flow B] AI-suggested conditions with micro-interactions
      DueDate/                       # Calendar-based due date selection
      Summary/                       # Final review with payment plan details
      TermsConditions/               # Legal terms with scroll-to-accept
      Pin/                           # 4-digit PIN confirmation overlay
      Loading/                       # Processing animation (3-step progress)
      Feedback/                      # Post-success feedback / first-payment CTA
      Success/                       # Success confirmation
      DownPaymentValue/              # Downpayment value input (if installments > 20)
      DownPaymentDate/               # Downpayment date picker
  imports/                           # Figma-exported SVGs and reference components
  styles/
    index.css                        # Global styles entry
    theme.css                        # Tailwind v4 theme tokens
    tailwind.css                     # Tailwind v4 base import
    fonts.css                        # Font imports (Manrope, Inter)
```

---

## DESIGN SYSTEM SETUP

### Step 1: Color System (`/src/app/constants/colors.ts`)

```typescript
export const colors = {
  primary: {
    purple: '#820ad1',
    purpleLight: 'rgba(130, 10, 209, 0.05)',
  },
  text: {
    primary: '#1f0230',
    primaryAlt: '#1f002f',
    secondary: 'rgba(31, 2, 48, 0.62)',
    muted: 'rgba(0, 0, 0, 0.64)',
  },
  success: {
    background: '#ddf5e5',
    text: '#0c7a3a',
    textAlt: '#0c7a3a',
    border: 'rgba(30, 165, 84, 0.1)',
    borderAlt: 'rgba(30, 165, 84, 0.2)',
  },
  neutral: {
    white: '#ffffff',
    gray: '#e3e0e5',
    grayLight: '#efefef',
    grayDark: 'rgba(31, 2, 48, 0.62)',
  },
  overlay: { dark: 'rgba(0, 0, 0, 0.4)' },
} as const;
```

### Step 2: Design Tokens (`/src/app/constants/tokens.ts`)

```typescript
export const tokens = {
  fonts: {
    graphik: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    nuSans: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    nuSansDisplay: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    sfPro: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  fontFeatures: { graphik: "'ss05'", numbers: "'lnum', 'tnum'" },
  fontWeights: { normal: '400', medium: '500', semibold: '600', bold: '700' },
  spacing: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '32px' },
  radius: { sm: '8px', md: '16px', lg: '32px', xl: '40px', full: '64px' },
  spring: {
    default: { type: 'spring', stiffness: 300, damping: 30 },
    tight: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
    smooth: { type: 'spring', stiffness: 500, damping: 35, mass: 0.5 },
    bouncy: { type: 'spring', stiffness: 400, damping: 20 },
  },
} as const;
```

### Step 3: Font Imports (`/src/styles/fonts.css`)

Import Manrope and Inter from Google Fonts at the top of this file.

---

## CORE BUSINESS LOGIC

### Financial Rules (`/src/app/constants/financialRules.ts`)

Each locale defines:
- `minInstallments` / `maxInstallments` (2-60)
- `downPaymentThreshold` (20): installments > 20 require mandatory downpayment
- `downPaymentMinPercent` (0.05) / `downPaymentMaxPercent` (0.90)
- `annualRateCC` / `annualRateLoan`: nominal annual rates per product
- `monthlyInterestRate`: pre-calculated weighted monthly rate
- `formula`: `'price'` (BR, MX) or `'flat_discount'` (US placeholder)
- `offer1/2/3DiscountPercent` + `offer2/3Installments`: 3 predefined offers

**Key rates:**
| Locale | CC Rate (a.a.) | Loan Rate (a.a.) | Weighted Monthly | Formula |
|--------|---------------|------------------|-----------------|---------|
| pt-BR  | 90.0%         | 40.0%            | 3.9041%         | PRICE   |
| es-MX  | 38.5%         | 44.0%            | 2.9516%         | PRICE   |
| en-US  | 24.0%         | 18.0%            | 1.50%           | flat_discount |

### Financial Calculator Hook (`/src/app/hooks/useFinancialCalculator.ts`)

```typescript
const { rules, debtData, calculate } = useFinancialCalculator();

// debtData = { originalBalance, ccBalance, loanBalance, totalBalance, discount }

const result = calculate({
  installments: 24,
  downpayment: 0,        // 0 = auto-calculate minimum if required
  totalDebt: debtData.originalBalance,
  downpaymentFixed: false,
});

// result: { monthlyPayment, downpayment, total, savings, needsDownpayment, totalInterest, effectiveRate }
```

**How discount interpolation works:**
- At `minInstallments` (2): maximum discount (e.g. 20%)
- At `maxInstallments` (60): minimum discount (e.g. 3%)
- Linear interpolation between the two

**PRICE amortization formula:**
```
monthly = PV x [i(1+i)^n] / [(1+i)^n - 1]
```

Where `PV` = amount to finance (after discount and downpayment), `i` = monthly rate, `n` = installments.

### Currency System (`/src/app/constants/currencies.ts`)

- `formatCurrency(value, locale)`: formats with correct symbol, separators, decimal places
- `EXAMPLE_VALUES[locale]`: pre-calculated debt values per locale
- All values stored in local currency (no runtime conversion needed within a locale)

---

## I18N SYSTEM

### Structure

1. **Types** (`i18n/types.ts`): `Locale`, `Translations` interface with all screen keys
2. **Context** (`i18n/context.tsx`): `I18nProvider` wraps entire app, `useTranslation()` hook
3. **Locales** (`i18n/locales/*.ts`): one file per language

### Usage

```typescript
const { t, formatCurrency, formatDate, locale, setLocale } = useTranslation();

t('suggested.bestMatchBadge');                    // "Best match"
t('suggested.installmentsOf', { count: 12, amount: '$100.00' }); // "12 installments of $100.00"
formatCurrency(1500);                             // "R$ 1.500,00" (if locale is pt-BR)
```

### Key i18n Sections

| Section | Used By |
|---------|---------|
| `common.*` | Shared buttons (Continue, Back, Close) |
| `offerHub.*` | OfferHub screen |
| `simulation.*` | Simulation screen (Flow A) |
| `suggested.*` | SuggestedScreen (Flow B) |
| `installmentValue.*` | InstallmentValue keypad screen |
| `dueDate.*` | DueDate screen + calendar |
| `summary.*` | Summary screen |
| `terms.*` | TermsConditions screen |
| `pin.*`, `loading.*`, `success.*`, `feedback.*` | Respective screens |

---

## REUSABLE COMPONENTS

| Component | File | Purpose |
|-----------|------|---------|
| **ScreenNavBar** | `components/ScreenNavBar.tsx` | Top bar with back arrow, title, optional trailing icon |
| **IOSBottomSheet** | `components/IOSBottomSheet.tsx` | Draggable bottom sheet with backdrop, snap points |
| **AlertBottomSheet** | `components/AlertBottomSheet.tsx` | Error/info alert with spring animation |
| **BottomActionBar** | `components/BottomActionBar.tsx` | Sticky CTA button at bottom of screen |
| **DatePickerCalendar** | `components/DatePickerCalendar.tsx` | Month calendar with selectable date range |
| **RouletteNumber** | `components/RouletteNumber.tsx` | Slot-machine digit animation for numbers |
| **PulseDiscount** | `components/PulseDiscount.tsx` | Savings badge with pulse + expanding ring effect |
| **OfferBox** | `components/OfferBox.tsx` | Card for a single renegotiation offer |

---

## SCREEN-BY-SCREEN IMPLEMENTATION

### Screen 1: FlowSelector

**File:** `/src/app/screens/FlowSelector/FlowSelector.tsx`

- Purple header with "Debt Resolution" title
- Two cards: Flow A (SlidersHorizontal icon) and Flow B (Sparkles icon) from lucide-react
- Icons aligned to top of card (`items-start`)
- Each card shows: Flow badge, English label, multilingual sublabels
- `onSelectFlow('A' | 'B')` callback
- Staggered entry animation with Motion

### Screen 2: LanguageSelector

**File:** `/src/app/screens/LanguageSelector/LanguageSelector.tsx`

- Three language options: Portugues (BR), Espanol (MX), English (US)
- Flag emoji + native name + status badge
- `onSelectLanguage(locale)` sets the i18n locale and navigates forward
- `onBack()` returns to FlowSelector

### Screen 3: OfferHub

**File:** `/src/app/screens/OfferHub/OfferHubScreen.tsx`

- Shows 3 renegotiation offers calculated from `useOfferEngine`
- Offer 1: Cash payment (highest discount)
- Offer 2: Short installment (12x, moderate discount)
- Offer 3: Long installment (36x BR / 24x MX, lowest discount)
- Balance display with "from X to Y" animation
- Tab bar: All debts / Credit card / Loans
- `onOfferSelect('simulation' | 'duedate')` routes to appropriate flow

### Screen 4: InstallmentValue (Monthly Value Input)

**File:** `/src/app/screens/InstallmentValue/InstallmentValue.tsx`

- ATM-style numeric keypad (digits build right-to-left)
- Blinking purple cursor (3px width)
- Minimum value validation with error bottom sheet
- Rotating tips below the input
- CTA: "Simulate with {amount}"
- `onComplete(installmentCount, rawMonetaryValue)` - Flow A uses count, Flow B uses raw value
- Loading spinner before navigation (600ms)

### Screen 5A: Simulation (Flow A)

**File:** `/src/app/screens/Simulation/Simulation.tsx`

- MUI Slider: range 2-60 installments
- Real-time recalculation via `useFinancialCalculator().calculate()`
- Animated numbers (RouletteNumber) for: monthly payment, installment count, total savings
- PulseDiscount component for savings badge (scale 0.9 -> 1.15 -> 1 + ring expansion)
- Downpayment alert: auto-shows 800ms after crossing threshold (> 20 installments)
- Toggle: "Keep for all installments" (fixes downpayment across all slider values)
- Slider visual feedback: scale 1.3x when dragging, shadow intensifies
- `onContinue({ installments, monthlyPayment, savings, total, downpayment, hasDownpayment })`

### Screen 5B: SuggestedScreen (Flow B)

**File:** `/src/app/screens/Suggested/SuggestedScreen.tsx`

- Receives `targetValue` (monthly amount from InstallmentValue)
- Calculates `bestMatch` installment count closest to target
- **Highlighted card:** Purple badge "Best match", shows installments, amount, discount, downpayment status
- **Secondary cards:** 2 options at bestMatch +/- 3 installments
- **More options button:** Opens AllOptionsSheet (bottom sheet with 1-60 installments list)
- **Edit value:** ATM-style keypad in bottom sheet to change target value
- **Info button:** Opens CalcSummarySheet (z-45) with plan details from `displayedBestMatch`
- **FAQ banner:** "What happens if I can't pay?"

**Micro-interaction sequence after value edit:**
1. Bottom sheet closes
2. 550ms delay via `pendingValueRef`
3. Secondary cards update with roulette slot-machine effect (`renderWithRoulette`, keys `secondary-0`, `secondary-1`)
4. 520ms later: highlighted card updates via `delayedBestMatch`
5. 380ms later: pulse animation (scale 1 -> 1.03 -> 0.985 -> 1.01 -> 1) triggered by `displayedBestMatch`

### Screen 6: DueDate

**File:** `/src/app/screens/DueDate/DueDate.tsx`

- Shows current plan summary (installments, monthly value, discount, downpayment)
- Calendar bottom sheet with selectable date range (6 days from today)
- Date info banner with animated day number
- `onContinue(selectedDate)` navigates to Summary

### Screen 7: Summary

**File:** `/src/app/screens/Summary/Summary.tsx`

- Full review of negotiation: installments, monthly payment, due date, downpayment, discount
- "Payment Plan" section with edit button
- "Billing Details" section with total financed, interest, total to pay
- Bottom bar: "Confirm agreement" + terms link
- `onEdit()` navigates back to Simulation (Flow A) or Suggested (Flow B)
- `onContinue()` navigates to Terms
- `onViewTerms()` navigates to Terms

### Screen 8: TermsConditions

**File:** `/src/app/screens/TermsConditions/TermsConditions.tsx`

- Scrollable legal text with bold section headers
- "Confirm renegotiation" button (enabled after scroll)
- `onConfirm()` shows PIN overlay

### Screen 9: Pin

**File:** `/src/app/screens/Pin/PinScreen.tsx`

- 4-digit PIN input with number pad
- Overlay (z-40) on top of Terms screen
- Auto-validates after 4 digits entered
- `onComplete()` navigates to Loading

### Screen 10: Loading

**File:** `/src/app/screens/Loading/LoadingScreen.tsx`

- 3-step progress animation: "Setting up...", "Preparing...", "Done!"
- Auto-completes after animation sequence
- `onComplete()` navigates to Feedback

### Screen 11: Feedback

**File:** `/src/app/screens/Feedback/FeedbackScreen.tsx`

- "Your plan is ready" confirmation
- Two CTAs: "Make first payment" and "Do it later"
- Both restart the prototype (navigate to FlowSelector)

---

## NAVIGATION FLOW (App.tsx)

### Architecture

`App.tsx` uses a **history stack** pattern (not React Router) for contextual back navigation:

```typescript
type ScreenType = "flowSelector" | "languageSelector" | "initialLoading" | "offerhub" |
  "installment" | "simulation" | "suggested" | "dueDate" | "summary" | "terms" |
  "loading" | "feedback" | "success";

// State
const [currentScreen, setCurrentScreen] = useState<ScreenType>("flowSelector");
const [history, setHistory] = useState<ScreenType[]>([]);
const [direction, setDirection] = useState<"forward" | "backward">("forward");
const [activeFlow, setActiveFlow] = useState<"A" | "B">("A");
```

### Navigation Functions

```typescript
// Forward: push current screen to history, set new screen
const navigateForward = (screen: ScreenType) => {
  setHistory(prev => [...prev, currentScreen]);
  setDirection("forward");
  setCurrentScreen(screen);
};

// Back: pop last screen from history
const navigateBack = () => {
  const prevScreen = history[history.length - 1];
  setHistory(h => h.slice(0, -1));
  setDirection("backward");
  setCurrentScreen(prevScreen);
};

// Back to specific screen (used by Summary's Edit button)
const navigateBackTo = (targetScreen: ScreenType) => {
  const idx = history.lastIndexOf(targetScreen);
  setHistory(h => h.slice(0, idx >= 0 ? idx : 0));
  setDirection("backward");
  setCurrentScreen(targetScreen);
};
```

### Flow Routing Logic

```typescript
// After InstallmentValue completes:
if (activeFlow === "B") {
  setTargetMonthlyValue(rawMonetaryValue);
  navigateForward("suggested");    // Flow B -> SuggestedScreen
} else {
  setInitialInstallments(installmentCount);
  navigateForward("simulation");   // Flow A -> Simulation
}

// After Summary Edit:
if (activeFlow === "B") {
  navigateBackTo("suggested");
} else {
  navigateBackTo("simulation");
}
```

### Screen Transitions

All screens wrapped in `AnimatePresence` with slide variants:
```typescript
const slideVariants = {
  enter: (dir) => ({ x: dir === "forward" ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir === "forward" ? "-100%" : "100%", opacity: 0 }),
};

const pageTransition = { type: "spring", stiffness: 260, damping: 26, mass: 0.9 };
```

---

## KEY ANIMATION PRINCIPLES

1. **Roulette effect:** All numeric values slide vertically with direction awareness (up = increasing, down = decreasing)
2. **Staggered delays:** Multiple values changing use subtle delays (0.05-0.15s) for readability
3. **Spring physics:** All interactive elements use spring transitions (not easing curves)
4. **Pulse + ring:** Savings/discount badges get scale pulse (0.9 -> 1.15 -> 1) with expanding ring
5. **Bottom sheets:** Spring entry from bottom with backdrop fade-in
6. **Slot-machine:** SuggestedScreen secondary cards use roulette effect with stable keys for smooth transitions
7. **Attention cascade:** SuggestedScreen uses timed delays (550ms -> 520ms -> 380ms) to create a visual cascade when values change

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Foundation
- [ ] Install all dependencies
- [ ] Create color system + design tokens + barrel export
- [ ] Set up font imports in `/src/styles/fonts.css`
- [ ] Create i18n system (types, config, context, 3 locale files)
- [ ] Create financial rules per locale
- [ ] Create currency system with formatCurrency
- [ ] Create `useFinancialCalculator` hook

### Phase 2: Shared Components
- [ ] ScreenNavBar (back button, title, trailing icon)
- [ ] IOSBottomSheet (draggable, snap points, backdrop)
- [ ] AlertBottomSheet (error/info alerts)
- [ ] BottomActionBar (sticky CTA)
- [ ] RouletteNumber (animated digits)
- [ ] PulseDiscount (savings badge animation)
- [ ] DatePickerCalendar (month view calendar)

### Phase 3: Screens (build in this order)
- [ ] FlowSelector
- [ ] LanguageSelector
- [ ] OfferHub (with offerEngine)
- [ ] InstallmentValue (ATM keypad)
- [ ] Simulation (Flow A - slider)
- [ ] SuggestedScreen (Flow B - AI suggestions + micro-interactions)
- [ ] DueDate (calendar)
- [ ] Summary (review + edit)
- [ ] TermsConditions (scroll-to-accept)
- [ ] Pin (4-digit overlay)
- [ ] Loading (3-step progress)
- [ ] Feedback (post-success CTA)

### Phase 4: Integration
- [ ] Wire up App.tsx with history stack navigation
- [ ] Test Flow A end-to-end (FlowSelector -> ... -> Feedback)
- [ ] Test Flow B end-to-end (FlowSelector -> ... -> Feedback)
- [ ] Test back navigation at every step
- [ ] Test Summary Edit routing (back to Simulation vs Suggested)
- [ ] Test all 3 locales
- [ ] Verify downpayment logic (> 20 installments)

---

## GIT REPOSITORY SETUP AND DEPLOYMENT

### Step 1: Create Git Repository

```bash
# 1. Initialize git in the project root
cd /path/to/your/project
git init

# 2. Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.DS_Store
*.local
.env
.env.*
!.env.example
EOF

# 3. First commit
git add .
git commit -m "feat: V1 - Financial Simulation Prototype (closed)"
```

### Step 2: Create GitHub Repository

```bash
# Option A: Using GitHub CLI (recommended)
gh repo create debt-resolution-prototype --private --source=. --push

# Option B: Manual
# 1. Go to github.com/new
# 2. Create a new repository (private recommended)
# 3. Do NOT initialize with README (you already have one)
# 4. Copy the remote URL and run:
git remote add origin https://github.com/YOUR_USERNAME/debt-resolution-prototype.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

**Option A: Vercel CLI (fastest)**

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy (first time - will prompt for project setup)
vercel

# When prompted:
#   - Set up and deploy? Yes
#   - Which scope? (select your account)
#   - Link to existing project? No
#   - Project name? debt-resolution-prototype
#   - Directory? ./
#   - Override settings? No (Vercel auto-detects Vite)

# 4. Deploy to production
vercel --prod
```

**Option B: Vercel Dashboard (visual)**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Vercel auto-detects Vite. Verify these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
   - **Install Command:** `pnpm install` (or `npm install`)
5. Click "Deploy"

**Option C: Direct deploy without Git**

```bash
# Deploy directly from local folder (no GitHub needed)
vercel --prod
```

### Step 4: Custom Domain (optional)

```bash
# Add custom domain via CLI
vercel domains add your-domain.com

# Or via Dashboard:
# Project Settings -> Domains -> Add Domain
```

### Step 5: Environment Variables (if needed)

Currently the project has no environment variables. If you add API keys later:

```bash
# Via CLI
vercel env add VARIABLE_NAME

# Or via Dashboard:
# Project Settings -> Environment Variables
```

### Continuous Deployment

After linking to GitHub, every `git push` to `main` triggers an automatic production deploy:

```bash
# Make changes, commit, push
git add .
git commit -m "fix: description of change"
git push origin main
# Vercel auto-deploys in ~30 seconds
```

Preview deploys are created automatically for pull requests.

---

## COMMON PITFALLS

1. **Wrong import:** Use `import { motion } from "motion/react"` NOT `"framer-motion"`
2. **Tailwind v4:** No `tailwind.config.js` file. Configuration is done in CSS files.
3. **Downpayment rule:** Triggers for installments **> 20** (not >= 20)
4. **Calendar submission:** DatePicker only submits when the "Select date" button is clicked, not on date tap
5. **Currency format:** Always 2 decimal places. Use `formatCurrency()` from i18n context, never manual formatting.
6. **History stack:** Always use `navigateForward` / `navigateBack` - never set `currentScreen` directly (breaks back navigation)
7. **i18n keys:** Never hardcode strings. All user-facing text must come from `t('section.key')`.
8. **SuggestedScreen stable keys:** Secondary cards must use fixed keys (`secondary-0`, `secondary-1`) for roulette animation to work properly. Dynamic keys cause remount instead of animation.
9. **Z-index layers:** Pin overlay = z-40, CalcSummarySheet = z-[45], IOSBottomSheet = z-50. Respect this order.
10. **Spring physics:** Use `tokens.spring.*` presets for consistency. Don't mix spring and easing transitions on the same element.

---

## ADDITIONAL RESOURCES

- Motion docs: https://motion.dev/docs
- Tailwind CSS v4 docs: https://tailwindcss.com/docs
- MUI Slider: https://mui.com/material-ui/react-slider/
- Lucide React icons: https://lucide.dev/icons/

---

**V1 is closed. This document serves as the reproduction guide for recreating the prototype from scratch in any AI-assisted IDE.**
