import type { MetadataRoute } from "next";
import { defaultMetadata } from "@/content/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultMetadata.siteUrl;
  const isProduction = siteUrl === defaultMetadata.siteUrl;

  return {
    rules: isProduction
      ? { userAgent: "*", allow: "/", disallow: [] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
