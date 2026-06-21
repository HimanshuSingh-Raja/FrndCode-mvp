"use client"

import { create } from "zustand"
import type { User, Question, LiveSession, Submission } from "./types"
import { mockTeacher, mockStudent, mockQuestions, mockSubmissions } from "./mock-data"

interface AppState {
  // Auth state
  currentUser: User | null
  isAuthenticated: boolean
  
  // Questions
  questions: Question[]
  
  // Live session
  activeSession: LiveSession | null
  submissions: Submission[]
  
  // Actions
  login: (user: User) => void
  logout: () => void
  setQuestions: (questions: Question[]) => void
  addQuestion: (question: Question) => void
  setActiveSession: (session: LiveSession | null) => void
  addSubmission: (submission: Submission) => void
  updateSubmission: (id: string, updates: Partial<Submission>) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  questions: mockQuestions,
  activeSession: null,
  submissions: mockSubmissions,
  
  login: (user) => set({ currentUser: user, isAuthenticated: true }),
  logout: () => set({ currentUser: null, isAuthenticated: false }),
  setQuestions: (questions) => set({ questions }),
  addQuestion: (question) => set((state) => ({ questions: [...state.questions, question] })),
  setActiveSession: (session) => set({ activeSession: session }),
  addSubmission: (submission) => set((state) => ({ submissions: [...state.submissions, submission] })),
  updateSubmission: (id, updates) =>
    set((state) => ({
      submissions: state.submissions.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
}))

// Demo login helpers
export const loginAsTeacher = () => {
  useAppStore.getState().login(mockTeacher)
}

export const loginAsStudent = () => {
  useAppStore.getState().login(mockStudent)
}
