import { notFound } from "next/navigation";
import Link from "next/link";
import MLBackground from "@/components/MLBackground";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import ProgressBar from "@/components/ProgressBar";
import { ML_PROJECTS, getMlProject } from "@/lib/ml-projects";

export function generateStaticParams() {
  return ML_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function MlProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getMlProject(slug);

  if (!project) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <MLBackground />
      <BackToHubButton />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <GlassPanel>
          <Link
            href="/spokes/ml"
            className="font-mono text-xs uppercase tracking-widest text-signal/70 hover:text-signal"
          >
            ← Machine Learning
          </Link>

          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="font-display text-3xl text-paper sm:text-4xl">{project.name}</h1>
            <p className="font-mono text-xs uppercase tracking-wider text-signal">{project.stack}</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <section>
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Overview</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{project.blurb}</p>
              </section>

              <section>
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Evaluation</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{project.evaluation}</p>
              </section>

              <section>
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
                  Data handling
                </p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{project.dataHandling}</p>
              </section>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <ProgressBar value={project.completion} />
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Real plot</p>
                <p className="mt-1.5 text-sm text-paper/75">{project.plotNote}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">CI/CD</p>
                <p className="mt-1.5 text-sm text-paper/75">{project.ciStatus}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Links</p>
                <div className="mt-1.5 flex flex-col gap-1 text-sm">
                  {project.liveDemoUrl ? (
                    <a href={project.liveDemoUrl} className="text-paper/75 underline hover:text-paper">
                      Live demo
                    </a>
                  ) : (
                    <span className="text-paper/40">Live demo — TODO</span>
                  )}
                  {project.repoUrl ? (
                    <a href={project.repoUrl} className="text-paper/75 underline hover:text-paper">
                      Repository
                    </a>
                  ) : (
                    <span className="text-paper/40">Repository — TODO</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
