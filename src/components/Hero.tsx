import { CodeXml } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { Film } from "./Film.tsx"
import { HeroDownloads } from "./HeroDownloads.tsx"

const foundations = [
  { name: "KiCad", icon: "/technology/kicad-mono.svg" },
  { name: "Open CASCADE", icon: "/technology/opencascade.png" },
  { name: "ngspice", icon: "/technology/ngspice-mono.png" },
  { name: "Gmsh", icon: "/technology/gmsh-mono.png" },
  { name: "Elmer", icon: "/technology/elmer-mono.png" },
] as const

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="top" className="circuit-field hero-section relative pt-16">
      <div className="container-page hero-layout">
        <div className="hero-copy flex min-w-0 flex-col items-center text-center">
          <h1 className="display hero-title rise" style={{ animationDelay: "0.12s" }}>
            <span>{t.hero.titleMain}</span>{" "}
            <span className="hero-title-audience">
              <span className="hero-title-for">{t.hero.titleFor}</span>{" "}
              <span className="hero-title-accent">{t.hero.titleAudience}</span>
            </span>
          </h1>
          <div className="hero-actions">
            <HeroDownloads />
            <p className="hero-open-source inline-flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap text-ink-2">
              <CodeXml className="size-4 shrink-0 text-green-deep" strokeWidth={1.8} aria-hidden="true" />
              {t.hero.openSource}
            </p>
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
                <span
                  className="hero-foundations-icon"
                  style={{ maskImage: `url(${icon})` }}
                  aria-hidden="true"
                  title={name}
                />
                <span className="sr-only">{name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
