import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ""),
  title: {
    default: "Fancy Text Generator - Unicode Text Styles Online",
    template: "%s | Fancy Text Generator",
  },
  description:
    "Create stylish Unicode text with 12+ unique styles. Perfect for social media, messaging, and creative projects. Free online text converter with instant copy functionality.",
  keywords: [
    "fancy text",
    "unicode text",
    "text generator",
    "font generator copy and paste",
    "stylish text",
    "text converter",
    "unicode converter",
    "instagram fonts",
    "facebook text",
    "twitter fonts",
    "text styles",
    "glitch text",
    "script text",
    "bold text",
    "italic text",
    "monospace text",
    "circled text",
    "boxed text",
    "mathematical text",
    "fraktur text",
    "double struck text",
  ],
  authors: [{ name: "SymphonyIceAttack" }],
  creator: "SymphonyIceAttack",
  publisher: "SymphonyIceAttack",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: "Fancy Text Generator - Unicode Text Styles Online",
    description:
      "Create stylish Unicode text with 12+ unique styles. Perfect for social media, messaging, and creative projects. Free online text converter.",
    siteName: "Fancy Text Generator",
    images: [
      {
        url: "/images/unicode-text-showcase.jpg",
        width: 1200,
        height: 630,
        alt: "Fancy Text Generator - Unicode Text Styles Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fancy Text Generator - Unicode Text Styles Online",
    description:
      "Create stylish Unicode text with 12+ unique styles. Perfect for social media and messaging. Free online text converter with copy & paste.",
    creator: "@SymphonyIceAttack",
    images: ["/images/unicode-text-showcase.jpg"],
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
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
    languages: {
      en: process.env.NEXT_PUBLIC_SITE_URL,
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
