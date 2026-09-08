import type { Metadata } from "next";
import { IBM_Plex_Serif, IBM_Plex_Mono, Inter, Orbitron, Space_Mono } from "next/font/google";
import PersistentBoard from "@/components/PersistentBoard";
import "./globals.css";

// IBM Plex Serif was the old --font-display baseline before Conthrax was
// chosen for titles/subtitles (now set directly in globals.css). Kept loaded
// under its own variable as --font-display's fallback if the local Conthrax
// file ever fails to load.
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-serif",
  display: "swap",
});
// Inter was the old --font-body baseline before Space Mono was chosen for
// body text (now set directly in globals.css). Kept loaded under its own
// variable as --font-body's fallback if Space Mono ever fails to load.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Orbitron/Space Mono — were FontLab's live A/B candidates (src/components/FontLab.tsx,
// now deactivated); Space Mono is the chosen --font-body (see globals.css).
// Orbitron kept loaded in case FontLab gets reactivated later.
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leonel — Electronic Portfolio",
  description:
    "SWE · Competitive Programmer · Machine Learning · Embedded Systems · Robotics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plexSerif.variable} ${inter.variable} ${plexMono.variable} ${orbitron.variable} ${spaceMono.variable}`}
    >
      <body className="font-body antialiased">
        {/* CircuitHUD lives here, not in individual pages — mounted exactly
            once for the whole session. App Router guarantees layout.tsx
            never remounts on nested navigation, so the board builds in once
            and persists across every hub<->spoke transition instead of
            rebuilding on each click. Every page (hub + all 4 spokes) shares
            this one background now — see CLAUDE.md. */}
        <PersistentBoard />
        {children}
      </body>
    </html>
  );
}
