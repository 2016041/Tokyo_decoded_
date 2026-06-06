import type { Metadata } from "next";
import { RecommendedGrid } from "@/components/sections/RecommendedGrid";
import { recommendedCategories, recommendedItems } from "@/content/recommended";
import { metadataForPage } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return metadataForPage("recommended", "ja");
}

export default function RecommendedPage() {
  return (
    <RecommendedGrid
      locale="ja"
      categories={recommendedCategories}
      items={recommendedItems}
    />
  );
}
