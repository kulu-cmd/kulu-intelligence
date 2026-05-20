import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Brand palette — see brand guidelines section 05
        stoep: "#FF6B5C",   // Stoep coral — primary accent, cap at 12%
        mielie: "#FFD66B",  // Mielie yellow — secondary warmth, ~5%
        dawn: "#FFF8E8",    // Dawn cream — ground, ~55%
        indigo: {
          DEFAULT: "#1A2B47", // Indigo — anchor, ~25%
          deep: "#13203A",    // For hover/active states
        },
        spruit: "#B8E0D2",  // Spruit mint — cool accent, sparingly ~3%
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Type scale from brand book section 06b — never invent between
        hero: ["80px", { lineHeight: "1", letterSpacing: "-0.045em" }],
        display: ["44px", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        heading: ["28px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        subhead: ["18px", { lineHeight: "1.4", letterSpacing: "-0.005em" }],
        body: ["15px", { lineHeight: "1.65" }],
        caption: ["12px", { lineHeight: "1.6" }],
        eyebrow: ["11px", { lineHeight: "1.4", letterSpacing: "0.16em" }],
      },
      letterSpacing: {
        descriptor: "0.3em",
        eyebrow: "0.16em",
        wordmark: "-0.045em",
      },
      borderRadius: {
        spread: "14px",
      },
      transitionTimingFunction: {
        kulu: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "period-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
