"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Eva's face loop: neutral eyes held, a quick blink, a smile held, another
// quick blink, then repeat — held frames read as "alive", the blink is brief.
const FACE_SEQUENCE = [
  { src: "/images/desktop/robotics-eva-face-1.webp", duration: 2400 },
  { src: "/images/desktop/robotics-eva-face-2.webp", duration: 180 },
  { src: "/images/desktop/robotics-eva-face-3.webp", duration: 2400 },
  { src: "/images/desktop/robotics-eva-face-2.webp", duration: 180 },
];

// Face crop position relative to Eva's own body sprite — derived from their
// shared 1920x1080 export coordinates, not eyeballed.
const EVA_FACE_RECT = { left: "9.41%", top: "15.73%", width: "42.35%", height: "30.9%" };

// Bright, isolated pixels detected directly in space_1.png (brightness scan),
// so the twinkle overlay lines up with real stars instead of guessed spots.
const STARS = [
  { x: "51.98%", y: "8.8%", delay: 0 },
  { x: "24.06%", y: "4.17%", delay: 0.4 },
  { x: "10.26%", y: "13.98%", delay: 0.8 },
  { x: "1.82%", y: "4.54%", delay: 1.2 },
  { x: "89.06%", y: "12.41%", delay: 1.6 },
  { x: "31.87%", y: "7.22%", delay: 2.0 },
  { x: "0.94%", y: "59.44%", delay: 2.4 },
];

function useFaceFrame() {
  const [src, setSrc] = useState(FACE_SEQUENCE[0].src);
  const indexRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const advance = () => {
      indexRef.current = (indexRef.current + 1) % FACE_SEQUENCE.length;
      const next = FACE_SEQUENCE[indexRef.current];
      setSrc(next.src);
      timeout = setTimeout(advance, next.duration);
    };
    timeout = setTimeout(advance, FACE_SEQUENCE[0].duration);
    return () => clearTimeout(timeout);
  }, []);

  return src;
}

export default function RoboticsBackground() {
  const faceSrc = useFaceFrame();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <img
        src="/images/desktop/space_1.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* dark-purple atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(120,60,200,0.28), transparent 55%), radial-gradient(circle at 20% 75%, rgba(90,40,160,0.22), transparent 50%)",
        }}
      />

      {/* twinkling stars */}
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: s.x,
            top: s.y,
            background: "radial-gradient(circle, rgba(255,255,255,0.95), rgba(180,210,255,0.4) 60%, transparent 75%)",
          }}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1.6, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}

      {/* Wall-E — floating gently, independent rhythm from Eva */}
      <motion.img
        src="/images/desktop/robotics-walle.webp"
        alt="Wall-E floating in space"
        className="pointer-events-none absolute"
        style={{ left: "50.96%", top: "44.4%", height: "31%", aspectRatio: "244 / 275" }}
        animate={{ y: [0, -16, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Eva — floats independently; her face loop rides along since it's a child of this same motion element */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ left: "71.29%", top: "19.7%", height: "22%", aspectRatio: "170 / 178" }}
        animate={{ y: [0, -20, 0], rotate: [1.5, -1.5, 1.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <img
          src="/images/desktop/robotics-eva-body.webp"
          alt="Eva floating in space, holding the plant"
          className="absolute inset-0 h-full w-full"
        />
        <img src={faceSrc} alt="" className="absolute" style={EVA_FACE_RECT} />
      </motion.div>
    </div>
  );
}
