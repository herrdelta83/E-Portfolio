import { notFound } from "next/navigation";
import Link from "next/link";
import CPBackground from "@/components/CPBackground";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import ProgressBar from "@/components/ProgressBar";
import { NOTABLE_PROBLEMS, getNotableProblem } from "@/lib/cp-problems";

export function generateStaticParams() {
  return NOTABLE_PROBLEMS.map((p) => ({ slug: p.slug }));
}

export default async function CpProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getNotableProblem(slug);

  if (!problem) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <CPBackground />
      <BackToHubButton />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <GlassPanel>
          <Link
            href="/spokes/cp"
            className="font-mono text-xs uppercase tracking-widest text-signal/70 hover:text-signal"
          >
            ← Competitive Programming
          </Link>

          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="font-display text-3xl text-paper sm:text-4xl">{problem.name}</h1>
            <p className="font-mono text-xs uppercase tracking-wider text-signal">{problem.source}</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <section>
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Overview</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{problem.blurb}</p>
              </section>

              <section>
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Approach</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{problem.approach}</p>
              </section>

              <section>
                <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
                  Why it&apos;s interesting
                </p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{problem.whyInteresting}</p>
              </section>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <ProgressBar value={problem.completion} />
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
                  Complexity
                </p>
                <p className="mt-1.5 text-sm text-paper/75">{problem.complexity}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Links</p>
                <div className="mt-1.5 flex flex-col gap-1 text-sm">
                  {problem.problemUrl ? (
                    <a href={problem.problemUrl} className="text-paper/75 underline hover:text-paper">
                      Problem statements
                    </a>
                  ) : (
                    <span className="text-paper/40">Problem statement — TODO</span>
                  )}
                  {problem.submissionUrl ? (
                    <a href={problem.submissionUrl} className="text-paper/75 underline hover:text-paper">
                      Accepted submissions
                    </a>
                  ) : (
                    <span className="text-paper/40">Accepted submission — TODO</span>
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
