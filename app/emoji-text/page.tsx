import { EmojiTextPage } from "@/components/emoji-text-page";

export const metadata = {
  title: "Emoji Text Generator - Convert Text to Emojis | Vokaso",
  description: "Convert your text into emoji-rich messages. Replace words with emojis automatically. Perfect for Instagram captions, tweets, and social media bios.",
  keywords: "emoji text, emoji text generator, text to emoji, emoji translator, instagram captions with emoji",
  openGraph: {
    title: "Emoji Text Generator - Vokaso",
    description: "Convert text to emoji-rich messages automatically. Free online tool.",
    url: "https://www.vokaso.com/emoji-text",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Text Generator - Vokaso",
    description: "Convert text to emoji-rich messages automatically.",
  },
  alternates: { canonical: "https://www.vokaso.com/emoji-text" },
};

export default function Page() {
  return <EmojiTextPage />;
}
