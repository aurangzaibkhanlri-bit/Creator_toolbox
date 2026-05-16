import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - CreatorToolbox AI",
  description: "Read the terms of service for using CreatorToolbox AI's free YouTube creator tools and website.",
  keywords: "terms of service, terms and conditions, legal, user agreement",
}

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: January 15, 2025
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground">
          Welcome to CreatorToolbox AI. By accessing or using our website at creatortoolbox.ai (the "Site") and our services, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground">
          By accessing or using our Site and services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Site or services.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">2. Description of Services</h2>
        <p className="text-muted-foreground">
          CreatorToolbox AI provides free tools designed to help YouTube creators optimize their content, including:
        </p>
        <ul className="text-muted-foreground">
          <li>Thumbnail Safe-Zone Checker</li>
          <li>Viral Title Analyzer</li>
          <li>Description Generator</li>
          <li>Tag Extractor and Organizer</li>
        </ul>
        <p className="text-muted-foreground">
          We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">3. User Responsibilities</h2>
        <p className="text-muted-foreground">
          When using our services, you agree to:
        </p>
        <ul className="text-muted-foreground">
          <li>Use the services only for lawful purposes</li>
          <li>Not attempt to disrupt or compromise the Site's security</li>
          <li>Not use automated systems to access the Site without permission</li>
          <li>Not upload content that infringes on third-party rights</li>
          <li>Not use the services to create misleading or deceptive content</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10">4. Intellectual Property</h2>
        <h3 className="text-xl font-semibold text-foreground mt-6">4.1 Our Content</h3>
        <p className="text-muted-foreground">
          All content on our Site, including text, graphics, logos, images, and software, is the property of CreatorToolbox AI or our licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-6">4.2 Your Content</h3>
        <p className="text-muted-foreground">
          When you use our tools (thumbnail checker, title analyzer, etc.), you retain full ownership of your content. We do not claim any rights to thumbnails, titles, descriptions, or other content you process through our tools.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">5. Privacy</h2>
        <p className="text-muted-foreground">
          Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding your personal information.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">6. Disclaimer of Warranties</h2>
        <p className="text-muted-foreground">
          OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
        </p>
        <ul className="text-muted-foreground">
          <li>The services will be uninterrupted or error-free</li>
          <li>Results obtained from using the services will be accurate or reliable</li>
          <li>The services will meet your specific requirements</li>
          <li>Any errors in the services will be corrected</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10">7. Limitation of Liability</h2>
        <p className="text-muted-foreground">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, CREATORTOOLBOX AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul className="text-muted-foreground">
          <li>Loss of profits, revenue, or data</li>
          <li>Business interruption</li>
          <li>Loss of goodwill</li>
          <li>Any other intangible losses</li>
        </ul>
        <p className="text-muted-foreground">
          This limitation applies regardless of the theory of liability and even if we have been advised of the possibility of such damages.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">8. Indemnification</h2>
        <p className="text-muted-foreground">
          You agree to indemnify, defend, and hold harmless CreatorToolbox AI, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney's fees) arising from:
        </p>
        <ul className="text-muted-foreground">
          <li>Your use of our services</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Content you upload or process through our tools</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10">9. Third-Party Links and Services</h2>
        <p className="text-muted-foreground">
          Our Site may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these third parties. Your interactions with third-party services are governed by their respective terms.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">10. Modifications to Terms</h2>
        <p className="text-muted-foreground">
          We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Site. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">11. Termination</h2>
        <p className="text-muted-foreground">
          We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use our services will cease immediately.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">12. Governing Law</h2>
        <p className="text-muted-foreground">
          These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of Delaware, USA.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">13. Severability</h2>
        <p className="text-muted-foreground">
          If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">14. Entire Agreement</h2>
        <p className="text-muted-foreground">
          These Terms, together with our Privacy Policy, constitute the entire agreement between you and CreatorToolbox AI regarding your use of our services and supersede any prior agreements.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">15. Contact Information</h2>
        <p className="text-muted-foreground">
          If you have questions about these Terms, please contact us:
        </p>
        <ul className="text-muted-foreground">
          <li>Email: legal@creatortoolbox.ai</li>
          <li>Contact Form: creatortoolbox.ai/contact</li>
        </ul>
      </div>
    </div>
  )
}
