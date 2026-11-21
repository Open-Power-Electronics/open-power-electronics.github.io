import { GITHUB_ORG_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-pe-border px-5 py-10 pb-24 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-pe-nav">
        <p>
          {t.footer.license} · {t.footer.copyright}
        </p>
        <p>
          <a href={GITHUB_ORG_URL} target="_blank" rel="noreferrer" className="font-semibold text-pe-green">
            {t.footer.github}
          </a>
        </p>
        <p className="max-w-3xl leading-relaxed">{t.footer.notices}</p>
      </div>
    </footer>
  )
}
