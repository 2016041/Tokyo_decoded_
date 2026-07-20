import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import JsonLdOrganization from "@/components/seo/JsonLdOrganization";
import JsonLdWebSite from "@/components/seo/JsonLdWebSite";
import { defaultMetadata, structuredDataTemplates } from "@/content/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

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
  // max-image-preview:large は Google Discover 掲載の必須要件
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable}`}
        suppressHydrationWarning
      >
        <JsonLdWebSite />
        <JsonLdOrganization />
        <SkipLink />
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="relative w-full max-w-full"
        >
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Suspense fallback={null}>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
        </Suspense>
      </body>
    </html>
  );
}
