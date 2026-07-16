import { notFound } from "next/navigation";
import { SWE_PROJECTS, getSweProject } from "@/lib/swe-projects";
import ProjectDetail from "./ProjectDetail";

export function generateStaticParams() {
  return SWE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function SweProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSweProject(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
