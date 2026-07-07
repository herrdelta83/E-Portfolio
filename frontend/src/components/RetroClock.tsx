"use client";

import { getDayPhase } from "@/lib/time-of-day";

const SUN = [
  "..####..",
  ".######.",
  "########",
  "########",
  "########",
  "########",
  ".######.",
  "..####..",
];

const MOON = [
  "..####..",
  ".##..##.",
  "#......#",
  "#......#",
  "#......#",
  "#......#",
  ".##..##.",
  "..####..",
];

function PixelIcon({ rows, color }: { rows: string[]; color: string }) {
  const px = 3;
  return (
    <div
      className="shrink-0"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${rows[0].length}, ${px}px)`,
        gridTemplateRows: `repeat(${rows.length}, ${px}px)`,
      }}
    >
      {rows.flatMap((row, y) =>
        row.split("").map((cell, x) => (
          <div
            key={`${x}-${y}`}
            style={{ backgroundColor: cell === "#" ? color : "transparent" }}
          />
        ))
      )}
    </div>
  );
}

export default function RetroClock({ now }: { now: Date }) {
  const isNight = getDayPhase(now) === "night";
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  return (
    <div className="fixed right-4 top-4 z-20 sm:right-6 sm:top-6">
      <div
        className="rounded-sm border-2 px-3 py-2 shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
        style={{
          borderColor: "#5b4636",
          background: "linear-gradient(180deg, #2b2320 0%, #1a1512 100%)",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
          Current Time:
        </p>
        <div className="mt-1 flex items-center gap-2">
          <PixelIcon rows={isNight ? MOON : SUN} color={isNight ? "#cbd5f5" : "#ffd24c"} />
          <span className="font-mono text-sm tracking-widest text-paper">
            {hh}:{mm}
          </span>
        </div>
      </div>
    </div>
  );
}
