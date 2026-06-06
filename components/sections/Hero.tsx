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
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(80px,14vw,140px)]">
        <div className="max-w-5xl">
          <p className="inline-flex items-center gap-3 font-[family-name:var(--font-sans)] text-xs font-semibold tracking-widest uppercase text-accent">
            <span className="block h-px w-8 bg-accent" aria-hidden="true" />
            Tokyo Decoded
          </p>
          <h1
            id="hero-heading"
            className="mt-6 font-[family-name:var(--font-jp)] font-black text-ink text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.25] tracking-tight"
          >
            {locale === "ja" ? (
              <>
                東京から世界を読み解き、
                <br />
                日本を世界へ翻訳する編集部。
              </>
            ) : (
              content.h1[locale]
            )}
          </h1>
          <p className="mt-8 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
            {content.subcopy[locale]}
          </p>
          <div
            role="group"
            aria-label="メインアクション"
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Button href={content.cta.primary.href} variant="primary">
              {content.cta.primary[`label_${locale}`]}
            </Button>
            <Button href={content.cta.secondary.href} variant="outline">
              {content.cta.secondary[`label_${locale}`]}
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-px bg-ink/10">
          {(
            [
              { num: "2", label_ja: "連載ジャンル", label_en: "Topics" },
              { num: "8", label_ja: "SNSアカウント", label_en: "Platforms" },
              { num: "100%", label_ja: "無料コンテンツ", label_en: "Free" },
            ] as const
          ).map((stat) => (
            <div key={stat.num} className="bg-paper px-4 py-8 md:px-10 md:py-10">
              <p className="font-[family-name:var(--font-display)] font-bold text-ink text-3xl md:text-4xl">
                {stat.num}
              </p>
              <p className="mt-1 font-[family-name:var(--font-jp)] text-xs md:text-sm text-muted">
                {locale === "ja" ? stat.label_ja : stat.label_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
