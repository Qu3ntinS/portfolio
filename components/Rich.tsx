import { safeHref } from "@/lib/href"

const mark = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g

export function Rich({ text, bold = "strong" }: { text: string; bold?: "strong" | "b" }) {
  const parts = text.split(mark)
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          const inner = part.slice(2, -2)
          return bold === "b" ? <b key={index}>{inner}</b> : <strong key={index}>{inner}</strong>
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2 && !part.startsWith("**")) {
          return <em key={index}>{part.slice(1, -1)}</em>
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          const href = safeHref(link[2])
          const external = href.startsWith("http")
          return (
            <a key={index} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
              {link[1]}
            </a>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}
