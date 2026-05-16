import Link from "next/link"
import { ArrowRight, Image, Type, FileText, Tags, Zap, Shield, Clock, BarChart3, Sparkles, Brain } from "lucide-react"
import { Button } from "@/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/card"

const tools = [
  {
    title: "AI Thumbnail Scanner",
    description: "Upload your thumbnail for AI-powered analysis with regional appeal scores (USA, UK, Global), attention flow charts, and visual quality metrics.",
    icon: Image,
    href: "/tools/thumbnail-checker",
    gradient: "from-[#6366f1]/20 to-[#6366f1]/5",
    badge: "AI Charts",
  },
  {
    title: "AI Viral Title Analyzer",
    description: "Get AI analysis with virality matrix radar charts, score distribution charts, and detailed breakdowns of hook strength, SEO weight, and click probability.",
    icon: Type,
    href: "/tools/title-analyzer",
    gradient: "from-[#a855f7]/20 to-[#a855f7]/5",
    badge: "Radar Chart",
  },
  {
    title: "AI Description & Tag Builder",
    description: "Generate AI-powered, SEO-optimized descriptions, tags, hashtags, and keywords from your video topic in seconds.",
    icon: FileText,
    href: "/tools/description-generator",
    gradient: "from-[#22d3ee]/20 to-[#22d3ee]/5",
    badge: "AI Generated",
  },
  {
    title: "Tag Extractor & Organizer",
    description: "Organize and optimize your video tags for maximum SEO impact. Sort by relevance and export ready-to-paste tags.",
    icon: Tags,
    href: "/tools/tag-extractor",
    gradient: "from-[#f472b6]/20 to-[#f472b6]/5",
    badge: "Free",
  },
]

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Google Gemini AI analyzes your content and provides actionable insights with visual charts.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful radar charts, bar charts, and progress metrics make data easy to understand.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant AI analysis with stunning visualizations in seconds, not minutes.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6366f1]/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#a855f7]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#6366f1]" />
              <span className="text-sm font-medium text-[#6366f1]">Powered by Google Gemini AI</span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              AI-Powered Tools with{" "}
              <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
                Visual Analytics
              </span>
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
              Professional-grade AI tools with stunning visual charts. Analyze thumbnails, 
              titles, and descriptions with radar charts, regional appeal scores, and more. 
              Built for USA and UK creators.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="neon-glow-blue">
                <Link href="/tools/thumbnail-checker">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try AI Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">Learn YouTube SEO</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Tools with Visual Analytics
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every tool features AI analysis with beautiful, interactive charts and graphs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full transition-all duration-300 hover:border-[#6366f1]/50 hover:shadow-lg hover:shadow-[#6366f1]/10 chart-glow border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${tool.gradient}`}>
                      <tool.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="rounded-full bg-[#6366f1]/10 px-3 py-1 text-xs font-medium text-[#6366f1]">
                      {tool.badge}
                    </span>
                  </div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {tool.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20">
                  <feature.icon className="h-7 w-7 text-[#6366f1]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Preview Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Beautiful Visual Analytics
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get AI insights presented in stunning, easy-to-understand charts
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="chart-glow border-border/50 text-center p-6">
            <div className="mx-auto mb-4 h-16 w-16 rounded-lg bg-gradient-to-br from-[#6366f1]/30 to-[#6366f1]/10 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-[#6366f1]" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Regional Appeal Charts</h3>
            <p className="text-sm text-muted-foreground">See engagement predictions for USA, UK, and global audiences</p>
          </Card>
          <Card className="chart-glow border-border/50 text-center p-6">
            <div className="mx-auto mb-4 h-16 w-16 rounded-lg bg-gradient-to-br from-[#a855f7]/30 to-[#a855f7]/10 flex items-center justify-center">
              <svg className="h-8 w-8 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <polygon points="12,2 22,12 12,22 2,12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Virality Matrix Radar</h3>
            <p className="text-sm text-muted-foreground">Multi-dimensional analysis of hook strength, SEO, and CTR</p>
          </Card>
          <Card className="chart-glow border-border/50 text-center p-6">
            <div className="mx-auto mb-4 h-16 w-16 rounded-lg bg-gradient-to-br from-[#22d3ee]/30 to-[#22d3ee]/10 flex items-center justify-center">
              <svg className="h-8 w-8 text-[#22d3ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17l6-6 4 4 8-8" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Attention Flow Lines</h3>
            <p className="text-sm text-muted-foreground">Track predicted viewer interest over time</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#6366f1]/20 via-card to-[#a855f7]/10 p-8 text-center sm:p-12 border border-[#6366f1]/20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Analyze Your Content?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of creators who use CreatorToolbox AI to optimize their content with visual analytics and AI-powered insights.
          </p>
          <Button size="lg" className="mt-8 neon-glow-purple" asChild>
            <Link href="/tools/thumbnail-checker">
              <Sparkles className="mr-2 h-4 w-4" />
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <article className="prose prose-invert mx-auto max-w-none">
            <h2 className="text-2xl font-bold text-foreground">AI-Powered YouTube Optimization with Visual Analytics</h2>
            <p className="text-muted-foreground">
              In today&apos;s competitive YouTube landscape, creating great content is just the beginning. With over 500 hours of video uploaded every minute, standing out requires data-driven optimization of every element—from your thumbnail to your title, description, and tags.
            </p>
            <p className="text-muted-foreground">
              CreatorToolbox AI combines the power of Google Gemini AI with stunning visual analytics. Our tools don&apos;t just tell you what to improve—they show you with interactive charts, regional appeal scores, and multi-dimensional analysis that makes optimization intuitive and actionable.
            </p>
            <h3 className="text-xl font-semibold text-foreground">AI Thumbnail Analysis with Regional Appeal Scores</h3>
            <p className="text-muted-foreground">
              Our AI-powered Thumbnail Scanner analyzes your image and predicts engagement scores for USA, UK, and global audiences. The attention flow chart shows how viewer interest changes over the first 3 seconds, while text readability and contrast balance metrics help you create thumbnails that work at every size.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Viral Title Analysis with Radar Charts</h3>
            <p className="text-muted-foreground">
              The Viral Title Analyzer uses AI to evaluate hook strength, SEO weight, length optimization, and click probability. The virality matrix radar chart provides a visual overview of your title&apos;s strengths and weaknesses, while the doughnut chart breaks down the score distribution across all factors.
            </p>
            <h3 className="text-xl font-semibold text-foreground">AI-Generated Descriptions and Tags</h3>
            <p className="text-muted-foreground">
              Our AI Description & Tag Builder generates complete, SEO-optimized descriptions, relevant tags, hashtags, and keywords from just your video topic. The AI understands context and creates copy-paste ready content that&apos;s designed for maximum discoverability.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
