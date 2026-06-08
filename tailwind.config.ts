import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Figma Color Tokens ──────────────────────────────────────────────────
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        border: "var(--border)",
      },

      // ── Figma Typography Tokens ─────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        display: ["64px", { lineHeight: "1", letterSpacing: "0" }],
        "header-1": ["48px", { lineHeight: "1", letterSpacing: "0" }],
        "header-2": ["32px", { lineHeight: "1", letterSpacing: "0" }],
        "header-3": ["24px", { lineHeight: "1", letterSpacing: "0" }],
        "body-large": ["18px", { lineHeight: "1", letterSpacing: "0" }],
        body: ["16px", { lineHeight: "1", letterSpacing: "0" }],
        small: ["14px", { lineHeight: "1", letterSpacing: "0" }],
        caption: ["12px", { lineHeight: "1", letterSpacing: "0" }],
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // ── Figma Border Radius Tokens ──────────────────────────────────────────
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
