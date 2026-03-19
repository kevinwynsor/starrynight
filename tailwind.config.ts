import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#0B0F1A",
        "bg-card": "#121826",
        "bg-surface": "#1A2235",
        violet: "#7C83FD",
        "violet-dim": "rgba(124,131,253,0.15)",
        blue: "#6EC3FF",
        gold: "#F4D58D",
        "text-primary": "#E8EAF2",
        "text-muted": "#8891A8",
        "text-faint": "#4A5268",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "18px",
        "3xl": "24px",
      },
      animation: {
        "twinkle-slow": "twinkle 4s ease-in-out infinite",
        "twinkle-med": "twinkle 3s ease-in-out infinite",
        "twinkle-fast": "twinkle 2s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.2)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "glow-violet": "0 0 30px rgba(124,131,253,0.15)",
        "glow-gold": "0 0 20px rgba(244,213,141,0.2)",
        "glow-blue": "0 0 20px rgba(110,195,255,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
