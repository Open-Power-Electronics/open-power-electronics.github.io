import { useEffect, useRef, useState } from "react"
import { subsectionNumber, type ClipName } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { prefersReducedMotion } from "@/lib/motion.ts"
import { cn } from "@/lib/utils.ts"
import { Clip } from "./Clip.tsx"
import { ChapterSection, Chip, SectionHeader, SubsectionMarker } from "./primitives.tsx"

const STEP_CLIPS = ["spice", "placement", "case"] as const satisfies readonly ClipName[]

export function Workflow() {
  const { t } = useI18n()
  const w = t.workflow
  if (w.steps.length !== STEP_CLIPS.length) throw new Error("workflow steps and clips are out of sync")

  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [stillClips, setStillClips] = useState(false)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    setStillClips(prefersReducedMotion())
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = stepRefs.current.indexOf(entry.target as HTMLLIElement)
          if (index < 0) throw new Error("observed workflow step is not registered")
          setActive(index)
          setProgress(0)
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
    <ChapterSection chapter="workflow" className="bg-white">
      <div className="container-page">
        <SectionHeader chapter="workflow" title={w.title} lede={w.lede} />

        <div className="mt-16 grid gap-10 lg:mt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <ol className="flex flex-col gap-16 lg:gap-0">
            {w.steps.map((step, index) => (
              <li
                key={STEP_CLIPS[index]}
                ref={(element) => {
                  stepRefs.current[index] = element
                }}
                className={cn(
                  "flex flex-col justify-center transition-opacity duration-500 lg:min-h-[78vh]",
                  index === active ? "lg:opacity-100" : "lg:opacity-30",
                )}
              >
                <SubsectionMarker chapter="workflow" index={index} name={step.chapter} />
                <h3 className="heading mt-5 text-[28px] md:text-[32px]">{step.title}</h3>
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
                    onProgress={setProgress}
                    className={cn(
                      "absolute inset-0 h-full object-cover transition-opacity duration-500",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
              <ol className="mt-5 flex gap-2" aria-hidden="true">
                {w.steps.map((step, index) => {
                  const filled = index < active ? 1 : index > active ? 0 : stillClips ? 1 : progress
                  return (
                    <li key={STEP_CLIPS[index]} className="flex-1">
                      <span className="relative block h-[3px] overflow-hidden rounded-full bg-line">
                        <span className="absolute inset-y-0 left-0 rounded-full bg-green" style={{ width: `${filled * 100}%` }} />
                      </span>
                      <span className="mt-2 flex gap-2 font-mono text-[11px] tracking-[0.06em] uppercase">
                        <span className={cn("font-semibold tabular-nums", index === active ? "text-green" : "text-faint")}>
                          {subsectionNumber("workflow", index)}
                        </span>
                        <span className={index === active ? "text-ink-2" : "text-faint"}>{step.chapter}</span>
                      </span>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </ChapterSection>
  )
}
