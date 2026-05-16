import { Metadata } from "next"
import { TagExtractor } from "@/components/tag-extractor"

export const metadata: Metadata = {
  title: "Tag Extractor & Organizer - CreatorToolbox AI",
  description: "Organize and optimize your YouTube video tags for maximum SEO impact. Sort by relevance, remove duplicates, and export ready-to-paste tags.",
  keywords: "YouTube tags, tag extractor, SEO tags, video tags, YouTube optimization, tag organizer",
}

export default function TagExtractorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tag Extractor & Organizer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Organize and optimize your YouTube video tags for maximum SEO impact. 
          Sort, filter, and export perfectly formatted tags.
        </p>
      </div>

      <TagExtractor />

      {/* Educational Content for AdSense */}
      <section className="mt-16 border-t border-border pt-12">
        <article className="prose prose-invert mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Understanding YouTube Tags and SEO</h2>
          
          <p className="text-muted-foreground">
            While YouTube&apos;s algorithm has evolved beyond simple keyword matching, tags still play an important role in video discoverability. Tags help YouTube understand your content&apos;s context and connect it with related videos. When used strategically, tags can improve your video&apos;s chances of appearing in search results and suggested video feeds.
          </p>

          <h3 className="text-xl font-semibold text-foreground">How YouTube Uses Tags</h3>
          
          <p className="text-muted-foreground">
            YouTube uses tags primarily to understand the context and spelling of your content. While tags alone won&apos;t make your video rank, they help the algorithm categorize your content and suggest it alongside similar videos. Think of tags as supplementary metadata that supports your title and description.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Tag Strategy Best Practices</h3>
          
          <p className="text-muted-foreground">
            The most effective tag strategy focuses on relevance over quantity. Start with your exact target keyword as the first tag, followed by variations and related terms. Include a mix of broad and specific tags, and always ensure your tags accurately represent your content. Misleading tags can hurt your video&apos;s performance through poor audience retention.
          </p>

          <h3 className="text-xl font-semibold text-foreground">The Ideal Number of Tags</h3>
          
          <p className="text-muted-foreground">
            YouTube allows up to 500 characters for tags, but that doesn&apos;t mean you should use all of them. Research suggests that 5-8 highly relevant tags often outperform videos with 20+ generic tags. Quality always beats quantity when it comes to YouTube SEO.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Tag Organization Strategies</h3>
          
          <ul className="text-muted-foreground">
            <li>Start with your exact target keyword</li>
            <li>Add common misspellings of your main keyword</li>
            <li>Include 2-3 word variations of your topic</li>
            <li>Add your channel name and branded terms</li>
            <li>Include broader category tags</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
