"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatorGeneralProvider, Animator, Animated, FrameOctagon } from "@arwes/react";
import CircuitHUD, {
  CIRCUIT_BUILD_DURATION,
  CIRCUIT_CYAN,
  CIRCUIT_GREEN,
} from "@/components/CircuitHUD";
import ProgressBar from "@/components/ProgressBar";
import { SWE_PROJECTS } from "@/lib/swe-projects";
import { ML_PROJECTS } from "@/lib/ml-projects";
import { ROBOTICS_PROJECTS } from "@/lib/robotics-projects";
import { NOTABLE_PROBLEMS } from "@/lib/cp-problems";

function averageCompletion(items: { completion: number }[]): number {
  if (items.length === 0) return 0;
  return Math.round(items.reduce((sum, item) => sum + item.completion, 0) / items.length);
}

// Aggregate build progress per spoke, hand-set upstream in each project's own
// data file (src/lib/*-projects.ts) — this just averages whatever's there.
const SPOKE_PROGRESS: Record<string, number> = {
  swe: averageCompletion(SWE_PROJECTS),
  cp: averageCompletion(NOTABLE_PROBLEMS),
  ml: averageCompletion(ML_PROJECTS),
  "embedded-robotics": averageCompletion(ROBOTICS_PROJECTS),
};

const spokes = [
  {
    slug: "swe",
    label: "Software Engineering",
    blurb: "Systems, tools, and full-stack builds — including 'build your own X' deep dives and AI-integrated projects like RAG pipelines and GPT-powered features.",
    image: "/images/desktop/hub-swe.webp",
  },
  {
    slug: "cp",
    label: "Competitive Programming",
    blurb: "Live Codeforces / LeetCode stats, contest history, and problem-solving notes.",
    image: "/images/desktop/hub-cp.webp",
  },
  {
    slug: "ml",
    label: "Machine Learning",
    blurb: "Trained models, from-scratch experiments, and deployed demos.",
    image: "/images/desktop/hub-ml.webp",
  },
  {
    slug: "embedded-robotics",
    label: "Embedded Systems & Robotics",
    blurb: "Firmware, wiring diagrams, and physical builds, with live telemetry where possible.",
    image: "/images/desktop/hub-robotics.webp",
  },
];

const framePanelStyle = {
  "--arwes-frames-line-color": CIRCUIT_CYAN,
  "--arwes-frames-bg-color": "rgba(9,51,58,0.25)",
} as CSSProperties;

const frameImageStyle = {
  "--arwes-frames-line-color": CIRCUIT_GREEN,
  "--arwes-frames-bg-color": "rgba(2,17,20,0.6)",
} as CSSProperties;

function SpokeQuadrant({ spoke }: { spoke: (typeof spokes)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/spokes/${spoke.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-4 p-5"
    >
      <Animated
        className="absolute inset-0 transition-[filter] duration-300 ease-out"
        hideOnExited={false}
        style={{
          filter: hovered
            ? `drop-shadow(0 0 4px ${CIRCUIT_CYAN}) drop-shadow(0 0 12px ${CIRCUIT_CYAN})`
            : "none",
        }}
      >
        <FrameOctagon style={framePanelStyle} strokeWidth={hovered ? 2.5 : 1.5} squareSize={14} />
      </Animated>

      <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
        <FrameOctagon style={frameImageStyle} strokeWidth={1} squareSize={8} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={spoke.image} alt="" className="relative h-full w-full object-contain p-2" />
      </div>

      <div className="relative min-w-0 flex-1">
        <h2 className="font-display text-lg text-[#E8FEFF]">{spoke.label}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#8FD8DE]/80 group-hover:text-[#E8FEFF]">
          {spoke.blurb}
        </p>
        <ProgressBar
          value={SPOKE_PROGRESS[spoke.slug] ?? 0}
          label="Build progress"
          variant="cyan"
          className="mt-3"
        />
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <AnimatorGeneralProvider duration={{ enter: CIRCUIT_BUILD_DURATION, exit: 1 }}>
      <Animator root active manager="stagger">
        <CircuitHUD />

        <main className="relative mx-auto max-w-6xl px-6 py-16">
          {/* header bar */}
          <Animator>
            <Animated className="relative mb-10 px-6 py-5" hideOnExited={false}>
              <FrameOctagon style={framePanelStyle} strokeWidth={1.5} squareSize={18} />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00F0FF]">
                    2026 build log
                  </p>
                  <h1 className="mt-2 font-display text-3xl text-[#E8FEFF] sm:text-4xl">
                    Leonel — Electronic Portfolio
                  </h1>
                </div>
                <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF55] sm:flex">
                  Online
                  <span className="circuit-node-pulse h-2 w-2 rounded-full bg-[#00FF55]" style={{ filter: "drop-shadow(0 0 5px #00FF55)" }} />
                </div>
              </div>
            </Animated>
          </Animator>

          <Animator>
            <Animated as="p" className="mb-10 max-w-xl text-sm text-[#8FD8DE]/80" animated={["fade"]}>
              Four cores, one build year. Each section below is a working system,
              not a screenshot.
            </Animated>
          </Animator>

          {/* 2x2 grid, wrapped in one outer frame */}
          <Animator>
            <Animated className="relative" hideOnExited={false}>
              <FrameOctagon style={framePanelStyle} strokeWidth={1.5} squareSize={18} />
              <Animator manager="stagger">
                <div className="relative grid divide-y divide-[#00F0FF]/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  {spokes.map((s) => (
                    <Animator key={s.slug}>
                      <SpokeQuadrant spoke={s} />
                    </Animator>
                  ))}
                </div>
              </Animator>
            </Animated>
          </Animator>
        </main>
      </Animator>
    </AnimatorGeneralProvider>
  );
}
