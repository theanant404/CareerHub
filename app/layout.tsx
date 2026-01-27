import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import { AuthSessionProvider } from "@/provider/auth-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: {
    default: "CareerHub | AI-Powered Internships, Jobs & Scholarships",
    template: "%s | CareerHub",
  },
  description: "CareerHub is the next-gen AI career platform for students. Get matched with verified internships, global scholarships, and entry-level jobs based on your unique skill DNA.",
  keywords: ["internships for students", "AI job matching", "scholarships 2026", "software engineering internships", "entry level tech jobs", "career growth platform"],
  authors: [{ name: "CareerHub Team" }],
  creator: "CareerHub",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://career-hub-vert.vercel.app",
    title: "CareerHub - Smart AI Matching for Your Career",
    description: "Connect with verified companies and global opportunities. Stop applying blindly—get matched with AI.",
    siteName: "CareerHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerHub Platform Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CareerHub | Smart Internships & Jobs",
    description: "AI-driven career platform helping students find their dream roles faster.",
    images: ["/og-image.png"],
    creator: "@careerhub",
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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} style={{
        "--font-geist": _geist.style.fontFamily,
        "--font-geist-mono": _geistMono.style.fontFamily,
      } as React.CSSProperties}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>

          <ScrollToTop />
          <Toaster />
          <Analytics />
        </ThemeProvider>
        <Script
          id="voiceflow-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, t) {
                var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                v.onload = function() {
                  window.voiceflow.chat.load({
                    verify: { projectID: '6958086b54ef746693b41e3c' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    voice: {
                      url: "https://runtime-api.voiceflow.com"
                    }
                  });
                }
                v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
              })(document, 'script');
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CareerHub",
              "url": "https://career-hub-vert.vercel.app",
              "logo": "https://career-hub-vert.vercel.app/logo.png",
              "sameAs": [
                "https://linkedin.com/in/careerhub",
                "https://twitter.com/careerhub"
              ],
              "description": "An AI-powered platform connecting students with jobs, internships, and scholarships."
            }),
          }}
        />
      </body>
    </html>
  )
}
