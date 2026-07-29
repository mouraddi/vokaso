import { SmallTextPage } from "@/components/small-text-page";

export const metadata = {
  title: "Small Text Generator - Superscript & Subscript | Vokaso",
  description: "Generate tiny text with superscript and subscript characters. Perfect for footnotes, formulas, and aesthetic usernames. Free online small text generator.",
  keywords: "small text, small text generator, superscript, subscript, tiny text, small font generator, aesthetic text",
  openGraph: {
    title: "Small Text Generator - Vokaso",
    description: "Generate tiny text with superscript & subscript. Free online tool.",
    url: "https://www.vokaso.com/small-text",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Text Generator - Vokaso",
    description: "Generate tiny text with superscript & subscript. Free online tool.",
  },
  alternates: { canonical: "https://www.vokaso.com/small-text" },
};

export default function Page() {
  return <SmallTextPage />;
}
