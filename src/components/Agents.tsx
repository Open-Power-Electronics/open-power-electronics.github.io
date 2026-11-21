import { Lightbulb, Wrench, type LucideIcon } from "lucide-react"
import { AGENT_MODES } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { cn } from "@/lib/utils.ts"
import { Mark } from "./Mark.tsx"
import { Parity } from "./Parity.tsx"
import { ChapterSection, SectionHeader, revealDelay } from "./primitives.tsx"

function ModeCard({
  icon: Icon,
  name,
  body,
  agents,
  tone,
  delay,
}: {
  icon: LucideIcon
  name: string
  body: string
  agents: readonly string[]
  tone: "tools" | "proposals"
  delay: number
}) {
  return (
    <article data-reveal style={revealDelay(delay)} className="surface flex flex-col p-6 md:p-7">
      <div className="flex items-center gap-2.5">
        <span className={cn("grid size-9 place-items-center rounded-xl", tone === "tools" ? "bg-agent text-agent-ink" : "bg-paper text-body ring-1 ring-line")}>
          <Icon className="size-[18px]" strokeWidth={2} />
        </span>
        <h3 className="text-[19px] font-bold tracking-[-0.022em] text-ink">{name}</h3>
      </div>
      <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-body">{body}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {agents.map((agent) => (
          <li
            key={agent}
            className={cn(
              "rounded-xl px-3.5 py-2 text-[15px] font-semibold tracking-[-0.015em]",
              tone === "tools" ? "bg-agent/70 text-ink ring-1 ring-agent-ink/10" : "bg-white text-ink-2 ring-1 ring-line-strong",
            )}
          >
            {agent}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Agents() {
  const { t } = useI18n()
  const a = t.agents

  return (
    <ChapterSection chapter="agents" className="bg-paper">
      <div className="container-page">
        <SectionHeader chapter="agents" title={a.title} lede={a.lede} />

        <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-5">
          <ModeCard icon={Wrench} {...a.tools} agents={AGENT_MODES.tools} tone="tools" delay={0} />
          <ModeCard icon={Lightbulb} {...a.proposals} agents={AGENT_MODES.proposals} tone="proposals" delay={0.06} />
        </div>

        <div className="mt-20 border-t border-line pt-20 md:mt-24 md:pt-24">
          <Parity index={0} />
        </div>

        <div className="mt-20 border-t border-line pt-20 md:mt-24 md:pt-24">
          <Mark index={1} />
        </div>
      </div>
    </ChapterSection>
  )
}
