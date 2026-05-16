import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - CreatorToolbox AI",
  description: "Read our privacy policy to understand how CreatorToolbox AI collects, uses, and protects your personal information. GDPR and CCPA compliant.",
  keywords: "privacy policy, data protection, GDPR, CCPA, privacy",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: January 15, 2025
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground">
          At CreatorToolbox AI ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website creatortoolbox.ai (the "Site") and use our services.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">1. Information We Collect</h2>
        
        <h3 className="text-xl font-semibold text-foreground mt-6">1.1 Information You Provide</h3>
        <p className="text-muted-foreground">
          We may collect information you voluntarily provide when you:
        </p>
        <ul className="text-muted-foreground">
          <li>Subscribe to our newsletter</li>
          <li>Contact us through our contact form</li>
          <li>Participate in surveys or promotions</li>
        </ul>
        <p className="text-muted-foreground">
          This information may include your name, email address, and any message content you provide.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-6">1.2 Automatically Collected Information</h3>
        <p className="text-muted-foreground">
          When you access our Site, we may automatically collect certain information, including:
        </p>
        <ul className="text-muted-foreground">
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>IP address (anonymized)</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-6">1.3 Tool Usage Information</h3>
        <p className="text-muted-foreground">
          <strong>Important:</strong> Our creator tools (Thumbnail Checker, Title Analyzer, Description Generator, Tag Extractor) are designed to run locally in your browser. We do NOT upload, store, or have access to:
        </p>
        <ul className="text-muted-foreground">
          <li>Thumbnails or images you upload</li>
          <li>Video titles you analyze</li>
          <li>Descriptions you generate</li>
          <li>Tags you organize</li>
        </ul>
        <p className="text-muted-foreground">
          All processing occurs client-side on your device.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">2. How We Use Your Information</h2>
        <p className="text-muted-foreground">
          We use the information we collect to:
        </p>
        <ul className="text-muted-foreground">
          <li>Provide, operate, and maintain our Site</li>
          <li>Send you newsletters (if subscribed)</li>
          <li>Respond to your inquiries and support requests</li>
          <li>Analyze usage patterns to improve our services</li>
          <li>Detect and prevent fraudulent or unauthorized activity</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10">3. Cookies and Tracking Technologies</h2>
        <p className="text-muted-foreground">
          We use cookies and similar tracking technologies to:
        </p>
        <ul className="text-muted-foreground">
          <li>Remember your preferences</li>
          <li>Analyze site traffic (via analytics services)</li>
          <li>Enable certain site functionality</li>
        </ul>
        <p className="text-muted-foreground">
          You can control cookies through your browser settings. Disabling cookies may limit certain features of our Site.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">4. Third-Party Services</h2>
        <p className="text-muted-foreground">
          We may use third-party services that collect, monitor, and analyze data:
        </p>
        <ul className="text-muted-foreground">
          <li><strong>Analytics:</strong> Vercel Analytics for understanding site usage</li>
          <li><strong>Hosting:</strong> Vercel for website hosting</li>
          <li><strong>Advertising:</strong> Google AdSense for displaying relevant advertisements</li>
        </ul>
        <p className="text-muted-foreground">
          These third parties have their own privacy policies governing their use of your information.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10">5. Your Rights Under GDPR (European Users)</h2>
        <p className="text-muted-foreground">
          If you are located in the European Economic Area (EEA), you have certain rights under the General Data Protection Regulation (GDPR):
        </p>
        <ul className="text-muted-foreground">
          <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
          <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
          <li><strong>Right to Restrict Processing:</strong> Request limitation on how we use your data</li>
          <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
        </ul>
