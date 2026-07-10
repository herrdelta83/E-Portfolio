"use client";

import { useEffect, useState } from "react";

const FRAME_INTERVAL = 550;
// Narrative order: reach → grip → lift high → carry → throw → empty claw (cube
// back on the stack) → loop. Frames 2-5 already have the cube baked into their
// own art (attached to / flying from the claw); only the last frame needs the
// loose-cube overlay, since "nocube" means the claw is genuinely empty.
const ROBOT_FRAMES = [1, 2, 3, 4, 5, 6].map((n) => `/images/desktop/ml-robot-${n}.webp`);
const NOCUBE_FRAME_INDEX = 5;

// cubes and the robot frames were all exported on the same 1920x1080 stage —
// these percentages come straight from their pixel bounding boxes (not
// eyeballed), so the arm and the stack stay pixel-aligned to each other.
const STAGE_WIDTH_PCT = (1920 / 2258) * 100;
// top values include a +12.26% shared vertical offset (verified against room2's
// detected desk-surface line) so the tower and the arm's base actually rest on
// the desk instead of floating in the gap above it — see the steps below for
// how to re-derive this if the desk offset ever needs adjusting.
const CUBES_RECT = { left: "40.26%", top: "55.82%", width: "18.96%", height: "28.98%" };
const ROBOT_RECT = { left: "15.34%", top: "28.89%", width: "34.506%", height: "58.158%" };
const CUBE_LOOSE_RECT = { left: "60.56%", top: "15.21%", width: "37.095%", height: "37.38%" };

export default function MLBackground() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % ROBOT_FRAMES.length);
    }, FRAME_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black flex items-center justify-center">
      <div className="relative h-full w-full" style={{ aspectRatio: "2258 / 1080" }}>
        <img
          src="/images/desktop/room2.webp"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* prop stage — native 1920x1080 coordinate space, right-aligned
            against the wider room2 canvas so cubes/robot sit at native scale */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0"
          style={{ width: `${STAGE_WIDTH_PCT}%` }}
        >
          <div className="absolute" style={CUBES_RECT}>
            <img
              src="/images/desktop/ml-cubes.webp"
              alt="Stack of ABC blocks spelling ML on the lab desk"
              className="absolute inset-0 h-full w-full"
            />
            {frame === NOCUBE_FRAME_INDEX && (
              <img
                src="/images/desktop/ml-cube-loose.webp"
                alt=""
                className="absolute"
                style={CUBE_LOOSE_RECT}
              />
            )}
          </div>

          <div className="absolute" style={ROBOT_RECT}>
            {ROBOT_FRAMES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? "Robot arm picking a cube off the stack, looping" : ""}
                className="absolute inset-0 h-full w-full transition-opacity duration-0 ease-in-out"
                style={{ opacity: frame === i ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
