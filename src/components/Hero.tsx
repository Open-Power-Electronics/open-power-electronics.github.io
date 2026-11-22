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
    <section id="top" className="circuit-field relative pt-16">
      <div className="container-page hero-layout grid items-center gap-6 pt-7 pb-8 lg:min-h-[min(30rem,68svh)] lg:py-14">
        <div className="hero-copy flex min-w-0 flex-col items-start">
          <p className="rise mb-3 rounded-full border border-green/20 bg-mint-2 px-3 py-1 text-sm font-semibold text-green-deep">
            {t.hero.openSource}
          </p>
          <h1 className="display hero-title rise" style={{ animationDelay: "0.12s" }}>
            <span className="hero-title-intro">
              {t.hero.titleTop}
              <span className="hero-title-trace" aria-hidden="true" />
            </span>{" "}
            <span className="hero-title-accent">{t.hero.titleAccent}</span>{" "}
            <span className="hero-title-workbench">{t.hero.titleBottom}</span>
          </h1>
          <HeroDownloads />
        </div>
        <Film />
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
