# Tokyo Decoded LP — Codex 向け実装指示書（Phase 2）

> 作成: PM C-1 / 2026-06-04
> 対象: OpenAI Codex（X-1 / X-2 / X-3 / X-4）
> 前提: Phase 1 DESIGN 完了・ディレクター承認後にディレクターが手動でキック

---

## 0. 全エージェント共通の前提

### 必読ファイル（実装前に必ず読む）
1. `.claude/CLAUDE.md` — 案件サマリ
2. `AGENTS.md` — design-contract（design.md 必読義務）
3. `.claude/design.md` — デザインシステムの正本（**ANTI-PATTERNS は HARD BLOCK**）
4. `.claude/architecture.md` — アーキテクチャ・"use client" 境界・型方針
5. `.claude/accessibility.md` — ARIA 仕様（属性レベルで具体化済み）
6. `app/globals.css` — `@theme inline` のトークン
7. `content/types.ts` — 共通型（**正本**）
8. `content/*.ts` — 全テキストコンテンツ（**JSX 直書き禁止、必ず import**）

### 禁止事項（違反は再実装）
- `style=` インラインスタイル
- ハードコードカラー（`#E63946` 等）— `bg-accent` / `text-accent` を使う
- システムフォント直書き — `var(--font-jp)` 等の CSS 変数経由のみ
- コンテンツテキストの JSX 直書き — 全て `content/*.ts` から import
- `design.md § ANTI-PATTERNS` 記載の全項目
- `app/globals.css`, `content/*.ts`, `tsconfig.json`, `next.config.ts` の編集

### 共通技術仕様
- Next.js 16.2.6 App Router、`--webpack` フラグ必須
- TypeScript strict、`satisfies` で型安全に
- Tailwind CSS 4 ユーティリティ一本化（複雑アニメのみ `*.module.css` 許容）
- `next/font/google`（Space Grotesk / Inter / Noto Sans JP）
- `next/image`（WebP・alt 必須）
- `next/link`（内部リンク）
- 言語切替トグル: `/` ↔ `/en/`

### Phase 1 で確定済みの正本ファイル
| ファイル | 編集者 | Codex |
|---------|-------|------|
| `app/globals.css` | C-2（Claude） | 読み取り専用 |
| `.claude/design.md` | C-2 | 読み取り専用 |
| `content/*.ts`, `content/types.ts` | C-5 | 読み取り専用 |
| `tsconfig.json`, `next.config.ts` | C-3 | 読み取り専用（必要時 PM に相談） |
| `lib/types.ts` | Codex（X-3 が作成、`content/types.ts` の barrel + API 境界 DTO） | 作成・編集可 |

---

## 1. X-1: Header / Footer / Navigation / 共通レイアウト

### ブランチ
`feature/components-layout`

### 担当ファイル
```
components/
├── Header.tsx
├── Footer.tsx
├── Navigation.tsx
├── LangToggle.tsx       ← Client Component
├── MobileMenu.tsx       ← Client Component
├── Container.tsx         ← レイアウト用ラッパ
├── SkipLink.tsx          ← a11y スキップリンク
└── CookieBanner.tsx     ← Client Component（最小限）
```

### 仕様参照
- `.claude/design.md § COMPONENT SPECS` — Nav / Footer の状態別仕様
- `.claude/accessibility.md § 1, § 2, § 4.1`（言語切替トグル/SNSリンク aria-label）
- `content/site.ts` — ナビ項目・8アカ SNS・ロゴ alt
- `.claude/architecture.md § 2`（Client 境界）/ § 6（i18n）

### 受け入れ基準
- [ ] Header: ロゴ（`public/brand/logo-horizontal.svg`、alt="Tokyo Decoded"）+ Nav + LangToggle
- [ ] Nav: 5項目（About / Posts / Tools / Recommended / Contact）+ aria-label="グローバルナビゲーション"
- [ ] LangToggle: `/` ↔ `/en/` 切替、現在ロケールに `aria-current="true"` or 視覚的非活性
- [ ] MobileMenu: フォーカストラップ、Esc で閉じる、`aria-expanded` 連動
- [ ] Footer: 8アカ SNSリンク（`rel="noopener"`、`aria-label="◯◯ で Tokyo Decoded をフォロー"`）、ページリンク、アフィリエイト開示の短文（フッター固定）
- [ ] SkipLink: フォーカス時のみ表示、`#main-content` へジャンプ
- [ ] CookieBanner: 同意/拒否ボタン、`localStorage` 保存
- [ ] `prefers-reduced-motion` 尊重
- [ ] Lighthouse Accessibility 95+

### PR 出し方
- 単一 PR で `feature/components-layout` → `main`
- スクリーンショット（PC/モバイル）添付

---

## 2. X-2: Hero / About / Posts / Tools / Recommended / Contact セクション

