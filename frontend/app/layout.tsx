import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leonel — Electronic Portfolio",
  description:
    "SWE · Competitive Programmer · Machine Learning · AI Engineering · Embedded Systems · Robotics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
