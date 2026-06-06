import type { Metadata } from "next";
import { defaultMetadata, pageMetadata } from "@/content/seo";
import type { Locale } from "@/lib/types";

type MetadataKey = keyof typeof pageMetadata;

export const locales = ["ja", "en"] as const;

export function localizedPath(path: string, locale: Locale): string {
  if (locale === "ja") {
    return path === "/" ? "/" : path;
  }

  return path === "/" ? "/en" : `/en${path}`;
}

export function absoluteUrl(path: string): string {
  return `${defaultMetadata.siteUrl}${path === "/" ? "" : path}`;
}

export function metadataForPage(key: MetadataKey, locale: Locale): Metadata {
  const item = pageMetadata[key];
  const canonicalPath = localizedPath(item.canonicalPath, locale);
  const jaPath = item.canonicalPath;
  const enPath = localizedPath(item.canonicalPath, "en");
  const title = locale === "ja" ? item.title_ja : item.title_en;
  const description = locale === "ja" ? item.description_ja : item.description_en;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        ja: absoluteUrl(jaPath),
        en: absoluteUrl(enPath),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      images: [{ url: item.ogImage, width: 1200, height: 630, alt: title }],
      locale: locale === "ja" ? "ja_JP" : "en_US",
      alternateLocale: locale === "ja" ? "en_US" : "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: defaultMetadata.twitterSite,
      creator: defaultMetadata.twitterCreator,
    },
  };
}
