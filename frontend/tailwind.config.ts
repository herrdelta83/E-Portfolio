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
        // Was gold (#D4A657) — spokes used to have their own signal-gold
        // accent, distinct from the hub's cyan. All pages now share one look
        // (see CLAUDE.md), so this token retargets to the hub's cyan
        // (CIRCUIT_CYAN in CircuitHUD.tsx — keep these two in sync). Every
        // existing text-signal/border-signal/etc. across the spoke + detail
        // pages repaints from this one value; the name "signal" itself is
        // now legacy, kept only so those hundreds of class references don't
        // need touching.
        signal: "#00F0FF",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        // Track holds two back-to-back copies of the icon list (see
        // TechMarquee in page.tsx) — looping at exactly -50% lands back
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
        marquee: "marquee 46s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
