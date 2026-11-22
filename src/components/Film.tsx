import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { FILM, FILM_ID } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"

const durationLabel = `${Math.floor(FILM.durationSeconds / 60)}:${String(FILM.durationSeconds % 60).padStart(2, "0")}`

export function Film() {
  const { t } = useI18n()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  function play() {
    const video = videoRef.current
    if (video === null) return
    video.scrollIntoView({ block: "nearest" })
    video.focus({ preventScroll: true })
    setStarted(true)
    void video.play().catch(() => {
      // Native controls let the viewer retry if programmatic playback is blocked.
    })
  }

  return (
    <div id={FILM_ID} role="region" aria-label={t.film.title} className="rise w-full min-w-0 justify-self-center" style={{ animationDelay: "0.2s" }}>
      <div className="relative aspect-video overflow-hidden rounded-[18px] border border-line bg-white">
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-contain"
          poster={FILM.poster}
          preload="none"
          playsInline
          controls={started}
          tabIndex={started ? 0 : -1}
          aria-label={`${t.film.caption} · ${durationLabel}`}
        >
          <source src={FILM.src} type="video/mp4" />
        </video>
        {!started && (
          <>
            <button
              type="button"
              onClick={play}
              aria-label={t.film.play}
              className="group absolute inset-0 grid place-items-center outline-offset-[-3px] transition-colors hover:bg-green/5"
            >
              <span className="grid size-12 place-items-center rounded-full bg-white/95 text-green ring-1 ring-green/20 transition-colors group-hover:bg-mint-2 sm:size-14">
                <Play aria-hidden="true" className="size-5 translate-x-px fill-current" strokeWidth={0} />
              </span>
            </button>
            <span className="pointer-events-none absolute right-2.5 bottom-2.5 rounded bg-ink/85 px-1.5 py-0.5 text-xs font-semibold text-white" aria-hidden="true">{durationLabel}</span>
          </>
        )}
      </div>
    </div>
  )
}
