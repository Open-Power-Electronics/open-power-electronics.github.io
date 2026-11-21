import { useEffect, useRef } from "react"
import { clipSources, type ClipName } from "@/content/site.ts"

export function Clip(props: { name: ClipName; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const sources = clipSources(props.name)

  useEffect(() => {
    const video = ref.current
    if (video === null) throw new Error(`missing clip video: ${props.name}`)
    // React's muted attribute does not always set the DOM property.
    // A video with sound will not autoplay.
    video.muted = true
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) {
      video.autoplay = false
      video.pause()
      video.controls = true
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry === undefined) throw new Error(`missing clip observer entry: ${props.name}`)
        if (entry.isIntersecting) {
          video.play().catch((error: unknown) => {
            if (!video.isConnected) return
            throw new Error(`clip play failed: ${props.name}: ${String(error)}`)
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [props.name])

  return (
    <video
      ref={ref}
      className="block h-auto w-full bg-white"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={sources.poster}
      width={1280}
      height={720}
      aria-label={props.label}
      onError={() => {
        throw new Error(`clip failed to load: ${props.name}`)
      }}
    >
      <source src={sources.webm} type="video/webm" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  )
}
