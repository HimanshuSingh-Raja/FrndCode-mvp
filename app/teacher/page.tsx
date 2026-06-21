"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/stats-card"
import { useAppStore } from "@/lib/store"
import { mockTeacherStats, mockQuestions } from "@/lib/mock-data"
import Link from "next/link"
import {
  FileCode2,
  Users,
  Radio,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react"

export default function TeacherDashboard() {
  const { currentUser, questions } = useAppStore()
  const stats = mockTeacherStats
  const recentQuestions = questions.slice(0, 3)

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome back, {currentUser?.name?.split(" ")[0] || "Teacher"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your classes today.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Questions"
          value={stats.totalQuestions}
          icon={FileCode2}
          trend={{ value: 12, label: "from last month" }}
        />
        <StatsCard
          title="Live Sessions"
          value={stats.totalSessions}
          icon={Radio}
          trend={{ value: 8, label: "from last month" }}
        />
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          trend={{ value: 15, label: "new this month" }}
        />
        <StatsCard
          title="Avg. Pass Rate"
          value={`${stats.averagePassRate}%`}
          icon={TrendingUp}
          trend={{ value: 5, label: "improvement" }}
        />
      </div>

      {/* Quick actions and recent questions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Button asChild className="h-auto flex-col gap-2 py-4">
              <Link href="/teacher/questions/new">
                <Plus className="size-5" />
                <span>Create Question</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-auto flex-col gap-2 py-4">
              <Link href="/teacher/broadcast">
                <Radio className="size-5" />
                <span>Start Broadcast</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <Link href="/teacher/students">
                <Users className="size-5" />
                <span>Manage Students</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <Link href="/teacher/analytics">
                <TrendingUp className="size-5" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent questions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Questions</CardTitle>
              <CardDescription>Your recently created questions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/teacher/questions" className="gap-1">
                View all
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuestions.map((question) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{question.title}</h4>
                      <Badge
                        variant={
                          question.difficulty === "easy"
                            ? "secondary"
                            : question.difficulty === "medium"
                              ? "default"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {question.difficulty}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {Math.floor(question.timeLimit / 60)} min
                      </span>
                      <span>{question.testCases.length} test cases</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/teacher/broadcast?question=${question.id}`}>
                      <Radio className="size-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
