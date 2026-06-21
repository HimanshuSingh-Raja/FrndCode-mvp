"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import { Plus, Search, Clock, Radio, Edit, Trash2 } from "lucide-react"
import type { Question } from "@/lib/types"

export default function QuestionsPage() {
  const { questions } = useAppStore()
  const [search, setSearch] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Questions</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your coding questions and challenges
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/teacher/questions/new">
            <Plus className="size-4" />
            Create Question
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Questions list */}
      <div className="grid gap-4">
        {filteredQuestions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No questions found</p>
              <Button asChild className="mt-4 bg-transparent" variant="outline">
                <Link href="/teacher/questions/new">Create your first question</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>
    </div>
  )
}

function QuestionCard({ question }: { question: Question }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-lg">{question.title}</CardTitle>
              <Badge
                variant={
                  question.difficulty === "easy"
                    ? "secondary"
                    : question.difficulty === "medium"
                      ? "default"
                      : "destructive"
                }
              >
                {question.difficulty}
              </Badge>
            </div>
            <CardDescription className="mt-2 line-clamp-2">
              {question.description.replace(/`/g, "").replace(/\*\*/g, "").slice(0, 150)}...
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-4" />
              {Math.floor(question.timeLimit / 60)} min
            </span>
            <span>{question.testCases.length} test cases</span>
            <div className="flex gap-1">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="size-4" />
            </Button>
            <Button asChild size="sm" className="gap-1">
              <Link href={`/teacher/broadcast?question=${question.id}`}>
                <Radio className="size-4" />
                Broadcast
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
