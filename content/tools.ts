// content/tools.ts
// Tokyo Decoded LP — Editor's Tools ページ
// C-5 管理ファイル。Codex は読み取り専用。

import type { Tool } from "./types";

export const tools = [
  {
    slug: "digital-kakeibo",
    name: {
      ja: "Digital Kakebo — お金の流れを可視化する",
      en: "Digital Kakebo — Visualise Your Money Flow",
    },
    category: "money-ai",
    description_ja:
      "ChatGPTまたはClaudeで動く家計簿テンプレート。100年以上の歴史を持つ日本の「家計簿（Kakeibo）」をデジタル化し、Loud Budgeting・Soft Saving の考え方を組み込んだ月次レビューシートです。月に1度、4つの問いに答えるだけでお金の流れが見えてきます。",
    description_en:
      "A budgeting template that runs on ChatGPT or Claude. We've digitized the Japanese Kakeibo method — over a century old — and built in Loud Budgeting and Soft Saving principles. Answer four questions once a month and your money habits start to clarify.",
    preview: "/images/tools/digital-kakeibo-preview.webp",
    previewAlt_ja:
      "Digital Kakebo テンプレートのプレビュー画像。月次レビューシートと4カテゴリの支出分類表",
    previewAlt_en:
      "Preview of the Digital Kakebo template, showing the monthly review sheet and four spending category columns",
    downloadType: "email-gate",
  },
  {
    slug: "research-brief",
    name: {
      ja: "Research Brief — 世界のデータを整理する",
      en: "Research Brief — Organise Global Trend Data",
    },
    category: "trends",
    description_ja:
      "Tokyo Decoded編集部が実際に使っているトレンド調査フレームワークをテンプレート化。海外で兆候を掴んだトレンドを「フェーズ・日本上陸予測・ターゲット層・案件有無」の4軸で整理し、「動くべきか・見送るべきか」を素早く判断できます。",
    description_en:
      "The trend research framework Tokyo Decoded actually uses, turned into a template. Evaluate each overseas trend across four axes — phase, Japan arrival estimate, target audience, and monetisation potential — so you can decide fast whether to act or pass.",
    preview: "/images/tools/research-brief-preview.webp",
    previewAlt_ja:
      "Research Brief テンプレートのプレビュー画像。トレンド情報カードと月次サマリーシート",
    previewAlt_en:
      "Preview of the Research Brief template, showing the trend information card and monthly summary sheet",
    downloadType: "email-gate",
  },
  {
    slug: "trend-worksheet",
    name: {
      ja: "Trend Worksheet — トレンドを日常に落とし込む",
      en: "Trend Worksheet — Apply Trends to Your Life",
    },
    category: "trends",
    description_ja:
      "「海外でバズっているものを見ても、自分に関係あるかわからない」を解消する5ステップのワークシート。キャッチ・接点発見・日本語変換・試す・発信まで、トレンドを情報収集で終わらせず行動につなげるフレームです。",
    description_en:
      "A five-step worksheet that turns \"I saw this trending abroad, but so what?\" into action. From catching the signal to finding your personal angle, adapting it for Japan, testing it, and sharing — it keeps a trend from being just a note.",
    preview: "/images/tools/trend-worksheet-preview.webp",
    previewAlt_ja:
      "Trend Worksheet のプレビュー画像。5ステップの記入欄と日本語変換セクション",
    previewAlt_en:
      "Preview of the Trend Worksheet, showing the five-step input fields and Japan adaptation section",
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
