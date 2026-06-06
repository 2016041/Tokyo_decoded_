import type { Locale } from "@/lib/types";

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string | Date, locale: Locale = "ja"): string {
  const value = typeof date === "string" ? new Date(`${date}T00:00:00`) : date;

  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}
