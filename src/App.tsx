import { useEffect } from "react"
import { I18nProvider, useI18n } from "@/i18n/I18nContext.tsx"
import type { Lang } from "@/i18n/content.ts"
import { Agents } from "./components/Agents.tsx"
import { Closing } from "./components/Closing.tsx"
import { Footer } from "./components/Footer.tsx"
import { Hero } from "./components/Hero.tsx"
import { Nav } from "./components/Nav.tsx"
import { Plugins } from "./components/Plugins.tsx"
import { Team } from "./components/Team.tsx"
import { Workflow } from "./components/Workflow.tsx"
import { Workspace } from "./components/Workspace.tsx"

function useReveal(lang: Lang) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const root = document.documentElement
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-in", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.05 },
    )

    root.classList.add("reveal-ready")
    for (const element of document.querySelectorAll("[data-reveal]:not([data-in])")) observer.observe(element)
    return () => {
      observer.disconnect()
      root.classList.remove("reveal-ready")
    }
  }, [lang])
}

function useScrollMotion() {
  useEffect(() => {
    const root = document.documentElement
    const motion = matchMedia("(prefers-reduced-motion: no-preference)")
    const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-stage]"), (element) => ({
      element,
      paced: element.dataset.scrollStage === "architecture",
      progress: undefined as number | undefined,
    }))
    let frame = 0
    let previousFrame: number | undefined

    const update = (now: number) => {
      frame = 0
      if (!motion.matches) return

      const height = window.innerHeight
      const tops = stages.map(({ element }) => element.getBoundingClientRect().top)
      const elapsed = previousFrame === undefined ? 1000 / 60 : Math.min(now - previousFrame, 50)
      const maxStep = elapsed / 1550
      let settling = false

      stages.forEach((stage, index) => {
        const range = height * (stage.paced ? 0.65 : 0.55)
        const target = Math.min(1, Math.max(0, (height - tops[index]) / range))
        const current = stage.progress ?? 0
        const delta = target - current
        // Limit how much of the diagram a single wheel step or anchor jump can skip.
        const progress = stage.paced && Math.abs(delta) > maxStep
          ? current + Math.sign(delta) * maxStep
          : target

        if (progress !== stage.progress) {
          stage.element.style.setProperty("--stage-progress", String(progress))
          stage.progress = progress
        }
        settling ||= progress !== target
      })

      if (!root.hasAttribute("data-scroll-ready")) root.setAttribute("data-scroll-ready", "")
      previousFrame = settling ? now : undefined
      if (settling) frame = requestAnimationFrame(update)
    }

    const schedule = () => {
      if (motion.matches && frame === 0) frame = requestAnimationFrame(update)
    }
    const sync = () => {
      if (motion.matches) schedule()
      else {
        cancelAnimationFrame(frame)
        frame = 0
        previousFrame = undefined
        root.removeAttribute("data-scroll-ready")
      }
    }

    sync()
    motion.addEventListener("change", sync)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      motion.removeEventListener("change", sync)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
      root.removeAttribute("data-scroll-ready")
    }
  }, [])
}

function Page() {
  const { lang } = useI18n()
  useReveal(lang)
  useScrollMotion()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Workspace />
        <Workflow />
        <Agents />
        <Plugins />
        <Team />
        <Closing />
      </main>
      <Footer />
    </>
  )
}

export function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  )
}
