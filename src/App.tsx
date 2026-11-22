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
    const stages = [...document.querySelectorAll<HTMLElement>("[data-scroll-stage]")]
    let frame = 0

    const update = () => {
      frame = 0
      if (!motion.matches) return
      const height = window.innerHeight
      const tops = stages.map((stage) => stage.getBoundingClientRect().top)
      tops.forEach((top, index) => {
        const progress = Math.min(1, Math.max(0, (height - top) / (height * 0.55)))
        stages[index].style.setProperty("--stage-progress", String(progress))
      })
      root.setAttribute("data-scroll-ready", "")
    }

    const schedule = () => {
      if (motion.matches && frame === 0) frame = requestAnimationFrame(update)
    }
    const sync = () => {
      if (motion.matches) schedule()
      else root.removeAttribute("data-scroll-ready")
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
