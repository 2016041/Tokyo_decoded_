# X-2 実装指示 — Tokyo Decoded LP セクションコンポーネント

> ブランチ: `feature/components-sections`
> 投入先: OpenAI Codex
> 担当: Hero / About / Posts / Tools / Recommended / Contact 各セクション + UIプリミティブ

---

## Step 0: 必読ファイル（順番通り全て読む）

1. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/AGENTS.md`
2. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/design.md` — **ANTI-PATTERNS は HARD BLOCK**
3. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/architecture.md` — "use client" 境界 / 型方針
4. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/accessibility.md` — **§4.1〜§4.6 が ARIA 正本**
5. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/codex-handoff.md` § 2
6. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/app/globals.css`
7. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/types.ts`
8. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/home.ts`
9. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/about.ts`
10. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/posts.ts`
11. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/tools.ts`
12. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/recommended.ts`
13. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/forms.ts`

---

## Step 1: ブランチ
```bash
cd /Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp
git checkout main && git pull && git checkout -b feature/components-sections
```

---

## Step 2: 担当ファイル

```
components/sections/
  Hero.tsx
  AboutMini.tsx
  LatestPosts.tsx
  PostCard.tsx
  EditorsToolsForm.tsx        # "use client"
  RecommendedExcerpt.tsx
  ContactCTA.tsx
  AboutPageBody.tsx
  PostsArchive.tsx             # "use client"（フィルタ状態管理）
  CategoryFilter.tsx          # "use client"
  PostBody.tsx
  ToolsList.tsx
  RecommendedGrid.tsx
  ContactForm.tsx              # "use client"
components/ui/
  Button.tsx
  Card.tsx
  Badge.tsx
