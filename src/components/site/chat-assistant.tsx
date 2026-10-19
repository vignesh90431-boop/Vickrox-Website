import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: number
  sender: "bot" | "user"
  text: string
}

const suggestions = [
  "What websites can you make?",
  "What is your process?",
  "How can I contact you?",
]

function replyFor(message: string) {
  const question = message.toLowerCase()
  if (/price|cost|budget|quote/.test(question)) {
    return "Website projects start from ₹500. Final pricing depends on your goals, pages, and features. Tell us what you need for a suitable quote."
  }
  if (
    /store|shop|e-?commerce|booking|portfolio|business website|one-page/.test(
      question
    )
  ) {
    return "We can discuss one-page, business, online store, portfolio, landing page, and booking website options. Projects start from ₹500."
  }
  if (/process|work|steps|timeline/.test(question)) {
    return "Our process is Discover, Design, Build, and Launch. Contact us to discuss the schedule for your project."
  }
  if (/service|design|website|landing/.test(question)) {
    return "We offer one-page, business, online store, portfolio, landing page, and booking website options. Projects start from ₹500."
  }
  if (/contact|email|call|whatsapp|talk|project|start/.test(question)) {
    return "Reach VICKROX on WhatsApp at +91 90431 04853, email vickyvigneshcoc99@gmail.com, or call +91 90431 04853."
  }
  if (/^(hi|hello|hey)\b/.test(question)) {
    return "Hello! Ask me about website options, pricing, our process, or how to contact VICKROX."
  }
  return "I can help with website options, pricing, our process, or contact details. What would you like to know?"
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: "bot",
      text: "Hi! Ask me about our services, process, or getting in touch.",
    },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    if (!open) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  function updateOpen(nextOpen: boolean) {
    setOpen(nextOpen)
    if (nextOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      toggleRef.current?.focus()
    }
  }

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userId = nextId.current++
    const botId = nextId.current++
    const userMessage: Message = {
      id: userId,
      sender: "user",
      text: trimmed,
    }
    const botMessage: Message = {
      id: botId,
      sender: "bot",
      text: replyFor(trimmed),
    }
    setMessages((current) => [...current, userMessage, botMessage].slice(-40))
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMessage(input)
    setInput("")
    inputRef.current?.focus()
  }

  return (
    <section className="chatbot" aria-label="VICKROX chat assistant">
      {open && (
        <div
          className="chat-panel"
          id="chat-panel"
          onKeyDown={(event) => {
            if (event.key === "Escape") updateOpen(false)
          }}
        >
          <div className="chat-header">
            <div>
              <strong>VICKROX Assistant</strong>
              <span>Quick answers about our services</span>
            </div>
            <Button
              className="chat-close"
              variant="ghost"
              size="icon-lg"
              type="button"
              aria-label="Close chat"
              onClick={() => updateOpen(false)}
            >
              <X />
            </Button>
          </div>
          <div
            className="chat-messages"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <p
                className={`chat-message ${message.sender}-message`}
                key={message.id}
              >
                {message.text}
              </p>
            ))}
          </div>
          <div className="chat-prompts" aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
          <form className="chat-form" onSubmit={submitMessage}>
            <label className="visually-hidden" htmlFor="chat-input">
              Type your message
            </label>
            <Input
              ref={inputRef}
              id="chat-input"
              maxLength={400}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a message..."
              value={input}
            />
            <Button type="submit" aria-label="Send message">
              <Send aria-hidden="true" />
            </Button>
          </form>
          <div className="chat-contact">
            <a
              href="https://wa.me/919043104853?text=Hi%20VICKROX%2C%20I%27d%20like%20to%20discuss%20a%20project."
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="mailto:vickyvigneshcoc99@gmail.com?subject=Website%20Project%20Enquiry">
              Email <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
      <Button
        className="chat-toggle"
        ref={toggleRef}
        id="chat-toggle"
        type="button"
        aria-controls="chat-panel"
        aria-expanded={open}
        onClick={() => updateOpen(!open)}
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        <span>{open ? "Close chat" : "Chat with us"}</span>
      </Button>
    </section>
  )
}
