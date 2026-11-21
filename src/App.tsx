import { useEffect } from "react"
import { I18nProvider } from "@/i18n/I18nContext.tsx"
import { Agents } from "./components/Agents.tsx"
import { Closing } from "./components/Closing.tsx"
import { Film } from "./components/Film.tsx"
import { Footer } from "./components/Footer.tsx"
import { Hero } from "./components/Hero.tsx"
import { Nav } from "./components/Nav.tsx"
import { Plugins } from "./components/Plugins.tsx"
import { Privacy } from "./components/Privacy.tsx"
import { Specs } from "./components/Specs.tsx"
import { Team } from "./components/Team.tsx"
import { Workflow } from "./components/Workflow.tsx"
import { Workspace } from "./components/Workspace.tsx"

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-in", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    for (const element of document.querySelectorAll("[data-reveal]")) observer.observe(element)
    return () => observer.disconnect()
  }, [])
}

function Page() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Film />
        <Workspace />
        <Workflow />
        <Agents />
        <Plugins />
        <Privacy />
        <Specs />
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
