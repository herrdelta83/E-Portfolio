import CPBackground from "@/components/CPBackground";

export default function CompetitiveProgrammingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <div className="relative overflow-hidden rounded-lg shadow-xl">
        <CPBackground />

        <div className="absolute inset-0 flex flex-col justify-start p-8 sm:p-10">
          <p className="font-mono text-sm uppercase tracking-widest text-signal">
            Spoke: Competitive Programming
          </p>
          <h1 className="mt-3 font-display text-4xl text-paper">Competitive Programming</h1>
          <p className="mt-6 max-w-sm text-paper/80">
            ICPC-themed dashboard. Live Codeforces/LeetCode statistics. View
            recent contest history and problem notes.
          </p>
        </div>
      </div>
    </main>
  );
}
