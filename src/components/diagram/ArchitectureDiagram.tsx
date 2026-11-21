import { useState, type ReactNode } from "react"
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils.ts"
import type { Content } from "@/i18n/content.ts"

type BlockId = "agent" | "human" | "context" | "gui" | "api" | "core" | "plugins"

const BLOCK_CLASS: Record<BlockId, string> = {
  agent: "bg-pe-agent",
  human: "bg-pe-human",
  // Context Management sits in the Agent column in the film, GUI in the Human column.
  context: "bg-pe-agent",
  gui: "bg-pe-human",
  api: "bg-pe-api",
  core: "bg-pe-core",
  plugins: "bg-pe-plugins",
}

const CORE_FILES = [".kicad_pro", ".kicad_sch", ".kicad_pcb"] as const

export function ArchitectureDiagram(props: {
  blocks: Content["agent"]["blocks"]
  pluginNames: readonly string[]
}) {
  const [hovered, setHovered] = useState<BlockId | null>(null)
  if (props.pluginNames.length !== 5) {
    throw new Error(`expected 5 architecture plugins, got ${props.pluginNames.length}`)
  }

  function activate(id: BlockId) {
    setHovered(id)
  }

  function deactivate(id: BlockId) {
    setHovered((current) => (current === id ? null : current))
  }

  return (
    <div className="pe-card p-4 md:p-6">
      <div className="grid grid-cols-2 gap-3">
        <Block id="agent" label={props.blocks.agent} hovered={hovered} activate={activate} deactivate={deactivate} />
        <Block id="human" label={props.blocks.human} hovered={hovered} activate={activate} deactivate={deactivate} />
        <Block id="context" label={props.blocks.context} hovered={hovered} activate={activate} deactivate={deactivate} />
        <Block id="gui" label={props.blocks.gui} hovered={hovered} activate={activate} deactivate={deactivate} />
      </div>
      <div className="flex justify-center py-3 text-pe-green" aria-hidden="true">
        <ArrowDown className="size-5" />
      </div>
      <Block id="api" label={props.blocks.api} hovered={hovered} activate={activate} deactivate={deactivate} />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Block id="core" label={props.blocks.core} hovered={hovered} activate={activate} deactivate={deactivate}>
          <ul className="mt-3 space-y-1 text-left text-sm font-medium text-pe-headline-2">
            <li>{props.blocks.task}</li>
            <li>{props.blocks.operation}</li>
            <li>{props.blocks.object}</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            {CORE_FILES.map((file) => (
              <span key={file} className="rounded-full border border-pe-border bg-white px-2 py-0.5 text-xs font-medium">
                {file}
              </span>
            ))}
          </div>
        </Block>
        <Block id="plugins" label={props.blocks.plugins} hovered={hovered} activate={activate} deactivate={deactivate}>
          <ul className="mt-3 space-y-1 text-left text-sm font-medium text-pe-headline-2">
            {props.pluginNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Block>
      </div>
    </div>
  )
}

function Block(props: {
  id: BlockId
  label: string
  hovered: BlockId | null
  activate: (id: BlockId) => void
  deactivate: (id: BlockId) => void
  children?: ReactNode
}) {
  const hot = props.hovered === props.id
  return (
    <div
      onMouseEnter={() => props.activate(props.id)}
      onMouseLeave={() => props.deactivate(props.id)}
      className={cn(
        "rounded-2xl px-3 py-3 text-center text-sm font-semibold text-pe-headline outline",
        BLOCK_CLASS[props.id],
        hot ? "outline-2 outline-pe-green" : "outline-1 outline-transparent",
      )}
    >
      {props.label}
      {props.children}
    </div>
  )
}
