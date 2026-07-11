import Link from "next/link";

const spokes = [
  {
    slug: "swe",
    label: "Software Engineering",
    blurb: "Systems, tools, and full-stack builds — including 'build your own X' deep dives and AI-integrated projects like RAG pipelines and GPT-powered features.",
  },
  {
    slug: "cp",
    label: "Competitive Programming",
    blurb: "Live Codeforces / LeetCode stats, contest history, and problem-solving notes.",
  },
  {
    slug: "ml",
    label: "Machine Learning",
    blurb: "Trained models, from-scratch experiments, and deployed demos.",
  },
  {
    slug: "embedded-robotics",
    label: "Embedded Systems & Robotics",
    blurb: "Firmware, wiring diagrams, and physical builds, with live telemetry where possible.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <p className="font-mono text-sm uppercase tracking-widest text-circuit">
        2026 build log
      </p>
      <h1 className="mt-3 font-display text-5xl leading-tight text-ink">
        Leonel — Electronic Portfolio
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink/70">
        Four cores, one build year. Each section below is a working system,
        not a screenshot.
      </p>

      <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2">
        {spokes.map((s) => (
          <Link
            key={s.slug}
            href={`/spokes/${s.slug}`}
            className="group bg-paper p-6 transition-colors hover:bg-ink hover:text-paper"
          >
            <h2 className="font-display text-xl">{s.label}</h2>
            <p className="mt-2 text-sm text-ink/60 group-hover:text-paper/70">
              {s.blurb}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
