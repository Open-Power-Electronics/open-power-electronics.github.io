import { useRef, useState } from "react"
import { Play } from "lucide-react"
import {
  CHAPTER_IDS,
  FILM_POSTER,
  FILM_SRC,
  FILM_TIME_SECONDS,
  type ChapterId,
} from "@/content/site.ts"

export function Film(props: {
  label: string
  playLabel: string
  chapterLabel: (id: ChapterId) => string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [controls, setControls] = useState(false)

  function requireVideo(): HTMLVideoElement {
    const video = ref.current
    if (video === null) throw new Error("missing film video")
    return video
  }

  function play() {
    const video = requireVideo()
    setControls(true)
    video.play().catch((error: unknown) => {
      throw new Error(`film play failed: ${String(error)}`)
    })
  }

  function seek(id: ChapterId) {
    const seconds = FILM_TIME_SECONDS[id]
    if (!Number.isFinite(seconds) || seconds < 0) {
      throw new Error(`invalid film time: ${id}`)
    }
    const video = requireVideo()
    setControls(true)
    video.currentTime = seconds
    video.play().catch((error: unknown) => {
      throw new Error(`film seek failed: ${String(error)}`)
    })
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-[20px] border border-pe-border bg-white shadow-[0_8px_28px_rgba(31,38,34,0.05)]">
        <video
          ref={ref}
          className="block h-auto w-full"
          poster={FILM_POSTER}
          controls={controls}
          playsInline
          preload="metadata"
          width={1280}
          height={720}
          aria-label={props.label}
          onPlay={() => setControls(true)}
          onError={() => {
            throw new Error("film failed to load")
          }}
        >
          <source src={FILM_SRC} type="video/mp4" />
        </video>
        {controls ? null : (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 grid place-items-center bg-white/10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-pe-green px-5 py-3 text-sm font-semibold text-white">
              <Play className="size-4 fill-white" aria-hidden="true" />
              {props.playLabel}
            </span>
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {CHAPTER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => seek(id)}
            className="rounded-full border border-pe-border bg-white px-3 py-1.5 text-sm font-semibold text-pe-headline-2"
          >
            {props.chapterLabel(id)}
          </button>
        ))}
      </div>
    </div>
  )
}
