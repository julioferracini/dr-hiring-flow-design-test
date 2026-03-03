/**
 * Design System Colors
 * Global color tokens used across all screens
 */

export const colors = {
  // Primary
  primary: {
    purple: '#820ad1',
    purpleLight: 'rgba(130, 10, 209, 0.05)',
  },

  // Text
  text: {
    primary: '#1f0230',
    primaryAlt: '#1f002f',
    secondary: 'rgba(31, 2, 48, 0.62)',
    muted: 'rgba(0, 0, 0, 0.64)',
  },

  // Success
  success: {
    background: '#ddf5e5',
    text: '#0c7a3a',
    textAlt: '#0c7a3a',
    border: 'rgba(30, 165, 84, 0.1)',
    borderAlt: 'rgba(30, 165, 84, 0.2)',
  },

  // Neutral
  neutral: {
    white: '#ffffff',
    gray: '#e3e0e5',
    grayLight: '#efefef',
    grayDark: 'rgba(31, 2, 48, 0.62)',
  },

  // Overlay
  overlay: {
    dark: 'rgba(0, 0, 0, 0.4)',
  },
} as const;

export type Colors = typeof colors;