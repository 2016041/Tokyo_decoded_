"use client";

import { usePathname, useRouter } from "next/navigation";

type Locale = "ja" | "en";

const buttonBaseClassName =
  "border border-ink px-3 py-2 font-[family-name:var(--font-sans)] text-sm font-medium transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent motion-reduce:transition-none";

function getTargetPath(pathname: string, locale: Locale): string {
  const isEnglishPath = pathname === "/en" || pathname.startsWith("/en/");

  if (locale === "en") {
    if (isEnglishPath) {
      return pathname;
    }

    return pathname === "/" ? "/en" : `/en${pathname}`;
  }

  if (!isEnglishPath) {
    return pathname;
  }

  const withoutPrefix = pathname.replace(/^\/en/, "");
  return withoutPrefix === "" ? "/" : withoutPrefix;
}

function saveLanguagePreference(locale: Locale) {
  document.cookie = `lang=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export default function LangToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const currentPathname = pathname ?? "/";
  const isJa = !(
    currentPathname === "/en" || currentPathname.startsWith("/en/")
  );

  const handleSwitch = (locale: Locale) => {
    saveLanguagePreference(locale);
    router.push(getTargetPath(currentPathname, locale));
  };

  return (
    <div role="group" aria-label="言語切替" className="inline-flex">
      <button
        type="button"
        aria-pressed={isJa}
        lang="ja"
        aria-label={isJa ? "日本語（現在選択中）" : "日本語に切り替える"}
        onClick={() => handleSwitch("ja")}
        className={[
          buttonBaseClassName,
          "rounded-none",
          isJa
            ? "bg-ink text-paper"
            : "bg-paper text-muted hover:text-ink",
        ].join(" ")}
      >
        JP
      </button>
      <button
        type="button"
        aria-pressed={!isJa}
        lang="en"
        aria-label={isJa ? "英語に切り替える" : "英語（現在選択中）"}
        onClick={() => handleSwitch("en")}
        className={[
          buttonBaseClassName,
          "rounded-none border-l-0",
          isJa
            ? "bg-paper text-muted hover:text-ink"
            : "bg-ink text-paper",
        ].join(" ")}
      >
        EN
      </button>
    </div>
  );
}
