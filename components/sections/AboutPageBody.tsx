import Link from "next/link";
import { aboutContent } from "@/content/about";
import { siteContent } from "@/content/site";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

type AboutPageBodyProps = {
  locale?: Locale;
};

function localizedLabel(locale: Locale) {
  return locale === "ja" ? "外部サイト" : "external site";
}

export function AboutPageBody({ locale = "ja" }: AboutPageBodyProps) {
  return (
    <article className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h1 className="font-[family-name:var(--font-jp)] font-black text-ink text-4xl md:text-5xl">
          {aboutContent.meta.heading[locale]}
        </h1>

        <section aria-labelledby="mission-heading" className="mt-14">
          <h2
            id="mission-heading"
            className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
          >
            {aboutContent.mission.heading[locale]}
          </h2>
          <p className="mt-5 max-w-3xl text-ink">{aboutContent.mission.body[locale]}</p>
        </section>

        <hr className="my-12 border-ink/20" />

        <section aria-labelledby="strategy-heading">
          <h2
            id="strategy-heading"
            className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
          >
            {aboutContent.strategy.heading[locale]}
          </h2>
          <p className="mt-5 max-w-3xl text-ink">{aboutContent.strategy.body[locale]}</p>
        </section>

        <hr className="my-12 border-ink/20" />

        <section aria-labelledby="pillars-heading">
          <h2
            id="pillars-heading"
            className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
          >
            {locale === "ja" ? "コンテンツの3本柱" : "Three Editorial Pillars"}
          </h2>
          <ul role="list" className="mt-8 grid gap-6 md:grid-cols-3">
            {aboutContent.pillars.map((pillar) => (
              <li
                key={pillar.id}
                className="border border-ink/10 bg-cream p-6 md:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
              >
                <h3 className="font-[family-name:var(--font-jp)] font-medium text-xl text-ink">
                  {pillar.name[locale]}
                </h3>
                <p className="mt-2">
                  <small className="font-[family-name:var(--font-sans)] text-ink">
                    {pillar.share}
                  </small>
                </p>
                <p className="mt-4 text-ink">{pillar.body[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className="my-12 border-ink/20" />

        <section aria-labelledby="editorial-stance-heading">
          <h2
            id="editorial-stance-heading"
            className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
          >
            {aboutContent.editorialStance.heading[locale]}
          </h2>
          <ul role="list" className="mt-8 grid gap-6 md:grid-cols-3">
            {aboutContent.editorialStance.points[locale].map((point) => (
              <li key={point.label} className="border-t border-ink/20 pt-5">
                <h3 className="font-[family-name:var(--font-jp)] font-medium text-xl text-ink">
                  {point.label}
                </h3>
                <p className="mt-3 text-ink">{point.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className="my-12 border-ink/20" />

        <section aria-labelledby="sns-links-heading">
          <h2
            id="sns-links-heading"
            className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
          >
            {aboutContent.socialIntro.heading[locale]}
          </h2>
          <p className="mt-5 max-w-3xl text-ink">{aboutContent.socialIntro.body[locale]}</p>
          <ul role="list" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.social.map((account) => (
              <li key={account.id}>
                <a
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${account.label}（${localizedLabel(locale)}）`}
                  className="block border border-ink px-4 py-3 font-[family-name:var(--font-sans)] text-sm font-medium text-ink transition-colors duration-[150ms] motion-reduce:transition-none hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                >
                  {account.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <hr className="my-12 border-ink/20" />

        <section aria-labelledby="about-contact-heading">
          <h2
            id="about-contact-heading"
            className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
          >
            {aboutContent.contactCta.heading[locale]}
          </h2>
          <p className="mt-5 max-w-3xl text-ink">{aboutContent.contactCta.body[locale]}</p>
          <Button href={aboutContent.contactCta.link.href} className="mt-8">
            {aboutContent.contactCta.link[`label_${locale}`]}
          </Button>
          <Link href="/about" className="sr-only">
            {aboutContent.meta.heading[locale]}
          </Link>
        </section>
      </div>
    </article>
  );
}
