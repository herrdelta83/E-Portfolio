import { notFound } from "next/navigation";
import Link from "next/link";
import RoboticsBackground from "@/components/RoboticsBackground";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import ProgressBar from "@/components/ProgressBar";
import { ROBOTICS_PROJECTS, getRoboticsProject } from "@/lib/robotics-projects";

export function generateStaticParams() {
  return ROBOTICS_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function RoboticsProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getRoboticsProject(slug);

  if (!project) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <RoboticsBackground />
      <BackToHubButton />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <GlassPanel>
          <Link
            href="/spokes/embedded-robotics"
            className="font-mono text-xs uppercase tracking-widest text-signal/70 hover:text-signal"
          >
            ← Embedded Systems &amp; Robotics
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
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
                  Closed feedback loop
                </p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{project.feedbackLoop}</p>
              </section>

              <section>
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
                  Failure modes
                </p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{project.failureModes}</p>
              </section>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <ProgressBar value={project.completion} />
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
                  Wiring diagram
                </p>
                <p className="mt-1.5 text-sm text-paper/75">{project.wiringDiagram}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">CI/CD</p>
                <p className="mt-1.5 text-sm text-paper/75">{project.ciStatus}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Links</p>
                <div className="mt-1.5 flex flex-col gap-1 text-sm">
                  {project.videoUrl ? (
                    <a href={project.videoUrl} className="text-paper/75 underline hover:text-paper">
                      Video of the system working
                    </a>
                  ) : (
                    <span className="text-paper/40">Video of the system working — TODO</span>
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
