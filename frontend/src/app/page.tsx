"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatorGeneralProvider, Animator, Animated, FrameOctagon } from "@arwes/react";
import { CIRCUIT_CYAN, CIRCUIT_GREEN } from "@/components/CircuitHUD";
import ProgressBar from "@/components/ProgressBar";
import SocialLinks from "@/components/SocialLinks";
import { SWE_PROJECTS } from "@/lib/swe-projects";
import { ML_PROJECTS } from "@/lib/ml-projects";
import { ROBOTICS_PROJECTS } from "@/lib/robotics-projects";
import { NOTABLE_PROBLEMS } from "@/lib/cp-problems";

// CircuitHUD itself now lives in layout.tsx (persistent, one mount for the
// whole session) — this page only owns its own content's reveal (header,
// grid, marquee), independent of the board's own build-in timing.
// SHELL_REVEAL_DURATION for the title bar and the outer frame wrapping the
// whole 2x2 grid; SPOKE_REVEAL_DURATION for each individual spoke quadrant's
// own frame, inside that shell.
const SHELL_REVEAL_DURATION = 0.4;
const SPOKE_REVEAL_DURATION = 0.6;
const SPOKE_STAGGER = 0;
// Gap before spokes start entering at all, on top of SHELL_REVEAL_DURATION —
// Arwes's own term for this is duration.delay (not to be confused with
// duration.stagger, which only spaces sibling spokes apart from each other).
const SPOKE_REVEAL_DELAY = 0;
// Spacing between the root's own top-level siblings — header, intro line,
// and the outer grid frame — before each one is told to start entering.
// Was previously left at Arwes's built-in default (0.04s); now explicit here
// so it's tunable alongside SPOKE_STAGGER instead of hidden.
const SHELL_STAGGER = 0;

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
    blurb: "Academic projects with partner companies, hackathons side apps, personal projects + LLM-powered features, core infrastructure projects to learn large-scale distributed systems",
    image: "/images/desktop/RotatingCube.gif",
  },
  {
    slug: "cp",
    label: "Competitive Programming",
    blurb: "Live Codeforces / LeetCode stats, contest history, and problem-solving notes.",
    image: "/images/desktop/RotatingComp.gif",
  },
  {
    slug: "ml",
    label: "Machine Learning",
    blurb: "Trained models, from-scratch experiments, and deployed demos.",
    image: "/images/desktop/Graph3D.gif",
  },
  {
    slug: "embedded-robotics",
    label: "Embedded Systems & Robotics",
    blurb: "Firmware, wiring diagrams, and physical builds, with live telemetry where possible.",
    image: "/images/desktop/Robotic3D.gif",
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
      prefetch={false}
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
          className="mt-3"
        />
      </div>
    </Link>
  );
}

// Infinite-scrolling tech strip (languages + frameworks/tools), sandwiched
// between the swe/cp row and the ml/embedded-robotics row (see the grid
// split in Home() below) — its width comes for free from sitting inside the
// same outer frame as the grid, so it always spans exactly the spokes' own
// horizontal extent.
const TECH_ICONS = [
  { label: "Python", icon: "/images/desktop/python.png" },
  { label: "C", icon: "/images/desktop/c.png" },
  { label: "C++", icon: "/images/desktop/cplusplus.png" },
  { label: "C#", icon: "/images/desktop/csharp.png" },
  { label: "Swift", icon: "/images/desktop/swift.png" },
  { label: "TypeScript", icon: "/images/desktop/ts.png" },
  { label: "Java", icon: "/images/desktop/java.png" },
  { label: "Arduino", icon: "/images/desktop/arduino.png" },
  { label: "ROS", icon: "/images/desktop/ros.png" },
  { label: "OpenCV", icon: "/images/desktop/opencv.png" },
  { label: "Unity", icon: "/images/desktop/unity.png" },
  { label: "MATLAB", icon: "/images/desktop/matlab.png" },
];

const EDGE_FADE_MASK =
  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

