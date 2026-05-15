import { Metadata } from "next"
import { ThumbnailChecker } from "@/components/tools/thumbnail-checker"

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
            When your thumbnail appears in YouTube search results, suggested videos, or the homepage, several UI elements are overlaid on top of your image. These include the video duration timestamp (bottom right corner), the &quot;Watch Later&quot; clock icon (top right when hovering), and the progress bar (bottom edge for partially watched videos). If your important content falls beneath these elements, viewers won&apos;t see it.
          </p>

          <h3 className="text-xl font-semibold text-foreground">The Cost of Poor Thumbnail Design</h3>
          
          <p className="text-muted-foreground">
            Studies show that thumbnails account for up to 90% of a video&apos;s performance in terms of click-through rate. A thumbnail with obscured text or cut-off faces can reduce CTR by 50% or more. For channels in the USA and UK markets, where competition is fierce, optimizing every element of your thumbnail is essential for growth.
          </p>

          <h3 className="text-xl font-semibold text-foreground">How to Use the Safe-Zone Checker</h3>
          
          <p className="text-muted-foreground">
            Our tool overlays a transparent representation of YouTube&apos;s UI elements directly on your thumbnail. Simply upload your 1280x720 image (the standard YouTube thumbnail resolution), and you&apos;ll see exactly where the duration timestamp, watch later button, and progress bar appear. This allows you to adjust your design before publishing.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Best Practices for Thumbnail Safe Zones</h3>
          
          <ul className="text-muted-foreground">
            <li>Keep important text in the left two-thirds of your thumbnail</li>
            <li>Avoid placing faces or critical visual elements in the bottom right corner</li>
            <li>Use high-contrast colors to ensure readability even at small sizes</li>
            <li>Test your thumbnail at multiple sizes—it should be clear at 120px width</li>
            <li>Consider how partially-watched progress bars will affect your design</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">The Technical Specifications</h3>
          
          <p className="text-muted-foreground">
            YouTube recommends a thumbnail resolution of 1280x720 pixels with a 16:9 aspect ratio. The maximum file size is 2MB, and supported formats include JPG, GIF, and PNG. Our checker is optimized for this exact resolution to give you the most accurate preview of how your thumbnail will appear across YouTube&apos;s various interfaces.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Mobile vs Desktop Considerations</h3>
          
          <p className="text-muted-foreground">
            Over 70% of YouTube watch time comes from mobile devices. On smaller screens, thumbnails appear even smaller, and the UI overlay elements take up proportionally more space. Our tool helps you understand these constraints so you can create thumbnails that work effectively across all devices and screen sizes.
          </p>

          <h3 className="text-xl font-semibold text-foreground">A/B Testing Your Thumbnails</h3>
          
          <p className="text-muted-foreground">
            YouTube now offers A/B testing for thumbnails through YouTube Studio. Before running these tests, use our safe-zone checker to ensure all variants have properly positioned elements. This gives each thumbnail version a fair chance to perform without being handicapped by obscured content.
          </p>
        </article>
      </section>
    </div>
  )
}
