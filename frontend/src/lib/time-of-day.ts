export type DayPhase = "day" | "dusk";

export function getDayPhase(now: Date): DayPhase {
  const hour = now.getHours() + now.getMinutes() / 60;
  return hour >= 6 && hour < 18 ? "day" : "dusk";
}
