# Design System & Transition Reference

Reference document for all design tokens, primitive components, and screen transition patterns used in this project.

---

## 1. Color Tokens

Source: `src/app/constants/colors.ts`
CSS variables: `:root` block in `src/styles/theme.css`

| Category | Token | Value | CSS Variable |
|----------|-------|-------|--------------|
| **Primary** | `colors.primary.purple` | `#820ad1` | `--color-nu-purple` |
| | `colors.primary.purpleLight` | `rgba(130,10,209, 0.05)` | `--color-nu-purple-light` |
| | `colors.primary.purpleHover` | `rgba(130,10,209, 0.06)` | `--color-nu-purple-hover` |
| | `colors.primary.purplePressed` | `rgba(130,10,209, 0.12)` | `--color-nu-purple-pressed` |
| | `colors.primary.purpleShadow` | `rgba(130,10,209, 0.25)` | `--color-nu-purple-shadow` |
| | `colors.primary.purpleShadowStrong` | `rgba(130,10,209, 0.28)` | — |
| | `colors.primary.purpleRing` | `rgba(130,10,209, 0.3)` | `--color-nu-purple-ring` |
| | `colors.primary.purpleMuted` | `rgba(130,10,209, 0.5)` | — |
| **Purple Tint** | `colors.purpleTint.subtle` | `#faf6ff` | `--color-nu-tint-subtle` |
| | `colors.purpleTint.light` | `#f6ecff` | `--color-nu-tint-light` |
| | `colors.purpleTint.medium` | `#ecd9ff` | `--color-nu-tint-medium` |
| **Text** | `colors.text.primary` | `#1f0230` | `--color-nu-text` |
| | `colors.text.secondary` | `rgba(31,2,48, 0.62)` | `--color-nu-text-secondary` |
| | `colors.text.muted` | `rgba(0,0,0, 0.64)` | `--color-nu-text-muted` |
| | `colors.text.hint` | `rgba(0,0,0, 0.44)` | `--color-nu-text-hint` |
| | `colors.text.placeholder` | `rgba(0,0,0, 0.4)` | `--color-nu-text-placeholder` |
| | `colors.text.disabled` | `rgba(0,0,0, 0.32)` | `--color-nu-text-disabled` |
| | `colors.text.inverse` | `#ffffff` | — |
| **Success** | `colors.success.background` | `#ddf5e5` | `--color-nu-success-bg` |
| | `colors.success.text` | `#0c7a3a` | `--color-nu-success-text` |
| **Error** | `colors.error.text` | `#d4183d` | `--color-nu-error-text` |
| | `colors.error.background` | `#FEF0F0` | `--color-nu-error-bg` |
| | `colors.error.icon` | `#E53E3E` | `--color-nu-error-icon` |
| **Neutral** | `colors.neutral.white` | `#ffffff` | — |
| | `colors.neutral.gray` | `#e3e0e5` | — |
| | `colors.neutral.grayLight` | `#efefef` | `--color-nu-gray` |
| | `colors.neutral.grayMid` | `#f8f6f8` | `--color-nu-gray-mid` |
| | `colors.neutral.disabled` | `#c7c7cc` | `--color-nu-disabled` |
| **Border** | `colors.border.default` | `rgba(31,2,48, 0.08)` | `--color-nu-border` |
| | `colors.border.subtle` | `rgba(31,2,48, 0.06)` | `--color-nu-border-subtle` |
| | `colors.border.strong` | `rgba(31,2,48, 0.1)` | `--color-nu-border-strong` |
| | `colors.border.divider` | `#efefef` | `--color-nu-divider` |
| **Overlay** | `colors.overlay.dark` | `rgba(0,0,0, 0.4)` | `--color-nu-overlay` |
| | `colors.overlay.light` | `rgba(0,0,0, 0.12)` | `--color-nu-overlay-light` |
| **Surface** | `colors.surface.glass` | `rgba(255,255,255, 0.67)` | `--color-nu-glass` |
| | `colors.surface.glassStrong` | `rgba(255,255,255, 0.92)` | `--color-nu-glass-strong` |
| | `colors.surface.card` | `#ffffff` | — |

---

## 2. Typography Tokens

Source: `src/app/constants/tokens.ts`

### Font Families

| Token | Stack | Usage |
|-------|-------|-------|
| `tokens.fonts.graphik` | Inter, system fallbacks | Body text, labels, form fields |
| `tokens.fonts.nuSans` | Manrope, system fallbacks | Navigation, badges, monetary values |
| `tokens.fonts.nuSansDisplay` | Manrope, system fallbacks | Display headings, hero values |
| `tokens.fonts.sfPro` | System font stack | System UI elements |

