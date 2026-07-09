import CPBackground from "@/components/CPBackground";
import CPStatsPanel from "@/components/CPStatsPanel";

export default function CompetitiveProgrammingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <CPBackground />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <CPStatsPanel />
      </div>
    </main>
  );
}
