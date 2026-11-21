import { useEffect, useState } from "react"

export function useObservedGroup<T extends string>(args: {
  selector: string
  datasetKey: "chapter" | "nav"
  parse: (value: string | undefined) => T
  initial: T | null
  clearWhenHidden: boolean
}): T | null {
  const { selector, datasetKey, parse, initial, clearWhenHidden } = args
  const [active, setActive] = useState<T | null>(initial)

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(selector)
    if (nodes.length === 0) throw new Error(`no elements for ${selector}`)
    const ratios = new Map<HTMLElement, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement)) {
            throw new Error(`${selector} target is not an element`)
          }
          ratios.set(entry.target, entry.intersectionRatio)
        }
        let best: HTMLElement | null = null
        let bestRatio = 0
        for (const [element, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = element
            bestRatio = ratio
          }
        }
        if (best === null || bestRatio === 0) {
          if (clearWhenHidden) setActive(initial)
          return
        }
        setActive(parse(best.dataset[datasetKey]))
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    )
    for (const node of nodes) {
      parse(node.dataset[datasetKey])
      observer.observe(node)
    }
    return () => observer.disconnect()
  }, [selector, datasetKey, parse, initial, clearWhenHidden])

  return active
}