### Font Sizes

| Token | Value | Typical Usage |
|-------|-------|---------------|
| `2xs` | 11px | Fine print |
| `xs` | 12px | Badges, discount tags, subtitles |
| `sm` | 13px | Small labels |
| `base` | 14px | Body text, descriptions |
| `md` | 15px | Status bar, nav labels |
| `lg` | 16px | Section titles, terms content |
| `xl` | 18px | Checkout bar total |
| `2xl` | 20px | Card titles, section headings |
| `3xl` | 22px | — |
| `4xl` | 24px | Page headings |
| `5xl` | 28px | — |
| `6xl` | 32px | Display titles (FlowSelector, LanguageSelector) |
| `7xl` | 36px | Hero values (Simulation main value) |
| `8xl` | 40px | — |
| `9xl` | 44px | — |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | -0.14px | Small body text |
| `snug` | -0.16px | Medium body text |
| `normal` | -0.24px | Standard labels |
| `dense` | -0.4px | Card titles |
| `compact` | -0.54px | — |
| `heading` | -0.6px | Headings |
| `display` | -0.72px | Display titles |
| `displayLg` | -0.84px | — |
| `displayXl` | -0.96px | Large display titles |
| `displayHero` | -1.2px | Hero text |
| `value` | -2px | Currency values, main amounts |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `normal` | 400 | Body text, descriptions |
| `medium` | 500 | Card titles, headings |
| `semibold` | 600 | Simulation currency values, badges, buttons |
| `bold` | 700 | Section titles (Summary), FlowSelector titles |

### Line Heights

| Token | Value |
|-------|-------|
| `none` | 1 |
| `tight` | 1.1 |
| `snug` | 1.2 |
| `normal` | 1.3 |
| `relaxed` | 1.5 |

---

## 3. Spacing, Radius, Shadows

### Spacing Scale

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
| `xl` | 20px |
| `2xl` | 24px |
| `3xl` | 32px |
| `4xl` | 48px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Discount tags |
| `sm` | 8px | Small cards |
| `md` | 14px | Buttons |
| `lg` | 16px | — |
| `xl` | 24px | Offer cards |
| `2xl` | 26px | — |
| `3xl` | 28px | — |
| `4xl` | 32px | Screen containers (emulator) |
| `5xl` | 40px | Main app frame (emulator) |
| `full` | 9999px | Circles, pills |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | `0px 1px 0px 0px rgba(31,0,47, 0.05)` | Subtle elevation |
| `md` | `0 2px 8px rgba(12,122,58, 0.1)` | Cards |
| `lg` | `0 8px 24px rgba(12,122,58, 0.25)` | Elevated overlays |
| `bottomSheet` | `0px -4px 24px rgba(0,0,0, 0.10)` | Bottom sheets |
| `cta` | `0px 2px 12px rgba(130,10,209, 0.28)` | Primary CTA buttons |

### Z-Index

| Token | Value | Usage |
|-------|-------|-------|
| `base` | 1 | Default stacking |
| `sticky` | 10 | Sticky headers, bottom bars |
| `dropdown` | 20 | Dropdowns, popovers |
| `overlay` | 40 | Full-screen overlays, modals |
| `modal` | 50 | PIN screen, alert sheets |
| `safeArea` | 60 | Safe area fill layer |

---

## 4. Primitive Components

Source: `src/app/components/primitives/`

| Component | File | Purpose |
|-----------|------|---------|
| `Divider` | `Divider.tsx` | Horizontal separator line using `colors.border.divider` |
| `PrimaryCTA` | `PrimaryCTA.tsx` | Purple call-to-action button with shadow |
| `BottomSheetHandle` | `BottomSheetHandle.tsx` | Drag indicator bar for bottom sheets |
| `BackChevronIcon` | `BackChevronIcon.tsx` | Left chevron SVG for navigation back |
| `CloseButton` | `CloseButton.tsx` | Circular X button for dismissing sheets |
| `SuccessBadge` | `SuccessBadge.tsx` | Green badge for discount/savings tags |
| `LoadingSpinner` | `LoadingSpinner.tsx` | Purple spinning circle indicator |
| `ListRow` | `ListRow.tsx` | Standard list row with label and value |

Import all from barrel:

```tsx
import { Divider, CloseButton, BottomSheetHandle } from "../components/primitives";
```

---

## 5. Screen Transition Library

Source: `src/app/transitions/`

### Transition Presets

