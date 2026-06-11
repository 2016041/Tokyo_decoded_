import Image from "next/image";
import Link from "next/link";
import { postCategories } from "@/content/posts";
import type { Locale, Post } from "@/content/types";
import { Badge } from "@/components/ui/Badge";

type PostCardProps = {
  post: Post;
  locale?: Locale;
  eagerLoading?: boolean;
};

function getPostTitle(post: Post, locale: Locale) {
  return locale === "ja" ? post.title_ja : post.title_en;
}

function getPostThumbnailAlt(post: Post, locale: Locale) {
  return locale === "ja" ? post.thumbnailAlt_ja : post.thumbnailAlt_en;
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
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function PostCard({
  post,
  locale = "ja",
  eagerLoading = false,
}: PostCardProps) {
  const title = getPostTitle(post, locale);
  const headingId = `post-card-title-${post.slug}`;
  const categoryLabel = getCategoryLabel(post.category, locale);

  return (
    <article aria-labelledby={headingId}>
      <Link
        href={`/posts/${post.slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
      >
        <div className="overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={getPostThumbnailAlt(post, locale)}
            width={400}
            height={225}
            loading={eagerLoading ? "eager" : "lazy"}
            fetchPriority={eagerLoading ? "high" : "auto"}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="aspect-video w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
        <div className="bg-cream border border-ink/10 p-6 md:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-colors duration-[250ms] motion-reduce:transition-none group-hover:bg-ink group-hover:text-paper">
          <p>
            <span className="sr-only">カテゴリ: </span>
            <Badge label={categoryLabel} />
          </p>
          <h3
            id={headingId}
            className="font-jp font-bold text-lg md:text-xl mt-3"
          >
            {title}
          </h3>
          <time dateTime={post.publishedAt} className="block mt-3 text-sm">
            {formatDate(post.publishedAt, locale)}
          </time>
        </div>
      </Link>
    </article>
  );
}
