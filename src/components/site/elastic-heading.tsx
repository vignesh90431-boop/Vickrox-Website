import { useRef, useState, type PointerEvent, type KeyboardEvent } from "react"

type ElasticHeadingProps = {
  children: string
  id: string
}

export function ElasticHeading({ children, id }: ElasticHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const releaseTimer = useRef<number | undefined>(undefined)
  const [activeLetter, setActiveLetter] = useState<number | null>(null)
  const [releasedLetter, setReleasedLetter] = useState<number | null>(null)
  const letters = Array.from(children)

  function findNearestLetter(clientX: number) {
    const heading = headingRef.current
    if (!heading) return null
    const letterElements =
      heading.querySelectorAll<HTMLElement>(".elastic-letter")
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    letterElements.forEach((element, index) => {
      const bounds = element.getBoundingClientRect()
      const distance = Math.abs(clientX - (bounds.left + bounds.right) / 2)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })
    return nearestIndex
  }

  function startPull(event: PointerEvent<HTMLHeadingElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return
    event.currentTarget.setPointerCapture(event.pointerId)
    setActiveLetter(findNearestLetter(event.clientX))
  }

  function continuePull(event: PointerEvent<HTMLHeadingElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      setActiveLetter(findNearestLetter(event.clientX))
    }
  }

  function releasePull() {
    if (releaseTimer.current !== undefined) {
      window.clearTimeout(releaseTimer.current)
    }
    setReleasedLetter(activeLetter)
    setActiveLetter(null)
    releaseTimer.current = window.setTimeout(() => {
      setReleasedLetter(null)
    }, 600)
  }

  function pluckWithKeyboard(event: KeyboardEvent<HTMLHeadingElement>) {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    const middle = Math.floor(letters.length / 2)
    setActiveLetter(middle)
    if (releaseTimer.current !== undefined) {
      window.clearTimeout(releaseTimer.current)
    }
    releaseTimer.current = window.setTimeout(() => {
      setReleasedLetter(middle)
      setActiveLetter(null)
      releaseTimer.current = window.setTimeout(() => {
        setReleasedLetter(null)
      }, 600)
    }, 120)
  }

  return (
    <h2
      aria-describedby="elastic-help"
      aria-label={children}
      className="elastic-lettering"
      id={id}
      onKeyDown={pluckWithKeyboard}
      onLostPointerCapture={() => setActiveLetter(null)}
      onPointerCancel={releasePull}
      onPointerDown={startPull}
      onPointerMove={continuePull}
      onPointerUp={releasePull}
      ref={headingRef}
      tabIndex={0}
    >
      {letters.map((character, index) =>
        character === " " ? (
          <span
            aria-hidden="true"
            className="elastic-space"
            key={`space-${index}`}
          />
        ) : (
          <span
            aria-hidden="true"
            className={[
              "elastic-letter",
              activeLetter === index && "elastic-grabbed",
              activeLetter !== null &&
                Math.abs(activeLetter - index) === 1 &&
                "elastic-neighbor",
              activeLetter !== null &&
                index < activeLetter &&
                activeLetter - index <= 2 &&
                "elastic-neighbor-left",
              activeLetter !== null &&
                index > activeLetter &&
                index - activeLetter <= 2 &&
                "elastic-neighbor-right",
              releasedLetter === index && "elastic-released",
            ]
              .filter(Boolean)
              .join(" ")}
            key={`letter-${index}`}
          >
            {character}
          </span>
        )
      )}
    </h2>
  )
}
