"use client";

import { type CSSProperties, type ReactNode } from "react";
import { AnimatorGeneralProvider, Animator, Animated, FrameOctagon } from "@arwes/react";

const SIGNAL = "#D4A657";

const frameStyle = {
  "--arwes-frames-line-color": SIGNAL,
  "--arwes-frames-bg-color": "rgba(15, 18, 30, 0.28)",
} as CSSProperties;

// Same Arwes framing system as the hub (FrameOctagon + Animator build-in),
// re-skinned with each spoke's own signal-gold accent instead of the hub's
// cyan/void palette, which stays hub-exclusive.
export default function GlassPanel({ children }: { children: ReactNode }) {
  return (
    <AnimatorGeneralProvider duration={{ enter: 1.4, exit: 0.6 }}>
      <Animator root active>
        <Animated
          className="relative w-full p-8 backdrop-blur-xl sm:p-10"
          hideOnExited={false}
          animated={["fade"]}
        >
          <FrameOctagon style={frameStyle} strokeWidth={1.5} squareSize={16} />
          <div className="relative">{children}</div>
        </Animated>
      </Animator>
    </AnimatorGeneralProvider>
  );
}
