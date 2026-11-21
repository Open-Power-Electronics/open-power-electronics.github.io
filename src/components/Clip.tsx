import { useEffect, useRef } from "react"
import { clipSources, type ClipName } from "@/content/site.ts"
import { prefersReducedMotion } from "@/lib/motion.ts"
import { cn } from "@/lib/utils.ts"

type ClipProps = {
  name: ClipName
  label: string
  className?: string
  /** When set, playback follows this flag instead of viewport visibility. */
  active?: boolean
  /** Played fraction of the loop, reported every animation frame while `active`; 0 until metadata loads. */
  onProgress?: (fraction: number) => void
}

function playedFraction(video: HTMLVideoElement): number {
  if (video.readyState < HTMLMediaElement.HAVE_METADATA) return 0
  if (!Number.isFinite(video.duration) || video.duration <= 0) throw new Error(`clip has no finite duration: ${video.currentSrc}`)
  return Math.min(1, video.currentTime / video.duration)
}

export function Clip({ name, label, className, active, onProgress }: ClipProps) {
  if (onProgress !== undefined && active === undefined) throw new Error(`clip progress requires an explicit active flag: ${name}`)
  const ref = useRef<HTMLVideoElement>(null)
  const progressRef = useRef(onProgress)
  const src = clipSources(name)
  const tracked = onProgress !== undefined

  useEffect(() => {
    progressRef.current = onProgress
  })

  useEffect(() => {
    const video = ref.current
    if (video === null) throw new Error(`clip element missing: ${name}`)
    if (prefersReducedMotion()) return

    const play = () => {
      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        throw error
      })
    }

    if (active !== undefined) {
      if (active) {
        video.currentTime = 0
        play()
      } else {
        video.pause()
      }
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [active, name])

  useEffect(() => {
    if (!tracked || active !== true || prefersReducedMotion()) return
    const video = ref.current
    if (video === null) throw new Error(`clip element missing: ${name}`)

    let frame = 0
    const tick = () => {
      const report = progressRef.current
      if (report === undefined) throw new Error(`clip progress callback removed while tracking: ${name}`)
      report(playedFraction(video))
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [tracked, active, name])

  return (
    <video
      ref={ref}
      className={cn("block h-auto w-full", className)}
      width={src.width}
      height={src.height}
      poster={src.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      <source src={src.webm} type="video/webm" />
      <source src={src.mp4} type="video/mp4" />
    </video>
  )
}
