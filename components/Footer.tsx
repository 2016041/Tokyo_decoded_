import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site";
import type { SocialAccount } from "@/content/types";
import Container from "./Container";

const focusOnInkClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-accent";

const footerLinkClassName =
  "font-[family-name:var(--font-jp)] text-sm font-medium text-cream transition-colors duration-[150ms] hover:text-paper motion-reduce:transition-none";

function SocialIcon({ platform }: { platform: SocialAccount["platform"] }) {
  if (platform === "youtube") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className="h-6 w-6"
      >
        <path
          d="M21 8.5c0-1.7-1.3-3-3-3H6c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3v-7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className="h-6 w-6"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M17 7.5h.01" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  if (platform === "x") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className="h-6 w-6"
      >
        <path
          d="m5 4 14 16M19 4 5 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="h-6 w-6"
    >
      <path
        d="M14 4v11.5A4.5 4.5 0 1 1 9.5 11H11v3H9.5A1.5 1.5 0 1 0 11 15.5V4h3Zm0 0c.6 2.8 2.4 4.4 5 4.5v3c-2.1 0-3.8-.7-5-2v-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const footerNavItems = [
    ...siteContent.nav.filter((item) => item.href !== "/"),
    { href: "/privacy", label_ja: "プライバシーポリシー", label_en: "Privacy" },
    {
      href: "/disclosure",
      label_ja: "アフィリエイト開示",
      label_en: "Disclosure",
    },
  ];

  return (
    <footer role="contentinfo" className="bg-ink text-paper">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
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

            <nav aria-label="ソーシャルリンク" className="mt-8">
              <ul role="list" className="flex flex-wrap gap-3">
                {siteContent.social.map((account) => (
                  <li key={account.id}>
                    <a
                      href={account.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={`${account.label} で Tokyo Decoded をフォロー（外部サイト）`}
                      className={[
                        "inline-flex h-11 w-11 items-center justify-center rounded-none border border-muted-light text-cream transition-colors duration-[150ms] hover:text-paper motion-reduce:transition-none",
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
            <nav aria-label="フッターナビゲーション">
              <ul
                role="list"
                className="grid gap-3 border-t border-muted-light pt-6 sm:grid-cols-2"
              >
                {footerNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[footerLinkClassName, focusOnInkClassName]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label_ja}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 border-t border-muted-light pt-6">
              <p className="max-w-3xl text-muted-light">
                <small>{siteContent.footer.disclosureNote_ja}</small>
              </p>
              <p className="mt-4 text-muted-light">
                <small>{siteContent.footer.copyright_ja}</small>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
