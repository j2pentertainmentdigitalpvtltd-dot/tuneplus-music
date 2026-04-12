import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ================= GLOBAL SEO CONFIGURATION =================
export const metadata: Metadata = {
  metadataBase: new URL('https://www.tuneplusmusic.com'),
  title: {
    default: "TunePlus Music | Digital Music Distribution | Sell Music on Spotify & Apple",
    template: "%s | TunePlus Music"
  },
  description: "India's leading music distribution platform. Upload music to Spotify, Apple Music, JioSaavn & TikTok. Keep 100% ownership. Start for ₹999/year.",
  
  keywords: [
    "music distribution India", 
    "upload music on spotify", 
    "digital music aggregator", 
    "TunePlus Music", 
    "upload to jiosaavn", 
    "how to release music online",
    "best music distribution company",
    "music publishing india",
    "independent artist tools",
    "DistroKid alternative India"
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

  // Social Media Previews
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.tuneplusmusic.com",
    title: "TunePlus Music | Global Distribution",
    description: "Go viral with TunePlus. Distribute your music to 150+ stores and keep all your rights.",
    siteName: "TunePlus Music",
    images: [{
      url: "/logos/og-image.png", // Make sure to put an image at this path in public folder
      width: 1200,
      height: 630,
      alt: "TunePlus Music Dashboard Preview",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "TunePlus Music | Sell Your Music Everywhere",
    description: "India's fastest growing music aggregator.",
    images: ["/logos/og-image.png"],
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
        {/* Verification tags agar Google Search Console use kar rahe ho toh yahan dalo */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}