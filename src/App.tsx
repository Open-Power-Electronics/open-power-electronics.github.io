import { I18nProvider } from "@/i18n/I18nContext.tsx"
import { ChapterBar } from "@/components/layout/ChapterBar.tsx"
import { Footer } from "@/components/layout/Footer.tsx"
import { Motion } from "@/components/layout/Motion.tsx"
import { NavBar } from "@/components/layout/NavBar.tsx"
import { AgentSection } from "@/components/sections/AgentSection.tsx"
import { ClosingSection } from "@/components/sections/ClosingSection.tsx"
import { FilmSection } from "@/components/sections/FilmSection.tsx"
import { GuidanceSection } from "@/components/sections/GuidanceSection.tsx"
import { Hero } from "@/components/sections/Hero.tsx"
import { MarkSection } from "@/components/sections/MarkSection.tsx"
import { NativeSection } from "@/components/sections/NativeSection.tsx"
import { PluginsSection } from "@/components/sections/PluginsSection.tsx"
import { PrivacySection } from "@/components/sections/PrivacySection.tsx"
import { TeamSection } from "@/components/sections/TeamSection.tsx"
import { VerifySection } from "@/components/sections/VerifySection.tsx"
import { WorkspaceSection } from "@/components/sections/WorkspaceSection.tsx"

export function App() {
  return (
    <I18nProvider>
      <Motion />
      <div className="min-h-screen font-sans text-pe-body">
        <NavBar />
        <main>
          <Hero />
          <FilmSection />
          <AgentSection />
          <WorkspaceSection />
          <VerifySection />
          <MarkSection />
          <GuidanceSection />
          <PluginsSection />
          <PrivacySection />
          <NativeSection />
          <ClosingSection />
          <TeamSection />
        </main>
        <Footer />
        <ChapterBar />
      </div>
    </I18nProvider>
  )
}
