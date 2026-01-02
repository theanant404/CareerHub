"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-3 py-1 bg-foreground/10 text-foreground rounded-full text-sm font-medium flex items-center gap-2 glassmorphic scale-in">
          <Sparkles className="w-4 h-4" />
          500+ new opportunities posted daily
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-pretty slide-up">
          Find jobs, scholarships & internships
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed slide-up">
          Discover thousands of opportunities tailored to your skills. Get matched with roles, funding, and internships
          that fit your career goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-up">
          <Link href="/signup">
            <Button size="lg" className="glassmorphic-button-primary text-foreground w-full sm:w-auto">
              Start Your Search
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="glassmorphic w-full sm:w-auto">
            Watch Tutorial
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">Free to use. Sign up in 2 minutes.</p>
      </div>

      <div className="absolute top-0 right-0 w-80 h-80 bg-foreground/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-foreground/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}
