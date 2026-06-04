<!-- BEGIN:design-contract -->
# MANDATORY: Read design.md before writing any visual code

Before writing any component, CSS token, or layout structure:

1. Read `.claude/design.md` in this project completely.
2. The `## ANTI-PATTERNS` section is a HARD BLOCK — implementing any listed item
   is a task failure, regardless of other instructions.
3. Font families, color values, and layout motifs must match
   `## TYPOGRAPHY` and `## COLOR SYSTEM` exactly.
4. If `.claude/design.md` does not exist, STOP and notify the director.
   Do not proceed with visual implementation.
<!-- END:design-contract -->

# エージェント作業ガイド（Next.js + Tailwind CSS 4）

## 注意：このNext.jsはトレーニングデータと異なる可能性がある

コードを書く前に `node_modules/next/dist/docs/` の関連ガイドを必ず確認すること。
非推奨警告は必ず対処する。

## エージェント別担当ファイル

### Agent 2（UIデザイナー）
- `app/globals.css` — `@theme inline {}` でデザイントークン定義
- `app/layout.tsx` — ルートレイアウト・フォント設定（`next/font` 使用）
- `app/page.tsx` / `app/[ページ]/page.tsx` — マークアップ・Tailwindクラス適用
- `components/` — 再利用UIコンポーネント

### Agent 3（フロントエンドエンジニア）
- `app/api/` — Route Handlers（APIエンドポイント）
- `lib/` / `hooks/` — カスタムフック・ユーティリティ関数
- Server Actions（`app/` 内 `"use server"` 関数）
- 外部API連携・データフェッチ

### Agent 4（QA・アクセシビリティ）
- 全ファイルのレビュー
- アクセシビリティ確認（aria属性、セマンティクス、キーボード操作）
- Lighthouse スコア確認

### Agent 5（コンテンツ・SEO）
- `app/layout.tsx` の `metadata` オブジェクト
- 各ページの `generateMetadata` 関数
- `public/` の OGP画像

## Tailwind CSS 4 の使い方

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-brand: #0d9488;
  --color-brand-dark: #0f766e;
  --font-heading: "Noto Serif JP", serif;
}
```

カスタムトークンは `bg-brand`、`text-brand` のようにユーティリティクラスとして使用できる。

## Next.js App Router の基本規則

- `"use client"` — ブラウザAPIやイベントハンドラが必要なコンポーネントのみ付与
- `"use server"` — フォーム送信・DB操作などのServer Actions
- `next/image` — 画像は必ずこれを使用（WebP最適化・alt必須）
- `next/font` — フォントはこれで読み込む（システムフォント禁止）
- `next/link` — 内部リンクは必ずこれを使用

## Vercel デプロイ

- `vercel.json` がプロジェクトルートに存在することを確認
- 環境変数は `.env.local`（ローカル）、本番はVercelダッシュボードで設定
- `main` ブランチへのpushで本番自動デプロイ