function TechMarquee() {
  // Duplicated once so the track can loop seamlessly — animate-marquee (see
  // tailwind.config.ts) translates exactly -50%, landing back on an
  // identical copy of the list with no visible seam or jump.
  const track = [...TECH_ICONS, ...TECH_ICONS];

  return (
    <div
      className="relative w-full overflow-hidden bg-black/10 py-4"
      style={{ WebkitMaskImage: EDGE_FADE_MASK, maskImage: EDGE_FADE_MASK }}
    >
      <div className="flex w-max animate-marquee items-center gap-12 hover:[animation-play-state:paused]">
        {track.map((lang, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${lang.label}-${i}`}
            src={lang.icon}
            alt={lang.label}
            title={lang.label}
            className="h-8 w-8 shrink-0 object-contain opacity-80 transition-opacity hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AnimatorGeneralProvider duration={{ enter: SHELL_REVEAL_DURATION, exit: 1 }}>
      <Animator root active manager="stagger" duration={{ stagger: SHELL_STAGGER }}>
        <main className="relative mx-auto max-w-6xl px-6 py-16">
          {/* header bar */}
          <Animator duration={{ enter: SHELL_REVEAL_DURATION }}>
            <Animated className="relative mb-10 px-6 py-5" hideOnExited={false}>
              <FrameOctagon style={framePanelStyle} strokeWidth={1.5} squareSize={18} />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00F0FF]">
                    2026 build log
                  </p>
                  <h1 className="mt-2 font-display text-3xl text-[#E8FEFF] sm:text-4xl">
                    Leonel Dev | Computer Science Student
                  </h1>
                </div>
                <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00FF55] sm:flex">
                  Online
                  <span className="circuit-node-pulse h-2 w-2 rounded-full bg-[#00FF55]" style={{ filter: "drop-shadow(0 0 5px #00FF55)" }} />
                </div>
              </div>
            </Animated>
          </Animator>

          {/* 2x2 grid, wrapped in one outer frame — split into two explicit
              rows (swe/cp, then ml/embedded-robotics) with TechMarquee
              sandwiched between them, instead of one 4-item autoflow grid. */}
          <Animator duration={{ enter: SHELL_REVEAL_DURATION }}>
            <Animated className="relative" hideOnExited={false}>
              <FrameOctagon style={framePanelStyle} strokeWidth={1.5} squareSize={18} />
              <Animator manager="stagger" duration={{ stagger: SPOKE_STAGGER }}>
                <div className="relative flex flex-col divide-y divide-[#00F0FF]/15">
                  <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-[#00F0FF]/15">
                    {spokes.slice(0, 2).map((s) => (
                      <Animator key={s.slug} duration={{ enter: SPOKE_REVEAL_DURATION, delay: SPOKE_REVEAL_DELAY }}>
                        <SpokeQuadrant spoke={s} />
                      </Animator>
                    ))}
                  </div>

                  <Animator duration={{ enter: SPOKE_REVEAL_DURATION, delay: SPOKE_REVEAL_DELAY }}>
                    <Animated hideOnExited={false} animated={["fade"]}>
                      <TechMarquee />
                    </Animated>
                  </Animator>

                  <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-[#00F0FF]/15">
                    {spokes.slice(2, 4).map((s) => (
                      <Animator key={s.slug} duration={{ enter: SPOKE_REVEAL_DURATION, delay: SPOKE_REVEAL_DELAY }}>
                        <SpokeQuadrant spoke={s} />
                      </Animator>
                    ))}
                  </div>
                </div>
              </Animator>
            </Animated>
          </Animator>

          {/* contact/profile chips */}
          <Animator duration={{ enter: SHELL_REVEAL_DURATION }}>
            <Animated className="relative mt-10" hideOnExited={false} animated={["fade"]}>
              <SocialLinks />
            </Animated>
          </Animator>
        </main>
      </Animator>
    </AnimatorGeneralProvider>
  );
}
