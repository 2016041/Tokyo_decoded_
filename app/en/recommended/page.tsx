import type { Metadata } from "next";
import { RecommendedGrid } from "@/components/sections/RecommendedGrid";
import { recommendedCategories, recommendedItems } from "@/content/recommended";
import { metadataForPage } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return metadataForPage("recommended", "en");
}

export default function EnRecommendedPage() {
  return (
    <RecommendedGrid
      locale="en"
      categories={recommendedCategories}
      items={recommendedItems}
    />
  );
}
