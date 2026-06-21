"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Sparkles, Lightbulb, ChevronRight, Loader2 } from "lucide-react"

interface AIHintsProps {
  questionId: string
  hintsUsed: number
  maxHints?: number
  className?: string
}

const mockHints = [
  "Think about using a data structure that allows O(1) lookup time.",
  "Consider iterating through the array once while storing values you've seen.",
  "A hash map can help you find complements efficiently.",
]

export function AIHints({ questionId, hintsUsed: initialHintsUsed, maxHints = 3, className }: AIHintsProps) {
  const [hints, setHints] = useState<string[]>([])
  const [hintsUsed, setHintsUsed] = useState(initialHintsUsed)
  const [isLoading, setIsLoading] = useState(false)

  const requestHint = async () => {
    if (hintsUsed >= maxHints) return
    
    setIsLoading(true)
    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setHints([...hints, mockHints[hintsUsed] || "Try breaking down the problem into smaller steps."])
    setHintsUsed(hintsUsed + 1)
    setIsLoading(false)
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <CardTitle className="text-base">AI Hints</CardTitle>
          </div>
          <span className="text-sm text-muted-foreground">
            {hintsUsed}/{maxHints} used
          </span>
        </div>
        <CardDescription>
          Get AI-powered hints to guide you toward the solution
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {hints.length > 0 && (
          <div className="space-y-2">
            {hints.map((hint, index) => (
              <div
                key={index}
                className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3"
              >
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" />
                <p className="text-sm">{hint}</p>
              </div>
            ))}
          </div>
        )}

        <Button
          onClick={requestHint}
          disabled={hintsUsed >= maxHints || isLoading}
          variant="outline"
          className="w-full gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Thinking...
            </>
          ) : hintsUsed >= maxHints ? (
            "No more hints available"
          ) : (
            <>
              <Sparkles className="size-4" />
              Get Hint
              <ChevronRight className="size-4" />
            </>
          )}
        </Button>

        {hintsUsed === 0 && (
          <p className="text-center text-xs text-muted-foreground">
            Using hints may affect your score
          </p>
        )}
      </CardContent>
    </Card>
  )
}
