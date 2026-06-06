import type { Locale } from "@/lib/types";

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  sections: readonly {
    id: string;
    heading: string;
    body: string;
    items?: readonly string[];
  }[];
  locale: Locale;
};

export default function LegalPage({
  title,
  lastUpdated,
  sections,
  locale,
}: LegalPageProps) {
  return (
    <article className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-[5vw] py-[clamp(64px,12vw,120px)] lg:px-10">
        <h1 className="font-[family-name:var(--font-jp)] text-4xl font-black text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {locale === "ja" ? "最終更新日" : "Last updated"}:{" "}
          <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>
        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2
                id={`${section.id}-heading`}
                className="font-[family-name:var(--font-jp)] text-2xl font-black text-ink md:text-3xl"
              >
                {section.heading}
              </h2>
              <p className="mt-4 max-w-3xl text-ink">{section.body}</p>
              {section.items ? (
                <ul role="list" className="mt-4 list-disc space-y-2 pl-5 text-ink">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
