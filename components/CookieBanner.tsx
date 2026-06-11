"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

type CookieConsent = "accepted" | "rejected";

const buttonClassName =
  "rounded-none border border-paper px-5 py-3 text-sm font-medium transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-accent motion-reduce:transition-none";

export default function CookieBanner() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "ja";
  const content = {
    ja: {
      label: "Cookieの使用に関する通知",
      message: "当サイトはアクセス解析のため Cookie を使用します。",
      accept: "同意する",
      reject: "拒否する",
    },
    en: {
      label: "Cookie notice",
      message: "We use cookies for analytics.",
      accept: "Accept",
      reject: "Reject",
    },
  }[locale];

  const consentIsMissing = useSyncExternalStore(
    () => () => undefined,
    () => {
      const consent = window.localStorage.getItem("cookie-consent");
      return consent !== "accepted" && consent !== "rejected";
    },
    () => false,
  );
  const [isDismissed, setIsDismissed] = useState(false);
  const isVisible = consentIsMissing && !isDismissed;

  const handleConsent = (consent: CookieConsent) => {
    window.localStorage.setItem("cookie-consent", consent);
    setIsDismissed(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={content.label}
      className="fixed bottom-0 left-0 right-0 z-[600] bg-ink text-paper rounded-none"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-[5vw] py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p
          className={[
            "text-sm text-paper",
            locale === "ja" ? "font-jp" : "font-sans",
          ].join(" ")}
        >
          {content.message}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className={[
              buttonClassName,
              locale === "ja" ? "font-jp" : "font-sans",
              "bg-paper text-ink hover:bg-cream",
            ].join(" ")}
          >
            {content.accept}
          </button>
          <button
            type="button"
            onClick={() => handleConsent("rejected")}
            className={[
              buttonClassName,
              locale === "ja" ? "font-jp" : "font-sans",
              "bg-ink text-paper hover:text-cream",
            ].join(" ")}
          >
            {content.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
