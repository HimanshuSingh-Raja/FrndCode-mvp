"use client"

import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatBubble, TypingIndicator } from "./chat-bubble"
import { ChatInput } from "./chat-input"
import { LanguageToggle } from "./language-toggle"
import type { ChatMessage, Language } from "@/lib/chatbot-types"
import { HelpCircle, Lightbulb } from "lucide-react"

interface ChatPanelProps {
  messages: ChatMessage[]
  isTyping: boolean
  language: Language
  onLanguageChange: (language: Language) => void
  onSendMessage: (message: string) => void
}

export function ChatPanel({
  messages,
  isTyping,
  language,
  onLanguageChange,
  onSendMessage,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <HelpCircle className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Question Helper</h1>
            <p className="text-xs text-muted-foreground">English / Hindi</p>
          </div>
        </div>
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6" ref={scrollRef}>
        <div className="space-y-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Lightbulb className="size-8 text-primary" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                {language === "en" ? "Welcome to Question Helper!" : "Question Helper mein aapka swagat hai!"}
              </h2>
              <p className="max-w-md text-sm text-muted-foreground">
                {language === "en"
                  ? "I can help you understand coding questions in simple language. Just paste the question or describe what you're confused about."
                  : "Main aapko coding questions simple language mein samjha sakta hoon. Question paste karo ya batao kya confuse kar raha hai."}
              </p>
              <div className="mt-6 grid gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {language === "en" ? "Try asking:" : "Ye try karo:"}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {(language === "en"
                    ? [
                        "What does this question mean?",
                        "Explain the input format",
                        "What are constraints?",
                      ]
                    : [
                        "Ye question ka matlab kya hai?",
                        "Input format samjhao",
                        "Constraints kya hain?",
                      ]
                  ).map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => onSendMessage(suggestion)}
                      className="rounded-full border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={isTyping} language={language} />
    </div>
  )
}
