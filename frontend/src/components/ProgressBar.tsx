type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
};

// Shared completion indicator, used identically on the hub and every spoke —
// no more per-page variant (gold vs. cyan) now that both share one palette
// (see CLAUDE.md). Value is hand-set per project/problem in its data file —
// this component only renders whatever's there.
export default function ProgressBar({ value, label = "Completion", className = "" }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div className={className}>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#8FD8DE]/70">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00FF55] shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
