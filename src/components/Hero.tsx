import { useI18n } from "@/i18n/I18nContext.tsx"
import { Film } from "./Film.tsx"
import { HeroActions } from "./HeroActions.tsx"
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
            <span className="hero-title-main">{t.hero.titleMain}</span>{" "}
            <span className="hero-title-audience">
              <span className="hero-title-for">{t.hero.titleFor}</span>{wordSpace}
              <span className="hero-title-accent">{t.hero.titleDomain}</span>{wordSpace}
              <span>{t.hero.titleRole}</span>
            </span>
          </h1>
          <HeroActions />
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
                <span className="hero-foundations-tooltip">{name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
