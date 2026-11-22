import { useEffect, useRef, useState } from "react"
import { Languages, Menu, X } from "lucide-react"
import { CHAPTERS, GITHUB_ORG_URL, type Chapter } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { cn } from "@/lib/utils.ts"
import { GithubMark, Wordmark } from "./primitives.tsx"

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

function ChapterLinks({ active, closeMenu }: { active: Chapter | null; closeMenu?: () => void }) {
  const { t } = useI18n()
  return CHAPTERS.map((chapter) => (
    <li key={chapter}>
      <a
        href={`#${chapter}`}
        onClick={closeMenu}
        aria-current={active === chapter ? "location" : undefined}
        className={cn(
          "whitespace-nowrap font-medium text-ink-2 transition-colors motion-reduce:transition-none",
          closeMenu
            ? "flex min-h-11 items-center rounded-full px-3 py-2 text-sm hover:bg-paper hover:text-ink aria-[current=location]:bg-mint aria-[current=location]:text-green"
            : "site-nav-chapter inline-flex min-h-11 items-center rounded-md px-2.5 text-[13px] hover:text-green-deep aria-[current=location]:text-green-deep",
        )}
      >
        {t.nav[chapter]}
      </a>
    </li>
  ))
}

export function Nav() {
  const { t, toggle } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const active = useActiveChapter()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia("(min-width: 64rem)")
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) setMenuOpen(false)
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.preventDefault()
      setMenuOpen(false)
      trigger.current?.focus()
    }

    desktop.addEventListener("change", onDesktop)
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onEscape)
    return () => {
      desktop.removeEventListener("change", onDesktop)
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onEscape)
    }
  }, [menuOpen])

  return (
    <div
      className="site-nav fixed inset-x-0 top-0 z-50"
      data-scrolled={scrolled || undefined}
      data-menu-open={menuOpen || undefined}
    >
      <nav className="container-page flex h-16 items-center gap-6" aria-label={t.nav.primaryLabel}>
        <a href="#top" className="shrink-0" aria-label="OpenPE">
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-0.5 lg:flex">
          <ChapterLinks active={active} />
        </ul>
        <div className="ms-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.switchLang}
            title={t.nav.switchLang}
            className="grid size-9 place-items-center rounded-full border border-line bg-white text-body transition-colors hover:bg-paper hover:text-ink"
          >
            <Languages className="size-[18px]" strokeWidth={1.9} />
          </button>
          <a
            href={GITHUB_ORG_URL}
            className="hidden h-9 items-center gap-2 rounded-full bg-ink px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-ink-2 sm:inline-flex"
          >
            <GithubMark className="size-4" />
            {t.nav.github}
          </a>
          <div
            ref={menu}
            className="relative lg:hidden"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
            }}
          >
            <button
              ref={trigger}
              type="button"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-sm font-semibold text-ink-2 transition-colors hover:bg-paper aria-expanded:bg-mint aria-expanded:text-green"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
              {t.nav.menu}
            </button>
            <ul id="mobile-navigation" className="site-nav-menu" hidden={!menuOpen}>
              <ChapterLinks active={active} closeMenu={() => setMenuOpen(false)} />
              <li className="mt-1 border-t border-line pt-1 sm:hidden">
                <a
                  href={GITHUB_ORG_URL}
                  className="flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-2 hover:bg-paper hover:text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  <GithubMark className="size-4" />
                  {t.nav.github}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
