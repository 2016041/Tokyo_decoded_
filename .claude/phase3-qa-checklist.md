# Phase 3 QUALITY — 統合 QA チェックリスト

> 用途: Codex X-1〜X-4 の全 PR が `main` にマージされた後、PM C-1 が C-3 / C-4 / C-5 / C-2 を順序立てて起動するための統合チェックリスト
> 起動順: **C-3 + C-4 並列** → 修正サイクル → **C-5 + C-2 並列** → 最終承認 → Vercel デプロイ
> 想定所要時間: 修正なし 3〜4h / 1サイクル修正あり 6〜8h

---

## Phase 3 起動の前提条件

ディレクターから以下の通知を受けたら開始：

- [ ] X-1 PR (`feature/components-layout`) が `main` にマージ済み
- [ ] X-2 PR (`feature/components-sections`) が `main` にマージ済み
- [ ] X-4 PR (`feature/metadata-seo`) が `main` にマージ済み
- [ ] X-3 PR (`feature/pages-and-api`) が `main` にマージ済み
- [ ] Vercel 環境変数 5 種が本番に登録済み（`RESEND_API_KEY` / `RECAPTCHA_SECRET_KEY` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `GOOGLE_SHEETS_*` 3 種 / `NEXT_PUBLIC_GA_ID`）

---

## ステップ 1: C-3（技術 QA）+ C-4（a11y QA）並列起動

### C-3 への指示プロンプト雛形

```
Phase 3 技術 QA を開始してください。チェック対象:

1. ビルド検証
   - npm run build -- --webpack でエラー 0
   - 型エラー 0、console.log 残存 0
2. API Route 動作確認
   - /api/subscribe: 有効メール → 200、不正メール → 400、レート上限超過 → 429
   - /api/contact: reCAPTCHA スコア 0.5 未満 → 403、Resend 障害シミュレーション → 500
   - /api/og?slug=loud-budgeting: 1200x630 PNG が返却される
3. "use client" 境界の正しさ
   - architecture.md §3 の 7 コンポーネントのみが Client Component か
   - Server Component から Client Component への props が serializable か
4. 型整合性
   - content/types.ts が canonical として使われているか
   - lib/types.ts が barrel + DTO のみで重複定義なし
5. Lighthouse Performance 90+ (mobile)
   - LCP < 2.5s, CLS < 0.1, TBT < 200ms
6. パフォーマンス
   - 画像が next/image 経由で WebP/AVIF 配信
   - フォントが next/font 経由で self-host
   - 初回 JS バンドル < 200KB (gzip)

結果は qa-report-c3.md に記録してください。
```

### C-4 への指示プロンプト雛形

```
Phase 3 アクセシビリティ QA を開始してください。チェック対象:

1. axe-core 自動検証
   - 全ページ違反 0 件
2. キーボードナビゲーション
   - Tab 順序が論理的、SkipLink で main へジャンプ可能
   - フォーカス可視 (focus-visible リング 2px ink)
3. スクリーンリーダー検証
   - VoiceOver で Hero / Nav / Form / Footer のランドマーク認識
   - aria-label / aria-describedby / aria-invalid が accessibility.md §3-§7 の仕様通り
4. コントラスト
   - design.md COLOR SYSTEM の AA 基準 (4.5:1 normal / 3:1 large) 全箇所通過
   - ANTI-PATTERNS 4 ケース (accent on paper / accent on cream / muted on cream / muted on ink) が実装に存在しない
5. フォーム
   - エラーメッセージが aria-live="polite" で読み上げ
   - 必須フィールドに aria-required="true"
   - reCAPTCHA バッジが視覚的に確認可能
6. Lighthouse Accessibility 95+
7. WCAG 2.2 AA 全達成基準照合 (accessibility.md §8)

結果は qa-report-c4.md に記録してください。
```

---

## ステップ 2: 修正サイクル判定

### C-3 / C-4 のレポート受領後、PM が判定

- [ ] Critical 修正 (a11y AA 違反 / API 500 / 型エラー) → 担当 Codex を再起動
- [ ] Major 修正 (Lighthouse 90/95 未達 / UX 重大欠陥) → 担当 Codex を再起動
- [ ] Minor 修正 (微細な margin ズレ / 軽微な warning) → C-5 / C-2 承認後にまとめて修正
- [ ] 修正不要 → ステップ 3 へ

### 再起動時のプロンプト雛形

