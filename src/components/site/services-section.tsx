import {
  ArrowUpRight,
  CalendarDays,
  GalleryVerticalEnd,
  LayoutTemplate,
  PanelsTopLeft,
  ShoppingBag,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ElasticHeading } from "@/components/site/elastic-heading"

const services = [
  {
    number: "01 / GET STARTED",
    title: "One-page website",
    description:
      "A simple, polished page for a new idea, small business, or personal service.",
    icon: LayoutTemplate,
    tone: "green",
  },
  {
    number: "02 / GROW YOUR BRAND",
    title: "Business website",
    description:
      "A multi-section online home for your services, story, and contact details.",
    icon: PanelsTopLeft,
    tone: "orange",
  },
  {
    number: "03 / SELL ONLINE",
    title: "Online store",
    description:
      "A storefront concept for product pages, shopping journeys, and enquiries.",
    icon: ShoppingBag,
    tone: "yellow",
  },
  {
    number: "04 / SHOW YOUR WORK",
    title: "Portfolio website",
    description:
      "Present your projects, skills, and experience in a clear, memorable format.",
    icon: GalleryVerticalEnd,
    tone: "green",
  },
  {
    number: "05 / PROMOTE AN OFFER",
    title: "Landing page",
    description:
      "A focused page for a campaign, product launch, event, or special offer.",
    icon: ArrowUpRight,
    tone: "orange",
  },
  {
    number: "06 / TAKE BOOKINGS",
    title: "Booking website",
    description:
      "Help visitors understand your service and find the next step to request a booking.",
    icon: CalendarDays,
    tone: "yellow",
  },
]

type ServicesSectionProps = {
  onSelectWebsite: (website: string) => void
}

export function ServicesSection({ onSelectWebsite }: ServicesSectionProps) {
  return (
    <section
      className="section wrap"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="section-head">
        <div>
          <div className="kicker">What we do</div>
          <ElasticHeading id="services-title">
            What kind of website do you need?
          </ElasticHeading>
        </div>
        <p>
          Choose a starting point. We can shape the design and features around
          your business, audience, and goals.
        </p>
      </div>
      <p className="visually-hidden" id="elastic-help">
        Drag across the headline to stretch the letters, or press Enter or Space
        to animate it.
      </p>
      <p className="price-note">
        Website projects start from <strong>₹500</strong>. Final pricing depends
        on the pages and features your project needs.
      </p>
      <div className="services">
        {services.map(({ number, title, description, icon: Icon, tone }) => (
          <Card className="service" key={title}>
            <CardHeader className="service-header">
              <Badge className="num" variant="outline">
                {number}
              </Badge>
              <span className={`symbol ${tone}`}>
                <Icon aria-hidden="true" />
              </span>
              <CardTitle className="service-title">{title}</CardTitle>
            </CardHeader>
            <CardContent className="service-content">
              <p>{description}</p>
            </CardContent>
            <CardFooter className="service-footer">
              <a
                className="service-link"
                href="#contact"
                onClick={() => onSelectWebsite(title)}
              >
                Discuss this option <ArrowUpRight aria-hidden="true" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
