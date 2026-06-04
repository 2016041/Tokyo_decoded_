# design.md — Visual Design Contract
# Created by: C-2
# Read by: X-1, X-2, X-3, X-4 (read-only)
# Last updated: 2026-06-04 (rev.1: --color-muted-light 追加、ink 背景 AA 対応)

---

## PROJECT IDENTITY

- **Project name**: Tokyo Decoded LP
- **Client industry**: バイリンガルデジタルメディア / 編集部
- **Site type**: LP（多ページ構成：トップ / About / Posts / Tools / Recommended / Contact 等）
- **Target audience**: 日本ミレニアル 25〜40歳（都市圏）、お金・暮らし・美容・AIに関心。セカンダリ：英語圏ミレニアル 25〜40歳
- **Emotional goal**: 「信頼できる編集部だ」「洗練されているのに親しみやすい」と感じてほしい
- **One-word brand personality**: 知的

---

## BRAND OVERVIEW

Tokyo Decoded は「東京から世界を読み解き、日本を世界へ翻訳する」バイリンガル編集部。

ビジュアルは **Editorial Ink** パレットで統一する。白・生成（クリーム）・インクブラックの3トーンを基盤に、朱赤アクセント1点差しで「硬質さ + 一点の熱量」を表現する。グラデーション・透明度の多用・過度な角丸は編集部の知的誠実さを損なうため禁止。

SNS運用チーム `design-system.md` の指針を正本とし、本ドキュメントはそのWEB実装版として位置付ける。両者で矛盾する規定は存在しない（SNS運用チーム正本を優先）。

---

## VISUAL DIRECTION (positive)

- **Overall aesthetic**: 活版印刷の余白感 × 現代ニュースルーム。ページ白 + 生成クリームの2背景で奥行きを作り、インクブラックの水平罫線でセクションを区切る
- **Reference sites**:
  1. https://www.nytimes.com — 水平罫線・セリフ感のある見出し階層・余白の使い方
  2. https://www.monocle.com — 硬質なグリッド・最小限の色数・写真とテキストの対比
  3. https://www.delayed-gratification.co.uk — 印刷物的な誌面構成・アクセントカラーの節制
- **Hero concept**: 大書き見出し左揃え（H1 英語ブランドステートメント）+ 日本語サブコピー。画像なし・テキストのみ。背景は `--color-paper`（白）。中央揃え + 大ボタン1個パターンは禁止
- **Layout rhythm**: 8pt グリッドベース。セクション間は `--spacing-section` で統一。カードは投稿一覧・ツール一覧にのみ限定使用（それ以外での乱用禁止）
- **Photography/illustration style**: 高コントラスト・彩度控えめ。AI生成画像は Firefly Editorial/Documentary スタイル。スタジオ白抜き・過度なフィルター禁止
- **Motion philosophy**: フェードイン（opacity + translateY）のみ許可。1セクション1エフェクト上限。視差・パーティクル禁止

---

## TYPOGRAPHY

### フォント定義

| 役割 | フォント | CSS 変数 | Google Fonts slug |
|------|---------|---------|-------------------|
| 英語見出し・ロゴ | Space Grotesk | `--font-display` | `Space+Grotesk` |
| 英語本文・UI | Inter | `--font-sans` | `Inter` |
| 日本語見出し・本文 | Noto Sans JP | `--font-jp` | `Noto+Sans+JP` |

> フォントは `layout.tsx` で `next/font/google` 経由でロードし、CSS変数（`--font-display` / `--font-sans` / `--font-jp`）として注入する。`globals.css` 内では変数名のみ参照する。

### Weight 規則

| 用途 | フォント | Weight |
|------|---------|--------|
| 英語大見出し（H1/H2）| Space Grotesk | 700 |
| 英語中見出し（H3）| Space Grotesk | 500 |
| 英語本文 | Inter | 400 |
| 英語キャプション・ラベル | Inter | 500 |
| 日本語大見出し | Noto Sans JP | 900 |
| 日本語中見出し | Noto Sans JP | 500 |
| 日本語本文 | Noto Sans JP | 400 |
| 日本語キャプション | Noto Sans JP | 500 |

### タイプスケール（参考値）

| 階層 | サイズ | 備考 |
|------|--------|------|
| H1 | 48px〜64px（clamp） | ヒーローブランドステートメント |
| H2 | 32px〜40px | セクション見出し |
| H3 | 20px〜24px | カード・サブ見出し |
| 本文 | 16px〜18px | 本文基本サイズ |
| キャプション | 12px〜14px | タグ・補足 |

- **Base font size**: 16px（`globals.css` の `html { font-size: 62.5% }` で 1rem = 10px。本文は `1.6rem` 相当）
- **Type scale ratio**: 1.333（Perfect Fourth 準拠）

