export interface SuperheroMentor {
  id: string
  name: string
  emoji: string
  color: string
  bgColor: string
  greeting: string
  encouragement: string[]
}

export const superheroMentors: SuperheroMentor[] = [
  {
    id: "spiderman",
    name: "Spider-Man",
    emoji: "🕷️",
    color: "text-hero-red",
    bgColor: "bg-red-50",
    greeting: "Hey there, web-slinger!",
    encouragement: [
      "With great code comes great responsibility!",
      "Your spidey-sense for bugs is getting stronger!",
      "Keep swinging through this problem!",
    ],
  },
  {
    id: "ironman",
    name: "Iron Man",
    emoji: "🦾",
    color: "text-hero-gold",
    bgColor: "bg-amber-50",
    greeting: "Welcome to the lab, genius!",
    encouragement: [
      "I am inevitable... and so is your success!",
      "Let's engineer this solution together!",
      "Your brain is sharper than my suit's AI!",
    ],
  },
  {
    id: "thor",
    name: "Thor",
    emoji: "⚡",
    color: "text-hero-blue",
    bgColor: "bg-blue-50",
    greeting: "Greetings, worthy coder!",
    encouragement: [
      "You are worthy of solving this!",
      "Bring the thunder to this problem!",
      "By Odin's beard, you're doing great!",
    ],
  },
  {
    id: "hulk",
    name: "Hulk",
    emoji: "💚",
    color: "text-hero-green",
    bgColor: "bg-green-50",
    greeting: "HULK LIKE YOUR CODE!",
    encouragement: [
      "HULK SMASH... this problem!",
      "Code strong! Debug stronger!",
      "Don't make bugs angry. You won't like them when they're angry!",
    ],
  },
  {
    id: "captain",
    name: "Captain America",
    emoji: "🛡️",
    color: "text-hero-blue",
    bgColor: "bg-sky-50",
    greeting: "Reporting for duty, soldier!",
    encouragement: [
      "I can do this all day... and so can you!",
      "You're a true coding Avenger!",
      "Stay strong and code on!",
    ],
  },
]

export function getRandomMentor(): SuperheroMentor {
  return superheroMentors[Math.floor(Math.random() * superheroMentors.length)]
}

export function getMentorById(id: string): SuperheroMentor {
  return superheroMentors.find((m) => m.id === id) || superheroMentors[0]
}

export interface FriendlyQuestion {
  id: string
  title: string
  mentorId: string
  storyDescription: string
  technicalDescription: string
  examples: { input: string; output: string; explanation?: string }[]
  hints: string[]
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  starterCode: string
}

