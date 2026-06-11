"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/content/site";
import type { Locale } from "@/content/types";

type NavigationProps = {
  includeHome?: boolean;
  className?: string;
  linkClassName?: string;
  onNavigate?: never;
};

const baseLinkClassName =
  "font-sans text-sm font-medium text-ink transition-colors duration-[150ms] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent motion-reduce:transition-none";

function getLocale(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ja";
}

function getLocalizedHref(href: string, locale: Locale): string {
  if (locale === "ja") {
    return href;
  }

  return href === "/" ? "/en" : `/en${href}`;
}

export default function Navigation({
  includeHome = false,
  className,
  linkClassName,
}: NavigationProps) {
  const pathname = usePathname();
  const locale = getLocale(pathname ?? "/");
  const navItems = includeHome
    ? siteContent.nav
    : siteContent.nav.filter((item) => item.href !== "/");

  return (
    <nav aria-label="グローバルナビゲーション" className={className}>
      <ul role="list" className="flex items-center gap-7">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={getLocalizedHref(item.href, locale)}
              className={[baseLinkClassName, linkClassName]
                .filter(Boolean)
                .join(" ")}
            >
              {item[`label_${locale}`]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
