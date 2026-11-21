import { useEffect, useRef, useState } from "react"
import { SECTION_IDS, type ClipName } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { cn } from "@/lib/utils.ts"
import { Clip } from "./Clip.tsx"
import { Chip, SectionHeader } from "./primitives.tsx"

const STEP_CLIPS = ["workspace", "spice", "placement", "case"] as const satisfies readonly ClipName[]

export function Workflow() {
  const { t } = useI18n()
  const w = t.workflow
  if (w.steps.length !== STEP_CLIPS.length) throw new Error("workflow steps and clips are out of sync")

  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = stepRefs.current.indexOf(entry.target as HTMLLIElement)
          if (index < 0) throw new Error("observed workflow step is not registered")
          setActive(index)
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    )
    for (const element of stepRefs.current) {
      if (element === null) throw new Error("workflow step element missing")
      observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section id={SECTION_IDS.workflow} className="relative border-t border-line bg-paper py-28 md:py-36">
      <div className="container-page">
        <SectionHeader eyebrow={w.eyebrow} title={w.title} lede={w.lede} />

        <div className="mt-16 grid gap-10 lg:mt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <ol className="flex flex-col gap-16 lg:gap-0">
            {w.steps.map((step, index) => (
              <li
                key={step.title}
                ref={(element) => {
                  stepRefs.current[index] = element
                }}
                className={cn(
                  "flex flex-col justify-center transition-opacity duration-500 lg:min-h-[78vh]",
                  index === active ? "lg:opacity-100" : "lg:opacity-30",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] text-green">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                  <span className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">{step.chapter}</span>
                </div>
                <h3 className="heading mt-4 text-[28px] md:text-[32px]">{step.title}</h3>
                <p className="mt-3 max-w-[420px] text-[16px] leading-relaxed text-body">{step.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {step.data.map((item) => (
                    <Chip key={item} tone="green">
                      {item}
                    </Chip>
                  ))}
                </div>
                <div className="window mt-8 lg:hidden">
                  <Clip name={STEP_CLIPS[index]} label={step.title} />
                </div>
              </li>
            ))}
          </ol>

          <div className="relative hidden lg:block">
            <div className="sticky top-[calc(50vh-14.5rem)]">
              <div className="window relative aspect-[1260/724]">
                {STEP_CLIPS.map((name, index) => (
                  <Clip
                    key={name}
                    name={name}
                    label={w.steps[index].title}
                    active={index === active}
                    className={cn(
                      "absolute inset-0 h-full object-cover transition-opacity duration-500",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
              <ol className="mt-5 flex gap-2" aria-hidden="true">
                {w.steps.map((step, index) => (
                  <li key={step.title} className="flex-1">
                    <span className={cn("block h-[3px] rounded-full transition-colors duration-500", index <= active ? "bg-green" : "bg-line")} />
                    <span className={cn("mt-2 block font-mono text-[11px] tracking-[0.04em] uppercase", index === active ? "text-green" : "text-faint")}>
                      {step.chapter}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
