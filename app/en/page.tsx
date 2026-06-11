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
  return metadataForPage("home", "en");
}

export default function EnHome() {
  return (
    <>
      <ScrollReveal>
        <Hero locale="en" />
      </ScrollReveal>
      <ScrollReveal>
        <AboutMini locale="en" />
      </ScrollReveal>
      <ScrollReveal>
        <LatestPosts locale="en" items={posts} />
      </ScrollReveal>
      <ScrollReveal>
        <EditorsToolsForm locale="en" />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCTA locale="en" />
      </ScrollReveal>
    </>
  );
}
