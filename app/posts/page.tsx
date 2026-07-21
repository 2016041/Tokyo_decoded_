import type { Metadata } from "next";
import Link from "next/link";
import CardTD from "@/components/redesign/CardTD";
import { sortedPosts, categoryCounts } from "@/lib/td";
import { metadataForPage } from "@/lib/i18n";

export const revalidate = 3600;
export function generateMetadata(): Metadata {
  return metadataForPage("posts", "ja");
}

const FILTERS: [string, string][] = [
  ["すべて", "all"],
  ["お金・AI", "money-ai"],
  ["暮らし", "lifestyle"],
  ["美容", "beauty"],
];
const CC: Record<string, string> = { all: "", "money-ai": "td-cm", lifestyle: "td-cl", beauty: "td-cb" };

function buildHref(cat: string, sort: string): string {
  const p = new URLSearchParams();
  if (cat !== "all") p.set("cat", cat);
  if (sort === "old") p.set("sort", "old");
  const q = p.toString();
  return `/posts${q ? `?${q}` : ""}`;
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const active = sp.cat && CC[sp.cat] !== undefined ? sp.cat : "all";
  const sort = sp.sort === "old" ? "old" : "new";
  const all = sortedPosts(); // 公開日 降順（新着順）
  const filtered = active === "all" ? all : all.filter((p) => p.category === active);
  const items = sort === "old" ? [...filtered].reverse() : filtered;
  const counts = categoryCounts();

  return (
    <div className="td-scope">
      <div className="td-wrap">
        <div className="td-pagehead">
          <div className="td-ey">Archive</div>
          <h1>記事一覧</h1>
          <p>海外⇄日本のトレンドを、データと出典で読み解く。全 {all.length} 記事。</p>
        </div>
        <div className="td-filterbar">
          <div className="td-fpills">
            {FILTERS.map(([j, slug]) => (
              <Link
                key={slug}
                href={buildHref(slug, sort)}
                className={`td-fpill ${CC[slug]} ${active === slug ? "td-on" : ""}`}
              >
                <span>{j}</span>
                <span className="td-fc">{slug === "all" ? all.length : counts[slug] ?? 0}</span>
              </Link>
            ))}
          </div>
          <div className="td-sortsel" role="group" aria-label="並び替え">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M6 12h12M10 18h4" /></svg>
            <Link href={buildHref(active, "new")} className={`td-sortlink ${sort === "new" ? "td-on" : ""}`}>新着順</Link>
            <Link href={buildHref(active, "old")} className={`td-sortlink ${sort === "old" ? "td-on" : ""}`}>古い順</Link>
          </div>
        </div>
        <div className="td-grid">
          {items.map((p) => <CardTD key={p.slug} post={p} locale="ja" />)}
        </div>
        {active === "all" && all.length > 9 ? (
          <div className="td-pager">
            <span className="td-cur">1</span>
            <Link href="#">2</Link>
            <Link className="td-nx" href="#">次へ →</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
