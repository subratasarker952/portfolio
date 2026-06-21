import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: 'Subrata Sarker Portfolio | Full-Stack Web Developer',
    template: '%s | DevPortfolio',
  },
  description:
    'Full-stack web developer specializing in building scalable MERN applications. Expert in React, Node.js, MongoDB, and modern web technologies.',
  keywords: [
    'Full-Stack web Developer',
    'MERN Stack',
    'React Developer',
    'Node.js Developer',
    'MongoDB',
    'Web Development',
    'Portfolio',
  ],
  authors: [{ name: 'Subrata Sarker Portfolio' }],
  creator: 'Subrata Sarker Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://subratasarker.vercel.app',
    siteName: 'Subrata Sarker Portfolio',
    title: 'Subrata Sarker Portfolio | Full-Stack Web Developer',
    description:
      'Full-Stack Web Developer specializing in building scalable MERN applications.',
    images: [
      {
        url: '/subrataProfilePicture.jpg',
        width: 1200,
        height: 630,
        alt: 'Subrata sarker Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subrata Sarker Portfolio | Full-Stack Web Developer',
    description: 'Full-Stack Web Developer specializing in building scalable MERN applications.',
    images: ['/subrataProfilePicture.jpg'],
    creator: '@devportfolio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        url: '/icon.jpg',
        type: 'image/jpg',
      },
    ],
    apple: '/apple-icon.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
