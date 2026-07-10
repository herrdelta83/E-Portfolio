import MLBackground from "@/components/MLBackground";

export default function MachineLearningPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <MLBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-24">
        <p className="font-mono text-sm uppercase tracking-widest text-signal">
          Spoke: Machine Learning
        </p>
        <h1 className="mt-3 font-display text-4xl text-paper">Machine Learning</h1>
        <p className="mt-6 text-paper/80">
          Automated ML lab environment. Vision-guided robot manipulator. View
          trained models, scratch experiments, and demos.
        </p>
      </div>
    </main>
  );
}
