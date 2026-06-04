# Tokyo Decoded LP アクセシビリティ要件定義書

> 作成者: C-4（QA・アクセシビリティ担当）
> 作成日: 2026-06-04
> 準拠規格: WCAG 2.2 AA
> 公開判定: Lighthouse Accessibility 95+
> 対象 Codex: X-1（Header/Footer/Nav）/ X-2（各セクション）/ X-3（ページ組立・API）

---

## 1. グローバル要件

### 1.1 言語属性

```html
<!-- 日本語デフォルト -->
<html lang="ja">

<!-- /en/ 配下の英語版 -->
<html lang="en">
```

- `lang` 属性は必ず `<html>` タグに付与する
- ページ内に混在言語がある場合（英語タイトルのみ等）は該当要素に `lang="en"` を付与する
  - 例: `<h1 lang="en">Decoding the world from Tokyo.</h1>`

### 1.2 スキップリンク

```html
<a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>
```

- `<body>` 直下の最初の要素として配置する（ヘッダーより前）
- 通常時は画面外に隠す。`focus` 時のみ画面左上に表示する
- Tailwind クラス構成:

```
sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
focus:bg-paper focus:text-ink focus:px-4 focus:py-2 focus:rounded-sm
focus:ring-2 focus:ring-accent focus:outline-none
```

### 1.3 フォーカスインジケータ

全インタラクティブ要素に統一スタイルを適用する:

```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
focus-visible:ring-accent
```

- `focus` ではなく `focus-visible` を使用する（マウス操作時にリングを表示しない）
- `ring-accent` = `--color-accent` (`#E63946`)。白背景上では 3.70:1（大テキスト AA pass）のため、細いリング（2px）＋ `ring-offset-2`（白スペース）で視認性を確保する
- `ring-offset-color` はページ背景色に合わせる。cream 背景上では `ring-offset-cream` を指定する

### 1.4 キーボードトラップ禁止

モーダル・ドロワーを使用する場合:

- 開いている間はフォーカスを内部に閉じ込める（フォーカストラップ **必須**）
- `Esc` キーで閉じてトリガー要素にフォーカスを戻す
- モーダル外の `inert` 属性設定を推奨:
  ```html
  <div id="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    ...
  </div>
  <!-- モーダル開放中は他の領域に inert を付与 -->
  <main inert>...</main>
  ```

### 1.5 動的更新の aria-live

| 用途 | 属性値 | 配置場所 |
|------|--------|----------|
| フォーム送信成功メッセージ | `aria-live="polite"` | フォームの直後に常設コンテナを用意 |
| フォームエラーサマリー | `aria-live="assertive"` | フォームの先頭 |
| カテゴリフィルタ適用後の件数表示 | `aria-live="polite"` | フィルタUIの直下 |
| 送信中スピナー | `role="status" aria-live="polite"` | ボタン内またはボタン直後 |

```html
<!-- フォーム成功通知の例 -->
<div aria-live="polite" aria-atomic="true" class="sr-only" id="form-status"></div>
```

### 1.6 prefers-reduced-motion

アニメーションをすべて停止する CSS を globals.css に追加する:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- スクロールアニメーション・フェードイン・スライドイン すべて対象
- Tailwind の `motion-reduce:` バリアントも積極的に使用する

---

## 2. ランドマーク構成

全ページ共通のランドマーク構造:

```html
<body>
  <a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>

  <header role="banner">
    <nav aria-label="グローバルナビゲーション">
      <!-- ロゴ + 主要リンク + 言語切替 -->
    </nav>
  </header>

  <main id="main-content" tabindex="-1">
    <!-- ページ固有コンテンツ -->
  </main>

  <footer role="contentinfo">
    <nav aria-label="フッターナビゲーション">
      <!-- ページリンク群 -->
    </nav>
    <nav aria-label="ソーシャルリンク">
      <!-- SNS 8アカ -->
    </nav>
  </footer>
</body>
```

- `<header>` / `<nav>` / `<main>` / `<footer>` は必ずセマンティックタグを使用する（div 代用禁止）
- `<main>` には `id="main-content"` と `tabindex="-1"` を付与する（スキップリンクのフォーカス先）
- 複数の `<nav>` が存在する場合は必ず `aria-label` で区別する

---

## 3. 見出し階層ルール（全ページ共通）

```
H1: ページを代表する見出し（各ページに1つのみ）
  H2: 主要セクション
    H3: サブセクション・カード内見出し
      H4: 必要な場合のみ（カード内の補足項目等）
```

