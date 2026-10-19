import { useState } from "react"
import { ChatAssistant } from "@/components/site/chat-assistant"
import { ContactSection } from "@/components/site/contact-section"
import { HeroSection } from "@/components/site/hero-section"
import { RibbonHighlights } from "@/components/site/ribbon-highlights"
import { ServicesSection } from "@/components/site/services-section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { WhyProcessSections } from "@/components/site/why-process-sections"

export default function App() {
  const [selectedWebsite, setSelectedWebsite] = useState("")

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection onStartProject={() => setSelectedWebsite("")} />
        <RibbonHighlights />
        <ServicesSection onSelectWebsite={setSelectedWebsite} />
        <WhyProcessSections />
        <ContactSection
          selectedWebsite={selectedWebsite}
          onWebsiteChange={setSelectedWebsite}
        />
      </main>
      <SiteFooter />
      <ChatAssistant />
    </>
  )
}
