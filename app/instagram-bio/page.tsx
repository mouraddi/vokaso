import { InstagramBioPage } from "@/components/instagram-bio-page";

export const metadata = {
  title: "Instagram Bio Generator - 100+ Bio Templates | Vokaso",
  description: "100+ Instagram bio templates for aesthetic, love, funny, gaming, business, baddie, and more. Free copy-paste bios for your Instagram profile.",
  keywords: "instagram bio, instagram bio generator, bio for instagram, aesthetic bio, cute bio, gaming bio, funny bio, instagram bio ideas",
  openGraph: {
    title: "Instagram Bio Generator - Vokaso",
    description: "100+ Instagram bio templates. Aesthetic, funny, gaming, love & more. Free copy-paste.",
    url: "https://www.vokaso.com/instagram-bio",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Bio Generator - Vokaso",
    description: "100+ Instagram bio templates. Aesthetic, funny, gaming, love & more.",
  },
  alternates: { canonical: "https://www.vokaso.com/instagram-bio" },
};

export default function Page() {
  return <InstagramBioPage />;
}
