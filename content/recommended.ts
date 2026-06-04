// content/recommended.ts
// Tokyo Decoded LP — 推奨ツール（アフィリエイト）ページ
// C-5 管理ファイル。Codex は読み取り専用。
// ※ ASP承認前のため、初期は空配列。承認後にアイテムを追加する。

import type { RecommendedCategory, RecommendedItem } from "./types";

export const recommendedCategories = [
  {
    slug: "all",
    label_ja: "すべて",
    label_en: "All",
  },
  {
    slug: "money",
    label_ja: "家計・お金",
    label_en: "Money & Budgeting",
  },
  {
    slug: "ai",
    label_ja: "AI・ツール",
    label_en: "AI & Productivity",
  },
  {
    slug: "beauty",
    label_ja: "美容・スキンケア",
    label_en: "Beauty & Skincare",
  },
  {
    slug: "travel",
    label_ja: "旅行",
    label_en: "Travel",
  },
] as const satisfies readonly RecommendedCategory[];

// ASP承認後にアイテムを追加する。現時点では空配列。
export const recommendedItems: readonly RecommendedItem[] = [] as const;

export const recommendedPageContent = {
  meta: {
    heading: {
      ja: "Tokyo Decoded厳選 推奨ツール",
      en: "Tokyo Decoded Picks",
    },
    subheading: {
      ja: "編集部が調査・検証したサービスとツールをカテゴリ別に紹介しています。",
      en: "Services and tools we've researched and verified, organized by category.",
    },
  },
  disclosure: {
    ja: "本ページにはアフィリエイトリンクが含まれます（PR）。リンク経由で購入が行われた場合、当編集部がASP報酬を受け取ることがあります。掲載内容は編集部の独自判断によるものであり、対価によって評価が変わることはありません。",
    en: "This page contains affiliate links (sponsored). We may earn a commission when you purchase through these links, at no extra cost to you. All selections reflect our own editorial judgment and are not influenced by compensation.",
  },
  comingSoon: {
    heading: {
      ja: "準備中です",
      en: "Coming Soon",
    },
    body: {
      ja: "現在、各ASPの審査・承認を進めています。承認が完了しだい、編集部が厳選したサービスをご紹介します。メールリストに登録すると、公開時にお知らせします。",
      en: "We're currently in the process of getting approved by our affiliate partners. Once we're set up, we'll share the services we've genuinely found useful. Subscribe to be notified when this page goes live.",
    },
    cta: {
      label_ja: "メールリストに登録する",
      label_en: "Join the mailing list",
      href: "/tools",
    },
  },
} as const;
