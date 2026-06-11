import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AboutMini } from "@/components/sections/AboutMini";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { EditorsToolsForm } from "@/components/sections/EditorsToolsForm";
import { Hero } from "@/components/sections/Hero";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { posts } from "@/content/posts";
import { metadataForPage } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return metadataForPage("home", "ja");
}

export default function Home() {
  return (
    <>
      <ScrollReveal>
        <Hero locale="ja" />
      </ScrollReveal>
      <ScrollReveal>
        <AboutMini locale="ja" />
      </ScrollReveal>
      <ScrollReveal>
        <LatestPosts locale="ja" items={posts} />
      </ScrollReveal>
      <ScrollReveal>
        <EditorsToolsForm locale="ja" />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCTA locale="ja" />
      </ScrollReveal>
    </>
  );
}
