import { CaseConverterPage } from "@/components/case-converter-page";

export const metadata = {
  title: "Case Converter - UPPERCASE, lowercase, Title Case & More | Vokaso",
  description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and more. Free online case converter tool.",
  keywords: "case converter, uppercase converter, lowercase converter, title case, camel case converter, snake case converter, text case converter",
  openGraph: {
    title: "Case Converter - Vokaso",
    description: "Convert text between uppercase, lowercase, title case, camelCase, snake_case & more. Free tool.",
    url: "https://www.vokaso.com/case-converter",
    siteName: "Vokaso",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Converter - Vokaso",
    description: "Convert text between uppercase, lowercase, title case, camelCase & more.",
  },
  alternates: { canonical: "https://www.vokaso.com/case-converter" },
};

export default function Page() {
  return <CaseConverterPage />;
}
