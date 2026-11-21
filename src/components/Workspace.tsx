import { WORKSPACE_SHOT } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { ChapterSection, SectionHeader, revealDelay } from "./primitives.tsx"

/** Callout anchors as percentages of WORKSPACE_SHOT, in the order of `workspace.parts`. */
const CALLOUTS = [
  { letter: "A", x: 13, y: 11 },
  { letter: "B", x: 18.5, y: 87.5 },
  { letter: "C", x: 53.5, y: 11 },
  { letter: "D", x: 90, y: 15 },
] as const

function Letter({ children }: { children: string }) {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-green font-mono text-[11px] font-semibold text-white md:size-6 md:text-[12px]">
      {children}
    </span>
  )
}

export function Workspace() {
  const { t } = useI18n()
  const w = t.workspace
  if (w.parts.length !== CALLOUTS.length) throw new Error("workspace parts and callouts are out of sync")

  return (
    <ChapterSection chapter="workspace" className="bg-paper">
      <div className="container-page">
        <SectionHeader chapter="workspace" title={w.title} lede={w.lede} />

        <figure data-reveal className="window relative mt-14 md:mt-16">
          <img
            src={WORKSPACE_SHOT.src}
            width={WORKSPACE_SHOT.width}
            height={WORKSPACE_SHOT.height}
            alt={w.imageAlt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
          {CALLOUTS.map((callout) => (
            <span
              key={callout.letter}
              aria-hidden="true"
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_4px_14px_-4px_rgb(16_56_28/0.55)] ring-4 ring-white/85"
              style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
            >
              <Letter>{callout.letter}</Letter>
            </span>
          ))}
        </figure>

        <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {w.parts.map((part, index) => (
            <div key={part.name} data-reveal style={revealDelay(index * 0.05)} className="flex gap-3 border-t border-line-strong pt-4">
              <Letter>{CALLOUTS[index].letter}</Letter>
              <div>
                <dt className="text-[16px] leading-6 font-semibold tracking-[-0.015em] text-ink">{part.name}</dt>
                <dd className="mt-1 text-[14.5px] leading-relaxed text-body">{part.body}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </ChapterSection>
  )
}
