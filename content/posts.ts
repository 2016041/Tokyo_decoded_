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
  {
    slug: "003-slow-aging",
    title_ja: "「老けないように」は古い——韓国・中国発「Slow Aging（低速老化）」という新しい美容哲学",
    title_en: "Slow Aging: The Korean Beauty Philosophy That's Replacing Anti-Aging",
    category: "beauty",
    publishedAt: "2026-06-11",
    thumbnail: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    thumbnailAlt_ja: "ミニマルなスキンケアアイテムが並ぶ白い棚——Slow Agingのコンセプト",
    thumbnailAlt_en: "Minimalist skincare products on a clean white shelf — representing the Slow Aging concept",
    excerpt_ja:
      "韓国・中国発「低速老化（Slow Aging）」がTikTokで3,800万回再生。「老化に抗う」から「老化をゆっくり重ねる」へ——日本人がすでに体現していた美容哲学をデータで読み解きます。",
    excerpt_en:
      "Korea named it. China made it viral. But Japan has been practicing Slow Aging for decades without the label. Here's the science behind the 38-million-view TikTok trend.",
    body: {
      hook: {
        ja: "「老けないようにする」というスキンケアの常識が、静かに塗り替えられています。韓国と中国のビューティシーンで広がる「Slow Aging（低速老化）」は、アンチエイジングの概念そのものをリフレームする美容哲学です。TikTokでは#slowagingが3,800万回再生を突破し（2025年末時点）、日本ではまだほぼ語られていません。",
        en: "The idea that skincare is about 'fighting' aging is quietly being replaced. Slow Aging — called 低速老化 (dīsù lǎohuà) in Chinese — is a beauty philosophy spreading from Korea and China that reframes the entire premise of anti-aging. The TikTok tag #slowaging passed 38 million views by late 2025. In Japan, it's barely being discussed yet.",
      },
      data: {
        ja: "Slow Agingという概念は、中国の小紅書（RED）で2024年に急増し、推定5,000万インプレッションを超えるバイラルを記録しました。その後TikTokやInstagramを通じてグローバルに拡散。「アンチエイジング」というワードは2023年以降のZ世代・ミレニアル世代の美容消費において検索数が微減傾向にある一方、「preventive beauty（予防美容）」「skin health（肌の健康）」といったキーワードが急増しています（Google Trends, 2024）。",
        en: "The concept surged on Chinese platform Xiaohongshu (RED) in 2024, generating an estimated 50 million impressions in a viral wave. It then spread globally through TikTok and Instagram. Meanwhile, searches for 'anti-aging' have been quietly declining among Gen Z and millennials since 2023, while 'preventive beauty' and 'skin health' are trending upward (Google Trends, 2024).",
      },
      explanation: {
        ja: "Slow Agingのコアにある考え方は、老化を「抗うもの」ではなく「ゆっくりコントロールするもの」として捉えることです。高価な美容外科・注射に頼るのではなく、日常習慣の積み重ねで差をつける。3つの原則が広く語られています。①睡眠の質を最優先にする（22時〜2時が成長ホルモンのゴールデンタイム）、②腸活で体内から整える（腸内フローラが肌荒れ・くすみに直結）、③UVケアを1日も抜かない（紫外線ダメージは肌老化の約80%に関与・米皮膚科学会）。注目成分はレチノール×ナイアシンアミドの組み合わせで、「20代から仕込む」が韓国式の流儀とされています。",
        en: "The core idea of Slow Aging is to stop 'fighting' aging and start 'pacing' it — using daily habits rather than expensive interventions. Three principles appear most consistently: prioritize sleep quality (growth hormone peaks between 22:00–02:00); support gut health (the gut-skin connection is well-documented in dermatology research); and commit to daily UV protection (UV exposure accounts for approximately 80% of visible skin aging, per the American Academy of Dermatology). The ingredient combination that Korean dermatologists most often recommend is retinol paired with niacinamide.",
      },
      practice: {
        ja: "面白いのは、日本人がすでにSlow Agingを体現していたという逆説です。和食（発酵食品・緑茶・海藻）は腸内環境を整え、早寝早起きの文化は睡眠の質を守り、日焼け止め文化は紫外線ダメージを抑える——Slow Agingの3原則を、言語化せずに実践してきた文化です。「言葉を持つことで、習慣が意識的になる」。Slow Agingという概念を知ることで、すでにある日本の日常習慣が、より意図的なケアに変わります。まず取り入れやすいのは、朝のUV防御（SPF50+を年365日）と、就寝前のレチノール少量使用から始めることです。",
        en: "Here's the irony: Japan has been practicing Slow Aging for decades without naming it. A traditional Japanese diet rich in fermented foods (miso, natto, tsukemono) feeds the gut microbiome. An early-to-bed culture protects sleep quality. A strong SPF culture limits UV damage. Japan has been living the three Slow Aging principles without a label for them. The value of naming a practice is that it becomes intentional. Knowing about Slow Aging turns existing Japanese habits into a deliberate system. The easiest starting points: daily SPF50+ (365 days a year, rain or shine) and a small amount of retinol in the evening routine.",
      },
      cta: {
        ja: "Tokyo Decoded編集部では、Slow Aging実践のデイルーティンをまとめたガイドをEditor's Toolsで公開しています。スキンケアについては、オルビスユー ドット・ファンケル アクネケア（A8.net経由、PR）など、編集部が実際に試したアイテムもあわせてご紹介しています。",
        en: "We've put together a practical Slow Aging starter routine in our Editor's Tools section. For skincare products, we recommend exploring Japanese drugstore brands such as Hada Labo and Kose Sekkisei — both available on Amazon (affiliate links, PR) and both built on principles that align directly with Slow Aging.",
      },
    },
    relatedToolSlug: "research-brief",
    affiliateLinks: [
      {
        label: "オルビスユー ドット（PR）",
        url: "#affiliate-orbis",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "ファンケル アクネケア（PR）",
        url: "#affiliate-fancl",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "Hada Labo — Amazon US (PR)",
        url: "#affiliate-hadalabo",
        note: "Via Amazon Associates. We may earn a commission from this link.",
      },
    ],
    tags_ja: ["スローエイジング", "低速老化", "韓国美容", "予防美容", "レチノール", "海外トレンド"],
    tags_en: ["slow aging", "k-beauty", "preventive beauty", "retinol", "skincare", "global trends"],
  },
  {
    slug: "004-sleepmaxxing",
    title_ja: "日本人に一番必要かもしれない——米国発「Sleepmaxxing」7原則で睡眠を科学する",
    title_en: "Sleepmaxxing: The 80-Million-View TikTok Trend That Japan Needs Most",
    category: "lifestyle",
    publishedAt: "2026-06-11",
    thumbnail: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80",
    thumbnailAlt_ja: "月明かりが差し込む清潔感のある寝室——Sleepmaxxingのコンセプト",
    thumbnailAlt_en: "A clean, minimal bedroom with soft moonlight — representing Sleepmaxxing",
    excerpt_ja:
      "TikTok #sleepmaxxingが8,000万回再生。睡眠を科学的に徹底最適化するムーブメントが、OECD最短レベルの睡眠時間を抱える日本人にどう響くか、7原則とデータで読み解きます。",
    excerpt_en:
      "Sleepmaxxing has 80 million TikTok views. Japan sleeps less than almost any developed nation. Here's the 7-principle framework — and why it matters most for Japanese millennials.",
    body: {
      hook: {
        ja: "「よく寝た」を感覚で語る時代が、終わりつつあります。米国TikTokで8,000万回再生を超えた「Sleepmaxxing」は、睡眠の質・時間・環境を科学的に徹底最適化するムーブメントです。日本ではほぼ誰も話していない——でも実は、日本人に一番必要かもしれない考え方です。OECD加盟国の中でも最短クラスの平均睡眠時間（7時間22分 vs. OECD平均7時間32分）を持つ国が、この概念を最も必要としているとも言えます。",
        en: "The era of measuring sleep by feel is ending. Sleepmaxxing — a term with over 80 million TikTok views — is the practice of optimizing every dimension of sleep through science-backed methods. Japan is barely discussing it. Yet Japan arguably needs it most: the country's average sleep duration (7h 22min) sits near the bottom of OECD rankings, behind the 7h 32min average.",
      },
      data: {
        ja: "Sleepmaxxingという言葉は「Maxxing（〜を極限まで最大化する）」シリーズの一つで、2023年末〜2024年にかけて米国TikTokで急拡大しました。神経科学者Andrew Hubermanのポッドキャスト・SNS発信が火をつけた形で、#sleepmaxxingに加え#sleepgirl#sleephacksなど派生タグも急増。世界の睡眠補助グッズ市場は2030年までに1,000億ドル超に達すると予測されています（Grand View Research）。日本では「睡眠負債」「睡眠の質」への関心は高まっているものの、Sleepmaxxingというコンセプト名としての浸透はまだほぼゼロです。",
        en: "Sleepmaxxing is part of the 'maxxing' series of TikTok trends — systematic optimization applied to a specific life area. The term exploded in late 2023 and through 2024, partly fueled by neuroscientist Andrew Huberman's widely-followed content. Related tags like #sleepgirl and #sleephacks followed. The global sleep aids market is projected to exceed $100 billion by 2030 (Grand View Research). In Japan, awareness of 'sleep debt' and 'sleep quality' has grown — but the Sleepmaxxing framework itself is essentially unknown.",
      },
      explanation: {
        ja: "Sleepmaxxingの本質は、「何時間寝たか」より「どれだけ深く・質よく寝たか」を最適化することです。7原則が広く語られています。①完全遮光（わずかな光でもメラトニン分泌が低下）、②室温18〜19度（深睡眠のゴールデンゾーン・深部体温が下がることで眠気が発生）、③マウステープ（鼻呼吸を強制・口呼吸は睡眠の質を下げる）、④就寝1時間前のデジタルオフ（ブルーライトが脳に「昼間」と誤認させる）、⑤ホワイトノイズで音環境を整える、⑥マグネシウム補給（睡眠深化に関与・複数論文）、⑦Oura Ring等で睡眠スコアを数値化する（測定することで改善が加速する）。",
        en: "Sleepmaxxing focuses on optimizing sleep quality and architecture — not just duration. Seven principles appear most consistently in the framework. Complete blackout: even dim light suppresses melatonin production. Room temperature 18–19°C: core body temperature must drop to initiate deep sleep. Mouth tape: forces nasal breathing, which improves sleep architecture. No screens one hour before bed: blue light signals 'daytime' to the brain. White noise: creates a consistent sound environment. Magnesium glycinate: linked to improved sleep depth in multiple peer-reviewed studies. Data tracking with Oura Ring or Apple Watch: measurement accelerates improvement.",
      },
      practice: {
        ja: "日本には「いねむり（居眠り）」という、電車や会議中に短時間仮眠を取る文化があります。これはNASAの研究でも約26分の仮眠が認知機能を34%向上させることが示されており、Sleepmaxxingの文脈でも「パワーナップ」として再評価されています。日本人のSleepmaxxing実践として今すぐ始められるのは、遮光カーテンの導入（最も費用対効果が高い）と、就寝前のスマートフォンを別室に置くことです。Oura Ringなどのウェアラブルデバイスで数値化すると、改善の手応えが明確になります。",
        en: "Japan has a long tradition of 'inemuri' — sleeping in short bursts on trains, in meetings, during breaks. NASA research suggests a 26-minute nap improves cognitive performance by 34%, and the practice maps directly onto what Sleepmaxxing calls 'power napping.' For Japanese millennials starting with Sleepmaxxing, the two highest-ROI first steps are blackout curtains (the most cost-effective hardware investment) and placing your phone in another room before sleep. Adding a wearable like Oura Ring makes the improvements measurable and motivating.",
      },
      cta: {
        ja: "Tokyo Decoded編集部では、今夜から始められるSleepmaxxingスターターキットをEditor's Toolsにまとめています。マットレス・枕については、BRAIN SLEEP STORE・昭和西川・LIMNE（A8.net経由、PR）など、睡眠の質に直結する寝具ブランドもあわせてご紹介しています。",
        en: "We've put together a beginner Sleepmaxxing stack — starting from free habits — in our Editor's Tools section. For sleep gear, we recommend exploring Oura Ring (affiliate link, PR) for tracking, and magnesium glycinate supplements available on Amazon (affiliate link, PR) as an accessible first step.",
      },
    },
    relatedToolSlug: "research-brief",
    affiliateLinks: [
      {
        label: "BRAIN SLEEP STORE（PR）",
        url: "#affiliate-brainsleep",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "LIMNE マットレス（PR）",
        url: "#affiliate-limne",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "Oura Ring (PR)",
        url: "#affiliate-oura",
        note: "Via affiliate program. We may earn a commission from this link.",
      },
    ],
    tags_ja: ["スリープマキシング", "睡眠最適化", "快眠", "睡眠習慣", "バイオハッキング", "海外トレンド"],
    tags_en: ["sleepmaxxing", "sleep optimization", "biohacking", "sleep science", "global trends", "wellness"],
  },
  {
    slug: "005-underconsumption-core",
    title_ja: "TikTok6億再生「Underconsumption Core」は、日本の「もったいない」だった",
    title_en: "Underconsumption Core Has 600M TikTok Views. Japan Called It 'Mottainai' Centuries Ago.",
    category: "money-ai",
    publishedAt: "2026-06-11",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    thumbnailAlt_ja: "整然と並んだシンプルな持ち物——Underconsumption Coreのコンセプト",
    thumbnailAlt_en: "A few neatly organized minimal possessions — representing Underconsumption Core",
    excerpt_ja:
      "TikTok #underconsumptioncore が6億回再生。「買わない」「使い切る」「少なさを誇る」——この価値観は、日本が100年前から持つ「もったいない」哲学とほぼ同じでした。",
    excerpt_en:
      "TikTok's #underconsumptioncore has over 600 million views. The philosophy — buy less, use everything up, own less — is almost identical to Japan's 'Mottainai' concept. America discovered it in 2024.",
    body: {
      hook: {
        ja: "「買う」ことを誇る時代が、終わりつつあります。米国TikTokで6億回再生を超えた「Underconsumption Core」は、「新しいものを買う」ではなく「今あるものを使い切る」を美学とするムーブメントです。TikTok Shopなどのコマース機能が加速させた過剰消費への反動として2024年夏に爆発しました。日本ではほぼ誰も話していない——でも、この価値観は日本が100年前から持っていたものとほぼ同じです。",
        en: "The era of conspicuous consumption is quietly losing its cultural hold. Underconsumption Core — with over 600 million TikTok views — is a movement that treats 'using things up completely' as an aesthetic, rather than 'buying new things.' It exploded in the summer of 2024 as a reaction to the hyper-consumption culture accelerated by TikTok Shop and similar platforms. In Japan, it's barely being discussed. Yet the underlying values are almost identical to something Japan has held for centuries.",
      },
      data: {
        ja: "Underconsumption Coreという言葉は、TikTok Shopが米国で本格展開した2024年春以降、#TikTokMadeMeBuyItという過剰消費タグへの反動として生まれました。#underconsumptioncoreのタグは2024年夏に急増し、6億回超を記録。派生タグ#slowliving#intentionalliving#nospendchallengeも同時に拡大しています。「買わない美学」「少なさを誇る」「ストックゼロ運用」が核心のキーワードとして定着しました。",
        en: "The term emerged in spring 2024 as a direct counter to #TikTokMadeMeBuyIt — a tag celebrating impulse purchases driven by the platform's commerce features. By summer 2024, #underconsumptioncore was growing rapidly, eventually crossing 600 million views. Related tags — #slowliving, #intentionalliving, #nospendchallenge — expanded alongside it. Core concepts: stock-zero living, owning the minimum, using everything completely before replacing it.",
      },
      explanation: {
        ja: "Underconsumption Coreのコアにある3姿勢は、①今あるものを全部使い切ってから次を買う（ストックゼロ運用）、②持ち物の「少なさ」を誇る、③衝動買いに乗らない——です。ここで重要なのは、日本に「もったいない（勿体無い）」という概念があることです。物・食料・時間・関係性に対して「無駄にしない」という哲学で、室町時代（14世紀）から日本文化に根付いています。2005年にはノーベル平和賞受賞者のワンガリ・マータイ氏が「MOTTAINAI」をグローバルなサステナビリティのスローガンとして国連に提唱し、正式に採用されました。",
        en: "The three core postures of Underconsumption Core are: use everything completely before buying the next one (stock-zero living); take pride in owning less; and resist impulse buying. This maps almost exactly onto Japan's concept of Mottainai (勿体無い) — a philosophy of not wasting objects, food, time, or relationships that has been embedded in Japanese culture since the Muromachi period (14th century). In 2005, Nobel Peace Prize laureate Wangari Maathai introduced 'MOTTAINAI' as a global sustainability slogan to the United Nations, where it was formally adopted.",
      },
      practice: {
        ja: "日本のミレニアル世代が今すぐ実践できる3つの方法があります。①ストックゼロ運用——シャンプー・化粧品・食料は「今あるものが空になってから次を買う」を徹底する。②24時間ルール——何かを買いたくなったら1日待つ。衝動の約70%は翌日には消えています（行動経済学の複数研究）。③年1回クローゼット監査——1年間使っていないものを手放す。これはLoud Budgeting（お金の節約宣言）のモノ版であり、両方を組み合わせると「お金も・モノも整う」状態になります。",
        en: "Three immediately actionable practices for millennials. Stock-zero system: don't buy the next unit of anything until the current one is completely empty. 24-hour rule: wait a day before any non-essential purchase — behavioral economics research suggests roughly 70% of impulses disappear by the next day. Annual possession audit: anything untouched for 12 months gets released. This is the physical-goods equivalent of Loud Budgeting — the two practices work well together, creating order in both money and possessions simultaneously.",
      },
      cta: {
        ja: "Tokyo Decoded編集部では、Underconsumption Core × もったいない の実践シートをEditor's Toolsで公開しています。家計管理ツールとしては、マネーフォワードME（A8.net経由、PR）が「使い切る」生活の可視化に役立ちます。また、整理収納・暮らし用品についてはKagg.jp（A8.net経由、PR）もあわせてご紹介しています。",
        en: "We've published an Underconsumption Core × Mottainai practice sheet in our Editor's Tools section. For tracking your spending in a 'stock-zero' lifestyle, we recommend YNAB (via Impact, PR) or Notion (affiliate link, PR) for organizing what you own and what you're choosing not to buy.",
      },
    },
    relatedToolSlug: "trend-worksheet",
    affiliateLinks: [
      {
        label: "マネーフォワードME プレミアム（PR）",
        url: "#affiliate-moneyforward",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "Kagg.jp（PR）",
        url: "#affiliate-kagg",
        note: "A8.net経由。当編集部はASP報酬を受け取る場合があります。",
      },
      {
        label: "YNAB — You Need A Budget (PR)",
        url: "#affiliate-ynab",
        note: "Via Impact. We may earn a commission from this link.",
      },
    ],
    tags_ja: ["アンダーコンサンプション", "もったいない", "ミニマリスト", "買わない", "節約", "海外トレンド"],
    tags_en: ["underconsumption core", "mottainai", "minimalism", "intentional living", "global trends", "slow living"],
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
