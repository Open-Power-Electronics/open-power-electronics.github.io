import { useI18n } from "@/i18n/I18nContext.tsx"
import { BeforeAfter } from "@/components/ui/BeforeAfter.tsx"
import { SelectionBox } from "@/components/ui/SelectionBox.tsx"
import { UserComment } from "@/components/ui/UserComment.tsx"
import { BulletList, FinePrint } from "@/components/layout/BulletList.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"
import { Clip } from "@/components/media/Clip.tsx"

export function MarkSection() {
  const { t } = useI18n()
  return (
    <SectionSplit
      id="layout"
      chapter="layout"
      nav="features"
      featured={true}
      title={t.mark.title}
      intro={
        <>
          <BulletList items={t.mark.bullets} />
          <FinePrint>{t.mark.note}</FinePrint>
          <BeforeAfter
            badge={t.mark.shorter}
            beforeLabel={t.chrome.before}
            afterLabel={t.chrome.after}
            from={t.mark.from}
            to={t.mark.to}
            unit={t.mark.unit}
            caption={t.mark.copper}
          />
        </>
      }
      media={
        <div className="pe-card relative bg-white p-3 md:p-4">
          <Clip name="comment" label={t.mark.clipLabel} />
          <SelectionBox className="pointer-events-none absolute top-[14%] right-[7%] hidden h-[46%] w-[34%] lg:block" />
          <svg
            className="pointer-events-none absolute inset-0 hidden lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="32"
              y1="78"
              x2="72"
              y2="36"
              stroke="#206F39"
              strokeWidth="1.5"
              strokeDasharray="1.4 1.1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="mt-4 lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:w-[300px]">
            <UserComment label={t.chrome.userComment} add={t.chrome.add} text={t.mark.comment} />
          </div>
        </div>
      }
    />
  )
}
