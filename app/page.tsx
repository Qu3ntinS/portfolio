import { Site } from "@/components/Site"
import { readSite } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function Page() {
  const site = await readSite()
  return <Site site={site} />
}
