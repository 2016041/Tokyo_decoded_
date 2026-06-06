import { homeContent } from "@/content/home";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

type ContactCTAProps = {
  locale?: Locale;
};

export function ContactCTA({ locale = "ja" }: ContactCTAProps) {
  const content = homeContent.contact;

  return (
    <section aria-labelledby="contact-cta-heading" className="bg-ink">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-sans)] text-xs font-semibold tracking-widest uppercase text-accent">
              Contact
            </p>
            <h2
              id="contact-cta-heading"
              className="mt-4 font-[family-name:var(--font-jp)] font-black text-paper text-3xl md:text-4xl leading-tight"
            >
              {content.heading[locale]}
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-light leading-relaxed">
              {content.body[locale]}
            </p>
          </div>
          <div className="shrink-0">
            <Button href={content.cta.href} variant="outline" className="border-paper text-paper hover:bg-paper hover:text-ink">
              {content.cta[`label_${locale}`]}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