| Preset | Animation | Physics | Direction-aware | Usage |
|--------|-----------|---------|-----------------|-------|
| `slide` | Push horizontal (left/right) | Spring: stiffness 260, damping 26, mass 0.9 | Yes | Standard navigation between screens |
| `fade` | Crossfade opacity | Tween: 250ms, ease-out | No | Entry points, loading screens |
| `modalPresent` | Slide from bottom + scale 0.97 | Spring: stiffness 340, damping 34, mass 0.85 | No | iOS-style modal presentation |
| `slideUp` | Vertical push from bottom | Spring: stiffness 300, damping 30, mass 0.9 | No | Full-screen bottom sheet |
| `none` | Instant cut (no animation) | Duration: 0 | No | Immediate transitions |

### Screen Configuration

| Screen | Transition |
|--------|------------|
| `flowSelector` | `fade` |
| `languageSelector` | `slide` |
| `initialLoading` | `fade` |
| `offerhub` | `fade` |
| `installment` | `slide` |
| `simulation` | `slide` |
| `suggested` | `slide` |
| `dueDate` | `slide` |
| `summary` | `slide` |
| `terms` | `slide` |
| `loading` | `slide` |
| `feedback` | `slide` |
| `success` | `slide` |

### Usage

In `App.tsx`, each screen uses the `ScreenTransition` wrapper:

```tsx
import { ScreenTransition, screenTransitions } from "./transitions";

<AnimatePresence initial={false} custom={direction}>
  {currentScreen === "simulation" && (
    <ScreenTransition
      type={screenTransitions.simulation}
      screenKey="simulation"
      direction={direction}
    >
      <SimulationScreen ... />
    </ScreenTransition>
  )}
</AnimatePresence>
```

### Adding a New Screen

1. Add the screen type to `ScreenType` in `App.tsx` and `screenConfig.ts`
2. Add one line to `screenTransitions` in `screenConfig.ts`:
   ```ts
   newScreen: "slide", // or "fade", "modalPresent", "slideUp", "none"
   ```
3. Add the `ScreenTransition` block in `App.tsx`

### Changing a Screen's Transition

Edit one line in `src/app/transitions/screenConfig.ts`:

```ts
terms: "modalPresent", // was "slide"
```

### Adding a New Transition Preset

1. Define `variants` and `transition` in `presets.ts`
2. Add to the `transitionPresets` export object
3. The `TransitionType` union updates automatically

---

## 6. Spring Physics Reference

Source: `src/app/constants/tokens.ts` (component-level springs)
Source: `src/app/transitions/presets.ts` (screen-level springs)

| Name | Stiffness | Damping | Mass | Character |
|------|-----------|---------|------|-----------|
| `tokens.spring.default` | 300 | 30 | — | Balanced |
| `tokens.spring.tight` | 400 | 30 | 0.8 | Quick, controlled |
| `tokens.spring.smooth` | 500 | 35 | 0.5 | Fluid, minimal overshoot |
| `tokens.spring.bouncy` | 400 | 20 | — | Playful, visible bounce |
| `tokens.spring.snappy` | 380 | 44 | 0.85 | Fast settle, no bounce |
| Screen `slide` | 260 | 26 | 0.9 | Natural page push |
| Screen `modalPresent` | 340 | 34 | 0.85 | iOS modal feel |
| Screen `slideUp` | 300 | 30 | 0.9 | Vertical push |

---

## 7. CSS Utility Classes

Defined in `src/styles/theme.css`:

| Class | Mobile | Desktop (md+) | Purpose |
|-------|--------|---------------|---------|
| `.app-safe-top` | `top: env(safe-area-inset-top, 0px)` | `top: 16px` | Push content below safe area / emulator padding |
| `.app-safe-fill` | `height: env(safe-area-inset-top, 0px)` | `height: 16px` | Fill the safe area with a background color |

---

## 8. Architecture Decisions

### Font Family
All fonts are **sans-serif**. No serif fonts exist in the system. The `DM Serif Display` reference was removed.

### Rounded Corners
All `rounded-[Xpx]` classes on screen containers, bottom sheets, and overlays use the `md:` prefix to only apply on desktop emulator. Mobile views are full-bleed.

### Safe Area
The app uses `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for PWA/mobile compatibility. A dynamic background fill div in `App.tsx` matches the header color per screen.

### Haptic Feedback
The `InstallmentsSlider` triggers tactile feedback per tick using:
- `navigator.vibrate(18)` on Android
- Web Audio API click (gain 0.06, duration 25ms) cross-platform
- `AudioContext.resume()` on first touch to bypass mobile browser restrictions

### Downpayment Validation
Real-time visual feedback when value is below minimum: red text, shake animation, error message, disabled confirm button.
