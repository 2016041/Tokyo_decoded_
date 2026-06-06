import { posts } from "@/content/posts";
import type { Post } from "@/lib/types";

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function listPosts(): readonly Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function filterPostsByCategory(
  items: readonly Post[],
  categorySlug: string,
): readonly Post[] {
  if (categorySlug === "all") {
    return items;
  }

  return items.filter((post) => post.category === categorySlug);
}

export function getRelatedPosts(post: Post, count = 3): readonly Post[] {
  const sameCategory = posts.filter(
    (item) => item.slug !== post.slug && item.category === post.category,
  );
  const fallback = posts.filter(
    (item) =>
      item.slug !== post.slug &&
      !sameCategory.some((related) => related.slug === item.slug),
  );

  return [...sameCategory, ...fallback].slice(0, count);
}
