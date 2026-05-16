"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Download, RotateCcw, Eye, EyeOff, AlertCircle, Clock, Play, Sparkles, CheckCircle2, TrendingUp, Globe, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/card"
import { Input } from "@/components/input"
import { Switch } from "@/components/switch"
import { Label } from "@/components/label"
import { Skeleton } from "@/components/skeleton"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { analyzeThumbnail, type ThumbnailAnalysis } from "@/gemini"

export function ThumbnailChecker() {
  const [image, setImage] = useState<string | null>(null)
  const [showOverlays, setShowOverlays] = useState(true)
  const [showDuration, setShowDuration] = useState(true)
  const [showWatchLater, setShowWatchLater] = useState(true)
  const [showProgress, setShowProgress] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [analysis, setAnalysis] = useState<ThumbnailAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setAnalysis(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleReset = () => {
    setImage(null)
    setAnalysis(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyze = async () => {
    if (!image) return
    
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const result = await analyzeThumbnail(image, videoTitle.trim() || undefined)
      setAnalysis(result)
    } catch (err) {
      setError("Failed to analyze thumbnail. Please try again.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDownload = () => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      canvas.width = 1280
      canvas.height = 720
      ctx.drawImage(img, 0, 0, 1280, 720)

      if (showOverlays) {
        if (showDuration) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
          ctx.beginPath()
          ctx.roundRect(1280 - 60 - 8, 720 - 24 - 8, 60, 24, 4)
          ctx.fill()
          ctx.fillStyle = "white"
          ctx.font = "bold 14px sans-serif"
          ctx.textAlign = "center"
          ctx.fillText("10:25", 1280 - 38, 720 - 14)
        }

        if (showWatchLater) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
          ctx.beginPath()
          ctx.roundRect(1280 - 36 - 8, 8, 36, 36, 4)
          ctx.fill()
          ctx.strokeStyle = "white"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(1280 - 26, 26, 10, 0, Math.PI * 2)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(1280 - 26, 20)
          ctx.lineTo(1280 - 26, 26)
          ctx.lineTo(1280 - 20, 26)
          ctx.stroke()
        }

        if (showProgress) {
          ctx.fillStyle = "rgba(255, 0, 0, 0.9)"
          ctx.fillRect(0, 720 - 4, 1280 * 0.35, 4)
          ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
          ctx.fillRect(1280 * 0.35, 720 - 4, 1280 * 0.65, 4)
        }
      }

      const link = document.createElement("a")
      link.download = "thumbnail-with-overlays.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
    img.src = image
  }

  const regionalData = analysis ? [
    { region: "USA", score: analysis.regionalAppeal.usa, fill: "#6366f1" },
    { region: "UK", score: analysis.regionalAppeal.uk, fill: "#a855f7" },
    { region: "Global", score: analysis.regionalAppeal.global, fill: "#22d3ee" },
  ] : []

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {!image && (
        <Card
          className={`border-2 border-dashed transition-colors chart-glow ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div
              className="w-full text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Upload Your Thumbnail
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop your image here, or click to browse
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Recommended: 1280x720 pixels (16:9 aspect ratio)
              </p>
              <Button
                className="mt-6"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Area */}
      {image && (
        <div className="space-y-6">
          <Card className="chart-glow border-border/50">
            <CardHeader>
              <CardTitle>Video Title for AI Context</CardTitle>
              <CardDescription>Optional: provide your video title so the thumbnail critique also evaluates relevance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="thumbnail-title">Video Title</Label>
                <Input
                  id="thumbnail-title"
                  placeholder="e.g., How to Grow Your YouTube Channel"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="chart-glow border-border/50">
            <CardContent className="flex flex-wrap items-center gap-6 py-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="show-overlays"
                  checked={showOverlays}
                  onCheckedChange={setShowOverlays}
                />
                <Label htmlFor="show-overlays" className="flex items-center gap-2">
                  {showOverlays ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  All Overlays
                </Label>
              </div>

              {showOverlays && (
                <>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="show-duration"
                      checked={showDuration}
                      onCheckedChange={setShowDuration}
                    />
                    <Label htmlFor="show-duration">Duration</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="show-watch-later"
                      checked={showWatchLater}
                      onCheckedChange={setShowWatchLater}
                    />
                    <Label htmlFor="show-watch-later">Watch Later</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="show-progress"
                      checked={showProgress}
                      onCheckedChange={setShowProgress}
                    />
                    <Label htmlFor="show-progress">Progress Bar</Label>
                  </div>
                </>
              )}

              <div className="ml-auto flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing}
                  className="neon-glow-blue"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail Preview */}
          <Card className="overflow-hidden chart-glow border-border/50">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full bg-black">
                <img
                  src={image}
                  alt="Uploaded thumbnail"
                  className="h-full w-full object-contain"
                />

                {showOverlays && (
                  <>
                    {showDuration && (
                      <div className="absolute bottom-2 right-2 flex items-center rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
                        10:25
                      </div>
                    )}

                    {showWatchLater && (
                      <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded bg-black/70">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                    )}

                    {showProgress && (
                      <div className="absolute bottom-0 left-0 right-0 h-1">
                        <div className="h-full w-[35%] bg-red-600" />
                        <div className="absolute right-0 top-0 h-full w-[65%] bg-white/30" />
                      </div>
                    )}

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60">
                        <Play className="h-8 w-8 text-white" fill="white" />
                      </div>
                    </div>
                  </>
                )}
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
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="chart-glow border-border/50">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
              <Card className="chart-glow border-border/50">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-48 w-full" />
                </CardContent>
              </Card>
              <Card className="chart-glow border-border/50 md:col-span-2">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && !isAnalyzing && (
            <div className="space-y-6 animate-chart-in">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Regional Appeal Chart */}
                <Card className="chart-glow border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="h-5 w-5 text-[#22d3ee]" />
                      Regional Appeal Score
                    </CardTitle>
                    <CardDescription>
                      Predicted engagement by audience region
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionalData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            type="number" 
                            domain={[0, 100]} 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <YAxis 
                            type="category" 
                            dataKey="region" 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            width={60}
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
                          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                            {regionalData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Attention Flow Chart */}
                <Card className="chart-glow border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5 text-[#6366f1]" />
                      Attention & Visual Flow
                    </CardTitle>
                    <CardDescription>
                      Predicted user interest over viewing time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analysis.attentionFlow}>
                          <defs>
                            <linearGradient id="attentionGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="time" 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <YAxis 
                            domain={[0, 100]} 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                            }}
                            labelStyle={{ color: "hsl(var(--foreground))" }}
                            formatter={(value: number) => [`${value}%`, "Interest"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="interest"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: "#a855f7" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Metric Dashboard */}
              <Card className="chart-glow border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-[#a855f7]" />
                    Visual Quality Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Text Readability */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Text Readability</span>
                        <span className="text-sm font-bold text-[#6366f1]">
                          {analysis.textReadability}%
                        </span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${analysis.textReadability}%`,
                            background: "linear-gradient(90deg, #6366f1, #a855f7)",
                            boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        How easily text can be read at thumbnail size
                      </p>
                    </div>

                    {/* Contrast Balance */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Contrast Balance</span>
                        <span className="text-sm font-bold text-[#a855f7]">
                          {analysis.contrastBalance}%
                        </span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${analysis.contrastBalance}%`,
                            background: "linear-gradient(90deg, #a855f7, #22d3ee)",
                            boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Color contrast and visual hierarchy effectiveness
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Critique */}
              <Card className="chart-glow border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-[#fbbf24]" />
                    AI Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    {analysis.critique}
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Strengths */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#22d3ee] flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-[#22d3ee] mt-1">•</span>
                            <span className="text-muted-foreground">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#f472b6] flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Suggested Improvements
                      </h4>
                      <ul className="space-y-2">
                        {analysis.improvements.map((improvement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-[#f472b6] mt-1">•</span>
                            <span className="text-muted-foreground">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Warning Zones Info */}
          {!analysis && !isAnalyzing && (
            <Card className="border-accent/50 bg-accent/5">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <div>
                    <h4 className="font-medium text-foreground">Safe Zone Tips</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• <strong>Bottom Right:</strong> Avoid placing text here—the duration timestamp will cover it</li>
                      <li>• <strong>Top Right:</strong> The &quot;Watch Later&quot; icon appears on hover</li>
                      <li>• <strong>Bottom Edge:</strong> Progress bar shows for partially watched videos</li>
                      <li>• <strong>Left Side:</strong> Best area for text and important visual elements</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Hidden canvas for export */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
