import { Check, CloudOff, Laptop, Sparkles, X } from "lucide-react"
import { SECTION_IDS } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { SectionHeader, revealDelay } from "./primitives.tsx"

const FILES = [".kicad_pro", ".kicad_sch", ".kicad_pcb"] as const
const AGENTS = ["Codex", "Claude Code", "Cursor", "DeepSeek Harness", "Pi"] as const

export function Privacy() {
  const { t } = useI18n()
  const p = t.privacy

  return (
    <section id={SECTION_IDS.privacy} className="relative border-t border-line bg-paper py-28 md:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div>
          <SectionHeader eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
          <ul className="mt-10 flex flex-col gap-3.5">
            {p.points.map((point, index) => (
              <li key={point} data-reveal style={revealDelay(index * 0.06)} className="flex items-start gap-3 text-[16px] text-ink-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-8 text-[13.5px] leading-relaxed text-muted">
            {p.note}
          </p>
        </div>

        <div data-reveal className="relative">
          <div className="rounded-[24px] border border-line-strong bg-white p-4 shadow-[0_32px_80px_-40px_rgb(16_56_28/0.3)] sm:p-5">
            <p className="flex items-center gap-2 px-1 pb-3 font-mono text-[12px] text-muted">
              <Laptop className="size-3.5" />
              {p.machine}
            </p>
            <div className="grid gap-2.5">
              <div className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 ring-1 ring-line">
                <img src="/brand/openpe-mark.svg" alt="" width={22} height={22} className="size-[22px]" />
                <span className="text-[15px] font-semibold tracking-[-0.015em] text-ink">{p.studio}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-2xl bg-paper px-4 py-3.5 ring-1 ring-line">
                  <p className="text-[13px] font-semibold text-ink">{p.files}</p>
                  <ul className="mt-2 flex flex-col gap-1 font-mono text-[11.5px] text-body">
                    {FILES.map((file) => (
                      <li key={file}>{file}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-agent/60 px-4 py-3.5 ring-1 ring-agent">
                  <p className="text-[13px] font-semibold text-ink">{p.agents}</p>
                  <ul className="mt-2 flex flex-col gap-1 font-mono text-[11.5px] text-body">
                    {AGENTS.map((agent) => (
                      <li key={agent}>{agent}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 px-4 sm:px-5">
            <div className="col-start-2">
              <div className="wire mx-auto h-10" aria-hidden="true" />
            </div>
            <div className="col-start-1 row-start-1">
              <div className="relative mx-auto h-10 w-px border-l border-dashed border-faint" aria-hidden="true">
                <span className="absolute top-1/2 left-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-faint ring-1 ring-line">
                  <X className="size-3" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 px-4 sm:px-5">
            <div className="rounded-2xl border border-dashed border-line-strong px-4 py-3.5 opacity-70">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-muted line-through decoration-faint">
                <CloudOff className="size-3.5" />
                {p.cloud}
              </p>
              <p className="mt-1 font-mono text-[11.5px] text-faint">{p.cloudSub}</p>
            </div>
            <div className="rounded-2xl bg-ink px-4 py-3.5 text-white shadow-[0_16px_40px_-20px_rgb(16_32_22/0.6)]">
              <p className="flex items-center gap-2 text-[13px] font-semibold">
                <Sparkles className="size-3.5 text-signal" />
                {p.provider}
              </p>
              <p className="mt-1 text-[12px] leading-snug text-white/65">{p.providerSub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
