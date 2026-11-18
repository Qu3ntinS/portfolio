import { NextResponse } from "next/server"
import { readSite } from "@/lib/content"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const site = await readSite()
    return NextResponse.json(site, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lesefehler"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
