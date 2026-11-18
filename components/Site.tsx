"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import type { SiteContent, StatItem } from "@/lib/types"
import { githubYears, life } from "@/lib/life"
import { Rich } from "./Rich"

const LOGO = `                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`

const BOOT = [
  "[  OK  ] Mounted /dev/quentin",
  "[  OK  ] Started Fullstack Engine",
  "[  OK  ] Loaded car_enthusiast.ko",
  "[  OK  ] Loaded gamer_at_heart.ko",
  "[  OK  ] Reached target Clean Code",
  "[  OK  ] Starting portfolio.service ...",
]

const PALETTE = ["#1e2530", "#ff5f56", "#27c93f", "#ffbd2e", "#6d28d9", "#b48cff", "#4ec9e8", "#d7e2ee"]
const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"]

const Seen = createContext(false)

function In({
  tag = "div",
  className = "",
  children,
  href,
  target,
  rel,
  style,
}: {
  tag?: "div" | "h2" | "p" | "a" | "article"
  className?: string
  children: ReactNode
  href?: string
  target?: string
  rel?: string
  style?: CSSProperties
}) {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!node) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      setOn(true)
      io.disconnect()
    }, { threshold: 0.18 })
    io.observe(node)
    return () => io.disconnect()
  }, [node])
  const cls = `reveal${on ? " in" : ""}${className ? ` ${className}` : ""}`
  const Tag = tag
  return (
    <Seen.Provider value={on}>
      <Tag ref={setNode as never} className={cls} href={href} target={target} rel={rel} style={style}>
        {children}
      </Tag>
    </Seen.Provider>
  )
}

function Fill({ level }: { level: number }) {
  const on = useContext(Seen)
  return <div className="fill" style={{ width: on ? `${level}%` : 0 }} />
}

function Count({ item, target }: { item: StatItem; target: number }) {
  const on = useContext(Seen)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setN(target)
      return
    }
    const start = performance.now()
    let frame = 0
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1200)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * eased))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [on, target])
  return (
    <div className="num">
      {n.toLocaleString("de-DE")}
      {item.suffix ? <small>{item.suffix}</small> : null}
    </div>
  )
}

function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        setP(max > 0 ? h.scrollTop / max : 0)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return <div id="progress" style={{ width: `${p * 100}%` }} />
}

function externalProps(href: string, external?: boolean) {
  const offsite = external || href.startsWith("http")
  return offsite ? { target: "_blank" as const, rel: "noopener noreferrer" } : {}
}

