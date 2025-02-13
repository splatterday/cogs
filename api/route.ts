// app/api/search/route.ts (Next.js API Route)
import { NextRequest, NextResponse } from "next/server";
import { searchDiscogs } from "@/api/discogsAPI";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json({ error: "Search query cannot be empty." }, { status: 400 });
  }

  const results = await searchDiscogs(query);
  return NextResponse.json(results);
}
