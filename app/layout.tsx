import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ================= PRO-LEVEL GLOBAL SEO CONFIGURATION =================
export const metadata: Metadata = {
  metadataBase: new URL('https://www.tuneplusmusic.com'),
  title: {
    default: "TunePlus Music | Premium Music Distribution & White Label SaaS",
    template: "%s | TunePlus Music"
  },
  description: "India's leading premium music distribution platform. Distribute to Spotify, Apple Music, and 150+ stores. Keep 100% of your royalties with Pay-Per-Release or launch your own label with our White Label SaaS.",
  
  keywords: [
    // Core Distribution
    "music distribution India", 
    "upload music on spotify", 
    "digital music aggregator", 
    "TunePlus Music", 
    "sell music online",
    "best music distribution company",
    // New High-Value Keywords
    "pay per release music distribution",
    "white label record label software",
    "start a record label in india",
    "lifetime music distribution",
    "keep 100% royalties",
    "free ISRC and UPC codes",
    "YouTube Content ID distribution",
    // Competitor Alternatives
    "DistroKid alternative India",
    "TuneCore alternative"
  ],

  // Google indexing ke liye robots settings
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

  // Social Media Previews (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.tuneplusmusic.com",
    title: "TunePlus Music | Premium Music Distribution & SaaS",
    description: "Go global with TunePlus. Distribute your music to 150+ stores, keep 100% royalties, or launch your own white-label record label.",
    siteName: "TunePlus Music",
    images: [{
      url: "/logos/tuneplus-logo.png", // Changed to your main logo for better branding
      width: 1200,
      height: 630,
      alt: "TunePlus Music Dashboard Preview",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "TunePlus Music | Sell Your Music Everywhere",
    description: "Keep 100% of your royalties. Premium distribution for independent artists and labels.",
    images: ["/logos/tuneplus-logo.png"],
  },

  // Canonical tag duplicate content issues hatane ke liye
  alternates: {
    canonical: 'https://www.tuneplusmusic.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Verification tags for Google Search Console */}
        {/* Isko Google Search Console banane ke baad update kar lena */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}