### ページ別 H1 指定

| ページ | H1 テキスト |
|--------|------------|
| `/` | `Decoding the world from Tokyo.`（lang="en" 付与） |
| `/about` | `編集部について` または `About Tokyo Decoded` |
| `/posts` | `投稿アーカイブ` |
| `/posts/[slug]` | 投稿タイトル |
| `/tools` | `Editor's Tools` |
| `/recommended` | `推奨ツール` |
| `/contact` | `お問い合わせ` |
| `/privacy` | `プライバシーポリシー` |
| `/disclosure` | `アフィリエイト開示` |

- `<h1>` を視覚的に隠す必要がある場合は `class="sr-only"` を使用する（要素ごと削除は禁止）
- 見出しタグを装飾目的で使用しない（サイズ変更は Tailwind クラスで対応）

---

## 4. ページ別 ARIA / セマンティクス仕様

### 4.1 `/` トップページ

#### Hero セクション

```html
<section aria-labelledby="hero-heading">
  <h1 id="hero-heading" lang="en">Decoding the world from Tokyo.</h1>
  <p>東京から世界を読み解き、日本を世界へ翻訳する編集部。</p>

  <!-- CTAボタン群 -->
  <div role="group" aria-label="メインアクション">
    <a href="/posts" class="btn-primary">最新投稿を見る</a>
    <a href="/tools" class="btn-secondary">無料ツールを受け取る</a>
  </div>

  <!-- 言語切替トグル -->
  <div role="group" aria-label="言語切替">
    <button aria-pressed="true" lang="ja" aria-label="日本語（現在選択中）">JP</button>
    <button aria-pressed="false" lang="en" aria-label="英語に切り替える">EN</button>
  </div>
</section>
```

- CTA の `<a>` はリンク先が明確なため `<a>` タグを使用する（`<button>` 不使用）
- 言語切替は `<button>` + `aria-pressed` で実装する（toggle button pattern）
- 現在の言語には `aria-pressed="true"` を付与し、非選択側は `aria-pressed="false"` とする
- 言語切替ボタンには `aria-label` でアクションを説明する

#### 編集部紹介ミニ セクション

```html
<section aria-labelledby="about-mini-heading">
  <h2 id="about-mini-heading">私たちは何者か</h2>
  <!-- 3文の説明 -->
  <a href="/about">編集部の詳細を見る<span class="sr-only">（Aboutページへ）</span></a>
</section>
```

#### 最新投稿カード セクション

```html
<section aria-labelledby="latest-posts-heading">
  <h2 id="latest-posts-heading">最新投稿</h2>
  <ul role="list">
    <li>
      <article aria-labelledby="post-card-title-{slug}">
        <a href="/posts/{slug}" class="block focus-visible:ring-2 ...">
          <img
            src="/images/{slug}-thumb.webp"
            alt="{投稿タイトルと同じテキスト}"
            width="400"
            height="225"
            loading="lazy"
          />
          <h3 id="post-card-title-{slug}">{投稿タイトル}</h3>
          <p><span class="sr-only">カテゴリ: </span>{カテゴリタグ}</p>
          <time datetime="{YYYY-MM-DD}">{投稿日}</time>
        </a>
      </article>
    </li>
  </ul>
</section>
```

- カード全体をリンクにする場合は `<a>` で `<article>` 全体を包む（`aria-labelledby` でアクセシブルネームを付与）
- `<ul role="list">` を使用する（CSS で `list-style: none` にすると Safari でリスト意味論が失われるため `role="list"` を明示する）
- サムネイルの `alt` は投稿タイトルと同一テキストにする
- `<time>` の `datetime` 属性は機械可読形式 (`YYYY-MM-DD`) を使用する

#### Editor's Tools フォーム セクション

