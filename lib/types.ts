export type HeroLine = {
  key: string
  value: string
  href?: string
  compute?: "uptime"
}

export type Cta = {
  label: string
  href: string
  variant: "solid" | "line" | "ghost"
  external?: boolean
}

export type Fact = {
  icon: string
  key: string
  value: string
  compute?: "age"
}

export type LogEntry = {
  hash: string
  year: string
  msg: string
}

export type SkillItem = {
  name: string
  level: number
}

export type SkillGroup = {
  title: string
  items: SkillItem[]
}

export type StatItem = {
  value: number
  suffix?: string
  label: string
  compute?: "githubYears"
}

export type Project = {
  name: string
  full: string
  lang: string
  color: string
  stars: number
  desc: string
  tags: string[]
  url: string
  home: string | null
  homeLabel?: string
}

export type LabItem = {
  name: string
  href: string
  desc: string
}

export type ContactCard = {
  icon: string
  title: string
  sub: string
  href: string
}

export type SiteContent = {
  meta: {
    title: string
    shortTitle: string
    description: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    github: string
  }
  profile: {
    user: string
    host: string
    headHost: string
    born: string
    githubSince: number
    uptimeFallback: string
    ageFallback: string
  }
  hero: {
    command: string
    lines: HeroLine[]
    ctas: Cta[]
    scrollHint: string
  }
  headings: {
    about: string
    skills: string
    projects: string
    contact: string
  }
  about: {
    paragraphs: string[]
    quote: string
    facts: Fact[]
    logTitle: string
    log: LogEntry[]
  }
  skills: {
    note: string
    groups: SkillGroup[]
    chips: string[]
  }
  stats: {
    note: string
    items: StatItem[]
  }
  projects: Project[]
  lab: {
    title: string
    items: LabItem[]
  }
  contact: {
    lead: string
    ok: string
    tail: string
    cards: ContactCard[]
  }
  footer: {
    quote: string
    badge: string
    toast: string
    konami: string
    copy: string
  }
}
