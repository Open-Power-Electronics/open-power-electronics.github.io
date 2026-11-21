import { useI18n } from "@/i18n/I18nContext.tsx"
import { BulletList, FinePrint } from "@/components/layout/BulletList.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"
import { ArchitectureDiagram } from "@/components/diagram/ArchitectureDiagram.tsx"
import { Clip } from "@/components/media/Clip.tsx"
import { MediaFrame } from "@/components/media/MediaFrame.tsx"

export function AgentSection() {
  const { t } = useI18n()
  return (
    <SectionSplit
      id="features"
      chapter="overall"
      nav="features"
      featured={false}
      title={t.agent.title}
      intro={
        <>
          <BulletList items={t.agent.bullets} />
          <FinePrint>{t.agent.note}</FinePrint>
        </>
      }
      media={
        <div className="space-y-4">
          <ArchitectureDiagram
            blocks={t.agent.blocks}
            pluginNames={t.plugins.cards.map((card) => card.name)}
          />
          <MediaFrame>
            <Clip name="architecture" label={t.agent.clipLabel} />
          </MediaFrame>
        </div>
      }
    />
  )
}
