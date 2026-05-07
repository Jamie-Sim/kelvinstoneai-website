import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error } = await supabaseAdmin()
    .from("generations")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("[/api/studio/generations/[id]] delete failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete generation." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