```html
<section aria-labelledby="tools-form-heading">
  <h2 id="tools-form-heading">Editor's Tools を無料で受け取る</h2>

  <form
    aria-describedby="tools-form-description"
    novalidate
    id="tools-form"
  >
    <p id="tools-form-description">
      メールアドレスを登録すると、無料でダウンロードリンクをお届けします。
    </p>

    <!-- ライブリージョン（エラー・成功通知） -->
    <div aria-live="assertive" aria-atomic="true" id="tools-form-error" role="alert" class="sr-only"></div>
    <div aria-live="polite" aria-atomic="true" id="tools-form-success" class="sr-only"></div>

    <div>
      <label for="tools-email">メールアドレス <span aria-hidden="true">*</span><span class="sr-only">（必須）</span></label>
      <input
        type="email"
        id="tools-email"
        name="email"
        required
        autocomplete="email"
        aria-describedby="tools-email-hint tools-email-error"
        aria-required="true"
      />
      <p id="tools-email-hint" class="text-sm text-muted">例: you@example.com</p>
      <!-- エラー時のみ表示 -->
      <p id="tools-email-error" role="alert" aria-live="assertive" class="hidden text-accent text-sm">
        {エラーメッセージ}
      </p>
    </div>

    <button
      type="submit"
      aria-describedby="tools-form-description"
    >
      無料で受け取る
      <!-- 送信中は以下に差し替え -->
      <!-- aria-busy="true" のうえ「送信中...」テキストに変更 -->
    </button>
  </form>
</section>
```

- バリデーションエラー時は当該 `input` に `aria-invalid="true"` を付与し、`#tools-email-error` を表示する
- 成功時は `#tools-form-success` に「登録が完了しました。メールをご確認ください。」を挿入する（`aria-live="polite"`）
- 送信中はボタンに `aria-busy="true"` を付与し、テキストを「送信中...」に変更する

#### 推奨ツール抜粋 セクション

```html
<section aria-labelledby="recommended-heading">
  <h2 id="recommended-heading">推奨ツール</h2>
  <ul role="list">
    <li>
      <article>
        <h3>{ツール名}</h3>
        <p>{説明文}</p>
        <a
          href="{アフィリエイトURL}"
          rel="sponsored noopener noreferrer"
          target="_blank"
          aria-label="{ツール名}（外部サイト・PR）"
        >
          詳細を見る
        </a>
      </article>
    </li>
  </ul>
  <a href="/recommended">すべての推奨ツールを見る</a>
</section>
```

- 外部リンクには必ず `rel="noopener noreferrer"` を付与する
- アフィリエイトリンクは `rel="sponsored"` を追加する
- `target="_blank"` で開くリンクの `aria-label` に「外部サイト」を明記する
- PR である場合は `aria-label` にも「PR」を含める

#### フッター

```html
<footer role="contentinfo">
  <!-- SNS リンク（8アカ全て） -->
  <nav aria-label="ソーシャルリンク">
    <ul role="list">
      <!-- YouTube JP -->
      <li>
        <a href="{URL}" rel="noopener noreferrer" target="_blank" aria-label="YouTube（日本語）（外部サイト）">
          <!-- SVGアイコン（aria-hidden="true"） -->
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
      <!-- YouTube EN -->
      <li>
        <a href="{URL}" rel="noopener noreferrer" target="_blank" aria-label="YouTube（英語）（外部サイト）">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
      <!-- Instagram JP -->
      <li>
        <a href="{URL}" rel="noopener noreferrer" target="_blank" aria-label="Instagram（日本語）（外部サイト）">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
      <!-- Instagram EN -->
      <li>
        <a href="{URL}" rel="noopener noreferrer" target="_blank" aria-label="Instagram（英語）（外部サイト）">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
      <!-- X JP -->
      <li>
        <a href="https://x.com/TokyoDecoded_jp" rel="noopener noreferrer" target="_blank" aria-label="X（旧Twitter）日本語アカウント（外部サイト）">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
      <!-- X EN -->
      <li>
        <a href="https://x.com/Tokyo_decoded_" rel="noopener noreferrer" target="_blank" aria-label="X（旧Twitter）英語アカウント（外部サイト）">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
      <!-- TikTok JP -->
      <li>
        <a href="{URL}" rel="noopener noreferrer" target="_blank" aria-label="TikTok（日本語）（外部サイト）">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
      <!-- TikTok EN -->
      <li>
        <a href="{URL}" rel="noopener noreferrer" target="_blank" aria-label="TikTok（英語）（外部サイト）">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
      </li>
    </ul>
  </nav>

  <!-- ページナビゲーション -->
  <nav aria-label="フッターナビゲーション">
    <ul role="list">
      <li><a href="/about">About</a></li>
      <li><a href="/posts">投稿</a></li>
      <li><a href="/tools">Editor's Tools</a></li>
      <li><a href="/recommended">推奨ツール</a></li>
      <li><a href="/contact">お問い合わせ</a></li>
      <li><a href="/privacy">プライバシーポリシー</a></li>
      <li><a href="/disclosure">アフィリエイト開示</a></li>
    </ul>
  </nav>

  <p>
    <small>
      当サイトは広告収益（アフィリエイト）を含みます。
      詳細は<a href="/disclosure">アフィリエイト開示</a>をご覧ください。
    </small>
  </p>
  <p><small>&copy; 2024 Tokyo Decoded. All rights reserved.</small></p>
</footer>
```

