import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://pegase-ia.fr'),
  title: { default: 'Pégase IA — Vos pensées méritent de l’espace', template: '%s · Pégase IA' },
  description: 'Pégase IA vous aide à mettre des mots sur ce que vous ressentez et à retrouver de la clarté, dans un espace confidentiel et sans jugement.',
  generator: 'Pégase IA',
  alternates: { canonical: 'https://pegase-ia.fr' },
  openGraph: { type: 'website', locale: 'fr_FR', url: 'https://pegase-ia.fr', siteName: 'Pégase IA', title: 'Pégase IA — Un espace pour vous', description: 'Une écoute attentive, à votre rythme.' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = { themeColor: '#f8f8f6', colorScheme: 'light', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className="bg-background"><body className={`${geist.variable} ${geistMono.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
