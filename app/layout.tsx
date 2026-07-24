import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.vokaso.com"),
  title: {
    default: "Vokaso - Stylish Text Generator for Social Media",
    template: "%s | Vokaso",
  },
  description:
    "Generate stylish Unicode text for Instagram, TikTok, Facebook, Twitter & more. 12+ font styles to make your social media bios and posts stand out. Free online tool.",
  keywords: [
    "fancy text",
    "unicode text",
    "text generator",
    "font generator copy and paste",
    "stylish text",
    "text converter",
    "instagram fonts",
    "facebook text",
    "twitter fonts",
    "text styles",
    "bold text",
    "italic text",
    "monospace text",
    "vokaso",
  ],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.vokaso.com",
    title: "Vokaso - Stylish Text Generator for Social Media",
    description:
      "Generate stylish Unicode text for Instagram, TikTok, Facebook, Twitter & more. 12+ font styles free online.",
    siteName: "Vokaso",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vokaso - Stylish Text Generator for Social Media",
    description:
      "Generate stylish Unicode text for Instagram, TikTok, Facebook, Twitter & more. 12+ font styles free online.",
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
  alternates: {
    canonical: "https://www.vokaso.com",
    languages: {
      en: "https://www.vokaso.com",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon-32x32",
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon-16x16",
        url: "/icons/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "utilities",
  classification: "Text Tools, Unicode Converter, Social Media Tools",
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="6D6D7CC718446719C37E143DA778C820" />
        <meta name="yandex-verification" content="b12f9805ac9114aa" />
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","xmpiwcf7m3");`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
