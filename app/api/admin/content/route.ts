import { NextResponse } from "next/server"
import { adminToken, isAuthed } from "@/lib/auth"
import { readSite, writeSite } from "@/lib/content"

export const dynamic = "force-dynamic"

function guard(request: Request) {
  if (!adminToken()) {
    return NextResponse.json({ error: "ADMIN_TOKEN fehlt" }, { status: 503 })
  }
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 })
  }
  return null
}

export async function GET(request: Request) {
  const denied = guard(request)
  if (denied) return denied
  try {
    return NextResponse.json(await readSite(), { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lesefehler"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const denied = guard(request)
  if (denied) return denied
  const length = Number(request.headers.get("content-length") ?? 0)
  if (length > 200_000) {
    return NextResponse.json({ error: "Inhalt zu groß" }, { status: 413 })
  }
  try {
    const body = await request.json()
    const site = await writeSite(body)
    return NextResponse.json(site)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Speichern fehlgeschlagen"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
