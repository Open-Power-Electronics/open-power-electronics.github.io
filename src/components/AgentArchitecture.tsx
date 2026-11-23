import { Bot, Network, Puzzle, UserRound } from "lucide-react"
import { useId, type CSSProperties } from "react"
import { useI18n } from "@/i18n/I18nContext.tsx"
import "./agent-architecture.css"

const tracePaths = {
  down: "M50 0V100",
  up: "M50 100V0",
  both: "M50 0V100",
  left: "M100 50H0",
  bypass: "M100 0H3Q0 0 0 6V84Q0 89 3 89H97Q100 89 100 94V100",
} as const

function ArchitectureWire({ route, direction = "down" }: { route: string; direction?: keyof typeof tracePaths }) {
  const revealMaskId = useId()
  const path = tracePaths[direction]

  return (
    <span aria-hidden="true" className={`architecture-wire architecture-${route}`} data-arrow={direction}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id={revealMaskId} maskUnits="userSpaceOnUse" x="-4" y="-4" width="108" height="108">
            <path d={path} className="architecture-reveal" pathLength="1" />
          </mask>
        </defs>
        <path
          d={path}
          className="architecture-trace"
          style={{ "--architecture-reveal-mask": `url(#${revealMaskId})` } as CSSProperties}
        />
      </svg>
    </span>
  )
}

export function AgentArchitecture() {
  const { t } = useI18n()
  const { title, description, agent, human, context, gui, api, core, plugins } = t.agents.architecture

  return (
    <figure
      className="surface chapter-content agent-architecture"
      aria-labelledby="agent-architecture-title"
      aria-describedby="agent-architecture-description"
      data-scroll-stage="architecture"
    >
      <figcaption id="agent-architecture-title" className="agent-architecture-title">{title}</figcaption>
      <p id="agent-architecture-description" className="agent-architecture-description text-pretty">{description}</p>
      <div className="agent-architecture-flow">
        <div className="architecture-node architecture-actor architecture-agent">
          <Bot aria-hidden="true" />
          {agent}
        </div>
        <div className="architecture-node architecture-actor architecture-human">
          <UserRound aria-hidden="true" />
          {human}
        </div>
        <ArchitectureWire route="context-to-agent" direction="up" />
        <ArchitectureWire route="human-to-gui" direction="both" />
        <div className="architecture-node architecture-context">{context}</div>
        <ArchitectureWire route="gui-to-context" direction="left" />
        <div className="architecture-node architecture-gui">{gui}</div>
        <ArchitectureWire route="agent-to-api" direction="bypass" />
        <ArchitectureWire route="gui-to-api" direction="both" />
        <div className="architecture-node architecture-api">
          <Network aria-hidden="true" />
          {api}
        </div>
        <ArchitectureWire route="api-to-core" />
        <ArchitectureWire route="api-to-plugins" />
        <div className="architecture-node architecture-output architecture-core">
          <strong className="architecture-module-label">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round">
              <path d="M8 5h8l3 5H5l3-5Z" />
              <path d="M5.5 14h13l3 5h-19l3-5Z" />
            </svg>
            {core.name}
          </strong>
          <span className="architecture-node-detail">{core.body}</span>
        </div>
        <div className="architecture-node architecture-output architecture-plugins">
          <strong className="architecture-module-label">
            <Puzzle aria-hidden="true" />
            {plugins.name}
          </strong>
          <span className="architecture-node-detail">{plugins.body}</span>
        </div>
      </div>
    </figure>
  )
}
