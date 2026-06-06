import { structuredDataTemplates } from "@/content/seo";

export default function JsonLdWebSite() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataTemplates.webSite),
      }}
    />
  );
}
