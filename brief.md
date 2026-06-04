# Tokyo Decoded LP 要件定義書

> 作成日：2026-06-04
> ディレクター：星野
> 担当チーム：WEB制作チーム（PM C-1 オーケストレーション）
> ステータス：Phase 1 DESIGN 着手前

---

## 1. プロジェクト概要

### ブランド
**Tokyo Decoded**（東京デコード）— 東京拠点のバイリンガル編集部

- 英語アカウント：`@Tokyo_decoded_`
- 日本語アカウント：`@Tokyo_decoded_jp`（X限定で `@TokyoDecoded_jp`）
- ドメイン：`tokyo-decoded.com`（Cloudflare DNS 稼働中）
- 公開連絡先：`hello@tokyo-decoded.com`

### コンセプト
> Decoding the world from Tokyo, decoding Japan for the world.
> 東京から世界を読み解き、日本を世界へ翻訳する編集部。

「海外トレンド ⇆ 日本」の双方向アービトラージで、ミレニアル世代に向けた **トレンド・データ・文化翻訳** を発信。

### 戦略的位置付け
- 8つのSNS（YouTube/Instagram/X/TikTok ×日英）が **発見層**
- このLPは **信頼層／ハブ／メールリスト資産** の役割
- 将来のアフィリエイト・案件収益のコンバージョン拠点

---

## 2. サイトの目的（優先度順）

| # | 目的 | 重要度 |
|---|---|---|
| 1 | 編集部としての信頼性を示す（ブランドステートメント） | ★★★ |
| 2 | メールリスト構築（無料 Editor's Tools をフックに） | ★★★ |
| 3 | 投稿パッケージのアーカイブ・SEO資産化 | ★★ |
| 4 | 推奨ツールへの導線（アフィリエイト収益化） | ★★ |
| 5 | ASP・PR案件・メディア取材の窓口 | ★ |

---

## 3. ターゲット

### プライマリ
- 日本ミレニアル（25〜40歳）
- 都市圏（東京/大阪/福岡）在住
- お金・暮らし・美容・AI に関心
- SNS（特にIG/TikTok）から流入

### セカンダリ
- 英語圏ミレニアル（25〜40歳、欧米/アジア）
- 日本文化・東京カルチャーに関心
- 同SNSから英語アカ経由で流入

---

## 4. サイト構成

### ページ一覧

```
tokyo-decoded.com
├─ /                  トップ
├─ /about             編集部について
├─ /posts             投稿アーカイブ
│   └─ /posts/[slug]  個別投稿
├─ /tools             Editor's Tools（無料配布）
├─ /recommended       推奨ツール（アフィリンク集）
├─ /privacy           プライバシーポリシー
├─ /disclosure        アフィリエイト開示（ステマ規制対応）
└─ /contact           お問い合わせ
```

### 多言語対応
- `/` 日本語版（デフォルト）
- `/en/` 英語版
- ルートで言語切替トグル（右上）
- Next.js i18n routing 使用

---

## 5. 各ページの要件

### 5.1 `/` トップ

**セクション構成（上→下）**

1. **ヒーロー**
   - ブランドステートメント大書（H1）：「Decoding the world from Tokyo.」
   - サブコピー：「東京から世界を読み解き、日本を世界へ翻訳する編集部。」
   - 言語切替トグル
   - CTAボタン：「最新投稿を見る」「無料ツールを受け取る」

2. **編集部紹介ミニ**
   - 「私たちは何者か」3文程度
   - 顔写真なし・ロゴと文字のみで完結
   - About ページへのリンク

3. **最新投稿（カード3〜6本）**
   - サムネ + タイトル + カテゴリタグ + 投稿日
   - クリックで `/posts/[slug]` へ

4. **Editor's Tools（無料配布）**
   - 3本柱の説明
   - メアド入力フォーム → Resend で配信
   - 「テンプレ」と呼ばない、「Editor's Tools」表記
   - ※初期投入は1点のみ（Digital Kakeibo）

5. **推奨ツール抜粋**
   - カテゴリ別に3〜5商品をピックアップ
   - 「全部見る」で `/recommended` へ

6. **お問い合わせ**
   - シンプルなメッセージ＋ボタンで `/contact` へ

7. **フッター**
   - SNSリンク（8アカ全て）
   - 各ページへのリンク
   - 著作権
   - アフィリエイト開示の短文（フッター固定）

---

### 5.2 `/about` 編集部について

