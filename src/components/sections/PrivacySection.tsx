import { useI18n } from "@/i18n/I18nContext.tsx"
import { PrivacyFlow } from "@/components/diagram/PrivacyFlow.tsx"
import { BulletList, FinePrint } from "@/components/layout/BulletList.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"
import { Clip } from "@/components/media/Clip.tsx"
import { MediaFrame } from "@/components/media/MediaFrame.tsx"

export function PrivacySection() {
  const { t } = useI18n()
  return (
    <SectionSplit
      id="privacy"
      nav="privacy"
      featured={false}
      title={t.privacy.title}
      intro={
        <>
          <BulletList items={t.privacy.bullets} />
          <FinePrint>{t.privacy.note}</FinePrint>
        </>
      }
      media={
        <div className="space-y-4">
          <PrivacyFlow copy={t.privacy} />
          <MediaFrame>
            <Clip name="agents" label={t.privacy.clipLabel} />
          </MediaFrame>
        </div>
      }
    />
  )
}
