"use client"

import { useCallback, useEffect, useState } from "react"
import type { ContactCard, Cta, Fact, LabItem, LogEntry, Project, SiteContent, SkillGroup, StatItem } from "@/lib/types"

type Section = "projects" | "lab" | "skills" | "about" | "contact" | "stats" | "text"

const NAV: { id: Section; label: string }[] = [
  { id: "projects", label: "projekte" },
  { id: "lab", label: "lab" },
  { id: "skills", label: "skills" },
  { id: "about", label: "about" },
  { id: "contact", label: "kontakt" },
  { id: "stats", label: "zahlen" },
  { id: "text", label: "texte" },
]

function Field({ label, value, onChange, area = false }: { label: string; value: string; onChange: (value: string) => void; area?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
      {area ? <textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}
    </label>
  )
}

const emptyProject = (): Project => ({
  name: "",
  full: "Qu3ntinS/",
  lang: "",
  color: "#6d28d9",
  stars: 0,
  desc: "",
  tags: [],
  url: "https://github.com/Qu3ntinS/",
  home: null,
  homeLabel: "",
})

export function Admin() {
  const [ready, setReady] = useState<"load" | "login" | "noconfig" | "edit">("load")
  const [configError, setConfigError] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [site, setSite] = useState<SiteContent | null>(null)
  const [saved, setSaved] = useState("")
  const [section, setSection] = useState<Section>("projects")
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const loadContent = useCallback(async () => {
    const res = await fetch("/api/admin/content", { cache: "no-store" })
    if (res.status === 401) {
      setReady("login")
      return
    }
    const body = await res.json()
    if (!res.ok) {
      setConfigError(body.error ?? "Inhalt nicht lesbar")
      setReady("noconfig")
      return
    }
    setSite(body as SiteContent)
    setSaved(JSON.stringify(body))
    setReady("edit")
  }, [])

  useEffect(() => {
    const boot = async () => {
      const session = await fetch("/api/admin/session", { cache: "no-store" })
      if (session.status === 503) {
        const body = await session.json()
        setConfigError(body.error ?? "ADMIN_TOKEN fehlt")
        setReady("noconfig")
        return
      }
      if (!session.ok) {
        setReady("login")
        return
      }
      await loadContent()
    }
    void boot()
  }, [loadContent])

  const save = useCallback(async () => {
    if (!site) return
    setBusy(true)
    setError("")
    setStatus("")
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    })
    const body = await res.json()
    setBusy(false)
    if (!res.ok) {
      setError(body.error ?? "Speichern fehlgeschlagen")
      return
    }
    setSite(body as SiteContent)
    setSaved(JSON.stringify(body))
    setStatus("gespeichert")
  }, [site])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault()
        void save()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [save])

  const login = async () => {
    setLoginError("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    const body = await res.json()
    if (!res.ok) {
      setLoginError(body.error ?? "Login fehlgeschlagen")
      return
    }
    setPassword("")
    await loadContent()
  }

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    setSite(null)
    setReady("login")
  }

  if (ready === "load") {
    return <div className="login-wrap"><p className="hint">session wird geprüft …</p></div>
  }

  if (ready === "noconfig") {
    return (
      <div className="login-wrap">
        <div className="term login">
          <p className="err">{configError}</p>
          <p className="hint">Lege <code>.env.local</code> mit <code>ADMIN_TOKEN</code> an und starte den Server neu.</p>
        </div>
      </div>
    )
  }

  if (ready === "login" || !site) {
    return (
      <div className="login-wrap">
        <form
          className="term login"
          onSubmit={(event) => {
            event.preventDefault()
            void login()
          }}
        >
          <h2 style={{ marginBottom: 12 }}>inhalt pflegen</h2>
          <p className="hint">Passwort ist der Wert von ADMIN_TOKEN.</p>
          {loginError ? <p className="err">{loginError}</p> : null}
          <label className="field">
            <span>Passwort</span>
            <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="btn solid" type="submit">anmelden</button>
        </form>
      </div>
    )
  }

  const dirty = JSON.stringify(site) !== saved
  const patch = (next: SiteContent) => setSite(next)

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <h1>quentin<b>@</b>admin</h1>
        {NAV.map((item) => (
          <button key={item.id} className={`navbtn${section === item.id ? " active" : ""}`} type="button" onClick={() => setSection(item.id)}>
            {section === item.id ? "./" : ""}{item.label}
          </button>
        ))}
        <div className="side-links">
          <a href="/">seite ansehen</a>
          <button className="navbtn" type="button" onClick={() => void logout()}>abmelden</button>
        </div>
      </aside>
      <div className="admin-main">
        <h2>{NAV.find((item) => item.id === section)?.label}</h2>
        {error ? <p className="err">{error}</p> : null}
        {section === "projects" ? <Projects site={site} patch={patch} /> : null}
        {section === "lab" ? <Lab site={site} patch={patch} /> : null}
        {section === "skills" ? <Skills site={site} patch={patch} /> : null}
        {section === "about" ? <About site={site} patch={patch} /> : null}
        {section === "contact" ? <Contact site={site} patch={patch} /> : null}
        {section === "stats" ? <Stats site={site} patch={patch} /> : null}
        {section === "text" ? <Texts site={site} patch={patch} /> : null}
        <div className="savebar">
          <p>{dirty ? "ungespeichert" : status || "alles gespeichert"} · Ctrl/Cmd+S</p>
          <button className="btn solid" type="button" disabled={busy} onClick={() => void save()}>{busy ? "speichert …" : "speichern"}</button>
        </div>
      </div>
    </div>
  )
}

