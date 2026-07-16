import Link from "next/link";
import MLBackground from "@/components/MLBackground";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import { ML_PROJECTS } from "@/lib/ml-projects";

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

          <div className="mt-10 space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              Project highlights
            </p>
            {ML_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/spokes/ml/projects/${project.slug}`}
                className="group block rounded-md border border-white/10 bg-black/20 p-5 transition-colors hover:border-signal/50 hover:bg-black/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-xl text-paper">{project.name}</h2>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    View →
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                  {project.stack}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">
                  {project.blurb}
                </p>
              </Link>
            ))}
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
