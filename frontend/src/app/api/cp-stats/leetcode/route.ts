import { NextResponse } from "next/server";
import { LEETCODE_HANDLE } from "@/lib/leetcode";

// LeetCode has no official public REST API. This hits the same internal
// GraphQL endpoint leetcode.com's own frontend uses (leetcode.com/graphql),
// which serves public profile data without auth. Verified directly against
// the live endpoint before writing this — response shape below is real,
// not guessed.

const QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: LEETCODE_HANDLE } }),
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch LeetCode stats", details: `${err}` },
      { status: 500 }
    );
  }
}
