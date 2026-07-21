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
  // 0-100 — for a problem write-up this tracks how polished the writeup
  // itself is (statement, approach, complexity), not the problem's difficulty.
  completion: number;
};

export const NOTABLE_PROBLEMS: NotableProblem[] = [
  {
    slug: "leetcode-solutions-dump",
    name: "Leetcode Solutions Dump",
    source: "C++ · Python · Java",
    blurb: "2026 - 2027",
    approach:
      "Algorithmic reasoning: why this approach works, not just the name of the technique. The Goal is 300 problems for 2026.",
    complexity: "Time/space complexity analysis Big O.",
    whyInteresting:
      "Code interviews are a real-world application of algorithmic knowledge. This is a placeholder,swap in your real problem(s) and fill these in.",
    problemUrl: "https://leetcode.com/problemset/all/",
    submissionUrl: "https://github.com/herrdelta83/Leetcode-Solutions-Mine-.git",
    completion: 2.6,
  },
  {
    slug: "codeforces-rounds-dump",
    name: "Codeforces Rounds Dump",
    source: "C++ · Python · Java",
    blurb: "2026 - 2027",
    approach: 
      "Aiming to reach 1000 rating, implementing Brute force, Sorting, String manipulation, Basic number theory, Time complexity, and STL Basics",
    complexity: "Time/space complexity analysis Big O.",
    whyInteresting: "Codeforces rounds are a real-world application of algorithmic knowledge.",
    problemUrl: "https://codeforces.com/problemset",
    submissionUrl: "https://github.com/herrdelta83/Codeforces-Sumbissions-Mine.git",
    completion: 0,
  },
];

export function getNotableProblem(slug: string): NotableProblem | undefined {
  return NOTABLE_PROBLEMS.find((p) => p.slug === slug);
}
