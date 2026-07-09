import React from "react";
import Link from "next/link";
import { postCategories, postsPageContent } from "@/content/posts";
import type { Locale, Post } from "@/content/types";
import { Badge } from "@/components/ui/Badge";

type PostBodyProps = {
  post: Post;
  locale?: Locale;
  relatedPosts?: readonly Post[];
  prevPost?: Post | null;
  nextPost?: Post | null;
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

const STEP_MARKER = /[①②③④⑤⑥⑦⑧⑨⑩]/;

// 本文内の `[ラベル](URL)` 記法をリンクとして描画する。
// 内部パス（/…）と https のみ許可。それ以外の記法はプレーンテキストのまま。
const INLINE_LINK = /\[([^\]]+)\]\((\/[^\s)]+|https:\/\/[^\s)]+)\)/g;

const inlineLinkClass =
  "underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent";

function renderInline(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  const pattern = new RegExp(INLINE_LINK.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`${href}-${match.index}`} href={href} className={inlineLinkClass}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLinkClass}
        >
          {label}
        </a>,
      );
    }
    last = pattern.lastIndex;
  }
  if (nodes.length === 0) {
    return text;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

// 本文内の「①②③…」手順を番号付きリストとして描画する。
// マーカーが2つ未満の場合は従来どおり1段落で描画。
function SectionContent({ content }: { content: string }) {
  const paragraphClass = "text-base md:text-lg text-ink leading-[1.8] tracking-[0.03em]";
  const markerCount = (content.match(new RegExp(STEP_MARKER, "g")) ?? []).length;

  if (markerCount < 2) {
    return <p className={paragraphClass}>{renderInline(content)}</p>;
  }

  const segments = content.split(new RegExp(`(?=${STEP_MARKER.source})`));
  const intro = STEP_MARKER.test(segments[0]?.charAt(0) ?? "") ? null : segments.shift();
  const items = segments.map((segment) =>
    segment.replace(new RegExp(`^${STEP_MARKER.source}\\s*`), ""),
  );

  return (
    <>
      {intro ? <p className={paragraphClass}>{renderInline(intro.trim())}</p> : null}
      <ol className={`${paragraphClass} mt-4 list-decimal space-y-3 pl-6`}>
        {items.map((item, index) => (
          <li key={index}>{renderInline(item.trim())}</li>
        ))}
      </ol>
    </>
  );
}

export function PostBody({ post, locale = "ja", relatedPosts = [], prevPost = null, nextPost = null }: PostBodyProps) {
  const title = getPostTitle(post, locale);
  const categoryLabel = getCategoryLabel(post.category, locale);
  const localePrefix = locale === "en" ? "/en" : "";
  const homeHref = localePrefix || "/";
  const bodySections = [
    { id: "hook", content: post.body.hook[locale], heading: null },
    { id: "data", content: post.body.data[locale], heading: post.bodyHeadings?.data?.[locale] ?? null },
    {
      id: "explanation",
      content: post.body.explanation[locale],
      heading: post.bodyHeadings?.explanation?.[locale] ?? null,
    },
    { id: "practice", content: post.body.practice[locale], heading: post.bodyHeadings?.practice?.[locale] ?? null },
    { id: "cta", content: post.body.cta[locale], heading: post.bodyHeadings?.cta?.[locale] ?? null },
  ] as const;

  return (
    <article aria-labelledby="post-title" className="bg-paper">
      <div className="px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <div className="max-w-[760px] mx-auto">
          <nav aria-label="パンくず" className="mb-10">
            <ol className="flex flex-wrap gap-2 font-jp text-sm text-ink">
              <li>
                <Link
                  href={homeHref}
                  className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                >
                  {locale === "ja" ? "ホーム" : "Home"}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`${localePrefix}/posts`}
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
                    {section.heading ? (
                      <h3
                        id={`post-${section.id}-heading`}
                        className="font-jp font-black text-ink text-xl md:text-2xl leading-[1.5] mb-4"
                      >
                        {section.heading}
                      </h3>
                    ) : (
                      <h3 id={`post-${section.id}-heading`} className="sr-only">
                        {section.id}
                      </h3>
                    )}
                    <SectionContent content={section.content} />
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
                  href={`${localePrefix}/disclosure`}
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
                      className="block h-full border border-ink/20 p-5 transition-colors duration-[150ms] motion-reduce:transition-none hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                    >
                      <span className="block font-jp font-medium">
                        <Badge label="PR" aria-hidden className="mr-2" />
                        {link.label}
                      </span>
                      {link.note ? (
                        <span className="mt-2 block text-sm">{link.note}</span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          {relatedPosts.length > 0 && (
            <aside
              aria-labelledby="related-posts-heading"
              className="mt-14 border-t border-ink/20 pt-10"
            >
              <h2
                id="related-posts-heading"
                className="font-jp font-black text-ink text-2xl md:text-3xl"
              >
                {locale === "ja" ? "関連記事" : "Related Posts"}
              </h2>
              <ul role="list" className="mt-6 grid gap-6 sm:grid-cols-3">
                {relatedPosts.map((related) => {
                  const relatedTitle = locale === "ja" ? related.title_ja : related.title_en;
                  const relatedCategoryLabel = getCategoryLabel(related.category, locale);
                  const relatedHref = `${localePrefix}/posts/${related.slug}`;
                  return (
                    <li key={related.slug}>
                      <Link
                        href={relatedHref}
                        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                      >
                        <div className="overflow-hidden">
                          <img
                            src={related.thumbnail}
                            alt={locale === "ja" ? related.thumbnailAlt_ja : related.thumbnailAlt_en}
                            className="aspect-video w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105 motion-reduce:transition-none"
                            loading="lazy"
                          />
                        </div>
                        <div className="border border-t-0 border-ink/10 p-4 transition-colors duration-[250ms] motion-reduce:transition-none group-hover:bg-ink group-hover:text-paper">
                          <p>
                            <span className="sr-only">{locale === "ja" ? "カテゴリ: " : "Category: "}</span>
                            <Badge label={relatedCategoryLabel} />
                          </p>
                          <h3 className="font-jp font-bold text-sm mt-2 leading-[1.5]">
                            {relatedTitle}
                          </h3>
                          <time dateTime={related.publishedAt} className="block mt-2 text-xs text-muted group-hover:text-paper/70">
                            {formatDate(related.publishedAt, locale)}
                          </time>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>
          )}

          {(prevPost || nextPost) && (
            <nav
              aria-label={locale === "ja" ? "前後の記事" : "Previous and next posts"}
              className="mt-14 border-t border-ink/20 pt-10"
            >
              <div className="grid grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`${localePrefix}/posts/${prevPost.slug}`}
                    className="group block border border-ink/20 p-5 transition-colors duration-[150ms] motion-reduce:transition-none hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                  >
                    <span className="block text-xs text-muted mb-2 group-hover:text-paper/70">
                      ← {locale === "ja" ? "前の記事" : "Previous"}
                    </span>
                    <span className="block font-jp font-medium text-sm leading-[1.5]">
                      {locale === "ja" ? prevPost.title_ja : prevPost.title_en}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link
                    href={`${localePrefix}/posts/${nextPost.slug}`}
                    className="group block border border-ink/20 p-5 text-right transition-colors duration-[150ms] motion-reduce:transition-none hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                  >
                    <span className="block text-xs text-muted mb-2 group-hover:text-paper/70">
                      {locale === "ja" ? "次の記事" : "Next"} →
                    </span>
                    <span className="block font-jp font-medium text-sm leading-[1.5]">
                      {locale === "ja" ? nextPost.title_ja : nextPost.title_en}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </article>
  );
}
