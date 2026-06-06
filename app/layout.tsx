import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
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
  metadataBase: new URL("https://example.com"), // FILL: 本番URL
  title: {
    default: "サイトタイトル", // FILL
    template: "%s | サイトタイトル", // FILL
  },
  description: "サイト説明文", // FILL
  openGraph: {
    title: "サイトタイトル", // FILL
    description: "サイト説明文", // FILL
    type: "website",
    url: "https://example.com/", // FILL
    images: ["/og.jpg"],
    siteName: "サイトタイトル", // FILL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable}`}
        suppressHydrationWarning
      >
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
