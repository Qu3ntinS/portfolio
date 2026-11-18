import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { readSite } from "@/lib/content"
import "./globals.css"

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
})

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-disp",
})

export async function generateMetadata(): Promise<Metadata> {
  const site = await readSite()
  return {
    title: { default: site.meta.title, template: `%s · ${site.meta.shortTitle}` },
    description: site.meta.description,
    openGraph: {
      title: site.meta.ogTitle,
      description: site.meta.ogDescription,
      images: [site.meta.ogImage],
      type: "website",
    },
    icons: {
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E%E2%96%B2%3C/text%3E%3C/svg%3E",
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${mono.variable} ${display.variable}`}>
        <noscript>
          <style>{`#boot{display:none}.reveal,.neofetch,.nf-line,.hero-cta{opacity:1!important;transform:none!important}.fill{width:70%}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
