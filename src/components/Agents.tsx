import { CirclePlus } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { ChapterSection, SectionHeader, revealDelay } from "./primitives.tsx"

const providers = [
  { name: "Codex", icon: "/agents/codex.svg" },
  { name: "Claude Code", icon: "/agents/claude-code.svg" },
  { name: "DeepSeek Harness", icon: "/agents/deepseek-harness.svg" },
  { name: "Pi", icon: "/agents/pi.svg" },
  { name: "Cursor", icon: "/agents/cursor.svg" },
] as const

const tile = "flex min-w-0 items-center justify-center gap-2 rounded-xl border px-2 py-3 text-center text-[14px] font-semibold tracking-[-0.012em] sm:gap-2.5 max-[420px]:flex-col max-[380px]:px-1.5 max-[380px]:text-[13px]"

export function Agents() {
  const { t } = useI18n()
  const { title, storage, providerContext, more } = t.agents

  return (
    <ChapterSection chapter="agents" className="bg-white">
      <div id="privacy" className="container-page">
        <SectionHeader
          chapter="agents"
          title={title}
          lede={<>{storage}{" "}<span className="agent-provider-context">{providerContext}</span></>}
        />
        <ul role="list" className="chapter-content grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
          {providers.map((provider, index) => (
            <li
              key={provider.name}
              className={`${tile} border-line bg-white text-ink`}
              data-reveal
              style={revealDelay(index * 0.065)}
            >
              <img src={provider.icon} width={22} height={22} alt="" loading="lazy" className="size-[22px] shrink-0 object-contain" />
              <span>{provider.name}</span>
            </li>
          ))}
          <li
            className={`${tile} border-dashed border-green/35 bg-mint-2 text-green`}
            data-reveal
            style={revealDelay(providers.length * 0.065)}
          >
            <CirclePlus aria-hidden="true" className="size-[22px] shrink-0" strokeWidth={1.65} />
            <span>{more}</span>
          </li>
        </ul>
      </div>
    </ChapterSection>
  )
}
