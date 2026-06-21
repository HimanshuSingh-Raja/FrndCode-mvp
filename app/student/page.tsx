"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { mockStudentStats, mockSubmissions } from "@/lib/mock-data"
import { friendlyQuestions, getQuestionWithMentor } from "@/lib/superhero-data"
import Link from "next/link"
import {
  Radio,
  Trophy,
  Target,
  Flame,
  ArrowRight,
  CheckCircle,
  XCircle,
  Sparkles,
  Rocket,
  Star,
  Gamepad2,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function StudentDashboard() {
  const { currentUser, activeSession } = useAppStore()
  const stats = mockStudentStats
  const recentSubmissions = mockSubmissions.filter((s) => s.studentId === "student-1").slice(0, 3)

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-card shadow-lg">
            <span className="text-3xl">👋</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Hey there, {currentUser?.name?.split(" ")[0] || "Coder"}! ✨
            </h1>
            <p className="mt-1 text-muted-foreground">
              {"Ready for another coding adventure? Let's make today amazing!"}
            </p>
          </div>
        </div>
      </div>

      {/* Live session alert */}
      {activeSession && (
        <Card className="mb-8 overflow-hidden border-2 border-accent bg-gradient-to-r from-accent/10 to-primary/10">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative flex size-4 items-center justify-center rounded-full bg-accent text-xs">
                  🔴
                </span>
              </div>
              <div>
                <p className="font-semibold">Your teacher is live! 🎉</p>
                <p className="text-sm text-muted-foreground">
                  A superhero needs your help right now!
                </p>
              </div>
            </div>
            <Button asChild className="gap-2 rounded-full">
              <Link href="/student/live">
                <Radio className="size-4" />
                Join Adventure!
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Fun Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden rounded-2xl border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Target className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.questionsAttempted}</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <Sparkles className="size-3 text-primary" />
              <span>8 this week!</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl border-2 border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-green-100">
                <Trophy className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {Math.round((stats.passedSubmissions / stats.totalSubmissions) * 100)}%
                </p>
                <p className="text-sm text-green-600">Success Rate</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
              <Star className="size-3" />
              <span>{"You're doing great!"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl border-2 border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-amber-100">
                <Flame className="size-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700">{stats.streakDays} days</p>
                <p className="text-sm text-amber-600">Streak 🔥</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-amber-600">
              <Zap className="size-3" />
              <span>Keep it going!</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl border-2 border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100">
                <Rocket className="size-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">Level 3</p>
                <p className="text-sm text-purple-600">Coder Rank</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-purple-600">
              <Star className="size-3" />
              <span>2 more to level up!</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              {"What do you want to do?"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Button asChild className="h-auto flex-col gap-3 rounded-2xl py-6">
              <Link href="/student/live">
                <span className="text-3xl">🔴</span>
                <span className="font-semibold">Join Live Session</span>
                <span className="text-xs opacity-80">Help superheroes in real-time!</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-auto flex-col gap-3 rounded-2xl border-2 border-primary/20 py-6"
            >
              <Link href="/student/practice">
                <span className="text-3xl">🎮</span>
                <span className="font-semibold">Practice Mode</span>
                <span className="text-xs opacity-80">Learn at your own pace</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent submissions */}
        <Card className="rounded-2xl border-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-5 text-primary" />
                Recent Adventures
              </CardTitle>
              <CardDescription>Your latest coding quests</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="rounded-full">
              <Link href="/student/progress" className="gap-1">
                View all
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((submission, index) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between rounded-xl border-2 border-muted bg-muted/30 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{["🕷️", "🦾", "⚡"][index % 3]}</span>
                      <div>
                        <h4 className="font-medium">
                          {["Spider-Man's Challenge", "Iron Man's Puzzle", "Thor's Quest"][index % 3]}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {submission.status === "passed" ? (
                      <Badge className="gap-1 rounded-full bg-green-100 text-green-700">
                        <CheckCircle className="size-3" />
                        Passed!
                      </Badge>
                    ) : (
                      <Badge className="gap-1 rounded-full bg-amber-100 text-amber-700">
                        <XCircle className="size-3" />
                        Try Again
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-xl bg-muted/50 p-6 text-center">
                  <span className="text-4xl">🚀</span>
                  <p className="mt-2 text-muted-foreground">No adventures yet - start one now!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Superhero Adventures */}
        <Card className="rounded-2xl border-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="size-5 text-primary" />
              Choose Your Adventure!
            </CardTitle>
            <CardDescription>Superheroes need your coding skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {friendlyQuestions.slice(0, 3).map((question) => {
                const { mentor } = getQuestionWithMentor(question.id)
                return (
                  <div
                    key={question.id}
                    className={cn(
                      "group rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] hover:shadow-lg",
                      mentor.bgColor
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl transition-transform group-hover:scale-110">
                          {mentor.emoji}
                        </span>
                        <div>
                          <h4 className="font-semibold">{mentor.name}</h4>
                          <Badge
                            className={cn(
                              "mt-1 text-xs",
                              question.difficulty === "easy"
                                ? "bg-green-100 text-green-700"
                                : question.difficulty === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            )}
                          >
                            {question.difficulty === "easy"
                              ? "🌱 Easy"
                              : question.difficulty === "medium"
                                ? "🌿 Medium"
                                : "🌳 Hard"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {question.storyDescription}
                    </p>
                    <div className="mt-3 flex gap-1">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="mt-4 w-full rounded-full" size="sm">
                      <Link href={`/student/practice?question=${question.id}`}>
                        Help {mentor.name}! 🚀
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
