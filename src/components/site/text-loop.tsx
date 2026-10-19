import { gsap } from "gsap"
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"

const VIEW_WIDTH = 1200
const VIEW_HEIGHT = 240

type TextLoopProps = {
  text: string
  shape?: "wave"
  speed?: number
  direction?: "forward" | "reverse"
  separator?: string
  curviness?: number
  tilt?: number
  fontSize?: number
  fontWeight?: number
  letterSpacing?: number
  uppercase?: boolean
  ribbonColor?: string
  ribbonWidth?: number
  pauseOnHover?: boolean
  paused?: boolean
}

function buildWavePath(curviness: number, ribbonWidth: number) {
  const centerY = VIEW_HEIGHT / 2
  const amplitude = Math.min(
    Math.max(0, curviness),
    centerY - Math.max(0, ribbonWidth) / 2 - 8
  )

  return `M -300 ${centerY} C -200 ${centerY - amplitude} -100 ${centerY - amplitude} 0 ${centerY} C 100 ${centerY + amplitude} 200 ${centerY + amplitude} 300 ${centerY} C 400 ${centerY - amplitude} 500 ${centerY - amplitude} 600 ${centerY} C 700 ${centerY + amplitude} 800 ${centerY + amplitude} 900 ${centerY} C 1000 ${centerY - amplitude} 1100 ${centerY - amplitude} 1200 ${centerY} C 1300 ${centerY + amplitude} 1400 ${centerY + amplitude} 1500 ${centerY}`
}

export function TextLoop({
  text,
  speed = 90,
  direction = "forward",
  separator = "✦",
  curviness = 90,
  tilt = 0,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  ribbonColor = "#5227ff",
  ribbonWidth = 86,
  pauseOnHover = true,
  paused = false,
}: TextLoopProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const measureRef = useRef<SVGTextElement>(null)
  const headRef = useRef<SVGTextPathElement>(null)
  const tailRef = useRef<SVGTextPathElement>(null)
  const offsetRef = useRef(0)
  const [pathLength, setPathLength] = useState(0)
  const [repetitions, setRepetitions] = useState(1)
  const pathId = `text-loop-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const unit = `${uppercase ? text.toUpperCase() : text}${separator ? `\u00a0${separator}\u00a0` : "\u00a0\u00a0\u00a0"}`
  const path = buildWavePath(curviness, ribbonWidth)
  const repeatedText = unit.repeat(repetitions)
  const textColor = "#fff"
  const textStyle = {
    fontSize: `${fontSize}px`,
    fontWeight,
    letterSpacing: `${letterSpacing}px`,
  }

  useLayoutEffect(() => {
    const pathElement = pathRef.current
    const measureElement = measureRef.current
    if (!pathElement || !measureElement) return

    const length = pathElement.getTotalLength()
    const unitWidth = measureElement.getComputedTextLength()
    if (!length || !unitWidth) return

    setPathLength(length)
    setRepetitions(Math.max(1, Math.round(length / unitWidth)))
  }, [path, unit, fontSize, fontWeight, letterSpacing])

  useEffect(() => {
    const root = rootRef.current
    const pathElement = pathRef.current
    const head = headRef.current
    const tail = tailRef.current
    if (
      !root ||
      !pathElement ||
      !head ||
      !tail ||
      !pathLength ||
      paused ||
      speed <= 0
    ) {
      return
    }

    const progress = { value: offsetRef.current }
    const directionScale = direction === "reverse" ? -1 : 1
    const updateOffset = () => {
      const offset = ((progress.value % pathLength) + pathLength) % pathLength
      offsetRef.current = offset
      head.setAttribute("startOffset", String(offset))
      tail.setAttribute("startOffset", String(offset - pathLength))
    }
    const animation = gsap.to(progress, {
      value: progress.value + pathLength * directionScale,
      duration: pathLength / speed,
      ease: "none",
      repeat: -1,
      onUpdate: updateOffset,
    })
    const slowOnHover = () => {
      gsap.to(animation, {
        timeScale: 0,
        duration: 0.55,
        ease: "power2.out",
        overwrite: true,
      })
    }
    const resumeAfterHover = () => {
      gsap.to(animation, {
        timeScale: 1,
        duration: 0.7,
        ease: "power2.inOut",
        overwrite: true,
      })
    }

    updateOffset()
    if (pauseOnHover) {
      root.addEventListener("pointerenter", slowOnHover)
      root.addEventListener("pointerleave", resumeAfterHover)
    }

    return () => {
      root.removeEventListener("pointerenter", slowOnHover)
      root.removeEventListener("pointerleave", resumeAfterHover)
      gsap.killTweensOf(animation)
      animation.kill()
    }
  }, [direction, pauseOnHover, pathLength, paused, speed])

  return (
    <div className="text-loop" ref={rootRef}>
      <svg
        aria-label={text}
        className="text-loop-svg"
        preserveAspectRatio="none"
        role="img"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      >
        <text
          aria-hidden="true"
          className="text-loop-measure"
          ref={measureRef}
          style={textStyle}
        >
          {unit}
        </text>
        <g
          transform={
            tilt
              ? `rotate(${tilt} ${VIEW_WIDTH / 2} ${VIEW_HEIGHT / 2})`
              : undefined
          }
        >
          <path
            d={path}
            fill="none"
            id={pathId}
            ref={pathRef}
            stroke={ribbonColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={ribbonWidth}
          />
          <text
            aria-hidden="true"
            className="text-loop-text"
            dominantBaseline="central"
            fill={textColor}
            style={textStyle}
            textLength={pathLength || undefined}
            lengthAdjust="spacing"
          >
            <textPath href={`#${pathId}`} ref={headRef} startOffset={0}>
              {repeatedText}
            </textPath>
          </text>
          <text
            aria-hidden="true"
            className="text-loop-text"
            dominantBaseline="central"
            fill={textColor}
            style={textStyle}
            textLength={pathLength || undefined}
            lengthAdjust="spacing"
          >
            <textPath
              href={`#${pathId}`}
              ref={tailRef}
              startOffset={-pathLength}
            >
              {repeatedText}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  )
}
