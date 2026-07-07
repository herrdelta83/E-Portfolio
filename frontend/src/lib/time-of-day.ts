export type DayPhase = "day" | "dusk" | "night";

export function getDayPhase(now: Date): DayPhase {
  const hour = now.getHours() + now.getMinutes() / 60;
  if (hour >= 6 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}
