import { useI18n } from "@/i18n/I18nContext.tsx"
import { BulletList } from "@/components/layout/BulletList.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"
import { Clip } from "@/components/media/Clip.tsx"
import { MediaFrame } from "@/components/media/MediaFrame.tsx"

export function VerifySection() {
  const { t } = useI18n()
  return (
    <SectionSplit
      id="schematic"
      chapter="schematic"
      nav="features"
      featured={false}
      title={t.verify.title}
      intro={<BulletList items={t.verify.bullets} />}
      media={
        <div className="pe-card grid gap-4 bg-white p-4 md:grid-cols-[1.4fr_0.8fr] md:p-5">
          <MediaFrame className="border-0 shadow-none">
            <Clip name="spice" label={t.verify.clipLabel} />
          </MediaFrame>
          <div className="flex flex-col justify-center rounded-[20px] border border-pe-border bg-pe-card p-4">
            <p className="text-base font-semibold leading-snug text-pe-headline">{t.verify.stat}</p>
            <ul className="mt-4 space-y-2 text-sm text-pe-headline-2">
              <li className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-pe-baseline" />
                {t.verify.legend.baseline}
              </li>
              <li className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-pe-tuned" />
                {t.verify.legend.tuned}
              </li>
              <li className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-pe-band ring-1 ring-pe-tuned/30" />
                {t.verify.legend.band}
              </li>
            </ul>
          </div>
        </div>
      }
    />
  )
}
