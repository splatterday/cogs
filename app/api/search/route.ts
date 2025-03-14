import { NextRequest, NextResponse } from "next/server";
import { searchDiscogs } from "@/lib/discogsAPI";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";
  if (!query.trim()) {
    return NextResponse.json(
      { error: "Missing query parameter `q`" },
      { status: 400 }
    );
  }

  const rawType = searchParams.get("type") ?? "release";
  const type =
    rawType === "artist" || rawType === "master" || rawType === "release"
      ? rawType
      : "release";

  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const { results, totalPages } = await searchDiscogs(query, type, page);

  return NextResponse.json({ results, totalPages });
}
