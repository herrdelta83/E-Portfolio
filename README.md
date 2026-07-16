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

## Overall Projects

### Universal (every repo)
- ✅ Live demo, gif, or screenshot above the fold — not buried in the code
- ✅ Commit history showing real iteration, not a single dump
- ✅ Tests included, even minimal
- ✅ Scoped to do one thing well
### Competitive Programming
- ✅ Algorithmic knowledge applied to a real problem (not a `leetcode-solutions` dump)
- ✅ Live ratings & standings tracked via Codeforces / ICPC badges above
### Embedded Systems & Robotics
- ✅ **Video of the physical system working** — non-negotiable in this domain
- ✅ Evidence of a **closed feedback loop** (PID tuning graph, SLAM map output, control loop diagram) — not just "wired a sensor"
- ✅ Documented failure modes — what didn't work, and why
- ✅ Wiring diagram / schematic included
### 💻 SWE
- ✅ Architecture decisions explained with tradeoffs, not just a tech-stack badge wall
- ✅ CI/CD pipeline (green badge = "ships," not "sits in a folder")
- ✅ Real users where applicable (e.g. SEITC platform — used by N students)
### ML / Data Science
- ✅ Evaluation shown, not just training — metrics table, baseline comparison, error analysis
- ✅ Data handling made explicit (cleaning, leakage checks, splits)
- ✅ A real plot (loss curve, confusion matrix, forecast vs. actual) over a paragraph of claims


Each sprint ends with a real case study in `content/case-studies/` and a
replaced spoke page — no placeholder should survive past its sprint.