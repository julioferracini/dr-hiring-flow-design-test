/**
 * Design System Tokens
 * Global design tokens used across all screens
 */

export const tokens = {
  // Font Families
  fonts: {
    graphik: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    nuSans: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    nuSansDisplay: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    sfPro: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },

  // Font Feature Settings
  fontFeatures: {
    graphik: "'ss05'",
    numbers: "'lnum', 'tnum'",
    proportional: "'lnum', 'pnum'",
  },

  // Font Weights
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },

  // Border Radius
  radius: {
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '40px',
    full: '64px',
  },

  // Transitions
  transitions: {
    fast: { duration: 0.2 },
    normal: { duration: 0.3 },
    slow: { duration: 0.4 },
  },

  // Spring Physics
  spring: {
    default: { type: 'spring' as const, stiffness: 300, damping: 30 },
    tight: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.8 },
    smooth: { type: 'spring' as const, stiffness: 500, damping: 35, mass: 0.5 },
    bouncy: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },

  // Shadows
  shadows: {
    sm: '0px 1px 0px 0px rgba(31, 0, 47, 0.05)',
    md: '0 2px 8px rgba(12, 122, 58, 0.1)',
    lg: '0 8px 24px rgba(12, 122, 58, 0.25)',
  },

  // Z-Index
  zIndex: {
    base: 1,
    overlay: 40,
    modal: 50,
  },
} as const;

export type Tokens = typeof tokens;