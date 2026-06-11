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
    slug: "006-underconsumption-core-trend",
    title_ja: "買わない美学、再来。アンダーコンサンプション・コア入門",
    title_en: "Underconsumption Core: Why Buying Less Is the New Flex",
    category: "lifestyle",
    publishedAt: "2026-06-11",
    thumbnail: "/images/posts/006/006-thumbnail.jpg",
    thumbnailAlt_ja: "シンプルな棚と使い込んだ日用品",
    thumbnailAlt_en: "Minimal shelf with well-used everyday items",
    bodyImage1: "/images/posts/006/006-1.jpg",
    bodyImage1Alt_ja: "アンダーコンサンプション・コアのライフスタイルイメージ",
    bodyImage1Alt_en: "Underconsumption core lifestyle visual",
    bodyImage2: "/images/posts/006/006-2.jpg",
    bodyImage2Alt_ja: "使い込まれた日用品と手仕事の道具",
    bodyImage2Alt_en: "Well-worn everyday items and handcraft tools",
    excerpt_ja: "TikTok発「買わない暮らし」が世界的トレンドに。日本の「もったいない」精神と重なる新潮流を解説。",
    excerpt_en: "TikTok's #underconsumptioncore hits 230M views. The new flex? Buying less—and Japan's been doing it forever.",
    body: {
      hook:        { ja: "「新しい服、買った？」が合言葉だった時代は、もう終わりかもしれません。今、TikTokで爆発的に広がっているのが『Underconsumption Core（アンダーコンサンプション・コア）』。直訳すれば『消費を抑える美学』。使い古した歯ブラシ、何年も使っているマグカップ、母から譲り受けたバッグ——そんな『地味で、長く使っているもの』を誇らしげに見せる動画が、若者たちの間で大きな共感を呼んでいます。派手な購入報告（ホール動画）への反動として生まれたこの流れは、実は日本人にとって、とても馴染み深い感覚なんです。『もったいない』『一汁一菜』『繕って使う』——私たちが昔から大切にしてきた価値観が、いま世界の最先端トレンドとして再評価されている。買わないことが、新しい『かっこいい』になりつつあるのです。", en: "Remember when hauling shopping bags into a TikTok video was the ultimate flex? That era is quietly ending. Enter Underconsumption Core: the aesthetic of using what you already own, proudly displaying your five-year-old mascara tube, your mother's hand-me-down handbag, your slightly chipped mug. It's the antithesis of haul culture, and Gen Z is eating it up. Born as a backlash against overconsumption and influencer-driven shopping sprees, this movement celebrates the worn, the inherited, and the deliberately mundane. And while it feels fresh on Western feeds, it echoes a sensibility Japan has cultivated for centuries—mottainai, the quiet shame of waste. Suddenly, restraint is the new status symbol, and 'I've had this for years' is the most coveted caption of 2025." },
      data:        { ja: "数字を見れば、このムーブメントの勢いがよくわかります。ハッシュタグ『#underconsumptioncore』のTikTok総再生数は、なんと2.3億回超え。さらに直近3ヶ月で関連投稿が前期比約400%増という、爆発的な伸びを見せています。投稿者の中心は20代前半のZ世代女性。彼女たちが見せるのは、限界まで使い切ったリップ、10年前のIKEAの家具、洗いざらしのリネンシャツといった、いわゆる『映えない』日常です。背景にあるのは、物価高、気候危機への意識、そしてSNS疲れ。『買って見せる』ことに疲弊した世代が、『買わずに見せる』方向へ価値観を切り替え始めているのです。米Vogueやニューヨーク・タイムズも特集を組み、単なる一過性のミームではなく、消費文化そのものへの問いかけとして注目されています。", en: "The numbers tell the story. The hashtag #underconsumptioncore has surpassed 230 million views on TikTok, with related posts growing roughly 400% over the past three months. The core demographic? Gen Z women in their early twenties, proudly filming their nearly-empty lipstick tubes, decade-old IKEA shelves, and linen shirts softened by years of washing. The drivers are clear: inflation fatigue, climate anxiety, and a collective exhaustion with influencer-driven consumerism. Major outlets including Vogue and The New York Times have covered the trend, framing it not as a fleeting meme but as a generational reckoning with consumption itself. Search interest in terms like 'no-buy year' and 'capsule wardrobe' has also surged in tandem. What started as a quiet rebellion on FYP feeds is rapidly becoming a values shift—one that brands, retailers, and even economists are starting to take seriously." },
      explanation: { ja: "なぜ今、『買わない美学』なのか。鍵は『誠実さ』への渇望にあります。完璧に整えられたインフルエンサーの暮らしに疲れた若者たちは、リアルで、不完全で、長く愛されているものに美しさを感じ始めました。これ、実は日本文化の核心と完全に重なります。茶道の『侘び寂び』は、欠けや経年変化を美とする思想。『金継ぎ』は割れた器を金で繕い、傷を作品の一部にする技。料理研究家・土井善晴さんが提唱する『一汁一菜』も、足し算ではなく引き算で豊かさを見出す哲学です。さらに『もったいない』という言葉は、2005年にノーベル平和賞受賞者ワンガリ・マータイさんが世界に紹介した、日本発のグローバル概念。Underconsumption Coreは、こうした日本的価値観が、TikTokという最新プラットフォームを通じて世界の若者に翻訳されている現象とも言えるのです。", en: "So why now? At its heart, Underconsumption Core is a hunger for authenticity. Worn out by curated influencer perfection, young people are finding beauty in the real, the imperfect, the long-loved. This sensibility maps almost perfectly onto core Japanese aesthetics. Wabi-sabi finds beauty in age, asymmetry, and wear. Kintsugi—the art of repairing broken ceramics with gold lacquer—turns damage into distinction, treating scars as part of an object's story. Chef Yoshiharu Doi's philosophy of ichiju-issai (one soup, one side) reframes minimalism as abundance through subtraction. And mottainai—the regret of wasting something with inherent value—was introduced globally by Nobel laureate Wangari Maathai in 2005 as a uniquely Japanese ethic. In many ways, Underconsumption Core is these centuries-old Japanese values being retranslated for a TikTok-native generation. The aesthetics are new; the philosophy is ancient." },
      practice:    { ja: "では、明日から始められる『アンダーコンサンプション・コア』な暮らしのヒントを、3つご紹介します。①『使い切りチャレンジ』：化粧品、洗剤、文房具など、家にあるものを最後まで使い切ってから新しいものを買う。空っぽになる達成感は、新品を買う高揚感よりずっと深いものです。②『1イン1アウト』ルール：新しい服を1着買ったら、1着手放す。クローゼットの総量を一定に保つだけで、衝動買いが激減します。③『繕う習慣』：靴下の穴、シャツのほつれ、欠けた茶碗。捨てる前に『直せないか？』と一度考える。最近は東京・蔵前や下北沢で、お直し（リペア）専門店やワークショップも増えています。大切なのは、ストイックになりすぎないこと。『買わない』ではなく『丁寧に選ぶ、長く使う』。これだけで、暮らしの解像度が驚くほど上がります。", en: "Ready to try it? Three entry points for a more underconsumption-friendly life. First, the Use-It-Up Challenge: finish every product in your home—skincare, detergent, notebooks—before buying replacements. The quiet satisfaction of emptying a bottle is surprisingly more rewarding than unboxing a new one. Second, the One-In-One-Out rule: for every new clothing item, release one. Maintaining a stable wardrobe size dramatically reduces impulse buys and decision fatigue. Third, embrace mending. Before tossing a torn shirt or chipped bowl, ask: can this be repaired? Tokyo neighborhoods like Kuramae and Shimokitazawa have seen a boom in repair cafes, sashiko stitching workshops, and kintsugi classes. The goal isn't austerity or deprivation—it's intentionality. Reframe the practice not as 'buying nothing,' but as 'choosing carefully, keeping longer.' That subtle mindset shift transforms your relationship with stuff, sharpens your sense of what you actually love, and—bonus—saves serious money over time." },
      cta:         { ja: "『買わない美学』を深めたいなら、まずは日本の知恵に立ち返ってみませんか。土井善晴さんの『一汁一菜でよいという提案』は、暮らし全体の引き算を教えてくれる名著。金継ぎを家で気軽に始められる『つぐキット』も、Amazonで手に入ります。そして毎日の記録には、長く使える上質なノートを一冊。MDノートやトラベラーズノートのような、使い込むほど味が出る相棒を選んでみてください。新しいものを買うのではなく、すでに持っているものとの関係を深める——それがTokyo Decoded流のアンダーコンサンプション・コアです。今日から、あなたの『長年の愛用品』を一つ、SNSで誇ってみませんか？", en: "Want to go deeper? Start with Japanese wisdom. Yoshiharu Doi's Ichiju-Issai: A Proposal for Simple Eating (English edition available) reframes minimalism as nourishment. Beginner kintsugi kits—available on Amazon—let you repair broken ceramics at home with food-safe lacquer and gold powder, turning waste into heirloom. For journaling your no-buy journey, invest in one well-made notebook like the Midori MD or Traveler's Notebook—objects designed to age beautifully with use. The point isn't to buy these things instead of others; it's to choose tools that deepen your relationship with what you already own. That's the Tokyo Decoded take on Underconsumption Core. Your challenge for this week: post one well-worn item you've loved for years. Caption it proudly. That's the new flex." },
    },
    relatedToolSlug: null,
    affiliateLinks: [],
    tags_ja: ["アンダーコンサンプション", "もったいない", "ミニマリズム", "Z世代", "サステナブル"],
    tags_en: ["underconsumption", "mottainai", "minimalism", "gen-z", "sustainability"],
  },
  {
    slug: "005-cash-stuffing",
    title_ja: "なぜか「現金を封筒に入れる」が世界で大流行——日本の「袋分け家計簿」が再評価される理由",
    title_en: "Cash Stuffing: The TikTok Budget Trend That Japan Invented Decades Ago",
    category: "money-ai",
    publishedAt: "2025-12-15",
    thumbnail: "/images/posts/005/005-thumbnail.jpg",
    thumbnailAlt_ja: "テーブルの上に並ぶ封筒と現金——袋分け家計管理のイメージ",
    thumbnailAlt_en: "Labeled envelopes with cash sorted by spending category on a clean table",
    excerpt_ja: "キャッシュレス時代に「現金を封筒に仕分ける」がTikTokで5億回再生。実は日本が何十年も前から実践してきた「袋分け家計簿」と同じ知恵でした。",
    excerpt_en: "Cash Stuffing has 500M TikTok views. Japan's been doing the same thing — called fukuro-wake kakeibo — for generations. Here's why it works.",
    body: {
      hook: {
        ja: "キャッシュレス化が進む2020年代に、「現金を封筒に入れて管理する」という古典的な家計術が世界でバイラルしています。名前は「Cash Stuffing（キャッシュスタッフィング）」。TikTokで5億回超の再生数を誇るこのトレンドは、食費・交通費・娯楽費など用途別に現金を封筒（またはバインダー）に仕分ける、シンプルな予算管理法です。面白いのは、これが日本の「袋分け家計簿」と呼ばれる伝統的な家計管理法とほぼ同じであること。日本がすでに実践していた知恵が、TikTokを通じて世界に「発見」されています。",
        en: "In an era of tap-to-pay and digital wallets, one of TikTok's most viral personal finance trends involves stuffing cash into envelopes. Cash Stuffing — sorting physical cash into labeled envelopes or binders by spending category — has crossed 500 million TikTok views. When the envelope is empty, that category's spending is done. What's notable for Japan: this is almost exactly the 'fukuro-wake kakeibo' (袋分け家計簿) — envelope-based household budgeting — that Japanese households have practiced for generations. Japan invented this. The world just found it on TikTok.",
      },
      data: {
        ja: "Cash Stuffingは2022〜2023年にかけてTikTokで急拡大しました。#cashstuffingタグは5億回超の再生数を記録し、特に20〜30代の女性を中心に「バインダー型の現金管理ツール」や「ラベル付きの仕分けケース」が爆発的に売れました。Amazon USでは関連商品の検索が2023年に前年比+300%増加。ゲームのような見た目でお金を管理する「Cash Stuffing ASMR動画」ジャンルが生まれるほどの盛り上がりです。背景には、コロナ禍でのキャッシュレス進行後、「お金を使っている実感が持てない」という感覚への反動があります。デジタルとリアルの乖離が、現金の手触りへの回帰欲求を生んでいます。",
        en: "Cash Stuffing took off on TikTok through 2022 and into 2023, crossing 500 million views on the #cashstuffing tag. The core demographic: women in their 20s and 30s. Binder-style cash organizers became surprise bestsellers — Amazon US searches for related products grew +300% year-over-year in 2023. A genre of 'Cash Stuffing ASMR' videos emerged, where creators film the satisfying process of sorting cash while narrating their budgets. The psychological driver is significant: after years of cashless payments, many people report that digital money doesn't 'feel real.' Cash Stuffing restores the tactile, visceral relationship with spending — you physically hand over the money, which increases the friction and awareness of every purchase.",
      },
      explanation: {
        ja: "Cash Stuffingの有効性は、行動経済学的な「痛税効果（Pain of Paying）」で説明できます。ノーベル経済学賞受賞者・Richard Thalerらの研究によると、現金での支払いは、クレジットカードやキャッシュレス決済に比べて「支出の痛み」を2〜3倍強く感じさせます。この「痛み」が過剰な支出を抑制するブレーキになります。日本の袋分け家計簿の歴史は深く、戦後の物資不足の時代から「計画的に使う」ための知恵として発展してきました。「食費袋が空になったら今月の外食はなし」という明確なルールは、意志力に頼らないシステム設計の先駆けとも言えます。デジタル版としては、MoneyForwardやZaimといった家計簿アプリで袋分けの概念をデジタル管理することも可能です。",
        en: "Cash Stuffing works for reasons behavioral economics explains well. Richard Thaler's (Nobel Economics, 2017) research on the 'Pain of Paying' shows that cash transactions feel two to three times more costly than equivalent cashless payments — the physical transfer increases spending awareness in a way that a tap never does. That friction is a natural spending brake. Japan's fukuro-wake kakeibo has deep historical roots, developing as a household management system in the post-war era when meticulous planning was essential. The principle — when an envelope is empty, that category is done — is elegant system design that removes the need for willpower. The rule enforces the limit. For a digital-physical hybrid approach, budgeting apps like MoneyForward ME can replicate envelope-based allocation in software.",
      },
      practice: {
        ja: "Cash Stuffingを今日から始める3ステップです。①「3封筒から始める」——完璧なシステムを最初から作ろうとしない。まず「食費」「外食費」「交際費」の3カテゴリだけで試す。②「給料日に仕分ける習慣をつける」——給料が入ったらすぐに現金を引き出し、封筒に入れる。これを月1回のルーティンにする。③「空になった封筒から学ぶ」——どのカテゴリが先に空になるかを観察する。それが自分の「お金が漏れているポイント」です。封筒を改めて補充するのではなく、その月は「空になった封筒のカテゴリは終わり」というルールを守ることで、月次の支出実態が自然に見えてきます。",
        en: "Three steps to start Cash Stuffing today. First, begin with three envelopes only — don't try to build a perfect system immediately. Start with food, dining out, and personal spending. Three envelopes, three weeks. Second, make payday stuffing a ritual — on the day income arrives, withdraw your allocated cash and divide it immediately. One monthly ritual replaces ongoing willpower. Third, learn from which envelope empties first — rather than immediately replenishing it, observe. The category that runs out earliest is where your money is actually going. That information, made physical and visible, is more motivating than any pie chart in a budgeting app.",
      },
      cta: {
        ja: "家計管理の全体像を学ぶなら、横山光昭著『年収200万円からの貯金生活宣言』は、日本のリアルな家計管理を徹底解説した名著です。今月から、まず3つの封筒（または手帳の3つの仕切り）を作って、Cash Stuffingを試してみてください。「袋が空になる瞬間」に、家計への解像度が一段上がるはずです。",
        en: "For a structured approach to household finance, Mitsuaki Yokoyama's books on Japanese envelope-style budgeting remain practical references. This month's challenge: create three spending envelopes (or three sections in a notebook), fill them on your next payday, and watch what happens when the first one empties. The moment an envelope runs out is the moment your financial awareness sharpens.",
      },
    },
    relatedToolSlug: null,
    affiliateLinks: [],
    tags_ja: ["キャッシュスタッフィング", "袋分け家計簿", "節約", "家計管理", "行動経済学", "海外トレンド"],
    tags_en: ["cash stuffing", "envelope budgeting", "kakeibo", "budgeting", "behavioral economics", "global trends"],
  },
  {
    slug: "004-quiet-luxury",
    title_ja: "ロゴなし・主張なし・それが最高級——「Quiet Luxury（静かな贅沢）」という美意識",
    title_en: "Quiet Luxury: Why the Most Expensive Aesthetic Has Nothing to Prove",
    category: "beauty",
    publishedAt: "2025-12-01",
    thumbnail: "/images/posts/004/004-thumbnail.jpg",
    thumbnailAlt_ja: "シンプルなベージュのニットとミニマルなアクセサリー——Quiet Luxuryのコンセプト",
    thumbnailAlt_en: "Simple beige knitwear with minimal accessories — the Quiet Luxury aesthetic",
    excerpt_ja: "ロゴなし・派手な色なし・ブランド誇示なし。TikTokで2億回再生された「Quiet Luxury」は、素材とシルエットだけで語るスタイル。そして日本の無印良品はとっくにそれを実践していました。",
    excerpt_en: "No logos. No bold colors. No brand signaling. TikTok's #quietluxury crossed 200M views — and Muji has been doing it for decades. Japan got here first.",
    body: {
      hook: {
        ja: "「どこのブランドですか？」と聞かれても答えられない服が、今最もラグジュアリーです。2023〜2024年に世界のファッション・ビューティシーンを席巻した「Quiet Luxury（クワイエットラグジュアリー）」は、ロゴ・派手な色・ブランドの誇示を排し、素材・シルエット・質感だけで語るスタイルです。TikTokでは#quietluxuryが2億回超の再生数を記録。米ドラマ『Succession』の登場人物が着用した「何でもないように見えるのに高い服」が象徴的な参考例として注目され、「Old Money Aesthetic（古いお金の美学）」とも重なります。そして面白いのは——日本の無印良品・ユニクロの哲学が、世界が今夢中になっているQuiet Luxuryとほぼ同じだということです。",
        en: "The most expensive thing in 2024's fashion and beauty landscape has nothing written on it. Quiet Luxury — also called 'old money aesthetic' — dominated TikTok, runway commentary, and style journalism through 2023 and into 2024. The hashtag #quietluxury crossed 200 million TikTok views. The cultural reference point: the Succession characters, who dressed in pieces that looked understated but cost thousands. What's notable for Japan: the philosophy of Muji (無印良品) and the Uniqlo design ethic have been practicing Quiet Luxury aesthetics for decades. Japan got here first without naming it.",
      },
      data: {
        ja: "Quiet Luxuryというタームが急浮上したのは2023年春。ハイプビーストカルチャー（限定品・コラボ・ロゴ主義）への反動として、The Row・Loro Piana・Brunello Cucinelliといったノーロゴ・ハイクオリティブランドが若い富裕層の間で爆発的に支持を集めました。TikTok#quietluxuryは2023年だけで2億回超の再生数を記録。Lyst（グローバルファッション検索サイト）によると、2023年Q2にLoro Pianaの検索数が前年比+80%増加し、The Rowも+60%増。また「ロゴなし」「ベーシックカラー（ブラック・ホワイト・ベージュ・キャメル）」「カシミア素材」の検索が急増しています。国内では、無印良品の2024年度の海外売上が記録を更新——Quiet Luxuryの世界的なトレンドと歩調を合わせるように成長しています。",
        en: "The term crystallized in spring 2023 as a backlash against hype-beast culture — limited drops, logo maximalism, brand collaborations as cultural currency. Quietly luxurious brands — The Row, Loro Piana, Brunello Cucinelli — experienced dramatic demand surges. TikTok's #quietluxury crossed 200 million views in 2023 alone. According to Lyst, Loro Piana searches jumped +80% year-over-year in Q2 2023; The Row grew +60% in the same period. Concurrent searches for 'logoless,' 'neutral tones,' and 'cashmere' also surged. Notably, Muji's international revenue hit record highs in 2024 — tracking in almost perfect alignment with the global rise of Quiet Luxury values.",
      },
      explanation: {
        ja: "Quiet Luxuryが今の時代に響く理由は3つあります。①「インフルエンサー疲れ」——InstagramとTikTokが「見せびらかす消費」を10年間助長してきた反動として、「目立たない贅沢」への回帰が起きています。②「品質への回帰」——物価高・インフレの時代に、長く使えるものを1つ買う方が賢いという価値観。③「アイデンティティとブランドの分離」——「このブランドを着ている自分」ではなく、「このシルエットが好きな自分」というアイデンティティ形成の変化。日本との関係で言えば、「シンプルな良いものを長く使う」という価値観は、日本のものづくり文化（民藝運動・柳宗悦の哲学、無印良品の設計思想）と完全に一致します。世界が今、日本の美意識に追いついてきたとも言えます。",
        en: "Why Quiet Luxury resonates now comes down to three forces. First, influencer backlash — a decade of 'visible consumption' culture has created appetite for the opposite. Second, quality rationalism — in an inflationary environment, buying one excellent thing that lasts outperforms buying multiple trend-chasing pieces. Third, identity decoupling from branding — rather than identifying as 'someone who wears [brand],' the Quiet Luxury consumer identifies as 'someone with this kind of taste.' For Japan, the alignment is almost total: 'simple, good things used for a long time' is the organizing principle of the Mingei movement (Yanagi Soetsu's philosophy of folk craft), Muji's design ethic, and Uniqlo's core positioning. Japan has been building a Quiet Luxury industrial complex for decades. The world is catching up.",
      },
      practice: {
        ja: "Quiet Luxuryを日常に取り入れる3つの実践です。①「素材に投資する、デザインには投資しない」——トレンドに左右されるデザインではなく、素材の良いベーシックアイテムへの投資。コットン100%の白シャツ・上質なデニム・カシミア混のニット、これらは5年後も使えます。②「クローゼットのノイズを除く」——「来月着そう」で残しているものを正直に手放す。残るのは、本当に好きで何度でも着るものだけにする。③「手入れを楽しむ」——良い素材は手入れで持ちが変わります。シューキーパー・ニットの手洗い・綿素材のアイロンがけ。ものと丁寧に関わる習慣がQuiet Luxuryの実践です。",
        en: "Three ways to practice Quiet Luxury without a major wardrobe overhaul. First, invest in material, not design — rather than chasing seasonal silhouettes or trend colors, put your budget into excellent fabric basics. A 100% cotton white shirt, premium denim, cashmere-blend knitwear: these work five years from now as well as today. Second, remove wardrobe noise — honestly release anything you're keeping because you 'might wear it next month.' The Quiet Luxury wardrobe contains only things you actively love and return to. Third, develop care practices — quality materials respond to maintenance. Shoe trees, hand-washing knitwear, ironing cotton. The practice of caring for what you own shifts your relationship from consumer to custodian.",
      },
      cta: {
        ja: "Quiet Luxuryを深めるなら、柳宗悦著『民藝とは何か』は、日本が100年前から育ててきた「質の高い無名の美」の哲学を知る最良の入口です。海外では、Anuschka Rees著『The Curated Closet』が、Quiet Luxury的なワードローブ構築を実践的に解説しています。今週、クローゼットを見て「ブランドロゴで選んだもの」と「素材・シルエットで選んだもの」を仕分けてみてください。その比率が、あなたのQuiet Luxuryへの距離感を教えてくれます。",
        en: "To understand the philosophy behind Quiet Luxury from a Japanese perspective, Yanagi Soetsu's 'The Unknown Craftsman' is the foundational text — a century-old argument for the beauty of anonymous, quality-made objects. For practical wardrobe building, Anuschka Rees' 'The Curated Closet' offers a structured methodology. One exercise: sort your closet into 'things chosen for their logo' versus 'things chosen for their material or silhouette.' The ratio will tell you where you are on the Quiet Luxury spectrum.",
      },
    },
    relatedToolSlug: null,
    affiliateLinks: [],
    tags_ja: ["クワイエットラグジュアリー", "オールドマネー", "ミニマルファッション", "無印良品", "カプセルワードローブ", "海外トレンド"],
    tags_en: ["quiet luxury", "old money aesthetic", "minimal fashion", "muji", "capsule wardrobe", "global trends"],
  },
  {
    slug: "003-bed-rotting",
    title_ja: "「何もしないでベッドにいる」は正しかった——Z世代の「Bed Rotting」という回復法",
    title_en: "Bed Rotting: Is Lying in Bed Doing Nothing Actually Good for You?",
    category: "lifestyle",
    publishedAt: "2025-11-17",
    thumbnail: "/images/posts/003/003-thumbnail.jpg",
    thumbnailAlt_ja: "柔らかい光が差し込む清潔な寝室——Bed Rottingのコンセプト",
    thumbnailAlt_en: "A clean bedroom with soft natural light — the intentional rest of Bed Rotting",
    excerpt_ja: "「寝るわけでもなく、ただベッドにいる」がDictionary.com 2023年の注目新語に。怠惰ではなく回復——Z世代が「Bed Rotting」に見出す意味を、神経科学と日本文化から読み解きます。",
    excerpt_en: "Spending intentional time in bed doing nothing was Dictionary.com's notable new word for 2023. Gen Z calls it Bed Rotting. Neuroscience calls it Default Mode Network activation. Japan calls it 'tasogare.'",
    body: {
      hook: {
        ja: "「ベッドで何もしない時間」——それは怠惰ですか、それとも回復ですか。Z世代が支持する「Bed Rotting（ベッドロッティング）」は、「寝るわけでもなく、活動するわけでもなく、ただベッドにいる」ことを意識的な自己回復の手段として捉える考え方です。TikTokでは#bedrottingが1億回超の再生数を記録し、Dictionary.comが2023年の注目新語として取り上げました。日本の「ゴロゴロする」文化に近いですが、Bed Rottingは「効率と生産性への強迫から、意識的に降りる」というメッセージを持ちます。",
        en: "Lying in bed — not sleeping, not being productive, just existing horizontally. Is it laziness? Gen Z says no. 'Bed rotting' — spending intentional, extended time in bed as a recovery practice — hit over 100 million TikTok views and was named a notable new word by Dictionary.com in 2023. Japan has 'gorogoro suru' (lying around doing nothing), but Bed Rotting carries a specific cultural message: it's a deliberate, unapologetic refusal of the productivity-above-all mandate. Rest as a mental health practice.",
      },
      data: {
        ja: "Bed Rottingという概念は2023年春にTikTokで急浮上しました。特に週末の半日〜1日をベッドで過ごし、動画を見たり、読書したり、ただ天井を眺めたりする様子を投稿するフォーマットが拡散。#bedrottingは2023年内に1億回超の再生数を記録し、Glamour・Allure・The Guardianなどのメディアが特集を組みました。医療専門家の反応は分かれています——「適度な休息は回復に必要」という肯定的な意見と、「過度の不活動は抑うつと関連する可能性がある」という慎重な意見が混在。データとして、米国の調査（American Psychological Association, 2023）では成人の77%が「休息が取れていない」と感じており、Bed Rottingへの共感の背景には慢性的な休息不足があることがわかります。",
        en: "Bed Rotting surfaced on TikTok in spring 2023, spreading through videos of people spending half or full weekend days horizontal — watching videos, reading, or simply staring at the ceiling. The hashtag crossed 100 million views within 2023. Glamour, Allure, and The Guardian all covered it. Medical opinions split: sleep researchers generally support intentional rest as necessary for recovery, while some flag that extended inactivity can correlate with depressive patterns if not chosen freely. Context: according to the American Psychological Association's 2023 survey, 77% of US adults report they don't get enough rest. The resonance of Bed Rotting tracks directly onto that chronic rest deficit.",
      },
      explanation: {
        ja: "Bed Rottingが問いかけているのは、「休息とは何か」という根本です。現代社会では、「休む」ことにさえ生産性が求められます——アクティブな休日、読書で自己啓発、ジムで体を鍛える……。一方Bed Rottingは「何も生産しない時間」の価値を主張します。神経科学的には、DMN（デフォルトモードネットワーク）が活性化する「ぼーっとする時間」が創造性・感情処理・記憶統合に重要であることがわかっています（Marcus Raichleら, 2001）。「何もしていない脳」は実はフル稼働しているのです。日本文化との関係では、「物思いに耽る」「たそがれる」という言葉が示すように、日本にも「ぼんやりする美徳」の文化的素地があります。ただし「休んでいる人を怠けていると見る」社会的空気が、その実践を阻んできた側面もあります。",
        en: "Bed Rotting is fundamentally asking: what counts as rest? Modern culture has productivity-washed even leisure — active vacations, self-improvement reading, gym sessions. Bed Rotting insists on the value of time that produces nothing. The neuroscience is interesting: the Default Mode Network (DMN), which activates during 'mind-wandering' states, plays critical roles in creativity, emotional processing, and memory consolidation (Raichle et al., 2001). The 'doing nothing' brain is, at a neural level, extremely active. Japan has cultural DNA for this kind of rest — 'mono omou' (being lost in thought), 'tasogare' (drifting in twilight contemplation) — but social pressure to appear productive has suppressed its practice. Bed Rotting, named and normalized, gives permission to do what many people needed anyway.",
      },
      practice: {
        ja: "Bed Rottingを「健康的な回復法」として取り入れるための3つの区別があります。①能動的Bed Rotting vs 回避Bed Rotting——前者は「今日はここで休もう」と決めた回復的休息。後者はやるべきことを避けるための逃避。前者はOK、後者は注意。②時間を決める——「今日の午後2時間はBed Rotting時間」と決めると、罪悪感が減り、その後の活動への集中度も上がります。③デバイスなしの時間を少し混ぜる——ただ横になって、音を聞き、天井を眺める5〜10分。これがDMN（脳のデフォルトモードネットワーク）を活性化させる「創造的なぼーっとする時間」になります。週1回、罪悪感なくBed Rottingできる時間を意識的に設けてみてください。",
        en: "Three distinctions for healthy Bed Rotting practice. First: chosen rest versus avoidant rest — the former is a deliberate decision to recover; the latter is using horizontal inactivity to avoid commitments. The first is restorative; the second compounds anxiety. Second, set a time boundary — 'I'm Bed Rotting for two hours this afternoon' reduces guilt and actually improves focus once you return to activity. Third, include some device-free intervals — five to ten minutes of just lying there, listening, not consuming content. This is the practice most aligned with DMN activation and the kind of unfocused mind-state linked to creative insight. Once a week, schedule it deliberately. Name it. Protect it.",
      },
      cta: {
        ja: "休息の科学を深く知りたいなら、Saundra Dalton-Smith著『Sacred Rest』は、「回復」には7種類の休息（肉体的・感情的・精神的・社会的・感覚的・創造的・スピリチュアル）があることを論じた名著です。今週末、スマホを横において2時間だけ、何もしない時間を意識的に作ってみてください。その「何もしない」が、実は脳の最も深い仕事時間かもしれません。",
        en: "For the science of rest, Saundra Dalton-Smith's 'Sacred Rest' categorizes seven distinct types of recovery — physical, mental, emotional, social, sensory, creative, and spiritual — and argues that most chronic exhaustion comes from deficits in non-physical rest. One challenge: this weekend, put your phone face-down, set a two-hour timer, and do nothing intentionally. That deliberate nothing is the practice.",
      },
    },
    relatedToolSlug: null,
    affiliateLinks: [],
    tags_ja: ["ベッドロッティング", "休息", "メンタルヘルス", "DMN", "Z世代", "生産性"],
    tags_en: ["bed rotting", "rest", "mental health", "default mode network", "gen-z", "productivity"],
  },
  {
    slug: "002-deinfluencing",
    title_ja: "「それ、買わなくていい」——TikTok発「Deinfluencing」が広告主を揺るがす理由",
    title_en: "Deinfluencing: When TikTok Creators Became Famous for Telling You What Not to Buy",
    category: "money-ai",
    publishedAt: "2025-11-03",
    thumbnail: "/images/posts/002/002-thumbnail.jpg",
    thumbnailAlt_ja: "スマートフォンの画面とショッピングカートに×マーク——Deinfluencingのコンセプト",
    thumbnailAlt_en: "Phone screen with a shopping cart and a cross mark — the Deinfluencing concept",
    excerpt_ja: "インフルエンサーの仕事は「買わせること」でした。でも今、TikTokで最もバズるコンテンツの一つが「これ買わなくていい」。#deinfluencingは5億回再生——広告・SNSマーケティングの構造が変わりつつあります。",
    excerpt_en: "Influencers' job was always to make you buy things. Now the viral format is 'don't buy this.' TikTok's #deinfluencing crossed 500M views. Here's what it means for how we consume — and for the creator economy.",
    body: {
      hook: {
        ja: "SNSのインフルエンサーといえば「これ買って！」が仕事でした。でも今、TikTokで最もバズっている動画の一つが「これ、買わなくていいです」というコンテンツです。名前は「Deinfluencing（ディインフルエンシング）」。2023年初頭に爆発的に広まり、ハッシュタグ#deinfluencingは5億回超の再生数を記録。美容・ライフスタイル系クリエイターたちが、バイラルなアイテムについて「実際は大したことない」「私には合わなかった」と正直に話す動画が、消費者に爆発的に受け入れられています。日本ではまだほとんど語られていませんが、これはSNS広告・インフルエンサーマーケティングの根本を揺るがす変化です。",
        en: "Influencers have always had one job: tell you to buy things. But one of TikTok's most viral content formats in 2023 turned that premise inside out. 'Deinfluencing' — telling your audience what not to buy, what didn't work, what you regret purchasing — exploded onto the platform and hasn't stopped. The hashtag #deinfluencing crossed 500 million views. Beauty and lifestyle creators building audiences by being honest about overhyped products. It's barely being discussed in Japan yet — but the implications for influencer marketing, affiliate economics, and consumer behavior are significant.",
      },
      data: {
        ja: "Deinfluencingの火付け役は、2023年1月〜2月にかけてTikTokで急増した「過大評価されたバイラル商品のぶっちゃけレビュー」動画群です。TikTok Shopが後押しした爆発的ヒット商品に対して「正直に言うと微妙だった」という声が拡散。#deinfluencingタグは2023年2月だけで再生数が5億回を超え、The New York Times・Forbes・Vogueが特集を組みました。興味深いのは、これらの「反購入」コンテンツを作っているクリエイター自身のフォロワー数が増えていること。「正直さ」がコンテンツ価値になり、広告主との関係性が変わりつつあります。",
        en: "The deinfluencing surge began in January–February 2023, fueled by honest reviews of viral products pushed by TikTok Shop. Creators began saying plainly: 'I tried the viral thing. It was fine. You don't need it.' The hashtag #deinfluencing crossed 500 million views in February 2023 alone. The New York Times, Forbes, and Vogue all covered it within weeks. What's striking is that creators making anti-purchase content are growing their followings faster than conventional haul-culture accounts. Honesty has become a content format. And it's changing the economics of the influencer-brand relationship.",
      },
      explanation: {
        ja: "なぜDeinfluencingが受け入れられたのか。背景には、「SNS広告疲れ」という根深い消費者心理があります。TikTok Shop・Instagram Shopping・YouTubeのプロダクトリンクなど、コマース機能がSNSに深く組み込まれた結果、フィードが「広告だらけ」になったことへの反動です。Deinfluencingの3つの特徴があります。①透明性——「スポンサーなし」「忖度なし」を明示してレビューする。②教育性——「なぜ買わなくていいか」を根拠を持って説明する（成分、コスパ、代替品の提示）。③共感性——「私も一度買ってしまった」という後悔の共有が共感を生む。重要なのは、Deinfluencingはすべての購買を否定するわけではないこと。「これは買う価値があるが、これは要らない」という精度の高い情報提供が、消費者に信頼される理由です。",
        en: "Why did deinfluencing land so hard? At its core, it addressed a deep consumer frustration: the colonization of social media by commerce. TikTok Shop, Instagram Shopping, YouTube product links — every feed became a storefront. Deinfluencing offered something different: genuine opinion. Three characteristics define the format. First, transparency — explicitly marking content as unsponsored. Second, education — explaining why something isn't worth buying, with specifics: ingredient analysis, cost-per-use comparisons, better alternatives. Third, relatability — creators sharing their own regret purchases, which creates instant community. Critically, deinfluencing doesn't reject all consumption. The most effective creators recommend some things wholeheartedly while calling out others. That calibrated judgment is exactly what makes them trustworthy.",
      },
      practice: {
        ja: "Deinfluencingは消費者として活用できる考え方です。3つの実践をご紹介します。①「バイラルだから買う」を一度立ち止まる——TikTokで爆発的に売れているものは、プラットフォームのアルゴリズムが後押ししているだけの場合があります。「なぜバズっているのか」を自問する習慣が、衝動買いを減らします。②「使い切りチェック」——新しいものを買う前に、同カテゴリの今持っているものが「使い切れているか」を確認する。美容品・サプリ・調理器具は特に効果的です。③「Deinfluencingコンテンツを積極的に探す」——購入を検討しているものについて「[商品名] overhyped」「[商品名] honest review」で検索してみる。バランスの取れた判断ができるようになります。",
        en: "Deinfluencing is as useful a consumer practice as it is a content format. Three applications. First, pause before buying viral things — if it's blowing up on TikTok, ask why. Algorithm push, not genuine word-of-mouth, often drives viral product moments. Second, the use-it-up check — before adding a new item in any category, verify you've actually finished what you already own in that category. Especially effective for beauty, supplements, and kitchen tools. Third, actively seek deinfluencing content before major purchases — search '[product name] overhyped,' '[product name] honest review.' Reading anti-hype alongside pro-hype creates a more calibrated decision.",
      },
      cta: {
        ja: "消費の賢さを鍛えるなら、Dan Ariely著『予想どおりに不合理』は、私たちが「なぜ不合理な買い物をしてしまうのか」を行動経済学から解説した必読書です。次回バイラル商品の購入を考えるとき、まず「Deinfluencingレビューを検索する」という一手間を加えてみてください。5分の検索が、不要な出費を防ぐかもしれません。",
        en: "If you want to sharpen your consumer judgment, Dan Ariely's 'Predictably Irrational' remains the definitive guide to why we buy things we don't need — and how to interrupt the pattern. One challenge: before your next purchase of a viral product, spend five minutes searching for 'not worth it' reviews. What you find will be informative either way.",
      },
    },
    relatedToolSlug: null,
    affiliateLinks: [],
    tags_ja: ["ディインフルエンシング", "SNS広告疲れ", "衝動買い", "消費者行動", "インフルエンサー", "海外トレンド"],
    tags_en: ["deinfluencing", "creator economy", "impulse buying", "consumer behavior", "tiktok", "global trends"],
  },
  {
    slug: "001-soft-life",
    title_ja: "「頑張らない」を選ぶ自由——ナイジェリア発「Soft Life」が世界の若者を変えている",
    title_en: "Soft Life: The Nigerian-Born Trend That Made Rest and Comfort the New Status Symbol",
    category: "lifestyle",
    publishedAt: "2025-10-20",
    thumbnail: "/images/posts/001/001-thumbnail.jpg",
    thumbnailAlt_ja: "日差しの中でくつろぐ女性と温かいドリンク——Soft Lifeのコンセプト",
    thumbnailAlt_en: "A woman relaxing in warm sunlight with a drink — the Soft Life aesthetic",
    excerpt_ja: "TikTok #softlifeが3億回再生。「努力して成功する」より「今、快適に生きる」を選ぶ——ナイジェリア発のライフスタイル哲学が、日本の働き方改革とどう交差するかを読み解きます。",
    excerpt_en: "TikTok's #softlife has crossed 300M views. The Nigerian-born concept — choosing comfort and ease over relentless hustle — is reshaping how Gen Z and millennials think about success. Japan's working culture reform is the perfect backdrop.",
    body: {
      hook: {
        ja: "TikTokを開けば、誰かが必死に「頑張っている」動画が流れてくる時代でした。でも今、世界中の若者の間で、まったく逆の価値観が静かに広がっています。名前は「Soft Life（ソフトライフ）」。2020年代初頭にナイジェリアのBlack womenのコミュニティから生まれたこの概念は、「努力して成功する」より「今、快適に生きる」を意識的に選ぶライフスタイルを指します。TikTokでは#softlifeが3億回を超える再生数を記録。「頑張らないことが、一番のフレックス（自慢）」という逆説的な価値観が、特にミレニアル世代・Z世代の女性に深く響いています。日本では「ゆる活」や「ゆっくり生きる」に近い感覚かもしれませんが、Soft Lifeはもっとアクティブな選択です——「疲弊する働き方を拒否する」という意志的な態度なのです。",
        en: "Open TikTok any day and you'll find someone performing hustle culture — waking at 5am, grinding, optimizing. But a quiet counter-movement has been building: Soft Life. Born in early 2020s Nigerian Black women's communities, the concept centers on an intentional choice: prioritizing comfort, ease, and joy over relentless achievement. TikTok's #softlife has crossed 300 million views. The philosophy resonates especially with millennial and Gen Z women who are, frankly, exhausted. Japan has adjacent concepts — 'yuru-katsu' (low-key activities), 'mottari shita kurashi' (unhurried living) — but Soft Life is more explicitly intentional. It's not passive. It's an active refusal of the expectation that your worth is measured by how hard you push.",
      },
      data: {
        ja: "Soft Lifeという言葉自体は2010年代のナイジェリアのポップカルチャー（特にアフロビーツ・ナイトライフシーン）から来ています。当初は「豊かな生活」「贅沢な生活」を意味していましたが、2021〜2022年にかけてTikTokを通じて意味が進化。「ハッスルカルチャーの拒絶」「日常の快適さを最優先にする選択」という意味合いが加わりました。#softlifeは2023年末時点でグローバルTikTok再生数3億回超。関連ワード「quiet quitting（静かな退職）」「bare minimum mondays」も同時期に急増しており、Z世代が過剰な努力主義に対してNOを突きつけるムーブメントの一部として語られています。Intuitの調査（2023）では、米国Z世代の61%が「キャリアの成功より、毎日の生活の質を優先する」と回答しています。",
        en: "The term traces to Nigerian pop culture of the 2010s — particularly the Afrobeats and nightlife scene — where it originally signified a life of luxury and abundance. By 2021–2022, TikTok transformed its meaning. 'Soft Life' evolved to include the explicit rejection of hustle culture and the intentional prioritization of daily comfort. By late 2023, #softlife had passed 300 million global TikTok views. Related terms — 'quiet quitting,' 'bare minimum Mondays,' 'lazy girl jobs' — surged in the same period, forming a constellation of Gen Z pushback against overwork culture. In Intuit's 2023 survey, 61% of US Gen Z respondents said quality of daily life matters more than career success — a value perfectly aligned with the Soft Life ethos.",
      },
      explanation: {
        ja: "Soft Lifeが今の時代に響く理由は、「頑張り続けること」への疲労感が世界的に限界を超えつつあるからです。バーンアウト（燃え尽き症候群）は、WHOが2019年に「職業現象」として正式に認定するほど深刻化。日本は特に深刻で、「過労死」という概念が英語に輸出されたほどです。Soft Lifeのコアにあるのは3つの考え方です。①消耗しない選択——苦痛を感じる仕事・人間関係・習慣から意識的に距離を置く。②喜びの最大化——節約や禁欲ではなく、少ないものから最大の快適さを引き出す。③「休む」を生産性として再定義——休息は怠惰ではなく、長期的なパフォーマンスへの投資。重要なのは、Soft Lifeは「何もしない」ではなく「消耗する方向で頑張らない」という選択だということ。好きな仕事に情熱を注ぐことはSoft Lifeと矛盾しません。",
        en: "Soft Life resonates because the collective fatigue with 'always grinding' has reached a tipping point. WHO formally recognized burnout as an occupational phenomenon in 2019. Japan is a particularly acute case — the concept of 'karoshi' (death from overwork) has entered global vocabulary. Three ideas sit at the core of Soft Life: First, conscious disengagement — deliberately stepping back from work, relationships, or habits that drain without returning. Second, maximizing joy — the goal isn't austerity but extracting maximum comfort from available resources. Third, redefining rest as productivity — recovery isn't laziness, it's an investment in long-term capability. Crucially, Soft Life doesn't mean doing nothing. It means refusing to grind in directions that don't serve you. Loving your work and living softly are compatible.",
      },
      practice: {
        ja: "日本のミレニアル世代にとってのSoft Lifeは、大きな転職や生活の激変を必要としません。3つの小さな選択から始められます。①「通勤1本後ろにする」——急いで始発に乗らず、少し遅い電車でゆったり出発する。この15分が、一日の質を変えることがあります。②「断る言葉を持つ」——「その日は難しいです」を使いこなすこと。Soft Lifeは断ることを練習するライフスタイルでもあります。③「平日のソフトな楽しみを1つ作る」——週末まで喜びを先送りにしない。平日の夜に好きなお茶を入れる、帰り道に好きな音楽を聴くなど、小さな快適さを毎日に埋め込む。「頑張らない」のではなく「消耗しない頑張り方を選ぶ」——これがSoft Life的な日本のミレニアルの新しいスタンダードです。",
        en: "For Japanese millennials, living softly doesn't require a career change or dramatic life overhaul. Three small shifts to start. First, take the train one departure later — resist the pressure to catch the earliest possible train. Those extra 15 minutes of un-rushed preparation can meaningfully change the quality of your morning. Second, develop a 'no' vocabulary — practicing 'that day doesn't work for me' without over-explanation. Soft Life is, in part, a refusal practice. Third, create one soft pleasure on a weekday — don't bank all your enjoyment in weekends. Brew your favorite tea on a Tuesday evening. Listen to music you love on the commute home. Small comforts embedded daily compound over time. The reframe isn't 'stop trying' — it's 'stop grinding in directions that hollow you out.'",
      },
      cta: {
        ja: "Soft Lifeを深めたいなら、四角大輔さんの『超ミニマル主義』は、消耗しない生き方を体系的に解説した日本語の入口として最適です。今週から、一つだけ「頑張らない時間」を意識的にスケジュールに入れてみてください。カレンダーに「Soft Time」と書いて保護する——それだけで、Soft Lifeは始まります。",
        en: "To go deeper on Soft Life philosophy, Oliver Burkeman's '4,000 Weeks' offers a rigorous rethinking of time, ambition, and the cost of perpetual optimization. One concrete starting challenge: block one non-negotiable rest period this week, name it on your calendar, and protect it. That single act of scheduling softness is the beginning of the practice.",
      },
    },
    relatedToolSlug: null,
    affiliateLinks: [],
    tags_ja: ["ソフトライフ", "ハッスルカルチャー", "バーンアウト", "ワークライフバランス", "Z世代", "海外トレンド"],
    tags_en: ["soft life", "hustle culture", "burnout", "work-life balance", "gen-z", "global trends"],
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
