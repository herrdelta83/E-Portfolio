"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getDayPhase, type DayPhase } from "@/lib/time-of-day";

const SKY: Record<DayPhase, string> = {
  day: "/images/desktop/sky1.svg",
  dusk: "/images/desktop/sky2.svg",
};

// Shared crop anchor for every layer — keeps sky/sun/terrain pixel-aligned
// on viewports wider or narrower than the artwork's native 16:9.
const FRAME_POSITION = "50% 42%";
const LAYER_CLASS = "absolute inset-0 h-full w-full object-cover";
const layerStyle = { objectPosition: FRAME_POSITION };
// Terrain art reads slightly squashed at this crop — stretch it wider only;
// scaleX breaks aspect on purpose, overflow is clipped by the parent's overflow-hidden.
const terrainStyle = { ...layerStyle, transform: "scaleX(1.08)" };

const SUN_Y: Record<DayPhase, string> = {
  day: "-12%",
  dusk: "6%",
};

// Ambient warm grade + haze, held (not just flashed) for as long as the phase lasts.
const HAZE_OPACITY: Record<DayPhase, number> = {
  day: 0.08,
  dusk: 0.55,
};

const TRANSITION = { duration: 2, ease: "easeInOut" as const };

const TORCHES = [
  { x: "23%", y: "65.5%" },
  { x: "29.2%", y: "55.5%" },
  { x: "45.6%", y: "76.5%" },
  { x: "57.9%", y: "76.5%" },
  { x: "66.2%", y: "88.5%" },
  { x: "82.5%", y: "61%" },
];

export default function MinecraftBackground({ now }: { now: Date }) {
  const phase = getDayPhase(now);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* sky layer — crossfades between day and dusk */}
      <AnimatePresence>
        <motion.img
          key={phase}
          src={SKY[phase]}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION}
          className={LAYER_CLASS}
          style={layerStyle}
        />
      </AnimatePresence>

      {/* sun — same disc, only translated (never scaled) between phases so it stays at native resolution */}
      <motion.img
        src="/images/desktop/sun.svg"
        alt=""
        aria-hidden="true"
        animate={{ y: SUN_Y[phase] }}
        transition={TRANSITION}
        className={LAYER_CLASS}
        style={layerStyle}
      />

      {/* terrain — static foreground: ground, trees, torches, temple */}
      <img
        src="/images/desktop/terrain.svg"
        alt="Minecraft landscape at the current time of day"
        className={LAYER_CLASS}
        style={terrainStyle}
      />

      {/* persistent warm sunset grade + atmospheric haze, held for the duration of the phase */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(255,170,110,0.9), transparent 60%), linear-gradient(180deg, rgba(120,70,110,0.25) 0%, rgba(40,20,50,0.35) 100%)",
        }}
        animate={{ opacity: HAZE_OPACITY[phase] }}
        transition={TRANSITION}
      />

      {/* torch glow — soft additive bloom over the terrain's torch positions */}
      <div className="pointer-events-none absolute inset-0" style={{ mixBlendMode: "screen" }}>
        {TORCHES.map((t, i) => (
          <motion.div
            key={i}
            className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: t.x,
              top: t.y,
              background: "radial-gradient(circle, rgba(255,170,80,0.9), transparent 70%)",
            }}
            animate={{
              opacity: phase === "dusk" ? [0.5, 0.85, 0.5] : 0,
            }}
            transition={{
              opacity:
                phase === "dusk"
                  ? { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                  : TRANSITION,
            }}
          />
        ))}
      </div>
    </div>
  );
}
