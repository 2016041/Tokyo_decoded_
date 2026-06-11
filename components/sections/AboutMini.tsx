import Image from "next/image";
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
      <div className="mx-auto max-w-[1200px] px-[5vw] pt-[clamp(88px,12vw,136px)] pb-[clamp(40px,6vw,72px)] lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <h2
              id="about-mini-heading"
              className="font-display text-[clamp(2.5rem,5vw,4.6rem)] font-bold leading-none text-ink"
            >
              {content.heading.en}
            </h2>
            <p className="mt-4 font-jp text-xl font-medium text-ink">
              {content.heading[locale]}
            </p>
            <Link
              href={content.link.href}
              className="mt-10 inline-flex items-center gap-3 border-b border-ink pb-1 font-sans text-sm font-medium uppercase tracking-widest text-ink transition-colors duration-150 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:ring-accent"
            >
              {content.link[`label_${locale}`]}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-8">
            <p className="max-w-3xl font-jp text-base font-normal leading-loose text-ink md:text-lg">
              {content.body[locale]}
            </p>
            <EditorialTeamIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialTeamIllustration() {
  return (
    <div>
      <Image
        src="/brand/editorial-team.png"
        alt="Tokyo Decoded編集部メンバーのイラスト"
        width={1286}
        height={772}
        sizes="(min-width: 1024px) 58vw, 90vw"
        className="h-auto w-full"
      />
    </div>
  );
}
