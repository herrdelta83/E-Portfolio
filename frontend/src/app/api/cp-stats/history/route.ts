import { NextResponse } from "next/server";
import { CF_HANDLE } from "@/lib/codeforces";

// Contest history for the CP spoke's "Contest history" section.
// Codeforces docs: https://codeforces.com/apiHelp/user.rating

export async function GET() {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch contest history", details: `${err}` },
      { status: 500 }
    );
  }
}
