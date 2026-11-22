import { Activity, BookOpen, Spline, Thermometer, Waves } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { Clip } from "./Clip.tsx"
import { ChapterSection, SectionHeader } from "./primitives.tsx"
import { PluginDemo } from "./PluginDemo.tsx"

export function Plugins() {
  const { t } = useI18n()
  const p = t.plugins
  const previews = [
    { ...p.thermal, icon: Thermometer, clip: "thermal" },
    { ...p.parasitics, icon: Spline, clip: "parasitics" },
  ] as const
  const entries = [
    { ...p.spice, icon: Activity },
    { ...p.emc, icon: Waves },
    { ...p.skill, icon: BookOpen },
  ]

  return (
    <ChapterSection chapter="plugins" className="bg-white">
      <div className="container-page">
        <SectionHeader chapter="plugins" title={p.title} />
        <div className="chapter-content grid gap-4 sm:grid-cols-2" data-scroll-stage="">
          {previews.map(({ icon: Icon, name, body, clip }) => (
            <figure key={clip} className="window plugin-preview">
              <Clip name={clip} label={name} />
              <figcaption className="flex items-start gap-2.5 border-t border-line px-4 py-3">
                <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-green" />
                <div>
                  <h3 className="font-semibold leading-tight text-ink">{name}</h3>
                  <p className="mt-1 text-sm leading-snug text-pretty text-body md:text-[0.9375rem]">{body}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3 lg:gap-6">
          {entries.map(({ icon: Icon, name, body }) => (
            <li key={name} className="flex items-start gap-2.5 border-t border-line pt-3">
              <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green" />
              <div>
                <h3 className="font-semibold leading-tight text-ink">{name}</h3>
                <p className="mt-1 text-sm leading-snug text-pretty text-body md:text-[0.9375rem]">{body}</p>
              </div>
            </li>
          ))}
        </ul>
        <PluginDemo />
      </div>
    </ChapterSection>
  )
}
