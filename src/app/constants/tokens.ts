/**
 * Design System Tokens
 * Global design tokens used across all screens.
 * Bridge-ready: swap values here to adopt an external DS.
 */

export const tokens = {
  // ── Font Families ────────────────────────────────────────────────────────────
  fonts: {
    graphik: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    nuSans: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    nuSansDisplay: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    sfPro: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },

  // ── Font Feature Settings ────────────────────────────────────────────────────
  fontFeatures: {
    graphik: "'ss05'",
    numbers: "'lnum', 'tnum'",
    proportional: "'lnum', 'pnum'",
  },

  // ── Font Weights ─────────────────────────────────────────────────────────────
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // ── Font Sizes ───────────────────────────────────────────────────────────────
  fontSize: {
    '2xs': '11px',
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '22px',
    '4xl': '24px',
    '5xl': '28px',
    '6xl': '32px',
    '7xl': '36px',
    '8xl': '40px',
    '9xl': '44px',
  },

  // ── Letter Spacing ───────────────────────────────────────────────────────────
  letterSpacing: {
    tight: '-0.14px',
    snug: '-0.16px',
    normal: '-0.24px',
    dense: '-0.4px',
    compact: '-0.54px',
    heading: '-0.6px',
    display: '-0.72px',
    displayLg: '-0.84px',
    displayXl: '-0.96px',
    displayHero: '-1.2px',
    value: '-2px',
  },

  // ── Line Height ──────────────────────────────────────────────────────────────
  lineHeight: {
    none: '1',
    tight: '1.1',
    snug: '1.2',
    normal: '1.3',
    relaxed: '1.5',
  },

  // ── Spacing ──────────────────────────────────────────────────────────────────
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
  },

  // ── Border Radius ────────────────────────────────────────────────────────────
  radius: {
    xs: '4px',
    sm: '8px',
    md: '14px',
    lg: '16px',
    xl: '24px',
    '2xl': '26px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '40px',
    full: '9999px',
  },

  // ── Transitions ──────────────────────────────────────────────────────────────
  transitions: {
    fast: { duration: 0.2 },
    normal: { duration: 0.3 },
    slow: { duration: 0.4 },
  },

  // ── Spring Physics ───────────────────────────────────────────────────────────
  spring: {
    default: { type: 'spring' as const, stiffness: 300, damping: 30 },
    tight: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.8 },
    smooth: { type: 'spring' as const, stiffness: 500, damping: 35, mass: 0.5 },
    bouncy: { type: 'spring' as const, stiffness: 400, damping: 20 },
    snappy: { type: 'spring' as const, stiffness: 380, damping: 44, mass: 0.85 },
  },

  // ── Shadows ──────────────────────────────────────────────────────────────────
  shadows: {
    sm: '0px 1px 0px 0px rgba(31, 0, 47, 0.05)',
    md: '0 2px 8px rgba(12, 122, 58, 0.1)',
    lg: '0 8px 24px rgba(12, 122, 58, 0.25)',
    bottomSheet: '0px -4px 24px rgba(0, 0, 0, 0.10)',
    cta: '0px 2px 12px rgba(130, 10, 209, 0.28)',
  },

  // ── Z-Index ──────────────────────────────────────────────────────────────────
  zIndex: {
    base: 1,
    sticky: 10,
    dropdown: 20,
    overlay: 40,
    modal: 50,
    safeArea: 60,
  },
} as const;

export type Tokens = typeof tokens;