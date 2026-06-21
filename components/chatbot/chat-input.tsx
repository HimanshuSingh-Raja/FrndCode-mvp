"use client"

import { useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import type { Language } from "@/lib/chatbot-types"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  language: Language
}

export function ChatInput({ onSend, disabled, language }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const placeholders = {
    en: "Ask me to explain the question... (No code will be given)",
    hi: "Mujhse question samjhne ke liye pucho... (Code nahi milega)",
  }

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t bg-background p-4">
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[language]}
          disabled={disabled}
          className="min-h-[60px] resize-none pr-14 text-sm"
          rows={2}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="absolute bottom-2 right-2"
        >
          <Send className="size-4" />
        </Button>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {language === "en"
          ? "I explain questions, not solve them"
          : "Main questions samjhata hoon, solve nahi karta"}
      </p>
    </div>
  )
}
