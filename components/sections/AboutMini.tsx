import Link from "next/link";
import { homeContent } from "@/content/home";
import type { Locale } from "@/content/types";

type AboutMiniProps = {
  locale?: Locale;
};

export function AboutMini({ locale = "ja" }: AboutMiniProps) {
  const content = homeContent.aboutMini;
  const paragraphs = content.body[locale].split("。").filter(Boolean);

  return (
    <section aria-labelledby="about-mini-heading" className="bg-cream">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h2
          id="about-mini-heading"
          className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
        >
          {content.heading[locale]}
        </h2>
        <div className="mt-8 max-w-3xl space-y-4 font-[family-name:var(--font-jp)] text-base md:text-lg text-ink">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{locale === "ja" ? `${paragraph}。` : paragraph}</p>
          ))}
        </div>
        <Link
          href={content.link.href}
          className="inline-flex mt-8 font-[family-name:var(--font-sans)] font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:ring-accent"
        >
          {content.link[`label_${locale}`]}
          <span className="sr-only">（Aboutページへ）</span>
        </Link>
      </div>
    </section>
  );
}
