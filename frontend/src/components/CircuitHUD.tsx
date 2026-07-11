"use client";

import { Animated } from "@arwes/react";

export const CIRCUIT_VOID = "#021114";
export const CIRCUIT_CYAN = "#00F0FF";
export const CIRCUIT_GREEN = "#00FF55";
export const CIRCUIT_RED = "#FF003C";
export const CIRCUIT_DIM = "#09333A";
export const CIRCUIT_BUILD_DURATION = 2.2; // seconds — matches AnimatorGeneralProvider's enter duration

type Pt = [number, number];

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toPath(points: Pt[]) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
}

// Deterministic random walk confined to 45/90-degree steps only, so every
// dim background trace reads as a real PCB run — and stays identical between
// server render and client hydration (seeded, never Math.random()).
function randomWalk(seed: number, start: Pt, steps: number, step = 34): Pt[] {
  const rand = mulberry32(seed);
  const dirs: Pt[] = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];
  const pts: Pt[] = [start];
  let [x, y] = start;
  let lastDir = -1;
  for (let i = 0; i < steps; i++) {
    let dirIdx = Math.floor(rand() * dirs.length);
    if (lastDir >= 0 && dirs[dirIdx][0] === -dirs[lastDir][0] && dirs[dirIdx][1] === -dirs[lastDir][1]) {
      dirIdx = (dirIdx + 1) % dirs.length;
    }
    const len = (1 + Math.floor(rand() * 3)) * step;
    x += dirs[dirIdx][0] * len;
    y += dirs[dirIdx][1] * len;
    pts.push([x, y]);
    lastDir = dirIdx;
  }
  return pts;
}

const DIM_TRACES = Array.from({ length: 46 }, (_, i) => {
  const rand = mulberry32(i * 7919 + 11);
  const start: Pt = [rand() * 1920, rand() * 1080];
  return toPath(randomWalk(i * 104729 + 3, start, 2 + Math.floor(rand() * 3)));
});

type ActiveTrace = {
  points: Pt[];
  color: string;
  drawDuration: number;
  packetDuration: number;
  packetDelay: number;
};

const ACTIVE_TRACES: ActiveTrace[] = [
  { points: [[0, 90], [260, 90], [300, 130], [300, 260], [640, 260]], color: CIRCUIT_CYAN, drawDuration: 1.6, packetDuration: 4.2, packetDelay: 0 },
  { points: [[1920, 160], [1600, 160], [1560, 200], [1560, 340], [1260, 340], [1220, 380], [980, 380]], color: CIRCUIT_CYAN, drawDuration: 2, packetDuration: 5, packetDelay: 0.4 },
  { points: [[0, 520], [220, 520], [220, 660], [500, 660]], color: CIRCUIT_GREEN, drawDuration: 1.4, packetDuration: 3.6, packetDelay: 0.8 },
  { points: [[1920, 620], [1700, 620], [1660, 580], [1450, 580], [1450, 720], [1150, 720]], color: CIRCUIT_CYAN, drawDuration: 1.9, packetDuration: 4.6, packetDelay: 1.1 },
  { points: [[140, 1080], [140, 800], [420, 800], [420, 960], [700, 960]], color: CIRCUIT_CYAN, drawDuration: 1.7, packetDuration: 4, packetDelay: 0.2 },
  { points: [[1920, 880], [1650, 880], [1650, 980], [1330, 980]], color: CIRCUIT_GREEN, drawDuration: 1.3, packetDuration: 3.4, packetDelay: 1.4 },
  { points: [[0, 40], [160, 40], [200, 80], [200, 200], [400, 200]], color: CIRCUIT_CYAN, drawDuration: 1.5, packetDuration: 3.8, packetDelay: 0.6 },
  { points: [[1920, 30], [1780, 30], [1780, 190], [1540, 190], [1540, 60]], color: CIRCUIT_CYAN, drawDuration: 2.1, packetDuration: 5.2, packetDelay: 1.7 },
  { points: [[300, 0], [300, 160], [520, 160], [560, 200]], color: CIRCUIT_CYAN, drawDuration: 1.4, packetDuration: 3.6, packetDelay: 0.3 },
  { points: [[1760, 1080], [1760, 900], [1500, 900], [1500, 1000]], color: CIRCUIT_GREEN, drawDuration: 1.6, packetDuration: 4.2, packetDelay: 0.9 },
  { points: [[860, 1080], [860, 940], [1080, 940], [1080, 1080]], color: CIRCUIT_CYAN, drawDuration: 1.3, packetDuration: 3.4, packetDelay: 1.2 },
  { points: [[0, 940], [180, 940], [220, 980], [220, 1080]], color: CIRCUIT_CYAN, drawDuration: 1.5, packetDuration: 3.8, packetDelay: 1.6 },
];

export default function CircuitHUD() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: CIRCUIT_VOID }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* dense static board texture — dim, no animation */}
        <g>
          {DIM_TRACES.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={CIRCUIT_DIM} strokeWidth={1} opacity={0.55} />
          ))}
        </g>

        {/* active traces: build in via Arwes's draw transition, then a looping data packet */}
        {ACTIVE_TRACES.map((trace, i) => {
          const id = `active-trace-${i}`;
          const d = toPath(trace.points);
          const isRed = i % 5 === 4;
          const nodeColor = isRed ? CIRCUIT_RED : trace.color;
          return (
            <g key={id}>
              <Animated<SVGPathElement>
                as="path"
                id={id}
                d={d}
                fill="none"
                stroke={trace.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                animated={["draw"]}
                style={{ filter: `drop-shadow(0 0 4px ${trace.color}) drop-shadow(0 0 8px ${trace.color})` }}
              />

              {trace.points.map(([x, y], j) => (
                <circle
                  key={j}
                  cx={x}
                  cy={y}
                  r={3}
                  fill={nodeColor}
                  className="circuit-node-pulse"
                  style={{
                    filter: `drop-shadow(0 0 5px ${nodeColor})`,
                    animationDelay: `${CIRCUIT_BUILD_DURATION + trace.packetDelay + j * 0.15}s`,
                  }}
                />
              ))}

              <circle r={3.5} fill={isRed ? CIRCUIT_RED : CIRCUIT_CYAN} style={{ filter: `drop-shadow(0 0 6px ${isRed ? CIRCUIT_RED : CIRCUIT_CYAN})` }}>
                <animateMotion
                  dur={`${trace.packetDuration}s`}
                  begin={`${CIRCUIT_BUILD_DURATION + trace.packetDelay}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
