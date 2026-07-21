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
  return metadataForPage("home", "en");
}

const TAGS = [
  "Loud Budgeting", "Cash Stuffing", "Gen Z & Money", "Slow Aging", "Sleepmaxxing",
  "Revenge Saving", "Soft Saving", "Money Dysmorphia", "Underconsumption",
];

export default function EnHome() {
  const all = sortedPosts();
  const money = byCategory("money-ai");
  const lead = money[0] ?? all[0];
  const subs = money.filter((p) => p.slug !== lead.slug).slice(0, 2);
  const rail = money.slice(0, 5);
  const gridPosts = all.filter((p) => p.slug !== lead.slug).slice(0, 6);
  const cats: [string, string, string, string][] = [
    ["Money & AI", "MONEY", "/en/posts?cat=money-ai", "td-cm"],
    ["Lifestyle", "LIFE", "/en/posts?cat=lifestyle", "td-cl"],
    ["Beauty", "BEAUTY", "/en/posts?cat=beauty", "td-cb"],
    ["Guides", "GUIDES", "/en/posts", "td-cg"],
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
          <Link className="td-lead" href={postHref(lead, "en")}>
            <div className="td-ey">This Week · <span className="td-en">FEATURED</span></div>
            <h1>{title(lead, "en")}</h1>
            <p className="td-dek">{excerpt(lead, "en")}</p>
            <div className={`td-byline ${catClass(lead.category)}`}>
              <span className="td-cat">{catLabel(lead.category, "en")}</span>By the Tokyo Decoded editorial team
              <span className="td-dot">·</span>{fmtDot(lead.publishedAt)}
              <span className="td-dot">·</span>5 min read
              <span className="td-dot">·</span>3 sources
            </div>
            <div className="td-li" style={{ backgroundImage: `url(${lead.thumbnail})` }} />
          </Link>

          <aside className="td-aside">
            <div className="td-asideh">Read next</div>
            {subs.map((p: Post) => (
              <Link key={p.slug} className="td-sub" href={postHref(p, "en")}>
                <div className="td-subimg" style={{ backgroundImage: `url(${p.thumbnail})` }} />
                <div className="td-subtxt">
                  <div className={`td-k ${catClass(p.category)}`}>{catLabel(p.category, "en")}</div>
                  <h4>{title(p, "en")}</h4>
                </div>
              </Link>
            ))}
            <div className="td-asideh" style={{ marginTop: 20 }}>Latest in Money &amp; AI</div>
            <div className="td-rail">
              {rail.map((p) => (
                <Link key={p.slug} className="td-r" href={postHref(p, "en")}>
                  <span className="td-rn">{fmtMd(p.publishedAt)}</span>
                  <span className="td-rt">{title(p, "en")}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <div className="td-tagsec">
          <span className="td-tl">Popular topics</span>
          {TAGS.map((t) => (
            <Link key={t} className="td-tag" href="/en/posts">#{t}</Link>
          ))}
        </div>

        <div className="td-sec">
          <div className="td-sech"><h2>Latest articles</h2><Link href="/en/posts">All articles →</Link></div>
          <div className="td-grid">
            {gridPosts.map((p) => <CardTD key={p.slug} post={p} locale="en" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
