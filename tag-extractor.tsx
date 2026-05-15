"use client"

import { useState, useMemo } from "react"
import { Plus, Trash2, Copy, Check, X, ArrowUpDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Tag {
  id: string
  text: string
  category: "primary" | "secondary" | "broad"
}

const SUGGESTED_TAGS = {
  gaming: ["gaming", "gameplay", "lets play", "walkthrough", "tutorial", "tips", "tricks", "guide"],
  tech: ["tech", "technology", "review", "unboxing", "comparison", "how to", "tutorial", "tips"],
  vlog: ["vlog", "daily vlog", "lifestyle", "day in my life", "routine", "life", "travel"],
  education: ["education", "learn", "tutorial", "how to", "explained", "guide", "tips", "course"],
  entertainment: ["entertainment", "funny", "comedy", "reaction", "challenge", "trending"],
}

export function TagExtractor() {
  const [tags, setTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState("")
  const [bulkInput, setBulkInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [sortOrder, setSortOrder] = useState<"alpha" | "length" | "category">("category")
  const [selectedCategory, setSelectedCategory] = useState<"all" | Tag["category"]>("all")

  const addTag = (text: string, category: Tag["category"] = "secondary") => {
    const trimmed = text.trim().toLowerCase()
    if (trimmed && !tags.some((t) => t.text.toLowerCase() === trimmed)) {
      setTags([...tags, { id: Date.now().toString(), text: trimmed, category }])
    }
    setNewTag("")
  }

  const addBulkTags = () => {
    const newTags = bulkInput
      .split(/[,\n]/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !tags.some((existing) => existing.text.toLowerCase() === t))
      .map((text) => ({
        id: Date.now().toString() + Math.random(),
        text,
        category: "secondary" as const,
      }))
    
    setTags([...tags, ...newTags])
    setBulkInput("")
  }

  const removeTag = (id: string) => {
    setTags(tags.filter((t) => t.id !== id))
  }

  const updateTagCategory = (id: string, category: Tag["category"]) => {
    setTags(tags.map((t) => (t.id === id ? { ...t, category } : t)))
  }

  const clearAll = () => {
    setTags([])
  }

  const sortedTags = useMemo(() => {
    let filtered = selectedCategory === "all" 
      ? tags 
      : tags.filter((t) => t.category === selectedCategory)

    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "alpha":
          return a.text.localeCompare(b.text)
        case "length":
          return a.text.length - b.text.length
        case "category":
          const categoryOrder = { primary: 0, secondary: 1, broad: 2 }
          return categoryOrder[a.category] - categoryOrder[b.category]
        default:
          return 0
      }
    })
  }, [tags, sortOrder, selectedCategory])

  const exportTags = () => {
    return sortedTags.map((t) => t.text).join(", ")
  }

  const totalCharacters = useMemo(() => {
    return tags.map((t) => t.text).join(", ").length
  }, [tags])

  const handleCopy = () => {
    navigator.clipboard.writeText(exportTags())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const content = exportTags()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "youtube-tags.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Single Tag Input */}
        <Card>
          <CardHeader>
            <CardTitle>Add Individual Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag(newTag)
                  }
                }}
              />
              <Button onClick={() => addTag(newTag)}>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Quick Add Category Tags</Label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SUGGESTED_TAGS).map(([category]) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      SUGGESTED_TAGS[category as keyof typeof SUGGESTED_TAGS].forEach((tag) => {
                        addTag(tag, "broad")
                      })
                    }}
                  >
                    + {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Input */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Import Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bulk">Paste tags (comma or newline separated)</Label>
              <Textarea
                id="bulk"
                placeholder="gaming, lets play, walkthrough&#10;tutorial&#10;tips and tricks"
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={addBulkTags} disabled={!bulkInput.trim()}>
              <Plus className="mr-2 h-4 w-4" />
              Import All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tags Display */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2">
              Your Tags
              <Badge variant="secondary">{tags.length}</Badge>
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "alpha" ? "length" : sortOrder === "length" ? "category" : "alpha")}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort: {sortOrder === "alpha" ? "A-Z" : sortOrder === "length" ? "Length" : "Category"}
              </Button>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as typeof selectedCategory)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="broad">Broad</option>
              </select>
              <Button variant="outline" size="sm" onClick={clearAll} disabled={tags.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p>No tags added yet. Start by adding individual tags or importing in bulk.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {sortedTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={tag.category === "primary" ? "default" : "outline"}
                    className={`group cursor-pointer px-3 py-1.5 text-sm transition-colors ${
                      tag.category === "primary"
                        ? "bg-primary hover:bg-primary/80"
                        : tag.category === "broad"
                        ? "border-muted-foreground/50 text-muted-foreground hover:text-foreground"
                        : ""
                    }`}
                    onClick={() => {
                      const categories: Tag["category"][] = ["secondary", "primary", "broad"]
                      const currentIndex = categories.indexOf(tag.category)
                      const nextCategory = categories[(currentIndex + 1) % categories.length]
                      updateTagCategory(tag.id, nextCategory)
                    }}
                  >
                    {tag.text}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeTag(tag.id)
                      }}
                      className="ml-2 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={`Remove ${tag.text}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Click tags to change priority level</span>
                <div className="flex items-center gap-2">
                  <Badge>Primary</Badge>
                  <Badge variant="outline">Secondary</Badge>
                  <Badge variant="outline" className="border-muted-foreground/50 text-muted-foreground">Broad</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Export Tags
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownload} disabled={tags.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={handleCopy} disabled={tags.length === 0}>
                {copied ? (
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
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="font-mono text-sm text-foreground">
              {tags.length > 0 ? exportTags() : "Add tags above to see the export preview..."}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{totalCharacters} / 500 characters used</span>
            {totalCharacters > 500 && (
              <span className="text-destructive">Exceeds YouTube limit!</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="py-4">
          <h4 className="mb-2 font-medium text-foreground">Pro Tips for YouTube Tags</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Put your most important keyword as the first tag (marked as Primary)</li>
            <li>• Use a mix of specific and broad tags for better discoverability</li>
            <li>• Include common misspellings of popular search terms</li>
            <li>• Keep total tag characters under 500 (YouTube&apos;s limit)</li>
            <li>• Focus on 5-8 highly relevant tags rather than 20+ generic ones</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
