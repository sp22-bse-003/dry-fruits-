import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8B4513",
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dryfruits-ecommerce.vercel.app'),
  title: {
    default: "DryFruits.pk - Buy Premium Dry Fruits Online in Pakistan",
    template: "%s | DryFruits.pk"
  },
  description:
    "Pakistan's trusted online dry fruits store. Premium almonds, dates, cashews, walnuts & more. Direct from Gilgit-Baltistan & Balochistan growers. Free delivery on orders over Rs.5000. Cash on delivery available.",
  keywords: "dry fruits Pakistan, buy dry fruits online, almonds Pakistan, dates online, cashews, walnuts, chilgoza, gift packs, bulk dry fruits",
  authors: [{ name: "DryFruits.pk" }],
  creator: "DryFruits.pk",
  publisher: "DryFruits.pk",
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
  openGraph: {
    title: "DryFruits.pk - Premium Dry Fruits Online Pakistan",
    description: "Buy premium quality dry fruits online. Direct from growers. Free delivery. Cash on delivery.",
    url: "/",
    siteName: "DryFruits.pk",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DryFruits.pk - Premium Dry Fruits Pakistan",
    description: "Buy premium dry fruits online in Pakistan. Direct from growers.",
  },
  verification: {
    google: 'your-google-verification-code', // Add this after verifying with Google Search Console
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Toaster />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
