import RoboticsBackground from "@/components/RoboticsBackground";

export default function EmbeddedRoboticsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RoboticsBackground />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <div
          className="w-full rounded-lg border border-white/10 p-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10"
          style={{ backgroundColor: "rgba(15, 18, 30, 0.28)" }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-signal">
            Spoke: Embedded Systems &amp; Robotics
          </p>
          <h1 className="mt-3 font-display text-4xl text-paper">
            Embedded Systems &amp; Robotics
          </h1>
          <p className="mt-6 text-paper/80">
            Deep space embedded mission control. View firmware code and live
            telemetry data where possible. Look for the Pixar references.
          </p>
        </div>
      </div>
    </main>
  );
}
