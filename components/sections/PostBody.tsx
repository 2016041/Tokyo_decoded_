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
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <nav aria-label="パンくず" className="mb-10">
          <ol className="flex flex-wrap gap-2 font-[family-name:var(--font-jp)] text-sm text-ink">
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

        <header>
          <p>
            <span className="sr-only">カテゴリ: </span>
            <Badge label={categoryLabel} />
          </p>
          <h1
            id="post-title"
            className="mt-5 max-w-4xl font-[family-name:var(--font-jp)] font-black text-ink text-4xl md:text-5xl"
          >
            {title}
          </h1>
          <time dateTime={post.publishedAt} className="mt-5 block text-sm text-muted">
            {formatDate(post.publishedAt, locale)}
          </time>
        </header>

        <section aria-labelledby="post-body-heading" className="mt-14 max-w-3xl">
          <h2 id="post-body-heading" className="sr-only">
            {title}
          </h2>
          <div className="space-y-10">
            {bodySections.map((section) => (
              <section key={section.id} aria-labelledby={`post-${section.id}-heading`}>
                <h3 id={`post-${section.id}-heading`} className="sr-only">
                  {section.id}
                </h3>
                <p className="font-[family-name:var(--font-jp)] text-base md:text-lg text-ink">
                  {section.content}
                </p>
              </section>
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
              className="font-[family-name:var(--font-jp)] font-black text-ink text-2xl md:text-3xl"
            >
              {locale === "ja" ? "関連ツール・商品（PR）" : "Related Tools and Products (PR)"}
            </h2>
            <p className="mt-4 max-w-3xl text-ink">
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
                    <span className="block font-[family-name:var(--font-jp)] font-medium">
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
    </article>
  );
}