function Projects({ site, patch }: { site: SiteContent; patch: (next: SiteContent) => void }) {
  const setItem = (index: number, project: Project) => {
    const projects = site.projects.map((item, i) => (i === index ? project : item))
    patch({ ...site, projects })
  }
  return (
    <>
      {site.projects.map((project, index) => (
        <article className="card" key={`${project.url}-${index}`}>
          <div className="card-top">
            <strong>{project.name || "neues projekt"}</strong>
            <button className="danger" type="button" onClick={() => patch({ ...site, projects: site.projects.filter((_, i) => i !== index) })}>löschen</button>
          </div>
          <div className="row2">
            <Field label="Name" value={project.name} onChange={(name) => setItem(index, { ...project, name })} />
            <Field label="GitHub full name" value={project.full} onChange={(full) => setItem(index, { ...project, full })} />
          </div>
          <Field label="Beschreibung" value={project.desc} area onChange={(desc) => setItem(index, { ...project, desc })} />
          <div className="row3">
            <Field label="Sprache" value={project.lang} onChange={(lang) => setItem(index, { ...project, lang })} />
            <label className="field">
              <span>Farbe</span>
              <input value={project.color} onChange={(event) => setItem(index, { ...project, color: event.target.value })} />
            </label>
            <label className="field">
              <span>Sterne (Fallback)</span>
              <input type="number" value={project.stars} onChange={(event) => setItem(index, { ...project, stars: Number(event.target.value) })} />
            </label>
          </div>
          <Field label="Tags, Komma" value={project.tags.join(", ")} onChange={(value) => setItem(index, { ...project, tags: value.split(",").map((tag) => tag.trim()) })} />
          <div className="row2">
            <Field label="Repo URL" value={project.url} onChange={(url) => setItem(index, { ...project, url })} />
            <Field label="Website URL" value={project.home ?? ""} onChange={(home) => setItem(index, { ...project, home: home || null })} />
          </div>
          <Field label="Website Label" value={project.homeLabel ?? ""} onChange={(homeLabel) => setItem(index, { ...project, homeLabel })} />
        </article>
      ))}
      <button className="btn" type="button" onClick={() => patch({ ...site, projects: [...site.projects, emptyProject()] })}>projekt hinzufügen</button>
    </>
  )
}

function Lab({ site, patch }: { site: SiteContent; patch: (next: SiteContent) => void }) {
  const setItem = (index: number, item: LabItem) => {
    const items = site.lab.items.map((entry, i) => (i === index ? item : entry))
    patch({ ...site, lab: { ...site.lab, items } })
  }
  return (
    <>
      <Field label="Überschrift" value={site.lab.title} onChange={(title) => patch({ ...site, lab: { ...site.lab, title } })} />
      {site.lab.items.map((item, index) => (
        <article className="card" key={`${item.href}-${index}`}>
          <div className="card-top">
            <strong>{item.name || "eintrag"}</strong>
            <button className="danger" type="button" onClick={() => patch({ ...site, lab: { ...site.lab, items: site.lab.items.filter((_, i) => i !== index) } })}>löschen</button>
          </div>
          <div className="row2">
            <Field label="Name" value={item.name} onChange={(name) => setItem(index, { ...item, name })} />
            <Field label="URL" value={item.href} onChange={(href) => setItem(index, { ...item, href })} />
          </div>
          <Field label="Text" value={item.desc} area onChange={(desc) => setItem(index, { ...item, desc })} />
        </article>
      ))}
      <button className="btn" type="button" onClick={() => patch({ ...site, lab: { ...site.lab, items: [...site.lab.items, { name: "", href: "https://", desc: "" }] } })}>lab-eintrag hinzufügen</button>
    </>
  )
}

