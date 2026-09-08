"use client";

import { type CSSProperties, type ReactNode } from "react";
import { AnimatorGeneralProvider, Animator, Animated, FrameOctagon } from "@arwes/react";
import { CIRCUIT_CYAN } from "./CircuitHUD";

const frameStyle = {
  "--arwes-frames-line-color": CIRCUIT_CYAN,
  "--arwes-frames-bg-color": "rgba(9,51,58,0.25)", // matches the hub's own panel frames exactly
} as CSSProperties;

// Same Arwes framing system as the hub — genuinely identical now (cyan
// accent, same bg tint, same squareSize) since spokes no longer have their
// own distinct signal-gold look; every page shares one visual system (see
// CLAUDE.md). The hub still hand-rolls its own inline FrameOctagon instances
// rather than using this component, but they're styled to match.
export default function GlassPanel({ children }: { children: ReactNode }) {
  return (
    <AnimatorGeneralProvider duration={{ enter: 0.6, exit: 0.6 }}>
      <Animator root active>
        <Animated
          className="relative w-full p-8 backdrop-blur-xl sm:p-10"
          hideOnExited={false}
          animated={["fade"]}
        >
          <FrameOctagon style={frameStyle} strokeWidth={1.5} squareSize={18} />
          <div className="relative">{children}</div>
        </Animated>
      </Animator>
    </AnimatorGeneralProvider>
  );
}
