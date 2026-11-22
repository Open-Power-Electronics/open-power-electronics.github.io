import { CHAPTERS, GITHUB_ORG_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { GithubMark, Wordmark } from "./primitives.tsx"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[420px]">
          <Wordmark />
          <p className="mt-1 text-[13.5px] text-body">{t.footer.license}</p>
        </div>
        <nav aria-label={t.nav.footerLabel} className="flex flex-wrap gap-x-4 gap-y-2">
          {CHAPTERS.map((chapter) => (
            <a key={chapter} href={`#${chapter}`} className="text-[14px] font-medium text-body transition-colors hover:text-ink">
              {t.nav[chapter]}
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
