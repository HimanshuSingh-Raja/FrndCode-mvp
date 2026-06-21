"use client"

import React from "react"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  readOnly?: boolean
  className?: string
}

export function CodeEditor({ value, onChange, language = "javascript", readOnly = false, className }: CodeEditorProps) {
  const [lineNumbers, setLineNumbers] = useState<number[]>([])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      onChange(newValue)
      const lines = newValue.split("\n").length
      setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1))
    },
    [onChange]
  )

  // Initialize line numbers
  useState(() => {
    const lines = value.split("\n").length
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1))
  })

  return (
    <div className={cn("relative flex h-full overflow-hidden rounded-lg border bg-[#1e1e2e]", className)}>
      {/* Line numbers */}
      <div className="flex flex-col border-r border-[#313244] bg-[#181825] px-3 py-4 text-right font-mono text-sm text-[#6c7086] select-none">
        {(value.split("\n").length > 0 ? value.split("\n") : [""]).map((_, i) => (
          <span key={i} className="leading-6">
            {i + 1}
          </span>
        ))}
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        spellCheck={false}
        className={cn(
          "flex-1 resize-none bg-transparent p-4 font-mono text-sm text-[#cdd6f4] outline-none leading-6",
          "placeholder:text-[#6c7086]",
          readOnly && "cursor-not-allowed opacity-70"
        )}
        placeholder="// Write your code here..."
      />
    </div>
  )
}
