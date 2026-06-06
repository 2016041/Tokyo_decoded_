import Link from "next/link";
import { siteContent } from "@/content/site";

type NavigationProps = {
  includeHome?: boolean;
  className?: string;
  linkClassName?: string;
  onNavigate?: never;
};

const baseLinkClassName =
  "font-[family-name:var(--font-sans)] text-sm font-medium text-ink transition-colors duration-[150ms] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent motion-reduce:transition-none";

export default function Navigation({
  includeHome = false,
  className,
  linkClassName,
}: NavigationProps) {
  const navItems = includeHome
    ? siteContent.nav
    : siteContent.nav.filter((item) => item.href !== "/");

  return (
    <nav aria-label="グローバルナビゲーション" className={className}>
      <ul role="list" className="flex items-center gap-7">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={[baseLinkClassName, linkClassName]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label_ja}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
