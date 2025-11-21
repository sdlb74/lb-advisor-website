import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'LB Advisor | Transformation Cloud & Formation Professionnelle',
  description: 'LB Advisor accompagne les organisations dans leur transformation digitale grâce à la formation, la technologie cloud et une approche centrée sur l\'humain. Expertise en Azure, AWS, GCP, cybersécurité et DevOps.',
  keywords: 'transformation digitale, cloud computing, formation, Azure, AWS, GCP, cybersécurité, DevOps, consulting, Montréal',
  authors: [{ name: 'Salim LeBihan', url: 'https://lb-advisor.com' }],
  creator: 'LB Advisor',
  publisher: 'LB Advisor',
  metadataBase: new URL('https://lb-advisor.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://lb-advisor.com',
    title: 'LB Advisor | Transformation Cloud & Formation Professionnelle',
    description: 'Nous accompagnons les organisations dans leur transformation digitale grâce à la formation, la technologie cloud et une approche centrée sur l\'humain.',
    siteName: 'LB Advisor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LB Advisor - Transformation Cloud & Formation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LB Advisor | Transformation Cloud & Formation',
    description: 'Expertise en transformation digitale, cloud computing et formation professionnelle à Montréal.',
    images: ['/og-image.png'],
    creator: '@lbadvisor',
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <Toaster position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  )
}