### ブランチ
`feature/components-sections`

### 担当ファイル
```
components/
├── sections/
│   ├── Hero.tsx
│   ├── AboutMini.tsx
│   ├── LatestPosts.tsx
│   ├── PostCard.tsx
│   ├── EditorsToolsForm.tsx   ← Client Component（フォーム）
│   ├── RecommendedExcerpt.tsx
│   ├── ContactCTA.tsx
│   ├── AboutPageBody.tsx       ← /about 用
│   ├── PostsArchive.tsx
│   ├── CategoryFilter.tsx      ← Client Component
│   ├── PostBody.tsx            ← /posts/[slug] 用
│   ├── ToolsList.tsx
│   ├── RecommendedGrid.tsx
│   └── ContactForm.tsx         ← Client Component
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    └── Badge.tsx
```

### 仕様参照
- `.claude/design.md § COMPONENT SPECS § LAYOUT & INTERACTION` — Hero/Card/Button/Form
- `.claude/accessibility.md § 4.1〜4.6` — 各セクション ARIA 仕様
- `content/home.ts`, `content/about.ts`, `content/posts.ts`, `content/tools.ts`, `content/recommended.ts`, `content/forms.ts`
- `content/types.ts` — `Post`, `Tool`, `Category` 型を使用

### 受け入れ基準
- [ ] Hero: H1 + 日本語サブコピー + CTA 2 個（最新投稿を見る / 無料ツールを受け取る）。**中央揃え + 大ボタン1個の AI デフォルトパターン禁止**
- [ ] PostCard: `<article>` ラッピング、画像 `next/image`、カテゴリバッジ、タイトル全体クリッカブル、関連 SNS 投稿アイコン
- [ ] EditorsToolsForm: メアド入力（type="email"、required、aria-describedby）、送信ボタン aria-busy 連動、aria-live で成功/エラー告知
- [ ] CategoryFilter: button group、`aria-pressed` 連動、`prefers-reduced-motion` 尊重
- [ ] ContactForm: `<fieldset><legend>`、`aria-invalid`、エラーサマリーへフォーカス移動、reCAPTCHA v3 プライバシー表記必須
- [ ] アフィリンク: `rel="sponsored noopener"` + 視覚的 PR 表記 + aria-label に「PR」明示（三重対応）
- [ ] 全コンポーネントが `content/*.ts` から import（JSX 直書きゼロ）
- [ ] アクセント朱赤は1画面1〜2箇所まで（design.md ANTI-PATTERNS 遵守）
- [ ] 角丸は 0px or 2px のみ（バッジ・タグ除く）

### PR 出し方
- 単一 PR で `feature/components-sections` → `main`
- セクション別スクリーンショット添付

---

## 3. X-3: ページ組み立て / API Route Handler（**X-1, X-2 マージ後に開始**）

### ブランチ
`feature/pages-and-api`

### 担当ファイル
```
app/
├── layout.tsx                  ← next/font 設定・metadata 連携・GA
├── page.tsx                    ← / トップ
├── about/page.tsx
├── posts/
│   ├── page.tsx                ← 一覧
│   └── [slug]/page.tsx         ← 個別
├── tools/page.tsx
├── recommended/page.tsx
├── privacy/page.tsx
├── disclosure/page.tsx
├── contact/
│   ├── page.tsx
│   └── thanks/page.tsx
├── en/                          ← 英語版（同一構造）
│   └── [全ページの英語版]
└── api/
    ├── subscribe/route.ts       ← POST: Resend + Google Sheets
    ├── contact/route.ts          ← POST: Resend + reCAPTCHA v3 検証
    └── og/route.tsx              ← @vercel/og edge runtime

lib/
├── types.ts                     ← content/types.ts の barrel + API DTO
├── posts.ts                     ← getPostBySlug / listPosts / filterByCategory
├── resend.ts                    ← Resend クライアント
├── recaptcha.ts                  ← reCAPTCHA v3 検証
├── sheets.ts                     ← Google Sheets API
└── i18n.ts                       ← ロケール解決ユーティリティ
```

### 仕様参照
- `.claude/architecture.md § 1, 3, 4, 5, 6` — 全体構造・型・API・env・i18n
- `.claude/accessibility.md § 2, 3` — ランドマーク・見出し階層
- `content/seo.ts` — metadata は X-4 が触るが、ページ側で `generateMetadata` 呼び出しは X-3 担当