- ミッション
- 戦略（トレンドアービトラージ）
- 3本柱（美容30% / 暮らし30% / お金AI 40%）
- 編集スタンス（データ・出典・親しみやすさ）
- 8つのSNSへのリンク
- お問い合わせ導線

### 5.3 `/posts` 投稿アーカイブ

- カテゴリフィルタ（美容 / 暮らし / お金AI / すべて）
- カード形式の一覧
- ページネーション（10件 / ページ）
- SEO 最適化（OGP動的生成）

### 5.4 `/posts/[slug]` 個別投稿

- 投稿パッケージから1ページ生成
- 構成：フック → データ → 解説 → 実践 → CTA
- 関連 SNS 投稿への誘導
- 関連 Editor's Tool への誘導
- アフィリンク（PR表記必須）
- JSON-LD（Article schema）
- OGP動的生成
- ※初期は `#001 Loud Budgeting` / `#002 Soft Saving` の2本

### 5.5 `/tools` Editor's Tools

- カテゴリ別ツール一覧
- 各ツールの説明 + プレビュー画像
- DLにはメアド登録必須
- ※初期は Digital Kakeibo 1点

### 5.6 `/recommended` 推奨ツール

- カテゴリ別商品紹介（家計 / AI / 美容 / 旅行 etc.）
- アフィリンク（PR明示）
- 「Tokyo Decoded厳選」表記
- ※ASP承認後にコンテンツ追加（初期は空 or "Coming Soon"）

### 5.7 `/privacy` プライバシーポリシー
- 個人情報の取扱い
- Cookie / アクセス解析の説明
- メアド利用範囲
- ステマ規制対応

### 5.8 `/disclosure` アフィリエイト開示
- ステマ規制（景品表示法）対応の明示
- 当サイトは広告収益で運営している旨
- ASP参加先一覧

### 5.9 `/contact` お問い合わせ
- フォーム：名前・メアド・件名・本文
- Resend API でフォーム送信 → hello@tokyo-decoded.com 受け
- 送信完了画面

---

## 6. 機能要件

### 6.1 フォーム
- **メールリスト登録**（Editor's Tools DL用）
  - 入力：メアドのみ
  - 送信：Resend API
  - 自動応答：DLリンク付きメール
  - リスト管理：Google Sheets で開始（後日 ConvertKit 等へ移行）

- **お問い合わせ**
  - Resend API で hello@tokyo-decoded.com へ転送
  - reCAPTCHA v3 でスパム対策

### 6.2 OGP動的生成
- 各 `/posts/[slug]` で OGP画像を動的生成
- @vercel/og 使用
- 投稿タイトル + カテゴリ + ブランドロゴを合成

### 6.3 SEO
- 全ページに `metadata` + JSON-LD
- `sitemap.xml` 自動生成
- `robots.txt`
- Structured Data:
  - WebSite（トップ）
  - Article（投稿ページ）
  - BreadcrumbList（全ページ）
  - Organization（About）

### 6.4 アクセス解析
- Google Analytics 4 連携（gtag）
- 環境変数で ID 管理
- Cookie同意バナー（最小限）

---

## 7. デザイン要件

### 7.1 デザインシステム
**正本：`/Users/hoshino-s/Desktop/SNS運用チーム/team/assets/design-system.md`**

C-2（UIデザイナー）は上記ファイルを完全に読み込み、`design.md` の `## COLOR SYSTEM` `## TYPOGRAPHY` に反映すること。

### 7.2 カラー（Editorial Ink）
| 役割 | Hex | Tailwind トークン名 |
|------|-----|---------------------|
| PRIMARY | `#0F1115` | `--color-ink` |
| ACCENT | `#E63946` | `--color-accent` |
| SUB | `#F4F1EA` | `--color-cream` |
| BG | `#FFFFFF` | `--color-paper` |
| MUTED | `#6B7280` | `--color-muted` |

### 7.3 フォント（next/font 経由）
- **Space Grotesk**（英語見出し・ロゴ）weight 500/700
- **Inter**（英語本文）weight 400/500
- **Noto Sans JP**（日本語見出し・本文）weight 400/500/900

### 7.4 トーン
- 編集部らしい硬質・知的・落ち着き
- グラデーション・透明度多用禁止
- アクセント朱赤は1画面1〜2箇所
- 角丸は 0px or 2px（過度に丸めない）

### 7.5 ロゴアセット
`public/brand/` に配置済：
- `logo-mark-red.svg` — アクセント朱赤マーク
- `logo-mark-black.svg` — モノクロブラック
- `logo-mark-white.svg` — 白抜き
- `logo-horizontal.svg` — 横長（マーク + テキスト）

