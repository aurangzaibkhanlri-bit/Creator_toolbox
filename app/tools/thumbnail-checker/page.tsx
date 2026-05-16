import { Metadata } from "next"
import { ThumbnailChecker } from "@/components/thumbnail-checker"

export const metadata: Metadata = {
  title: "AI Thumbnail Scanner & Safe-Zone Checker - CreatorToolbox AI",
  description: "AI-powered YouTube thumbnail analyzer with regional appeal scores, attention flow charts, and safe-zone checker. Get visual analytics for USA, UK, and global audiences.",
  keywords: "YouTube thumbnail checker, AI thumbnail analyzer, safe zone, thumbnail preview, regional appeal, attention flow chart, thumbnail design",
}

export default function ThumbnailCheckerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          AI Thumbnail Scanner
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your thumbnail for AI-powered analysis with regional appeal scores, 
          attention flow charts, and safe-zone visualization. Get visual analytics 
          for USA, UK, and global audiences.
        </p>
      </div>

      <ThumbnailChecker />

      {/* Educational Content for AdSense */}
      <section className="mt-16 border-t border-border pt-12">
        <article className="prose prose-invert mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Understanding YouTube Thumbnail Safe Zones</h2>
          
          <p className="text-muted-foreground">
            YouTube thumbnails are one of the most critical factors in determining whether viewers click on your video. With millions of videos competing for attention, your thumbnail needs to stand out while remaining readable and professional. However, many creators make a crucial mistake: they place important text or visual elements in areas that YouTube&apos;s interface will cover.
          </p>

          <h3 className="text-xl font-semibold text-foreground">What Are YouTube UI Overlays?</h3>
          
          <p className="text-muted-foreground">
            When your thumbnail appears in YouTube search results, suggested videos, or the homepage, several UI elements are overlaid on top of your image. These include the video duration timestamp (bottom right corner), the "Watch Later" clock icon (top right when hovering), and the progress bar (bottom edge for partially watched videos). If your important content falls beneath these elements, viewers won&apos;t see it.
          </p>

          <h3 className="text-xl font-semibold text-foreground">The Cost of Poor Thumbnail Design</h3>
          
          <p className="text-muted-foreground">
            Studies show that thumbnails account for up to 90% of a video&apos;s performance in terms of click-through rate. A thumbnail with obscured text or cut-off faces can reduce CTR by 50% or more. For channels in the USA and UK markets, where competition is fierce, optimizing every element of your thumbnail is essential for growth.
          </p>
        </article>
      </section>
    </div>
  )
}
