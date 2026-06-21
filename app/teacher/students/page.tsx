"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockStudents, mockSubmissions } from "@/lib/mock-data"
import { Search, UserPlus, Mail, TrendingUp, CheckCircle } from "lucide-react"

export default function StudentsPage() {
  const [search, setSearch] = useState("")

  const filteredStudents = mockStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  // Calculate stats for each student
  const getStudentStats = (studentId: string) => {
    const studentSubmissions = mockSubmissions.filter((s) => s.studentId === studentId)
    const passed = studentSubmissions.filter((s) => s.status === "passed").length
    const total = studentSubmissions.length
    return {
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
      totalSubmissions: total,
      passed,
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track your students&apos; progress
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="size-4" />
          Invite Students
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Students grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const stats = getStudentStats(student.id)
          return (
            <Card key={student.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-base">{student.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Mail className="size-3" />
                      {student.email}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-3">
                  <div className="text-center">
                    <p className="text-lg font-semibold">{stats.totalSubmissions}</p>
                    <p className="text-xs text-muted-foreground">Submissions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-success">{stats.passed}</p>
                    <p className="text-xs text-muted-foreground">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">{stats.passRate}%</p>
                    <p className="text-xs text-muted-foreground">Pass Rate</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge
                    variant={stats.passRate >= 70 ? "secondary" : "outline"}
                    className={stats.passRate >= 70 ? "bg-success/10 text-success" : ""}
                  >
                    {stats.passRate >= 70 ? (
                      <>
                        <TrendingUp className="mr-1 size-3" />
                        Strong
                      </>
                    ) : stats.passRate >= 50 ? (
                      "Improving"
                    ) : (
                      "Needs Help"
                    )}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No students found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
