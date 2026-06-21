"use client"

import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    emoji: "🎮",
    title: "Learn Like a Game",
    description: "Coding feels like playing! Help superheroes, earn points, and level up your skills.",
    color: "from-purple-100 to-pink-100",
  },
  {
    emoji: "🦸",
    title: "Superhero Mentors",
    description: "Spider-Man, Iron Man, Thor - your favorite heroes guide you through each challenge!",
    color: "from-red-100 to-orange-100",
  },
  {
    emoji: "💬",
    title: "Friendly AI Helper",
    description: "Stuck? Our AI tutor explains in simple English or Hindi. No judgement, just help!",
    color: "from-blue-100 to-cyan-100",
  },
  {
    emoji: "⏰",
    title: "No Pressure Timer",
    description: "Practice at your own pace. Live sessions have gentle timers that motivate, not stress.",
    color: "from-green-100 to-emerald-100",
  },
  {
    emoji: "🌟",
    title: "Instant Celebrations",
    description: "Every correct answer gets a celebration! Watch your streak grow and feel proud.",
    color: "from-yellow-100 to-amber-100",
  },
  {
    emoji: "📊",
    title: "Track Your Journey",
    description: "See how far you've come! Beautiful progress charts show your coding adventure.",
    color: "from-indigo-100 to-violet-100",
  },
  {
    emoji: "🎯",
    title: "Perfect for Beginners",
    description: "Questions start easy and grow with you. Never feel lost or overwhelmed.",
    color: "from-teal-100 to-cyan-100",
  },
  {
    emoji: "🤝",
    title: "Teachers & Students",
    description: "Teachers broadcast live challenges. Students solve together in real-time!",
    color: "from-rose-100 to-pink-100",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-gradient-to-b from-background to-primary/5 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Why Students <span className="text-primary">Love</span> FrndCode ❤️
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {"We made coding feel safe, fun, and exciting. Here's how!"}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={`group cursor-default overflow-hidden rounded-2xl border-2 border-primary/10 bg-gradient-to-br ${feature.color} transition-all hover:scale-[1.02] hover:shadow-lg`}
            >
              <CardContent className="p-6">
                <span className="mb-4 block text-4xl transition-transform group-hover:scale-110">
                  {feature.emoji}
                </span>
                <h3 className="mb-2 font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
