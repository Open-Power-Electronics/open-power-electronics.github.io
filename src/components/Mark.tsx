import { useEffect, useRef, useState, type RefObject } from "react"
import { ArrowRight, MessageSquareText, RefreshCw, SquareDashedMousePointer } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { prefersReducedMotion } from "@/lib/motion.ts"
import { Clip } from "./Clip.tsx"
import { SubsectionHeader, revealDelay } from "./primitives.tsx"

const STEP_ICONS = [SquareDashedMousePointer, MessageSquareText, RefreshCw] as const

function useTyped(text: string): { ref: RefObject<HTMLDivElement | null>; shown: string } {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(text)

  useEffect(() => {
    const element = ref.current
    if (element === null) throw new Error("typed comment element missing")
    if (prefersReducedMotion()) return

    setShown("")
    let timer = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let count = 0
        timer = window.setInterval(() => {
          count += 1
          setShown(text.slice(0, count))
          if (count >= text.length) window.clearInterval(timer)
        }, 38)
      },
      { threshold: 0.6 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      window.clearInterval(timer)
    }
  }, [text])

  return { ref, shown }
}

export function Mark({ index }: { index: number }) {
  const { t } = useI18n()
  const m = t.agents.mark
  const typed = useTyped(m.comment)
  if (m.steps.length !== STEP_ICONS.length) throw new Error("mark steps and icons are out of sync")

  return (
    <div>
      <SubsectionHeader chapter="agents" index={index} name={m.name} title={m.title} lede={m.lede} />

      <div className="relative mt-14 md:mx-auto md:mt-20 md:w-[88%]">
        <div data-reveal className="window">
          <Clip name="comment" label={m.title} />
        </div>
        <div
          ref={typed.ref}
          data-reveal
          style={revealDelay(0.15)}
          className="surface absolute -top-8 left-6 hidden w-[340px] p-4 md:block lg:-left-10"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[12px] text-green">
              <MessageSquareText className="size-3.5" />
              {m.commentLabel}
            </span>
            <span className="rounded-md bg-green px-2.5 py-1 text-[11.5px] font-semibold text-white">{m.commentAction}</span>
          </div>
          <p className="caret mt-3 min-h-[3em] text-[16px] leading-snug font-semibold tracking-[-0.015em] text-ink">{typed.shown}</p>
        </div>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.25fr)] md:gap-8">
        {m.steps.map((step, stepIndex) => {
          const Icon = STEP_ICONS[stepIndex]
          return (
            <div key={step.name} data-reveal style={revealDelay(stepIndex * 0.07)} className="border-t border-line-strong pt-5">
              <div className="flex items-center gap-2 text-green">
                <span className="grid size-7 place-items-center rounded-lg bg-mint">
                  <Icon className="size-3.5" strokeWidth={2.2} />
                </span>
                {stepIndex + 1 < m.steps.length && <ArrowRight aria-hidden="true" className="size-3.5 text-faint" />}
              </div>
              <h4 className="mt-3 text-[18px] font-bold tracking-[-0.02em] text-ink">{step.name}</h4>
              <p className="mt-1.5 text-[15px] leading-relaxed text-body">{step.body}</p>
            </div>
          )
        })}
        <div data-reveal style={revealDelay(0.24)} className="border-t-2 border-green pt-4">
          <p className="display text-[72px] text-green md:text-[88px]">{m.statValue}</p>
          <p className="mt-2 text-[16px] font-semibold tracking-[-0.015em] text-ink">{m.statLabel}</p>
          <p className="mt-1 font-mono text-[13px] text-body">{m.statDetail}</p>
        </div>
      </div>

      <p data-reveal className="mt-12 text-[13.5px] text-muted">
        {m.note}
      </p>
    </div>
  )
}
