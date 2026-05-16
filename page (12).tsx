import { Metadata } from "next"
import { TitleAnalyzer } from "@/title-analyzer"

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

          <h3 className="text-xl font-semibold text-foreground">Why Title Length Matters</h3>
          
          <p className="text-muted-foreground">
            YouTube truncates titles at different lengths depending on the device and context. On mobile search results, titles typically cut off around 60-70 characters. On desktop, you might see up to 100 characters. Our analyzer targets the sweet spot of 60-70 characters to ensure your most important words are always visible, regardless of how the viewer discovers your video.
          </p>

          <h3 className="text-xl font-semibold text-foreground">The Power of Power Words</h3>
          
          <p className="text-muted-foreground">
            Power words are emotionally charged terms that trigger psychological responses in readers. Words like &quot;shocking,&quot; &quot;ultimate,&quot; &quot;revealed,&quot; &quot;secret,&quot; and &quot;proven&quot; create curiosity and urgency. Our tool analyzes your title against a database of 50+ proven power words used by top-performing YouTube videos.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Emotional Triggers and CTR</h3>
          
          <p className="text-muted-foreground">
            Research shows that titles evoking emotions—curiosity, surprise, fear of missing out—consistently outperform neutral titles. The curiosity gap, where you hint at valuable information without fully revealing it, is one of the most effective techniques. However, balance is key: clickbait that doesn&apos;t deliver will hurt your audience retention and channel reputation.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Numbers and Lists in Titles</h3>
          
          <p className="text-muted-foreground">
            Titles containing numbers often perform better because they set clear expectations. &quot;7 Ways to...&quot; tells viewers exactly what they&apos;ll learn. Odd numbers (3, 5, 7) tend to perform slightly better than even numbers. Our analyzer detects numerical patterns and factors them into your virality score.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Front-Loading Important Keywords</h3>
          
          <p className="text-muted-foreground">
            Since titles get truncated on many devices, placing your most important keywords at the beginning ensures they&apos;re always visible. This also helps with YouTube&apos;s search algorithm. Our tool evaluates keyword placement and provides suggestions for optimal positioning.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Testing and Iteration</h3>
          
          <p className="text-muted-foreground">
            Top creators often brainstorm 10-20 title variations before selecting the best one. With YouTube&apos;s built-in A/B testing feature, you can now test multiple titles on the same video. Use our analyzer to score each variation and identify which has the highest virality potential before testing.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Common Title Mistakes to Avoid</h3>
          
          <ul className="text-muted-foreground">
            <li>Writing titles that are too long (important words get cut off)</li>
            <li>Using ALL CAPS excessively (appears spammy)</li>
            <li>Being too vague or generic (doesn&apos;t create curiosity)</li>
            <li>Clickbait that doesn&apos;t match content (hurts retention)</li>
            <li>Ignoring keywords (hurts search discoverability)</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">Title Formulas That Work</h3>
          
          <p className="text-muted-foreground">
            Successful titles often follow proven formulas: &quot;How I [Achievement] in [Timeframe],&quot; &quot;[Number] [Things] That [Benefit],&quot; or &quot;Why [Counterintuitive Statement].&quot; These templates create curiosity while promising value. Our analyzer recognizes these patterns and rewards titles that use them effectively.
          </p>
        </article>
      </section>
    </div>
  )
}
