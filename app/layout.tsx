import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dipen Magdani | Frontend Developer & Designer",
    template: " Dipen Magdani",
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
  authors: [{ name: "Dipen Magdani", url: "https://www.dipen.live" }],
  creator: "Dipen Magdani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dipen.live",
    siteName: "Dipen Magdani Portfolio",
    title: "Dipen Magdani | Frontend Developer & Designer",
    description:
      "Crafting scalable, high-performance web applications and immersive digital experiences.",
    images: [
      {
        url: "/icon.png",
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
    images: ["/icon.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dipen Magdani",
              alternateName: "Vajratheastra",
              url: "https://www.dipen.live",
              jobTitle: "Frontend Developer & UI/UX Designer",
              description:
                "Frontend Developer and UI/UX Designer crafting scalable web applications and immersive digital experiences.",
              sameAs: [
                "https://www.behance.net/dipen_magdani",
                "https://github.com/dipenmagdani",
                "https://linkedin.com/in/dipenmagdani",
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
