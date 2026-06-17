import Image from "next/image";
import { tools, toolsPageContent } from "@/content/tools";
import type { Locale, Tool } from "@/content/types";

type ToolsListProps = {
  locale?: Locale;
  items?: readonly Tool[];
};

export function ToolsList({ locale = "ja", items = tools }: ToolsListProps) {
  return (
    <section aria-labelledby="tools-list-heading" className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h1
          id="tools-list-heading"
          className="font-display font-bold text-ink text-4xl md:text-5xl"
          lang="en"
        >
          {toolsPageContent.meta.heading[locale]}
        </h1>
        <p className="mt-5 max-w-2xl text-ink">{toolsPageContent.meta.subheading[locale]}</p>

        <ul role="list" className="mt-10 grid gap-8">
          {items.map((tool) => {
            const headingId = `tool-${tool.slug}-heading`;

            return (
              <li key={tool.slug}>
                <article
                  aria-labelledby={headingId}
                  className="grid gap-6 border border-ink/10 bg-cream p-6 md:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)] lg:grid-cols-[0.9fr_1fr] lg:items-center"
                >
                  <Image
                    src={tool.preview}
                    alt={locale === "ja" ? tool.previewAlt_ja : tool.previewAlt_en}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <div>
                    <h2
                      id={headingId}
                      className="font-jp font-medium text-2xl md:text-3xl text-ink"
                    >
                      {tool.name[locale]}
                    </h2>
                    <p className="mt-4 text-ink">
                      {locale === "ja" ? tool.description_ja : tool.description_en}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
