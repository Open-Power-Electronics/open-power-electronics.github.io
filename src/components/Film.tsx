import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { FILM, FILM_CHAPTERS, FILM_ID } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { cn } from "@/lib/utils.ts"

const SEGMENTS = FILM_CHAPTERS.map((chapter, index) => {
  const end = index + 1 < FILM_CHAPTERS.length ? FILM_CHAPTERS[index + 1].start : FILM.durationSeconds
  return { ...chapter, end, length: end - chapter.start }
})

function timestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`
}

export function Film() {
  const { t } = useI18n()
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [time, setTime] = useState(0)

  const video = () => {
    const element = ref.current
    if (element === null) throw new Error("film element missing")
    return element
  }

  const playFrom = (seconds: number | null) => {
    const element = video()
    if (seconds !== null) element.currentTime = seconds
    setStarted(true)
    void element.play()
  }

  return (
    <section id={FILM_ID} className="relative bg-white pt-20 pb-28 md:pt-28 md:pb-36">
      <div className="container-page">
        <div data-reveal className="window">
          <div className="flex h-10 items-center justify-between border-b border-line bg-paper px-4">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
            </div>
            <p className="font-mono text-[11.5px] text-muted">{t.film.caption}</p>
            <span className="w-[42px]" aria-hidden="true" />
          </div>
          <div className="relative aspect-video bg-white">
            <video
              ref={ref}
              className="absolute inset-0 size-full"
              poster={FILM.poster}
              preload="none"
              playsInline
              controls={started}
              onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
            >
              <source src={FILM.src} type="video/mp4" />
            </video>
            {!started && (
              <button
                type="button"
                onClick={() => playFrom(null)}
                aria-label={t.film.play}
                className="group absolute inset-0 grid place-items-center bg-ink/0 transition-colors hover:bg-ink/[0.03]"
              >
                <span className="grid size-20 place-items-center rounded-full bg-white/95 shadow-[0_12px_40px_-8px_rgb(16_56_28/0.35)] ring-1 ring-line transition-transform duration-300 group-hover:scale-105">
                  <Play className="size-7 translate-x-0.5 fill-green text-green" strokeWidth={0} />
                </span>
              </button>
            )}
          </div>
        </div>

        <ol data-reveal className="mt-6 flex gap-2 md:gap-3">
          {SEGMENTS.map((segment) => {
            const progress = Math.min(1, Math.max(0, (time - segment.start) / segment.length))
            const current = time >= segment.start && time < segment.end && started
            return (
              <li key={segment.id} style={{ flexGrow: segment.length, flexBasis: 0 }} className="min-w-0">
                <button
                  type="button"
                  onClick={() => playFrom(segment.start)}
                  className="group flex w-full flex-col gap-2.5 text-left"
                >
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-line">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-green transition-[width] duration-200"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </span>
                  <span className="flex items-baseline justify-between gap-2">
                    <span
                      className={cn(
                        "truncate text-[13px] font-semibold transition-colors md:text-[14px]",
                        current ? "text-green" : "text-ink-2 group-hover:text-ink",
                      )}
                    >
                      {t.film.chapters[segment.id]}
                    </span>
                    <span className="hidden font-mono text-[11px] text-faint sm:inline">{timestamp(segment.start)}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
