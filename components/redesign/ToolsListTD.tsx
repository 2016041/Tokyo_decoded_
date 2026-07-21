// components/redesign/ToolsListTD.tsx — REDESIGN Editor's Tools 一覧（Notionテンプレート明示）
import type { Tool } from "@/content/types";
import { toolsPageContent } from "@/content/tools";

type Locale = "ja" | "en";

const TOOL_CAT: Record<string, { label_ja: string; label_en: string; cls: string }> = {
  "money-ai": { label_ja: "お金・AI", label_en: "Money & AI", cls: "td-cm" },
  trends: { label_ja: "トレンド", label_en: "Trends", cls: "td-cg" },
};

export default function ToolsListTD({ items, locale }: { items: readonly Tool[]; locale: Locale }) {
  const ja = locale === "ja";
  const meta = toolsPageContent.meta;
  return (
    <div className="td-scope">
      <div className="td-wrap">
        <div className="td-pagehead">
          <div className="td-ey">Editor&apos;s Tools</div>
          <h1>{ja ? "Editor's Tools" : meta.heading.en}</h1>
          <p>{ja ? meta.subheading.ja : meta.subheading.en}</p>
        </div>

        <div className="td-toolsnote">
          <span className="td-nicon">Notion</span>
          <span>
            {ja
              ? "すべて無料の Notion テンプレートです。受け取ったリンクを自分の Notion に複製すれば、すぐに使い始められます。"
              : "All tools are free Notion templates. Duplicate the link into your own Notion workspace and start right away."}
          </span>
        </div>

        <div className="td-tools">
          {items.map((t) => {
            const c = TOOL_CAT[t.category] ?? { label_ja: t.category, label_en: t.category, cls: "" };
            return (
              <article className="td-toolcard" key={t.slug}>
                <div className="td-toolimg" style={{ backgroundImage: `url(${t.preview})` }} role="img"
                  aria-label={ja ? t.previewAlt_ja : t.previewAlt_en} />
                <div className="td-toolbody">
                  <div className="td-toolmeta">
                    <span className={`td-toolcat ${c.cls}`}>{ja ? c.label_ja : c.label_en}</span>
                    <span className="td-notion">{ja ? "Notionテンプレート" : "Notion template"}</span>
                  </div>
                  <h2 className="td-toolname">{ja ? t.name.ja : t.name.en}</h2>
                  <p className="td-tooldesc">{ja ? t.description_ja : t.description_en}</p>
                  <a className="td-toolcta" href="#tools-form">{ja ? "無料で受け取る →" : "Get it free →"}</a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
