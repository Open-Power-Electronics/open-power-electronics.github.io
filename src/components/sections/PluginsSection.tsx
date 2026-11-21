import { Cpu, Radio, Ruler, Spline, Thermometer, type LucideIcon } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { BulletList } from "@/components/layout/BulletList.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"
import { Clip } from "@/components/media/Clip.tsx"
import { MediaFrame } from "@/components/media/MediaFrame.tsx"
import { PluginCard, YourPluginCard } from "@/components/ui/PluginCard.tsx"

const PLUGIN_ICONS = [Cpu, Thermometer, Spline, Radio, Ruler] as const satisfies readonly LucideIcon[]

export function PluginsSection() {
  const { t } = useI18n()
  if (t.plugins.cards.length !== PLUGIN_ICONS.length) {
    throw new Error(`expected ${PLUGIN_ICONS.length} plugin cards`)
  }
  return (
    <SectionSplit
      id="plugins"
      chapter="plugins"
      nav="plugins"
      featured={false}
      title={t.plugins.title}
      intro={<BulletList items={t.plugins.bullets} />}
      media={
        <div className="space-y-4">
          <div className="pe-card p-4 md:p-5" aria-label={t.plugins.wallLabel}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {t.plugins.cards.map((card, index) => {
                const Icon = PLUGIN_ICONS[index]
                if (Icon === undefined) throw new Error(`missing plugin icon: ${card.name}`)
                return <PluginCard key={card.name} icon={Icon} name={card.name} detail={card.detail} />
              })}
              <YourPluginCard label={t.plugins.yours} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <figure>
              <MediaFrame>
                <Clip name="thermal" label={t.plugins.thermalLabel} />
              </MediaFrame>
              <figcaption className="mt-3 text-sm font-semibold text-pe-headline">
                {t.plugins.thermalCaption}
              </figcaption>
            </figure>
            <figure>
              <MediaFrame>
                <Clip name="parasitics" label={t.plugins.parasiticsLabel} />
              </MediaFrame>
              <figcaption className="mt-3 text-sm font-semibold text-pe-headline">
                {t.plugins.parasiticsCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      }
    />
  )
}
