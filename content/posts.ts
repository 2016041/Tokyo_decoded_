// content/posts.ts
// Tokyo Decoded LP — 投稿一覧・個別投稿データ
// C-5 管理ファイル。Codex は読み取り専用。

import type { Category, Post } from "./types";

export const postCategories = [
  {
    slug: "all",
    label_ja: "すべて",
    label_en: "All",
    color: "#0F1115",
  },
  {
    slug: "money-ai",
    label_ja: "お金・AI",
    label_en: "Money & AI",
    color: "#E63946",
  },
  {
    slug: "lifestyle",
    label_ja: "暮らし",
    label_en: "Lifestyle",
    color: "#2563EB",
  },
  {
    slug: "beauty",
    label_ja: "美容",
    label_en: "Beauty",
    color: "#7C3AED",
  },
] as const satisfies readonly Category[];

export const posts = [
  {
    slug: "001-loud-budgeting",
    title_ja: "「お金ない」が恥ずかしくない時代へ——米国発「Loud Budgeting」とは",
    title_en: "Loud Budgeting: The US Trend That's Changing How We Talk About Money",
    category: "money-ai",
    publishedAt: "2026-06-04",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    thumbnailAlt_ja:
      "お金の管理を堂々と宣言する「Loud Budgeting」のコンセプトイラスト",
    thumbnailAlt_en:
      "Concept illustration for Loud Budgeting — owning your savings choices openly",
    excerpt_ja:
      "米国TikTokで1.4億回再生を突破した「Loud Budgeting」。「節約してます」を堂々と言える新しいお金の価値観が、日本のミレニアルにも必要な理由をデータで読み解きます。",
    excerpt_en:
      "Loud Budgeting hit 1.4 billion views on TikTok. Here's what the trend actually means — and why Japan's millennials might need it most.",
    body: {
      hook: {
        ja: "「お金ないから」って言うのが、なんとなく気まずい——そんな感覚、ありませんか。米国のZ世代とミレニアル世代の間に、その空気を変える考え方が広がっています。名前は「Loud Budgeting（ラウドバジェティング）」。TikTokタグの再生回数は2024年末時点で1.4億回を超え、日本ではまだほとんど語られていないコンセプトです。",
        en: "There's a quiet discomfort many people feel when they have to say 'I can't afford that.' A new mindset is pushing back on that — openly. It's called Loud Budgeting, and it's been spreading among Gen Z and millennials in the US since early 2024. The TikTok tag passed 140 million views by the end of 2024. In Japan, almost no one is talking about it yet.",
      },
      data: {
        ja: "Loud Budgetingという言葉は、2024年1月にTikTokerのLukas Battle（@lukasbattle）が投稿した「今年のテーマはLoud Budgetingにしよう」という動画から広まりました。#loudbudgetingタグは急速に拡散し、派生語として「#noyearmas（クリスマス出費削減）」「#girlmath」なども生まれています。日本でのX/Twitter上の日本語投稿数は、まだ数十件程度にとどまっています（2024年末時点、Tokyo Decoded編集部調べ）。",
        en: "The phrase traces back to a January 2024 TikTok post by creator Lukas Battle (@lukasbattle), who declared it his theme for the year. The tag spread fast, spawning related trends like #noyearmas and #girlmath. As of late 2024, Japanese-language posts using the term numbered in the dozens — according to our own monitoring of X/Twitter (Tokyo Decoded research).",
      },
      explanation: {
        ja: "Loud Budgetingのコアにあるのは、節約を「恥ずかしいこと」ではなく「価値観の表明」として扱う姿勢です。誘いを断る時に「お金がないから」と言うのではなく、「Loud Budgetingしてるから」と言う——それだけで会話の空気が変わります。なぜ今この考え方が広まったのか、背景には3つの流れが見えてきました。①インフレ・物価高によって節約が「当然」になった、②SNSでの見栄消費への疲弊、③「ハッスル文化（Hustle Culture）」への反動——「努力で稼ぎを増やす」より「賢く貯める」を価値観として表明する流れです。",
        en: "The core of Loud Budgeting is treating frugality not as something to hide, but as a values statement. Instead of 'I can't afford it,' you say 'I'm Loud Budgeting.' That single reframe shifts the entire tone of a conversation. Three forces seem to be driving the trend: inflation making saving feel necessary rather than optional; fatigue with aspirational spending on social media; and a pushback against Hustle Culture — the idea that you can always earn your way out of financial stress.",
      },
      practice: {
        ja: "日本のミレニアル世代にも、応用できる場面は多くあります。飲み会を断る時に「Loud Budgeting中で」と伝える、ご祝儀の金額を絞る時に「家族でLoud Budgetingを決めた」と話す、服を買わない月を「Loud Budgetingの月」と名付ける——言葉を持つことで、選択が自分のものになります。共働き・物価高・将来不安という状況は、日本のミレニアルにとっても他人事ではありません。具体的な実践ツールとして、私たちが作成した「Digital Kakeibo」テンプレートも参考にしてみてください。",
        en: "There are plenty of ways to apply this in Japan. When declining a dinner invite, try 'I'm Loud Budgeting this month.' When keeping a gift budget tight, mention 'We decided as a family to try Loud Budgeting.' Naming the practice gives it legitimacy. Having a word for a choice makes it feel like a choice. Dual-income households, rising prices, and uncertain futures are just as real in Japan as anywhere. Our Digital Kakeibo template is one practical place to start.",
      },
      cta: {
        ja: "Tokyo Decoded編集部では、Loud Budgeting × 家計簿アプリの実践ガイドを「Digital Kakeibo」テンプレートとしてまとめています。メールアドレスを登録すると無料でダウンロードできます。また、マネーフォワードME・Zaim（A8.net経由、PR）など、日常的な家計管理に役立つツールも合わせてご紹介しています。",
        en: "We've put together a practical guide — Loud Budgeting meets household budgeting — in our free Digital Kakeibo template. Enter your email to download it. We also recommend tools like YNAB and Monarch Money (affiliate links, PR) for anyone looking to start tracking seriously.",
      },
    },
    relatedToolSlug: "digital-kakeibo",
    affiliateLinks: [
      {
        label: "マネーフォワードME プレミアム（PR）",
        url: "#affiliate-moneyforward",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "Zaim プレミアム（PR）",
        url: "#affiliate-zaim",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "YNAB — You Need A Budget (PR)",
        url: "#affiliate-ynab",
        note: "Via Impact. We may earn a commission from this link.",
      },
      {
        label: "Monarch Money (PR)",
        url: "#affiliate-monarch",
        note: "Via Impact. We may earn a commission from this link.",
      },
    ],
    tags_ja: [
      "ラウドバジェティング",
      "節約",
      "貯金",
      "お金の価値観",
      "海外トレンド",
      "ミレニアル世代",
    ],
    tags_en: [
      "loud budgeting",
      "saving money",
      "budgeting",
      "financial mindset",
      "global trends",
      "millennials",
    ],
  },
  {
    slug: "002-soft-saving",
    title_ja: "「将来のために我慢」はもう古い——Z世代73%が支持する「Soft Saving」という節約観",
    title_en: "Soft Saving: Why 73% of Gen Z Prioritize Today Over Retirement",
    category: "money-ai",
    publishedAt: "2026-06-04",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    thumbnailAlt_ja:
      "ガラスの瓶にコインをそっと入れるミニマルなイラスト——Soft Savingのコンセプト",
    thumbnailAlt_en:
      "Minimal illustration of a hand placing a coin into a glass jar — representing Soft Saving",
    excerpt_ja:
      "Intuitの調査で、米国Z世代の73%が「老後より今の人生の質を優先」と回答。「強い節約」の次に来る「Soft Saving」という柔らかいお金の習慣を、データと日本式の知恵から読み解きます。",
    excerpt_en:
      "73% of US Gen Z say today's quality of life matters more than retirement savings, according to Intuit's Prosperity Index. We look at Soft Saving — the gentler counterpart to Loud Budgeting — through data and Japanese financial tradition.",
    body: {
      hook: {
        ja: "「将来のために今を我慢する」——そんな節約の常識が、静かに揺らいでいます。Intuitが実施したProsperity Index 2023の調査では、米国Z世代の73%が「老後の貯蓄より、今の生活の質を優先する」と回答。ミレニアル世代でも66%が同じ傾向を示しました。一方、ベビーブーマー世代でこう答えたのはわずか31%。世代間で価値観の逆転が起きています。",
        en: "The idea that you should sacrifice today for tomorrow is quietly losing ground. In Intuit's 2023 Prosperity Index survey, 73% of US Gen Z respondents said today's quality of life matters more than retirement savings. Among millennials, that figure was 66%. Among baby boomers, just 31%. The values gap between generations is significant.",
      },
      data: {
        ja: "この調査結果が示す新しい節約観を「Soft Saving」と呼びます。米国TikTokを中心に2023年から広がり始め、Loud Budgeting（堂々と節約する）の「対をなす柔らかい面」として注目されています。Soft Savingの3原則は、①目標貯蓄額を設けない、②余ったら貯める（先取りしない）、③メンタルヘルスを貯蓄額より優先する——というものです。日本での概念名としての浸透はまだほぼゼロですが、価値観としてはミレニアル世代に刺さりやすいデータが揃っています。",
        en: "This shift in attitudes has a name: Soft Saving. The concept has been gaining traction on US TikTok since 2023, positioned as the gentler counterpart to Loud Budgeting. Its three principles are: don't set a fixed savings target; save whatever is left over; and treat mental health as a higher priority than savings amount. The label hasn't reached Japan yet — but the underlying values map closely onto how many Japanese millennials already think about money.",
      },
      explanation: {
        ja: "なぜSoft Savingがいま支持されるのか——背景には、インフレによる将来への漠然とした不安と、「無理な節約がメンタルに悪い」という認識の広まりがあります。強い目標を立てて達成できなかった時の挫折感より、「余ったら貯める」という低ストレスな習慣の方が長続きする、という現実的な判断です。Loud Budgetingが「節約を宣言することで社会的なプレッシャーから自由になる」スタンスなら、Soft Savingは「節約そのものに無理をかけない」スタンスといえます。どちらが良いというわけではなく、自分の性格や状況に合わせて組み合わせることができます。",
        en: "Why is Soft Saving resonating now? Inflation has created a generalized anxiety about the future, while awareness has grown that rigid saving goals can hurt mental health. Failing to meet a strict target feels worse than not having one at all. Soft Saving offers a lower-friction alternative: contribute what you can, when you can. If Loud Budgeting is about freeing yourself from social pressure by naming your choices, Soft Saving is about removing the self-pressure that comes from unrealistic financial goals. Neither approach is better — they can be combined depending on personality and circumstances.",
      },
      practice: {
        ja: "日本式のSoft Savingとして参考になるのが、「積立（つみたて）」と「もったいない」という考え方です。毎日少額をコツコツ続ける積立の文化と、無駄を出さないもったいないの哲学は、Soft Savingが目指す「無理なく・少しずつ・持続可能に」と重なります。実践のヒントとして、月の貯蓄額の目標を「ゼロ円でもOK」にする、自動積立は「振り切れたらいつでも止める」前提で設定する、月に1度「楽しかった支出」を振り返り可視化する——といった方法を試してみました。Digital Kakeibo テンプレートでは、Soft Saving 仕様の月次レビューシートも用意しています。",
        en: "Two Japanese concepts already embody the spirit of Soft Saving: 'tsumitate' (積立), the practice of small, consistent contributions; and 'mottainai' (もったいない), the philosophy of avoiding waste without obsessing over restriction. Both point toward the same principle — sustainable, low-pressure, no-sacrifice money habits. Practical starting points: set your monthly savings target at 'whatever's left, even zero'; configure auto-transfers with the assumption that you can pause them; and do a monthly review where you highlight spending that genuinely made you happy. Our Digital Kakeibo template includes a Soft Saving monthly review sheet.",
      },
      cta: {
        ja: "Soft Saving × Loud Budgeting のハイブリッド設計について、さらに深掘りしたコンテンツをEditor's Toolsでまとめています。Digital Kakeibo テンプレートには、月次の振り返りシートと家計カテゴリ分類表が含まれています。日本語ユーザーにはマネーフォワードME・Zaim（A8.net経由、PR）、英語ユーザーにはYNAB・Monarch Money（Impact経由、PR）もあわせてご紹介しています。",
        en: "We've gone deeper on the Soft Saving × Loud Budgeting hybrid in our Editor's Tools section. The Digital Kakeibo template includes a monthly reflection sheet and a spending category guide. For Japanese users, we recommend MoneyForward ME and Zaim (via A8.net, PR). For English-speaking readers, YNAB and Monarch Money (via Impact, PR) are both solid options.",
      },
    },
    relatedToolSlug: "digital-kakeibo",
    affiliateLinks: [
      {
        label: "マネーフォワードME プレミアム（PR）",
        url: "#affiliate-moneyforward",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "Zaim プレミアム（PR）",
        url: "#affiliate-zaim",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "YNAB — You Need A Budget (PR)",
        url: "#affiliate-ynab",
        note: "Via Impact. We may earn a commission from this link.",
      },
      {
        label: "Monarch Money (PR)",
        url: "#affiliate-monarch",
        note: "Via Impact. We may earn a commission from this link.",
      },
    ],
    tags_ja: [
      "ソフトセービング",
      "節約",
      "貯金",
      "メンタルとお金",
      "海外トレンド",
      "ミレニアル世代",
      "積立",
    ],
    tags_en: [
      "soft saving",
      "saving money",
      "budgeting",
      "mental health and money",
      "global trends",
      "millennials",
      "kakeibo",
    ],
  },
] as const satisfies readonly Post[];

export const postsPageContent = {
  heading: {
    ja: "投稿一覧",
    en: "Posts",
  },
  filterLabel: {
    ja: "カテゴリで絞り込む",
    en: "Filter by category",
  },
  noResults: {
    ja: "該当する投稿が見つかりませんでした。",
    en: "No posts found for this category.",
  },
  paginationLabel: {
    ja: "ページを選択",
    en: "Select page",
  },
  readMore: {
    ja: "続きを読む",
    en: "Read more",
  },
} as const;
