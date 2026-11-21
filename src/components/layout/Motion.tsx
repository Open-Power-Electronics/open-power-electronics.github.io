import { useEffect } from "react"

export function Motion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    const nodes = document.querySelectorAll<HTMLElement>(".reveal")
    if (nodes.length === 0) throw new Error("no .reveal sections")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement)) {
            throw new Error("reveal target is not an element")
          }
          if (entry.isIntersecting) {
            entry.target.classList.add("pe-in")
          } else if (!entry.target.classList.contains("pe-in")) {
            entry.target.classList.add("pe-below")
          }
        }
      },
      { threshold: 0.18 },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return null
}
