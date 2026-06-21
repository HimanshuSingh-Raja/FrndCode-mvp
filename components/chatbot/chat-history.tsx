"use client"

import { cn } from "@/lib/utils"
import type { ChatSession } from "@/lib/chatbot-types"
import { MessageSquare, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatHistoryProps {
  sessions: ChatSession[]
  activeSessionId: string | null
  onSelectSession: (sessionId: string) => void
  onNewSession: () => void
  onDeleteSession: (sessionId: string) => void
}

export function ChatHistory({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
}: ChatHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex h-full flex-col border-r bg-muted/30">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold text-foreground">Chat History</h2>
        <Button size="sm" onClick={onNewSession} className="gap-1.5">
          <Plus className="size-4" />
          New
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {sessions.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No conversations yet
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
                  activeSessionId === session.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
                onClick={() => onSelectSession(session.id)}
              >
                <MessageSquare className="mt-0.5 size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{session.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(session.lastMessageAt)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteSession(session.id)
                  }}
                >
                  <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
