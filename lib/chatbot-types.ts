export type Language = "en" | "hi"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  language: Language
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  lastMessageAt: Date
}

export const CODE_REQUEST_PATTERNS = [
  "give code",
  "write code",
  "show code",
  "provide code",
  "code de do",
  "code batao",
  "code dikha",
  "solution de",
  "solution batao",
  "write solution",
  "give solution",
  "logic batao",
  "logic de",
  "answer de",
  "answer batao",
  "solve karo",
  "solve it",
  "implement",
  "implementation",
]

export const POLITE_REFUSAL_EN = "I can help you understand the question, not solve it. Let me explain what the question is asking instead!"

export const POLITE_REFUSAL_HI = "Main aapko question samjhane mein madad kar sakta hoon, solution dene mein nahi. Chaliye main question explain karta hoon!"

export interface ExplanationStructure {
  simpleExplanation: string
  inputOutputClarification: string
  constraintsExplained: string
  commonConfusions: string
  realLifeExample: string
}
