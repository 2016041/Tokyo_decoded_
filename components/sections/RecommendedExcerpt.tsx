import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { recommendedItems, recommendedPageContent } from "@/content/recommended";
import type { Locale, RecommendedItem } from "@/content/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type RecommendedExcerptProps = {
  locale?: Locale;
  items?: readonly RecommendedItem[];
};

export function RecommendedExcerpt({
  locale = "ja",
  items = recommendedItems,
}: RecommendedExcerptProps) {
  const content = homeContent.recommended;
  const excerptItems = items.slice(0, 3);

  return (
    <section aria-labelledby="recommended-heading" className="bg-cream">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="recommended-heading"
              className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
            >
              {content.heading[locale]}
            </h2>
            <p className="mt-4 max-w-2xl font-[family-name:var(--font-jp)] text-ink">
              {content.lede[locale]}
            </p>
          </div>
          <Link
            href={content.viewAll.href}
            className="font-[family-name:var(--font-sans)] font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:ring-accent"
          >
            {content.viewAll[`label_${locale}`]}
          </Link>
        </div>

        {excerptItems.length === 0 ? (
          <div className="mt-10 border-t border-ink/20 pt-8">
            <h3 className="font-[family-name:var(--font-jp)] font-medium text-2xl text-ink">
              {recommendedPageContent.comingSoon.heading[locale]}
            </h3>
            <p className="mt-3 max-w-2xl text-ink">
              {recommendedPageContent.comingSoon.body[locale]}
            </p>
            <Button
              href={recommendedPageContent.comingSoon.cta.href}
              variant="outline"
              className="mt-6"
            >
              {recommendedPageContent.comingSoon.cta[`label_${locale}`]}
            </Button>
          </div>
        ) : (
          <ul role="list" className="mt-10 grid gap-6 md:grid-cols-3">
            {excerptItems.map((item) => (
              <li key={item.slug}>
                <article className="bg-paper border border-ink/10 p-6 md:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <Image
                    src={item.imageUrl}
                    alt={locale === "ja" ? item.imageAlt_ja : item.imageAlt_en}
                    width={400}
                    height={225}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                  <div className="mt-5">
                    <Badge
                      label={locale === "ja" ? item.prLabel_ja : item.prLabel_en}
                      aria-hidden
                    />
                    <h3 className="mt-3 font-[family-name:var(--font-jp)] font-medium text-xl text-ink">
                      {item.name[locale]}
                    </h3>
                    <p className="mt-3 text-ink">
                      {locale === "ja" ? item.description_ja : item.description_en}
                    </p>
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      aria-label={`${item.name[locale]}（外部サイト・PR）`}
                      className="mt-5 inline-flex font-[family-name:var(--font-sans)] font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                    >
                      {content.viewAll[`label_${locale}`]}
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
