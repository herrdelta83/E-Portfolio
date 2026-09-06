import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,md,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0E11",
        paper: "#F7F5F0",
        circuit: "#3E7CB1",
        signal: "#D4A657",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        // Track holds two back-to-back copies of the icon list (see
        // LanguageMarquee in page.tsx) — looping at exactly -50% lands back
        // on an identical frame, so the seam is invisible.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // Duration scales with TECH_ICONS' length (page.tsx) so adding more
        // logos doesn't speed up the perceived scroll rate — keep it at
        // roughly (icon count / 7) * 25s if that list grows again.
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
