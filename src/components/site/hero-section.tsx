import {
  ArrowDown,
  ArrowUpRight,
  LayoutTemplate,
  MonitorSmartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type HeroSectionProps = {
  onStartProject: () => void
}

export function HeroSection({ onStartProject }: HeroSectionProps) {
  return (
    <section className="hero wrap" id="home">
      <span className="eyebrow">
        <span className="dot" />
        DIGITAL EXPERIENCES, BUILT FOR GROWTH
      </span>
      <div className="hero-grid">
        <div>
          <h1>
            Turn your ideas into a <span>powerful website.</span>
          </h1>
          <p>
            We design modern, responsive websites that make your business look
            its best, connect with customers, and grow online.
          </p>
          <div className="actions">
            <Button asChild className="btn primary">
              <a href="#contact" onClick={onStartProject}>
                Start a Project <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild className="btn light" variant="outline">
              <a href="#services">
                Explore Services <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="micro">
            CUSTOM DESIGN · MOBILE-FIRST · BUSINESS-FOCUSED
          </div>
        </div>
        <div className="browser" aria-label="Website service preview">
          <div className="browserbar">
            <span className="traffic" />
            <span className="traffic" />
            <span className="traffic" />
            <div className="url">vickrox.com</div>
            <ArrowUpRight aria-hidden="true" size={15} />
          </div>
          <div className="browserbody">
            <article className="mini-card green">
              <LayoutTemplate className="icon" aria-hidden="true" />
              <h3>Custom Website Design</h3>
              <p>Made for your brand and your business goals.</p>
            </article>
            <article className="mini-card orange">
              <MonitorSmartphone className="icon" aria-hidden="true" />
              <h3>Responsive Web Design</h3>
              <p>Looks great on mobile, tablet, and desktop.</p>
              <span className="pill">
                Explore more <b>→</b>
              </span>
            </article>
            <article className="mini-card yellow">
              <ArrowUpRight className="icon" aria-hidden="true" />
              <h3>Landing Page Design</h3>
              <p>Turn more visitors into enquiries.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
