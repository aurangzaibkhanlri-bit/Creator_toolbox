import { Metadata } from "next"
import Link from "next/link"
import { Youtube, Users, Target, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us - CreatorToolbox AI",
  description: "Learn about CreatorToolbox AI and our mission to empower YouTube creators with free, professional-grade tools for channel growth.",
  keywords: "about CreatorToolbox, YouTube tools, creator tools, about us",
}

const values = [
  {
    icon: Users,
    title: "Creator-First",
    description: "Every tool we build starts with a real problem faced by creators. We listen, iterate, and improve based on community feedback.",
  },
  {
    icon: Target,
    title: "Accessibility",
    description: "Professional tools shouldn't require professional budgets. We believe every creator deserves access to growth resources.",
  },
  {
    icon: Heart,
    title: "Privacy",
    description: "Your content stays yours. Our tools run client-side whenever possible, ensuring your thumbnails and data never leave your device.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <Youtube className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About CreatorToolbox AI
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Empowering YouTube creators with free, professional-grade tools.
        </p>
      </div>

      <div className="prose prose-invert mx-auto max-w-none">
        <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
        <p className="text-muted-foreground">
          CreatorToolbox AI was built by creators, for creators. We understand the challenges of growing a YouTube channel in today&apos;s competitive landscape. From optimizing thumbnails to crafting viral titles, every detail matters when you&apos;re competing against millions of videos for viewer attention.
        </p>
        <p className="text-muted-foreground">
          Our mission is simple: democratize access to professional YouTube optimization tools. While large media companies have teams dedicated to thumbnail design and title testing, independent creators often lack these resources. We&apos;re here to level the playing field.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">What We Offer</h2>
        <p className="text-muted-foreground">
          CreatorToolbox AI provides a suite of free tools designed specifically for YouTube creators:
        </p>
        <ul className="text-muted-foreground">
          <li><strong>Thumbnail Safe-Zone Checker:</strong> Visualize where YouTube&apos;s UI overlays appear on your thumbnails</li>
          <li><strong>Viral Title Analyzer:</strong> Get data-driven feedback on your video titles</li>
          <li><strong>Description Generator:</strong> Create perfectly formatted, SEO-optimized descriptions</li>
          <li><strong>Tag Extractor:</strong> Organize and optimize your video tags for maximum discoverability</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10">Our Story</h2>
        <p className="text-muted-foreground">
          CreatorToolbox AI started as a simple idea: what if the tools used by top YouTubers were available to everyone? After seeing countless creators struggle with the same optimization challenges, we set out to build solutions that are powerful, intuitive, and completely free.
        </p>
        <p className="text-muted-foreground">
          Today, we serve thousands of creators across the USA, UK, and beyond. Our tools are designed to be fast, privacy-focused, and effective. We don&apos;t require signups for basic features, and we never sell your data.
        </p>
      </div>

      {/* Values Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-foreground">Ready to Grow Your Channel?</h2>
        <p className="mt-4 text-muted-foreground">
          Try our free tools and see the difference professional optimization can make.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/tools/thumbnail-checker">Get Started Free</Link>
        </Button>
      </div>
    </div>
  )
}
