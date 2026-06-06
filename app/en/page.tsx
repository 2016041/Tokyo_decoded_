import type { Metadata } from "next";
import { AboutMini } from "@/components/sections/AboutMini";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { EditorsToolsForm } from "@/components/sections/EditorsToolsForm";
import { Hero } from "@/components/sections/Hero";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { RecommendedExcerpt } from "@/components/sections/RecommendedExcerpt";
import { posts } from "@/content/posts";
import { recommendedItems } from "@/content/recommended";
import { metadataForPage } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return metadataForPage("home", "en");
}

export default function EnHome() {
  return (
    <>
      <Hero locale="en" />
      <AboutMini locale="en" />
      <LatestPosts locale="en" items={posts} />
      <EditorsToolsForm locale="en" />
      <RecommendedExcerpt locale="en" items={recommendedItems} />
      <ContactCTA locale="en" />
    </>
  );
}
