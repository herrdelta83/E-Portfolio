export type NotableProblem = {
  slug: string;
  name: string;
  source: string;
  blurb: string;
  // Recruiter-checklist field (see README.md "Overall Projects" — Competitive
  // Programming): algorithmic knowledge applied to a real problem, not a
  // leetcode-solutions dump. Everything here is a placeholder — swap in your
  // real problem(s) and fill these in.
  approach: string;
  complexity: string;
  whyInteresting: string;
  problemUrl?: string;
  submissionUrl?: string;
};

export const NOTABLE_PROBLEMS: NotableProblem[] = [
  {
    slug: "untitled-problem-1",
    name: "TODO — name your first notable problem",
    source: "TODO — e.g. Codeforces 1234A, or an ICPC Regional 2025 problem",
    blurb: "TODO — what the problem asks, and why it's not a routine one.",
    approach:
      "TODO — the actual algorithmic reasoning: why this approach works, not just the name of the technique.",
    complexity: "TODO — time/space complexity analysis.",
    whyInteresting:
      "TODO — what makes this worth featuring over the rest of the problems you've solved.",
  },
];

export function getNotableProblem(slug: string): NotableProblem | undefined {
  return NOTABLE_PROBLEMS.find((p) => p.slug === slug);
}
