import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import LangToggle from "./LangToggle";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

const focusClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent";

export default function Header() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-[200] bg-paper border-b border-ink/20"
    >
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-6">
          <Link href="/" className={["block", focusClassName].join(" ")}>
            <Image
              src="/brand/logo-horizontal.svg"
              alt="Tokyo Decoded"
              width={230}
              height={33}
              priority
              className="h-auto w-[184px] md:w-[230px]"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Navigation />
            <LangToggle />
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
