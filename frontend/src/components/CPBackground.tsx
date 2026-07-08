"use client";

import { useEffect, useState } from "react";

const FRAME_INTERVAL = 1400;
// monitor-chassis is a single static crop (from pc_sprites_1 only — never
// swapped). monitor-screen-1..4 are cropped from monitor_sprites_1..4 at the
// exact same rect, and are transparent everywhere except the CRT glow, so
// they drop straight on top of the chassis with zero extra position/size math.
const SCREEN_FRAMES = [1, 2, 3, 4].map((n) => `/images/desktop/monitor-screen-${n}.webp`);

function Monitor({ frame }: { frame: number }) {
  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{ right: "16%", bottom: "8.9%", height: "62%", aspectRatio: "818 / 681" }}
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
          className="absolute inset-0 h-full w-full"
          style={{ opacity: frame === i ? 1 : 0 }}
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
        /* 1. Main Outer Wrapper: Forces the component to take up the full screen */
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 2. Responsive Canvas: Locks your layered assets into their exact coordination system */}
        <div
          className= "relative w-full h-full min-w-full min-h-full flex-shrink-0"
          style={{ aspectRatio: "926 / 441" }}
        >
          {/* room — Now correctly covers edge to edge of the 1920x1080 space */}
        <img
          src="/images/desktop/room1-bg.webp"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* balloons — behind the monitor; only their strings should cross under it */}
        <img
          src="/images/desktop/balloons.webp"
          alt=""
          className="pointer-events-none absolute"
          style={{ right: "0%", top: "-3.4%", width: "25%" }}
        />

        <Monitor frame={frame} />

        {/* badge — resting on the desk, front-left */}
        <img
          src="/images/desktop/badge.webp"
          alt="ICPC lanyard badge"
          className="pointer-events-none absolute z-10 drop-shadow-[0_16px_16px_rgba(0,0,0,0.6)]"
          style={{ left: "37%", top: "83%", width: "9.5%", transform: "translate(-50%, -50%) rotate(-8deg)" }}
        />
      </div>
    </div>
  );
}
