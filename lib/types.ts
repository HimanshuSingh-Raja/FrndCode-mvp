export type UserRole = "teacher" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Question {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit: number // in seconds
  testCases: TestCase[]
  starterCode: string
  solution?: string
  tags: string[]
  createdBy: string
  createdAt: Date
}

export interface TestCase {
  id: string
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface LiveSession {
  id: string
  questionId: string
  teacherId: string
  startedAt: Date
  endsAt: Date
  status: "waiting" | "active" | "ended"
  participants: string[]
}

export interface Submission {
  id: string
  sessionId: string
  studentId: string
  questionId: string
  code: string
  language: string
  status: "pending" | "running" | "passed" | "failed" | "error"
  testResults: TestResult[]
  executionTime?: number
  submittedAt: Date
}

export interface TestResult {
  testCaseId: string
  passed: boolean
  actualOutput?: string
  error?: string
  executionTime?: number
}

export interface StudentStats {
  totalSubmissions: number
  passedSubmissions: number
  averageTime: number
  questionsAttempted: number
  streakDays: number
}

export interface TeacherStats {
  totalQuestions: number
  totalSessions: number
  totalStudents: number
  averagePassRate: number
}
