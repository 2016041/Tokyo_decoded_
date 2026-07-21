import type { Metadata } from "next";
import Link from "next/link";
import CardTD from "@/components/redesign/CardTD";
import { sortedPosts, categoryCounts } from "@/lib/td";
import { metadataForPage } from "@/lib/i18n";

export const revalidate = 3600;
export function generateMetadata(): Metadata {
  return metadataForPage("posts", "en");
}

const FILTERS: [string, string][] = [
  ["All", "all"],
  ["Money & AI", "money-ai"],
  ["Lifestyle", "lifestyle"],
  ["Beauty", "beauty"],
  ["Guides", "guides"],
];
const CC: Record<string, string> = { all: "", "money-ai": "td-cm", lifestyle: "td-cl", beauty: "td-cb", guides: "td-cg" };

function buildHref(cat: string, sort: string): string {
  const p = new URLSearchParams();
  if (cat !== "all") p.set("cat", cat);
  if (sort === "old") p.set("sort", "old");
  const q = p.toString();
  return `/en/posts${q ? `?${q}` : ""}`;
}

export default async function EnPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const active = sp.cat && CC[sp.cat] !== undefined ? sp.cat : "all";
  const sort = sp.sort === "old" ? "old" : "new";
  const all = sortedPosts(); // newest first
  const filtered = active === "all" ? all : all.filter((p) => p.category === active);
  const items = sort === "old" ? [...filtered].reverse() : filtered;
  const counts = categoryCounts();

  return (
    <div className="td-scope">
      <div className="td-wrap">
        <div className="td-pagehead">
          <div className="td-ey">Archive</div>
          <h1>Articles</h1>
          <p>Global-to-Japan trends, decoded with data and sources. {all.length} articles.</p>
        </div>
        <div className="td-filterbar">
          <div className="td-fpills">
            {FILTERS.map(([j, slug]) => {
              const n = slug === "all" ? all.length : counts[slug] ?? 0;
              const cls = `td-fpill ${CC[slug]} ${active === slug ? "td-on" : ""}`;
              // Categories with no articles yet are non-clickable (auto-linked once articles exist)
              if (slug !== "all" && n === 0) {
                return (
                  <span key={slug} className={`${cls} td-fdisabled`} aria-disabled="true" title="Coming soon (no articles yet)">
                    <span>{j}</span>
                    <span className="td-fc">{n}</span>
                  </span>
                );
              }
              return (
                <Link key={slug} href={buildHref(slug, sort)} className={cls}>
                  <span>{j}</span>
                  <span className="td-fc">{n}</span>
                </Link>
              );
            })}
          </div>
          <div className="td-sortsel" role="group" aria-label="Sort">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M6 12h12M10 18h4" /></svg>
            <Link href={buildHref(active, "new")} className={`td-sortlink ${sort === "new" ? "td-on" : ""}`}>Newest</Link>
            <Link href={buildHref(active, "old")} className={`td-sortlink ${sort === "old" ? "td-on" : ""}`}>Oldest</Link>
          </div>
        </div>
        <div className="td-grid">
          {items.map((p) => <CardTD key={p.slug} post={p} locale="en" />)}
        </div>
      </div>
    </div>
  );
}
