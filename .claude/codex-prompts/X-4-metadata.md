# X-4 実装指示 — Tokyo Decoded LP メタデータ・SEO

> ブランチ: `feature/metadata-seo`
> 投入先: OpenAI Codex
> 担当: app/layout.tsx metadata / JSON-LD / sitemap / robots

---

## Step 0: 必読ファイル

1. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/AGENTS.md`
2. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/CLAUDE.md`
3. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/architecture.md`（§1, §6, §7）
4. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/codex-handoff.md` § 4
5. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/types.ts`（`StructuredData*` 4型）
6. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/seo.ts`
7. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/site.ts`
8. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/posts.ts`
9. `node_modules/next/dist/docs/` 内の `metadata`・`MetadataRoute` 関連

---

## Step 1: ブランチ
```bash
cd /Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp
git checkout main && git pull && git checkout -b feature/metadata-seo
```

---

## Step 2: 担当ファイル

```
app/
  layout.tsx        # metadata export のみ編集（後述の分担制約厳守）
  sitemap.ts        # 新規
  robots.ts         # 新規
components/seo/
  JsonLdWebSite.tsx
  JsonLdOrganization.tsx
  JsonLdArticle.tsx
  JsonLdBreadcrumb.tsx
```

**触らない**: `globals.css`, `content/*.ts`, `tsconfig.json`, `next.config.ts`, `components/Header.tsx` 系（X-1）, `components/sections/*`（X-2）

---

## Step 3: app/layout.tsx の編集制約（最重要）

X-1（フォント設定）・X-3（ページ組み立て）との共同編集ファイル。コンフリクト回避のため以下厳守。

**X-4 が編集してよい範囲**:
- `metadata` オブジェクトの export
- `<body>` 内 `{children}` 直前への JSON-LD `<script>` 追加（`<JsonLdWebSite />` `<JsonLdOrganization />` の配置）

**X-4 が触ってはいけない範囲**:
- `import` 文（`next/font` は X-1 管理）
- `<html>` `<body>` 構造、`lang` 属性、`suppressHydrationWarning`
- `"use client"` ディレクティブ
- `./globals.css` の import

---

## Step 4: 実装仕様

### app/layout.tsx — metadata export

```typescript
import type { Metadata } from "next";
import { defaultMetadata } from "@/content/seo";

export const metadata: Metadata = {
  metadataBase: new URL(defaultMetadata.siteUrl),
  title: {
    default: defaultMetadata.defaultTitle,
    template: defaultMetadata.titleTemplate,
  },
  description: defaultMetadata.defaultDescription,
  openGraph: {
    title: defaultMetadata.defaultTitle,
    description: defaultMetadata.defaultDescription,
    url: defaultMetadata.siteUrl,
    siteName: "Tokyo Decoded",
    images: [{ url: defaultMetadata.defaultOgImage, width: 1200, height: 630, alt: "Tokyo Decoded" }],
    locale: defaultMetadata.locale,
    alternateLocale: defaultMetadata.alternateLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: defaultMetadata.twitterSite,
    creator: defaultMetadata.twitterCreator,
  },
  alternates: {
    canonical: defaultMetadata.siteUrl,
    languages: {
      "ja-JP": defaultMetadata.siteUrl,
      "en-US": `${defaultMetadata.siteUrl}/en`,
    },
  },
  robots: { index: true, follow: true },
};
```

文字列ハードコード禁止、全て `content/seo.ts` から import。

### app/layout.tsx — JSON-LD 配置

```tsx
<body …>
  …
  <JsonLdWebSite />
  <JsonLdOrganization />
  {children}
  …
</body>
```

### components/seo/JsonLdWebSite.tsx
```tsx
import { structuredDataTemplates } from "@/content/seo";
export default function JsonLdWebSite() {
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataTemplates.webSite) }} />
  );
}
```

### components/seo/JsonLdOrganization.tsx
同様に `structuredDataTemplates.organization` を出力。

### components/seo/JsonLdArticle.tsx
```tsx
import type { StructuredDataArticle } from "@/content/types";
type Props = { data: StructuredDataArticle };
export default function JsonLdArticle({ data }: Props) {
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
```

### components/seo/JsonLdBreadcrumb.tsx
同パターンで `StructuredDataBreadcrumb` 型を props で受け取る。

