// lib/td.ts — REDESIGN 2026-07 共通ヘルパー（サーバー安全・純関数）
import { posts, postCategories } from "@/content/posts";
import type { Post } from "@/content/types";

type Locale = "ja" | "en";

// カテゴリ slug → 色クラス（td-cm/cl/cb）。posts.ts は変更せずCSS駆動で色分け
export const CAT_CLASS: Record<string, string> = {
  "money-ai": "td-cm",
  lifestyle: "td-cl",
  beauty: "td-cb",
};
export function catClass(slug: string): string {
  return CAT_CLASS[slug] ?? "";
}

export function catLabel(slug: string, locale: Locale): string {
  const c = postCategories.find((x) => x.slug === slug);
  return c ? (locale === "ja" ? c.label_ja : c.label_en) : slug;
}

// 記事種別ラベル（データに無いためタイトルからの表示用ヒューリスティック）
export function kindLabel(post: Post, locale: Locale = "ja"): string {
  const t = post.title_ja ?? "";
  const en = locale === "en";
  if (/(比較|ランキング|おすすめ)/.test(t)) return en ? "Comparison" : "比較";
  if (/(大全|まとめ|事典|ガイド)/.test(t)) return en ? "Roundup" : "まとめ";
  return en ? "Explainer" : "解説";
}

export function postHref(post: Post, locale: Locale): string {
  return locale === "ja" ? `/posts/${post.slug}` : `/en/posts/${post.slug}`;
}

export function title(post: Post, locale: Locale): string {
  return locale === "ja" ? post.title_ja : post.title_en;
}
export function excerpt(post: Post, locale: Locale): string {
  return locale === "ja" ? post.excerpt_ja : post.excerpt_en;
}

export function fmtDot(date: string): string {
  return (date ?? "").slice(0, 10).replace(/-/g, ".");
}
export function fmtMd(date: string): string {
  return (date ?? "").slice(5, 10).replace(/-/g, "/");
}

// 新着（publishedAt 降順）
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function byCategory(slug: string): Post[] {
  return sortedPosts().filter((p) => p.category === slug);
}

// カテゴリ別件数（ナビ・フィルタ用）
export function categoryCounts(): Record<string, number> {
  const out: Record<string, number> = { all: posts.length };
  for (const c of postCategories) {
    if (c.slug === "all") continue;
    out[c.slug] = posts.filter((p) => p.category === c.slug).length;
  }
  return out;
}

// 検索インデックス（クライアントに渡すスリムなデータ）
export type SearchItem = { t: string; c: string; u: string; k: string; cc: string };
export function buildSearchIndex(locale: Locale): SearchItem[] {
  return sortedPosts().map((p) => ({
    t: title(p, locale),
    c: catLabel(p.category, locale),
    u: postHref(p, locale),
    k: kindLabel(p, locale),
    cc: catClass(p.category),
  }));
}