**Banned fonts (this project)**:
- DM Sans / Nunito / Poppins / Plus Jakarta Sans（共通禁止）
- Arial / Helvetica / system-ui などシステムフォントへの無断フォールバック禁止
- 案件固有追加禁止: なし（Inter は本案件で英語本文・UIに使用するため解禁。ただし `--font-sans` 変数経由のみ）

> 注意: 共通 design-template.md では Inter が「禁止フォント」に列挙されているが、本案件では brief.md §7.3 および SNS運用チーム design-system.md §2 で Inter が英語本文フォントとして正式指定されているため、本案件に限り使用を許可する。`--font-sans` 変数経由での使用のみ有効とし、ハードコードの `font-family: Inter` 直書きは禁止。

---

## COLOR SYSTEM

> `globals.css` の `@theme inline {}` に転記済みの形式で記載する

```css
--color-ink:    #0F1115;   /* プライマリ：テキスト・ロゴ・罫線 */
--color-accent: #E63946;   /* アクセント朱赤：CTA・強調（1画面1〜2箇所まで） */
--color-cream:  #F4F1EA;   /* サブ背景・カード面（温かみが必要な箇所） */
--color-paper:  #FFFFFF;   /* メイン背景 */
--color-muted:       #6B7280;   /* キャプション・補足テキスト（paper 背景専用） */
--color-muted-light: #B8BCC2;   /* ink 背景上の本文・注記用（AA 9.96:1 確保） */
```

### WCAG AA コントラスト比確認

| 前景 | 背景 | 比率（実測） | AA 通常テキスト 4.5:1 | AA 大文字 3:1 | 用途判定 |
|------|------|------------|---------------------|--------------|---------|
| `#0F1115`（ink） | `#FFFFFF`（paper） | 19.6:1 | 合格 | 合格 | 全用途可 |
| `#0F1115`（ink） | `#F4F1EA`（cream） | 17.2:1 | 合格 | 合格 | 全用途可 |
| `#FFFFFF`（paper） | `#0F1115`（ink） | 19.6:1 | 合格 | 合格 | 白抜き全用途可 |
| `#E63946`（accent） | `#FFFFFF`（paper） | **4.17:1** | **不合格** | 合格 | **大文字（18pt+ or 14pt+太字）または CTA ボタン背景のみ。本文テキスト不可** |
| `#E63946`（accent） | `#F4F1EA`（cream） | **3.70:1** | **不合格** | 合格 | **大文字のみ、本文不可** |
| `#6B7280`（muted） | `#FFFFFF`（paper） | 4.55:1 | 合格（ぎりぎり） | 合格 | 本文サイズ可（ただし長文には ink 推奨） |
| `#6B7280`（muted） | `#F4F1EA`（cream） | **4.29:1** | **不合格** | 合格 | **大文字のみ、本文不可** |
| `#6B7280`（muted） | `#0F1115`（ink） | **3.91:1** | **不合格** | 合格 | **大文字のみ。本文・注記は `muted-light` を使うこと** |
| `#B8BCC2`（muted-light） | `#0F1115`（ink） | **9.96:1** | **合格** | 合格 | ink 背景上の本文・アフィリエイト開示・著作権表記 |

> C-4（QA・アクセシビリティ担当）の実測値に基づく。`accent` 色は本文テキストには使用不可、CTA ボタンの背景色または大文字見出しのみで使用すること。`muted` 色は `paper` 上のキャプション・補足テキスト（本文サイズ）に限り可。`cream` 背景や `ink` 背景での `muted` テキストは大文字のみ。`ink` 背景上の本文サイズテキストには必ず `muted-light`（#B8BCC2、9.96:1）を使うこと。

**Color philosophy**: アクセント朱赤は1画面に1〜2箇所まで。本文は必ず `ink`。カード・サブ背景は `cream`。グラデーション禁止。透明度（`opacity` / `rgba` 多用）禁止。アクセント朱赤はテキスト用途では「CTA ボタンの白文字 + accent 背景」または「大書きの見出しキーワードのみ」に限定し、リード文・本文・キャプションでの使用は禁止する。

**Banned color patterns (this project)**:
- Blue-to-purple gradient（共通禁止）
- Teal/cyan をアクセントに使う（共通禁止）
- Glassmorphism（`backdrop-blur` + 半透明背景）（共通禁止）
- Neumorphism（内側シャドウUI）（共通禁止）
- アクセント朱赤の1画面3箇所以上使用
- `rgba(230, 57, 70, 0.*)` などの半透明アクセント使用
- ハードコードカラー直書き（`#E63946` などを `bg-accent` / `text-accent` 以外で使う）

---

## SPACING / GRID

