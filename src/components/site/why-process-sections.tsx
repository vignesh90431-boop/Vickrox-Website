import {
  MonitorSmartphone,
  Sparkles,
  Target,
  UserRoundCheck,
} from "lucide-react"

const benefits = [
  {
    title: "User-friendly experience",
    description: "Simple navigation and clear messaging.",
    icon: UserRoundCheck,
  },
  {
    title: "Modern, clean design",
    description: "A polished look that fits your brand.",
    icon: Sparkles,
  },
  {
    title: "Responsive layouts",
    description: "Designed to work across screen sizes.",
    icon: MonitorSmartphone,
  },
  {
    title: "Business-focused",
    description: "Every section supports a clear goal.",
    icon: Target,
  },
]

const steps = [
  [
    "STEP 01",
    "Discover",
    "We learn about your business, audience, and project goals.",
  ],
  [
    "STEP 02",
    "Design",
    "We shape the layout, content hierarchy, and visual direction.",
  ],
  [
    "STEP 03",
    "Build",
    "We develop a responsive experience and refine the details.",
  ],
  [
    "STEP 04",
    "Launch",
    "We help prepare your website to go live and meet your audience.",
  ],
]

export function WhyProcessSections() {
  return (
    <>
      <section className="section wrap" id="why" aria-labelledby="why-title">
        <div className="why">
          <div>
            <div className="kicker kicker-inverse">The VICKROX difference</div>
            <h2 id="why-title">
              Good design.
              <br />
              Clear purpose.
            </h2>
            <p>
              Your website should do more than look good. It should communicate
              your value, build trust, and make it easy for customers to contact
              you.
            </p>
          </div>
          <div className="why-grid">
            {benefits.map(({ title, description, icon: Icon }) => (
              <article className="why-item" key={title}>
                <Icon aria-hidden="true" />
                <b>{title}</b>
                <span>{description}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="section wrap"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="section-head">
          <div>
            <div className="kicker">How we work</div>
            <h2 id="process-title">From idea to online.</h2>
          </div>
          <p>
            A straightforward process that keeps your goals at the centre of
            every decision.
          </p>
        </div>
        <div className="process">
          {steps.map(([number, title, description]) => (
            <article className="step" key={number}>
              <b>{number}</b>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