function Skills({ site, patch }: { site: SiteContent; patch: (next: SiteContent) => void }) {
  const setGroup = (index: number, group: SkillGroup) => {
    const groups = site.skills.groups.map((entry, i) => (i === index ? group : entry))
    patch({ ...site, skills: { ...site.skills, groups } })
  }
  return (
    <>
      {site.skills.groups.map((group, index) => (
        <article className="card" key={`${group.title}-${index}`}>
          <div className="card-top">
            <Field label="Gruppe" value={group.title} onChange={(title) => setGroup(index, { ...group, title })} />
            <button className="danger" type="button" onClick={() => patch({ ...site, skills: { ...site.skills, groups: site.skills.groups.filter((_, i) => i !== index) } })}>löschen</button>
          </div>
          {group.items.map((item, itemIndex) => (
            <div className="row2" key={`${item.name}-${itemIndex}`}>
              <Field label="Skill" value={item.name} onChange={(name) => {
                const items = group.items.map((entry, i) => (i === itemIndex ? { ...entry, name } : entry))
                setGroup(index, { ...group, items })
              }} />
              <label className="field">
                <span>Level {item.level}%</span>
                <input type="range" min={0} max={100} value={item.level} onChange={(event) => {
                  const level = Number(event.target.value)
                  const items = group.items.map((entry, i) => (i === itemIndex ? { ...entry, level } : entry))
                  setGroup(index, { ...group, items })
                }} />
              </label>
            </div>
          ))}
          <button className="btn" type="button" onClick={() => setGroup(index, { ...group, items: [...group.items, { name: "", level: 50 }] })}>skill hinzufügen</button>
        </article>
      ))}
      <button className="btn" type="button" onClick={() => patch({ ...site, skills: { ...site.skills, groups: [...site.skills.groups, { title: "", items: [] }] } })}>gruppe hinzufügen</button>
      <Field label="Chips, eine Zeile pro Chip" area value={site.skills.chips.join("\n")} onChange={(value) => patch({ ...site, skills: { ...site.skills, chips: value.split("\n") } })} />
      <Field label="Notiz" value={site.skills.note} area onChange={(note) => patch({ ...site, skills: { ...site.skills, note } })} />
    </>
  )
}

