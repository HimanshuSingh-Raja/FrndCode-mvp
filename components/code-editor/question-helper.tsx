"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  MessageCircleQuestion,
  Languages,
  Send,
  Loader2,
  Lightbulb,
  BookOpen,
  AlertCircle,
  Sparkles,
} from "lucide-react"

type Language = "en" | "hi"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface QuestionHelperProps {
  questionDescription: string
  className?: string
}

const translations = {
  en: {
    title: "Question Helper",
    subtitle: "Understand the problem better",
    languageToggle: "EN",
    placeholder: "Ask about any part of the question...",
    explainSelected: "Explain Selected",
    selectText: "Select text from the question to explain",
    thinking: "Thinking...",
    noSelection: "Please select some text from the problem description first",
  },
  hi: {
    title: "प्रश्न सहायक",
    subtitle: "समस्या को बेहतर समझें",
    languageToggle: "हिं",
    placeholder: "प्रश्न के किसी भी भाग के बारे में पूछें...",
    explainSelected: "चयनित समझाएं",
    selectText: "समझाने के लिए प्रश्न से टेक्स्ट चुनें",
    thinking: "सोच रहा हूँ...",
    noSelection: "कृपया पहले समस्या विवरण से कुछ टेक्स्ट चुनें",
  },
}

// Mock responses - in production, this would call an AI API
const getMockResponse = (query: string, lang: Language): string => {
  const isCodeRequest =
    /code|solution|algorithm|implement|write|program|solve|answer|hint/i.test(query) ||
    /कोड|समाधान|एल्गोरिथम|लिखो|प्रोग्राम|हल|उत्तर/i.test(query)

  if (isCodeRequest) {
    return lang === "en"
      ? "I'm here to help you understand the question, not to provide code or solutions. Let me explain what the question is asking instead!\n\nPlease ask me to clarify:\n• What the input/output means\n• What the constraints mean\n• How to interpret examples\n• What specific terms mean"
      : "मैं यहाँ आपको प्रश्न समझने में मदद करने के लिए हूँ, कोड या समाधान देने के लिए नहीं। मुझे बताइए कि प्रश्न क्या पूछ रहा है!\n\nकृपया मुझसे पूछें:\n• इनपुट/आउटपुट का क्या मतलब है\n• बाधाओं का क्या मतलब है\n• उदाहरणों को कैसे समझें\n• विशिष्ट शब्दों का क्या अर्थ है"
  }

  // Generic helpful responses based on content
  if (/input|output/i.test(query) || /इनपुट|आउटपुट/i.test(query)) {
    return lang === "en"
      ? "**Input/Output Explanation:**\n\nThe input describes what data your function will receive. Think of it as what the computer gives you to work with.\n\nThe output is what your function should return - the answer the computer expects back.\n\n**Real-life analogy:** If someone asks you 'What is 2+2?', the input is '2+2' and the output is '4'."
      : "**इनपुट/आउटपुट स्पष्टीकरण:**\n\nइनपुट वह डेटा है जो आपके फ़ंक्शन को मिलेगा। इसे ऐसे समझें कि कंप्यूटर आपको क्या देता है।\n\nआउटपुट वह है जो आपके फ़ंक्शन को वापस करना चाहिए - वह उत्तर जो कंप्यूटर वापस चाहता है।\n\n**वास्तविक जीवन उदाहरण:** अगर कोई पूछे '2+2 क्या है?', तो इनपुट है '2+2' और आउटपुट है '4'।"
  }

  if (/constraint|limit/i.test(query) || /बाधा|सीमा/i.test(query)) {
    return lang === "en"
      ? "**Constraints Explanation:**\n\nConstraints tell you the boundaries of the problem:\n\n• **Size limits** - How big can the input be? This helps you choose efficient solutions.\n• **Value ranges** - What values can variables have? This prevents edge case surprises.\n• **Time limits** - How fast must your solution run?\n\nThink of constraints as rules of a game - you must solve the problem while following these rules."
      : "**बाधाओं का स्पष्टीकरण:**\n\nबाधाएं आपको समस्या की सीमाएं बताती हैं:\n\n• **आकार सीमा** - इनपुट कितना बड़ा हो सकता है? यह कुशल समाधान चुनने में मदद करता है।\n• **मान सीमा** - वेरिएबल्स के क्या मान हो सकते हैं?\n• **समय सीमा** - आपका समाधान कितनी तेज़ी से चलना चाहिए?\n\nबाधाओं को खेल के नियमों की तरह समझें - आपको इन नियमों का पालन करते हुए समस्या हल करनी है।"
  }

  if (/example/i.test(query) || /उदाहरण/i.test(query)) {
    return lang === "en"
      ? "**Example Walkthrough:**\n\nExamples show you exactly how the function should behave:\n\n1. **Input shown** - This is what goes into your function\n2. **Output shown** - This is what should come out\n3. **Explanation** - Step-by-step reasoning\n\nTry to trace through each example manually before coding. If you can solve it by hand, you can teach the computer to do it too!"
      : "**उदाहरण विश्लेषण:**\n\nउदाहरण आपको दिखाते हैं कि फ़ंक्शन कैसे काम करना चाहिए:\n\n1. **दिखाया गया इनपुट** - यह आपके फ़ंक्शन में जाता है\n2. **दिखाया गया आउटपुट** - यह बाहर आना चाहिए\n3. **स्पष्टीकरण** - चरण-दर-चरण तर्क\n\nकोडिंग से पहले प्रत्येक उदाहरण को मैन्युअल रूप से समझने की कोशिश करें। अगर आप इसे हाथ से हल कर सकते हैं, तो आप कंप्यूटर को भी सिखा सकते हैं!"
  }

  // Default helpful response
  return lang === "en"
    ? "**Let me help you understand this:**\n\nThis part of the question is asking you to think about how to process the given data.\n\n**Key points to consider:**\n• What information is given to you?\n• What result is expected?\n• Are there any special conditions?\n\nWould you like me to explain any specific term or concept from the question?"
    : "**मुझे इसे समझने में आपकी मदद करने दें:**\n\nप्रश्न का यह भाग आपसे कह रहा है कि दिए गए डेटा को कैसे प्रोसेस करें।\n\n**विचार करने योग्य मुख्य बिंदु:**\n• आपको क्या जानकारी दी गई है?\n• क्या परिणाम अपेक्षित है?\n• क्या कोई विशेष शर्तें हैं?\n\nक्या आप चाहते हैं कि मैं प्रश्न से किसी विशिष्ट शब्द या अवधारणा की व्याख्या करूं?"
}