```

**読み取り専用**: `app/globals.css`, `content/*.ts`, `tsconfig.json`, `next.config.ts`, `components/Header.tsx` 系（X-1 担当）

---

## Step 3: 共通ルール（違反は再実装）

### スタイル
- Tailwind ユーティリティのみ（`style=` 禁止、`text-[#hex]` 禁止）
- カラートークン: `ink/accent/cream/paper/muted/muted-light` のみ
- 角丸: `rounded-none` / `rounded-sm`（バッジ・タグ専用）
- シャドウ: `shadow-[0_1px_4px_rgba(0,0,0,0.08)]` をカードのみ
- グラデーション・`backdrop-blur` 禁止
- `opacity-*` 装飾目的禁止（フェードインのみ可）
- **アクセント朱赤は1画面1〜2箇所まで**
- `text-accent` を本文サイズ（18pt 未満かつ 14pt 太字未満）に使用禁止
- `bg-cream` 上の `text-muted` 本文禁止
- `bg-ink` 上の `text-muted` 本文禁止（`text-cream` / `text-muted-light` を使用）

### フォント
- 英語見出し: `font-[family-name:var(--font-display)]`
- 英語本文・UI: `font-[family-name:var(--font-sans)]`
- 日本語: `font-[family-name:var(--font-jp)]`

### コンテンツ
- 全テキストは `content/*.ts` から import（直書きゼロ）
- 型は `@/content/types` から import

### A11y
- `accessibility.md § 4.1〜4.6` の ARIA 属性を一切省略しない
- 全インタラクティブ要素に `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent`
- `motion-reduce:transition-none` 全アニメーション要素に付与
- リンク内 SVG に `aria-hidden="true" focusable="false"`

### TS
- `any` 禁止 / `console.log` 禁止 / 全 props に型

### レスポンシブ
- モバイルファースト、`md:` `lg:`
- コンテナ: `max-w-[1200px] mx-auto px-[5vw] lg:px-10`
- セクション余白: `py-[clamp(64px,12vw,120px)]`

---

## Step 4: コンポーネント実装方針（要点）

### `components/ui/Button.tsx`
```ts
props: { children, href?, variant?: "primary"|"outline", type?, disabled?, "aria-busy"?, onClick?, className? }
```
- primary: `bg-accent text-paper px-8 py-3 md:px-10 md:py-4 rounded-none hover:bg-[#C1313D] transition-colors duration-[150ms]`
- outline: `bg-transparent border border-ink text-ink hover:bg-ink hover:text-paper`
- 共通: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`

### `components/ui/Card.tsx`
```
bg-cream border border-ink/10 rounded-none p-6 md:p-8
shadow-[0_1px_4px_rgba(0,0,0,0.08)]
hover:bg-ink hover:text-paper transition-colors duration-[250ms]
```

### `components/ui/Badge.tsx`
```
bg-accent text-paper text-xs font-[family-name:var(--font-sans)] font-medium
px-2 py-0.5 rounded-sm inline-block
```

### `components/sections/Hero.tsx` (Server)
**HARD BLOCK: 中央揃え + 大ボタン1個パターン禁止。H1左揃え + CTA 2個必須**

```html
<section aria-labelledby="hero-heading">
  <Container class="py-[clamp(64px,12vw,120px)]">
    <h1 id="hero-heading" lang="en"
        class="font-[family-name:var(--font-display)] font-bold text-ink
               text-[clamp(2.4rem,6vw,4rem)] leading-tight tracking-tight text-left">
      {content.h1[locale]}
    </h1>
    <p class="font-[family-name:var(--font-jp)] text-ink text-base md:text-lg max-w-2xl mt-6">
      {content.subcopy[locale]}
    </p>
    <div role="group" aria-label="メインアクション" class="flex flex-col sm:flex-row gap-4 mt-8">
      <Button href={cta.primary.href} variant="primary">{cta.primary[`label_${locale}`]}</Button>
      <Button href={cta.secondary.href} variant="outline">{cta.secondary[`label_${locale}`]}</Button>
    </div>
  </Container>
</section>
```

### `components/sections/AboutMini.tsx` (Server)
- `<section aria-labelledby="about-mini-heading">`
- H2 + 3文本文 + Aboutページへのリンク（`sr-only` で「Aboutページへ」補足）

### `components/sections/PostCard.tsx` (Server)
```html
<article aria-labelledby={`post-card-title-${post.slug}`}>
  <a href={`/posts/${post.slug}`} class="block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent">
    <Image src={post.thumbnail} alt={post[`thumbnailAlt_${locale}`]} width={400} height={225}
           loading={priority ? "eager" : "lazy"} {...(priority && { priority: true })} />
    <div class="bg-cream border border-ink/10 p-6 md:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <p><span class="sr-only">カテゴリ: </span><Badge label={post.category} /></p>
      <h3 id={…} class="font-[family-name:var(--font-jp)] font-bold text-ink text-lg md:text-xl mt-3">
        {post[`title_${locale}`]}
      </h3>
      <time dateTime={post.publishedAt} class="block mt-3 text-sm text-muted">…</time>
    </div>
  </a>
</article>
```

### `components/sections/LatestPosts.tsx` (Server)
- `<section aria-labelledby="latest-posts-heading">`
- H2 + 「全部見る」リンク
- `<ul role="list">` のグリッド（3列、`md:grid-cols-2 lg:grid-cols-3`）
- 上位3件に `priority`

### `components/sections/EditorsToolsForm.tsx` (Client)
**`"use client"` 必須**
- `<section aria-labelledby="tools-form-heading">` 内に form
- 3本柱の説明リスト + メアドフォーム
- 全 ARIA: `noValidate` / `aria-describedby` / `aria-live="assertive"`（error）+ `aria-live="polite"`（success）
- input: `aria-invalid` / `aria-required` / `autoComplete="email"`
- 送信ボタン: `aria-busy={isSubmitting}` / `disabled` / `motion-reduce:transition-none`
- ヒント・エラーは `formsContent.subscribe.validation` から取得
- 送信先: POST `/api/subscribe { email }`

### `components/sections/RecommendedExcerpt.tsx` (Server)
- items 空配列時は Coming Soon セクション表示
- アフィリンクは **3重対応**:
  1. `rel="sponsored noopener noreferrer"`
  2. 視覚的「PR」バッジ（`aria-hidden="true"`）
  3. `aria-label` に「PR」明示

### `components/sections/ContactCTA.tsx` (Server)
- ボーダートップ罫線 + H2 + 本文 + accent CTA ボタン1個

### `components/sections/AboutPageBody.tsx` (Server)
- mission / strategy / pillars (3本柱) / editorialStance / socialIntro / contactCta の順
- 各セクション間に `<hr class="border-ink/20" />`
- pillars は `<ul>` に share% を small で

### `components/sections/CategoryFilter.tsx` (Client)
**`"use client"` 必須**
- `<div role="group" aria-label="カテゴリフィルタ">` の button group
- 各ボタンに `aria-pressed`
- フィルタ結果数のライブリージョン: `<p aria-live="polite" id="filter-results-count" class="sr-only">`

### `components/sections/PostsArchive.tsx` (Client)
**`"use client"`**（フィルタ状態管理）
- H1 + CategoryFilter + PostCard グリッド
- 0件時の `noResults` 表示

### `components/sections/PostBody.tsx` (Server)
- パンくず: `<nav aria-label="パンくず">` + `<ol>` + 最終に `aria-current="page"`
- H1 + Badge + time
- hook → data → explanation → practice → cta を順に表示
- アフィリエイト領域: `<aside aria-labelledby="…">` + PR 表記文 + 各リンクは3重対応

### `components/sections/ToolsList.tsx` (Server)
- 各ツールカード: 画像 + 説明 + DLボタン
- DLボタン: `aria-describedby` でプライバシー注記参照、`data-tool-slug` でモーダルトリガー
- privacyNote 表示

### `components/sections/RecommendedGrid.tsx` (Server)
- items 空時: Coming Soon
- カテゴリ別グリッド、各カードは3重対応のアフィリンク

### `components/sections/ContactForm.tsx` (Client)
**`"use client"` 必須**
- `<form noValidate aria-describedby="contact-form-intro">`
- エラーサマリー: `role="alert" aria-live="assertive"` + バリデーション失敗時にフォーカス移動（`useRef`）
- `<fieldset><legend>` を「お客様の情報」「お問い合わせ内容」で2分割
- 各 input: `aria-invalid` / `aria-describedby` / `aria-required` / `autoComplete`
- reCAPTCHA v3 プライバシー表記必須（`formsContent.contact.recaptcha`）
- 送信ボタン: `aria-busy`
- 送信先: POST `/api/contact { name, email, subject, message, recaptchaToken }`

---

## Step 5: ビルド確認
```bash
npm run build -- --webpack
npm run lint
```
エラー 0 件で完了すること。

---

## Step 6: 受け入れチェックリスト

### コンテンツ
- [ ] 全テキスト `content/*.ts` から import（直書きゼロ）

### ANTI-PATTERNS
- [ ] Hero が左揃え + CTA 2個（中央揃え + 大ボタン1個禁止）
- [ ] `text-center` Hero に未使用
- [ ] グラデーション / `backdrop-blur` 0件
- [ ] `rounded-md/lg/xl/full` 0件（バッジ除く）
- [ ] `shadow-md/lg` 0件
- [ ] `style=` / ハードコードカラー 0件
- [ ] アクセント朱赤1ページ1〜2箇所
- [ ] `text-accent` 本文未使用
- [ ] `bg-cream`/`bg-ink` 上の `text-muted` 本文未使用
- [ ] Heroicons/Lucide 等パッケージなし

### TS
- [ ] `any` / `console.log` なし、全 props に型
- [ ] `"use client"` 適切に付与（EditorsToolsForm / ContactForm / CategoryFilter / PostsArchive）

### A11y（accessibility.md §4.1〜4.6 照合）
- [ ] Hero: `<h1 lang="en">`, CTA group
- [ ] LatestPosts: `<ul role="list">`
- [ ] PostCard: `<article aria-labelledby>` + `<time dateTime>`
- [ ] フォーム: `aria-invalid` / `aria-describedby` / `aria-required` / `aria-busy`
- [ ] CategoryFilter: `aria-pressed` + ライブリージョン
- [ ] アフィリンク3重対応（rel + 視覚PR + aria-label）
- [ ] ContactForm: `<fieldset><legend>` + エラーサマリーへフォーカス移動
- [ ] reCAPTCHA プライバシー表記
- [ ] PostBody パンくず: `<nav aria-label="パンくず">` + `aria-current="page"`
- [ ] 全フォーカスリング
- [ ] `motion-reduce:transition-none`

### Perf
- [ ] `next/image`（`<img>` 禁止）
- [ ] 上位3件のサムネに `priority`

### Build
- [ ] `npm run build -- --webpack` 通過
- [ ] `npm run lint` 通過

---

## Step 7: PR

PR タイトル: `feat: セクションコンポーネント実装 (X-2)`
PR 本文: 各セクションの PC/SP スクリーンショット + ビルド完了ログ
PR を `feature/components-sections` → `main` で出してください。
