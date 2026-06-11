import Image from "next/image";

import { homeContent } from "@/content/home";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

type HeroProps = {
  locale?: Locale;
};

export function Hero({ locale = "ja" }: HeroProps) {
  const content = homeContent.hero;
  const headline = "Decode the World from Tokyo.";

  return (
    <section aria-labelledby="hero-heading" className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-[5vw] py-[clamp(96px,13vw,164px)] lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.32fr)_minmax(320px,0.68fr)] lg:items-end">
          <div>
            <p
              className={[
                "max-w-3xl text-base font-medium leading-relaxed text-ink md:text-lg",
                locale === "ja" ? "font-jp" : "font-sans",
              ].join(" ")}
            >
              {content.h1[locale]}
            </p>
            <h1
              id="hero-heading"
              className="mt-8 max-w-[1040px] font-display text-[clamp(3rem,6.2vw,6.2rem)] font-bold leading-[0.98] tracking-normal text-ink text-balance"
            >
              {headline}
            </h1>
            <p className="mt-8 max-w-2xl font-jp text-base leading-relaxed text-ink md:text-lg">
              {content.subcopy[locale]}
            </p>
            <div
              role="group"
              aria-label="メインアクション"
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button href={content.cta.primary.href} variant="primary">
                {content.cta.primary[`label_${locale}`]}
              </Button>
              <Button href={content.cta.secondary.href} variant="outline">
                {content.cta.secondary[`label_${locale}`]}
              </Button>
            </div>
          </div>

          <div className="border border-ink bg-cream p-3">
            <div className="overflow-hidden border border-ink bg-paper">
              <Image
                src="/brand/hero-editorial-bg.png"
                alt=""
                width={1200}
                height={675}
                preload
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="hero-cover-image aspect-square w-full object-cover object-center lg:aspect-[3/4]"
              />
            </div>
            <p className="mt-3 font-sans text-xs font-medium uppercase tracking-widest text-ink">
              Tokyo / Research / Translation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
