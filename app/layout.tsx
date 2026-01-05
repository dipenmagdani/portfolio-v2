import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { BASE_URL, CLOUDINARY_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Viewport configuration for theme
export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dipen Magdani | Frontend Developer & Designer",
    template: "%s | Dipen Magdani",
  },
  description:
    "Dipen Magdani is a Frontend Developer and UI/UX Designer crafting scalable, high-performance web applications and immersive digital experiences. Also known as Vajratheastra.",
  keywords: [
    "Dipen Magdani",
    "Vajratheastra",
    "Vajra The Astra",
    "Frontend Developer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Portfolio",
    "Web Developer",
    "Visual Designer",
  ],
  icons: {
    icon: "/icon.png",
  },
  authors: [{ name: "Dipen Magdani", url: BASE_URL }],
  creator: "Dipen Magdani",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Dipen Magdani Portfolio",
    title: "Dipen Magdani | Frontend Developer & Designer",
    description:
      "Crafting scalable, high-performance web applications and immersive digital experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dipen Magdani - Frontend Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipen Magdani | Frontend Developer & Designer",
    description:
      "Crafting scalable, high-performance web applications and immersive digital experiences.",
    images: ["/og-image.png"],
    creator: "@dipenmagdani",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dipen Magdani Portfolio",
              url: BASE_URL,
              description:
                "Portfolio of Dipen Magdani - Frontend Developer and UI/UX Designer",
              author: {
                "@type": "Person",
                name: "Dipen Magdani",
              },
            }),
          }}
        />
        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dipen Magdani",
              alternateName: "Vajratheastra",
              url: BASE_URL,
              image: `${BASE_URL}/og-image.png`,
              jobTitle: "Frontend Developer & UI/UX Designer",
              description:
                "Frontend Developer and UI/UX Designer crafting scalable web applications and immersive digital experiences.",
              sameAs: [
                "https://www.behance.net/dipen_magdani",
                "https://github.com/dipenmagdani",
                "https://linkedin.com/in/dipenmagdani",
                "https://twitter.com/dipenmagdani",
              ],
              knowsAbout: [
                "React.js",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "UI/UX Design",
                "Adobe Photoshop",
                "Figma",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-neutral-950 text-neutral-50 selection:bg-white selection:text-black overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
