import type { Metadata } from "next";
import "./globals.css";

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
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
