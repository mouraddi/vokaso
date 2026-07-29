import { BubblePage } from "@/components/bubble-page";

export const metadata = {
  title: "Bubble Text Generator - ⓒⓘⓡⓒⓛⓔⓓ ⓛⓔⓣⓣⓔⓡⓢ | Vokaso",
  description: "Create bubble text with circled letters for Instagram, TikTok, and gaming usernames. Free online bubble text generator.",
  keywords: "bubble text, bubble text generator, circled text, ⓑⓤⓑⓑⓛⓔ font, circled letters, fancy text",
  openGraph: {
    title: "Bubble Text Generator - Vokaso",
    description: "Create ⓑⓤⓑⓑⓛⓔ text with circled letters. Free online tool.",
    url: "https://www.vokaso.com/bubble-text",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bubble Text Generator - Vokaso",
    description: "Create ⓑⓤⓑⓑⓛⓔ text with circled letters. Free online tool.",
  },
  alternates: { canonical: "https://www.vokaso.com/bubble-text" },
};

export default function Page() {
  return <BubblePage />;
}
