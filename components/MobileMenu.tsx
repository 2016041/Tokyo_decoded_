"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/site";
import LangToggle from "./LangToggle";

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const focusClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const dialog = dialogRef.current;
    const focusableElements = dialog
      ? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="モバイルメニューを開く"
        onClick={() => setIsOpen(true)}
        className={[
          "inline-flex h-12 w-12 items-center justify-center rounded-none border border-ink bg-paper text-ink transition-colors duration-[150ms] hover:text-accent motion-reduce:transition-none",
          focusClassName,
        ].join(" ")}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          className="h-6 w-6"
        >
          <path
            d="M4 7h16M4 12h16M4 17h16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="2"
          />
        </svg>
      </button>

      {isOpen ? (
        <div
          id="mobile-menu"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="モバイルメニュー"
          className="fixed inset-0 z-[400] bg-paper text-ink"
        >
          <div className="flex min-h-dvh flex-col px-[5vw] py-5">
            <div className="flex items-center justify-end">
              <button
                type="button"
                aria-label="モバイルメニューを閉じる"
                onClick={closeMenu}
                className={[
                  "inline-flex h-12 w-12 items-center justify-center rounded-none border border-ink bg-paper text-ink transition-colors duration-[150ms] hover:text-accent motion-reduce:transition-none",
                  focusClassName,
                ].join(" ")}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label="グローバルナビゲーション" className="mt-12">
              <ul role="list" className="flex flex-col border-t border-ink/20">
                {siteContent.nav.map((item) => (
                  <li key={item.href} className="border-b border-ink/20">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={[
                        "block py-5 font-[family-name:var(--font-jp)] text-2xl font-medium text-ink transition-colors duration-[150ms] hover:text-accent motion-reduce:transition-none",
                        focusClassName,
                      ].join(" ")}
                    >
                      {item.label_ja}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <LangToggle />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
