import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import ProjectGalleryCard from "@/components/ProjectGalleryCard";
import SocialLinks from "@/components/SocialLinks";
import { SWE_PROJECTS } from "@/lib/swe-projects";

const CORE_STACK = ["Swift", "SwiftUI", "Python", "FastAPI", "C++", "C", "Dart"];

export default function SoftwareEngineeringPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16">
      <BackToHubButton />

      <GlassPanel>
        <p className="font-mono text-sm uppercase tracking-widest text-signal">
          Spoke: Software Engineering
        </p>
        <h1 className="mt-3 font-display text-4xl text-paper">Software Engineering</h1>
        <p className="mt-6 text-paper/80">
          Academic projects with partner companies, hackathons side apps, personal projects + LLM-powered features,
          core infrastructure projects to learn large-scale distributed systems
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

        <div className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
            Project highlights
          </p>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            {SWE_PROJECTS.map((project) => (
              <ProjectGalleryCard
                key={project.slug}
                project={project}
                href={`/spokes/swe/projects/${project.slug}`}
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
