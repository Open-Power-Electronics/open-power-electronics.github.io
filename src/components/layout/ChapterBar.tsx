import { Box, CircuitBoard, LayoutGrid, PenTool, Puzzle, type LucideIcon } from "lucide-react"
import { CHAPTER_IDS, CHAPTER_SECTION_ID, parseChapterId, type ChapterId } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { useObservedGroup } from "@/hooks/useObservedGroup.ts"
import { cn } from "@/lib/utils.ts"

const CHAPTER_ICON: Record<ChapterId, LucideIcon> = {
  overall: LayoutGrid,
  schematic: CircuitBoard,
  layout: PenTool,
  module: Box,
  plugins: Puzzle,
}

export function ChapterBar() {
  const { t } = useI18n()
  const active = useObservedGroup({
    selector: "[data-chapter]",
    datasetKey: "chapter",
    parse: parseChapterId,
    initial: "overall",
    clearWhenHidden: false,
  })
  if (active === null) throw new Error("chapter bar has no active chapter")
  const index = CHAPTER_IDS.indexOf(active)
  if (index < 0) throw new Error(`chapter index missing: ${active}`)
  const width = `${((index + 0.5) / CHAPTER_IDS.length) * 100}%`

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pe-border bg-white/92 backdrop-blur">
      <nav aria-label={t.chapters.overall} className="mx-auto max-w-6xl overflow-x-auto px-3 py-2 md:px-8">
        <div className="relative grid min-w-[340px] grid-cols-5">
          <div className="absolute inset-x-0 top-0 h-px bg-pe-border" />
          <div className="absolute top-0 left-0 h-px bg-pe-green" style={{ width }} />
          {CHAPTER_IDS.map((id) => {
            const Icon = CHAPTER_ICON[id]
            const on = id === active
            return (
              <a
                key={id}
                href={`#${CHAPTER_SECTION_ID[id]}`}
                className={cn(
                  "relative flex items-center justify-center gap-1 pt-3 text-[11px] font-semibold sm:text-sm",
                  on ? "text-pe-green" : "text-pe-nav",
                )}
              >
                {on ? (
                  <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pe-green" />
                ) : null}
                {on ? <Icon className="size-3.5" aria-hidden="true" /> : null}
                {t.chapters[id]}
              </a>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
