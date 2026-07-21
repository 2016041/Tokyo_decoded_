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
  const lead = money[0] ?? all[0];
  const subs = money.filter((p) => p.slug !== lead.slug).slice(0, 2);
  const rail = money.slice(0, 5);
  const gridPosts = all.filter((p) => p.slug !== lead.slug).slice(0, 6);
  const cats: [string, string, string, string][] = [
    ["お金・AI", "MONEY", "/posts?cat=money-ai", "td-cm"],
    ["暮らし", "LIFE", "/posts?cat=lifestyle", "td-cl"],
    ["美容", "BEAUTY", "/posts?cat=beauty", "td-cb"],
    ["まとめ・比較", "GUIDES", "/posts", "td-cg"],
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
