import MLBackground from "@/components/MLBackground";
import BackToHubButton from "@/components/BackToHubButton";

export default function MachineLearningPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <MLBackground />
      <BackToHubButton />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <div
          className="w-full rounded-lg border border-white/10 p-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10"
          style={{ backgroundColor: "rgba(15, 18, 30, 0.28)" }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-signal">
            Spoke: Machine Learning
          </p>
          <h1 className="mt-3 font-display text-4xl text-paper">Machine Learning</h1>
          <p className="mt-6 text-paper/80">
            Automated ML lab environment. Vision-guided robot manipulator. View
            trained models, scratch experiments, and demos.
          </p>
        </div>
      </div>
    </main>
  );
}
