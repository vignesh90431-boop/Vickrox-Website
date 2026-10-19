import { useState, type FormEvent } from "react"
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const websiteTypes = [
  "One-page website",
  "Business website",
  "Online store",
  "Portfolio website",
  "Landing page",
  "Booking website",
  "Not sure yet",
]

type ContactSectionProps = {
  selectedWebsite: string
  onWebsiteChange: (website: string) => void
}

export function ContactSection({
  selectedWebsite,
  onWebsiteChange,
}: ContactSectionProps) {
  const [status, setStatus] = useState("")
  const [emailHref, setEmailHref] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")

  function clearDraft() {
    setEmailHref("")
    setStatus("")
  }

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    if (!selectedWebsite) {
      setStatus("Choose a website type so we can include it in your enquiry.")
      document.getElementById("project-type-trigger")?.focus()
      return
    }

    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Website type: ${selectedWebsite}`,
      `Project details: ${details.trim() || "Not provided"}`,
    ].join("\n")
    const subject = `Website project enquiry - ${selectedWebsite}`
    setEmailHref(
      `mailto:vickyvigneshcoc99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    )
    setStatus(
      "Your enquiry is ready. Open the email draft below and send it from your email app."
    )
  }

  return (
    <section
      className="section wrap"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact">
        <div className="contact-intro">
          <div className="kicker kicker-contact">Have a project in mind?</div>
          <h2 id="contact-title">
            Let&apos;s talk.
            <br />
            Let&apos;s build something great.
          </h2>
          <p>
            Tell us what you&apos;re planning. Choose an option and prepare an
            enquiry in your email app, or contact us directly.
          </p>
        </div>
        <form className="project-form" onSubmit={prepareEnquiry}>
          <div className="form-field">
            <Label htmlFor="project-name">Your name</Label>
            <Input
              autoComplete="name"
              id="project-name"
              maxLength={80}
              onChange={(event) => {
                setName(event.target.value)
                clearDraft()
              }}
              required
              value={name}
            />
          </div>
          <div className="form-field">
            <Label htmlFor="project-email">Your email</Label>
            <Input
              autoComplete="email"
              id="project-email"
              maxLength={120}
              onChange={(event) => {
                setEmail(event.target.value)
                clearDraft()
              }}
              required
              type="email"
              value={email}
            />
          </div>
          <div className="form-field">
            <Label htmlFor="project-type-trigger">What kind of website?</Label>
            <Select
              onValueChange={(value) => {
                onWebsiteChange(value)
                clearDraft()
              }}
              value={selectedWebsite}
            >
              <SelectTrigger
                className="form-select"
                id="project-type-trigger"
                aria-label="What kind of website?"
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {websiteTypes.map((website) => (
                  <SelectItem key={website} value={website}>
                    {website}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="form-field">
            <Label htmlFor="project-details">
              Anything else we should know? <span>(optional)</span>
            </Label>
            <Textarea
              id="project-details"
              maxLength={1000}
              onChange={(event) => {
                setDetails(event.target.value)
                clearDraft()
              }}
              placeholder="Your goals, pages, features, or questions"
              rows={3}
              value={details}
            />
          </div>
          <Button className="project-submit" type="submit">
            Prepare email enquiry <Send aria-hidden="true" />
          </Button>
          <p className="form-status" role="status" aria-live="polite">
            {status}
          </p>
          {emailHref && (
            <Button asChild className="email-draft" variant="outline">
              <a href={emailHref}>
                Open email draft <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          )}
          <p className="privacy-note">
            Your details are not stored or submitted by this page. Review the
            draft and send it from your email app.
          </p>
        </form>
        <div className="contact-actions" aria-label="Other contact options">
          <Button asChild className="btn">
            <a
              href="https://wa.me/919043104853?text=Hi%20VICKROX%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business."
              rel="noopener noreferrer"
              target="_blank"
            >
              Chat on WhatsApp <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <Button asChild className="btn light" variant="outline">
            <a href="mailto:vickyvigneshcoc99@gmail.com?subject=Website%20Project%20Enquiry">
              <Mail aria-hidden="true" /> Email VICKROX
            </a>
          </Button>
          <Button asChild className="btn light" variant="outline">
            <a href="tel:+919043104853">
              <Phone aria-hidden="true" /> Call 9043104853
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
