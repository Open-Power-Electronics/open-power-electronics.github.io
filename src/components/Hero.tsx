import { CodeXml } from "lucide-react"
import { OPENPE_REPO_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { Film } from "./Film.tsx"
import { HeroDownloads } from "./HeroDownloads.tsx"
import { Wordmark } from "./primitives.tsx"

const foundations = [
  { name: "KiCad", icon: "/technology/kicad-mono.svg" },
  { name: "Open CASCADE", icon: "/technology/opencascade.png" },
  { name: "ngspice", icon: "/technology/ngspice-mono.png" },
  { name: "Gmsh", icon: "/technology/gmsh-mono.png" },
  { name: "Elmer", icon: "/technology/elmer-mono.png" },
] as const

export function Hero() {
  const { lang, t } = useI18n()
  const wordSpace = lang === "en" ? " " : ""

  return (
    <section id="top" className="circuit-field hero-section relative pt-16">
      <div className="container-page hero-layout">
        <div className="hero-copy flex min-w-0 flex-col items-center text-center">
          <Wordmark className="hero-brand rise" />
          <h1 className="display hero-title rise" style={{ animationDelay: "0.12s" }}>
            <span>{t.hero.titleMain}</span>{" "}
            <span className="hero-title-audience">
              <span className="hero-title-for">{t.hero.titleFor}</span>{wordSpace}
              <span className="hero-title-accent">{t.hero.titleDomain}</span>{wordSpace}
              <span>{t.hero.titleRole}</span>
            </span>
          </h1>
          <div className="hero-actions">
            <HeroDownloads />
            <a
              href={OPENPE_REPO_URL}
              className="hero-open-source inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap text-ink-2 underline-offset-4 transition-colors hover:text-green-deep hover:underline"
            >
              <CodeXml className="size-4 shrink-0 text-green-deep" strokeWidth={1.8} aria-hidden="true" />
              {t.hero.openSource}
            </a>
          </div>
        </div>
        <div className="hero-film-stage">
          <Film />
        </div>
        <section className="hero-foundations" aria-labelledby="hero-foundations-title">
          <h2 id="hero-foundations-title" className="hero-foundations-title">{t.hero.foundations}</h2>
          <ul className="hero-foundations-list" role="list">
            {foundations.map(({ name, icon }) => (
              <li key={name}>
                <span className="hero-foundations-icon" style={{ maskImage: `url(${icon})` }} aria-hidden="true" />
                <span className="hero-foundations-name">{name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
