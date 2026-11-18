export function safeHref(href: string): string {
  const value = href.trim()
  if (!value) return "#"
  if (value.startsWith("#") || value.startsWith("/")) return value
  try {
    const url = new URL(value)
    if (url.protocol === "https:" || url.protocol === "http:") return value
  } catch {
    return "#"
  }
  return "#"
}
