import CPBackground from "@/components/CPBackground";

export default function CompetitiveProgrammingPage() {
  return (
    /* 1. Force main wrapper to span 100% viewport width and height, removing limits */
    <main className="min-h-screen w-full overflow-hidden">
      {/* 2. Relative frame that perfectly sizes with CPBackground's breakout rules */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Render our canvas-scaled artwork background here */}
        <CPBackground />

        {/* 3. Text Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-start p-8 sm:p-12 z-20 pointer-events-none">
          <div className="pointer-events-auto max-w-md backdrop-blur-sm bg-black/10 p-2 py-2 font-mono text-xs uppercase tracking-widest text-paper/50">
            Spoke: Competitive Programming
          </div>
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
