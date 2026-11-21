import { useI18n } from "@/i18n/I18nContext.tsx"
import { PromptBubble } from "@/components/ui/PromptBubble.tsx"
import { BulletList } from "@/components/layout/BulletList.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"
import { Clip } from "@/components/media/Clip.tsx"
import { MediaFrame } from "@/components/media/MediaFrame.tsx"

export function GuidanceSection() {
  const { t } = useI18n()
  return (
    <>
      <SectionSplit
        id="placement"
        chapter="layout"
        nav="features"
        featured={false}
        title={t.place.title}
        intro={<BulletList items={t.place.bullets} />}
        media={
          <MediaFrame>
            <Clip name="placement" label={t.place.clipLabel} />
          </MediaFrame>
        }
      />
      <SectionSplit
        id="module"
        chapter="module"
        nav="features"
        featured={false}
        title={t.case.title}
        intro={<BulletList items={t.case.bullets} />}
        media={
          <div className="relative">
            <MediaFrame>
              <Clip name="case" label={t.case.clipLabel} />
            </MediaFrame>
            <div className="mt-4 lg:absolute lg:bottom-5 lg:left-5 lg:mt-0 lg:w-[300px]">
              <PromptBubble label={t.chrome.userPrompt} text={t.case.prompt} />
            </div>
          </div>
        }
      />
    </>
  )
}