- SVGアイコンのみのリンクには必ず `aria-label` でリンク先と開き方を説明する
- SVGには `aria-hidden="true"` と `focusable="false"` を付与する（IE11 以降の SVG フォーカス問題対策）

---

### 4.2 `/about` 編集部について

```html
<main id="main-content" tabindex="-1">
  <article>
    <h1>編集部について</h1>

    <section aria-labelledby="mission-heading">
      <h2 id="mission-heading">ミッション</h2>
    </section>

    <section aria-labelledby="strategy-heading">
      <h2 id="strategy-heading">戦略：トレンドアービトラージ</h2>
    </section>

    <section aria-labelledby="pillars-heading">
      <h2 id="pillars-heading">コンテンツの3本柱</h2>
      <ul>
        <li>
          <h3>美容</h3>
          <p>全体の約30%</p>
        </li>
        <li>
          <h3>暮らし</h3>
          <p>全体の約30%</p>
        </li>
        <li>
          <h3>お金・AI</h3>
          <p>全体の約40%</p>
        </li>
      </ul>
    </section>

    <section aria-labelledby="editorial-stance-heading">
      <h2 id="editorial-stance-heading">編集スタンス</h2>
    </section>

    <section aria-labelledby="sns-links-heading">
      <h2 id="sns-links-heading">SNSで follow する</h2>
      <!-- 4.1 フッターの SNS リンクと同一パターン -->
    </section>
  </article>
</main>
```

---

### 4.3 `/posts` 投稿アーカイブ

#### カテゴリフィルタ

**button group パターン**を使用する（tab pattern は不要、コンテンツの表示切替でありタブパネルではないため）:

```html
<div role="group" aria-label="カテゴリフィルタ">
  <button
    type="button"
    aria-pressed="true"
    data-category="all"
  >すべて</button>
  <button
    type="button"
    aria-pressed="false"
    data-category="beauty"
  >美容</button>
  <button
    type="button"
    aria-pressed="false"
    data-category="life"
  >暮らし</button>
  <button
    type="button"
    aria-pressed="false"
    data-category="money-ai"
  >お金・AI</button>
</div>

<!-- フィルタ結果のライブリージョン -->
<p
  aria-live="polite"
  aria-atomic="true"
  id="filter-results-count"
  class="sr-only"
>
  {n}件の投稿が見つかりました
</p>
```

- アクティブなボタンは `aria-pressed="true"` とし、それ以外は `aria-pressed="false"` とする
- フィルタ適用後に `#filter-results-count` を更新してスクリーンリーダーに通知する

#### ページネーション

```html
<nav aria-label="ページネーション">
  <ul role="list">
    <li>
      <a href="/posts?page=1" aria-label="前のページ（ページ1）" rel="prev">
        <svg aria-hidden="true" focusable="false"><!-- 左矢印 --></svg>
        <span class="sr-only">前へ</span>
      </a>
    </li>
    <li>
      <a href="/posts?page=1" aria-label="1ページ目">1</a>
    </li>
    <li>
      <!-- 現在ページ -->
      <a href="/posts?page=2" aria-label="2ページ目（現在のページ）" aria-current="page">2</a>
    </li>
    <li>
      <a href="/posts?page=3" aria-label="3ページ目">3</a>
    </li>
    <li>
      <a href="/posts?page=3" aria-label="次のページ（ページ3）" rel="next">
        <svg aria-hidden="true" focusable="false"><!-- 右矢印 --></svg>
        <span class="sr-only">次へ</span>
      </a>
    </li>
  </ul>
</nav>
```

- 現在ページのリンクには `aria-current="page"` を付与する
- 最初・最後のページで前・次ボタンを非活性にする場合は `aria-disabled="true"` + `tabindex="-1"` を使用する（`disabled` 属性は `<a>` に使えないため）

#### 検索結果ライブリージョン

フィルタと同様のパターンを使用する（前述 `#filter-results-count` を流用可）

---

### 4.4 `/posts/[slug]` 個別投稿

#### 全体構造

