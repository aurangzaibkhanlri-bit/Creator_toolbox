import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/badge"

export const metadata: Metadata = {
  title: "10 Thumbnail Design Tips That Boost Click-Through Rates - CreatorToolbox AI",
  description: "Discover the psychology behind high-performing thumbnails. From color theory to face placement, learn what makes viewers click.",
  keywords: "YouTube thumbnails, thumbnail design, CTR optimization, click-through rate, video thumbnails",
}

export default function ThumbnailDesignTipsPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <header className="mb-12">
        <Badge variant="secondary" className="mb-4">Design</Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          10 Thumbnail Design Tips That Boost Click-Through Rates
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Discover the psychology behind high-performing thumbnails. From color theory to face placement, learn what makes viewers click.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            CreatorToolbox Team
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            January 10, 2025
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            8 min read
          </span>
        </div>
      </header>

      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground text-lg">
          Your thumbnail is the first thing potential viewers see, and it determines whether they click or scroll past. Studies show that 90% of top-performing YouTube videos have custom thumbnails. Here are 10 proven tips to create thumbnails that convert browsers into viewers.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">1. Use High-Contrast Colors</h2>
        <p className="text-muted-foreground">
          YouTube&apos;s interface uses a lot of white (light mode) or dark grays (dark mode). Stand out by using bold, contrasting colors. Yellow, red, and orange tend to perform well because they pop against most backgrounds. Avoid using too much white or gray, as your thumbnail might blend into the interface.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">2. Include Human Faces</h2>
        <p className="text-muted-foreground">
          Thumbnails with faces consistently outperform those without. Humans are wired to look at faces—we can&apos;t help it. Use close-up shots showing clear emotions. Expressions like surprise, excitement, or curiosity work particularly well because they trigger an emotional response in viewers.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">3. Keep Text Minimal and Large</h2>
        <p className="text-muted-foreground">
          If you include text, make it big enough to read on mobile devices. Most YouTube viewing happens on phones, where thumbnails appear quite small. Limit text to 3-4 words maximum, and use bold, sans-serif fonts. The text should complement your title, not repeat it word-for-word.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">4. Create Visual Hierarchy</h2>
        <p className="text-muted-foreground">
          Guide the viewer&apos;s eye with a clear focal point. Whether it&apos;s a face, product, or text, make one element dominant. Use size, color, and positioning to create a hierarchy. The most important element should be immediately obvious, even at thumbnail size.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">5. Avoid the Danger Zones</h2>
        <p className="text-muted-foreground">
          YouTube overlays UI elements on your thumbnail: the duration timestamp (bottom right), the Watch Later icon (top right on hover), and the progress bar (bottom edge). Never place important text or elements in these areas. Use our Thumbnail Safe-Zone Checker to preview exactly where these overlays appear.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">6. Maintain Brand Consistency</h2>
        <p className="text-muted-foreground">
          Successful channels develop a recognizable thumbnail style. This might include consistent colors, fonts, borders, or layouts. When viewers recognize your style, they&apos;re more likely to click because they know what to expect. Consistency builds trust and brand recognition.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">7. Test at Different Sizes</h2>
        <p className="text-muted-foreground">
          Your thumbnail will appear at various sizes across YouTube—from large homepage cards to tiny suggested video thumbnails. Always preview your design at 120 pixels wide (roughly the smallest it will appear). If it&apos;s not clear at that size, simplify your design.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">8. Use the Rule of Thirds</h2>
        <p className="text-muted-foreground">
          Divide your thumbnail into a 3x3 grid and place key elements along the lines or at intersections. This classic composition technique creates more visually appealing and professional-looking thumbnails. Most image editing software can overlay a rule-of-thirds grid.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">9. Create Curiosity Gaps</h2>
        <p className="text-muted-foreground">
          The best thumbnails make viewers curious enough to click. Show a reaction without revealing what caused it. Display a &quot;before&quot; with a hint of the &quot;after.&quot; Use arrows or circles to highlight something intriguing. The goal is to create a question that only watching the video can answer.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">10. A/B Test Your Thumbnails</h2>
        <p className="text-muted-foreground">
          YouTube now offers built-in A/B testing for thumbnails. Create 2-3 variations and let YouTube determine which performs best. Test different elements: faces vs. no faces, different colors, text variations. Data-driven decisions will improve your CTR over time.
        </p>

        <div className="mt-12 rounded-lg bg-primary/10 p-6">
          <h3 className="text-xl font-bold text-foreground">Check Your Thumbnail Safe Zones</h3>
          <p className="mt-2 text-muted-foreground">
            Before publishing, make sure your important content isn&apos;t hidden behind YouTube&apos;s UI overlays.
          </p>
          <Link
            href="/tools/thumbnail-checker"
            className="mt-4 inline-flex items-center font-medium text-primary hover:underline"
          >
            Try the Thumbnail Checker
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </article>
  )
}
