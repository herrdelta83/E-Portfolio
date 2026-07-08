"use client";

import { useEffect, useState } from "react";

const FRAME_INTERVAL = 1400;
const SCREEN_FRAMES = [1, 2, 3, 4].map((n) => `/images/desktop/monitor-screen-${n}.webp`);

// Chassis is a fixed crop (818x681) with its CRT cut to a transparent hole at
// this rect — only the screen layers below animate, the chassis never moves.
const SCREEN_RECT = { left: "26.8%", top: "9.5%", width: "48.8%", height: "43.6%" };

function Monitor({ frame }: { frame: number }) {
  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{ right: "2.5%", bottom: "21%", height: "62%", aspectRatio: "818 / 681" }}
    >
      <img
        src="/images/desktop/monitor-chassis.webp"
        alt="Retro CRT terminal, the Competitive Programming spoke's focal prop"
        className="absolute inset-0 h-full w-full"
      />
      {SCREEN_FRAMES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute transition-opacity duration-500 ease-in-out"
          style={{ ...SCREEN_RECT, opacity: frame === i ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

export default function CPBackground() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % SCREEN_FRAMES.length);
    }, FRAME_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "926 / 441" }}>
      {/* room — trimmed to its real content so it covers edge to edge with no crop math needed */}
      <img
        src="/images/desktop/room1-bg.webp"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* balloons — behind the monitor; only their strings should cross under it */}
      <img
        src="/images/desktop/balloons.webp"
        alt=""
        className="pointer-events-none absolute"
        style={{ right: "4%", top: "2%", width: "11.5%" }}
      />

      <Monitor frame={frame} />

      {/* badge — resting on the desk, front-left */}
      <img
        src="/images/desktop/badge.webp"
        alt="ICPC lanyard badge"
        className="pointer-events-none absolute z-10 drop-shadow-[0_16px_16px_rgba(0,0,0,0.6)]"
        style={{ left: "29%", top: "91%", width: "8.4%", transform: "translate(-50%, -50%) rotate(10deg)" }}
      />
    </div>
  );
}
