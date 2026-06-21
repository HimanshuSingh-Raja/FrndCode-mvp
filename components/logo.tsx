"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { text: "text-lg", icon: "size-6" },
    md: { text: "text-xl", icon: "size-8" },
    lg: { text: "text-3xl", icon: "size-10" },
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        {/* Cute mascot - friendly robot */}
        <div
          className={cn(
            "flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent p-1.5 shadow-md",
            sizes[size].icon
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-full text-card"
          >
            {/* Robot face */}
            <rect x="4" y="6" width="16" height="14" rx="4" fill="currentColor" />
            {/* Antenna */}
            <circle cx="12" cy="4" r="2" fill="currentColor" />
            <line x1="12" y1="6" x2="12" y2="6" stroke="var(--primary)" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="9" cy="11" r="2" fill="var(--primary)" />
            <circle cx="15" cy="11" r="2" fill="var(--primary)" />
            {/* Smile */}
            <path
              d="M9 15 C9 17 15 17 15 15"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        {/* Sparkle decoration */}
        <div className="absolute -right-1 -top-1 text-primary">
          <svg viewBox="0 0 12 12" className="size-3" fill="currentColor">
            <path d="M6 0L7 4.5L12 6L7 7.5L6 12L5 7.5L0 6L5 4.5L6 0Z" />
          </svg>
        </div>
      </div>
      <span className={cn("font-bold tracking-tight", sizes[size].text)}>
        <span className="text-foreground">Frnd</span>
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Code</span>
      </span>
    </div>
  )
}
