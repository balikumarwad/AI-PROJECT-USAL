import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'USAL - AI-Powered Study Abroad Platform',
  description: 'Write powerful SOPs, prepare for interviews, and master university applications with AI. Get admitted to your dream university with USAL.',
  generator: 'v0.app',
  keywords: ['study abroad', 'AI counselor', 'SOP generator', 'university applications', 'visa interview prep'],
  openGraph: {
    title: 'USAL - Your AI Study Abroad Partner',
    description: 'AI-powered guidance for SOPs, interviews, and university applications',
    type: 'website',
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
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0B0F19" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans antialiased bg-slate-950">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