export function QuestionHelper({ questionDescription, className }: QuestionHelperProps) {
  const [language, setLanguage] = useState<Language>("en")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [selectedText, setSelectedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = translations[language]

  // Listen for text selection in the document
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString().trim())
      }
    }

    document.addEventListener("mouseup", handleSelection)
    return () => document.removeEventListener("mouseup", handleSelection)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getMockResponse(messageText, language),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleExplainSelected = () => {
    if (selectedText) {
      const query =
        language === "en"
          ? `Please explain this part: "${selectedText}"`
          : `कृपया इस भाग की व्याख्या करें: "${selectedText}"`
      handleSend(query)
      setSelectedText("")
    }
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"))
  }

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="size-5 text-primary" />
            <CardTitle className="text-base">{t.title}</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="gap-1.5 bg-transparent text-xs font-medium"
          >
            <Languages className="size-3.5" />
            {language === "en" ? "हिं" : "EN"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{t.subtitle}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 pt-0">
        {/* Selected text indicator */}
        {selectedText && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2">
            <Lightbulb className="size-4 shrink-0 text-primary" />
            <p className="flex-1 truncate text-xs text-muted-foreground">
              &ldquo;{selectedText.slice(0, 50)}
              {selectedText.length > 50 ? "..." : ""}&rdquo;
            </p>
            <Button size="sm" variant="secondary" onClick={handleExplainSelected} className="h-7 text-xs">
              {t.explainSelected}
            </Button>
          </div>
        )}

        {/* Messages area */}
        <ScrollArea className="h-48 flex-1 rounded-lg border bg-muted/30 p-3" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <BookOpen className="size-8 text-muted-foreground/50" />
              <p className="text-xs text-muted-foreground">{t.selectText}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="size-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="size-3.5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
                    <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t.thinking}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input area */}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            className="min-h-[40px] max-h-20 resize-none text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            size="icon"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </Button>
        </div>

        {/* Helpful hint */}
        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-2">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            {language === "en"
              ? "I explain questions only - no code or solutions. Select text from the problem to ask about specific parts!"
              : "मैं केवल प्रश्न समझाता हूँ - कोड या समाधान नहीं। विशिष्ट भागों के बारे में पूछने के लिए समस्या से टेक्स्ट चुनें!"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