### 受け入れ基準
- [ ] 全ページが `<main id="main-content">` を持ち、Header/Footer は layout.tsx に統一
- [ ] `/posts` は ISR（`revalidate = 60`）、`/posts/[slug]` は `generateStaticParams` + ISR
- [ ] `/api/subscribe`: Zod 等で入力検証、Resend で配信、Sheets に追記、レート制限（IP ベース簡易）
- [ ] `/api/contact`: reCAPTCHA v3 スコア 0.5+ のみ通過、Resend で `hello@tokyo-decoded.com` に転送
- [ ] `/api/og`: `runtime = "edge"`、投稿タイトル + カテゴリ + ロゴを合成
- [ ] エラー時は 4xx/5xx を返し、`ApiResult<T>` 型でレスポンス統一
- [ ] 日英ルーティング: `/en/` 配下も同一構造、`metadata.alternates.languages` 設定
- [ ] `console.log` 残存禁止
- [ ] 環境変数欠落時のフェイルセーフ（ビルド時警告 + 実行時 500）

### PR 出し方
- 単一 PR で `feature/pages-and-api` → `main`
- 動作確認ログ（form 送信成功、OGP 生成プレビュー URL）添付

---

## 4. X-4: metadata / JSON-LD / sitemap / robots（X-1・X-2 と並列実行可）

### ブランチ
`feature/metadata-seo`

### 担当ファイル
```
app/
├── layout.tsx                  ← metadata（共通）+ JSON-LD 注入（X-3 と分担、metadata 部分のみ）
├── [各ページ]/page.tsx の generateMetadata  ← X-3 側でページ枠を作る、metadata 実装は X-4
├── sitemap.ts
└── robots.ts

components/
└── seo/
    ├── JsonLdWebSite.tsx
    ├── JsonLdOrganization.tsx
    ├── JsonLdArticle.tsx
    └── JsonLdBreadcrumb.tsx
```

### 仕様参照
- `content/seo.ts` — 全ページのタイトル/description、structured data 雛形
- `.claude/architecture.md § 1, 6` — i18n alternates
- `brief.md § 6.3` — Structured Data 種別

### 受け入れ基準
- [ ] `app/layout.tsx` の `metadata` に title template, description, openGraph, twitter, alternates.languages を設定
- [ ] 各ページ `generateMetadata` で `content/seo.ts` から取得
- [ ] 全ページに BreadcrumbList JSON-LD
- [ ] トップに WebSite JSON-LD、/about に Organization JSON-LD、/posts/[slug] に Article JSON-LD
- [ ] OGP 画像: トップは `/brand/ogp-1200x630.png`、投稿は `/api/og?slug=...`（X-3 と連携）
- [ ] `sitemap.ts` で静的ページ + 投稿 slug を列挙
- [ ] `robots.ts` で sitemap URL を宣言、本番のみ allow
- [ ] 日英で `hreflang` 正しく設定

### PR 出し方
- 単一 PR で `feature/metadata-seo` → `main`
- Lighthouse SEO 95+ のスコアショット添付
- Twitter Card Validator / Facebook Sharing Debugger の確認結果添付

---

## 5. 並列実行とマージ順序

```
[並列フェーズ 1]
  X-1 (feature/components-layout)  ──┐
  X-2 (feature/components-sections) ─┼─→ main にマージ
  X-4 (feature/metadata-seo)       ──┘

[直列フェーズ 2]
  X-3 (feature/pages-and-api)  ←─ X-1 と X-2 のマージ完了後に開始
                                  ↓
                                 main にマージ
                                  ↓
                          Phase 3 QUALITY へ
```

ディレクター（星野）が以下の順で Codex を手動キック：
1. X-1, X-2, X-4 を並列投入
2. X-1, X-2 のマージ完了確認
3. X-3 を投入
4. 全 PR マージ完了を C-1 に通知 → Phase 3 開始

---

## 6. Figma 連携

**本案件は Figma デザインなし**。`.claude/design.md` の COLOR SYSTEM / TYPOGRAPHY / SPACING / COMPONENT SPECS をそのままビジュアル真理値として実装する。

---

## 7. 完了基準（Phase 2 終了条件）

- [ ] 4 つの PR が全て `main` にマージ済み
- [ ] `npm run build --webpack` がローカルでエラーなく通る
- [ ] Vercel プレビュー URL が生成される
- [ ] 各ページが目視で表示できる（コンテンツの有無はチェック対象）
- [ ] フォーム送信動作確認（`hello@tokyo-decoded.com` への到達確認）

完了確認後、ディレクター → C-1 に通知 → Phase 3 QUALITY 開始。

---

## 8. 質問先

- 仕様の解釈で迷ったら: ディレクター（星野）に Issue 起票
- 設計トークン追加が必要な場合: PM 経由で C-2 に依頼
- 型追加が必要な場合: `lib/types.ts` 側（API DTO）は X-3 が自由に追加可、`content/types.ts` 側（コンテンツ型）は PM 経由で C-5 に依頼
- アクセシビリティ判断で迷ったら: `.claude/accessibility.md` を再読、それでも不明なら C-4 に確認依頼
