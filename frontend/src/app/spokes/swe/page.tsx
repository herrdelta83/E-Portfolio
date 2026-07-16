"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MinecraftBackground from "@/components/MinecraftBackground";
import RetroClock from "@/components/RetroClock";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import { SWE_PROJECTS } from "@/lib/swe-projects";

const CORE_STACK = ["Swift", "SwiftUI", "Python", "FastAPI", "C++", "C", "Dart"];

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
            {SWE_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/spokes/swe/projects/${project.slug}`}
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
