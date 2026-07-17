"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CPBackground from "@/components/CPBackground";
import BackToHubButton from "@/components/BackToHubButton";
import GlassPanel from "@/components/GlassPanel";
import ProgressBar from "@/components/ProgressBar";
import { NOTABLE_PROBLEMS } from "@/lib/cp-problems";

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

type CFContest = {
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingUpdateTimeSeconds: number;
};

type CFHistoryResponse =
  | { status: "OK"; result: CFContest[] }
  | { status: "FAILED"; comment: string }
  | { error: string; details: string };

type HistoryState =
  | { kind: "loading" }
  | { kind: "unconfigured"; message: string }
  | { kind: "error"; message: string }
  | { kind: "ready"; contests: CFContest[] };

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-signal">{label}</p>
      <p className="mt-2 font-display text-2xl text-paper">{value}</p>
    </div>
  );
}

function ContestRow({ contest }: { contest: CFContest }) {
  const delta = contest.newRating - contest.oldRating;
  const deltaColor =
    delta > 0 ? "text-emerald-400" : delta < 0 ? "text-red-400" : "text-paper/60";
  const deltaLabel = delta > 0 ? `+${delta}` : `${delta}`;
  const date = new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-2 text-sm last:border-0">
      <div className="min-w-0">
        <p className="truncate text-paper/85">{contest.contestName}</p>
        <p className="text-[11px] text-paper/40">
          {date} · Rank {contest.rank}
        </p>
      </div>
      <span className={`shrink-0 font-mono text-xs ${deltaColor}`}>{deltaLabel}</span>
    </div>
  );
}

export default function CompetitiveProgrammingPage() {
  const [state, setState] = useState<StatsState>({ kind: "loading" });
  const [history, setHistory] = useState<HistoryState>({ kind: "loading" });

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

    fetch("/api/cp-stats/history")
      .then((res) => res.json())
      .then((data: CFHistoryResponse) => {
        if (cancelled) return;
        if ("error" in data) {
          setHistory({ kind: "error", message: data.details });
        } else if (data.status === "FAILED") {
          setHistory({ kind: "unconfigured", message: data.comment });
        } else {
          setHistory({ kind: "ready", contests: [...data.result].reverse().slice(0, 5) });
        }
      })
      .catch((err) => {
        if (!cancelled) setHistory({ kind: "error", message: `${err}` });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackToHubButton />
      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-24">
        <GlassPanel>
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
              <code className="text-paper">src/lib/codeforces.ts</code> to light this up.
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
              Contest history
            </p>

            {history.kind === "loading" && (
              <p className="mt-3 text-sm text-paper/60">Fetching contest history…</p>
            )}

            {history.kind === "unconfigured" && (
              <p className="mt-3 text-sm text-paper/60">
                No handle configured yet — set <code className="text-paper">CF_HANDLE</code> in{" "}
                <code className="text-paper">src/lib/codeforces.ts</code> to light this up.
              </p>
            )}

            {history.kind === "error" && (
              <p className="mt-3 text-sm text-paper/60">
                Couldn&apos;t reach Codeforces right now.
              </p>
            )}

            {history.kind === "ready" &&
              (history.contests.length > 0 ? (
                <div className="mt-3">
                  {history.contests.map((c) => (
                    <ContestRow key={c.contestId} contest={c} />
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-paper/60">No rated contests yet.</p>
              ))}
          </div>

          <div className="mt-10 space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              Notable problems
            </p>
            {NOTABLE_PROBLEMS.map((problem) => (
              <Link
                key={problem.slug}
                href={`/spokes/cp/problems/${problem.slug}`}
                className="group block rounded-md border border-white/10 bg-black/20 p-5 transition-colors hover:border-signal/50 hover:bg-black/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-xl text-paper">{problem.name}</h2>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    View →
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                  {problem.source}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">{problem.blurb}</p>
                <ProgressBar value={problem.completion} className="mt-4" />
              </Link>
            ))}
          </div>
        </GlassPanel>
      </div>

      <CPBackground />
    </main>
  );
}
