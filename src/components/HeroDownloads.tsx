import { Download } from "lucide-react"
import { OPENPE_RELEASES_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"

export function HeroDownloads() {
  const { t } = useI18n()

  return (
    <a
      href={OPENPE_RELEASES_URL}
      className="hero-download inline-flex min-h-12 items-center gap-2 rounded-full bg-green-deep px-5 text-sm font-semibold text-white transition-colors hover:bg-green motion-reduce:transition-none"
    >
      <Download className="size-4" aria-hidden="true" />
      {t.hero.download}
    </a>
  )
}
