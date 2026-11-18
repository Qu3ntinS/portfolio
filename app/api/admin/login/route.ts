import { NextResponse } from "next/server"
import { adminToken, safeEqual, sessionCookie } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const secret = adminToken()
  if (!secret) {
    return NextResponse.json({ error: "ADMIN_TOKEN fehlt in der Umgebung" }, { status: 503 })
  }
  const body = await request.json().catch(() => null) as { password?: string } | null
  const password = body?.password ?? ""
  if (!password || !safeEqual(password, secret)) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 })
  }
  return NextResponse.json({ ok: true }, { headers: { "Set-Cookie": sessionCookie(secret) } })
}
