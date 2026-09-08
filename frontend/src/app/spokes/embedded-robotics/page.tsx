import Link from "next/link";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import ProgressBar from "@/components/ProgressBar";
import SocialLinks from "@/components/SocialLinks";
import { ROBOTICS_PROJECTS } from "@/lib/robotics-projects";

export default function EmbeddedRoboticsPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16">
      <BackToHubButton />

      <GlassPanel>
        <p className="font-mono text-sm uppercase tracking-widest text-signal">
          Spoke: Embedded Systems &amp; Robotics
        </p>
        <h1 className="mt-3 font-display text-4xl text-paper">
          Embedded Systems &amp; Robotics
        </h1>
        <p className="mt-6 text-paper/80">
          Firmware, wiring diagrams, and physical builds, with live telemetry
          where possible.
        </p>

        <div className="mt-10 space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
            Project highlights
          </p>
          {ROBOTICS_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/spokes/embedded-robotics/projects/${project.slug}`}
              prefetch={false}
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
              <ProgressBar value={project.completion} className="mt-4" />
            </Link>
          ))}
        </div>
      </GlassPanel>

      <div className="mt-10">
        <SocialLinks />
      </div>
    </main>
  );
}
