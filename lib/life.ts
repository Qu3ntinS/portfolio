export function life(born: string, now = new Date()) {
  const [y, m, d] = born.split("-").map(Number)
  if (!y || !m || !d) return { years: 0, label: "" }
  let years = now.getFullYear() - y
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) years--
  let last = new Date(now.getFullYear(), m - 1, d)
  if (last > now) last = new Date(now.getFullYear() - 1, m - 1, d)
  const days = Math.max(0, Math.floor((now.getTime() - last.getTime()) / 864e5))
  return { years, label: `${years} Jahre, ${days} Tage` }
}

export function githubYears(since: number, now = new Date()) {
  return Math.max(1, now.getFullYear() - since)
}
