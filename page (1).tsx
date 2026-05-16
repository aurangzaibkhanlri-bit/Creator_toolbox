import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/card"
import { Badge } from "@/badge"

export const metadata: Metadata = {
  title: "Blog - CreatorToolbox AI",
  description: "Expert tips, guides, and strategies for YouTube creators. Learn how to grow your channel, optimize thumbnails, write viral titles, and master YouTube SEO.",
  keywords: "YouTube tips, creator guides, YouTube SEO, video optimization, channel growth",
}

const blogPosts = [
  {
    slug: "youtube-seo-guide",
    title: "The Complete YouTube SEO Guide for 2025",
    description: "Master YouTube search optimization with our comprehensive guide. Learn how to rank higher, get more views, and grow your subscriber base organically.",
    category: "SEO",
    author: "CreatorToolbox Team",
    date: "2025-01-15",
    readTime: "12 min read",
  },
  {
    slug: "thumbnail-design-tips",
    title: "10 Thumbnail Design Tips That Boost Click-Through Rates",
    description: "Discover the psychology behind high-performing thumbnails. From color theory to face placement, learn what makes viewers click.",
    category: "Design",
    author: "CreatorToolbox Team",
    date: "2025-01-10",
    readTime: "8 min read",
  },
  {
    slug: "viral-title-formulas",
    title: "7 Viral Title Formulas Used by Top YouTubers",
    description: "Analyze the title patterns that consistently generate millions of views. Copy these proven formulas for your own videos.",
    category: "Growth",
    author: "CreatorToolbox Team",
    date: "2025-01-05",
    readTime: "10 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Creator Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Expert insights, tips, and strategies to help you grow your YouTube channel.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Read article
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/10 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Stay Updated
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Get the latest YouTube tips, tool updates, and growth strategies delivered to your inbox.
        </p>
        <div className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
