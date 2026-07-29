import { ZalgoPage } from "@/components/zalgo-page";

export const metadata = {
  title: "Zalgo Text Generator - Creepy Glitch Text | Vokaso",
  description:
    "Generate creepy Zalgo text with glitch and horror effects. Perfect for scary usernames, creepy bios, and spooky content. Free online tool.",
  keywords:
    "zalgo text, zalgo text generator, glitch text, creepy text, horror text, scary text generator, zalgo font",
  openGraph: {
    title: "Zalgo Text Generator - Vokaso",
    description:
      "Generate creepy Zalgo text with glitch and horror effects. Free online tool.",
    url: "https://www.vokaso.com/zalgo",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zalgo Text Generator - Vokaso",
    description:
      "Generate creepy Zalgo text with glitch and horror effects. Free online tool.",
  },
  alternates: {
    canonical: "https://www.vokaso.com/zalgo",
  },
};

export default function Page() {
  return <ZalgoPage />;
}
