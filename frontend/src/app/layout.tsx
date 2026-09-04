import type { Metadata } from "next";
import { IBM_Plex_Serif, IBM_Plex_Mono, Inter, Orbitron, Space_Mono } from "next/font/google";
import FontLab from "@/components/FontLab";
import "./globals.css";

// Baseline (current) fonts — previously named in globals.css by string only,
// never actually loaded, so they were silently falling back to system fonts.
// Self-hosted here via next/font so the real baseline renders correctly.
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Sci-fi font candidates for FontLab's live A/B switcher — see
// src/components/FontLab.tsx. Orbitron/Space Mono are real Google Fonts,
// self-hosted the same way as the baseline above. Blanka/Anurati/Conthrax
// aren't on Google Fonts — see the @font-face stubs in globals.css.
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
        {children}
        {/* TODO: temporary — remove FontLab once a sci-fi header font is picked */}
        <FontLab />
      </body>
    </html>
  );
}
