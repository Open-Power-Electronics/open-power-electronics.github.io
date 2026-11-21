import { Play } from "lucide-react"
import { FILM_ID, GITHUB_ORG_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { GithubMark } from "./primitives.tsx"

export function Closing() {
  const { t } = useI18n()
  const c = t.closing

  return (
    <section className="mint-corners relative overflow-hidden border-t border-line py-32 md:py-44">
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_60%_at_50%_50%,black,transparent)]"
      />
      <div className="container-page relative flex flex-col items-center text-center">
        <img data-reveal src="/brand/openpe-mark.svg" alt="" width={56} height={56} className="size-14" />
        <h2 data-reveal className="display mt-9 text-[48px] sm:text-[72px] lg:text-[96px]">
          <span className="block">{c.line1}</span>
          <span className="block text-green">{c.accent}</span>
          <span className="block">{c.line3}</span>
        </h2>
        <div data-reveal className="mt-12 flex flex-wrap justify-center gap-3">
          <a
            href={GITHUB_ORG_URL}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-ink-2"
          >
            <GithubMark className="size-4" />
            {c.github}
          </a>
          <a
            href={`#${FILM_ID}`}
            className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30"
          >
            <Play className="size-3.5 fill-current" strokeWidth={0} />
            {c.watch}
          </a>
        </div>
      </div>
    </section>
  )
}
