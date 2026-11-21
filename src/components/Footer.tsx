import { GITHUB_ORG_URL, NAV_SECTIONS, SECTION_IDS } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { GithubMark, Wordmark } from "./primitives.tsx"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[420px]">
          <Wordmark />
          <p className="mt-4 text-[13.5px] text-body">{t.footer.license}</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{t.footer.notices}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
          {NAV_SECTIONS.map((id) => (
            <a key={id} href={`#${SECTION_IDS[id]}`} className="text-[14px] font-medium text-body transition-colors hover:text-ink">
              {t.nav[id]}
            </a>
          ))}
          <a href={GITHUB_ORG_URL} className="inline-flex items-center gap-2 text-[14px] font-medium text-body transition-colors hover:text-ink">
            <GithubMark className="size-3.5" />
            {t.nav.github}
          </a>
        </nav>
      </div>
    </footer>
  )
}
