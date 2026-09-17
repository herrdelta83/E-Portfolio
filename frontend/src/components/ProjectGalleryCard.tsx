import Link from "next/link";
import ProgressBar from "./ProgressBar";

// Shared card for the SWE/ML/Robotics project galleries (CP's "Notable
// problems" list is a different shape and isn't part of this). Same
// glass-type styling as the old stacked list — border/bg/signal-hover
// colors unchanged — just laid out in a grid with a preview thumbnail added
// on top. `previewGif` is optional per-project; omit it and the card shows
// a "Loading…" placeholder instead of a broken/missing image.
type GalleryProject = {
  slug: string;
  name: string;
  stack: string;
  blurb: string;
  completion: number;
  previewGif?: string;
};

export default function ProjectGalleryCard({
  project,
  href,
}: {
  project: GalleryProject;
  href: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex flex-col overflow-hidden rounded-md border border-white/10 bg-black/20 transition-colors hover:border-signal/50 hover:bg-black/30"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black/40">
        {project.previewGif ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.previewGif} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-paper/40">
            Loading…
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-lg text-paper">{project.name}</h2>
          <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-signal opacity-0 transition-opacity group-hover:opacity-100">
            View →
          </span>
        </div>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-signal">
          {project.stack}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/75">{project.blurb}</p>
        <ProgressBar value={project.completion} className="mt-4" />
      </div>
    </Link>
  );
}
