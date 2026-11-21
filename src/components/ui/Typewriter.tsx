import { useEffect, useRef, useState } from "react"

export function Typewriter(props: { text: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [count, setCount] = useState(props.text.length)

  useEffect(() => {
    const node = ref.current
    if (node === null) throw new Error("missing typewriter")
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) {
      setCount(props.text.length)
      return
    }
    let timer = 0
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry === undefined) throw new Error("missing typewriter entry")
        if (!entry.isIntersecting) return
        observer.disconnect()
        let next = 0
        setCount(0)
        timer = window.setInterval(() => {
          next += 1
          setCount(next)
          if (next >= props.text.length) window.clearInterval(timer)
        }, 38)
      },
      { threshold: 0.6 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearInterval(timer)
    }
  }, [props.text])

  return (
    <p ref={ref} className={props.className} aria-label={props.text}>
      {props.text.slice(0, count)}
      <span aria-hidden="true" className="pe-caret" />
    </p>
  )
}
