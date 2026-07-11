"use client";

import { useEffect, useState } from "react";
import MinecraftBackground from "@/components/MinecraftBackground";
import RetroClock from "@/components/RetroClock";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";

const CORE_STACK = ["Swift", "SwiftUI", "Python", "FastAPI", "C++", "C", "Dart"];

const PROJECTS = [
  {
    name: "Medical Brigade Data Capture",
    stack: "Swift · SwiftUI",
    blurb:
      "Offline-first iOS app built for an NGO running rural medical brigades. Field staff capture patient intake, vitals, and treatment notes on-site with no connectivity, then sync to a central record once back online — replacing paper charts that used to go missing between clinics.",
  },
  {
    name: "ISP Network Optimization Suite",
    stack: "C++ · C · Python · FastAPI · SonarQube",
    blurb:
      "Internet service optimization system pairing latency-sensitive C++/C routing and diagnostics with a Python/FastAPI control layer. SonarQube gates every merge on unit test coverage and static analysis, catching regressions in the packet-handling core before they reach a live link.",
  },
];

export default function SoftwareEngineeringPage() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <MinecraftBackground now={now} />
      <RetroClock now={now} />
      <BackToHubButton />

      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <GlassPanel>
          <p className="font-mono text-sm uppercase tracking-widest text-signal">
            Spoke: Software Engineering
          </p>
          <h1 className="mt-3 font-display text-4xl text-paper">Software Engineering</h1>
          <p className="mt-6 text-paper/80">
            Dynamic Minecraft-themed environment with a real-time day/night cycle
            synced to your system clock. Features the flagship project write-up —{" "}
            <span className="font-mono text-paper">/content/case-studies/minecraft-port</span>.
          </p>

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              Core stack
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {CORE_STACK.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-paper"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              Project highlights
            </p>
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="rounded-md border border-white/10 bg-black/20 p-5"
              >
                <h2 className="font-display text-xl text-paper">{project.name}</h2>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                  {project.stack}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">
                  {project.blurb}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
