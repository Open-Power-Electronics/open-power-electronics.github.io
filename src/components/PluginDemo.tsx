import { useState } from "react"
import { Play, Puzzle, RotateCcw } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext.tsx"

const sampleProject = {
  schematic: { components: ["U1", "T1", "D1", "R1", "C1"] },
}

export function PluginDemo() {
  const { t } = useI18n()
  const demo = t.plugins.yours
  const [count, setCount] = useState<number | null>(null)
  const hasResult = count !== null
  const ActionIcon = hasResult ? RotateCcw : Play

  return (
    <article className="surface mt-6 overflow-hidden" aria-labelledby="custom-plugin-title">
      <header className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <Puzzle aria-hidden="true" className="size-4 shrink-0 text-green" />
          <h3 id="custom-plugin-title" className="text-lg font-semibold text-ink">{demo.name}</h3>
        </div>
        <button
          type="button"
          aria-controls="custom-plugin-output"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-green px-3 text-sm font-semibold text-white transition-colors hover:bg-green-deep"
          onClick={() => setCount(hasResult ? null : sampleProject.schematic.components.length)}
        >
          <ActionIcon aria-hidden="true" className="size-4" />
          {hasResult ? demo.reset : demo.run}
        </button>
      </header>
      <div className="grid border-t border-line sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0 bg-mint-2 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-xs sm:text-sm">
            <span className="font-medium text-ink">main.js <span className="text-body">· QuickJS</span></span>
            <span className="text-green-deep">project.read</span>
          </div>
          <pre className="mt-2 whitespace-pre-wrap [overflow-wrap:anywhere] font-mono text-xs text-ink sm:text-sm">
            <code><span className="font-semibold text-green-deep">registerPlugin</span>{`({
  count(_, { project }) {
    return project.schematic
      .components.length
  },
})`}</code>
          </pre>
        </div>
        <div className="min-w-0 bg-ink px-4 py-3.5 text-paper sm:px-5">
          <h4 className="font-mono text-sm font-medium text-mint">{demo.output}</h4>
          <div id="custom-plugin-output" role="status" aria-atomic="true" className="mt-2 min-h-7">
            {hasResult ? (
              <pre className="font-mono text-lg text-paper motion-safe:animate-[rise_240ms_ease-out_both]"><code>{count}</code></pre>
            ) : (
              <p className="text-sm leading-relaxed text-mint">{demo.ready}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
