"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/stats-card"
import { mockTeacherStats, mockQuestions, mockSubmissions, mockStudents } from "@/lib/mock-data"
import {
  BarChart3,
  TrendingUp,
  Users,
  FileCode2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AnalyticsPage() {
  const stats = mockTeacherStats
  const passedSubmissions = mockSubmissions.filter((s) => s.status === "passed").length
  const totalSubmissions = mockSubmissions.length

  // Calculate difficulty distribution
  const difficultyStats = {
    easy: mockQuestions.filter((q) => q.difficulty === "easy").length,
    medium: mockQuestions.filter((q) => q.difficulty === "medium").length,
    hard: mockQuestions.filter((q) => q.difficulty === "hard").length,
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Track performance and insights across your classes
        </p>
      </div>

      {/* Overview stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Sessions"
          value={stats.totalSessions}
          icon={BarChart3}
          trend={{ value: 12, label: "this month" }}
        />
        <StatsCard
          title="Avg. Pass Rate"
          value={`${Math.round((passedSubmissions / totalSubmissions) * 100)}%`}
          icon={TrendingUp}
          trend={{ value: 5, label: "vs last month" }}
        />
        <StatsCard
          title="Active Students"
          value={mockStudents.length}
          icon={Users}
          description="In the last 7 days"
        />
        <StatsCard
          title="Questions Created"
          value={mockQuestions.length}
          icon={FileCode2}
          trend={{ value: 3, label: "new this week" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Question difficulty breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Question Difficulty</CardTitle>
            <CardDescription>Distribution of questions by difficulty level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-chart-2" />
                  <span>Easy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{difficultyStats.easy}</span>
                  <span className="text-muted-foreground text-sm">
                    ({Math.round((difficultyStats.easy / mockQuestions.length) * 100)}%)
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-chart-2 rounded-full"
                  style={{ width: `${(difficultyStats.easy / mockQuestions.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-chart-1" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{difficultyStats.medium}</span>
                  <span className="text-muted-foreground text-sm">
                    ({Math.round((difficultyStats.medium / mockQuestions.length) * 100)}%)
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-chart-1 rounded-full"
                  style={{ width: `${(difficultyStats.medium / mockQuestions.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-destructive" />
                  <span>Hard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{difficultyStats.hard}</span>
                  <span className="text-muted-foreground text-sm">
                    ({Math.round((difficultyStats.hard / mockQuestions.length) * 100)}%)
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-destructive rounded-full"
                  style={{ width: `${(difficultyStats.hard / mockQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest student attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSubmissions.slice(0, 5).map((submission) => {
                const student = mockStudents.find((s) => s.id === submission.studentId)
                const question = mockQuestions.find((q) => q.id === submission.questionId)
                return (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{student?.name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{question?.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {submission.status === "passed" ? (
                        <Badge className="gap-1 bg-success text-success-foreground">
                          <CheckCircle className="size-3" />
                          Passed
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <XCircle className="size-3" />
                          Failed
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top performing students */}
        <Card>
          <CardHeader>
            <CardTitle>Top Students</CardTitle>
            <CardDescription>Based on submission success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockStudents.slice(0, 5).map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm">{student.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{85 - index * 5}%</span>
                    <span className="text-xs text-muted-foreground">pass rate</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Session activity */}
        <Card>
          <CardHeader>
            <CardTitle>Session Activity</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-32">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                const height = [60, 80, 45, 90, 75, 30, 50][index]
                return (
                  <div key={day} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-sm bg-primary transition-all"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{day}</span>
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
