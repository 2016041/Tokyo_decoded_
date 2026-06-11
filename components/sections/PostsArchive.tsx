"use client";

import { useMemo, useState } from "react";
import { postCategories, posts, postsPageContent } from "@/content/posts";
import type { Category, Locale, Post } from "@/content/types";
import { CategoryFilter } from "@/components/sections/CategoryFilter";
import { PostCard } from "@/components/sections/PostCard";

type PostsArchiveProps = {
  locale?: Locale;
  items?: readonly Post[];
  categories?: readonly Category[];
};

export function PostsArchive({
  locale = "ja",
  items = posts,
  categories = postCategories,
}: PostsArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return items;
    }

    return items.filter((post) => post.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <section aria-labelledby="posts-archive-heading" className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h1
          id="posts-archive-heading"
          className="font-jp font-black text-ink text-4xl md:text-5xl"
        >
          {postsPageContent.heading[locale]}
        </h1>
        <div className="mt-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            resultCount={filteredPosts.length}
            locale={locale}
            onChange={setSelectedCategory}
          />
        </div>

        {filteredPosts.length === 0 ? (
          <p className="mt-10 text-ink">{postsPageContent.noResults[locale]}</p>
        ) : (
          <ul
            role="list"
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post, index) => (
              <li key={post.slug}>
                <PostCard post={post} locale={locale} eagerLoading={index < 3} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
