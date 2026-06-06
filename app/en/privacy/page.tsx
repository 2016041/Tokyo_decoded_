import type { Metadata } from "next";
import LegalPage from "@/app/legal-page";
import { legalContent } from "@/content/legal";
import { metadataForPage } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return metadataForPage("privacy", "en");
}

export default function EnPrivacyPage() {
  const content = legalContent.privacy;

  return (
    <LegalPage
      locale="en"
      title={content.pageTitle.en}
      lastUpdated={content.lastUpdated}
      sections={Object.entries(content.sections).map(([id, section]) => ({
        id,
        heading: section.heading.en,
        body: section.body.en,
      }))}
    />
  );
}
