"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Sparkles, Heart, Star, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 sm:py-32">
      {/* Fun floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] text-4xl animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>🕷️</div>
        <div className="absolute top-32 right-[15%] text-4xl animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}>🦾</div>
        <div className="absolute top-60 left-[20%] text-4xl animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }}>⚡</div>
        <div className="absolute top-40 right-[25%] text-4xl animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "3.2s" }}>💚</div>
        <div className="absolute top-72 right-[10%] text-4xl animate-bounce" style={{ animationDelay: "2s", animationDuration: "3.8s" }}>🛡️</div>
        
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6 gap-2 rounded-full bg-primary/20 py-2 pl-3 pr-4 text-primary">
            <Sparkles className="size-4" />
            <span className="font-medium">{"Learn Coding Like a Game!"}</span>
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Coding is Fun,
            <span className="mt-2 block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Not Scary! ✨
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            FrndCode turns boring coding lessons into exciting adventures! 
            Help superheroes solve puzzles, get friendly AI hints, and learn at your own pace. 
            <span className="font-medium text-foreground"> Perfect for beginners!</span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full gap-2 rounded-full text-lg sm:w-auto">
              <Link href="/login?role=student">
                <Play className="size-5" />
                Start Playing Free!
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full gap-2 rounded-full border-2 border-primary/30 bg-transparent text-lg sm:w-auto">
              <Link href="/login?role=teacher">
                <Heart className="size-5" />
                {"I'm a Teacher"}
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="size-4 text-primary" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="size-4 text-primary" />
              <span>Always free</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="size-4 text-accent" />
              <span>Made with love</span>
            </div>
          </div>
        </div>

        {/* Playful code preview */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-card shadow-2xl">
            {/* Editor header */}
            <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">🔴 LIVE</span>
                <span className="text-muted-foreground">Help Spider-Man!</span>
              </div>
              <Badge className="rounded-full bg-primary/20 text-primary">JavaScript</Badge>
            </div>

            {/* Editor content */}
            <div className="grid lg:grid-cols-2">
              {/* Problem description - Superhero style */}
              <div className="border-b bg-gradient-to-br from-red-50 to-orange-50 p-6 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-4xl">🕷️</span>
                  <div>
                    <h3 className="font-bold text-red-600">Spider-Man</h3>
                    <p className="text-xs text-muted-foreground">Needs your help!</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-card/80 p-4 shadow-inner">
                  <p className="text-base leading-relaxed">
                    {"\"Hey there! My web robots are standing in a line, but they need to face the other way! Can you help me reverse their order?\""}
                  </p>
                </div>
                <div className="mt-4 rounded-xl bg-card p-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Example:</p>
                  <code className="text-sm">
                    [1, 2, 3, 4, 5] → [5, 4, 3, 2, 1]
                  </code>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {"💡 The robots were facing right, now they face left!"}
                  </p>
                </div>
              </div>

              {/* Code editor - Light friendly theme */}
              <div className="bg-card p-6">
                <div className="rounded-2xl bg-muted/50 p-4 font-mono text-sm">
                  <pre className="text-foreground">
                    <span className="text-accent">function</span>{" "}
                    <span className="text-primary">reverseRobots</span>
                    <span className="text-muted-foreground">(</span>robots
                    <span className="text-muted-foreground">)</span>{" "}
                    <span className="text-muted-foreground">{"{"}</span>
                    {"\n"}  <span className="text-muted-foreground">{"// Your code here!"}</span>
                    {"\n"}  <span className="text-muted-foreground">{"// Help the robots 🤖"}</span>
                    {"\n"}  {"\n"}
                    <span className="text-muted-foreground">{"}"}</span>
                  </pre>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm" className="gap-2 rounded-full border-2 bg-transparent">
                    <Sparkles className="size-4" />
                    Get Hint
                  </Button>
                  <Button size="sm" className="gap-2 rounded-full">
                    <Play className="size-4" />
                    Run Code
                  </Button>
                </div>
              </div>
            </div>

            {/* Editor footer */}
            <div className="flex items-center justify-between border-t bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <span className="text-sm font-medium text-green-600">3 students helped Spider-Man today!</span>
              </div>
              <Button className="gap-2 rounded-full">
                <Heart className="size-4" />
                Submit Solution
              </Button>
            </div>
          </div>

          {/* Fun floating badges */}
          <div className="absolute -left-4 top-1/4 hidden rotate-[-8deg] rounded-2xl bg-card px-4 py-2 shadow-lg lg:block">
            <span className="text-sm font-medium">No pressure! 😊</span>
          </div>
          <div className="absolute -right-4 top-1/3 hidden rotate-[8deg] rounded-2xl bg-card px-4 py-2 shadow-lg lg:block">
            <span className="text-sm font-medium">Learn by playing! 🎮</span>
          </div>
        </div>
      </div>
    </section>
  )
}
