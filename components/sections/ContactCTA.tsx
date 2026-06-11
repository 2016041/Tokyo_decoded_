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
      <div className="mx-auto max-w-[1200px] px-[5vw] py-[clamp(88px,12vw,136px)] lg:px-10">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.35fr)] md:items-end">
          <div className="max-w-4xl">
            <h2
              id="contact-cta-heading"
              className="font-display text-[clamp(2.8rem,6vw,6rem)] font-bold leading-none text-paper"
            >
              {content.heading.en}
            </h2>
            <p className="mt-5 font-jp text-2xl font-black leading-tight text-paper md:text-4xl">
              {content.heading[locale]}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-light md:text-lg">
              {content.body[locale]}
            </p>
          </div>
          <div className="md:justify-self-end">
            <Button
              href={content.cta.href}
              variant="outline"
              className="border-paper text-paper hover:bg-paper hover:!text-ink"
            >
              {content.cta[`label_${locale}`]}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
