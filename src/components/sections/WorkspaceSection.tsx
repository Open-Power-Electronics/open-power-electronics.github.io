import { useI18n } from "@/i18n/I18nContext.tsx"
import { BulletList } from "@/components/layout/BulletList.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"
import { Clip } from "@/components/media/Clip.tsx"
import { MediaFrame } from "@/components/media/MediaFrame.tsx"

export function WorkspaceSection() {
  const { t } = useI18n()
  return (
    <SectionSplit
      id="workspace"
      chapter="overall"
      nav="features"
      featured={false}
      title={t.workspace.title}
      intro={<BulletList items={t.workspace.bullets} />}
      media={
        <MediaFrame>
          <Clip name="workspace" label={t.workspace.clipLabel} />
        </MediaFrame>
      }
    />
  )
}
