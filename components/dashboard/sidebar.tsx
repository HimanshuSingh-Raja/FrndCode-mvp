"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import {
  LayoutDashboard,
  FileCode2,
  Radio,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageCircleQuestion,
  Sparkles,
  Gamepad2,
  Trophy,
  Rocket,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  role: "teacher" | "student"
}

const teacherLinks = [
  { href: "/teacher", label: "Dashboard", icon: LayoutDashboard, emoji: "📊" },
  { href: "/teacher/questions", label: "Questions", icon: FileCode2, emoji: "📝" },
  { href: "/teacher/broadcast", label: "Broadcast", icon: Radio, emoji: "📡" },
  { href: "/teacher/analytics", label: "Analytics", icon: BarChart3, emoji: "📈" },
  { href: "/teacher/students", label: "Students", icon: Users, emoji: "👨‍🎓" },
]

const studentLinks = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard, emoji: "🏠" },
  { href: "/student/live", label: "Live Session", icon: Radio, emoji: "🔴" },
  { href: "/student/practice", label: "Practice", icon: Gamepad2, emoji: "🎮" },
  { href: "/student/helper", label: "Question Helper", icon: MessageCircleQuestion, emoji: "💬" },
  { href: "/student/progress", label: "Progress", icon: Trophy, emoji: "🏆" },
]

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const { currentUser, logout } = useAppStore()
  const [collapsed, setCollapsed] = useState(false)

  const links = role === "teacher" ? teacherLinks : studentLinks
  const isStudent = role === "student"

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r transition-all duration-300",
        isStudent
          ? "bg-gradient-to-b from-card to-primary/5"
          : "bg-card",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && <Logo size="sm" />}
        <Button
          variant="ghost"
          size="icon"
          className={cn("shrink-0 rounded-full", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      {/* Welcome Message for Students */}
      {isStudent && !collapsed && (
        <div className="border-b px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="size-4 text-primary" />
            <span className="font-medium">Ready to code?</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{"Let's learn something new today!"}</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? isStudent
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md"
                    : "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              {isStudent ? (
                <span className={cn("text-lg transition-transform group-hover:scale-110", collapsed ? "mr-0" : "mr-1")}>
                  {link.emoji}
                </span>
              ) : (
                <link.icon className="size-5 shrink-0" />
              )}
              {!collapsed && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Fun Stats for Students */}
      {isStudent && !collapsed && (
        <div className="border-t px-4 py-3">
          <div className="rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Rocket className="size-4 text-primary" />
                <span className="font-medium">5 Day Streak!</span>
              </div>
              <span className="text-xl">🔥</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t p-2">
        <Link
          href={`/${role}/settings`}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          {isStudent ? <span className="text-lg">⚙️</span> : <Settings className="size-5 shrink-0" />}
          {!collapsed && <span>Settings</span>}
        </Link>

        {currentUser && (
          <div
            className={cn(
              "mt-2 flex items-center gap-3 rounded-xl border bg-muted/50 p-2",
              collapsed && "justify-center"
            )}
          >
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-medium">{currentUser.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {isStudent ? "🌟 Level 3 Coder" : currentUser.email}
                </p>
              </div>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          className={cn(
            "mt-2 w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-destructive",
            collapsed && "justify-center px-2"
          )}
          onClick={handleLogout}
        >
          {isStudent ? <span className="text-lg">👋</span> : <LogOut className="size-5 shrink-0" />}
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </aside>
  )
}
