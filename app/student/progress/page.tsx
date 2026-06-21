"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/stats-card"
import { mockStudentStats, mockQuestions, mockSubmissions } from "@/lib/mock-data"
import {
  Trophy,
  Target,
  Clock,
  Flame,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react"

export default function ProgressPage() {
  const stats = mockStudentStats
  const studentSubmissions = mockSubmissions.filter((s) => s.studentId === "student-1")

  // Calculate category progress
  const categories = [
    { name: "Array", solved: 5, total: 12 },
    { name: "String", solved: 3, total: 8 },
    { name: "Linked List", solved: 2, total: 6 },
    { name: "Tree", solved: 1, total: 10 },
    { name: "Dynamic Programming", solved: 0, total: 15 },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Your Progress</h1>
        <p className="mt-1 text-muted-foreground">
          Track your coding journey and achievements
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Solved"
          value={stats.passedSubmissions}
          icon={Trophy}
          trend={{ value: 12, label: "this month" }}
        />
        <StatsCard
          title="Success Rate"
          value={`${Math.round((stats.passedSubmissions / stats.totalSubmissions) * 100)}%`}
          icon={Target}
          trend={{ value: 5, label: "improvement" }}
        />
        <StatsCard
          title="Avg. Time"
          value={`${Math.floor(stats.averageTime / 60)}m`}
          icon={Clock}
          description="Per problem"
        />
        <StatsCard
          title="Streak"
          value={`${stats.streakDays} days`}
          icon={Flame}
          description="Keep it going!"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress by Category</CardTitle>
            <CardDescription>Your performance across different topics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((cat) => {
              const percentage = Math.round((cat.solved / cat.total) * 100)
              return (
                <div key={cat.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">{cat.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {cat.solved}/{cat.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Difficulty breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Difficulty Breakdown</CardTitle>
            <CardDescription>Problems solved by difficulty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-success">12</div>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Easy
                </Badge>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-primary">8</div>
                <Badge>Medium</Badge>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-destructive">3</div>
                <Badge variant="destructive">Hard</Badge>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Progress</span>
                <span className="font-medium">23 / 100</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                <div className="h-full bg-success" style={{ width: "12%" }} />
                <div className="h-full bg-primary" style={{ width: "8%" }} />
                <div className="h-full bg-destructive" style={{ width: "3%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission history */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Submission History</CardTitle>
            <CardDescription>Your recent coding attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentSubmissions.length > 0 ? (
                studentSubmissions.map((submission) => {
                  const question = mockQuestions.find((q) => q.id === submission.questionId)
                  return (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        {submission.status === "passed" ? (
                          <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
                            <CheckCircle className="size-5 text-success" />
                          </div>
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
                            <XCircle className="size-5 text-destructive" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium">{question?.title || "Unknown"}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(submission.submittedAt).toLocaleDateString()} at{" "}
                            {new Date(submission.submittedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {submission.executionTime && (
                          <span className="text-sm text-muted-foreground">
                            {submission.executionTime}ms
                          </span>
                        )}
                        <Badge
                          variant={
                            question?.difficulty === "easy"
                              ? "secondary"
                              : question?.difficulty === "medium"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {question?.difficulty}
                        </Badge>
                        <Badge
                          variant={submission.status === "passed" ? "outline" : "destructive"}
                          className={submission.status === "passed" ? "border-success text-success" : ""}
                        >
                          {submission.status === "passed" ? "Accepted" : "Failed"}
                        </Badge>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  No submissions yet. Start practicing!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
