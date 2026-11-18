import { createHmac, timingSafeEqual } from "crypto"

export const COOKIE = "terminal_admin"

export function adminToken(): string | null {
  const token = process.env.ADMIN_TOKEN?.trim()
  return token ? token : null
}

function mac(value: string): Buffer {
  return createHmac("sha256", "terminal-admin-v1").update(value).digest()
}

export function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(mac(a), mac(b))
}

export function sessionValue(secret: string): string {
  return createHmac("sha256", secret).update("terminal-admin-v1").digest("hex")
}

export function isAuthed(request: Request): boolean {
  const secret = adminToken()
  if (!secret) return false
  const header = request.headers.get("cookie") ?? ""
  const parts = header.split(";").map((part) => part.trim())
  const raw = parts.find((part) => part.startsWith(`${COOKIE}=`))
  if (!raw) return false
  const value = decodeURIComponent(raw.slice(COOKIE.length + 1))
  return safeEqual(value, sessionValue(secret))
}

export function sessionCookie(secret: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""
  return `${COOKIE}=${sessionValue(secret)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=1209600${secure}`
}

export function clearCookie(): string {
  return `${COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`
}
