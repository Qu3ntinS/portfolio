import { NextResponse } from "next/server"
import { adminToken, isAuthed } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  if (!adminToken()) {
    return NextResponse.json({ error: "ADMIN_TOKEN fehlt" }, { status: 503 })
  }
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