### 7.6 OGPアセット
- デフォルトOGP：`public/brand/ogp-1200x630.png`
- 投稿OGPは動的生成（@vercel/og）

---

## 8. 技術スタック（CLAUDE.md に準拠）

- **フレームワーク**：Next.js（最新安定版）App Router
- **スタイリング**：Tailwind CSS 4（`@theme inline {}`）
- **言語**：TypeScript
- **フォント**：next/font（Google Fonts）
- **メール**：Resend API
- **デプロイ**：Vercel
- **DNS**：Cloudflare（既存）
- **アナリティクス**：Google Analytics 4
- **i18n**：Next.js 標準（routing）

### 環境変数
```
RESEND_API_KEY=...
NEXT_PUBLIC_GA_ID=...
NEXT_PUBLIC_SITE_URL=https://tokyo-decoded.com
```

---

## 9. コンテンツ（C-5 担当）

### 9.1 ソース
- 戦略ドキュメント：`/Users/hoshino-s/Desktop/SNS運用チーム/team/01-strategy.md`
- 3本柱：`/Users/hoshino-s/Desktop/SNS運用チーム/team/02-content-themes.md`
- 投稿パッケージ：`/Users/hoshino-s/Desktop/SNS運用チーム/team/packages/`
  - `001-loud-budgeting.md`
  - `002-soft-saving.md`

C-5（コンテンツ・SEO）は上記から `content/*.ts` を生成。

### 9.2 ブランドボイス
- 「私たち / we」を一人称
- 「Tokyo Decoded編集部」名乗りOK
- 命令形より「〜してみました」「〜が見えてきました」
- 禁止：「絶対」「100%」「最強」など過度断言

---

## 10. 公開・運用

### 10.1 公開判定
- 全ページ Lighthouse スコア：Performance 90+ / Accessibility 95+ / SEO 95+
- フォーム送信動作確認（実際に hello@ に届く）
- OGP動的生成テスト（Twitter Card Validator / Facebook Sharing Debugger）
- モバイル実機確認

### 10.2 デプロイ
- Vercel 本番デプロイ
- Cloudflare DNS で `tokyo-decoded.com` を Vercel に向ける
- `www` → ルートにリダイレクト
- HTTPS 強制

### 10.3 公開後
- Google Search Console 登録
- Google Analytics 確認
- 各SNSプロフィールに `tokyo-decoded.com` を反映

---

## 11. スコープ外（フェーズ2以降）

以下は今回のスコープ外、別案件として後日対応：
- ニュースレター本格運用（ConvertKit 等への移行）
- ブログCMS化（headless CMS 連携）
- 多言語の自動生成（i18n の手動運用は今回）
- 会員機能・ログイン
- EC機能

---

## 12. 納期目安

- Phase 1 DESIGN：1〜2日（C-2/C-3/C-4/C-5 並列）
- ディレクター承認 → Phase 2 IMPLEMENT：2〜3日（Codex 並列）
- Phase 3 QUALITY：1日（C-3/C-4 並列レビュー）
- Vercel 公開：上記完了後 半日

**最短：4〜5日でローンチ可能**

---

## 13. C-1（PM）への指示

1. 本ドキュメントを起点に Phase 1 DESIGN を開始
2. C-2 / C-3 / C-4 / C-5 に並列タスク分配
3. 各成果物（design.md / アーキ文書 / a11y要件 / content/*.ts）を統合
4. Codex向け実装指示書を作成
5. ディレクター（星野）に承認依頼

質問・不明点は本ドキュメントに追記する形でディレクターにフィードバックしてください。

---

## 14. 参照ドキュメント

| 用途 | パス |
|------|------|
| デザインシステム | `/Users/hoshino-s/Desktop/SNS運用チーム/team/assets/design-system.md` |
| 全体戦略 | `/Users/hoshino-s/Desktop/SNS運用チーム/team/01-strategy.md` |
| コンテンツ戦略 | `/Users/hoshino-s/Desktop/SNS運用チーム/team/02-content-themes.md` |
| 投稿パッケージ#001 | `/Users/hoshino-s/Desktop/SNS運用チーム/team/packages/001-loud-budgeting.md` |
| 投稿パッケージ#002 | `/Users/hoshino-s/Desktop/SNS運用チーム/team/packages/002-soft-saving.md` |
| ロゴアセット | `public/brand/*.svg` |
| OGPベース | `public/brand/ogp-1200x630.png` |
