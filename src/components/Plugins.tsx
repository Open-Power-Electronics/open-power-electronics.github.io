import type { ReactNode } from "react"
import { Activity, BookOpen, Puzzle, Spline, Thermometer, Waves, type LucideIcon } from "lucide-react"
import type { ClipName } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { cn } from "@/lib/utils.ts"
import { Clip } from "./Clip.tsx"
import { LoopArt, TransientArt } from "./PluginArt.tsx"
import { ChapterSection, Chip, SectionHeader, revealDelay } from "./primitives.tsx"

type CardProps = {
  icon: LucideIcon
  name: string
  body: string
  stat: string
  delay: number
} & ({ clip: ClipName; art?: never } | { clip?: never; art?: ReactNode })

function PluginCard({ icon: Icon, name, body, stat, clip, art, delay }: CardProps) {
  const wide = clip !== undefined
  return (
    <article data-reveal style={revealDelay(delay)} className={cn("surface flex flex-col overflow-hidden", wide && "md:col-span-2")}>
      <div className="flex flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-mint text-green">
            <Icon className="size-[18px]" strokeWidth={2} />
          </span>
          <span className="font-mono text-[11.5px] text-muted">{stat}</span>
        </div>
        <h3 className="mt-5 text-[19px] font-bold tracking-[-0.022em] text-ink">{name}</h3>
        <p className="mt-1.5 max-w-[440px] text-[15px] leading-relaxed text-body">{body}</p>
      </div>
      {wide && (
        <div className="mx-6 mt-auto mb-6 overflow-hidden rounded-xl border border-line md:mx-7 md:mb-7">
          <Clip name={clip} label={name} />
        </div>
      )}
      {art !== undefined && <div className="mt-auto px-6 pt-2 pb-6 md:px-7 md:pb-7">{art}</div>}
    </article>
  )
}

export function Plugins() {
  const { t } = useI18n()
  const p = t.plugins

  return (
    <ChapterSection chapter="plugins" className="bg-white">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader chapter="plugins" title={p.title} lede={p.lede} />
          <p data-reveal className="shrink-0 font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
            {p.builtIn} · 5
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          <PluginCard icon={Thermometer} {...p.thermal} clip="thermal" delay={0} />
          <PluginCard icon={Activity} {...p.spice} art={<TransientArt />} delay={0.06} />
          <PluginCard icon={Waves} {...p.emc} art={<LoopArt />} delay={0} />
          <PluginCard icon={Spline} {...p.parasitics} clip="parasitics" delay={0.06} />
          <PluginCard icon={BookOpen} {...p.skill} delay={0} />
          <article
            data-reveal
            style={revealDelay(0.06)}
            className="flex flex-col justify-between rounded-[20px] border border-dashed border-green/40 bg-mint-2/60 p-6 md:col-span-2 md:p-7"
          >
            <div>
              <span className="grid size-9 place-items-center rounded-xl border border-dashed border-green/50 text-green">
                <Puzzle className="size-[18px]" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-[19px] font-bold tracking-[-0.022em] text-ink">{p.yours.name}</h3>
              <p className="mt-1.5 max-w-[520px] text-[15px] leading-relaxed text-body">{p.yours.body}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.yours.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </article>
        </div>
      </div>
    </ChapterSection>
  )
}
