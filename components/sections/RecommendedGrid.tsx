import Image from "next/image";
import { recommendedCategories, recommendedItems, recommendedPageContent } from "@/content/recommended";
import type { Locale, RecommendedCategory, RecommendedItem } from "@/content/types";
import { Badge } from "@/components/ui/Badge";

type RecommendedGridProps = {
  locale?: Locale;
  categories?: readonly RecommendedCategory[];
  items?: readonly RecommendedItem[];
};

function getCategoryItems(items: readonly RecommendedItem[], category: RecommendedCategory) {
  if (category.slug === "all") {
    return [];
  }

  return items.filter((item) => item.category === category.slug);
}

export function RecommendedGrid({
  locale = "ja",
  categories = recommendedCategories,
  items = recommendedItems,
}: RecommendedGridProps) {
  if (items.length === 0) {
    return (
      <section aria-labelledby="coming-soon-heading" className="bg-paper">
        <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
          <h1 className="font-[family-name:var(--font-jp)] font-black text-ink text-4xl md:text-5xl">
            {recommendedPageContent.meta.heading[locale]}
          </h1>
          <p className="mt-5 max-w-3xl text-ink">
            {recommendedPageContent.meta.subheading[locale]}
          </p>
          <div className="mt-12 border-t border-ink/20 pt-10">
            <h2
              id="coming-soon-heading"
              className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
            >
              {recommendedPageContent.comingSoon.heading[locale]}
            </h2>
            <p className="mt-4 max-w-3xl text-ink">
              {recommendedPageContent.comingSoon.body[locale]}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="recommended-grid-heading" className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h1
          id="recommended-grid-heading"
          className="font-[family-name:var(--font-jp)] font-black text-ink text-4xl md:text-5xl"
        >
          {recommendedPageContent.meta.heading[locale]}
        </h1>
        <p className="mt-5 max-w-3xl text-ink">
          {recommendedPageContent.disclosure[locale]}
        </p>

        <div className="mt-12 space-y-14">
          {categories.map((category) => {
            const categoryItems = getCategoryItems(items, category);
            if (categoryItems.length === 0) {
              return null;
            }

            const headingId = `category-${category.slug}-heading`;

            return (
              <section key={category.slug} aria-labelledby={headingId}>
                <h2
                  id={headingId}
                  className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
                >
                  {locale === "ja" ? category.label_ja : category.label_en}
                </h2>
                <ul role="list" className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.map((item) => (
                    <li key={item.slug}>
                      <article
                        aria-labelledby={`rec-${item.slug}-heading`}
                        className="border border-ink/10 bg-cream p-6 md:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={locale === "ja" ? item.imageAlt_ja : item.imageAlt_en}
                          width={400}
                          height={225}
                          loading="lazy"
                          className="aspect-video w-full object-cover"
                        />
                        <Badge
                          label={locale === "ja" ? item.prLabel_ja : item.prLabel_en}
                          aria-hidden
                          className="mt-5"
                        />
                        <h3
                          id={`rec-${item.slug}-heading`}
                          className="mt-3 font-[family-name:var(--font-jp)] font-medium text-xl text-ink"
                        >
                          {item.name[locale]}
                        </h3>
                        <p className="mt-3 text-ink">
                          {locale === "ja" ? item.description_ja : item.description_en}
                        </p>
                        <a
                          href={item.affiliateUrl}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          aria-label={`${item.name[locale]} — 公式サイトを開く（外部サイト・PR）`}
                          className="mt-5 inline-flex font-[family-name:var(--font-sans)] font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:ring-accent"
                        >
                          {item.name[locale]}
                        </a>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
