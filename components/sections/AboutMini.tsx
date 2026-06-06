import Link from "next/link";
import { homeContent } from "@/content/home";
import type { Locale } from "@/content/types";

type AboutMiniProps = {
  locale?: Locale;
};

export function AboutMini({ locale = "ja" }: AboutMiniProps) {
  const content = homeContent.aboutMini;

  return (
    <section aria-labelledby="about-mini-heading" className="bg-cream">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="font-[family-name:var(--font-sans)] text-xs font-semibold tracking-widest uppercase text-accent">
              About Us
            </p>
            <h2
              id="about-mini-heading"
              className="mt-4 font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl leading-tight"
            >
              {content.heading[locale]}
            </h2>
            <Link
              href={content.link.href}
              className="inline-flex items-center gap-2 mt-8 font-[family-name:var(--font-sans)] text-sm font-medium text-ink border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:ring-accent"
            >
              {content.link[`label_${locale}`]}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="border-l-2 border-accent pl-8 md:pl-10">
            <p className="font-[family-name:var(--font-jp)] text-base md:text-lg text-ink leading-relaxed">
              {content.body[locale]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
