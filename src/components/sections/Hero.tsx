import { GITHUB_ORG_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { Clip } from "@/components/media/Clip.tsx"
import { primaryLinkClass, secondaryLinkClass } from "@/components/ui/linkStyles.ts"

export function Hero() {
  const { t } = useI18n()
  return (
    <section id="overall" data-chapter="overall" className="pe-hero scroll-mt-24 px-5 pt-14 pb-8 md:px-8 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-[clamp(1.45rem,2.9vw,4.5rem)] font-extrabold leading-[1.15] tracking-tight">
            <span className="block whitespace-nowrap text-pe-headline">{t.hero.line1}</span>
            <span className="block whitespace-nowrap text-pe-green">{t.hero.line2}</span>
            <span className="block whitespace-nowrap text-pe-headline">{t.hero.line3}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pe-body">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className={primaryLinkClass} href="#film">
              {t.hero.watch}
            </a>
            <a className={secondaryLinkClass} href={GITHUB_ORG_URL} target="_blank" rel="noreferrer">
              {t.hero.github}
            </a>
          </div>
        </div>
        <div className="pe-grid rounded-[20px] p-3 sm:p-5">
          <Clip name="intro" label={t.hero.clipLabel} />
        </div>
      </div>
    </section>
  )
}
