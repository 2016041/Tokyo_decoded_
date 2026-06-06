import type { Metadata } from "next";
import JsonLdOrganization from "@/components/seo/JsonLdOrganization";
import JsonLdWebSite from "@/components/seo/JsonLdWebSite";
import { defaultMetadata, structuredDataTemplates } from "@/content/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(defaultMetadata.siteUrl),
  title: {
    default: defaultMetadata.defaultTitle,
    template: defaultMetadata.titleTemplate,
  },
  description: defaultMetadata.defaultDescription,
  openGraph: {
    title: defaultMetadata.defaultTitle,
    description: defaultMetadata.defaultDescription,
    url: defaultMetadata.siteUrl,
    siteName: structuredDataTemplates.webSite.name,
    images: [
      {
        url: defaultMetadata.defaultOgImage,
        width: 1200,
        height: 630,
        alt: structuredDataTemplates.webSite.name,
      },
    ],
    locale: defaultMetadata.locale,
    alternateLocale: defaultMetadata.alternateLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: defaultMetadata.twitterSite,
    creator: defaultMetadata.twitterCreator,
  },
  alternates: {
    canonical: defaultMetadata.siteUrl,
    languages: {
      "ja-JP": defaultMetadata.siteUrl,
      "en-US": `${defaultMetadata.siteUrl}/en`,
    },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning>
        <JsonLdWebSite />
        <JsonLdOrganization />
        {children}
      </body>
    </html>
  );
}
