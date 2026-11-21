import type { CSSProperties, ReactNode } from "react"
import { Bot, MousePointer2 } from "lucide-react"
import { SECTION_IDS } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { cn } from "@/lib/utils.ts"
import { SectionHeader, revealDelay } from "./primitives.tsx"

const FILES = [".kicad_pro", ".kicad_sch", ".kicad_pcb"] as const
const PLUGIN_FILES = [".cir", ".msh", ".vtu"] as const

function Wire({ delay, className }: { delay: number; className?: string }) {
  return <div aria-hidden="true" className={cn("wire mx-auto h-7", className)} style={{ "--wire-delay": `${delay}s` } as CSSProperties} />
}

function Node({ tone, children, className }: { tone: string; children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-ink/[0.06] px-4 py-3.5", tone, className)}>{children}</div>
}

function FileTag({ children }: { children: string }) {
  return <span className="rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-[11px] text-body ring-1 ring-ink/[0.06]">{children}</span>
}

export function Parity() {
  const { t } = useI18n()
  const p = t.parity

  return (
    <section id={SECTION_IDS.parity} className="relative border-t border-line bg-white py-28 md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeader eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
          <p data-reveal className="mt-4 text-[14px] text-muted">
            {p.note}
          </p>
          <dl className="mt-12 grid gap-7 border-t border-line pt-9">
            {p.points.map((point, index) => (
              <div key={point.title} data-reveal style={revealDelay(index * 0.06)} className="grid grid-cols-[28px_1fr] gap-x-3">
                <span className="font-mono text-[12px] leading-[22px] text-green">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <dt className="text-[16px] font-semibold tracking-[-0.015em] text-ink">{point.title}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-body">{point.body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="surface relative self-start overflow-hidden bg-paper p-5 sm:p-8 lg:sticky lg:top-28">
          <div aria-hidden="true" className="hairline-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <Node tone="bg-human">
                <div className="flex items-center gap-2 text-human-ink">
                  <MousePointer2 className="size-4" strokeWidth={2.2} />
                  <span className="text-[15px] font-bold tracking-[-0.02em]">{p.human.label}</span>
                </div>
                <p className="mt-1 text-[12.5px] leading-snug text-body">{p.human.sub}</p>
              </Node>
              <Node tone="bg-agent">
                <div className="flex items-center gap-2 text-agent-ink">
                  <Bot className="size-4" strokeWidth={2.2} />
                  <span className="text-[15px] font-bold tracking-[-0.02em]">{p.agent.label}</span>
                </div>
                <p className="mt-1 text-[12.5px] leading-snug text-body">{p.agent.sub}</p>
              </Node>
              <div>
                <Wire delay={0} />
                <p className="mx-auto w-fit rounded-full border border-line bg-white px-3 py-1 font-mono text-[11.5px] text-body">{p.gui}</p>
                <Wire delay={0.5} />
              </div>
              <div>
                <Wire delay={0.25} />
                <p className="mx-auto w-fit rounded-full border border-line bg-white px-3 py-1 text-center font-mono text-[11.5px] text-body">
                  {p.context}
                </p>
                <Wire delay={0.75} />
              </div>
            </div>

            <Node tone="bg-api" className="px-5 py-4">
              <p className="text-[15px] font-bold tracking-[-0.02em] text-api-ink">{p.api}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.apiOps.map((op) => (
                  <li key={op} className="rounded-full bg-white/75 px-2.5 py-1 text-[12px] font-medium text-ink-2 ring-1 ring-ink/[0.06]">
                    {op}
                  </li>
                ))}
              </ul>
            </Node>

            <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-3 sm:gap-5">
              <div>
                <Wire delay={1} />
                <Node tone="bg-core" className="h-[calc(100%-28px)] px-5 py-4">
                  <p className="text-[15px] font-bold tracking-[-0.02em] text-green">{p.core}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-body">{p.coreSub}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {FILES.map((file) => (
                      <FileTag key={file}>{file}</FileTag>
                    ))}
                  </div>
                </Node>
              </div>
              <div>
                <Wire delay={1.3} />
                <Node tone="bg-plugin" className="h-[calc(100%-28px)] px-5 py-4">
                  <p className="text-[15px] font-bold tracking-[-0.02em] text-plugin-ink">{p.plugins}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-body">SPICE · Thermal · Parasitics · EMC</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {PLUGIN_FILES.map((file) => (
                      <FileTag key={file}>{file}</FileTag>
                    ))}
                  </div>
                </Node>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
