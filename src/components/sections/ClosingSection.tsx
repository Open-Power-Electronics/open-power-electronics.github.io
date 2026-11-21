import { GITHUB_ORG_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { primaryLinkClass } from "@/components/ui/linkStyles.ts"

export function ClosingSection() {
  const { t } = useI18n()
  return (
    <section className="reveal scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[1.15] tracking-tight">
            <span className="block text-pe-headline">{t.closing.lead}</span>
            <span className="block">
              <span className="text-pe-green">{t.closing.power}</span>{" "}
              <span className="text-pe-headline">{t.closing.rest}</span>
            </span>
            <span className="block text-pe-green">{t.closing.engineer}</span>
          </h2>
          <a className={`${primaryLinkClass} mt-8`} href={GITHUB_ORG_URL} target="_blank" rel="noreferrer">
            {t.closing.cta}
          </a>
        </div>
        <img
          src="/media/clips/case.jpg"
          alt={t.closing.imageLabel}
          width={1280}
          height={720}
          className="h-auto w-full rounded-[20px]"
        />
      </div>
    </section>
  )
}
