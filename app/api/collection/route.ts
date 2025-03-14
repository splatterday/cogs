import { NextResponse, NextRequest } from "next/server";
import { fetchCollection, addCollection } from "@/lib/discogsAPI";

export async function GET() {
  const list = await fetchCollection();
  return NextResponse.json(list);
}

export async function POST(request: NextRequest) {
  const { releaseId, folderId } = await request.json();
  const instanceId = await addCollection(folderId, releaseId);
  return NextResponse.json({ instanceId });
}
