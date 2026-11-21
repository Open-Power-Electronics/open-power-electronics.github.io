import { useEffect, useState } from "react"
import { CHAPTERS, GITHUB_ORG_URL, type Chapter } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import type { Lang } from "@/i18n/content.ts"
import { cn } from "@/lib/utils.ts"
import { GithubMark, Wordmark } from "./primitives.tsx"

const LANGS: readonly { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "zh", label: "中文" },
]

function useActiveChapter(): Chapter | null {
  const [active, setActive] = useState<Chapter | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const chapter = CHAPTERS.find((id) => id === entry.target.id)
          if (chapter === undefined) throw new Error(`observed section is not a chapter: ${entry.target.id}`)
          if (entry.isIntersecting) setActive(chapter)
          else setActive((current) => (current === chapter ? null : current))
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    )
    for (const chapter of CHAPTERS) {
      const element = document.getElementById(chapter)
      if (element === null) throw new Error(`chapter section missing: ${chapter}`)
      observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])

  return active
}

export function Nav() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveChapter()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-b border-line/80 bg-white/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-6" aria-label="Primary">
        <a href="#top" className="shrink-0" aria-label="OpenPE">
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-0.5 lg:flex">
          {CHAPTERS.map((chapter) => (
            <li key={chapter}>
              <a
                href={`#${chapter}`}
                aria-current={active === chapter ? "location" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-[14px] font-medium transition-colors",
                  active === chapter ? "bg-mint text-green" : "text-body hover:bg-paper hover:text-ink",
                )}
              >
                {t.nav[chapter]}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div role="group" aria-label={t.nav.langLabel} className="flex rounded-full border border-line bg-white p-0.5">
            {LANGS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={lang === option.id}
                onClick={() => setLang(option.id)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[12.5px] font-medium transition-colors",
                  lang === option.id ? "bg-ink text-white" : "text-body hover:text-ink",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <a
            href={GITHUB_ORG_URL}
            className="hidden h-9 items-center gap-2 rounded-full bg-ink px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-ink-2 sm:inline-flex"
          >
            <GithubMark className="size-4" />
            {t.nav.github}
          </a>
        </div>
      </nav>
    </div>
  )
}
