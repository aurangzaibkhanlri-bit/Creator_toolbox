import { Metadata } from "next"
import { TitleAnalyzer } from "@/components/title-analyzer"

export const metadata: Metadata = {
  title: "AI Viral Title Analyzer with Score Charts - CreatorToolbox AI",
  description: "AI-powered YouTube title analyzer with virality matrix radar chart, score distribution doughnut chart, and detailed breakdown of hook strength, SEO weight, and click probability.",
  keywords: "YouTube title analyzer, viral title, AI title analysis, CTR optimization, power words, virality matrix, radar chart",
}

export default function TitleAnalyzerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          AI Viral Title Analyzer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Get AI-powered analysis with virality matrix radar charts, score breakdowns, 
          and detailed insights on hook strength, SEO weight, and click probability.
        </p>
      </div>

      <TitleAnalyzer />

      {/* Educational Content for AdSense */}
      <section className="mt-16 border-t border-border pt-12">
        <article className="prose prose-invert mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">The Science of Viral YouTube Titles</h2>
          
          <p className="text-muted-foreground">
            Your video title is one of the three critical factors (along with thumbnail and topic) that determine whether someone clicks on your video. In an ocean of content, a compelling title can mean the difference between viral success and obscurity. Understanding the psychology behind click-worthy titles is essential for any serious YouTube creator.
          </p>
        </article>
      </section>
    </div>
  )
}
