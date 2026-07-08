"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getDayPhase, type DayPhase } from "@/lib/time-of-day";

const SKY: Record<DayPhase, string> = {
  day: "/images/desktop/sky1.svg",
  dusk: "/images/desktop/sky2.svg",
};

const SUN_POSE: Record<DayPhase, { y: string; scale: number; glow: number }> = {
  day: { y: "-14%", scale: 1, glow: 0.35 },
  dusk: { y: "8%", scale: 1.12, glow: 0.9 },
};

const TRANSITION = { duration: 2, ease: "easeInOut" as const };

export default function MinecraftBackground({ now }: { now: Date }) {
  const phase = getDayPhase(now);
  const sun = SUN_POSE[phase];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* sky layer — crossfades between day and dusk */}
      <AnimatePresence>
        <motion.img
          key={phase}
          src={SKY[phase]}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={TRANSITION}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* discrete glow flash marking the sky handoff */}
      <motion.div
        key={`glow-${phase}`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 62%, rgba(255,196,120,0.8), transparent 55%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.75, 0] }}
        transition={{ duration: 2.2, ease: "easeInOut", times: [0, 0.45, 1] }}
      />

      {/* sun — same disc, repositioned/re-glowed via CSS transform between phases */}
      <motion.img
        src="/images/desktop/sun.svg"
        alt=""
        aria-hidden="true"
        animate={{ y: sun.y, scale: sun.scale, filter: `drop-shadow(0 0 ${sun.glow * 60}px rgba(255,190,110,${sun.glow}))` }}
        transition={TRANSITION}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* terrain — static foreground: ground, trees, torches, temple */}
      <img
        src="/images/desktop/terrain.svg"
        alt="Minecraft landscape at the current time of day"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
