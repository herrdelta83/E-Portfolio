"use client";

import ResponsiveImage from "@/components/responsive-image";
import { getDayPhase, type DayPhase } from "@/lib/time-of-day";

const SCENES: Record<DayPhase, string> = {
  day: "minecraft-day.webp",
  dusk: "minecraft-dusk.webp",
  night: "minecraft-night.webp",
};

export default function MinecraftBackground({ now }: { now: Date }) {
  const phase = getDayPhase(now);

  return (
    <div className="fixed inset-0 -z-10">
      <ResponsiveImage
        name={SCENES[phase]}
        alt="Minecraft landscape at the current time of day"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
