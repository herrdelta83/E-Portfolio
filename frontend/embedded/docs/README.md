# Embedded Systems & Robotics

This folder holds firmware, wiring diagrams, and build logs — the physical
side of the portfolio, which doesn't live on Vercel.

## Milestone 1 (suggested)
An ESP32 or Arduino sensor project (e.g. temperature/humidity logger)
that publishes readings over MQTT or a simple WebSocket.

## Milestone 2
A small robot (line-follower or simple arm) with a web dashboard on the
Next.js hub reading live telemetry — this is what ties this spoke back
into the rest of the stack.

## What goes here
- `firmware/` — microcontroller code (Arduino/PlatformIO/ESP-IDF)
- `docs/` — wiring diagrams, schematics, photos, and a short build log per
  project (mirrors the case-study format used for the other spokes)

## Documenting builds
Since these projects are physical, the portfolio shows them via:
- short video demos (embed via YouTube/Vimeo iframe on the
  `embedded-robotics` spoke page)
- annotated wiring diagrams (image or a simple SVG)
- live telemetry widget, if the build streams data
