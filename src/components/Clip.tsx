import { useEffect, useRef } from "react"
import { clipSources, type ClipName } from "@/content/site.ts"
import { cn } from "@/lib/utils.ts"

type ClipProps = {
  name: ClipName
  label: string
  className?: string
  /** When set, playback follows this flag instead of viewport visibility. */
  active?: boolean
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function Clip({ name, label, className, active }: ClipProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const src = clipSources(name)

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
