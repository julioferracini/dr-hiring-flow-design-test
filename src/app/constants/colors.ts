/**
 * Design System Colors
 * Global color tokens used across all screens.
 * Bridge-ready: swap values here to adopt an external DS.
 */

export const colors = {
  // ── Primary ──────────────────────────────────────────────────────────────────
  primary: {
    purple: '#820ad1',
    purpleLight: 'rgba(130, 10, 209, 0.05)',
    purpleHover: 'rgba(130, 10, 209, 0.06)',
    purplePressed: 'rgba(130, 10, 209, 0.12)',
    purpleShadow: 'rgba(130, 10, 209, 0.25)',
    purpleShadowStrong: 'rgba(130, 10, 209, 0.28)',
    purpleRing: 'rgba(130, 10, 209, 0.3)',
    purpleMuted: 'rgba(130, 10, 209, 0.5)',
  },

  // ── Purple tints (backgrounds) ──────────────────────────────────────────────
  purpleTint: {
    subtle: '#faf6ff',
    light: '#f6ecff',
    medium: '#ecd9ff',
  },

  // ── Text ─────────────────────────────────────────────────────────────────────
  text: {
    primary: '#1f0230',
    primaryAlt: '#1f002f',
    secondary: 'rgba(31, 2, 48, 0.62)',
    muted: 'rgba(0, 0, 0, 0.64)',
    subtle: 'rgba(0, 0, 0, 0.52)',
    hint: 'rgba(0, 0, 0, 0.44)',
    placeholder: 'rgba(0, 0, 0, 0.4)',
    disabled: 'rgba(0, 0, 0, 0.32)',
    inverse: '#ffffff',
    inverseSecondary: 'rgba(255, 255, 255, 0.72)',
  },

  // ── Success ──────────────────────────────────────────────────────────────────
  success: {
    background: '#ddf5e5',
    text: '#0c7a3a',
    textAlt: '#2eab57',
    border: 'rgba(30, 165, 84, 0.1)',
    borderAlt: 'rgba(30, 165, 84, 0.2)',
  },

  // ── Error / Destructive ──────────────────────────────────────────────────────
  error: {
    text: '#d4183d',
    background: '#FEF0F0',
    icon: '#E53E3E',
    border: 'rgba(212, 24, 61, 0.2)',
  },

  // ── Neutral ──────────────────────────────────────────────────────────────────
  neutral: {
    white: '#ffffff',
    gray: '#e3e0e5',
    grayLight: '#efefef',
    grayMid: '#f8f6f8',
    grayDark: 'rgba(31, 2, 48, 0.62)',
    disabled: '#c7c7cc',
    disabledText: 'rgba(255, 255, 255, 0.72)',
  },

  // ── Border / Divider ─────────────────────────────────────────────────────────
  border: {
    default: 'rgba(31, 2, 48, 0.08)',
    subtle: 'rgba(31, 2, 48, 0.06)',
    light: 'rgba(31, 2, 48, 0.07)',
    strong: 'rgba(31, 2, 48, 0.1)',
    divider: '#efefef',
  },

  // ── Overlay / Backdrop ───────────────────────────────────────────────────────
  overlay: {
    dark: 'rgba(0, 0, 0, 0.4)',
    medium: 'rgba(0, 0, 0, 0.18)',
    light: 'rgba(0, 0, 0, 0.12)',
    subtle: 'rgba(0, 0, 0, 0.04)',
  },

  // ── Surface (glass, cards, bottom bars) ──────────────────────────────────────
  surface: {
    glass: 'rgba(255, 255, 255, 0.67)',
    glassStrong: 'rgba(255, 255, 255, 0.92)',
    glassMedium: 'rgba(255, 255, 255, 0.84)',
    card: '#ffffff',
  },
} as const;

export type Colors = typeof colors;