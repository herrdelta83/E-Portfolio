"use client";

import { useEffect, useState } from "react";

const FRAME_INTERVAL = 1400;
const PC_FRAMES = [1, 2, 3, 4].map((n) => `/images/desktop/pc_sprites_${n}.webp`);

const LAYER_CLASS = "pointer-events-none absolute inset-0 h-full w-full object-contain";

export default function CPBackground() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % PC_FRAMES.length);
    }, FRAME_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <img src="/images/desktop/room1.webp" alt="" className={LAYER_CLASS} />

      {/* pc — numbered sprite loop: boot log, file listing, process monitor, crash/reboot */}
      {PC_FRAMES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? "Retro terminal running a boot/monitor/crash loop" : ""}
          className={LAYER_CLASS}
          style={{ opacity: frame === i ? 1 : 0 }}
        />
      ))}

      <img
        src="/images/desktop/badge.webp"
        alt=""
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "32.6%", top: "82.5%", width: "14%" }}
      />
      <img
        src="/images/desktop/balloons.webp"
        alt=""
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "86.3%", top: "19%", width: "13.75%" }}
      />
    </div>
  );
}
