# X-3 実装指示 — Tokyo Decoded LP ページ組み立て・API Route Handler

> ブランチ: `feature/pages-and-api`
> 投入先: OpenAI Codex
> **前提**: X-1（layout）/ X-2（sections）/ X-4（metadata）が `main` にマージ済み
> 担当: app 配下全ページ + app/api 配下 + lib/

---

## 前提確認（着手前に必ず実行）

このタスクは **X-1 / X-2 / X-4 が main にマージ済み** であることが前提です。

1. `git checkout main && git pull` で最新を取得
2. `components/` 配下を **全ファイル読む** — 各コンポーネントの export 名・props 型・"use client" 境界を確認
3. `app/layout.tsx` の現状を確認 — X-1 が `next/font` 設定、X-4 が `metadata` 設定済みのはず
4. 確認後、`feature/pages-and-api` ブランチを main から切る

---

## Step 0: 必読ファイル

| ファイル | 目的 |
|---|---|
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/AGENTS.md` | design-contract |
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/CLAUDE.md` | 案件サマリ・`--webpack` 必須 |
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/design.md` | **ANTI-PATTERNS は HARD BLOCK** |
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/architecture.md` | §1 構造 / §3 型 / §4 API / §5 env / §6 i18n / §8 perf |
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/accessibility.md` | §2 ランドマーク / §3 見出し / §4.7 contact |
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/codex-handoff.md` | §3（X-3 受け入れ基準） |
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/app/globals.css` | トークン名 |
| `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/*.ts` | 全テキスト |
| **マージ済み `components/` 全ファイル** | props 型・export 名・"use client" 境界の確認 |
| `node_modules/next/dist/docs/` | Next.js 16.x の API 確認 |

---

## Step 1: ブランチ
```bash
cd /Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp
git checkout main && git pull && git checkout -b feature/pages-and-api
```

---

## Step 2: 担当ファイル

### app/ — ページ
```
app/
  layout.tsx                       # <GoogleAnalytics /> 配置のみ追加（next/font・metadata は触らない）
  page.tsx
  about/page.tsx
  posts/page.tsx                   # revalidate=3600
  posts/[slug]/page.tsx            # generateStaticParams + revalidate=86400
  tools/page.tsx                   # revalidate=86400
  recommended/page.tsx
  privacy/page.tsx
  disclosure/page.tsx
  contact/page.tsx
  contact/thanks/page.tsx
  en/
    layout.tsx                     # lang="en" 差し替えのみ
    page.tsx
    about/page.tsx
    posts/page.tsx
    posts/[slug]/page.tsx
    tools/page.tsx
    recommended/page.tsx
    privacy/page.tsx
    disclosure/page.tsx
    contact/page.tsx
    contact/thanks/page.tsx
```

### app/api/
```
app/api/
  subscribe/route.ts
  contact/route.ts
  og/route.tsx                     # runtime="edge"
```

### lib/
```
lib/
  types.ts          # content/types.ts の barrel + API DTO（SubscribeRequest/ContactRequest/ApiResult<T>/OgImageParams）
  posts.ts          # getPostBySlug / listPosts / filterPostsByCategory / getRelatedPosts
  resend.ts
  recaptcha.ts      # スコア0.5+ のみ通過
  sheets.ts
  i18n.ts
  rate-limit.ts     # IP ベース（subscribe 5回/時、contact 3回/時）
  utils.ts          # cn() / formatDate()
```

### components/common/
- `GoogleAnalytics.tsx`（X-1 が実装していなければ X-3 が作成）

---

## Step 3: 共通ルール（違反は再実装）

- `content/*.ts` / `globals.css` / `tsconfig.json` / `next.config.ts` / `components/*.tsx` は **読み取り専用**
- `app/layout.tsx` は `<GoogleAnalytics />` 配置のみ追加（X-1 の `next/font`・X-4 の `metadata` は触らない）
- 全ページ Server Component（page.tsx に `"use client"` 禁止）
- コンテンツ JSX 直書き禁止、`content/*.ts` から import → コンポーネントに props
- ハードコードカラー・`style=` 禁止
- `console.log` 禁止 / `any` 禁止
- 全ページに `<main id="main-content" tabindex="-1">`（X-1 の layout.tsx で配置済みのはず）
- ビルドは `npm run build -- --webpack`

---

## Step 4: 実装仕様（要点）

### lib/types.ts
```typescript
// content/types.ts の barrel re-export
export type { Locale, LocalizedString, NavItem, SocialAccount, Category, Post, PostBody,
  AffiliateLink, Tool, RecommendedCategory, RecommendedItem,
  StructuredDataWebSite, StructuredDataOrganization,
  StructuredDataArticle, StructuredDataBreadcrumb } from "@/content/types";

// API 境界型
export type SubscribeFormInput = { email: string };
export type ContactFormInput = { name: string; email: string; subject: string; message: string };
export type SubscribeRequest = { email: string };
export type ContactRequest = ContactFormInput & { recaptchaToken: string };
export type ApiResult<T = void> = { success: boolean; data?: T; error?: string };
export type OgImageParams = { title: string; category: string };
```

### lib/utils.ts
```ts
export function cn(...classes: (string | undefined | false | null)[]): string;
export function formatDate(date: string | Date, locale?: Locale): string;
// ja: "2026年6月1日" / en: "June 1, 2026"
```

### lib/resend.ts
- `RESEND_API_KEY` 未設定: ビルド時 `console.warn`（log禁止、warnは可）、実行時500
- `resend` パッケージ追加可

### lib/recaptcha.ts
```ts
export async function verifyRecaptcha(token: string): Promise<boolean>;
// RECAPTCHA_SECRET_KEY 未設定 or スコア < 0.5 → false
```

### lib/sheets.ts
- `googleapis` 追加可
- `GOOGLE_SHEETS_PRIVATE_KEY` の `\n` を実改行に変換
- 環境変数未設定時: warn + 例外スロー

### lib/rate-limit.ts
- `x-forwarded-for` から IP 取得
- subscribe 5回/時、contact 3回/時
- 超過時 `{ limited: true, retryAfter: number }`

### app/api/subscribe/route.ts
処理: POST 限定 → Zod 検証（email形式）→ IP rate limit → Resend で DL リンクメール → Sheets 追記 → `ApiResult<void>`
レスポンス: 200/400/429(Retry-After付)/500

### app/api/contact/route.ts
処理: POST 限定 → Zod 検証（`ContactRequest`）→ IP rate limit → reCAPTCHA 検証（0.5+）→ Resend で `CONTACT_TO` へ転送 + 送信者へ自動返信
レスポンス: 200/400/403/429/500

### app/api/og/route.tsx
```ts
export const runtime = "edge";
// GET /api/og?title=...&category=...
// @vercel/og の ImageResponse、1200x630 PNG
// フォント: Space Grotesk + Noto Sans JP を fetch で注入
// ロゴ: /brand/logo-mark-red.svg
// Cache-Control: public, max-age=31536000, immutable
```

### app/layout.tsx（追加のみ）
```tsx
import { Suspense } from "react";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

// <body> 内に追加（X-1 / X-4 の既存実装は触らない）
<Suspense fallback={null}>
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
</Suspense>
```

### app/page.tsx（トップ）
```tsx
export const dynamic = "force-static";
```
セクション組み立て順（accessibility.md §4.1 準拠）:
1. Hero（H1）
2. AboutMini
3. LatestPosts（最新3件）
4. EditorsToolsForm（3本柱 + 購読フォーム）
5. RecommendedExcerpt
6. ContactCTA

### app/posts/page.tsx
```tsx
export const revalidate = 3600;
// PostsArchive コンポーネントに posts と categories を渡す
```

### app/posts/[slug]/page.tsx
```tsx
export const revalidate = 86400;
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
// getPostBySlug(slug) → notFound() if undefined
// generateMetadata: OGP に /api/og?title=...&category=... を設定
```

### app/about, /tools, /recommended, /privacy, /disclosure, /contact, /contact/thanks
- 全て Server Component
- `content/*.ts` から import → X-2 セクションコンポーネントに props
- 各ページ `generateMetadata` で `content/seo.ts` の `pageMetadata.*` から取得
- `alternates.languages` に ja/en 設定

### app/en/layout.tsx
```tsx
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en">{children}</html>;
}
```
**重要**: `<html>` の二重出力に注意。Next.js App Router のネストレイアウトでは `<html>` を一度しか出力できない。`app/layout.tsx` との実装関係を確認すること。

### app/en/ 配下の全ページ
- 日本語版と同一構造、`locale="en"` を props でコンポーネントに渡す
- `generateMetadata.alternates`:
```ts
alternates: {
  canonical: `https://tokyo-decoded.com/en/${path}`,
  languages: {
    ja: `https://tokyo-decoded.com/${path}`,
    en: `https://tokyo-decoded.com/en/${path}`,
  },
}
```

### lib/posts.ts
```ts
export function getPostBySlug(slug: string): Post | undefined;
export function listPosts(): readonly Post[];
export function filterPostsByCategory(posts: readonly Post[], categorySlug: string): readonly Post[];
export function getRelatedPosts(post: Post, count?: number): readonly Post[];
```

---

## Step 5: 環境変数（フェイルセーフ必須）

`.env.local.example` をプロジェクトルートに配置済み。Codex は以下を参照する。

| 変数 | 公開/非公開 | 欠落時 |
|---|---|---|
| RESEND_API_KEY | 非公開 | warn + 500 |
| RESEND_FROM | 非公開 | warn + 500 |
| CONTACT_TO | 非公開 | warn + 500 |
| RECAPTCHA_SECRET_KEY | 非公開 | warn + verify false |
| NEXT_PUBLIC_RECAPTCHA_SITE_KEY | 公開 | クライアントが空文字受領 |
| GOOGLE_SHEETS_CLIENT_EMAIL | 非公開 | warn + subscribe 500 |
| GOOGLE_SHEETS_PRIVATE_KEY | 非公開 | 同上 |
| GOOGLE_SHEETS_SPREADSHEET_ID | 非公開 | 同上 |
| NEXT_PUBLIC_GA_ID | 公開 | 空文字 |
| NEXT_PUBLIC_SITE_URL | 公開 | metadataBase で使用 |

---

## Step 6: 受け入れチェックリスト

### ビルド
- [ ] `npm run build -- --webpack` エラー0件
- [ ] `npm run lint` エラー0件
- [ ] `any` / `console.log` なし
- [ ] `style=` インラインなし

### ページ構成
- [ ] 日本語版・英語版全ページが Server Component
- [ ] `app/en/layout.tsx` で lang="en"
- [ ] 全ページ `<main id="main-content" tabindex="-1">`
- [ ] 全ページ H1 が1つで accessibility.md §3 と一致

### コンテンツ
- [ ] 全ページ `content/*.ts` から import（直書きゼロ）

### ISR / 静的生成
- [ ] `/posts` revalidate=3600
- [ ] `/posts/[slug]` generateStaticParams + revalidate=86400
- [ ] `/tools` revalidate=86400
- [ ] その他 force-static

### metadata（X-4 と整合）
- [ ] 全ページ `generateMetadata` 実装
- [ ] `content/seo.ts` から取得
- [ ] `alternates.languages` ja/en 設定
- [ ] `/posts/[slug]` OGP に `/api/og` 動的指定

### API Route
- [ ] subscribe: Zod → rate limit → Resend → Sheets
- [ ] contact: Zod → rate limit → reCAPTCHA(0.5+) → Resend 転送 + 自動返信
- [ ] og: runtime="edge"、1200x630 PNG
- [ ] 全レスポンス `ApiResult<T>` 統一

### A11y
- [ ] 外部リンクに `rel="noopener noreferrer"`
- [ ] アフィリンクに `rel="sponsored"` + aria-label に「PR」
- [ ] reCAPTCHA プライバシー表記が Contact に表示

### 環境変数
- [ ] 全変数の欠落時フェイルセーフ実装

---

## Step 7: PR

```bash
git add -A
git commit -m "feat: ページ組み立て・APIルート実装 (X-3)"
git push origin feature/pages-and-api
gh pr create --base main --title "feat: ページ組み立て・APIルート実装 (X-3)" --body "..."
```

PR 本文に以下添付:
- 実装ファイル一覧
- `npm run build -- --webpack` 成功ログ
- `/api/subscribe` `/api/contact` 動作確認ログ
- `/api/og` プレビュー URL

PR を `feature/pages-and-api` で出してください。
