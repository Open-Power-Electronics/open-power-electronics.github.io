import { useEffect, useRef } from "react"
import { clipSources, type ClipName } from "@/content/site.ts"

type ClipProps = {
  name: ClipName
  label: string
  /** Visible clips can play unless the workflow has activated another chapter. */
  active?: boolean
}

export function Clip({ name, label, active }: ClipProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const src = clipSources(name)

  useEffect(() => {
    const video = ref.current
    if (video === null) return
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const canObserve = "IntersectionObserver" in window
    let visible = !canObserve

    const sync = () => {
      if (!visible || motion.matches || active === false) {
        video.pause()
        return
      }
      void video.play().catch(() => {
        // The poster remains visible if autoplay or the media format is unavailable.
      })
    }

    if (active === true) video.currentTime = 0
    const observer = canObserve ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    }, { threshold: 0.25 }) : undefined

    observer?.observe(video)
    motion.addEventListener("change", sync)
    sync()

    return () => {
      observer?.disconnect()
      motion.removeEventListener("change", sync)
      video.pause()
    }
  }, [active, name])

  return (
    <video
      ref={ref}
      className="block h-auto w-full object-contain"
      style={{ aspectRatio: src.width / src.height }}
      width={src.width}
      height={src.height}
      poster={src.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      <source src={src.mp4} type="video/mp4" />
      <source src={src.webm} type="video/webm" />
    </video>
  )
}
