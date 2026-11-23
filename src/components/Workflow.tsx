import { useState, type CSSProperties } from "react"
import { CircuitBoard, createLucideIcon } from "lucide-react"
import { WORKFLOW_CLIP_SIZE } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { Clip } from "./Clip.tsx"
import { ChapterSection, SectionHeader } from "./primitives.tsx"

// Match the OpenPE editor and the film chapter rail.
const SchematicIcon = createLucideIcon("Schematic", [
  ["path", { d: "M5 3h8v6H5z", key: "resistor" }],
  ["path", { d: "M2 6h3m8 0h9m-4 0v6m-4 0h8m-8 4h8m-4 0v4", key: "circuit" }],
  ["path", { d: "M14 20h8l-4 3Z", key: "ground" }],
])

const ModelIcon = createLucideIcon("Model", [
  ["path", { d: "M3 8h7v8h5v5H3Z", key: "profile" }],
  ["path", { d: "m3 8 6-5h7v8h5v5l-6 5", key: "extrusion" }],
  ["path", { d: "m10 8 6-5m-6 13 6-5m-1 5 6-5", key: "edges" }],
])

const workflowSteps = [
  { clip: "spice", icon: SchematicIcon },
  { clip: "layout", icon: CircuitBoard },
  { clip: "case", icon: ModelIcon },
] as const

export function Workflow() {
  const { t } = useI18n()
  const w = t.workflow
  const [active, setActive] = useState(0)

  return (
    <ChapterSection chapter="workflow" className="bg-white">
      <div className="container-page">
        <SectionHeader chapter="workflow" title={w.title} lede={w.lede} />
        <div
          className="chapter-content workflow-media"
          style={{ "--workflow-aspect": WORKFLOW_CLIP_SIZE.width / WORKFLOW_CLIP_SIZE.height } as CSSProperties}
        >
          <div className="workflow-panel">
            {workflowSteps.map(({ clip }, index) => (
              <div key={clip} className="workflow-shot" data-active={active === index || undefined} aria-hidden={active !== index}>
                <Clip name={clip} label={w.steps[index].chapter} active={active === index} />
              </div>
            ))}
          </div>
          <ol className="workflow-controls" aria-label={w.title}>
            {workflowSteps.map(({ clip, icon: Icon }, index) => (
              <li key={clip}>
                <button
                  type="button"
                  aria-current={active === index ? "step" : undefined}
                  onClick={() => setActive(index)}
                >
                  <Icon aria-hidden="true" size={20} strokeWidth={1.65} className="shrink-0" />
                  <span>{w.steps[index].chapter}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="workflow-caption text-pretty" aria-live="polite">{w.steps[active].caption}</p>
        </div>
      </div>
    </ChapterSection>
  )
}
