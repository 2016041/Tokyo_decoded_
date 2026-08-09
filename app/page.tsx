import type { Metadata } from "next";
import Link from "next/link";
import CardTD from "@/components/redesign/CardTD";
import type { Post } from "@/content/types";
import {
  sortedPosts, byCategory, catClass, catLabel,
  postHref, title, excerpt, fmtDot, fmtMd,
} from "@/lib/td";
import { metadataForPage } from "@/lib/i18n";

export const dynamic = "force-static";
export function generateMetadata(): Metadata {
  return metadataForPage("home", "ja");
}

const TAGS = [
  "Loud Budgeting", "袋分け家計簿", "Z世代のお金", "Slow Aging", "Sleepmaxxing",
  "リベンジ貯蓄", "Soft Saving", "マネーディスモルフィア", "低速老化",
];

export default function Home() {
  const all = sortedPosts();
  const money = byCategory("money-ai");
  // リード（今週の特集）と「次に読むべき」は**カテゴリを問わず公開日順**にする。
  // 以前は money[0] 固定だったため、2026-07-27決定3で記事の軸を美容・生活系へ移した後、
  // トップに出るのが「お金・AIの最新」＝019（7/31）のままになり、
  // 8/3・8/5・8/7 に3本公開してもサイトが更新停止に見えていた（2026-08-09に発覚）。
  // 「お金クラスタ 最新」レールはラベルどおり money のまま残し、収益カテゴリの導線は維持する。
  const lead = all[0];
  const subs = all.filter((p) => p.slug !== lead.slug).slice(0, 2);
  const rail = money.slice(0, 5);
  const featured = new Set([lead.slug, ...subs.map((p) => p.slug)]);
  const gridPosts = all.filter((p) => !featured.has(p.slug)).slice(0, 6);
  const cats: [string, string, string, string][] = [
    ["お金・AI", "MONEY", "/posts?cat=money-ai", "td-cm"],
    ["暮らし", "LIFE", "/posts?cat=lifestyle", "td-cl"],
    ["美容", "BEAUTY", "/posts?cat=beauty", "td-cb"],
    ["まとめ・比較", "GUIDES", "/posts?cat=guides", "td-cg"],
  ];

  return (
    <div className="td-scope">
      <div className="td-wrap">
        <div className="td-catstrip">
          {cats.map(([j, en, href, cc]) => (
            <Link key={en} href={href} className={cc}>
              <span className="td-cjp">{j}</span>
              <span className="td-cen">{en}</span>
            </Link>
          ))}
        </div>

        <div className="td-top">
          <Link className="td-lead" href={postHref(lead, "ja")}>
            <div className="td-ey">今週の特集 · <span className="td-en">THIS WEEK</span></div>
            <h1>{title(lead, "ja")}</h1>
            <p className="td-dek">{excerpt(lead, "ja")}</p>
            <div className={`td-byline ${catClass(lead.category)}`}>
              <span className="td-cat">{catLabel(lead.category, "ja")}</span>文 — Tokyo Decoded 編集部
              <span className="td-dot">·</span>{fmtDot(lead.publishedAt)}
              <span className="td-dot">·</span>読了 約5分
              <span className="td-dot">·</span>出典3件
            </div>
            <div className="td-li" style={{ backgroundImage: `url(${lead.thumbnail})` }} />
          </Link>

          <aside className="td-aside">
            <div className="td-asideh">次に読むべき</div>
            {subs.map((p: Post) => (
              <Link key={p.slug} className="td-sub" href={postHref(p, "ja")}>
                <div className="td-subimg" style={{ backgroundImage: `url(${p.thumbnail})` }} />
                <div className="td-subtxt">
                  <div className={`td-k ${catClass(p.category)}`}>{catLabel(p.category, "ja")}</div>
                  <h4>{title(p, "ja")}</h4>
                </div>
              </Link>
            ))}
            <div className="td-asideh" style={{ marginTop: 20 }}>お金クラスタ 最新</div>
            <div className="td-rail">
              {rail.map((p) => (
                <Link key={p.slug} className="td-r" href={postHref(p, "ja")}>
                  <span className="td-rn">{fmtMd(p.publishedAt)}</span>
                  <span className="td-rt">{title(p, "ja")}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <div className="td-tagsec">
          <span className="td-tl">人気のトピック</span>
          {TAGS.map((t) => (
            <Link key={t} className="td-tag" href="/posts">#{t}</Link>
          ))}
        </div>

        <div className="td-sec">
          <div className="td-sech"><h2>最新記事</h2><Link href="/posts">すべての記事 →</Link></div>
          <div className="td-grid">
            {gridPosts.map((p) => <CardTD key={p.slug} post={p} locale="ja" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
