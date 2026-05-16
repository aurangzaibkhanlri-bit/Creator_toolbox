import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/navigation'
import { Footer } from '@/footer'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'CreatorToolbox AI - AI-Powered YouTube Tools with Visual Analytics',
  description: 'AI-powered YouTube creator tools with visual analytics charts. Thumbnail scanner with regional appeal scores, viral title analyzer with radar charts, and AI description generator.',
  keywords: 'YouTube tools, AI thumbnail analyzer, viral title analyzer, radar chart, visual analytics, description generator, SEO tags, YouTube creator, video optimization',
  authors: [{ name: 'CreatorToolbox AI' }],
  creator: 'CreatorToolbox AI',
  publisher: 'CreatorToolbox AI',
  openGraph: {
    title: 'CreatorToolbox AI - AI-Powered YouTube Tools with Visual Analytics',
    description: 'AI-powered YouTube tools with stunning visual analytics. Regional appeal charts, virality radar, and AI-generated content.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CreatorToolbox AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorToolbox AI - AI-Powered YouTube Tools',
    description: 'AI-powered YouTube tools with stunning visual analytics charts.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
