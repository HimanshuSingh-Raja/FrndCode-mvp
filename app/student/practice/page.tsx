"use client"

import { useState, Suspense, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  friendlyQuestions,
  getQuestionWithMentor,
  type FriendlyQuestion,
  type SuperheroMentor,
} from "@/lib/superhero-data"
import {
  Play,
  Send,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Lightbulb,
  RotateCcw,
  Star,
  Zap,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Playful Code Editor Component
function PlayfulCodeEditor({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-lg">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-400" />
            <div className="size-3 rounded-full bg-yellow-400" />
            <div className="size-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-2 text-sm font-medium text-muted-foreground">Your Code</span>
        </div>
        <Badge variant="secondary" className="gap-1 text-xs">
          <Sparkles className="size-3" />
          JavaScript
        </Badge>
      </div>
      {/* Code textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-[calc(100%-48px)] w-full resize-none bg-card p-4 font-mono text-base leading-relaxed focus:outline-none disabled:opacity-50"
        placeholder="// Write your amazing code here! ✨"
        spellCheck={false}
      />
    </div>
  )
}

// AI Helper Chat Component
function AIHelperChat({
  question,
  mentor,
  language,
  onLanguageChange,
}: {
  question: FriendlyQuestion
  mentor: SuperheroMentor
  language: "en" | "hi"
  onLanguageChange: (lang: "en" | "hi") => void
}) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content:
        language === "en"
          ? `${mentor.emoji} Hi there! I'm here to help you understand the question. Ask me anything - but remember, I won't give you the answer directly! Let's learn together! 🌟`
          : `${mentor.emoji} नमस्ते! मैं यहाँ हूँ आपकी मदद के लिए। कुछ भी पूछो - लेकिन याद रखो, मैं सीधे जवाब नहीं दूंगा! साथ मिलकर सीखते हैं! 🌟`,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const isAskingForCode =
        /code|solution|answer|solve|जवाब|कोड|हल/i.test(userMessage)
      
      let response: string
      if (isAskingForCode) {
        response =
          language === "en"
            ? `${mentor.emoji} I'd love to help you understand, but giving you the code would take away your learning! Let me explain the concept instead:\n\n💡 Think about ${question.hints[0]?.toLowerCase() || "breaking the problem into smaller steps"}.\n\nWant me to explain any part of the question?`
            : `${mentor.emoji} मैं मदद करना चाहता हूँ, लेकिन कोड देना आपकी सीखने की प्रक्रिया को कम कर देगा! चलो concept समझते हैं:\n\n💡 सोचो ${question.hints[0]?.toLowerCase() || "समस्या को छोटे भागों में बाँटने के बारे में"}।\n\nक्या आप चाहते हैं कि मैं कुछ और समझाऊं?`
      } else {
        const explanations = {
          en: [
            `${mentor.emoji} Great question! Let me break it down:\n\n📖 ${question.technicalDescription}\n\n🎯 Try thinking about it step by step!`,
            `${mentor.emoji} Here's a hint: ${question.hints[Math.floor(Math.random() * question.hints.length)]}\n\n✨ You've got this!`,
            `${mentor.emoji} Remember: ${question.examples[0].explanation || "Look at the examples carefully!"}\n\n🚀 Keep going!`,
          ],
          hi: [
            `${mentor.emoji} बढ़िया सवाल! चलो समझते हैं:\n\n📖 ${question.technicalDescription}\n\n🎯 Step by step सोचो!`,
            `${mentor.emoji} एक hint: ${question.hints[Math.floor(Math.random() * question.hints.length)]}\n\n✨ तुम कर सकते हो!`,
            `${mentor.emoji} याद रखो: ${question.examples[0].explanation || "Examples को ध्यान से देखो!"}\n\n🚀 आगे बढ़ो!`,
          ],
        }
        response = explanations[language][Math.floor(Math.random() * explanations[language].length)]
      }

      setMessages((prev) => [...prev, { role: "ai", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary/20 shadow-lg">
      {/* Header */}
      <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-accent/10 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageCircle className="size-5 text-primary" />
            Question Helper
          </CardTitle>
          <div className="flex rounded-full bg-muted p-0.5">
            <button
              onClick={() => onLanguageChange("en")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all",
                language === "en" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange("hi")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all",
                language === "hi" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              हिंदी
            </button>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-muted/30 p-3">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={language === "en" ? "Ask me anything about the question..." : "सवाल के बारे में कुछ भी पूछो..."}
            className="rounded-full border-2 border-primary/20 bg-card"
          />
          <Button onClick={handleSend} size="icon" className="shrink-0 rounded-full">
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Hero Question Card Component
function HeroQuestionCard({
  question,
  mentor,
}: {
  question: FriendlyQuestion
  mentor: SuperheroMentor
}) {
  const [showHint, setShowHint] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)

  return (
    <Card className={cn("overflow-hidden rounded-2xl border-2 border-primary/20 shadow-lg", mentor.bgColor)}>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{mentor.emoji}</span>
          <div>
            <h3 className={cn("font-bold", mentor.color)}>{mentor.name}</h3>
            <p className="text-xs text-muted-foreground">{mentor.greeting}</p>
          </div>
        </div>
      </div>

      {/* Story Description */}
      <CardContent className="p-4">
        <div className="mb-4 rounded-xl bg-card/80 p-4 shadow-inner">
          <p className="text-base leading-relaxed">
            <span className="font-bold">{mentor.emoji} {mentor.name}:</span>{" "}
            {`"${question.storyDescription}"`}
          </p>
        </div>

        {/* Examples */}
        <div className="mb-4">
          <h4 className="mb-2 flex items-center gap-2 font-semibold">
            <Star className="size-4 text-primary" />
            Examples
          </h4>
          <div className="space-y-2">
            {question.examples.map((ex, i) => (
              <div key={i} className="rounded-xl bg-card/80 p-3 text-sm">
                <div className="font-mono">
                  <span className="text-muted-foreground">Input:</span> {ex.input}
                </div>
                <div className="font-mono">
                  <span className="text-muted-foreground">Output:</span> {ex.output}
                </div>
                {ex.explanation && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {`💡 ${ex.explanation}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hint Button */}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowHint(true)
              setCurrentHint((prev) => (prev + 1) % question.hints.length)
            }}
            className="gap-2 rounded-full border-2 border-primary/30 bg-transparent"
          >
            <Lightbulb className="size-4" />
            {showHint ? "Another Hint?" : "Need a Hint?"}
          </Button>
          {showHint && (
            <div className="mt-2 rounded-xl bg-primary/10 p-3 text-sm">
              <span className="font-medium">💡 Hint:</span> {question.hints[currentHint]}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full text-xs">
              {tag}
            </Badge>
          ))}
          <Badge
            className={cn(
              "rounded-full text-xs",
              question.difficulty === "easy"
                ? "bg-green-100 text-green-700"
                : question.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            )}
          >
            {question.difficulty === "easy" ? "🌱 Easy" : question.difficulty === "medium" ? "🌿 Medium" : "🌳 Hard"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Question Selection Grid
function QuestionSelectionGrid({
  onSelect,
}: {
  onSelect: (question: FriendlyQuestion, mentor: SuperheroMentor) => void
}) {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Choose Your <span className="text-primary">Adventure!</span> ✨
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pick a superhero mentor and help them solve their coding challenge!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {friendlyQuestions.map((q) => {
          const { mentor } = getQuestionWithMentor(q.id)
          return (
            <Card
              key={q.id}
              onClick={() => onSelect(q, mentor)}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-2xl border-2 transition-all hover:scale-[1.02] hover:shadow-xl",
                mentor.bgColor
              )}
            >
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl transition-transform group-hover:scale-110">{mentor.emoji}</span>
                  <div>
                    <h3 className={cn("font-bold", mentor.color)}>{mentor.name}</h3>
                    <Badge
                      className={cn(
                        "mt-1 text-xs",
                        q.difficulty === "easy"
                          ? "bg-green-100 text-green-700"
                          : q.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      )}
                    >
                      {q.difficulty === "easy" ? "🌱 Easy" : q.difficulty === "medium" ? "🌿 Medium" : "🌳 Hard"}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="mb-2 font-semibold">{q.title}</h4>
                <p className="line-clamp-2 text-sm text-muted-foreground">{q.storyDescription}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {q.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// Main Practice Content
function PracticeContent() {
  const searchParams = useSearchParams()
  const questionId = searchParams.get("question")

  const [selectedData, setSelectedData] = useState<{
    question: FriendlyQuestion
    mentor: SuperheroMentor
  } | null>(questionId ? getQuestionWithMentor(questionId) : null)

  const [code, setCode] = useState(selectedData?.question.starterCode || "")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<"success" | "error" | null>(null)
  const [language, setLanguage] = useState<"en" | "hi">("en")

  const handleSelect = (question: FriendlyQuestion, mentor: SuperheroMentor) => {
    setSelectedData({ question, mentor })
    setCode(question.starterCode)
    setResult(null)
  }

  const handleRun = async () => {
    setIsRunning(true)
    setResult(null)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setResult(Math.random() > 0.3 ? "success" : "error")
    setIsRunning(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setResult(null)
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setResult(Math.random() > 0.4 ? "success" : "error")
    setIsSubmitting(false)
  }

  if (!selectedData) {
    return <QuestionSelectionGrid onSelect={handleSelect} />
  }

  const { question, mentor } = selectedData

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedData(null)}
            className="gap-1 rounded-full"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mentor.emoji}</span>
            <div>
              <h1 className="font-semibold">{question.title}</h1>
              <p className="text-xs text-muted-foreground">{mentor.name} needs your help!</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1 rounded-full">
            <Zap className="size-3 text-primary" />
            Practice Mode
          </Badge>
        </div>
      </div>

      {/* Three Panel Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Hero + Question */}
        <div className="w-[320px] overflow-y-auto border-r bg-muted/30 p-4">
          <HeroQuestionCard question={question} mentor={mentor} />
        </div>

        {/* Center Panel - AI Helper */}
        <div className="w-[340px] overflow-hidden border-r p-4">
          <AIHelperChat
            question={question}
            mentor={mentor}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex-1">
            <PlayfulCodeEditor
              value={code}
              onChange={setCode}
              disabled={isRunning || isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleRun}
                disabled={isRunning || isSubmitting}
                className="gap-2 rounded-full border-2 border-primary/30 bg-transparent"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="size-4" />
                    Run Tests
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setCode(question.starterCode)
                  setResult(null)
                }}
                className="rounded-full"
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              {result && (
                <div className="flex items-center gap-2">
                  {result === "success" ? (
                    <>
                      <CheckCircle className="size-5 text-green-500" />
                      <span className="font-medium text-green-600">Amazing! All tests passed! 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="size-5 text-red-500" />
                      <span className="font-medium text-red-600">Almost there! Keep trying! 💪</span>
                    </>
                  )}
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={isRunning || isSubmitting}
                className="gap-2 rounded-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Heart className="size-4" />
                    Submit Solution
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading your adventure... ✨</div>}>
      <PracticeContent />
    </Suspense>
  )
}
