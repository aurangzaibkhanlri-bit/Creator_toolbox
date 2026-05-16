"use client"

import { useState } from "react"
import { Copy, Check, Sparkles, Tag, FileText, Hash } from "lucide-react"
import { Button } from "@/components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/card"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Badge } from "@/components/badge"
import { Skeleton } from "@/components/skeleton"
import { generateDescriptionAndTags, type DescriptionTagsResult } from "@/gemini"

export function DescriptionGenerator() {
  const [videoTopic, setVideoTopic] = useState("")
  const [copiedDesc, setCopiedDesc] = useState(false)
  const [copiedTags, setCopiedTags] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiResult, setAiResult] = useState<DescriptionTagsResult | null>(null)
  const [error, setError] = useState<string | null>(null)


  const handleGenerate = async () => {
    if (!videoTopic.trim()) return
    
    setIsGenerating(true)
    setError(null)
    
    try {
      const result = await generateDescriptionAndTags(videoTopic)
      setAiResult(result)
    } catch (err) {
      setError("Failed to generate content. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyDesc = () => {
    if (aiResult?.description) {
      navigator.clipboard.writeText(aiResult.description)
      setCopiedDesc(true)
      setTimeout(() => setCopiedDesc(false), 2000)
    }
  }

  const handleCopyTags = () => {
    if (aiResult?.tags) {
      navigator.clipboard.writeText(aiResult.tags.join(", "))
      setCopiedTags(true)
      setTimeout(() => setCopiedTags(false), 2000)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Form */}
      <div className="space-y-6">
        {/* Basic Info */}
        <Card className="chart-glow border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#6366f1]" />
              Video Information
            </CardTitle>
            <CardDescription>Only the video title is required. AI will generate an optimized description, relevant tags, hashtags, and 10 SEO keywords.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Video Title</Label>
              <Input
                id="topic"
                placeholder="e.g., 10 Tips to Grow Your YouTube Channel in 2024"
                value={videoTopic}
                onChange={(e) => setVideoTopic(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !videoTopic.trim()}
          className="w-full h-12 text-lg neon-glow-blue"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {isGenerating ? "Generating with AI..." : "Generate Description & Tags"}
        </Button>

        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="py-4">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview */}
      <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
        {/* Loading State */}
        {isGenerating && (
          <div className="space-y-6">
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-6 w-20" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Generated Content */}
        {aiResult && !isGenerating && (
          <div className="space-y-6 animate-chart-in">
            {/* Description */}
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#6366f1]" />
                    Generated Description
                  </span>
                  <Button onClick={handleCopyDesc} variant="outline" size="sm">
                    {copiedDesc ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-secondary/50 p-4 border border-border/50">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                    {aiResult.description}
                  </pre>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{aiResult.description.length} characters</span>
                  <span>Max: 5,000 characters</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-[#a855f7]" />
                    Generated Tags
                  </span>
                  <Button onClick={handleCopyTags} variant="outline" size="sm">
                    {copiedTags ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy All
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {aiResult.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="text-sm py-1 px-3"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {aiResult.tags.join(", ").length} / 500 characters used
                </p>
              </CardContent>
            </Card>

            {/* Hashtags */}
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-[#22d3ee]" />
                  Hashtags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {aiResult.hashtags.map((hashtag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="text-sm py-1 px-3 text-[#22d3ee] border-[#22d3ee]/50"
                    >
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEO Keywords */}
            <Card className="chart-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#f472b6]" />
                  SEO Keywords
                </CardTitle>
                <CardDescription>Recommended keywords for search optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {aiResult.keywords.map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="text-sm py-1 px-3"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!aiResult && !isGenerating && (
          <Card className="chart-glow border-border/50">
            <CardContent className="py-16 text-center">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Ready to Generate</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Fill in your video details and click the generate button to create an AI-optimized description and tags.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
