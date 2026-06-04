# X-1 実装指示 — Tokyo Decoded LP 共通レイアウトコンポーネント

> ブランチ: `feature/components-layout`
> 投入先: OpenAI Codex
> 担当: Header / Footer / Navigation / LangToggle / MobileMenu / Container / SkipLink / CookieBanner

---

## Step 0: 実装前の必読ファイル（この順番で全て読むこと）

コードを 1 行も書く前に、以下のファイルを読むこと。読み飛ばしは禁止。読んでから実装を開始すること。

1. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/AGENTS.md`
   - design-contract が記述されている。design.md を読まずに実装を始めることは禁止。
2. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/design.md`
   - **`## ANTI-PATTERNS` セクションは HARD BLOCK**。記載された実装を 1 つでも行った場合はタスク失敗とみなし、自己修正してから PR を出すこと。
3. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/architecture.md`
   - § 2（"use client" 境界）、§ 6（i18n）、§ 7（フォント読み込み）、§ 9（X-1 担当）を重点的に読む。
4. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/accessibility.md`
   - § 1（グローバル）、§ 2（ランドマーク）、§ 4.1 のフッター・言語切替を熟読。
5. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/.claude/codex-handoff.md` § 1
6. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/app/globals.css`
   - `@theme inline {}` のトークン名のみ使用。ハードコードカラー禁止。
7. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/types.ts`
8. `/Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp/content/site.ts`

---

## Step 1: ブランチを作成

```bash
cd /Users/hoshino-s/Desktop/WEB制作チーム/01_進行中/tokyo-decoded-lp
git checkout main
git pull
git checkout -b feature/components-layout
```

---

## Step 2: 担当ファイル

| ファイルパス | 種別 |
|---|---|
| `components/Header.tsx` | Server |
| `components/Footer.tsx` | Server |
| `components/Navigation.tsx` | Server |
| `components/LangToggle.tsx` | Client（`"use client"` 必須） |
| `components/MobileMenu.tsx` | Client（`"use client"` 必須） |
| `components/Container.tsx` | Server |
| `components/SkipLink.tsx` | Server |
| `components/CookieBanner.tsx` | Client（`"use client"` 必須） |

`app/layout.tsx` は **`metadata` export には触らず**、`next/font` の宣言・body の className 適用・SkipLink/Header/main/Footer/CookieBanner の配置のみ行う。

**読み取り専用ファイル**: `app/globals.css`, `content/*.ts`, `tsconfig.json`, `next.config.ts`

---

## Step 3: 共通ルール（違反は再実装）

- スタイルは Tailwind ユーティリティのみ（`style=` 禁止、ハードコード `#hex` 禁止）
- カラーはトークン（`bg-ink`, `text-paper`, `bg-accent`, `bg-cream`, `text-muted`, `text-muted-light`）のみ
- フォントは CSS 変数（`font-[family-name:var(--font-display|sans|jp)]`）経由
- コンテンツは `content/site.ts` から import（JSX 直書きゼロ）
- 角丸: `rounded-none` / `rounded-sm`（バッジのみ）
- シャドウ: Header/Footer/Nav には付けない
- グラデーション・`backdrop-blur` 禁止
- アイコン: SVG インライン直書きのみ。Heroicons / Lucide 等パッケージ禁止
- 画像: `next/image`、alt 必須
- 内部リンク: `next/link`
- `any` 禁止、`console.log` 禁止、全 props に型定義
- 全インタラクティブ要素に `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent`
- `prefers-reduced-motion: reduce` 尊重（`motion-reduce:transition-none`）

---

## Step 4: 各コンポーネント仕様

### Container.tsx
最大幅 1200px、`max-w-[1200px] mx-auto px-[5vw] lg:px-10`。
```ts
type ContainerProps = { children: React.ReactNode; className?: string };
```

### SkipLink.tsx
`<body>` 直下の最初。フォーカス時のみ表示、`#main-content` へジャンプ。
```
sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
focus:bg-paper focus:text-ink focus:px-4 focus:py-2 focus:rounded-sm
focus:ring-2 focus:ring-accent focus:outline-none
```
テキスト: `"メインコンテンツへスキップ"`（この箇所のみ直書き許容）

### Header.tsx
```html
<header role="banner" class="sticky top-0 z-[200] bg-paper border-b border-ink/20">
  <Container>
    <!-- ロゴ + Navigation + LangToggle -->
  </Container>
</header>
```
ロゴ: `public/brand/logo-horizontal.svg`, `alt="Tokyo Decoded"`, `next/image` で `/` へリンク。
SP: ロゴ + ハンバーガー、MD↑: ロゴ + Nav + LangToggle。

### Navigation.tsx
- `content/site.ts` の `siteContent.nav` から生成
- デスクトップでは `href="/"` を除外（ロゴが担当）。SP モバイルメニューには含めて OK
- `<nav aria-label="グローバルナビゲーション">`
- リンク: `text-ink font-sans text-sm font-medium hover:text-accent transition-colors duration-[150ms]`

### LangToggle.tsx（Client）
- `usePathname` で現在ロケール判定、`useRouter().push()` で切替
- Cookie に `lang` を保存（有効期限 365 日）
- パターン:
```html
<div role="group" aria-label="言語切替">
  <button aria-pressed={isJa} lang="ja" aria-label="日本語（現在選択中）">JP</button>
  <button aria-pressed={!isJa} lang="en" aria-label="英語に切り替える">EN</button>
</div>
```

### MobileMenu.tsx（Client）
- `useState` で開閉、トリガーに `aria-expanded` / `aria-controls`
- ドロワー: `role="dialog" aria-modal="true" aria-label="モバイルメニュー"`
- **フォーカストラップ必須**
- **Esc で閉じる**（`useEffect` + `keydown`）
- **閉じた後にトリガーへフォーカス復帰**（`useRef`）
- 中身: `siteContent.nav` 全項目 + `LangToggle`
- ハンバーガー SVG: 3本線 → × の切替を JSX インライン直書き
- `motion-reduce:transition-none`

### Footer.tsx
```html
<footer role="contentinfo" class="bg-ink text-paper">
  <Container>
    <!-- ロゴ / SNS / ページナビ / 開示 / コピーライト -->
  </Container>
</footer>
```

**SNS リンク（8アカ）**:
```html
<nav aria-label="ソーシャルリンク">
  <ul role="list">
    <li>
      <a href="{url}" rel="noopener noreferrer" target="_blank"
         aria-label="{label} で Tokyo Decoded をフォロー（外部サイト）">
        <!-- SVG aria-hidden="true" focusable="false" -->
      </a>
    </li>
  </ul>
</nav>
```

**ページナビ**:
```html
<nav aria-label="フッターナビゲーション">
  <ul role="list">…</ul>
</nav>
```
プライバシー・開示リンクは `siteContent.nav` 外なので、Footer 内でラベル直書き許容。

**アフィリエイト開示文**: `siteContent.footer.disclosureNote_*` を `<small>` で。
**コピーライト**: `siteContent.footer.copyright_ja` を `<small>` で。

**コントラスト重要**: `bg-ink` 上では `text-muted`（NG）・`text-paper/70`（opacity多用禁止）を使わず、**`text-muted-light`（design.md 追加トークン #B8BCC2）または `text-cream`** を使う。

### CookieBanner.tsx（Client）
- `localStorage.cookie-consent` 確認、`accepted`/`rejected` あれば非表示
- `fixed bottom-0 left-0 right-0 z-[600]`、`role="dialog" aria-modal="false" aria-label="Cookieの使用に関する通知"`
- 直書き許容テキスト:
  - 本文: `"当サイトはアクセス解析のため Cookie を使用します。"`
  - 同意: `"同意する"` / 拒否: `"拒否する"`
- `bg-ink text-paper`, `rounded-none`
- `motion-reduce:transition-none`

### app/layout.tsx の編集箇所（metadata は触らない）
1. `next/font/google` 宣言追加（`architecture.md § 7` 通り）:
```ts
import { Space_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500","700"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400","500"], variable: "--font-inter", display: "swap" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400","500","900"], variable: "--font-noto-sans-jp", display: "swap" });
```
2. body に変数を適用:
```tsx
<body className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable}`} suppressHydrationWarning>
```
3. 構造:
```tsx
<body …>
  <SkipLink />
  <Header />
  <main id="main-content" tabIndex={-1}>{children}</main>
  <Footer />
  <CookieBanner />
  {/* GoogleAnalytics — X-3 が実装 */}
