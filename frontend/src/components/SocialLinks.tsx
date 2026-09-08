"use client";

import { useState, type CSSProperties } from "react";
import { AnimatorGeneralProvider, Animator, Animated, FrameOctagon } from "@arwes/react";
import { CIRCUIT_CYAN } from "./CircuitHUD";

// Contact/profile chips — same chamfered-frame + pin-tick look as
// CircuitHUD's old decorative IC chip badge, but real interactive links.
// Shared by the hub and all 4 spokes now that every page uses the same
// glass/cyan look (see CLAUDE.md) — self-contained (own AnimatorGeneralProvider)
// so each call site just renders <SocialLinks /> with no extra wiring.
// TODO: swap in your actual LinkedIn URL if it changes.
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/herrdelta83", icon: "/images/desktop/github.png" },
  { label: "LinkedIn", href: "https://linkedin.com/in/leonelbailonsifuentes", icon: "/images/desktop/LinkedIn.png" },
  {
    label: "Gmail",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=bailondelta@gmail.com",
    icon: "/images/desktop/gmail.png",
  },
];

const SOCIAL_CHIP_PINS = 4;
const SOCIAL_REVEAL_DURATION = 0.6;
const SOCIAL_STAGGER = 0;

const framePanelStyle = {
  "--arwes-frames-line-color": CIRCUIT_CYAN,
  "--arwes-frames-bg-color": "rgba(9,51,58,0.25)",
} as CSSProperties;

function SocialChip({ link }: { link: (typeof SOCIAL_LINKS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center gap-2"
    >
      <div className="relative" style={{ width: 88, height: 88 }}>
        {/* pin ticks — top & bottom edges, same idea as the old chip badge */}
        <div className="pointer-events-none absolute inset-x-2 -top-2 flex justify-between">
          {Array.from({ length: SOCIAL_CHIP_PINS }).map((_, i) => (
            <span key={i} className="h-2 w-px bg-[#00F0FF]" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-2 -bottom-2 flex justify-between">
          {Array.from({ length: SOCIAL_CHIP_PINS }).map((_, i) => (
            <span key={i} className="h-2 w-px bg-[#00F0FF]" />
          ))}
        </div>

        <Animated
          className="absolute inset-0 transition-[filter] duration-300 ease-out"
          hideOnExited={false}
          style={{
            filter: hovered
              ? `drop-shadow(0 0 4px ${CIRCUIT_CYAN}) drop-shadow(0 0 12px ${CIRCUIT_CYAN})`
              : "none",
          }}
        >
          <FrameOctagon style={framePanelStyle} strokeWidth={hovered ? 2.5 : 1.5} squareSize={12} />
        </Animated>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={link.icon} alt="" className="relative h-full w-full object-contain p-4" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-[#8FD8DE]/80 group-hover:text-[#E8FEFF]">
        {link.label}
      </span>
    </a>
  );
}

export default function SocialLinks() {
  return (
    <AnimatorGeneralProvider duration={{ enter: SOCIAL_REVEAL_DURATION }}>
      <Animator root active manager="stagger" duration={{ stagger: SOCIAL_STAGGER }}>
        <div className="flex items-center justify-center gap-12">
          {SOCIAL_LINKS.map((link) => (
            <Animator key={link.label}>
              <SocialChip link={link} />
            </Animator>
          ))}
        </div>
      </Animator>
    </AnimatorGeneralProvider>
  );
}