### app/sitemap.ts

`content/seo.ts` の `robotsPolicy.sitemapPriorities` + `content/posts.ts` の posts を使用。

```typescript
import type { MetadataRoute } from "next";
import { defaultMetadata, robotsPolicy } from "@/content/seo";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = defaultMetadata.siteUrl;
  const staticPaths: Array<{ path: string; key: keyof typeof robotsPolicy.sitemapPriorities; freq: "weekly"|"monthly"|"daily"|"yearly" }> = [
    { path: "",            key: "/",            freq: "weekly" },
    { path: "/about",       key: "/about",       freq: "monthly" },
    { path: "/posts",       key: "/posts",       freq: "daily" },
    { path: "/tools",       key: "/tools",       freq: "monthly" },
    { path: "/recommended", key: "/recommended", freq: "monthly" },
    { path: "/contact",     key: "/contact",     freq: "yearly" },
    { path: "/privacy",     key: "/privacy",     freq: "yearly" },
    { path: "/disclosure",  key: "/disclosure",  freq: "yearly" },
  ];
  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((p) => [
    { url: `${base}${p.path}`,        lastModified: new Date(), changeFrequency: p.freq, priority: robotsPolicy.sitemapPriorities[p.key] },
    { url: `${base}/en${p.path}`,     lastModified: new Date(), changeFrequency: p.freq, priority: robotsPolicy.sitemapPriorities[p.key] },
  ]);
  const postPages: MetadataRoute.Sitemap = posts.flatMap((post) => [
    { url: `${base}/posts/${post.slug}`,    lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: robotsPolicy.sitemapPriorities["/posts/[slug]"] },
    { url: `${base}/en/posts/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: robotsPolicy.sitemapPriorities["/posts/[slug]"] },
  ]);
  return [...staticPages, ...postPages];
}
```

### app/robots.ts

```typescript
import type { MetadataRoute } from "next";
import { defaultMetadata } from "@/content/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultMetadata.siteUrl;
  const isProduction = siteUrl === defaultMetadata.siteUrl;
  return {
    rules: isProduction
      ? { userAgent: "*", allow: "/", disallow: [] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

---

## Step 5: 型・import 規則

- `any` 禁止
- `StructuredData*` 型は `@/content/types` から import
- `Metadata` / `MetadataRoute` 型は `next` から
- 文字列・URL は `content/seo.ts` / `content/site.ts` から import（ハードコード禁止）

---

## Step 6: ビルド
```bash
npm run build -- --webpack
```
エラー 0 件、TS 型エラー 0 件、`console.log` 残存なし。

---

## Step 7: 受け入れチェックリスト

### metadata
- [ ] `metadataBase`, `title.default`, `title.template`, `description`, `openGraph`, `twitter`, `alternates.languages` 全て設定
- [ ] 全値が `content/seo.ts` から import（ハードコードなし）
- [ ] `alternates.languages` に `ja-JP` / `en-US` 両方

### JSON-LD
- [ ] 4コンポーネント作成 / 全 Server Component
- [ ] `<body>` に WebSite / Organization 配置
- [ ] `any` なし

### sitemap.ts
- [ ] 日英静的ページ 16 件 + 投稿動的生成
- [ ] `priority` を `robotsPolicy.sitemapPriorities` から取得
- [ ] 投稿 `lastModified` は `post.publishedAt`

### robots.ts
- [ ] 本番 allow / それ以外 disallow
- [ ] `sitemap` URL 設定

### コンフリクト回避
- [ ] `app/layout.tsx` の変更が metadata + JSON-LD 配置のみ
- [ ] `next/font` 関連 / `<html>` 構造 / globals.css import に手を加えていない

### Build
- [ ] `npm run build -- --webpack` 通過

---

## X-3 連携メモ

`/api/og?slug=...` は X-3 が実装。X-4 では `JsonLdArticle.image` に `content/seo.ts` の各投稿の `ogImage` 静的パスを使用。動的 OGP への差し替えは X-3 マージ後に対応。

---

## Step 8: PR

PR タイトル: `feat: メタデータ・構造化データ実装 (X-4)`
PR 本文: Lighthouse SEO スコア / Twitter Card Validator / Facebook Sharing Debugger の確認結果
PR を `feature/metadata-seo` → `main` で出してください。
