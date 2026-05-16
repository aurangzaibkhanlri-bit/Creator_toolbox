import { Metadata } from "next"
import { Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/card"
import { Input } from "@/input"
import { Label } from "@/label"
import { Textarea } from "@/textarea"
import { Button } from "@/button"

export const metadata: Metadata = {
  title: "Contact Us - CreatorToolbox AI",
  description: "Get in touch with the CreatorToolbox AI team. We're here to help with questions, feedback, and partnership opportunities.",
  keywords: "contact CreatorToolbox, support, feedback, partnership",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "hello@creatortoolbox.ai",
    description: "We typically respond within 24-48 hours",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Remote-First Team",
    description: "Serving creators in the USA, UK, and worldwide",
  },
  {
    icon: Clock,
    title: "Support Hours",
    details: "Monday - Friday",
    description: "9:00 AM - 6:00 PM EST",
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions, feedback, or partnership ideas? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your question or feedback..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-6 text-xl font-semibold text-foreground">Get in Touch</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <Card key={info.title}>
                  <CardContent className="flex items-start gap-4 py-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{info.title}</h3>
                      <p className="text-foreground">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Teaser */}
          <Card className="bg-primary/5">
            <CardContent className="py-6">
              <h3 className="mb-2 font-semibold text-foreground">Frequently Asked Questions</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Before reaching out, check if your question is answered in our common topics:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Are the tools really free? <span className="text-primary">Yes, 100% free.</span></li>
                <li>• Do you store my thumbnails? <span className="text-primary">No, everything runs locally.</span></li>
                <li>• Can I use these tools commercially? <span className="text-primary">Absolutely!</span></li>
                <li>• Do you offer API access? <span className="text-primary">Coming soon.</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
