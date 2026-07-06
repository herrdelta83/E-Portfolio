import { NextResponse } from "next/server";

// Milestone 1 for the Competitive Programming spoke:
// Fetch live stats from Codeforces (and optionally LeetCode's unofficial API)
// and cache them (e.g. via a GitHub Actions cron hitting this route, or
// revalidate on a timer) so the CP dashboard doesn't hit rate limits.
//
// Codeforces docs: https://codeforces.com/apiHelp
// Replace CF_HANDLE below with your handle.

const CF_HANDLE = "your-codeforces-handle";

export async function GET() {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch CP stats", details: `${err}` },
      { status: 500 }
    );
  }
}
