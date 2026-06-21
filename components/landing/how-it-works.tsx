"use client"

import { Badge } from "@/components/ui/badge"

const steps = [
  {
    step: "01",
    title: "Create Your Question",
    description: "Teachers write coding problems with descriptions, test cases, and time limits. Add starter code and set difficulty levels.",
    forTeacher: true,
  },
  {
    step: "02",
    title: "Broadcast to Students",
    description: "With one click, broadcast the question to all connected students. They receive it instantly on their devices.",
    forTeacher: true,
  },
  {
    step: "03",
    title: "Solve in Real-Time",
    description: "Students write code in the browser-based editor with syntax highlighting and auto-completion. Request AI hints if stuck.",
    forStudent: true,
  },
  {
    step: "04",
    title: "Submit & Get Feedback",
    description: "Submit solutions to run against test cases. See instant results and learn from mistakes with detailed feedback.",
    forStudent: true,
  },
  {
    step: "05",
    title: "Review & Analyze",
    description: "Teachers see all submissions in real-time. Review code, identify common mistakes, and provide targeted guidance.",
    forTeacher: true,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Simple workflow, powerful results
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Get started in minutes. No complex setup required.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-border lg:left-1/2 lg:block lg:-translate-x-1/2" />

            <div className="space-y-12">
              {steps.map((item, index) => (
                <div
                  key={item.step}
                  className={`relative flex flex-col gap-6 lg:flex-row lg:items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Step number */}
                  <div className="absolute left-0 flex size-16 items-center justify-center rounded-full border-4 border-background bg-primary text-xl font-bold text-primary-foreground lg:left-1/2 lg:-translate-x-1/2">
                    {item.step}
                  </div>

                  {/* Content */}
                  <div className={`ml-24 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <div className="mb-2 flex items-center gap-2 lg:justify-start">
                      {index % 2 === 0 && <div className="hidden flex-1 lg:block" />}
                      <Badge variant={item.forTeacher ? "default" : "secondary"}>
                        {item.forTeacher ? "Teacher" : "Student"}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