export const friendlyQuestions: FriendlyQuestion[] = [
  {
    id: "reverse-array",
    title: "Help Spider-Man's Web Robots!",
    mentorId: "spiderman",
    storyDescription:
      "My web robots are standing in a line, but they need to face the other way! Can you help me reverse their order so the last robot becomes the first?",
    technicalDescription:
      "Given an array of numbers, reverse the order so the last element becomes first, second-last becomes second, and so on.",
    examples: [
      {
        input: "[1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]",
        explanation: "The robots were facing right (1→5), now they face left (5→1)!",
      },
      {
        input: "[10, 20]",
        output: "[20, 10]",
        explanation: "Just two robots swapping places!",
      },
    ],
    hints: [
      "Think about what happens when you swap the first and last elements...",
      "You only need to go through half the array!",
      "Try using a 'two pointer' approach - one at start, one at end.",
    ],
    difficulty: "easy",
    tags: ["arrays", "loops"],
    starterCode: `function reverseRobots(robots) {
  // Your code here!
  // Help the robots face the other way
  
}`,
  },
  {
    id: "sum-of-two",
    title: "Iron Man's Reactor Balance!",
    mentorId: "ironman",
    storyDescription:
      "My arc reactor needs exactly a certain power level to work! I have different power cells, and I need to find TWO cells that together give me the exact power I need. Can you find them?",
    technicalDescription:
      "Given an array of numbers and a target sum, find two numbers that add up to the target. Return their positions (indices).",
    examples: [
      {
        input: "cells = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Cell at position 0 (power 2) + Cell at position 1 (power 7) = 9!",
      },
      {
        input: "cells = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "Cell 2 + Cell 4 = 6. Perfect balance!",
      },
    ],
    hints: [
      "For each cell, what power would you need from another cell?",
      "You could check every pair, but there's a smarter way...",
      "What if you remembered which cells you've seen before?",
    ],
    difficulty: "easy",
    tags: ["arrays", "hash-map"],
    starterCode: `function findPowerCells(cells, targetPower) {
  // Your code here!
  // Find two cells that add up to targetPower
  
}`,
  },
  {
    id: "count-characters",
    title: "Thor's Rune Counter!",
    mentorId: "thor",
    storyDescription:
      "I found an ancient scroll with magical runes! I need to count how many times each rune appears. Can you help me decode this mystical message?",
    technicalDescription:
      "Given a string, count how many times each character appears and return the counts as an object.",
    examples: [
      {
        input: '"asgard"',
        output: '{ a: 2, s: 1, g: 1, r: 1, d: 1 }',
        explanation: "The letter 'a' appears twice in 'asgard'!",
      },
      {
        input: '"hello"',
        output: '{ h: 1, e: 1, l: 2, o: 1 }',
        explanation: "The letter 'l' shows up two times!",
      },
    ],
    hints: [
      "You'll need something to store the count of each letter...",
      "An object (or Map) is perfect for this!",
      "Go through each letter and update its count.",
    ],
    difficulty: "easy",
    tags: ["strings", "objects"],
    starterCode: `function countRunes(scroll) {
  // Your code here!
  // Count each character in the scroll
  
}`,
  },
  {
    id: "find-max",
    title: "Hulk's Strongest Number!",
    mentorId: "hulk",
    storyDescription:
      "HULK NEED FIND STRONGEST NUMBER! Which number in this group is the BIGGEST? HULK SMASH small numbers!",
    technicalDescription:
      "Given an array of numbers, find and return the largest number in the array.",
    examples: [
      {
        input: "[3, 1, 4, 1, 5, 9, 2, 6]",
        output: "9",
        explanation: "9 is the STRONGEST! Hulk approves!",
      },
      {
        input: "[-1, -5, -2]",
        output: "-1",
        explanation: "Even negative numbers have a strongest! -1 > -5",
      },
    ],
    hints: [
      "Start by assuming the first number is the strongest...",
      "Then check each other number - is it stronger?",
      "Keep track of the current champion!",
    ],
    difficulty: "easy",
    tags: ["arrays", "loops"],
    starterCode: `function findStrongest(numbers) {
  // Your code here!
  // Find the biggest number
  
}`,
  },
  {
    id: "is-palindrome",
    title: "Captain's Shield Code!",
    mentorId: "captain",
    storyDescription:
      "I have a secret code that reads the same forwards and backwards - like my shield, perfectly balanced! Can you check if a word is this special kind of code?",
    technicalDescription:
      "Check if a string reads the same forwards and backwards (a palindrome). Return true or false.",
    examples: [
      {
        input: '"racecar"',
        output: "true",
        explanation: "racecar → racecaR - Same both ways!",
      },
      {
        input: '"hello"',
        output: "false",
        explanation: "hello → olleH - Different, not a shield code!",
      },
    ],
    hints: [
      "What if you compare the first letter with the last?",
      "Then the second with the second-to-last?",
      "Or... what if you reversed the whole string and compared?",
    ],
    difficulty: "easy",
    tags: ["strings", "loops"],
    starterCode: `function isShieldCode(word) {
  // Your code here!
  // Return true if it's a palindrome
  
}`,
  },
]

export function getQuestionWithMentor(questionId: string) {
  const question = friendlyQuestions.find((q) => q.id === questionId) || friendlyQuestions[0]
  const mentor = getMentorById(question.mentorId)
  return { question, mentor }
}
