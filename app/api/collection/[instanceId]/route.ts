import { NextResponse } from "next/server";
import { removeCollection } from "@/lib/discogsAPI";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ instanceId: string }> }
) {
  // 1) Await params exactly as Next 15 expects
  const { instanceId } = await context.params;

  // 2) Pull folderId out of the URL
  const url = new URL(request.url);
  const raw = url.searchParams.get("folderId");
  const folderId = raw ? Number(raw) : NaN;

  if (!folderId || !instanceId) {
    return NextResponse.json(
      { error: "folderId & instanceId required" },
      { status: 400 }
    );
  }

  try {
    await removeCollection(folderId, Number(instanceId));
    return NextResponse.json({ success: true });
  } catch (unknownErr) {
    // 3) Narrow the error type
    let message: string;
    if (unknownErr instanceof Error) {
      message = unknownErr.message;
    } else {
      message = String(unknownErr);
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
