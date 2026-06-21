"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-16 sm:py-24">
          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 size-60 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to transform your coding classes?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
              Join thousands of teachers and students already using FrndCode for interactive coding education.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild className="w-full gap-2 sm:w-auto">
                <Link href="/login">
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
