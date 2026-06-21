"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Clock, AlertTriangle } from "lucide-react"

interface TimerProps {
  initialSeconds: number
  onTimeUp?: () => void
  isRunning?: boolean
  className?: string
}

export function Timer({ initialSeconds, onTimeUp, isRunning = true, className }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (!isRunning || seconds <= 0) return

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer)
          onTimeUp?.()
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, seconds, onTimeUp])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const percentage = (seconds / initialSeconds) * 100
  const isLow = percentage < 20
  const isCritical = percentage < 10

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-lg font-bold transition-colors",
        isCritical
          ? "animate-pulse border-destructive bg-destructive/10 text-destructive"
          : isLow
            ? "border-warning bg-warning/10 text-warning-foreground"
            : "border-primary bg-primary/10 text-primary",
        className
      )}
    >
      {isCritical ? (
        <AlertTriangle className="size-5" />
      ) : (
        <Clock className="size-5" />
      )}
      <span>{formatTime(seconds)}</span>
    </div>
  )
}
