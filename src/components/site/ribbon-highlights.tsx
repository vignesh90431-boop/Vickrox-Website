import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TextLoop } from "@/components/site/text-loop"

const offers =
  "WEBSITES FROM ₹500  ·  BUSINESS SITES  ·  ONLINE STORES  ·  PORTFOLIOS  ·  LANDING PAGES  ·  BOOKING SITES  ·  "
const benefits =
  "DESIGNED FOR YOUR BRAND  ·  BUILT FOR EVERY SCREEN  ·  MADE TO GROW WITH YOU  ·  "

function RibbonTrack({
  children,
  reverse = false,
  duration,
}: {
  children: string
  reverse?: boolean
  duration: number
}) {
  return (
    <div
      className={`ribbon-band ${reverse ? "ribbon-band-green" : "ribbon-band-purple"}`}
      aria-hidden="true"
    >
      <div
        className={`ribbon-track${reverse ? "ribbon-track-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <span>{children}</span>
        <span>{children}</span>
      </div>
    </div>
  )
}

export function RibbonHighlights() {
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [textLoop, setTextLoop] = useState(true)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [])

  return (
    <section
      className={`ribbon-stack${paused || reducedMotion ? "is-paused" : ""}`}
      id="highlights"
      aria-label="Website project highlights"
    >
      <p className="visually-hidden">
        Website projects start from 500 rupees. Choose from business websites,
        online stores, portfolios, landing pages, and booking websites.
      </p>
      {textLoop ? (
        <TextLoop
          text="WEBSITES FROM ₹500"
          shape="wave"
          speed={90}
          direction="forward"
          separator="✦"
          curviness={90}
          tilt={0}
          fontSize={46}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          ribbonColor="#5227ff"
          ribbonWidth={86}
          pauseOnHover
          paused={paused || reducedMotion}
        />
      ) : (
        <>
          <RibbonTrack duration={30}>{offers}</RibbonTrack>
          <RibbonTrack reverse duration={36}>
            {benefits}
          </RibbonTrack>
        </>
      )}
      <div className="ribbon-controls">
        <Button
          className="ribbon-motion"
          variant="outline"
          type="button"
          aria-pressed={paused || reducedMotion}
          disabled={reducedMotion}
          onClick={() => setPaused((value) => !value)}
        >
          {reducedMotion
            ? "Motion reduced by your device settings"
            : paused
              ? "Play moving highlights"
              : "Pause moving highlights"}
        </Button>
        <Button
          className="ribbon-style-toggle"
          variant="outline"
          type="button"
          aria-pressed={textLoop}
          onClick={() => setTextLoop((value) => !value)}
        >
          {textLoop ? "Switch to classic bands" : "Switch to wavy ribbons"}
        </Button>
      </div>
    </section>
  )
}
