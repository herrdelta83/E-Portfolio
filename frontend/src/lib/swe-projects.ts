export type SweProject = {
  slug: string;
  name: string;
  stack: string;
  blurb: string;
  // Recruiter-checklist fields (see README.md "Overall Projects" — Universal + SWE).
  // Placeholders below get replaced with the real thing in the next pass.
  architecture: string;
  tradeoffs: string[];
  ciStatus: string;
  realUsers: string;
  liveDemoUrl?: string;
  repoUrl?: string;
  // 0-100, hand-set by you as work actually progresses — not inferred from
  // anything else here. Bump it whenever you touch the project.
  completion: number;
};

export const SWE_PROJECTS: SweProject[] = [
  {
    slug: "medical-brigade-data-capture",
    name: "Medical Brigade Data Capture",
    stack: "Swift · SwiftUI",
    blurb:
      "Offline-first iOS app built for an NGO running rural medical brigades. Field staff capture patient intake, vitals, and treatment notes on-site with no connectivity, then sync to a central record once back online — replacing paper charts that used to go missing between clinics.",
    architecture:
      "TODO — outline the offline-first sync architecture: local persistence layer, conflict resolution on reconnect, and why that approach won over a naive last-write-wins sync.",
    tradeoffs: [
      "TODO — local-first storage choice vs. a thin client hitting a remote API directly",
      "TODO — conflict resolution strategy when two field devices sync the same patient record",
    ],
    ciStatus: "TODO — add CI badge (build + test status)",
    realUsers: "TODO — brigade staff count / clinics using it, if shareable",
    completion: 80,
  },
  {
    slug: "isp-network-optimization-suite",
    name: "ISP Network Optimization Suite",
    stack: "C++ · C · Python · FastAPI · SonarQube",
    blurb:
      "Internet service optimization system pairing latency-sensitive C++/C routing and diagnostics with a Python/FastAPI control layer. SonarQube gates every merge on unit test coverage and static analysis, catching regressions in the packet-handling core before they reach a live link.",
    architecture:
      "TODO — outline the C++/C packet-handling core vs. the Python/FastAPI control-plane split, and why performance-critical paths live outside the control layer.",
    tradeoffs: [
      "TODO — C++ core vs. an all-Python implementation (latency budget)",
      "TODO — SonarQube gate strictness vs. shipping velocity",
    ],
    ciStatus: "TODO — add CI badge (SonarQube gate + test status)",
    realUsers: "TODO — deployment scale / link count, if shareable",
    completion: 100,
  },
  {
    slug: "seitrc-workshop-platform",
    name: "SEITC Workshop Platform",
    stack: "FastAPI · React + TypesScript · PostgreSQL · Docker Compose",
    blurb:
      "SEITC's Build a Portfolio and LeetCode & DSA 101 workshops. Handles sign-ups, tracks student progress against the NeetCode roadmap, and ranks practice activity on a leaderboard.",
    architecture:
      "TODO — outline the architecture and the key decision that shaped it.",
    tradeoffs: [
      "TODO — the main tradeoff you made and why you'd make it again (or wouldn't)",
    ],
    ciStatus: "TODO — add CI badge (build + test status)",
    realUsers: "TODO — who's actually using it, if shareable",
    completion: 0,
  },
  {
    slug: "physics-rigid-body-engine",
    name: "Physics / Rigid-Body Engine",
    stack: "C++",
    blurb:
      "A small 2D/3D physics engine from scratch — collision detection (SAT or GJK), constraint solving, and multiplen integrators (Euler, RK4, semi-implicit) with a benchmark comparing energy drift/stability across methods.",
    architecture:
      "TODO — outline the offline-first sync architecture: local persistence layer, conflict resolution on reconnect, and why that approach won over a naive last-write-wins sync.",
    tradeoffs: [
      "TODO — local-first storage choice vs. a thin client hitting a remote API directly",
    ],
    ciStatus: "TODO — add CI badge (build + test status)",
    realUsers: "TODO — brigade staff count / clinics using it, if shareable",
    completion: 0,
  },
];

export function getSweProject(slug: string): SweProject | undefined {
  return SWE_PROJECTS.find((p) => p.slug === slug);
}
