import { Download } from "lucide-react"
import { OPENPE_RELEASES_URL, OPENPE_REPO_URL, PLATFORMS } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { closingCopy } from "@/i18n/content.ts"
import { GithubMark } from "./primitives.tsx"

export function Closing() {
  const { t } = useI18n()
  const c = t.closing
  const { line1, power, between, engineer } = closingCopy

  return (
    <section className="closing-banner border-t border-line">
      <div className="container-page closing-copy relative flex flex-col items-center text-center">
        <h2 lang="en" data-reveal className="display closing-title">
          <span className="mb-[0.26em] block text-[0.68em] font-semibold text-ink-2">{line1}</span>{" "}
          <span className="block">
            <strong className="font-extrabold text-green">{power}</strong>
            <span className="text-[0.88em] font-bold text-ink-2">{between}</span>
            <strong className="font-extrabold text-green">{engineer}</strong>
          </span>
        </h2>
        <div data-reveal className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={OPENPE_RELEASES_URL}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-green-deep px-6 text-[15px] font-semibold text-white transition-colors hover:bg-green motion-reduce:transition-none"
          >
            <Download className="size-4" aria-hidden="true" />
            {c.download}
          </a>
          <a
            href={OPENPE_REPO_URL}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30 motion-reduce:transition-none"
          >
            <GithubMark className="size-4" />
            {c.source}
          </a>
        </div>
        <p data-reveal className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[12px] text-muted">
          <span className="tracking-[0.06em] uppercase">{c.platformsLabel}</span>
          {PLATFORMS.map((platform) => (
            <span key={platform} className="flex items-center gap-3 text-ink-2">
              <span aria-hidden="true" className="size-1 rounded-full bg-faint" />
              {platform}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
