import { useI18n } from "@/i18n/I18nContext.tsx"
import { ChapterSection, SectionHeader } from "./primitives.tsx"

export function Specs() {
  const { t } = useI18n()
  const s = t.specs

  return (
    <ChapterSection chapter="specs" className="bg-white">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader chapter="specs" title={s.title} />
        </div>
        <div data-reveal className="overflow-hidden rounded-[20px] border border-line">
          <div className="flex items-center justify-between gap-4 border-b border-line bg-paper px-5 py-3.5 md:px-7">
            <p className="text-[14px] font-semibold tracking-[-0.01em] text-ink">{s.product}</p>
            <p className="hidden font-mono text-[11.5px] text-muted sm:block">v0.1</p>
          </div>
          <dl>
            {s.rows.map((row) => (
              <div
                key={row.key}
                className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-6 md:px-7"
              >
                <dt className="font-mono text-[12px] leading-6 tracking-[0.04em] text-muted uppercase">{row.key}</dt>
                <dd className="text-[15px] leading-6 text-ink-2 tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </ChapterSection>
  )
}
