export type MlProject = {
  slug: string;
  name: string;
  stack: string;
  blurb: string;
  // Recruiter-checklist fields (see README.md "Overall Projects" — Universal + ML/Data Science).
  // Everything here is a placeholder — swap in your real project(s) and fill these in.
  evaluation: string;
  dataHandling: string;
  plotNote: string;
  ciStatus: string;
  liveDemoUrl?: string;
  repoUrl?: string;
};

export const ML_PROJECTS: MlProject[] = [
  {
    slug: "untitled-project-1",
    name: "TODO — name your first ML project",
    stack: "TODO — e.g. PyTorch · scikit-learn",
    blurb:
      "TODO — one paragraph: what the model does, what problem it solves, and why it's scoped the way it is.",
    evaluation:
      "TODO — metrics table, baseline comparison, and error analysis. Evaluation shown, not just training.",
    dataHandling:
      "TODO — cleaning steps, leakage checks, train/val/test splits made explicit.",
    plotNote:
      "TODO — a real plot: loss curve, confusion matrix, or forecast vs. actual. Not a paragraph of claims.",
    ciStatus: "TODO — add CI badge (build + test status)",
  },
];

export function getMlProject(slug: string): MlProject | undefined {
  return ML_PROJECTS.find((p) => p.slug === slug);
}
