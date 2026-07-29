import { NicknamePage } from "@/components/nickname-page";

export const metadata = {
  title: "Nickname Generator - Cool Gaming Usernames & Instagram Names | Vokaso",
  description: "Generate unique gaming nicknames, Instagram handles, and cool usernames with our free nickname generator. Hundreds of combinations instantly.",
  keywords: "nickname generator, gaming username generator, cool nicknames, username generator, gaming names, instagram username generator",
  openGraph: {
    title: "Nickname Generator - Vokaso",
    description: "Generate cool gaming usernames, Instagram handles & nicknames. Free tool.",
    url: "https://www.vokaso.com/nickname-generator",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nickname Generator - Vokaso",
    description: "Generate cool gaming usernames, Instagram handles & nicknames.",
  },
  alternates: { canonical: "https://www.vokaso.com/nickname-generator" },
};

export default function Page() {
  return <NicknamePage />;
}
