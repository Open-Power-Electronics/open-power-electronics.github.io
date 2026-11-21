import { useI18n } from "@/i18n/I18nContext.tsx"
import { Clip } from "./Clip.tsx"
import { ChapterSection, SectionHeader, revealDelay } from "./primitives.tsx"

export function Workspace() {
  const { t } = useI18n()
  const w = t.workspace

  return (
    <ChapterSection chapter="workspace" className="bg-paper">
      <div className="container-page">
        <SectionHeader chapter="workspace" title={w.title} lede={w.lede} />

        <div data-reveal className="window mt-14 md:mt-16">
          <Clip name="workspace" label={w.title} />
        </div>

        <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {w.parts.map((part, index) => (
            <div key={part.name} data-reveal style={revealDelay(index * 0.05)} className="border-t border-line-strong pt-4">
              <dt className="text-[16px] font-semibold tracking-[-0.015em] text-ink">{part.name}</dt>
              <dd className="mt-1 text-[14.5px] leading-relaxed text-body">{part.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ChapterSection>
  )
}
