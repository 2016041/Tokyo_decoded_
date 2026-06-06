import { structuredDataTemplates } from "@/content/seo";

export default function JsonLdOrganization() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.organization),
      }}
    />
  );
}
