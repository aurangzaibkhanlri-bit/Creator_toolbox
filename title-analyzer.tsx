"use client"

import { useState } from "react"
import { Sparkles, AlertCircle, CheckCircle2, TrendingUp, Hash, Zap, Copy, Check, Brain, Search, Target, MousePointer } from "lucide-react"
import { Button } from "@/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/card"
import { Input } from "@/input"
import { Badge } from "@/badge"
import { Skeleton } from "@/skeleton"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { analyzeTitle, type TitleAnalysis } from "@/gemini"

const POWER_WORDS = [
  "shocking", "ultimate", "revealed", "secret", "proven", "amazing", "incredible", "unbelievable",
  "exclusive", "breaking", "urgent", "warning", "exposed", "hidden", "powerful", "massive",
  "insane", "crazy", "epic", "legendary", "game-changing", "life-changing", "mind-blowing",
  "stunning", "explosive", "controversial", "banned", "forbidden", "untold", "mysterious",
  "instant", "quick", "fast", "easy", "simple", "free", "guaranteed", "effective",
  "best", "worst", "first", "last", "new", "complete", "essential", "critical",
  "truth", "real", "actual", "honest", "raw", "brutal"
]

function getScoreColor(score: number): string {
  if (score >= 80) return "text-[#22d3ee]"
  if (score >= 60) return "text-[#6366f1]"
  if (score >= 40) return "text-[#fbbf24]"
  return "text-[#f87171]"
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  if (score >= 40) return "Average"
  return "Needs Work"
}

export function TitleAnalyzer() {
  const [title, setTitle] = useState("")
  const [copied, setCopied] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<TitleAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!title.trim()) return
    
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const result = await analyzeTitle(title)
      setAnalysis(result)
    } catch (err) {
      setError("Failed to analyze title. Please try again.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(title)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const radarData = analysis ? [
    { metric: "Hook", value: analysis.hookStrength, fullMark: 100 },
    { metric: "SEO", value: analysis.seoWeight, fullMark: 100 },
    { metric: "Length", value: analysis.lengthOptimization, fullMark: 100 },
    { metric: "CTR", value: analysis.clickProbability, fullMark: 100 },
  ] : []

  const pieData = analysis ? [
    { name: "Hook Strength", value: analysis.hookStrength, color: "#6366f1" },
    { name: "SEO Weight", value: analysis.seoWeight, color: "#a855f7" },
    { name: "Length Opt.", value: analysis.lengthOptimization, color: "#22d3ee" },
    { name: "Click Prob.", value: analysis.clickProbability, color: "#f472b6" },
  ] : []

  return (
    <div className="space-y-8">
      {/* Input Area */}
      <Card className="chart-glow border-border/50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your YouTube video title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-14 text-lg pr-24"
                maxLength={150}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className={`text-sm ${title.length > 70 ? "text-yellow-500" : "text-muted-foreground"}`}>
                  {title.length}/70
                </span>
                {title && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Tip: Aim for 50-70 characters for optimal display across all devices.
              </p>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !title.trim()}
                className="neon-glow-blue"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
          <Card className="chart-glow border-border/50">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && !isAnalyzing && (
        <div className="space-y-6 animate-chart-in">
          {/* Overall Score */}
          <Card className="chart-glow border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#6366f1]" />
                Overall Virality Score
              </CardTitle>
              <CardDescription>AI-powered analysis of your title&apos;s viral potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative h-40 w-40 flex-shrink-0">
                  <svg className="h-40 w-40 -rotate-90 transform">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-secondary"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#scoreGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(analysis.overallScore / 100) * 440} 440`}
                      strokeLinecap="round"
                      style={{ filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-medium">{getScoreLabel(analysis.overallScore)}</span>
                    <Badge 
                      variant={analysis.overallScore >= 60 ? "default" : "secondary"}
                      className={analysis.overallScore >= 60 ? "neon-glow-purple" : ""}
                    >
                      {analysis.overallScore >= 60 ? "High Potential" : "Needs Improvement"}
                    </Badge>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Brain className="h-5 w-5 text-[#6366f1]" />
                      <div>
                        <p className="text-xs text-muted-foreground">Hook Strength</p>
                        <p className="font-semibold">{analysis.hookStrength}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Search className="h-5 w-5 text-[#a855f7]" />
                      <div>
                        <p className="text-xs text-muted-foreground">SEO Weight</p>
                        <p className="font-semibold">{analysis.seoWeight}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Target className="h-5 w-5 text-[#22d3ee]" />
                      <div>
                        <p className="text-xs text-muted-foreground">Length Opt.</p>
                        <p className="font-semibold">{analysis.lengthOptimization}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <MousePointer className="h-5 w-5 text-[#f472b6]" />
                      <div>
                        <p className="text-xs text-muted-foreground">Click Probability</p>
                        <p className="font-semibold">{analysis.clickProbability}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Radar Chart */}
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-[#6366f1]" />
                  Virality Matrix (Radar)
                </CardTitle>
                <CardDescription>
                  Multi-dimensional analysis of title effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="metric" 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.3}
                        strokeWidth={2}
                        style={{ filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        formatter={(value: number) => [`${value}%`, "Score"]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Doughnut Chart */}
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-[#a855f7]" />
                  Score Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of virality factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            style={{ filter: `drop-shadow(0 0 6px ${entry.color}80)` }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        formatter={(value: number) => [`${value}%`, "Score"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Emotional Hook */}
            <Card className="chart-glow border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-4 w-4 text-[#6366f1]" />
                  Emotional Hook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysis.emotionalHook}
                </p>
              </CardContent>
            </Card>

            {/* Search Optimization */}
            <Card className="chart-glow border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Search className="h-4 w-4 text-[#a855f7]" />
                  Search Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysis.searchOptimization}
                </p>
              </CardContent>
            </Card>

            {/* Clarity */}
            <Card className="chart-glow border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4 text-[#22d3ee]" />
                  Clarity Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysis.clarity}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <Card className="chart-glow border-[#fbbf24]/30 bg-[#fbbf24]/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertCircle className="h-4 w-4 text-[#fbbf24]" />
                  AI Suggestions for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Power Words Reference */}
          <Card className="chart-glow border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Hash className="h-4 w-4 text-[#f472b6]" />
                Power Words Reference
              </CardTitle>
              <CardDescription>Click to add to your title</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {POWER_WORDS.slice(0, 30).map((word) => (
                  <Badge
                    key={word}
                    variant="outline"
                    className="cursor-pointer capitalize transition-all hover:bg-primary hover:text-primary-foreground hover:neon-glow-purple"
                    onClick={() => {
                      if (!title.toLowerCase().includes(word)) {
                        setTitle((prev) => prev + " " + word.charAt(0).toUpperCase() + word.slice(1))
                      }
                    }}
                  >
                    {word}
                  </Badge>
                ))}
                <span className="text-sm text-muted-foreground flex items-center">+{POWER_WORDS.length - 30} more</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
