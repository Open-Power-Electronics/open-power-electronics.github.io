import { useEffect, useRef, useState, type RefObject } from "react"
import { MessageSquareText } from "lucide-react"
import { SECTION_IDS } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { Clip } from "./Clip.tsx"
import { SectionHeader, revealDelay } from "./primitives.tsx"

function useTyped(text: string): { ref: RefObject<HTMLDivElement | null>; shown: string } {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(text)

  useEffect(() => {
    const element = ref.current
    if (element === null) throw new Error("typed comment element missing")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

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

export function Mark() {
  const { t } = useI18n()
  const m = t.mark
  const typed = useTyped(m.comment)

  return (
    <section id={SECTION_IDS.mark} className="mint-corners relative overflow-hidden border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeader eyebrow={m.eyebrow} title={m.title} lede={m.lede} align="center" className="mx-auto" />

        <div className="relative mt-16 md:mt-20">
          <div data-reveal className="window">
            <Clip name="comment" label={m.title} />
          </div>
          <div
            ref={typed.ref}
            data-reveal
            style={revealDelay(0.15)}
            className="surface absolute -top-8 left-6 hidden w-[340px] p-4 md:block lg:-left-6"
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
          {m.steps.map((step, index) => (
            <div key={step.title} data-reveal style={revealDelay(index * 0.07)} className="border-t border-line-strong pt-5">
              <p className="font-mono text-[12px] text-green">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-[18px] font-bold tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-body">{step.body}</p>
            </div>
          ))}
          <div data-reveal style={revealDelay(0.24)} className="border-t-2 border-green pt-4">
            <p className="display text-[72px] text-green md:text-[88px]">{m.statValue}</p>
            <p className="mt-2 text-[16px] font-semibold tracking-[-0.015em] text-ink">{m.statLabel}</p>
            <p className="mt-1 font-mono text-[13px] text-body">{m.statDetail}</p>
          </div>
        </div>

        <p data-reveal className="mt-12 text-center text-[13.5px] text-muted">
          {m.note}
        </p>
      </div>
    </section>
  )
}