```html
<main id="main-content" tabindex="-1">
  <!-- パンくずリスト -->
  <nav aria-label="パンくず">
    <ol>
      <li><a href="/">ホーム</a></li>
      <li><a href="/posts">投稿</a></li>
      <li aria-current="page">{投稿タイトル}</li>
    </ol>
  </nav>

  <article aria-labelledby="post-title">
    <header>
      <h1 id="post-title">{投稿タイトル}</h1>
      <p>
        <span class="sr-only">カテゴリ: </span>
        <a href="/posts?category={slug}">{カテゴリ}</a>
      </p>
      <time datetime="{YYYY-MM-DD}">{投稿日}</time>
    </header>

    <!-- 本文コンテンツ -->
    <section aria-labelledby="post-body-heading">
      <!-- フック → データ → 解説 → 実践 → CTA の各 H2 で構成 -->
    </section>

    <!-- アフィリエイトリンク領域 -->
    <aside aria-labelledby="affiliate-links-heading">
      <h2 id="affiliate-links-heading">関連ツール・商品（PR）</h2>
      <!-- PR表記をテキストとしても明示 -->
      <p>
        <strong>PR・広告</strong>：
        以下のリンクはアフィリエイトリンクを含みます。
        <a href="/disclosure">詳細はこちら</a>
      </p>
      <ul role="list">
        <li>
          <a
            href="{アフィリエイトURL}"
            rel="sponsored noopener noreferrer"
            target="_blank"
            aria-label="{商品名}（外部サイト・PR）"
          >
            {商品名}
          </a>
        </li>
      </ul>
    </aside>

    <!-- 関連投稿 -->
    <aside aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading">関連投稿</h2>
      <ul role="list">
        <li>
          <article aria-labelledby="related-post-title-{slug}">
            <h3 id="related-post-title-{slug}">
              <a href="/posts/{slug}">{投稿タイトル}</a>
            </h3>
          </article>
        </li>
      </ul>
    </aside>

    <!-- 関連 Editor's Tool -->
    <aside aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading">関連 Editor's Tools</h2>
    </aside>
  </article>
</main>
```

- パンくずリストは `<ol>`（順序あり）を使用する
- 最後の要素（現在ページ）には `aria-current="page"` を付与しリンクにしない
- アフィリエイトリンクは PR 表記を**視覚的テキスト**と `aria-label` 両方で明示する

---

### 4.5 `/tools` Editor's Tools

```html
<main id="main-content" tabindex="-1">
  <h1>Editor's Tools</h1>

  <ul role="list">
    <li>
      <article aria-labelledby="tool-{id}-heading">
        <h2 id="tool-{id}-heading">{ツール名}</h2>
        <img
          src="{preview.webp}"
          alt="{ツール名}のプレビュー画像"
          width="600"
          height="400"
          loading="lazy"
        />
        <p>{説明文}</p>
        <button
          type="button"
          aria-describedby="tool-{id}-dl-note"
        >
          ダウンロードする（メール登録必須）
        </button>
        <p id="tool-{id}-dl-note" class="sr-only">
          メールアドレスを登録するとダウンロードリンクをお届けします
        </p>
      </article>
    </li>
  </ul>
</main>
```

- DL ボタンはフォームモーダルをトリガーする `<button>` として実装する
- モーダル開放時のフォーカストラップは 1.4 節に準拠する

---

### 4.6 `/recommended` 推奨ツール

```html
<main id="main-content" tabindex="-1">
  <h1>推奨ツール <span>— Tokyo Decoded厳選</span></h1>

  <!-- Coming Soon の場合 -->
  <!-- aria-disabled は使用しない。単なるテキスト表示とする -->
  <section aria-labelledby="coming-soon-heading">
    <h2 id="coming-soon-heading">準備中</h2>
    <p>現在コンテンツを準備中です。もうしばらくお待ちください。</p>
    <!-- ボタンを置かない。リンクなし・disabled なし -->
  </section>

  <!-- コンテンツがある場合 -->
  <section aria-labelledby="category-{name}-heading">
    <h2 id="category-{name}-heading">{カテゴリ名}</h2>
    <ul role="list">
      <li>
        <article aria-labelledby="rec-{id}-heading">
          <h3 id="rec-{id}-heading">{商品名}</h3>
          <p>{説明}</p>
          <p aria-hidden="true">PR</p><!-- 装飾的 PR バッジ -->
          <a
            href="{アフィリエイトURL}"
            rel="sponsored noopener noreferrer"
            target="_blank"
            aria-label="{商品名} — 公式サイトを開く（外部サイト・PR）"
          >
            公式サイトを見る
          </a>
        </article>
      </li>
    </ul>
  </section>
</main>
```

