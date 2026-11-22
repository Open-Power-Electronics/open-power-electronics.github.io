import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react"
import { WORKSPACE_SHOT } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { cn } from "@/lib/utils.ts"
import { ChapterSection, SectionHeader } from "./primitives.tsx"

/**
 * Callout anchors as percentages of WORKSPACE_SHOT, in the order of `workspace.parts`.
 * Each tooltip direction is fixed so the card stays inside the image at every width.
 */
const CALLOUTS = [
  { letter: "A", x: 13, y: 11, tip: "top-full left-0 mt-3.5" },
  { letter: "B", x: 18.5, y: 87.5, tip: "bottom-full left-0 mb-3.5" },
  { letter: "C", x: 53.5, y: 11, tip: "top-full left-1/2 mt-3.5 -translate-x-1/2" },
  { letter: "D", x: 90, y: 15, tip: "right-full top-0 mr-3.5" },
] as const

function useCalloutDismissal(open: number | null, close: () => void) {
  useEffect(() => {
    if (open === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-callout]") !== null) return
      close()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open, close])
}

export function Workspace() {
  const { t } = useI18n()
  const w = t.workspace
  if (w.parts.length !== CALLOUTS.length) throw new Error("workspace parts and callouts are out of sync")

  const idPrefix = useId()
  const [open, setOpen] = useState<number | null>(null)
  const pointerType = useRef("")
  const closeAll = useCallback(() => setOpen(null), [])
  useCalloutDismissal(open, closeAll)

  const closeIf = (index: number) => setOpen((current) => (current === index ? null : current))

  return (
    <ChapterSection chapter="workspace" className="bg-white">
      <div className="container-page">
        <SectionHeader chapter="workspace" title={w.title} />

        <div className="chapter-content" data-scroll-stage="">
          <figure className="window workspace-preview relative">
            <img
              src={WORKSPACE_SHOT.src}
              width={WORKSPACE_SHOT.width}
              height={WORKSPACE_SHOT.height}
              alt={w.imageAlt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            {CALLOUTS.map((callout, index) => {
              const part = w.parts[index]
              const tipId = `${idPrefix}-callout-${callout.letter}`
              const shown = open === index
              return (
                <div
                  key={callout.letter}
                  data-callout=""
                  className={cn("absolute -translate-x-1/2 -translate-y-1/2", shown ? "z-20" : "z-10")}
                  style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setOpen(index)
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") closeIf(index)
                  }}
                >
                  <button
                    type="button"
                    aria-label={part.name}
                    aria-describedby={tipId}
                    className="beacon grid size-6 place-items-center rounded-full bg-green font-mono text-[11px] font-semibold text-white md:size-7 md:text-[12.5px]"
                    style={{ "--beacon-delay": `${index * 0.35}s` } as CSSProperties}
                    onPointerDown={(event) => {
                      pointerType.current = event.pointerType
                    }}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setOpen(index)
                    }}
                    onBlur={() => closeIf(index)}
                    onClick={() => {
                      const via = pointerType.current
                      pointerType.current = ""
                      if (via === "mouse") setOpen(index)
                      else setOpen((current) => (current === index ? null : index))
                    }}
                  >
                    {callout.letter}
                  </button>
                  <div
                    id={tipId}
                    role="tooltip"
                    className={cn(
                      "surface absolute w-[min(264px,58vw)] rounded-2xl px-4 py-3 text-left transition-opacity duration-200",
                      callout.tip,
                      shown ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
                    )}
                  >
                    <p className="text-[15px] leading-6 font-semibold tracking-[-0.015em] text-ink">{part.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-body">{part.body}</p>
                  </div>
                </div>
              )
            })}
          </figure>
        </div>
      </div>
    </ChapterSection>
  )
}
