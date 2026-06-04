// content/tools.ts
// Tokyo Decoded LP — Editor's Tools ページ
// C-5 管理ファイル。Codex は読み取り専用。

import type { Tool } from "./types";

export const tools = [
  {
    slug: "digital-kakeibo",
    name: {
      ja: "Digital Kakeibo — AI家計簿テンプレート",
      en: "Digital Kakeibo — AI Budgeting Template",
    },
    category: "money-ai",
    description_ja:
      "ChatGPTまたはClaudeで動く家計簿テンプレート。100年以上の歴史を持つ日本の「家計簿（Kakeibo）」をデジタル化し、Loud Budgeting・Soft Saving の考え方を組み込んだ月次レビューシートです。月に1度、4つの問いに答えるだけでお金の流れが見えてきます。",
    description_en:
      "A budgeting template that runs on ChatGPT or Claude. We've digitized the Japanese Kakeibo method — over a century old — and built in Loud Budgeting and Soft Saving principles. Answer four questions once a month and your money habits start to clarify.",
    preview: "/images/tools/digital-kakeibo-preview.webp",
    previewAlt_ja:
      "Digital Kakeibo テンプレートのプレビュー画像。月次レビューシートと4カテゴリの支出分類表",
    previewAlt_en:
      "Preview of the Digital Kakeibo template, showing the monthly review sheet and four spending category columns",
    downloadType: "email-gate",
  },
] as const satisfies readonly Tool[];

export const toolsPageContent = {
  meta: {
    heading: {
      ja: "Editor's Tools",
      en: "Editor's Tools",
    },
    subheading: {
      ja: "私たちが実際に使うフレームワークを、無料で配布しています。",
      en: "We're sharing the frameworks we actually use — free.",
    },
  },
  downloadGate: {
    instruction: {
      ja: "メールアドレスを登録すると、ダウンロードリンクをお送りします。",
      en: "Register your email and we'll send you the download link.",
    },
    privacyNote: {
      ja: "メールアドレスは Editor's Tools の送付以外には使用しません。",
      en: "We use your email only to send you the download. No spam.",
    },
  },
  comingSoon: {
    label_ja: "近日公開",
    label_en: "Coming Soon",
    body_ja: "次のEditor's Toolsを準備中です。メールリストに登録すると公開時にお知らせします。",
    body_en: "More tools are in the works. Subscribe to be notified when they drop.",
  },
} as const;