- Coming Soon 状態は `aria-disabled` ではなくテキストのみで表現する（`aria-disabled` はインタラクティブ要素に使用する属性であるため）

---

### 4.7 `/contact` お問い合わせ

```html
<main id="main-content" tabindex="-1">
  <h1>お問い合わせ</h1>

  <form
    id="contact-form"
    novalidate
    aria-describedby="contact-form-intro"
  >
    <p id="contact-form-intro">
      以下のフォームにご記入の上、送信してください。
      通常3営業日以内にご返信いたします。
    </p>

    <!-- エラーサマリー（バリデーション失敗時のみ表示） -->
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      id="contact-error-summary"
      class="hidden"
    >
      <h2>入力内容を確認してください</h2>
      <ul id="contact-error-list"></ul>
    </div>

    <!-- 成功通知 -->
    <div
      aria-live="polite"
      aria-atomic="true"
      id="contact-success"
      class="sr-only"
    ></div>

    <fieldset>
      <legend>お客様の情報</legend>

      <div>
        <label for="contact-name">
          お名前 <span aria-hidden="true">*</span><span class="sr-only">（必須）</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          aria-required="true"
          autocomplete="name"
          aria-describedby="contact-name-error"
        />
        <p id="contact-name-error" role="alert" class="hidden text-sm"></p>
      </div>

      <div>
        <label for="contact-email">
          メールアドレス <span aria-hidden="true">*</span><span class="sr-only">（必須）</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          aria-required="true"
          autocomplete="email"
          aria-describedby="contact-email-error"
        />
        <p id="contact-email-error" role="alert" class="hidden text-sm"></p>
      </div>
    </fieldset>

    <fieldset>
      <legend>お問い合わせ内容</legend>

      <div>
        <label for="contact-subject">
          件名 <span aria-hidden="true">*</span><span class="sr-only">（必須）</span>
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          aria-required="true"
          aria-describedby="contact-subject-error"
        />
        <p id="contact-subject-error" role="alert" class="hidden text-sm"></p>
      </div>

      <div>
        <label for="contact-message">
          本文 <span aria-hidden="true">*</span><span class="sr-only">（必須）</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          rows="6"
          aria-describedby="contact-message-error"
        ></textarea>
        <p id="contact-message-error" role="alert" class="hidden text-sm"></p>
      </div>
    </fieldset>

    <!-- reCAPTCHA v3 バッジ表記（必須） -->
    <p class="text-sm text-muted">
      このサイトは reCAPTCHA によって保護されており、
      Google の<a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">プライバシーポリシー</a>と
      <a href="https://policies.google.com/terms" rel="noopener noreferrer" target="_blank">利用規約</a>が適用されます。
    </p>

    <button
      type="submit"
      id="contact-submit"
    >
      送信する
    </button>
  </form>
</main>
```

- バリデーションエラー発生時:
  - 各 `input` / `textarea` に `aria-invalid="true"` を付与する
  - 対応する `{field}-error` 要素を表示し、エラーテキストを挿入する
  - `#contact-error-summary` を表示しフォーカスを移動する
- 送信中:
  - `#contact-submit` に `aria-busy="true"` を付与する
  - ボタンテキストを「送信中...」に変更する
  - ボタンを `disabled` にする（二重送信防止）
- 送信完了:
  - `#contact-success` に成功メッセージを挿入する
  - フォームを非表示にする、または完了画面に遷移する
  - 完了画面に遷移する場合は `<h1>` に「送信完了」、`aria-live="polite"` で通知する
- reCAPTCHA v3 はバッジを非表示にする場合でも、上記のプライバシーポリシー・利用規約への言及テキストを必ず表示する（Google の利用規約要件）

---

## 5. コントラスト要件

### 5.1 計算結果

| 前景色 | 背景色 | コントラスト比 | 通常テキスト (4.5:1) | 大テキスト (3:1) |
|--------|--------|---------------|----------------------|-----------------|
| `#0F1115` ink | `#FFFFFF` paper | **18.90:1** | AA pass | AA pass |
| `#0F1115` ink | `#F4F1EA` cream | **16.75:1** | AA pass | AA pass |
| `#E63946` accent | `#FFFFFF` paper | **4.17:1** | **AA FAIL** | AA pass |
| `#E63946` accent | `#F4F1EA` cream | **3.70:1** | **AA FAIL** | **AA FAIL** |
| `#E63946` accent | `#0F1115` ink | **4.53:1** | AA pass | AA pass |
| `#6B7280` muted | `#FFFFFF` paper | **4.83:1** | AA pass | AA pass |
| `#6B7280` muted | `#F4F1EA` cream | **4.29:1** | **AA FAIL** | AA pass |
| `#6B7280` muted | `#0F1115` ink | **3.91:1** | **AA FAIL** | AA pass |
| `#FFFFFF` paper | `#0F1115` ink | **18.90:1** | AA pass | AA pass |