### グリッドシステム

- **ベース単位**: 8pt（4pt 補助単位も許容）
- **コンテナ最大幅**: 1200px（`--container-width`）
- **コンテナ左右パディング**:
  - SP: `5vw`（`--container-padding-x`）
  - LG以上: `40px`（`--container-padding-x-lg`）

### ブレイクポイント（モバイルファースト）

| 名称 | 幅 | CSS 変数 |
|------|----|---------|
| base（SP） | 0〜767px | — |
| md（タブレット） | 768px〜 | `--breakpoint-md` |
| lg（デスクトップ） | 1024px〜 | `--breakpoint-lg` |
| xl（ワイド） | 1440px〜 | `--breakpoint-xl` |

### セクション余白

| 変数 | 値 | 用途 |
|------|-----|------|
| `--spacing-section` | `clamp(64px, 12vw, 120px)` | セクション間縦余白 |
| `--spacing-section-inner` | `clamp(32px, 6vw, 64px)` | セクション内要素間余白 |

---

## BORDER RADIUS

**原則: 0px または 2px のみ。過度な角丸禁止。**

```css
--radius-none: 0px;    /* デフォルト。ボタン・カード・インプット */
--radius-sm:   2px;    /* 微丸め（バッジ・タグのみ）*/
```

> 既存 `globals.css` には `--radius-md: 8px` / `--radius-lg: 16px` 等が定義されているが、本案件のデザイン要件（角丸 0px or 2px のみ）に反するため、Codex はこれらを使用禁止とする。変数は残置するが、実装では参照しないこと。

---

## SHADOW

**ドロップシャドウは原則禁止。** 投稿カード・ツールカードへの微細なシャドウのみ許容。

```css
--shadow-card: 0 1px 4px rgba(0, 0, 0, 0.08);   /* カードのみ使用可 */
```

> `globals.css` の `--shadow-md` / `--shadow-lg` は本案件では使用禁止（過度なシャドウは禁止）。

---

## COMPONENT SPECS

### Button

