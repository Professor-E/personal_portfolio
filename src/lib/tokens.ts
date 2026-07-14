/**
 * Design Token Constants — sourced directly from Figma MCP
 * File: Dominik Grzeszczak — Jan Szmajda  (node 627:322)
 * Mirrors src/styles/tokens.css as typed TypeScript constants.
 */

export const colors = {
  light: {
    background:    "#fafaf7",
    surface:       "#ffffff",
    textPrimary:   "#1a1a1a",
    textSecondary: "#5f5e5a",
    accent:        "#0a6cff",
    accentHover:   "#0c447c",
    border:        "#e8e7e2",
  },
  dark: {
    background:    "#111110",
    surface:       "#1c1c1b",
    textPrimary:   "#f5f5f0",
    textSecondary: "#a09e99",
    accent:        "#3d8bff",
    accentHover:   "#60a5fa",
    border:        "#2e2e2b",
  },
} as const;

export const typography = {
  fontFamily: {
    inter: "Inter, sans-serif",
    // Post-Figma display face — headings + wordmarks (mirrors --font-display)
    display: "'Manrope', Inter, sans-serif",
  },
  fontSize: {
    display:    "64px",
    header1:    "48px",
    header2:    "32px",
    header3:    "24px",
    bodyLarge:  "18px",
    body:       "16px",
    small:      "14px",
    caption:    "12px",
  },
  fontWeight: {
    medium:   500,
    semibold: 600,
    bold:     700,
  },
  lineHeight: {
    display:    1,
    header1:    1,
    header2:    1,
    header3:    1,
    bodyLarge:  1,
    body:       1,
    small:      1,
    caption:    1,
  },
  letterSpacing: {
    display:    0,
    header1:    0,
    header2:    0,
    header3:    0,
    bodyLarge:  0,
    body:       0,
    small:      0,
    caption:    0,
  },
} as const;

export const radius = {
  sm:  "4px",
  md:  "8px",
  lg:  "12px",
  xl:  "16px",
  "2xl": "24px",
} as const;

export const spacing = {
  xs:  "4px",
  sm:  "8px",
  md:  "16px",
  lg:  "24px",
  xl:  "32px",
  "2xl": "48px",
  "3xl": "64px",
} as const;

// ── Additive tokens (post-Figma) — mirrors the additive block in tokens.css ──
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
  md: "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 20px rgba(0, 0, 0, 0.07)",
  lg: "0 2px 4px rgba(0, 0, 0, 0.06), 0 14px 32px rgba(0, 0, 0, 0.12)",
} as const;

export const tracking = {
  display: "-0.02em",
} as const;

export const tokens = { colors, typography, radius, spacing, shadows, tracking } as const;
export type Tokens = typeof tokens;
