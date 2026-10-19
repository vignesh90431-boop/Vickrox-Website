import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  ["Services", "#services"],
  ["Why VICKROX", "#why"],
  ["Our Process", "#process"],
  ["Contact", "#contact"],
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  return (
    <header className="wrap nav">
      <a className="brand" href="#home" aria-label="VICKROX home">
        <span className="brandmark">V</span>
        <span>
          VICKROX
          <small>BUILD · DESIGN · GROW</small>
        </span>
      </a>
      <nav
        className={`navlinks${menuOpen ? "open" : ""}`}
        id="navlinks"
        aria-label="Main navigation"
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <Button asChild className="navcta">
        <a href="#contact">
          Let&apos;s Talk <ArrowUpRight aria-hidden="true" />
        </a>
      </Button>
      <Button
        className="menu"
        variant="ghost"
        size="icon-lg"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="navlinks"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X /> : <Menu />}
      </Button>
    </header>
  )
}