### 5.2 禁止組み合わせと代替案

#### NG-1: accent (#E63946) on paper (#FFFFFF) — 4.17:1

- **用途禁止**: 通常本文テキスト・小ラベル・キャプション（18px 未満）
- **許可用途**: 装飾ボーダー・背景色・18px 以上の見出し・大型 CTA ボタンの背景（テキストは paper にする）
- **代替**: テキストを ink (#0F1115) にしてアクセントカラーは下線・ボーダーで使用する

#### NG-2: accent (#E63946) on cream (#F4F1EA) — 3.70:1

- **用途禁止**: すべてのテキスト用途（大テキストも FAIL）
- **代替**: テキストは ink (#0F1115) を使用し、cream 背景上でのアクセント表現は装飾のみとする

#### NG-3: muted (#6B7280) on cream (#F4F1EA) — 4.29:1

- **用途禁止**: 通常本文・14px 以下の小テキスト・キャプション
- **許可用途**: 18px 以上の大テキスト（AA pass）
- **代替**: cream 背景上のキャプションは ink (#0F1115) または `opacity-70` で調整した ink を使用する

#### NG-4: muted (#6B7280) on ink (#0F1115) — 3.91:1

- **用途禁止**: ink 背景上での通常テキスト（例: ダークヘッダー内のサブテキスト）
- **代替**: ink 背景上のサブテキストは paper (#FFFFFF) を使用する

### 5.3 フォーカスインジケータのコントラスト

- `ring-accent` (#E63946) on `ring-offset-paper` (#FFFFFF): 4.17:1（WCAG 2.2 フォーカス要件 3:1 を超過）
- `ring-accent` (#E63946) on `ring-offset-cream` (#F4F1EA): 3.70:1（フォーカス要件 3:1 通過）
- いずれも WCAG 2.2 Success Criterion 1.4.11 (Non-text Contrast) 通過

---

## 6. 画像 alt ルール

| 画像の種類 | alt の設定方針 | 例 |
|-----------|--------------|-----|
| ロゴ（横長） | `alt="Tokyo Decoded"` | `<img alt="Tokyo Decoded">` |
| ロゴマーク単体 | `alt="Tokyo Decoded ロゴ"` | アイコン的に使う場合 |
| 装飾画像・背景的な画像 | `alt=""` | セクション背景など |
| 投稿サムネイル | 投稿タイトルと同一テキスト | `alt="Loud Budgeting — 大声で節約する新トレンド"` |
| ツールプレビュー画像 | `{ツール名}のプレビュー画像` | `alt="Digital Kakeiboのプレビュー画像"` |
| SVGアイコン（リンク内） | `aria-hidden="true"` + リンク側の `aria-label` で説明 | — |
| OGP用画像 (`<meta>`) | `alt` 属性不要（meta タグのため） | — |

- `alt` テキストに「〜の画像」「〜の写真」は不要（スクリーンリーダーが自動で「画像」と読むため）
- ただし **ツールプレビュー** は「プレビュー画像」を明示する（画像の性質が重要な情報のため）

---

## 7. フォーカス順序

### 7.1 基本方針

- Tab 順序は DOM の記述順と一致させる
- `tabindex` を正の値（`tabindex="1"` 以上）で使用しない（DOM 順を変えて対応する）
- `tabindex="-1"` は JS でフォーカスを移動させる要素のみに使用する（`<main>` / モーダル等）

### 7.2 ページ全体の Tab 順序

```
1. スキップリンク（フォーカス時に表示）
2. ロゴリンク（/ へのリンク）
3. グローバルナビゲーションの各リンク
4. 言語切替トグル（JP / EN ボタン）
5. メインコンテンツ内のインタラクティブ要素（DOM順）
6. フッターナビゲーションの各リンク
7. SNS リンク群（8アカ）
```

### 7.3 言語切替トグルの位置

- グローバルナビゲーション内の右端に配置する
- DOM 上はナビリンク群の後ろに記述する（Tab 順: ナビリンク → 言語切替）
- 視覚的に右上に配置する場合は CSS の `order` または `flex` で対応し、DOM 順は変えない

### 7.4 モーダル / ドロワー開放時

```
モーダル開放時の Tab 順:
1. モーダル内の最初のインタラクティブ要素（または閉じるボタン）
2. モーダル内の各要素（DOM順）
3. 閉じるボタン
→ Esc キーまたは閉じるボタンで閉じた後、トリガーボタンにフォーカスを戻す
```

---

## 8. 自動テスト指示

### 8.1 開発中の確認手順

```bash
# axe-core（ブラウザ拡張 or Playwright 経由）
npx playwright test --grep accessibility

# Lighthouse CLI（ローカル確認）
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json
npx lighthouse http://localhost:3000/about --output=json
npx lighthouse http://localhost:3000/posts --output=json
npx lighthouse http://localhost:3000/contact --output=json
```

### 8.2 目標スコア

| 指標 | 目標値 | 絶対最低値 |
|------|--------|-----------|
| Lighthouse Accessibility | **95以上** | 95（公開判定基準） |
| Lighthouse Performance | 90以上 | 90 |
| Lighthouse SEO | 95以上 | 95 |

### 8.3 Phase 3 QA チェックリスト（C-4 確認項目）

#### HTML / JSX

- [ ] `<html lang="ja">` または `<html lang="en">` が設定されている
- [ ] スキップリンク `<a href="#main-content">` が `<body>` 直下に存在する
- [ ] `<main id="main-content" tabindex="-1">` が存在する
- [ ] セマンティックタグ使用（`<header>` / `<nav>` / `<main>` / `<footer>` / `<article>` / `<section>`）
- [ ] 全 `<img>` に `alt` 属性がある（空文字含む）
- [ ] フォームの全 `<input>` / `<textarea>` に `<label for="">` が紐づいている
- [ ] `<label>` と `<input>` の `for` / `id` が一致している
- [ ] 見出し階層が H1 → H2 → H3 の順になっている（飛び越えなし）
- [ ] H1 が各ページに1つだけ存在する
- [ ] 全 `<section>` に `aria-labelledby` または `aria-label` がある
- [ ] 複数 `<nav>` に異なる `aria-label` がある
- [ ] SVGアイコン（リンク内）に `aria-hidden="true"` と `focusable="false"` がある
- [ ] アイコンのみのリンク・ボタンに `aria-label` がある
- [ ] `aria-live` の設定箇所が仕様書通りである
- [ ] パンくずリストの最終項目に `aria-current="page"` がある
- [ ] ページネーションの現在ページに `aria-current="page"` がある
- [ ] カテゴリフィルタボタンに `aria-pressed` がある
- [ ] 外部リンクに `rel="noopener noreferrer"` がある
- [ ] アフィリエイトリンクに `rel="sponsored"` が追加されている

#### CSS / Tailwind

- [ ] インラインスタイル（style 属性）が使われていない
- [ ] `!important` が多用されていない
- [ ] `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` が全インタラクティブ要素に適用されている
- [ ] `prefers-reduced-motion` 対応の CSS が globals.css にある
- [ ] SP / TB / PC でレスポンシブが正しく動作する

#### JavaScript / TypeScript

- [ ] `console.log` が残っていない
- [ ] フォームのエラーハンドリングが実装されている
- [ ] 送信中の `aria-busy="true"` が実装されている
- [ ] 成功・エラー通知が `aria-live` で実装されている
- [ ] モーダル開放時のフォーカストラップが実装されている
- [ ] モーダルを閉じた後にトリガー要素へフォーカスが戻る

#### コントラスト

- [ ] ink (#0F1115) on paper (#FFFFFF): 18.90:1 — 本文・見出しに使用
- [ ] accent (#E63946) on paper: 通常テキストに使用されていない（装飾・大テキストのみ）
- [ ] accent (#E63946) on cream: テキスト用途に使用されていない
- [ ] muted (#6B7280) on cream: 通常テキスト・キャプションに使用されていない
- [ ] muted (#6B7280) on ink: テキスト用途に使用されていない

#### パフォーマンス

- [ ] 全画像が WebP 形式である
- [ ] `loading="lazy"` がスクロール領域の画像に設定されている
- [ ] ファーストビューの画像は `loading="eager"` または省略されている
- [ ] 不要なライブラリが読み込まれていない

---

*本要件定義書は Phase 1 確定版。Phase 3 QA で本書と実装の差異を照合する。*
