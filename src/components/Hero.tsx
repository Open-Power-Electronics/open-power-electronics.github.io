import { Play } from "lucide-react"
import { FILM_ID, GITHUB_ORG_URL, PLATFORMS } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { Clip } from "./Clip.tsx"
import { GithubMark } from "./primitives.tsx"

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="top" className="mint-corners relative overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]"
      />
      <div className="container-page relative grid items-center gap-12 pt-16 pb-20 md:pt-24 lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:pt-28 lg:pb-28">
        <div className="flex flex-col items-start">
          <p
            className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 py-1.5 pr-3.5 pl-3 font-mono text-[12px] text-body backdrop-blur"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="signal-dot size-2 rounded-full bg-signal" />
            {t.hero.badge}
          </p>
          <h1 className="display rise mt-7 text-[40px] sm:text-[60px] lg:text-[56px] xl:text-[66px]" style={{ animationDelay: "0.12s" }}>
            <span className="block">{t.hero.titleTop}</span>
            <span className="block text-green">{t.hero.titleAccent}</span>
            <span className="block">{t.hero.titleBottom}</span>
          </h1>
          <p className="lede rise mt-7 max-w-[540px] text-pretty" style={{ animationDelay: "0.22s" }}>
            {t.hero.lede}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.3s" }}>
            <a
              href={`#${FILM_ID}`}
              className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink pr-5 pl-2 text-[15px] font-semibold text-white transition-colors hover:bg-ink-2"
            >
              <span className="grid size-8 place-items-center rounded-full bg-white/12 transition-colors group-hover:bg-signal group-hover:text-ink">
                <Play className="size-3.5 translate-x-px fill-current" strokeWidth={0} />
              </span>
              {t.hero.watch}
            </a>
            <a
              href={GITHUB_ORG_URL}
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30"
            >
              <GithubMark className="size-4" />
              {t.hero.github}
            </a>
          </div>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px]" style={{ animationDelay: "0.38s" }}>
            <p className="tracking-[0.06em] text-muted uppercase">{t.hero.platformsLabel}</p>
            <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-ink-2">
              {PLATFORMS.map((platform, index) => (
                <li key={platform} className="flex items-center gap-4">
                  {index > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-faint" />}
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rise relative -mx-6 lg:mx-0 lg:-mr-16" style={{ animationDelay: "0.2s" }}>
          <Clip
            name="intro"
            label="Exploded view of an OpenPE power board"
            className="mix-blend-multiply [mask-image:radial-gradient(75%_75%_at_50%_50%,black_60%,transparent)]"
          />
        </div>
      </div>
    </section>
  )
}
