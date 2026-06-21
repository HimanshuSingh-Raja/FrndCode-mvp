"use client"

import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react"
import type { TestResult, TestCase } from "@/lib/types"

interface TestResultsProps {
  testCases: TestCase[]
  results?: TestResult[]
  isRunning?: boolean
  className?: string
}

export function TestResults({ testCases, results, isRunning, className }: TestResultsProps) {
  const visibleTestCases = testCases.filter((tc) => !tc.isHidden)
  const hiddenCount = testCases.filter((tc) => tc.isHidden).length

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Test Cases</h4>
        {results && (
          <span className="text-sm text-muted-foreground">
            {results.filter((r) => r.passed).length}/{testCases.length} passed
          </span>
        )}
      </div>

      <div className="space-y-2">
        {visibleTestCases.map((tc, index) => {
          const result = results?.find((r) => r.testCaseId === tc.id)

          return (
            <div
              key={tc.id}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                result?.passed === true && "border-success/50 bg-success/5",
                result?.passed === false && "border-destructive/50 bg-destructive/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Test Case {index + 1}</span>
                {isRunning ? (
                  <Loader2 className="size-4 animate-spin text-primary" />
                ) : result ? (
                  result.passed ? (
                    <CheckCircle className="size-4 text-success" />
                  ) : (
                    <XCircle className="size-4 text-destructive" />
                  )
                ) : (
                  <Clock className="size-4 text-muted-foreground" />
                )}
              </div>

              <div className="mt-2 grid gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Input: </span>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{tc.input}</code>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected: </span>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{tc.expectedOutput}</code>
                </div>
                {result && !result.passed && result.actualOutput && (
                  <div>
                    <span className="text-destructive">Got: </span>
                    <code className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs text-destructive">
                      {result.actualOutput}
                    </code>
                  </div>
                )}
                {result && !result.passed && result.error && (
                  <div className="text-xs text-destructive">{result.error}</div>
                )}
              </div>
            </div>
          )
        })}

        {hiddenCount > 0 && (
          <div className="rounded-lg border border-dashed p-3 text-center text-sm text-muted-foreground">
            + {hiddenCount} hidden test case{hiddenCount > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  )
}
