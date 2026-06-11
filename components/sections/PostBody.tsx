import React from "react";
import Link from "next/link";
import { postCategories, postsPageContent } from "@/content/posts";
import type { Locale, Post } from "@/content/types";
import { Badge } from "@/components/ui/Badge";

type PostBodyProps = {
  post: Post;
  locale?: Locale;
};

function getPostTitle(post: Post, locale: Locale) {
  return locale === "ja" ? post.title_ja : post.title_en;
}

function getCategoryLabel(categorySlug: string, locale: Locale) {
  const category = postCategories.find((item) => item.slug === categorySlug);
  if (!category) {
    return categorySlug;
  }

  return locale === "ja" ? category.label_ja : category.label_en;
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function PostBody({ post, locale = "ja" }: PostBodyProps) {
  const title = getPostTitle(post, locale);
  const categoryLabel = getCategoryLabel(post.category, locale);
  const bodySections = [
    { id: "hook", content: post.body.hook[locale] },
    { id: "data", content: post.body.data[locale] },
    { id: "explanation", content: post.body.explanation[locale] },
    { id: "practice", content: post.body.practice[locale] },
    { id: "cta", content: post.body.cta[locale] },
  ] as const;

  return (
    <article aria-labelledby="post-title" className="bg-paper">
      <div className="px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <div className="max-w-[760px] mx-auto">
          <nav aria-label="パンくず" className="mb-10">
            <ol className="flex flex-wrap gap-2 font-jp text-sm text-ink">
              <li>
                <Link
                  href="/"
                  className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                >
                  {locale === "ja" ? "ホーム" : "Home"}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/posts"
                  className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                >
                  {postsPageContent.heading[locale]}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{title}</li>
            </ol>
          </nav>

          <header className="border-b border-ink/10 pb-10">
            <p>
              <span className="sr-only">カテゴリ: </span>
              <Badge label={categoryLabel} />
            </p>
            <h1
              id="post-title"
              className="mt-5 font-jp font-black text-ink text-3xl md:text-4xl leading-[1.35] tracking-[-0.01em]"
            >
              {title}
            </h1>
            <time dateTime={post.publishedAt} className="mt-5 block text-sm text-muted">
              {formatDate(post.publishedAt, locale)}
            </time>
            {post.thumbnail && (
              <figure className="mt-8">
                <img
                  src={post.thumbnail}
                  alt={locale === "ja" ? post.thumbnailAlt_ja : post.thumbnailAlt_en}
                  className="w-full aspect-video object-cover"
                  loading="eager"
                />
              </figure>
            )}
          </header>

          <section aria-labelledby="post-body-heading" className="mt-12">
            <h2 id="post-body-heading" className="sr-only">
              {title}
            </h2>
            <div className="space-y-8">
              {bodySections.map((section, index) => (
                <React.Fragment key={section.id}>
                  <section aria-labelledby={`post-${section.id}-heading`}>
                    <h3 id={`post-${section.id}-heading`} className="sr-only">
                      {section.id}
                    </h3>
                    <p className="text-base md:text-lg text-ink leading-[1.8] tracking-[0.03em]">
                      {section.content}
                    </p>
                  </section>
                  {/* dataセクション（index=1）の後：数字・データを視覚化 */}
                  {index === 1 && post.bodyImage1 && (
                    <figure>
                      <img
                        src={post.bodyImage1}
                        alt={locale === "ja" ? (post.bodyImage1Alt_ja ?? "") : (post.bodyImage1Alt_en ?? "")}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                    </figure>
                  )}
                  {/* practiceセクション（index=3）の後：実践イメージを補強 */}
                  {index === 3 && post.bodyImage2 && (
                    <figure>
                      <img
                        src={post.bodyImage2}
                        alt={locale === "ja" ? (post.bodyImage2Alt_ja ?? "") : (post.bodyImage2Alt_en ?? "")}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                    </figure>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          {post.affiliateLinks.length > 0 ? (
            <aside
              aria-labelledby="affiliate-links-heading"
              className="mt-14 border-t border-ink/20 pt-10"
            >
              <h2
                id="affiliate-links-heading"
                className="font-jp font-black text-ink text-2xl md:text-3xl"
              >
                {locale === "ja" ? "関連ツール・商品（PR）" : "Related Tools and Products (PR)"}
              </h2>
              <p className="mt-4 text-ink">
                <strong>{locale === "ja" ? "PR・広告" : "Sponsored"}</strong>
                {locale === "ja"
                  ? "：以下のリンクはアフィリエイトリンクを含みます。"
                  : ": The links below may include affiliate links."}{" "}
                <Link
                  href="/disclosure"
                  className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                >
                  {locale === "ja" ? "詳細はこちら" : "Disclosure"}
                </Link>
              </p>
              <ul role="list" className="mt-6 grid gap-4 md:grid-cols-2">
                {post.affiliateLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      aria-label={`${link.label}（外部サイト・PR）`}
                      className="block border border-ink/20 p-5 transition-colors duration-[150ms] motion-reduce:transition-none hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                    >
                      <span className="block font-jp font-medium">
                        <Badge label="PR" aria-hidden className="mr-2" />
                        {link.label}
                      </span>
                      <span className="mt-2 block text-sm">{link.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </div>
    </article>
  );
}
