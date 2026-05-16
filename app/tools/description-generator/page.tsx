import { Metadata } from "next"
import { DescriptionGenerator } from "@/components/description-generator"

export const metadata: Metadata = {
  title: "AI Description & Tag Generator - CreatorToolbox AI",
  description: "AI-powered YouTube description and tag generator. Create SEO-optimized descriptions, hashtags, and metadata tags from your video topic in seconds.",
  keywords: "YouTube description generator, AI description, video description, timestamps, SEO tags, YouTube optimization, hashtag generator",
}

export default function DescriptionGeneratorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          AI Description & Tag Builder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate AI-powered, SEO-optimized descriptions, tags, hashtags, and keywords 
          from your video topic. Get copy-paste ready content in seconds.
        </p>
      </div>

      <DescriptionGenerator />

      {/* Educational Content for AdSense */}
      <section className="mt-16 border-t border-border pt-12">
        <article className="prose prose-invert mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Mastering YouTube Video Descriptions</h2>
          
          <p className="text-muted-foreground">
            While thumbnails and titles grab attention, your video description plays a crucial role in YouTube SEO and viewer engagement. A well-crafted description helps YouTube understand your content, improves search rankings, and provides value to your audience. Yet most creators either leave descriptions empty or fill them with irrelevant content.
          </p>

          <h3 className="text-xl font-semibold text-foreground">The Anatomy of a Perfect Description</h3>
          
          <p className="text-muted-foreground">
            The ideal YouTube description follows a proven structure: a compelling hook in the first 150 characters (visible before "Show more"), followed by a detailed overview, timestamps for navigation, relevant links, and strategic keyword placement. Our generator helps you create this structure automatically.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Why the First 150 Characters Matter</h3>
          
          <p className="text-muted-foreground">
            YouTube only displays the first 150 characters of your description in search results and above the fold. This "above the fold" content must hook viewers and include your most important keywords. It&apos;s your elevator pitch—make every character count.
          </p>

          <h3 className="text-xl font-semibold text-foreground">The Power of Timestamps</h3>
          
          <p className="text-muted-foreground">
            Timestamps (also called chapters) dramatically improve user experience by allowing viewers to jump to specific sections. YouTube now displays these as visual chapters in the progress bar. Videos with chapters often see higher retention because viewers can easily find the content they want.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Strategic Keyword Placement</h3>
          
          <p className="text-muted-foreground">
            While YouTube&apos;s algorithm has become more sophisticated, keywords in your description still influence search rankings. Include your target keywords naturally in the first paragraph, but avoid keyword stuffing. Our tool helps you integrate keywords without making your description feel spammy.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Essential Links to Include</h3>
          
          <p className="text-muted-foreground">
            Your description should include links that benefit your channel growth: subscribe link, related videos or playlists, social media profiles, and any mentioned products or resources. Our generator formats these links consistently and professionally.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Social Proof and Calls-to-Action</h3>
          
          <p className="text-muted-foreground">
            Include clear calls-to-action (CTAs) in your description—ask viewers to subscribe, like, comment, or check out related content. Social proof elements like subscriber counts or notable achievements can also boost credibility and engagement.
          </p>

          <h3 className="text-xl font-semibold text-foreground">SEO Best Practices for Descriptions</h3>
          
          <ul className="text-muted-foreground">
            <li>Use your primary keyword in the first sentence</li>
            <li>Write at least 200 words for optimal SEO impact</li>
            <li>Include relevant hashtags (3-5 maximum) at the end</li>
            <li>Add timestamps for videos longer than 5 minutes</li>
            <li>Link to related videos on your channel to boost watch time</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">Description Templates That Work</h3>
          
          <p className="text-muted-foreground">
            The most successful YouTubers use consistent description templates across their videos. This creates brand consistency, saves time, and ensures you never forget important elements. Our generator creates a customizable template that you can use for every upload.
          </p>
        </article>
      </section>
    </div>
  )
}
