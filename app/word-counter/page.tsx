import { WordCounterPage } from "@/components/word-counter-page";

export const metadata = {
  title: "Word Counter - Count Words & Characters Online | Vokaso",
  description: "Free online word counter. Count words, characters, sentences, paragraphs, and reading time. Perfect for writers, students, and SEO content.",
  keywords: "word counter, word count, character counter, character count, word counter tool, count words online, essay word counter",
  openGraph: {
    title: "Word Counter - Vokaso",
    description: "Count words, characters, sentences & reading time. Free online tool.",
    url: "https://www.vokaso.com/word-counter",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter - Vokaso",
    description: "Count words, characters, sentences & reading time.",
  },
  alternates: { canonical: "https://www.vokaso.com/word-counter" },
};

export default function Page() {
  return <WordCounterPage />;
}
