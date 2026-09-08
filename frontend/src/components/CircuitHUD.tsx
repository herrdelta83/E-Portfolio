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
  { points: [[297, 190], [297, 220], [252, 269], [252, 385], [295, 425], [295, 540], [355, 599], [369, 599]], color: CIRCUIT_CYAN, drawDuration: 1.6, packetDuration: 4.2, packetDelay: 0 },
  { points: [[1665, 214], [1585, 214], [1555, 240], [1555, 310], [1545, 319], [1483, 319]], color: CIRCUIT_CYAN, drawDuration: 2, packetDuration: 5, packetDelay: 0.4 },
  { points: [[152, 520], [220, 520], [225, 525], [225, 658], [228, 662], [515, 662], [520, 658], [545, 658]], color: CIRCUIT_GREEN, drawDuration: 1.4, packetDuration: 3.6, packetDelay: 0.8 },
  { points: [[1731, 302], [1731, 415], [1540, 610], [1450, 610], [1372, 690], [1372, 915], [1355, 935], [1205, 935], [1170, 900], [1027, 900], [1005, 920]], color: CIRCUIT_CYAN, drawDuration: 1.9, packetDuration: 4.6, packetDelay: 1.1 },
  { points: [[110, 650], [145, 650], [163, 668], [163, 742], [245, 825], [360, 825], [400, 863], [400, 972], [413, 988], [480, 988], [502, 968], [705, 968]], color: CIRCUIT_CYAN, drawDuration: 1.7, packetDuration: 4, packetDelay: 0.2 },
  { points: [[1332, 988], [1503, 988], [1503, 910], [1545, 910], [1550, 900], [1550, 838], [1540, 832], [1495, 832], [1484, 838], [1484, 955], [1478, 962], 
    [1373, 962], [1372, 945], [1387, 932], [1391, 918], [1472, 918], [1472, 840], [1490, 822], [1558, 822], [1562, 825], [1562, 946], [1600, 987], [1655, 987],
    [1655, 885]], color: CIRCUIT_GREEN, drawDuration: 1.3, packetDuration: 3.4, packetDelay: 1.4 },
  { points: [[110, 618], [157, 618], [183, 642], [183, 732], [255, 805], [425, 805], [425, 967], [470, 967], [495, 945], [700, 945]], color: CIRCUIT_CYAN, drawDuration: 1.5, packetDuration: 3.8, packetDelay: 0.6 },
  { points: [[1665, 182], [1573, 182], [1510, 246], [650, 246], [633, 262]], color: CIRCUIT_CYAN, drawDuration: 2.1, packetDuration: 5.2, packetDelay: 1.7 },
  { points: [[357, 533], [328, 507], [328, 400], [317, 390], [310, 390], [287, 370], [287, 297], [378, 205], [378, 136], [410, 105], [870, 105]], color: CIRCUIT_CYAN, drawDuration: 1.4, packetDuration: 3.6, packetDelay: 0.3 },
  { points: [[1620, 909], [1764, 909], [1774, 900], [1774, 811], [1596, 811], [1596, 822], [1579, 822], [1574, 815], [1574, 634], [1684, 522], [1755, 522], 
    [1762, 530], [1762, 782], [1758, 789], [1700, 789], [1669, 760], [1669, 700], [1655, 700]], color: CIRCUIT_GREEN, drawDuration: 1.6, packetDuration: 4.2, packetDelay: 0.9 },
  { points: [[865, 995], [865, 948], [1083, 948], [1083, 1050]], color: CIRCUIT_CYAN, drawDuration: 1.3, packetDuration: 3.4, packetDelay: 1.2 },
  { points: [[3, 948], [75, 948], [185, 948], [222, 985],[222, 1010]], color: CIRCUIT_CYAN, drawDuration: 1.5, packetDuration: 3.8, packetDelay: 1.6 },
];

export default function CircuitHUD() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        backgroundColor: CIRCUIT_VOID,
        backgroundImage: "url(/images/desktop/PCB.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark void tint over the PCB photo so it reads as texture, not a
          bright distraction — traces/panels/text on top stay legible. */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(2,17,20,0.82)" }} />

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
          //const isRed = i % 5 === 4;
          const nodeColor = trace.color;
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

              <circle r={3.5} fill={CIRCUIT_CYAN} style={{ filter: `drop-shadow(0 0 6px ${CIRCUIT_CYAN})` }}>
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
