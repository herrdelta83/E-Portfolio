"use client";

import { useEffect, useState } from "react";
import CPBackground from "@/components/CPBackground";
import BackToHubButton from "@/components/BackToHubButton";

type CFUser = {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  contribution?: number;
  friendOfCount?: number;
};

type CFResponse =
  | { status: "OK"; result: CFUser[] }
  | { status: "FAILED"; comment: string }
  | { error: string; details: string };

type StatsState =
  | { kind: "loading" }
  | { kind: "unconfigured"; message: string }
  | { kind: "error"; message: string }
  | { kind: "ready"; user: CFUser };

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-signal">{label}</p>
      <p className="mt-2 font-display text-2xl text-paper">{value}</p>
    </div>
  );
}

export default function CompetitiveProgrammingPage() {
  const [state, setState] = useState<StatsState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/cp-stats")
      .then((res) => res.json())
      .then((data: CFResponse) => {
        if (cancelled) return;
        if ("error" in data) {
          setState({ kind: "error", message: data.details });
        } else if (data.status === "FAILED") {
          setState({ kind: "unconfigured", message: data.comment });
        } else {
          setState({ kind: "ready", user: data.result[0] });
        }
      })
      .catch((err) => {
        if (!cancelled) setState({ kind: "error", message: `${err}` });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackToHubButton />
      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <div
          className="w-full rounded-lg border border-white/10 p-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10"
          style={{ backgroundColor: "rgba(15, 18, 30, 0.28)" }}
        >
          <p className="font-mono text-sm uppercase tracking-widest text-signal">
            Spoke: Competitive Programming
          </p>
          <h1 className="mt-3 font-display text-4xl text-paper">Competitive Programming</h1>
          <p className="mt-6 text-paper/80">
            ICPC-themed dashboard. Live Codeforces/LeetCode statistics. View
            recent contest history and problem notes.
          </p>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-paper/50">
            Codeforces dashboard
          </p>

          {state.kind === "loading" && (
            <p className="mt-4 text-sm text-paper/60">Fetching live stats…</p>
          )}

          {state.kind === "unconfigured" && (
            <p className="mt-4 text-sm text-paper/60">
              No handle configured yet — set <code className="text-paper">CF_HANDLE</code> in{" "}
              <code className="text-paper">src/app/api/cp-stats/route.ts</code> to light this up.
              <span className="mt-1 block text-paper/40">Codeforces says: {state.message}</span>
            </p>
          )}

          {state.kind === "error" && (
            <p className="mt-4 text-sm text-paper/60">
              Couldn&apos;t reach Codeforces right now.
              <span className="mt-1 block text-paper/40">{state.message}</span>
            </p>
          )}

          {state.kind === "ready" && (
            <>
              <h2 className="mt-3 font-display text-2xl text-paper">@{state.user.handle}</h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Rating" value={state.user.rating ?? "—"} />
                <Stat label="Max rating" value={state.user.maxRating ?? "—"} />
                <Stat label="Rank" value={state.user.rank ?? "unrated"} />
                <Stat label="Max rank" value={state.user.maxRank ?? "unrated"} />
              </div>
            </>
          )}

          <div className="mt-6 rounded-md border border-white/10 bg-black/20 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-signal">
              Contest history &amp; problem notes
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper/75">
              Next milestone — pull recent contest results and per-problem notes from
              Codeforces&apos; <code className="text-paper">user.rating</code> and{" "}
              <code className="text-paper">user.status</code> endpoints and list them here.
            </p>
          </div>
        </div>
      </div>

      <CPBackground />
    </main>
  );
}
