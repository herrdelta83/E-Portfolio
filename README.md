# Electronic Portfolio — 2026 Build

A hub-and-spokes portfolio covering: Software Engineering (including
AI-integrated projects like RAG pipelines), Competitive Programming, Machine
Learning, and Embedded Systems & Robotics.

## Structure

```
app/                    # Next.js hub (App Router)
  page.tsx              # Home — links to all four spokes
  spokes/                # One placeholder page per core, replace with real content
    swe/
    cp/
    ml/
    embedded-robotics/
  api/cp-stats/         # Route that fetches live Codeforces stats
content/case-studies/    # MDX write-ups per project (see example.mdx)
services/
  ml-service/           # FastAPI stub — deploy ML demos here
  agent-service/        # FastAPI stub — deploy the RAG/agent demo here
embedded/
  firmware/             # Microcontroller code
  docs/                 # Wiring diagrams, build logs, photos
.github/workflows/       # CI + a cron stub to refresh CP stats
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For the Python services:

```bash
cd services/ml-service        # or agent-service
pip install fastapi uvicorn
uvicorn main:app --reload
```

## Deploying

- **Hub**: push to GitHub, import the repo on [Vercel](https://vercel.com).
- **ML/Agent services**: deploy each to [Hugging Face Spaces](https://huggingface.co/spaces)
  or [Railway](https://railway.app); point the hub's spoke pages at the
  deployed URL (iframe or fetch).

## 2026 Roadmap

| Phase | Focus | Milestone |
|---|---|---|
| Weeks 1–3 | Foundation | This scaffold live on Vercel with real copy |
| Sprint 1 | SWE | Pick a "Build Your Own X" project, ship as a case study — RAG/tool-using-agent builds (deployed via `agent-service`) count here too |
| Ongoing | Competitive Programming | Daily/weekly practice; `/api/cp-stats` stays live |
| Sprint 2 | Machine Learning | Kaggle project or from-scratch model, deployed via `ml-service` |
| Sprint 3 | Embedded/Robotics | Sensor project → small robot with live telemetry dashboard |

Each sprint ends with a real case study in `content/case-studies/` and a
replaced spoke page — no placeholder should survive past its sprint.

## Next steps in Claude Code

1. `npm install` and confirm `npm run dev` works.
2. Replace `example.mdx` with your first real case study.
3. Wire the home page copy to your actual name/links.
4. Pick the SWE milestone project and start building — this is where
   Claude Code takes over from chat-based planning.