**プライマリボタン（CTA）**
- 背景: `bg-accent`（`#E63946`）
- テキスト: `text-paper`（白）weight 500
- フォント: `font-sans`（Inter）英語ラベル / `font-jp`（Noto Sans JP）日本語ラベル
- パディング: `px-8 py-3`（SP）/ `px-10 py-4`（MD以上）
- 角丸: `rounded-none`（0px）
- ホバー: 背景 `#C1313D`（accent を 10% 暗く）、`transition-colors duration-[150ms]`
- フォーカス: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`
- アクティブ: `active:scale-95`
- 使用箇所上限: 1画面1〜2箇所

**セカンダリボタン（アウトライン）**
- 背景: 透明
- ボーダー: `border border-ink`
- テキスト: `text-ink`
- ホバー: `hover:bg-ink hover:text-paper transition-colors duration-[150ms]`
- 角丸: `rounded-none`

**テキストリンク**
- 色: `text-ink`（通常）/ `text-accent`（強調、paper 背景限定）
- ホバー: `hover:underline`
- アンダーライン: ホバー時のみ

### Card（投稿・ツール）

- 背景: `bg-cream`
- ボーダー: `border border-ink/10`（薄い罫線）
- 角丸: `rounded-none`（0px）
- パディング: `p-6`（SP）/ `p-8`（MD以上）
- シャドウ: `shadow-[0_1px_4px_rgba(0,0,0,0.08)]`（`--shadow-card`）
- ホバー: `hover:bg-ink hover:text-paper transition-colors duration-[250ms]`
- カテゴリタグ: `bg-accent text-paper text-xs font-medium px-2 py-0.5 rounded-sm`（2px 丸め許容）

### Form（メールリスト・お問い合わせ）

- インプット背景: `bg-paper`
- ボーダー: `border border-ink`（通常）/ `border-accent`（フォーカス）
- 角丸: `rounded-none`
- テキスト: `text-ink`
- プレースホルダー: `text-muted`
- フォーカス: `focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0`
- エラー状態: ボーダー `border-accent`、エラーテキスト `text-accent text-sm`
- サブミットボタン: プライマリボタン仕様に準ずる

### Nav（ナビゲーション）

- 背景: `bg-paper`
- ボーダーボトム: `border-b border-ink/20`
- ロゴ: 左揃え、`logo-horizontal.svg` または `logo-mark-black.svg`
- ナビリンク: 右揃え、`text-ink font-sans text-sm font-medium`
- アクティブリンク: `text-accent`
- 言語切替: 右端、`text-muted text-sm`
- SP: ハンバーガーメニュー表示（ナビリンクは非表示）
- z-index: `z-[200]`（`--z-header`）
- ホバー: `hover:text-accent transition-colors duration-[150ms]`
- フォーカス: `focus-visible:underline focus-visible:outline-none`

### Footer

- 背景: `bg-ink`
- テキスト: `text-paper`
- SNSリンク: `text-paper/70 hover:text-paper transition-colors duration-[150ms]`
- 区切り: `border-t border-paper/20`
- アフィリエイト開示: `text-muted-light text-xs`（ink 背景上 AA 9.96:1 確保済み）
- コピーライト: `text-muted-light text-xs`（同上。`text-paper/50` は opacity 多用禁止規則に抵触するため変更）

---

## LAYOUT & INTERACTION

- **Max width / padding**: 1200px / 5vw（SP）、40px（LG以上）
- **Section vertical spacing**: `clamp(64px, 12vw, 120px)`
- **Hero layout**: テキスト左揃え。H1 大書き（Space Grotesk 700）英語ブランドステートメント。サブコピー日本語（Noto Sans JP 400）。CTAボタン2本（プライマリ + セカンダリ）。背景 `bg-paper`。画像なし。
- **Navigation**: 左ロゴ・右テキストナビ + 言語切替。ハンバーガーはSPのみ。固定ヘッダー（`sticky top-0`）
- **Cards**: 投稿一覧・ツール一覧・推奨ツールにのみ使用。その他では使用禁止
- **Shadows**: `--shadow-card` のみ許容。`--shadow-md` / `--shadow-lg` 使用禁止
- **Animation**: `opacity` フェードイン + `translateY(8px → 0)` のみ。1セクション1エフェクト上限。`transition-[opacity,transform]`、`duration-[400ms]`、`ease-[cubic-bezier(0,0,0.2,1)]`
- **Icons**: SVG インライン直書きのみ。Heroicons / Lucide デフォルト導入禁止（SVGコードとして手書きは可）

---

## ANTI-PATTERNS — HARD BLOCK

> このセクションに記載された実装を行った場合、タスク失敗とみなす。
> X-1〜X-4 はコードを書く前に必ず確認すること。

### 共通禁止（全案件）

**Fonts:**
- [ ] DM Sans / Poppins / Nunito / Plus Jakarta Sans — 汎用AIフォント
- [ ] システムフォントへの無断フォールバック（Arial / Helvetica / system-ui）

**Colors & effects:**
- [ ] Blue-purple gradient（`from-blue-* to-purple-*` 系）
- [ ] Teal/cyan をプライマリアクセントに使う
- [ ] Glassmorphism（`backdrop-blur` + 半透明背景）
- [ ] Neumorphism（内側シャドウUI）
- [ ] `style=` 属性によるインラインスタイル（絶対禁止）
- [ ] Tailwind トークン外のハードコードカラー直書き（例: `text-[#E63946]` → `text-accent` を使う）

**Layout:**
- [ ] ヒーロー: テキスト中央揃え + 大きいボタン1個（AIデフォルトパターン）
- [ ] blob SVG / 有機形状の背景装飾
- [ ] "Features" カード3列（アイコン + 見出し + テキスト）定型パターン

**Animation:**
- [ ] スクロールアニメーション3箇所以上の連発
- [ ] パーティクルアニメーション
- [ ] 視差スクロール（parallax）

**Icons:**
- [ ] Heroicons / Lucide をパッケージとしてデフォルト導入
- [ ] 意味のない装飾アイコン配置

### 案件固有禁止

- [ ] グラデーション全般（`bg-gradient-*`、`linear-gradient` 等）
- [ ] アクセント朱赤（`bg-accent` / `text-accent`）の1画面3箇所以上使用
- [ ] 角丸 `rounded-md` / `rounded-lg` / `rounded-xl` / `rounded-full` 使用（バッジ・タグ以外）
- [ ] `opacity-*` ユーティリティを装飾目的で多用（フェードイン以外での使用は要承認）
- [ ] `backdrop-blur-*` 使用
- [ ] カード以外へのドロップシャドウ適用（`shadow-md` / `shadow-lg` 使用禁止）
- [ ] コンテンツテキストの JSX 直書き（必ず `content/*.ts` から参照）
- [ ] `text-accent` を本文サイズ（< 18pt かつ < 14pt 太字）のテキストに適用
- [ ] `bg-cream` 背景上での `text-muted` 本文使用
- [ ] `bg-ink` 背景上での `text-muted` 本文使用（フッター注意書き含む。→ `text-muted-light` を使うこと。`text-paper opacity-X` や `text-paper/50` も opacity 多用規則により禁止）

---

## SIGN-OFF

- C-2 作成日: 2026-06-04
- ディレクター承認日: [Phase 1 承認時に記入]
- globals.css 整合確認: [x] 済み
