"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/content/site";
import type { SocialAccount } from "@/content/types";
import Container from "./Container";

const focusOnInkClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-accent";

const footerLinkClassName =
  "text-sm font-medium text-cream transition-colors duration-[150ms] hover:text-paper motion-reduce:transition-none";

function SocialIcon({ platform }: { platform: SocialAccount["platform"] }) {
  const iconClassName = platform === "youtube" ? "h-6 w-6" : "h-5 w-5";

  if (platform === "youtube") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className={iconClassName}
      >
        <path
          d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.38.51A3 3 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 0 0 2.12 2.13c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3 3 0 0 0 2.12-2.13c.5-1.88.5-5.8.5-5.8s0-3.92-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className={iconClassName}
      >
        <path
          d="M7.6 2h8.8A5.6 5.6 0 0 1 22 7.6v8.8a5.6 5.6 0 0 1-5.6 5.6H7.6A5.6 5.6 0 0 1 2 16.4V7.6A5.6 5.6 0 0 1 7.6 2Zm0 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "x") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className={iconClassName}
      >
        <path
          d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.63 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.94 6.07-6.94Zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={iconClassName}
    >
      <path
        d="M12.53.02c1.3-.02 2.6-.01 3.9-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1 0-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const locale: SocialAccount["locale"] = pathname.startsWith("/en")
    ? "en"
    : "ja";
  const socialAccounts = siteContent.social.filter(
    (account) => account.locale === locale,
  );
  const footerNavItems = [
    ...siteContent.nav.filter((item) => item.href !== "/"),
    { href: "/privacy", label_ja: "プライバシーポリシー", label_en: "Privacy" },
    {
      href: "/disclosure",
      label_ja: "アフィリエイト開示",
      label_en: "Disclosure",
    },
    {
      href: "/editorial-policy",
      label_ja: "編集ポリシー",
      label_en: "Editorial Policy",
    },
  ];
  const localizeHref = (href: string) =>
    locale === "en" && href.startsWith("/") ? `/en${href}` : href;

  return (
    <footer role="contentinfo" className="bg-ink text-paper">
      <Container className="py-[clamp(72px,10vw,112px)]">
        <div className="grid gap-14 border-t border-paper pt-8 md:grid-cols-[1.1fr_1.4fr] md:gap-16">
          <div>
            <Link
              href="/"
              className={["inline-block", focusOnInkClassName].join(" ")}
            >
              <Image
                src="/brand/logo-mark-white.svg"
                alt="Tokyo Decoded"
                width={72}
                height={72}
                className="h-16 w-16"
              />
            </Link>
            <p className="mt-8 max-w-md font-display text-4xl font-bold leading-none text-paper md:text-5xl">
              Tokyo Decoded
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-light">
              Decoding the world from Tokyo, decoding Japan for the world.
            </p>

            <nav
              aria-label={locale === "ja" ? "ソーシャルリンク" : "Social links"}
              className="mt-8"
            >
              <ul role="list" className="flex flex-wrap gap-3">
                {socialAccounts.map((account) => (
                  <li key={account.id}>
                    <a
                      href={account.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={
                        locale === "ja"
                          ? `${account.label} で Tokyo Decoded をフォロー（外部サイト）`
                          : `Follow Tokyo Decoded on ${account.label} (opens in a new tab)`
                      }
                      className={[
                        "inline-flex h-11 w-11 items-center justify-center rounded-none border border-muted-light bg-ink text-paper transition-colors duration-[150ms] hover:bg-paper hover:text-ink motion-reduce:transition-none",
                        focusOnInkClassName,
                      ].join(" ")}
                    >
                      <SocialIcon platform={account.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <nav
              aria-label={
                locale === "ja" ? "フッターナビゲーション" : "Footer navigation"
              }
            >
              <ul
                role="list"
                className="grid gap-x-10 gap-y-4 sm:grid-cols-2"
              >
                {footerNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizeHref(item.href)}
                      className={[
                        footerLinkClassName,
                        locale === "ja" ? "font-jp" : "font-sans",
                        focusOnInkClassName,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {locale === "ja" ? item.label_ja : item.label_en}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 border-t border-muted-light pt-6">
              <p className="max-w-3xl text-muted-light">
                <small>
                  {locale === "ja"
                    ? siteContent.footer.disclosureNote_ja
                    : siteContent.footer.disclosureNote_en}
                </small>
              </p>
              <p className="mt-4 text-muted-light">
                <small>
                  {locale === "ja"
                    ? siteContent.footer.copyright_ja
                    : siteContent.footer.copyright_en}
                </small>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
