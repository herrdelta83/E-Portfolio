import MLBackground from "@/components/MLBackground";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";

export default function MachineLearningPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <MLBackground />
      <BackToHubButton />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <GlassPanel>
          <p className="font-mono text-sm uppercase tracking-widest text-signal">
            Spoke: Machine Learning
          </p>
          <h1 className="mt-3 font-display text-4xl text-paper">Machine Learning</h1>
          <p className="mt-6 text-paper/80">
            Automated ML lab environment. Vision-guided robot manipulator. View
            trained models, scratch experiments, and demos.
          </p>
        </GlassPanel>
      </div>
    </main>
  );
}
