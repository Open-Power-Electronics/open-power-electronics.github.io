import { ArrowUpRight } from "lucide-react"
import { CHAPTERS, GITHUB_ORG_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { GithubMark, Wordmark } from "./primitives.tsx"

const researchGroupLinks = [
  { id: "talentLab", href: "https://ai4s.lab.westlake.edu.cn/" },
  { id: "tueEes", href: "https://www.tue.nl/en/research/research-groups/electrical-energy-systems/" },
] as const

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-1 text-[13.5px] text-body">{t.footer.license}</p>
          </div>
          <nav aria-label={t.nav.footerLabel} className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
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
        <ul role="list" className="mt-4 flex flex-col gap-x-6 gap-y-1 border-t border-line pt-3 sm:flex-row sm:flex-wrap">
          {researchGroupLinks.map(({ id, href }) => (
            <li key={id}>
              <a href={href} className="inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-green-deep underline-offset-4 transition-colors hover:underline">
                {t.footer[id]}
                <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
