"use client"

import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/lib/chatbot-types"
import { Bot, User } from "lucide-react"

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user"

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>

      <div className={cn("max-w-[75%] space-y-1", isUser && "text-right")}>
        <div
          className={cn(
            "inline-block rounded-2xl px-4 py-2.5",
            isUser
              ? "rounded-br-sm bg-primary text-primary-foreground"
              : "rounded-bl-sm bg-muted text-foreground"
          )}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </div>
        <p className="px-1 text-[10px] text-muted-foreground">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Bot className="size-4" />
      </div>
      <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
        <div className="flex gap-1">
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
