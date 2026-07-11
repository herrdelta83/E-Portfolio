import RoboticsBackground from "@/components/RoboticsBackground";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";

export default function EmbeddedRoboticsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RoboticsBackground />
      <BackToHubButton />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <GlassPanel>
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
        </GlassPanel>
      </div>
    </main>
  );
}
