import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import ProjectGalleryCard from "@/components/ProjectGalleryCard";
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

        <div className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
            Project highlights
          </p>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            {ROBOTICS_PROJECTS.map((project) => (
              <ProjectGalleryCard
                key={project.slug}
                project={project}
                href={`/spokes/embedded-robotics/projects/${project.slug}`}
              />
            ))}
          </div>
        </div>
      </GlassPanel>

      <div className="mt-10">
        <SocialLinks />
      </div>
    </main>
  );
}
