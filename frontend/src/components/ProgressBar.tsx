type ProgressBarProps = {
  value: number;
  label?: string;
  variant?: "signal" | "cyan";
  className?: string;
};

const VARIANT_STYLES: Record<NonNullable<ProgressBarProps["variant"]>, string> = {
  signal: "from-signal to-circuit shadow-[0_0_8px_rgba(212,166,87,0.6)]",
  cyan: "from-[#00F0FF] to-[#00FF55] shadow-[0_0_8px_rgba(0,240,255,0.6)]",
};

const VARIANT_TEXT: Record<NonNullable<ProgressBarProps["variant"]>, string> = {
  signal: "text-paper/50",
  cyan: "text-[#8FD8DE]/70",
};

// Shared completion indicator: gold/circuit gradient on spoke pages, cyan/green
// on the hub (see CLAUDE.md — hub keeps its own cyan/void palette, spokes use
// signal gold). Value is hand-set per project/problem in its data file — this
// component only renders whatever's there.
export default function ProgressBar({
  value,
  label = "Completion",
  variant = "signal",
  className = "",
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div className={className}>
      <div className={`flex items-center justify-between font-mono text-[10px] uppercase tracking-widest ${VARIANT_TEXT[variant]}`}>
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-[width] duration-700 ease-out ${VARIANT_STYLES[variant]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
