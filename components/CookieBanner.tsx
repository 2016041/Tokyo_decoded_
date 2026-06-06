"use client";

import { useState, useSyncExternalStore } from "react";

type CookieConsent = "accepted" | "rejected";

const buttonClassName =
  "rounded-none border border-paper px-5 py-3 font-[family-name:var(--font-jp)] text-sm font-medium transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-accent motion-reduce:transition-none";

export default function CookieBanner() {
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
      aria-label="Cookieの使用に関する通知"
      className="fixed bottom-0 left-0 right-0 z-[600] bg-ink text-paper rounded-none"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-[5vw] py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="text-sm text-paper">
          当サイトはアクセス解析のため Cookie を使用します。
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className={[buttonClassName, "bg-paper text-ink hover:bg-cream"].join(
              " ",
            )}
          >
            同意する
          </button>
          <button
            type="button"
            onClick={() => handleConsent("rejected")}
            className={[buttonClassName, "bg-ink text-paper hover:text-cream"].join(
              " ",
            )}
          >
            拒否する
          </button>
        </div>
      </div>
    </div>
  );
}
