import { homeContent } from "@/content/home";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

type ContactCTAProps = {
  locale?: Locale;
};

export function ContactCTA({ locale = "ja" }: ContactCTAProps) {
  const content = homeContent.contact;

  return (
    <section aria-labelledby="contact-cta-heading" className="bg-paper border-t border-ink/20">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h2
          id="contact-cta-heading"
          className="font-[family-name:var(--font-jp)] font-black text-ink text-3xl md:text-4xl"
        >
          {content.heading[locale]}
        </h2>
        <p className="mt-5 max-w-2xl font-[family-name:var(--font-jp)] text-base md:text-lg text-ink">
          {content.body[locale]}
        </p>
        <Button href={content.cta.href} className="mt-8">
          {content.cta[`label_${locale}`]}
        </Button>
      </div>
    </section>
  );
}