function About({ site, patch }: { site: SiteContent; patch: (next: SiteContent) => void }) {
  const setFact = (index: number, fact: Fact) => {
    const facts = site.about.facts.map((entry, i) => (i === index ? fact : entry))
    patch({ ...site, about: { ...site.about, facts } })
  }
  const setLog = (index: number, entry: LogEntry) => {
    const log = site.about.log.map((item, i) => (i === index ? entry : item))
    patch({ ...site, about: { ...site.about, log } })
  }
  return (
    <>
      <p className="hint">**fett** wird lila, *kursiv* wird orange, [text](https://…) wird ein Link. {"{age}"} im Baujahr wird ersetzt.</p>
      {site.about.paragraphs.map((paragraph, index) => (
        <Field key={index} label={`Absatz ${index + 1}`} area value={paragraph} onChange={(value) => {
          const paragraphs = site.about.paragraphs.map((entry, i) => (i === index ? value : entry))
          patch({ ...site, about: { ...site.about, paragraphs } })
        }} />
      ))}
      <button className="btn" type="button" onClick={() => patch({ ...site, about: { ...site.about, paragraphs: [...site.about.paragraphs, ""] } })}>absatz hinzufügen</button>
      <Field label="Zitat" value={site.about.quote} area onChange={(quote) => patch({ ...site, about: { ...site.about, quote } })} />
      {site.about.facts.map((fact, index) => (
        <div className="row3" key={`${fact.key}-${index}`}>
          <Field label="Icon" value={fact.icon} onChange={(icon) => setFact(index, { ...fact, icon })} />
          <Field label="Key" value={fact.key} onChange={(key) => setFact(index, { ...fact, key })} />
          <Field label="Wert" value={fact.value} onChange={(value) => setFact(index, { ...fact, value })} />
        </div>
      ))}
      <Field label="Git-Log Titel" value={site.about.logTitle} onChange={(logTitle) => patch({ ...site, about: { ...site.about, logTitle } })} />
      {site.about.log.map((entry, index) => (
        <div className="row3" key={`${entry.hash}-${index}`}>
          <Field label="Hash" value={entry.hash} onChange={(hash) => setLog(index, { ...entry, hash })} />
          <Field label="Jahr" value={entry.year} onChange={(year) => setLog(index, { ...entry, year })} />
          <Field label="Message" value={entry.msg} onChange={(msg) => setLog(index, { ...entry, msg })} />
        </div>
      ))}
      <button className="btn" type="button" onClick={() => patch({ ...site, about: { ...site.about, log: [...site.about.log, { hash: "0000000", year: String(new Date().getFullYear()), msg: "**feat:** " }] } })}>log-zeile hinzufügen</button>
    </>
  )
}

function Contact({ site, patch }: { site: SiteContent; patch: (next: SiteContent) => void }) {
  const setCard = (index: number, card: ContactCard) => {
    const cards = site.contact.cards.map((entry, i) => (i === index ? card : entry))
    patch({ ...site, contact: { ...site.contact, cards } })
  }
  return (
    <>
      <Field label="Lead" value={site.contact.lead} onChange={(lead) => patch({ ...site, contact: { ...site.contact, lead } })} />
      <div className="row2">
        <Field label="OK (grün)" value={site.contact.ok} onChange={(ok) => patch({ ...site, contact: { ...site.contact, ok } })} />
        <Field label="Rest" value={site.contact.tail} onChange={(tail) => patch({ ...site, contact: { ...site.contact, tail } })} />
      </div>
      {site.contact.cards.map((card, index) => (
        <article className="card" key={`${card.href}-${index}`}>
          <div className="card-top">
            <strong>{card.title || "karte"}</strong>
            <button className="danger" type="button" onClick={() => patch({ ...site, contact: { ...site.contact, cards: site.contact.cards.filter((_, i) => i !== index) } })}>löschen</button>
          </div>
          <div className="row3">
            <Field label="Icon" value={card.icon} onChange={(icon) => setCard(index, { ...card, icon })} />
            <Field label="Titel" value={card.title} onChange={(title) => setCard(index, { ...card, title })} />
            <Field label="Untertitel" value={card.sub} onChange={(sub) => setCard(index, { ...card, sub })} />
          </div>
          <Field label="URL" value={card.href} onChange={(href) => setCard(index, { ...card, href })} />
        </article>
      ))}
      <button className="btn" type="button" onClick={() => patch({ ...site, contact: { ...site.contact, cards: [...site.contact.cards, { icon: "🔗", title: "", sub: "", href: "https://" }] } })}>karte hinzufügen</button>
    </>
  )
}

function Stats({ site, patch }: { site: SiteContent; patch: (next: SiteContent) => void }) {
  const setItem = (index: number, item: StatItem) => {
    const items = site.stats.items.map((entry, i) => (i === index ? item : entry))
    patch({ ...site, stats: { ...site.stats, items } })
  }
  return (
    <>
      {site.stats.items.map((item, index) => (
        <div className="row3" key={`${item.label}-${index}`}>
          <label className="field">
            <span>{item.compute === "githubYears" ? "Fallback" : "Zahl"}</span>
            <input type="number" value={item.value} onChange={(event) => setItem(index, { ...item, value: Number(event.target.value) })} />
          </label>
          <Field label="Suffix" value={item.suffix ?? ""} onChange={(suffix) => setItem(index, { ...item, suffix })} />
          <Field label="Label" value={item.label} onChange={(label) => setItem(index, { ...item, label })} />
        </div>
      ))}
      <button className="btn" type="button" onClick={() => patch({ ...site, stats: { ...site.stats, items: [...site.stats.items, { value: 0, suffix: "", label: "" }] } })}>zahl hinzufügen</button>
      <Field label="Notiz" value={site.stats.note} onChange={(note) => patch({ ...site, stats: { ...site.stats, note } })} />
    </>
  )
}

function Texts({ site, patch }: { site: SiteContent; patch: (next: SiteContent) => void }) {
  const setCta = (index: number, cta: Cta) => {
    const ctas = site.hero.ctas.map((entry, i) => (i === index ? cta : entry))
    patch({ ...site, hero: { ...site.hero, ctas } })
  }
  return (
    <>
      <div className="row2">
        <Field label="Titel" value={site.meta.title} onChange={(title) => patch({ ...site, meta: { ...site.meta, title } })} />
        <Field label="Kurzname" value={site.meta.shortTitle} onChange={(shortTitle) => patch({ ...site, meta: { ...site.meta, shortTitle } })} />
      </div>
      <Field label="Description" value={site.meta.description} area onChange={(description) => patch({ ...site, meta: { ...site.meta, description } })} />
      <div className="row2">
        <Field label="User" value={site.profile.user} onChange={(user) => patch({ ...site, profile: { ...site.profile, user } })} />
        <Field label="Host" value={site.profile.host} onChange={(host) => patch({ ...site, profile: { ...site.profile, host } })} />
      </div>
      <div className="row2">
        <Field label="Neofetch Host" value={site.profile.headHost} onChange={(headHost) => patch({ ...site, profile: { ...site.profile, headHost } })} />
        <Field label="Geburtstag" value={site.profile.born} onChange={(born) => patch({ ...site, profile: { ...site.profile, born } })} />
      </div>
      <Field label="Hero-Befehl" value={site.hero.command} onChange={(command) => patch({ ...site, hero: { ...site.hero, command } })} />
      <Field label="Scroll-Hinweis" value={site.hero.scrollHint} onChange={(scrollHint) => patch({ ...site, hero: { ...site.hero, scrollHint } })} />
      {site.hero.lines.map((line, index) => (
        <div className="row2" key={`${line.key}-${index}`}>
          <Field label="Key" value={line.key} onChange={(key) => {
            const lines = site.hero.lines.map((entry, i) => (i === index ? { ...entry, key } : entry))
            patch({ ...site, hero: { ...site.hero, lines } })
          }} />
          <Field label="Wert" value={line.value} onChange={(value) => {
            const lines = site.hero.lines.map((entry, i) => (i === index ? { ...entry, value } : entry))
            patch({ ...site, hero: { ...site.hero, lines } })
          }} />
        </div>
      ))}
      <div className="row2">
        <Field label="About-Befehl" value={site.headings.about} onChange={(about) => patch({ ...site, headings: { ...site.headings, about } })} />
        <Field label="Skills-Befehl" value={site.headings.skills} onChange={(skills) => patch({ ...site, headings: { ...site.headings, skills } })} />
      </div>
      <div className="row2">
        <Field label="Projects-Befehl" value={site.headings.projects} onChange={(projects) => patch({ ...site, headings: { ...site.headings, projects } })} />
        <Field label="Contact-Befehl" value={site.headings.contact} onChange={(contact) => patch({ ...site, headings: { ...site.headings, contact } })} />
      </div>
      {site.hero.ctas.map((cta, index) => (
        <div className="row3" key={`${cta.label}-${index}`}>
          <Field label="Button" value={cta.label} onChange={(label) => setCta(index, { ...cta, label })} />
          <Field label="Href" value={cta.href} onChange={(href) => setCta(index, { ...cta, href })} />
          <label className="field">
            <span>Variante</span>
            <select value={cta.variant} onChange={(event) => setCta(index, { ...cta, variant: event.target.value as Cta["variant"] })}>
              <option value="solid">solid</option>
              <option value="line">line</option>
              <option value="ghost">ghost</option>
            </select>
          </label>
        </div>
      ))}
      <Field label="Footer-Zitat" value={site.footer.quote} area onChange={(quote) => patch({ ...site, footer: { ...site.footer, quote } })} />
      <div className="row2">
        <Field label="Badge" value={site.footer.badge} onChange={(badge) => patch({ ...site, footer: { ...site.footer, badge } })} />
        <Field label="Badge-Toast" value={site.footer.toast} onChange={(toast) => patch({ ...site, footer: { ...site.footer, toast } })} />
      </div>
      <Field label="Copy" value={site.footer.copy} onChange={(copy) => patch({ ...site, footer: { ...site.footer, copy } })} />
      <Field label="GitHub" value={site.meta.github} onChange={(github) => patch({ ...site, meta: { ...site.meta, github } })} />
    </>
  )
}
