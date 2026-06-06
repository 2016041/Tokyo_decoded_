import { homeContent } from "@/content/home";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

type HeroProps = {
  locale?: Locale;
};

export function Hero({ locale = "ja" }: HeroProps) {
  const content = homeContent.hero;

  return (
    <section aria-labelledby="hero-heading" className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h1
          id="hero-heading"
          lang="en"
          className="font-[family-name:var(--font-display)] font-bold text-ink text-[clamp(2.4rem,6vw,4rem)] leading-tight tracking-tight text-left max-w-4xl"
        >
          {content.h1[locale]}
        </h1>
        <p className="font-[family-name:var(--font-jp)] text-ink text-base md:text-lg max-w-2xl mt-6">
          {content.subcopy[locale]}
        </p>
        <div
          role="group"
          aria-label="メインアクション"
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Button href={content.cta.primary.href} variant="primary">
            {content.cta.primary[`label_${locale}`]}
          </Button>
          <Button href={content.cta.secondary.href} variant="outline">
            {content.cta.secondary[`label_${locale}`]}
          </Button>
        </div>
      </div>
    </section>
  );
}
