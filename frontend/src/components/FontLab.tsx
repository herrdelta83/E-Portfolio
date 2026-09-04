"use client";

import { useState } from "react";

// Temporary dev aid for A/B-testing header fonts live, across the real hub
// + spoke pages — not part of the permanent design. Remove once a sci-fi
// header font is picked (see layout.tsx's TODO next to <FontLab />).
// A custom property can't reference itself (var(--font-display) set back onto
// --font-display on the same element is an invalid cycle), so the baseline
// entry uses this sentinel and clears the inline override instead of setting
// it, letting layout.tsx's next/font class take back over cleanly.
const RESET = "__reset__";

const CANDIDATES = [
  { label: "IBM Plex Serif (current)", value: RESET },
  { label: "Orbitron", value: "var(--font-orbitron)" },
  { label: "Space Mono", value: "var(--font-space-mono)" },
  { label: "Blanka*", value: "var(--font-blanka)" },
  { label: "Anurati*", value: "var(--font-anurati)" },
  { label: "Conthrax*", value: "var(--font-conthrax)" },
];

export default function FontLab() {
  const [active, setActive] = useState(CANDIDATES[0].value);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        right: 12,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 6,
        background: "#000",
        color: "#fff",
        padding: "8px 10px",
        fontFamily: "monospace",
        fontSize: 12,
      }}
    >
      <span>font lab:</span>
      <select
        value={active}
        onChange={(e) => {
          const value = e.target.value;
          setActive(value);
          if (value === RESET) {
            document.documentElement.style.removeProperty("--font-display");
          } else {
            document.documentElement.style.setProperty("--font-display", value);
          }
        }}
        style={{ background: "#111", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
      >
        {CANDIDATES.map((c) => (
          <option key={c.label} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <span style={{ opacity: 0.6 }}>* needs font file in public/fonts/</span>
    </div>
  );
}
