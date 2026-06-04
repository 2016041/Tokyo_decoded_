# [案件名] プロジェクト

## 基本情報
- クライアント: [FILL: クライアント名]
- 担当ディレクター: [FILL: 担当者名]
- 開始日: [FILL: YYYY-MM-DD]
- 納期: [FILL: YYYY-MM-DD or 未定]
- 予算感: [FILL: 予算感]

## 技術スタック
- フレームワーク: Next.js 16.2.6（App Router）、`--webpack` フラグで起動
- スタイリング: Tailwind CSS 4（`@tailwindcss/postcss`）
- 言語: TypeScript
- ホスティング: Vercel
- CMS: [FILL: なし / headless CMS 名]

## ディレクトリ構成
```
[案件名]/
├── app/
│   ├── layout.tsx        # ルートレイアウト（metadata）
│   ├── page.tsx          # トップページ
│   └── globals.css       # @import "tailwindcss" + @theme inline {}
├── components/
│   └── [FILL: コンポーネント一覧]
├── content/
│   └── [FILL: コンテンツファイル一覧]
├── public/
│   └── og.jpg            # OGP画像
├── vercel.json
├── next.config.ts
├── tsconfig.json
└── package.json
```

## デザイン情報
- Figma URL: [FILL: URL or なし]
- ブランドカラー（`globals.css` の `@theme inline` に記載）
- フォント: [FILL: 使用フォント一覧]

## ページ構成
- [ ] [FILL: ページ名（例: トップ）] — [FILL: 概要]

## 特記事項・注意点
- `next dev` / `next build` は必ず `--webpack` フラグを付けること
- インラインスタイルは禁止
- コンテンツテキストは `content/*.ts` の `as const` オブジェクトで管理

@AGENTS.md
