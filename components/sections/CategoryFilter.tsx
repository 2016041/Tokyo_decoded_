"use client";

import type { Category, Locale } from "@/content/types";

type CategoryFilterProps = {
  categories: readonly Category[];
  selectedCategory: string;
  resultCount: number;
  locale?: Locale;
  onChange: (category: string) => void;
};

function getCategoryLabel(category: Category, locale: Locale) {
  return locale === "ja" ? category.label_ja : category.label_en;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  resultCount,
  locale = "ja",
  onChange,
}: CategoryFilterProps) {
  return (
    <div>
      <div role="group" aria-label="カテゴリフィルタ" className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isSelected = category.slug === selectedCategory;

          return (
            <button
              key={category.slug}
              type="button"
              aria-pressed={isSelected}
              data-category={category.slug}
              onClick={() => onChange(category.slug)}
              className={
                isSelected
                  ? "border border-ink bg-ink px-4 py-2 font-jp text-sm font-medium text-paper transition-colors duration-[150ms] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                  : "border border-ink bg-paper px-4 py-2 font-jp text-sm font-medium text-ink transition-colors duration-[150ms] motion-reduce:transition-none hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              }
            >
              {getCategoryLabel(category, locale)}
            </button>
          );
        })}
      </div>
      <p
        aria-live="polite"
        aria-atomic="true"
        id="filter-results-count"
        className="sr-only"
      >
        {locale === "ja"
          ? `${resultCount}件の投稿が見つかりました`
          : `${resultCount} posts found`}
      </p>
    </div>
  );
}