```
[X-1/X-2/X-3/X-4] 修正依頼

QA レポート: .claude/qa-report-c[3/4].md の以下項目を修正してください:
- [issue 1]
- [issue 2]

ブランチ: fix/[領域名]
修正後、再度 PR を出してください。
```

---

## ステップ 3: C-5（SEO 最終確認）+ C-2（デザイン整合）並列起動

### C-5 への指示プロンプト雛形

```
Phase 3 SEO 最終確認を開始してください:

1. metadata 検証
   - 全ページ title が template "%s | Tokyo Decoded" 適用
   - description 120〜160 文字
   - openGraph.images が 1200x630
   - alternates.languages に ja-JP / en-US 両方
2. JSON-LD
   - https://search.google.com/test/rich-results で全ページ valid
   - WebSite / Organization / Article (posts) / BreadcrumbList が出力
3. sitemap.xml / robots.txt
   - sitemap.xml が日英 16 件 + 投稿 N 件
   - robots.txt が本番 allow / preview disallow
4. OGP
   - Twitter Card Validator で全 8 ページ通過
   - Facebook Sharing Debugger で全 8 ページ通過
   - /api/og?slug=... が本物の OGP として動作
5. 検索一貫性
   - canonical URL が本番ドメインを指している
   - hreflang が ja-JP <-> en-US で対称

結果は qa-report-c5.md に記録してください。
```

### C-2 への指示プロンプト雛形

```
Phase 3 デザイン整合性確認を開始してください:

1. ANTI-PATTERNS 照合 (design.md HARD BLOCK)
   - Hero 中央寄せ + 単一 CTA になっていないか (左寄せ + 2 CTA が正)
   - 角丸が 6px or 8px のみか (12px+ 禁止)
   - shadow が使われていないか (border-only 設計)
   - グラデーション背景が存在しないか
   - 絵文字アイコンが UI に混入していないか
   - PR ラベルが PR 投稿に表示されているか
   - bg-ink 上で text-muted が使われていないか (text-muted-light or text-cream のみ)
2. globals.css @theme inline 整合
   - 全コンポーネントで bg-ink / bg-accent / text-cream など token 経由のクラスのみ
   - 直接の #hex / rgb() がコンポーネント内に存在しない
3. タイポグラフィ
   - 見出し: Space Grotesk (font-display)
   - 本文 EN: Inter (font-sans)
   - 本文 JA: Noto Sans JP (font-jp)
   - h1〜h6 のスケールが design.md TYPOGRAPHY と一致
4. スペーシング
   - section padding、card gap が design.md SPACING token 経由
5. レスポンシブ
   - sm 640 / md 768 / lg 1024 / xl 1280 の各 breakpoint で崩れなし
   - mobile menu の開閉が滑らか

結果は qa-report-c2.md に記録してください。
```

---

## ステップ 4: 最終承認 → Vercel デプロイ

- [ ] C-3 / C-4 / C-5 / C-2 全レポート Critical / Major 0 件
- [ ] PM が統合サマリ作成 (`.claude/phase3-final-report.md`)
- [ ] ディレクター承認
- [ ] `main` を Vercel 本番デプロイ (自動 or 手動 promote)
- [ ] デプロイ後スモークテスト
  - [ ] tokyo-decoded.com が表示される
  - [ ] /en/ が表示される
  - [ ] /api/subscribe に実メールで購読 → Sheets に追記確認
  - [ ] /api/contact に実送信 → Resend で `CONTACT_TO` に到達確認
  - [ ] GA4 リアルタイム計測で 1 セッション計上確認
- [ ] ディレクター完了報告 → 案件を `02_完了/` へ移動

---

## エスカレーション基準

| 状況 | PM の対応 |
|---|---|
| Codex 修正サイクルが 3 回以上 | ディレクターに仕様再検討を提案 |
| Lighthouse Performance 80 未満 | C-3 と協議し、画像最適化 / コード分割の追加施策を実装 |
| WCAG AA 違反が修正困難 | C-4 と協議し、デザイン側 (design.md / @theme) の見直しを C-2 に依頼 |
| 環境変数不足で本番動作不可 | ディレクターに即時連絡、Vercel ダッシュボード再確認依頼 |

---

## 完了の定義 (Definition of Done)

- [ ] 全 QA レポート Critical / Major 0
- [ ] Lighthouse Performance 90+ / Accessibility 95+ / SEO 95+ (mobile)
- [ ] 本番 URL でスモークテスト 5 項目通過
- [ ] ディレクターから案件完了承認