export function Site({ site }: { site: SiteContent }) {
  const { profile } = site
  const [bootOn, setBootOn] = useState(true)
  const [log, setLog] = useState<string[]>([])
  const [cmd, setCmd] = useState("")
  const [showFetch, setShowFetch] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState("")
  const [toast, setToast] = useState("")
  const [toastOn, setToastOn] = useState(false)
  const [race, setRace] = useState(false)
  const [live, setLive] = useState(false)
  const [stars, setStars] = useState<Record<string, number>>(() =>
    Object.fromEntries(site.projects.map((project) => [project.full, project.stars])),
  )
  const [year, setYear] = useState(2026)
  const stopIntro = useRef<() => void>(() => {})

  useEffect(() => {
    setLive(true)
    setYear(new Date().getFullYear())
    setLog([])
    setCmd("")
    setBootOn(true)
    setShowFetch(false)
    setShowCta(false)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let cancel = false
    const timers: number[] = []
    const clear = () => {
      cancel = true
      timers.forEach((id) => {
        window.clearTimeout(id)
        window.clearInterval(id)
      })
    }
    stopIntro.current = clear
    const command = site.hero.command
    const reveal = () => {
      if (cancel) return
      setShowFetch(true)
      timers.push(window.setTimeout(() => {
        if (!cancel) setShowCta(true)
      }, reduced ? 0 : 700))
    }
    const type = () => {
      if (cancel) return
      if (reduced) {
        setCmd(command)
        reveal()
        return
      }
      let i = 0
      timers.push(window.setInterval(() => {
        if (cancel) return
        i += 1
        setCmd(command.slice(0, i))
        if (i >= command.length) {
          clear()
          cancel = false
          reveal()
        }
      }, 42))
    }
    if (reduced) {
      setBootOn(false)
      type()
    } else {
      let i = 0
      timers.push(window.setInterval(() => {
        if (cancel) return
        if (i < BOOT.length) {
          const line = BOOT[i]
          i += 1
          setLog((prev) => [...prev, line])
        } else {
          clear()
          cancel = false
          timers.push(window.setTimeout(() => {
            if (cancel) return
            setBootOn(false)
            type()
          }, 350))
        }
      }, 105))
    }
    return clear
  }, [site.hero.command])

  useEffect(() => {
    const ids = ["about", "skills", "projects", "contact"]
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    const spy = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: "-40% 0px -55% 0px" })
    els.forEach((el) => spy.observe(el))
    return () => spy.disconnect()
  }, [])

  useEffect(() => {
    let pos = 0
    const onKey = (event: KeyboardEvent) => {
      const key = (event.key || "").toLowerCase()
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0
      if (pos === KONAMI.length) {
        pos = 0
        setRace(true)
        setToast("🏁 RACE MODE ENGAGED — Reifenrauch inklusive!")
        setToastOn(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("race", race)
    if (!race) return
    const timer = window.setTimeout(() => setRace(false), 6400)
    return () => window.clearTimeout(timer)
  }, [race])

  useEffect(() => {
    if (!toastOn) return
    const timer = window.setTimeout(() => setToastOn(false), 2600)
    return () => window.clearTimeout(timer)
  }, [toastOn, toast])

  useEffect(() => {
    const ac = new AbortController()
    const apply = (full: string, count: number) => {
      setStars((prev) => (full in prev ? { ...prev, [full]: count } : prev))
    }
    fetch("https://api.github.com/users/Qu3ntinS/repos?per_page=100", { signal: ac.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((repos: { full_name: string; stargazers_count: number }[]) => {
        repos.forEach((repo) => apply(repo.full_name, repo.stargazers_count))
      })
      .catch(() => {})
    site.projects
      .filter((project) => project.full && !project.full.startsWith("Qu3ntinS/"))
      .forEach((project) => {
        fetch(`https://api.github.com/repos/${project.full}`, { signal: ac.signal })
          .then((res) => (res.ok ? res.json() : null))
          .then((repo: { stargazers_count: number } | null) => {
            if (repo) apply(project.full, repo.stargazers_count)
          })
          .catch(() => {})
      })
    return () => ac.abort()
  }, [site.projects])

  const now = live ? life(profile.born) : null
  const years = now?.years ?? (Number(profile.ageFallback) || 0)
  const uptime = now?.label ?? profile.uptimeFallback
  const ghYears = live ? githubYears(profile.githubSince) : null

  const skipBoot = () => {
    stopIntro.current()
    setBootOn(false)
    setCmd(site.hero.command)
    setShowFetch(true)
    setShowCta(true)
  }

  const statTarget = (item: StatItem) => (item.compute === "githubYears" && ghYears != null ? ghYears : item.value)

  return (
    <>
      <div id="boot" className={bootOn ? undefined : "done"} aria-hidden="true" onClick={skipBoot}>
        <pre>
          {log.map((line) => (
            <span key={line}>
              <span className="ok">[  OK  ]</span>
              {line.replace("[  OK  ]", "")}
              {"\n"}
            </span>
          ))}
        </pre>
      </div>
      <Progress />
      <div className="bg" aria-hidden="true" />
      <nav>
        <div className="nav-in">
          <a className="brand" href="#home" onClick={() => setMenu(false)}>
            {profile.user}<b>@</b>{profile.host}<b>:~$</b>
          </a>
          <button id="burger" aria-label="Menü" aria-expanded={menu} onClick={() => setMenu((open) => !open)}>☰</button>
          <div className={`links${menu ? " open" : ""}`} id="links">
            {[
              ["about", "about"],
              ["skills", "skills"],
              ["projects", "projects"],
              ["contact", "contact"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? "active" : undefined} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a href={site.meta.github} target="_blank" rel="noopener noreferrer">github ↗</a>
          </div>
        </div>
      </nav>
      <main>
        <section id="home">
          <div className="wrap">
            <div className="term">
              <div className="t-bar">
                <span className="dot" style={{ background: "#ff5f56" }} />
                <span className="dot" style={{ background: "#ffbd2e" }} />
                <span className="dot" style={{ background: "#27c93f" }} />
                <span className="t-title">{profile.user}@{profile.host}: ~</span>
              </div>
              <div className="t-body">
                <div className="cmdline">
                  <span className="u">{profile.user}</span>
                  <span className="at">@</span>
                  <span className="h">{profile.host}</span>{" "}
                  <span className="path" style={{ color: "var(--cyan)" }}>~</span> % {cmd}
                  <span className="cursor" />
                </div>
                <div className={`neofetch${showFetch ? " show" : ""}`}>
                  <pre className="nf-logo" aria-hidden="true">{LOGO}</pre>
                  <div className="nf-info">
                    <div className="nf-line nf-head" style={{ transitionDelay: "0ms" }}>
                      {profile.user}<b>@</b>{profile.headHost}
                    </div>
                    <div className="nf-line nf-sep" style={{ transitionDelay: "55ms" }}>─────────────────────</div>
                    {site.hero.lines.map((line, index) => {
                      const value = line.compute === "uptime" ? uptime : line.value
                      return (
                        <div className="nf-line" style={{ transitionDelay: `${(index + 2) * 55}ms` }} key={line.key}>
                          <span className="nf-key">{line.key}</span>
                          <span className="nf-sep">: </span>
                          {line.href ? (
                            <a href={line.href} {...externalProps(line.href, true)}>{value}</a>
                          ) : value}
                        </div>
                      )
                    })}
                    <div className="nf-line palette" aria-hidden="true" style={{ transitionDelay: `${(site.hero.lines.length + 2) * 55}ms` }}>
                      {PALETTE.map((color) => <span key={color} style={{ background: color }} />)}
                    </div>
                  </div>
                </div>
                <div className={`hero-cta${showCta ? " show" : ""}`}>
                  {site.hero.ctas.map((cta) => (
                    <a key={cta.label} className={`btn${cta.variant === "solid" ? " solid" : ""}${cta.variant === "ghost" ? " ghost" : ""}`} href={cta.href} {...externalProps(cta.href, cta.external)}>
                      {cta.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="scroll-hint">{site.hero.scrollHint}</div>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <In tag="h2" className="sec">
              <span className="p">{profile.user}@{profile.host}</span>:<span className="path">~/about</span>$ <span className="c">{site.headings.about}</span>
            </In>
            <div className="about-grid">
              <In className="term">
                <div className="t-body about-txt">
                  {site.about.paragraphs.map((paragraph) => (
                    <p key={paragraph}><Rich text={paragraph} /></p>
                  ))}
                  <blockquote><Rich text={site.about.quote} /></blockquote>
                </div>
              </In>
              <In className="term">
                <div className="t-body">
                  <ul className="facts">
                    {site.about.facts.map((fact) => {
                      const value = fact.compute === "age" ? fact.value.replace("{age}", String(years)) : fact.value
                      return (
                        <li key={fact.key}>
                          <span>{fact.icon}</span>
                          <span className="k">{fact.key}</span>
                          <span><Rich text={value} /></span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </In>
            </div>
            <In className="term gitlog">
              <div className="t-body">
                <h3 className="gl-title">{site.about.logTitle}</h3>
                {site.about.log.map((entry) => (
                  <div className="gl-line" key={entry.hash}>
                    <span className="gl-hash">{entry.hash}</span>
                    <span className="gl-year">{entry.year}</span>
                    <span className="gl-msg"><Rich text={entry.msg} bold="b" /></span>
                  </div>
                ))}
              </div>
            </In>
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <In tag="h2" className="sec">
              <span className="p">{profile.user}@{profile.host}</span>:<span className="path">~/skills</span>$ <span className="c">{site.headings.skills}</span>
            </In>
            <div className="skill-groups">
              {site.skills.groups.map((group) => (
                <In className="term group" key={group.title}>
                  <div className="t-body">
                    <h3>{group.title}</h3>
                    {group.items.map((item) => (
                      <div className="skill" key={item.name}>
                        <div className="skill-top"><span>{item.name}</span><span className="pct">{item.level}%</span></div>
                        <div className="track"><Fill level={item.level} /></div>
                      </div>
                    ))}
                  </div>
                </In>
              ))}
            </div>
            <In className="chips">
              {site.skills.chips.map((chip, index) => (
                <span className="chip" key={`${chip}-${index}`}>{chip}</span>
              ))}
            </In>
            <In tag="p" className="note">{site.skills.note}</In>
          </div>
        </section>

        <section id="stats" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="stats">
              {site.stats.items.map((item) => (
                <In className="term stat" key={item.label}>
                  <Count item={item} target={statTarget(item)} />
                  <div className="lbl">{item.label}</div>
                </In>
              ))}
            </div>
            <In tag="p" className="note" style={{ textAlign: "center" }}>{site.stats.note}</In>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <In tag="h2" className="sec">
              <span className="p">{profile.user}@{profile.host}</span>:<span className="path">~/projects</span>$ <span className="c">{site.headings.projects}</span>
            </In>
            <div className="proj-grid">
              {site.projects.map((project) => (
                <In tag="article" className="term project" key={project.name}>
                  <div className="p-head">
                    <span className="p-name">{project.name}</span>
                    <span className="p-stars">★ {stars[project.full] ?? project.stars}</span>
                  </div>
                  <p className="p-desc">{project.desc}</p>
                  <div className="p-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="p-foot">
                    <span className="lang"><i style={{ background: project.color }} />{project.lang}</span>
                    <span className="p-links">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">repo ↗</a>
                      {project.home ? <a href={project.home} target="_blank" rel="noopener noreferrer">{project.homeLabel || "site"} ↗</a> : null}
                    </span>
                  </div>
                </In>
              ))}
            </div>
            <In className="term lab">
              <div className="t-body">
                <h3>{site.lab.title}</h3>
                <ul>
                  {site.lab.items.map((item) => (
                    <li key={item.name}>
                      <a className="n" href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a>
                      <span className="d">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </In>
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <In tag="h2" className="sec">
              <span className="p">{profile.user}@{profile.host}</span>:<span className="path">~/contact</span>$ <span className="c">{site.headings.contact}</span>
            </In>
            <In tag="p" className="ping">
              {site.contact.lead}<span className="ok">{site.contact.ok}</span>{site.contact.tail}
            </In>
            <div className="c-grid">
              {site.contact.cards.map((card) => (
                <In tag="a" className="term c-card" key={card.title} href={card.href} target="_blank" rel="noopener noreferrer">
                  <div className="ico">{card.icon}</div>
                  <div className="t">{card.title}</div>
                  <div className="s">{card.sub}</div>
                </In>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p className="q">{site.footer.quote}</p>
        <button
          className="arch-badge"
          type="button"
          onClick={() => {
            setToast(site.footer.toast)
            setToastOn(true)
          }}
        >
          {site.footer.badge}
        </button>
        <p className="konami" title="Probier's aus.">{site.footer.konami}</p>
        <p className="copy">© {year} {site.footer.copy}</p>
      </footer>
      <div id="toast" role="status" className={toastOn ? "show" : undefined}>{toast}</div>
      <div id="race" aria-hidden="true"><div className="speedlines" /><div className="car">🏎️</div></div>
    </>
  )
}
