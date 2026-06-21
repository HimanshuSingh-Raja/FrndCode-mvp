import type { Question, User, LiveSession, Submission, StudentStats, TeacherStats } from "./types"

export const mockTeacher: User = {
  id: "teacher-1",
  name: "Dr. Sarah Chen",
  email: "sarah.chen@university.edu",
  role: "teacher",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
}

export const mockStudent: User = {
  id: "student-1",
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  role: "student",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
}

export const mockQuestions: Question[] = [
  {
    id: "q-1",
    title: "Two Sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example:**
\`\`\`
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\``,
    difficulty: "easy",
    timeLimit: 900,
    testCases: [
      { id: "tc-1", input: "[2,7,11,15], 9", expectedOutput: "[0,1]", isHidden: false },
      { id: "tc-2", input: "[3,2,4], 6", expectedOutput: "[1,2]", isHidden: false },
      { id: "tc-3", input: "[3,3], 6", expectedOutput: "[0,1]", isHidden: true },
    ],
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    tags: ["array", "hash-table"],
    createdBy: "teacher-1",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "q-2",
    title: "Valid Parentheses",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example:**
\`\`\`
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false
\`\`\``,
    difficulty: "easy",
    timeLimit: 600,
    testCases: [
      { id: "tc-4", input: '"()"', expectedOutput: "true", isHidden: false },
      { id: "tc-5", input: '"()[]{}"', expectedOutput: "true", isHidden: false },
      { id: "tc-6", input: '"(]"', expectedOutput: "false", isHidden: true },
    ],
    starterCode: `function isValid(s) {
  // Your code here
  
}`,
    tags: ["string", "stack"],
    createdBy: "teacher-1",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "q-3",
    title: "Reverse Linked List",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\``,
    difficulty: "medium",
    timeLimit: 1200,
    testCases: [
      { id: "tc-7", input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isHidden: false },
      { id: "tc-8", input: "[1,2]", expectedOutput: "[2,1]", isHidden: false },
      { id: "tc-9", input: "[]", expectedOutput: "[]", isHidden: true },
    ],
    starterCode: `function reverseList(head) {
  // Your code here
  
}`,
    tags: ["linked-list", "recursion"],
    createdBy: "teacher-1",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "q-4",
    title: "Binary Tree Level Order Traversal",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
\`\`\``,
    difficulty: "medium",
    timeLimit: 1500,
    testCases: [
      { id: "tc-10", input: "[3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]", isHidden: false },
      { id: "tc-11", input: "[1]", expectedOutput: "[[1]]", isHidden: false },
      { id: "tc-12", input: "[]", expectedOutput: "[]", isHidden: true },
    ],
    starterCode: `function levelOrder(root) {
  // Your code here
  
}`,
    tags: ["tree", "bfs"],
    createdBy: "teacher-1",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "q-5",
    title: "Longest Palindromic Substring",
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

**Example:**
\`\`\`
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Input: s = "cbbd"
Output: "bb"
\`\`\``,
    difficulty: "hard",
    timeLimit: 1800,
    testCases: [
      { id: "tc-13", input: '"babad"', expectedOutput: '"bab"', isHidden: false },
      { id: "tc-14", input: '"cbbd"', expectedOutput: '"bb"', isHidden: false },
      { id: "tc-15", input: '"a"', expectedOutput: '"a"', isHidden: true },
    ],
    starterCode: `function longestPalindrome(s) {
  // Your code here
  
}`,
    tags: ["string", "dynamic-programming"],
    createdBy: "teacher-1",
    createdAt: new Date("2024-02-15"),
  },
]

export const mockLiveSession: LiveSession = {
  id: "session-1",
  questionId: "q-1",
  teacherId: "teacher-1",
  startedAt: new Date(),
  endsAt: new Date(Date.now() + 900000),
  status: "active",
  participants: ["student-1", "student-2", "student-3"],
}

export const mockSubmissions: Submission[] = [
  {
    id: "sub-1",
    sessionId: "session-1",
    studentId: "student-1",
    questionId: "q-1",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    language: "javascript",
    status: "passed",
    testResults: [
      { testCaseId: "tc-1", passed: true, executionTime: 2 },
      { testCaseId: "tc-2", passed: true, executionTime: 1 },
      { testCaseId: "tc-3", passed: true, executionTime: 1 },
    ],
    executionTime: 4,
    submittedAt: new Date(Date.now() - 300000),
  },
  {
    id: "sub-2",
    sessionId: "session-1",
    studentId: "student-2",
    questionId: "q-1",
    code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}`,
    language: "javascript",
    status: "passed",
    testResults: [
      { testCaseId: "tc-1", passed: true, executionTime: 5 },
      { testCaseId: "tc-2", passed: true, executionTime: 3 },
      { testCaseId: "tc-3", passed: true, executionTime: 2 },
    ],
    executionTime: 10,
    submittedAt: new Date(Date.now() - 180000),
  },
  {
    id: "sub-3",
    sessionId: "session-1",
    studentId: "student-3",
    questionId: "q-1",
    code: `function twoSum(nums, target) {
  // incomplete
}`,
    language: "javascript",
    status: "failed",
    testResults: [
      { testCaseId: "tc-1", passed: false, error: "Expected [0,1] but got undefined" },
      { testCaseId: "tc-2", passed: false, error: "Expected [1,2] but got undefined" },
      { testCaseId: "tc-3", passed: false, error: "Expected [0,1] but got undefined" },
    ],
    submittedAt: new Date(Date.now() - 60000),
  },
]

export const mockStudentStats: StudentStats = {
  totalSubmissions: 45,
  passedSubmissions: 38,
  averageTime: 420,
  questionsAttempted: 23,
  streakDays: 7,
}

export const mockTeacherStats: TeacherStats = {
  totalQuestions: 15,
  totalSessions: 32,
  totalStudents: 128,
  averagePassRate: 72,
}

export const mockStudents: User[] = [
  { id: "student-1", name: "Alex Johnson", email: "alex@student.edu", role: "student", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
  { id: "student-2", name: "Maya Patel", email: "maya@student.edu", role: "student", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya" },
  { id: "student-3", name: "Ryan Kim", email: "ryan@student.edu", role: "student", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan" },
  { id: "student-4", name: "Emily Chen", email: "emily@student.edu", role: "student", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily" },
  { id: "student-5", name: "Jordan Lee", email: "jordan@student.edu", role: "student", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan" },
]
