import { Download, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { OPENPE_RELEASES_URL, OPENPE_REPO_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { getLatestAppRelease, getRepositoryStars } from "@/lib/github.ts"
import { GithubMark } from "./primitives.tsx"

export function HeroActions() {
  const { lang, t } = useI18n()
  const [stars, setStars] = useState<number>()
  const [version, setVersion] = useState<string>()

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    getRepositoryStars(signal).then((count) => {
      if (!signal.aborted) setStars(count)
    }).catch(() => { /* The repository link remains available. */ })
    getLatestAppRelease(signal).then((tag) => {
      if (!signal.aborted) setVersion(tag)
    }).catch(() => { /* The download link still opens the release list. */ })
    return () => controller.abort()
  }, [])

  return (
    <div className="hero-actions">
      <a
        href={version ? `${OPENPE_RELEASES_URL}/tag/${encodeURIComponent(version)}` : OPENPE_RELEASES_URL}
        className="hero-download inline-flex min-h-12 items-center gap-2 rounded-full bg-green-deep px-5 text-sm font-semibold text-white transition-colors hover:bg-green motion-reduce:transition-none"
      >
        <Download className="size-4 shrink-0" aria-hidden="true" />
        {t.hero.download}
        {version && (
          <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] whitespace-nowrap">
            <span className="sr-only">{t.hero.latestRelease} </span>
            {version}
          </span>
        )}
      </a>
      <a
        href={OPENPE_REPO_URL}
        className="hero-open-source group inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap text-ink-2 underline-offset-4 transition-colors hover:text-green-deep motion-reduce:transition-none"
      >
        <GithubMark className="size-4 shrink-0 text-green-deep" />
        <span className="group-hover:underline">{t.hero.openSource}</span>
        {stars !== undefined && (
          <span className="ml-0.5 inline-flex items-center gap-1 rounded-full border border-green-deep/20 px-1.5 py-0.5 font-mono text-[11px] text-green-deep">
            <Star className="size-3" aria-hidden="true" />
            <span className="sr-only">{t.hero.githubStars} </span>
            {new Intl.NumberFormat(lang).format(stars)}
          </span>
        )}
      </a>
    </div>
  )
}