</body>
```

---

## Step 5: 自己チェックリスト（PR 前に全項目通過）

### 受け入れ基準（codex-handoff.md § 1）
- [ ] Header: ロゴ + Nav + LangToggle
- [ ] Nav: ホーム除く5項目 + `aria-label="グローバルナビゲーション"`
- [ ] LangToggle: `aria-pressed` 連動
- [ ] MobileMenu: フォーカストラップ / Esc / フォーカス復帰 / `aria-expanded`
- [ ] Footer: 8アカ全 SNS + `rel="noopener"` + `aria-label`
- [ ] Footer: `bg-ink` 上で `text-muted` 不使用（`text-muted-light` / `text-cream` 使用）
- [ ] SkipLink: フォーカス時表示 + `#main-content` へ
- [ ] CookieBanner: 同意/拒否で `localStorage` 保存
- [ ] `prefers-reduced-motion` 尊重

### ANTI-PATTERNS チェック
- [ ] `style=` 0件 / ハードコードカラー 0件
- [ ] グラデーション 0件 / `backdrop-blur` 0件
- [ ] `rounded-md`/`lg`/`xl`/`full` 0件 / `shadow-md`/`lg` 0件
- [ ] Heroicons/Lucide 等パッケージ追加なし
- [ ] DM Sans/Poppins/Nunito/PJS/Arial/Helvetica/system-ui 不使用

### A11y
- [ ] `<header role="banner">` / `<nav aria-label="…">` / `<main id="main-content">` / `<footer role="contentinfo">`
- [ ] 全 `<ul>` に `role="list"` / 全 SVG に `aria-hidden="true" focusable="false"`
- [ ] `next/image`、ロゴ alt="Tokyo Decoded"
- [ ] 全インタラクティブ要素にフォーカスリング

### TS / Build
- [ ] `any` / `console.log` なし、全 props に型
- [ ] `npm run build -- --webpack` 通過、`npm run lint` 通過

---

## Step 6: PR

```bash
git add -A
git commit -m "feat: 共通レイアウトコンポーネント実装 (X-1)"
git push origin feature/components-layout
gh pr create --base main --title "feat: 共通レイアウトコンポーネント実装 (X-1)" --body "..."
```

PR 説明に PC/SP スクリーンショット + ビルド完了ログを添付。
