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
  // 0-100, hand-set by you as work actually progresses.
  completion: number;
};

export const ML_PROJECTS: MlProject[] = [
  {
    slug: "household-finance-forecasting-tool",
    name: "Household finance forecasting tool",
    stack: "Python · PyTorch · scikit-learn · FastAPI",
    blurb:
      "A time-series forecasting tool (NOT a budgeting app) that projects cash flow, flags spending anomalies, and simulates what-if scenarios using your own real spending data.",
    evaluation:
      "TODO — metrics table, baseline comparison, and error analysis. Evaluation shown, not just training.",
    dataHandling:
      "TODO — cleaning steps, leakage checks, train/val/test splits made explicit.",
    plotNote:
      "TODO — a real plot: loss curve, confusion matrix, or forecast vs. actual. Not a paragraph of claims.",
    ciStatus: "TODO — add CI badge (build + test status)",
    liveDemoUrl: "https://demo.example.com/household-finance-forecasting-tool",
    repoUrl: "https://github.com/herrdelta83/Household-finance-forecasting-tool.git",
    completion: 0,
  },
  {
    slug: "competitive-programming-analytics",
    name: "Competitive Programming Analytics",
    stack: "Python · PyTorch · scikit-learn · FastAPI",
    blurb:
      "Reads your own Codeforces/LeetCode history via API, flags weak topic areas, predicts rating trajectory, and suggests a practice schedule.",
    evaluation:
      "TODO — metrics table, baseline comparison, and error analysis. Evaluation shown, not just training.",
    dataHandling:
      "TODO — cleaning steps, leakage checks, train/val/test splits made explicit.",
    plotNote:
      "TODO — a real plot: loss curve, confusion matrix, or forecast vs. actual. Not a paragraph of claims.",
    ciStatus: "TODO — add CI badge (build + test status)",
    liveDemoUrl: "https://demo.example.com/competitive-programming-analytics",
    repoUrl: "https://github.com/herrdelta83/Competitive-Programming-Analytics.git",
    completion: 0,
  },
];

export function getMlProject(slug: string): MlProject | undefined {
  return ML_PROJECTS.find((p) => p.slug === slug);
}
