# Codex 投入依頼レポート — Tokyo Decoded LP Phase 2

> 提出: PM C-1 → ディレクター（星野）
> 提出日: 2026-06-05
> ステータス: Phase 1 DESIGN 完了・承認済み / **Phase 2 IMPLEMENT GO**

---

## 1. 投入アクション（ディレクター手動操作）

### Step 1: X-1 / X-2 / X-4 を **並列** で Codex に投入

各プロンプトファイルの内容をそのまま Codex に貼り付けてください。

| エージェント | プロンプトファイル | ブランチ | 担当領域 |
|---|---|---|---|
| **X-1** | `.claude/codex-prompts/X-1-layout.md` | `feature/components-layout` | Header / Footer / Nav / LangToggle / MobileMenu / Container / SkipLink / CookieBanner |
| **X-2** | `.claude/codex-prompts/X-2-sections.md` | `feature/components-sections` | Hero / About / Posts / Tools / Recommended / Contact 各セクション + UI プリミティブ |
| **X-4** | `.claude/codex-prompts/X-4-metadata.md` | `feature/metadata-seo` | metadata / JSON-LD / sitemap.ts / robots.ts |

### Step 2: X-1 と X-2 の PR が main にマージされたら X-3 を投入

X-3 のプロンプトは X-1/X-2 のマージ後に C-1 が生成します（X-1/X-2 の実装差分を確認した上で API Route と page.tsx の整合性を担保するため）。

### Step 3: 全 PR マージ完了を C-1 に通知 → Phase 3 QUALITY 開始

---

## 2. 並列・直列の依存関係

```
[並列] X-1 ─┐
[並列] X-2 ─┼──→ main マージ ──→ [直列] X-3 ──→ main ──→ Phase 3
[並列] X-4 ─┘
```

`app/layout.tsx` は X-1（フォント / Layout 構造）と X-4（metadata / JSON-LD）が共同編集するため、各プロンプトに**触ってよい範囲を厳密に分離**して記載済み。コンフリクトが発生した場合は X-4 PR を先にマージし、X-1 はリベース対応で対処してください。

---

## 3. Phase 1 成果物の所在（Codex / レビュワーが参照）

| ファイル | 役割 |
|---|---|
| `.claude/design.md` | デザインシステム正本（ANTI-PATTERNS は HARD BLOCK） |
| `.claude/architecture.md` | アーキテクチャ・型方針・"use client" 境界 |
| `.claude/accessibility.md` | ARIA 仕様（属性レベルまで具体化） |
| `.claude/codex-handoff.md` | X-1〜X-4 共通の受け入れ基準 |
| `app/globals.css` | `@theme inline` 確定済み |
| `content/types.ts` ＋ 9 ファイル | 全テキスト + 型（C-5 管理） |

---

## 4. 未確定・要判断事項（**着手前にディレクター判断願います**）

| # | 項目 | 判断者 | デフォルト挙動 |
|---|---|---|---|
| A | `/recommended` の初期コンテンツ | 星野 | **Coming Soon** で公開（C-5 実装済み） |
| B | アフィリンク実 URL（投稿2本分） | 星野（ASP 承認待ち） | プレースホルダ URL のまま公開 → 承認後差し替え |
| C | reCAPTCHA v3 サイトキー / シークレット | 星野 | Vercel 環境変数登録 |
| D | Resend API キー / Google Sheets 連携 | 星野 | 同上 |
| E | GA4 測定 ID | 星野 | 同上 |

A〜B は実装に影響しないため Phase 2 開始 OK。C〜E は X-3 投入前までに Vercel ダッシュボードに登録が必要です。

---

## 5. リスク・留意点

- **Next.js 16.2.6** はトレーニングデータに含まれない可能性が高いため、各プロンプト冒頭で `node_modules/next/dist/docs/` の参照を Codex に指示済み
- `--webpack` フラグは全ビルドコマンドで必須（`package.json` 設定済み、プロンプト内でも周知済み）
- 既存の `app/layout.tsx` / `app/page.tsx` は雛形のみのため、X-1（layout）/ X-3（page）が上書きする前提

---

## 6. Phase 3 QUALITY（参考）

X-3 マージ完了後、PM が C-3（技術 QA）・C-4（a11y QA）を並列起動し、Lighthouse 90+/95+/95+、フォーム実送信、OGP 動的生成テストを実施します。その後 C-5 SEO 最終確認 → C-2 デザイン整合確認 → 全 QA 承認 → Vercel デプロイ → ディレクター報告という流れです。

---

## 7. 次のアクション

ディレクターの作業は **3 つの Codex タブを開いて、各プロンプトファイルの中身を貼り付けて Run** だけです。PR が上がり次第 C-1 に通知してください。X-3 のプロンプト生成と Phase 3 起動を引き継ぎます。
