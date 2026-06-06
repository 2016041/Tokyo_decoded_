import Link from "next/link";
import { homeContent } from "@/content/home";
import { posts } from "@/content/posts";
import type { Locale, Post } from "@/content/types";
import { PostCard } from "@/components/sections/PostCard";

type LatestPostsProps = {
  locale?: Locale;
  items?: readonly Post[];
};

export function LatestPosts({ locale = "ja", items = posts }: LatestPostsProps) {
  const content = homeContent.latestPosts;
  const latestItems = [...items]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <section aria-labelledby="latest-posts-heading" className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2
            id="latest-posts-heading"
            className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
          >
            {content.heading[locale]}
          </h2>
          <Link
            href={content.viewAll.href}
            className="font-[family-name:var(--font-sans)] font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            {content.viewAll[`label_${locale}`]}
          </Link>
        </div>
        <ul
          role="list"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10"
        >
          {latestItems.map((post, index) => (
            <li key={post.slug}>
              <PostCard post={post} locale={locale} eagerLoading={index < 3} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
