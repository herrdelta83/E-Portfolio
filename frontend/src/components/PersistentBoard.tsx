"use client";

import { AnimatorGeneralProvider, Animator } from "@arwes/react";
import CircuitHUD, { CIRCUIT_BUILD_DURATION } from "./CircuitHUD";

// layout.tsx is a Server Component — importing @arwes/react's
// AnimatorGeneralProvider/Animator directly into it lets Next pull Arwes's
// code into the *server* bundle, where React's restricted RSC runtime has no
// createContext ("(0 , cy.createContext) is not a function" at build time).
// Every other Arwes usage in this codebase goes through a file with its own
// "use client" at the top (CircuitHUD itself, GlassPanel, SocialLinks, the
// hub page) — this wrapper exists purely to give layout.tsx that same safe
// client boundary instead of touching @arwes/react directly.
export default function PersistentBoard() {
  return (
    <AnimatorGeneralProvider duration={{ enter: CIRCUIT_BUILD_DURATION, exit: 1 }}>
      <Animator root active>
        <CircuitHUD />
      </Animator>
    </AnimatorGeneralProvider>
  );
}
