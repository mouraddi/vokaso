import { UpsideDownPage } from "@/components/upside-down-page";

export const metadata = {
  title: "Upside Down Text Generator - Flip Text ˙uʍop ǝpᴉsdn | Vokaso",
  description: "Flip text upside down instantly. Type normally and get it flipped. Perfect for funny social media posts, aesthetic usernames, and pranks.",
  keywords: "upside down text, upside down text generator, flip text, fliptext, upside down font, text flipper",
  openGraph: {
    title: "Upside Down Text Generator - Vokaso",
    description: "Flip text upside down instantly. Free online tool.",
    url: "https://www.vokaso.com/upside-down",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upside Down Text Generator - Vokaso",
    description: "Flip text upside down instantly.",
  },
  alternates: { canonical: "https://www.vokaso.com/upside-down" },
};

export default function Page() {
  return <UpsideDownPage />;
}
