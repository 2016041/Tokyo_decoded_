import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { posts } from "@/content/posts";
import type { Locale, Post } from "@/content/types";

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
      <div className="mx-auto max-w-[1200px] px-[5vw] py-[clamp(88px,12vw,136px)] lg:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h2
              id="latest-posts-heading"
              className="font-display text-[clamp(2.6rem,5.2vw,5.2rem)] font-bold leading-none text-ink"
            >
              {content.heading.en}
            </h2>
            <p className="mt-4 font-jp text-xl font-medium text-ink">
              {content.heading[locale]}
            </p>
          </div>
          <Link
            href={content.viewAll.href}
            className="border-b border-ink pb-1 font-sans text-sm font-medium uppercase tracking-widest text-ink hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            {content.viewAll[`label_${locale}`]}
          </Link>
        </div>
        {latestItems.length > 0 ? (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestItems.map((post, index) => (
              <article
                key={post.slug}
                aria-labelledby={`latest-post-${post.slug}`}
                className="bg-cream"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex h-full flex-col border border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                >
                  <div className="overflow-hidden border-b border-ink">
                    <Image
                      src={post.thumbnail}
                      alt={locale === "ja" ? post.thumbnailAlt_ja : post.thumbnailAlt_en}
                      width={800}
                      height={450}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                      className="aspect-[16/11] w-full transform-gpu object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="flex grow flex-col p-6 transition-colors duration-[250ms] group-hover:bg-ink group-hover:text-paper motion-reduce:transition-none md:p-7">
                    <time
                      dateTime={post.publishedAt}
                      className="font-sans text-xs font-medium uppercase tracking-widest text-accent group-hover:text-paper"
                    >
                      {post.publishedAt}
                    </time>
                    <h3
                      id={`latest-post-${post.slug}`}
                      className="mt-4 font-jp text-xl font-black leading-tight"
                    >
                      {locale === "ja" ? post.title_ja : post.title_en}
                    </h3>
                    <p className="line-clamp-3 mt-4 text-sm leading-relaxed md:text-base">
                      {locale === "ja" ? post.excerpt_ja : post.excerpt_en}
                    </p>
                    <p className="mt-8 border-t border-ink pt-4 font-sans text-xs font-medium uppercase tracking-widest group-hover:border-paper">
                      {locale === "ja" ? "続きを読む" : "Read more"}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
            {Array.from({ length: Math.max(0, 3 - latestItems.length) }).map((_, index) => (
              <article
                key={`post-placeholder-${index}`}
                className="min-h-[360px] border border-ink bg-paper p-6 md:p-7"
              >
                <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink">
                  Coming Soon
                </p>
                <h3 className="mt-4 font-jp text-xl font-black leading-tight text-ink">
                  {locale === "ja" ? "次の記事を準備中です" : "Next story in progress"}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink md:text-base">
                  {locale === "ja"
                    ? "新しいリサーチ記事を公開次第、ここに表示します。"
                    : "A new research story will appear here once published."}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-ink bg-cream p-8">
            <p className="font-jp text-lg font-medium text-ink">
              {locale === "ja" ? "投稿を準備中です。" : "Posts are coming soon."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
