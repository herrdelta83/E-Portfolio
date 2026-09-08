"use client";

import { useState } from "react";

// Temporary dev aid for A/B-testing fonts live, across the real hub + spoke
// pages — not part of the permanent design. DEACTIVATED: no longer imported/
// rendered in layout.tsx (both --font-display/Conthrax and --font-body/Space
// Mono are locked in, permanently, in globals.css). Re-add `<FontLab />` to
// layout.tsx's <body> if another round of font testing is ever needed.

// A custom property can't reference itself (var(--font-body) set back onto
// --font-body on the same element is an invalid cycle), so each switcher's
// baseline entry uses this sentinel and clears the inline override instead
// of setting it, letting layout.tsx's next/font class take back over cleanly.
const RESET = "__reset__";

// Same candidate pool for both roles — nothing here references --font-display
// or --font-body itself (see globals.css), so it's safe to point either
// switcher at any of these without risking the same-element cycle bug.
const SHARED_CANDIDATES = [
  { label: "Orbitron", value: "var(--font-orbitron)" },
  { label: "Space Mono", value: "var(--font-space-mono)" },
  { label: "Blanka*", value: "var(--font-blanka)" },
  { label: "Anurati*", value: "var(--font-anurati)" },
  { label: "Conthrax*", value: "var(--font-conthrax)" },
  { label: "IBM Plex Serif", value: "var(--font-plex-serif)" },
];

function FontRoleSwitcher({
  roleLabel,
  cssVar,
  baselineLabel,
}: {
  roleLabel: string;
  cssVar: "--font-display" | "--font-body";
  baselineLabel: string;
}) {
  const candidates = [{ label: baselineLabel, value: RESET }, ...SHARED_CANDIDATES];
  const [active, setActive] = useState(candidates[0].value);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span>{roleLabel}:</span>
      <select
        value={active}
        onChange={(e) => {
          const value = e.target.value;
          setActive(value);
          if (value === RESET) {
            document.documentElement.style.removeProperty(cssVar);
          } else {
            document.documentElement.style.setProperty(cssVar, value);
          }
        }}
        style={{ background: "#111", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
      >
        {candidates.map((c) => (
          <option key={c.label} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FontLab() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        right: 12,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        borderRadius: 6,
        background: "#000",
        color: "#fff",
        padding: "8px 10px",
        fontFamily: "monospace",
        fontSize: 12,
      }}
    >
      <FontRoleSwitcher
        roleLabel="titles/subtitles"
        cssVar="--font-display"
        baselineLabel="Conthrax (current)"
      />
      <FontRoleSwitcher
        roleLabel="body text"
        cssVar="--font-body"
        baselineLabel="Inter (current)"
      />
      <span style={{ opacity: 0.6 }}>* needs font file in public/fonts/</span>
    </div>
  );
}
