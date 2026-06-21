"use client"

import { cn } from "@/lib/utils"
import type { Language } from "@/lib/chatbot-types"

interface LanguageToggleProps {
  language: Language
  onChange: (language: Language) => void
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-muted p-1">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={cn(
          "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
          language === "en"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("hi")}
        className={cn(
          "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
          language === "hi"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        HI
      </button>
    </div>
  )
}
