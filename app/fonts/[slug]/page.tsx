import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FontPageClient } from "./client";
import { textStyles } from "@/components/fancy-text-generator";

export function generateStaticParams() {
  return textStyles.map((s) => ({
    slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const style = textStyles.find(
    (s) => s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug,
  );
  if (!style) return {};
  const url = `https://www.vokaso.com/fonts/${slug}`;
  const metaDesc = `${style.name} Generator - Create ${style.name} Unicode characters online. ${style.useCase}. Copy and paste anywhere!`;
  const keywords = `${style.name.toLowerCase()}, unicode ${style.name.toLowerCase()}, ${style.name.toLowerCase()} font, fancy text generator, ${style.name.toLowerCase()} letters, social media fonts`;
  return {
    title: `${style.name} Generator - Fancy Unicode Text`,
    description: metaDesc,
    keywords,
    openGraph: {
      title: `${style.name} Generator - Vokaso`,
      description: metaDesc,
      url,
      siteName: "Vokaso",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${style.name} Generator - Vokaso`,
      description: metaDesc,
    },
    alternates: { canonical: url },
  };
}

export default async function FontPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const style = textStyles.find(
    (s) => s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug,
  );
  if (!style) notFound();

  return <FontPageClient slug={slug} />;
}
