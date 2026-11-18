import { readFile, rename, writeFile } from "fs/promises"
import path from "path"
import { safeHref } from "./href"
import type { SiteContent } from "./types"

const file = path.join(process.cwd(), "content", "site.json")

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function num(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : Number(value)
  return Number.isFinite(n) ? n : fallback
}

export function validateSite(input: unknown): SiteContent {
  if (!input || typeof input !== "object") {
    throw new Error("Inhalt ist kein Objekt")
  }
  const data = JSON.parse(JSON.stringify(input)) as SiteContent
  if (!data.meta || !data.profile || !data.hero || !data.about || !data.skills || !data.stats || !data.lab || !data.contact || !data.footer || !data.headings) {
    throw new Error("Pflichtfelder fehlen")
  }
  if (!Array.isArray(data.projects)) throw new Error("projects fehlt")
  if (!Array.isArray(data.about.paragraphs)) throw new Error("about.paragraphs fehlt")
  if (!Array.isArray(data.skills.groups)) throw new Error("skills.groups fehlt")

  data.meta.github = safeHref(text(data.meta.github))
  data.meta.ogImage = safeHref(text(data.meta.ogImage))
  data.profile.born = text(data.profile.born, "2005-07-04")
  data.profile.githubSince = num(data.profile.githubSince, 2020)
  data.hero.lines = (data.hero.lines ?? []).map((line) => ({
    key: text(line.key),
    value: text(line.value),
    href: line.href ? safeHref(line.href) : undefined,
    compute: line.compute === "uptime" ? "uptime" : undefined,
  }))
  data.hero.ctas = (data.hero.ctas ?? []).map((cta) => ({
    label: text(cta.label),
    href: safeHref(text(cta.href, "#")),
    variant: cta.variant === "solid" || cta.variant === "ghost" ? cta.variant : "line",
    external: Boolean(cta.external),
  }))
  data.about.facts = (data.about.facts ?? []).map((fact) => ({
    icon: text(fact.icon),
    key: text(fact.key),
    value: text(fact.value),
    compute: fact.compute === "age" ? "age" : undefined,
  }))
  data.about.log = (data.about.log ?? []).map((entry) => ({
    hash: text(entry.hash),
    year: text(entry.year),
    msg: text(entry.msg),
  }))
  data.skills.chips = (data.skills.chips ?? []).map((chip) => text(chip).trim()).filter(Boolean)
  data.skills.groups = data.skills.groups.map((group) => ({
    title: text(group.title),
    items: (group.items ?? []).map((item) => ({
      name: text(item.name),
      level: Math.max(0, Math.min(100, Math.round(num(item.level)))),
    })),
  }))
  data.stats.items = (data.stats.items ?? []).map((item) => ({
    value: Math.max(0, Math.round(num(item.value))),
    suffix: text(item.suffix),
    label: text(item.label),
    compute: item.compute === "githubYears" ? "githubYears" : undefined,
  }))
  data.projects = data.projects.map((project, index) => {
    const name = text(project.name).trim()
    if (!name) throw new Error(`Projekt ${index + 1} ohne Name`)
    const url = safeHref(text(project.url))
    if (url === "#") throw new Error(`Projekt ${name} ohne gültige URL`)
    const home = text(project.home ?? "").trim()
    return {
      name,
      full: text(project.full),
      lang: text(project.lang),
      color: /^#[0-9a-fA-F]{6}$/.test(text(project.color)) ? text(project.color) : "#6d28d9",
      stars: Math.max(0, Math.round(num(project.stars))),
      desc: text(project.desc),
      tags: (project.tags ?? []).map((tag) => text(tag).trim()).filter(Boolean),
      url,
      home: home ? safeHref(home) : null,
      homeLabel: text(project.homeLabel),
    }
  })
  data.lab.items = (data.lab.items ?? []).map((item) => ({
    name: text(item.name).trim(),
    href: safeHref(text(item.href)),
    desc: text(item.desc),
  })).filter((item) => item.name)
  data.contact.cards = (data.contact.cards ?? []).map((card) => ({
    icon: text(card.icon),
    title: text(card.title),
    sub: text(card.sub),
    href: safeHref(text(card.href)),
  }))
  return data
}

export async function readSite(): Promise<SiteContent> {
  const raw = await readFile(file, "utf8")
  return validateSite(JSON.parse(raw))
}

export async function writeSite(input: unknown): Promise<SiteContent> {
  const site = validateSite(input)
  const tmp = `${file}.tmp`
  await writeFile(tmp, `${JSON.stringify(site, null, 2)}\n`, "utf8")
  await rename(tmp, file)
  return site
}
