import { BatchPage } from "@/components/batch-page";

export const metadata = {
  title: "Batch Pin Generator - Vokaso",
  description: "Generate 10 Pinterest pins at once and download as ZIP. Promote fancy text fonts on Pinterest.",
  alternates: { canonical: "https://www.vokaso.com/batch" },
};

export default function Page() {
  return <BatchPage />;
}
