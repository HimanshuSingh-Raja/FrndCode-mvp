"use client"

import { useState, useCallback } from "react"
import { ChatHistory } from "@/components/chatbot/chat-history"
import { ChatPanel } from "@/components/chatbot/chat-panel"
import {
  type ChatMessage,
  type ChatSession,
  type Language,
  CODE_REQUEST_PATTERNS,
  POLITE_REFUSAL_EN,
  POLITE_REFUSAL_HI,
} from "@/lib/chatbot-types"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock responses for demonstration
const generateMockResponse = (userMessage: string, language: Language): string => {
  const lowerMessage = userMessage.toLowerCase()

  // Check for code requests
  const isCodeRequest = CODE_REQUEST_PATTERNS.some((pattern) =>
    lowerMessage.includes(pattern.toLowerCase())
  )

  if (isCodeRequest) {
    return language === "en" ? POLITE_REFUSAL_EN : POLITE_REFUSAL_HI
  }

  // Generate structured explanation
  if (language === "en") {
    return `Let me help you understand this question!

**Simple Explanation:**
This question is asking you to process some data and produce a specific output. Think of it as a transformation problem where you need to convert input into the required format.

**Input/Output Clarification:**
- Input: You'll receive data in a specific format (usually numbers or strings)
- Output: You need to return the processed result

**Constraints Explained:**
Constraints tell you the limits of your input:
- They help you choose the right approach
- Larger constraints may need more efficient solutions

**Common Confusions:**
- Don't confuse the number of test cases with the actual input
- Read the output format carefully - spacing matters!

**Real-life Example:**
Think of it like sorting your bookshelf - you have books (input), rules for organizing (constraints), and a final arrangement (output). The question just asks you to describe the process, not actually sort the books!

Feel free to paste the specific question and I'll give you a more detailed explanation!`
  }

  return `Chaliye is question ko samajhte hain!

**Simple Explanation:**
Ye question aapko kuch data process karke specific output dene ko keh raha hai. Ise transformation problem samjho - input ko required format mein convert karna hai.

**Input/Output Clarification:**
- Input: Aapko data milega ek specific format mein (usually numbers ya strings)
- Output: Processed result return karna hai

**Constraints Explained:**
Constraints batate hain ki input ki limits kya hain:
- Ye sahi approach choose karne mein help karte hain
- Bade constraints mein efficient solution chahiye

**Common Confusions:**
- Test cases ki count aur actual input alag hoti hai
- Output format dhyan se padhna - spacing matter karti hai!

**Real-life Example:**
Socho jaise bookshelf organize karna - books hain (input), organize karne ke rules hain (constraints), aur final arrangement (output). Question bas process describe karne ko keh raha hai, books sort nahi karna!

Specific question paste karo aur main detailed explanation dunga!`
}

export default function QuestionHelperPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language>("en")
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeSession = sessions.find((s) => s.id === activeSessionId)
  const messages = activeSession?.messages || []

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: language === "en" ? "New Conversation" : "Nayi Conversation",
      messages: [],
      createdAt: new Date(),
      lastMessageAt: new Date(),
    }
    setSessions((prev) => [newSession, ...prev])
    setActiveSessionId(newSession.id)
  }, [language])

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId)
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    if (activeSessionId === sessionId) {
      setActiveSessionId(sessions.length > 1 ? sessions[0].id : null)
    }
  }

  const handleSendMessage = async (content: string) => {
    let currentSessionId = activeSessionId

    // Create new session if none exists
    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: crypto.randomUUID(),
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
        lastMessageAt: new Date(),
      }
      setSessions((prev) => [newSession, ...prev])
      currentSessionId = newSession.id
      setActiveSessionId(newSession.id)
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
      language,
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              title:
                session.messages.length === 0
                  ? content.slice(0, 30) + (content.length > 30 ? "..." : "")
                  : session.title,
              messages: [...session.messages, userMessage],
              lastMessageAt: new Date(),
            }
          : session
      )
    )

    // Simulate typing
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    // Generate response
    const responseContent = generateMockResponse(content, language)
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
      language,
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              messages: [...session.messages, assistantMessage],
              lastMessageAt: new Date(),
            }
          : session
      )
    )

    setIsTyping(false)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-20 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Chat History Sidebar */}
      <div
        className={cn(
          "w-72 shrink-0 transition-all duration-300 lg:relative lg:translate-x-0",
          "absolute inset-y-0 left-0 z-40",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ChatHistory
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
          onNewSession={createNewSession}
          onDeleteSession={handleDeleteSession}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Panel */}
      <div className="flex-1">
        <ChatPanel
          messages={messages}
          isTyping={isTyping}
          language={language}
          onLanguageChange={setLanguage}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}
