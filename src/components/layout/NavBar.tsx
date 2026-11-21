import { useState } from "react"
import { Menu, X } from "lucide-react"
import { GITHUB_ORG_URL, NAV_IDS, NAV_SECTION_ID, parseNavId } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { useObservedGroup } from "@/hooks/useObservedGroup.ts"
import { cn } from "@/lib/utils.ts"

export function NavBar() {
  const { t, lang, toggle } = useI18n()
  const [open, setOpen] = useState(false)
  const active = useObservedGroup({
    selector: "[data-nav]",
    datasetKey: "nav",
    parse: parseNavId,
    initial: null,
    clearWhenHidden: true,
  })
  const nextLabel = lang === "en" ? t.lang.zh : t.lang.en
  const nextAria = lang === "en" ? t.lang.switchToZh : t.lang.switchToEn

  function close() {
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-pe-border bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#overall" className="flex items-center gap-2" aria-label="OpenPE">
          <img src="/brand/openpe-mark.svg" alt="" width={32} height={32} />
          <span className="text-lg font-extrabold tracking-tight text-pe-headline">OpenPE</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="OpenPE">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${NAV_SECTION_ID[id]}`}
              className={cn(
                "text-sm font-semibold",
                active === id ? "text-pe-green" : "text-pe-nav",
              )}
            >
              {t.nav[id]}
            </a>
          ))}
          <a
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-pe-nav"
          >
            {t.nav.github}
          </a>
          <button type="button" onClick={toggle} aria-label={nextAria} className="text-sm font-semibold text-pe-headline">
            {nextLabel}
          </button>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <button type="button" onClick={toggle} aria-label={nextAria} className="text-sm font-semibold text-pe-headline">
            {nextLabel}
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-pe-border"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="flex flex-col gap-3 border-t border-pe-border px-5 py-4 md:hidden" aria-label={t.nav.menu}>
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${NAV_SECTION_ID[id]}`}
              onClick={close}
              className={cn("text-base font-semibold", active === id ? "text-pe-green" : "text-pe-headline")}
            >
              {t.nav[id]}
            </a>
          ))}
          <a href={GITHUB_ORG_URL} target="_blank" rel="noreferrer" className="text-base font-semibold text-pe-headline">
            {t.nav.github}
          </a>
        </nav>
      ) : null}
    </header>
  )
}
