"use client";
// components/redesign/HeaderTD.tsx — REDESIGN 固定ヘッダー（テーマ切替・日付行畳み・検索オーバーレイ）
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SearchItem } from "@/lib/td";

type Locale = "ja" | "en";

const Sun = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" /></svg>
);
const Moon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
);

const NAV = [
  { ja: "お金・AI", en: "Money & AI", href: "money-ai" },
  { ja: "暮らし", en: "Lifestyle", href: "lifestyle" },
  { ja: "美容", en: "Beauty", href: "beauty" },
  { ja: "まとめ・比較", en: "Guides", href: "guides" },
];

export default function HeaderTD({ indexJa, indexEn }: { indexJa: SearchItem[]; indexEn: SearchItem[] }) {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname.startsWith("/en") ? "en" : "ja";
  const searchIndex = locale === "en" ? indexEn : indexJa;
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const base = locale === "ja" ? "" : "/en";
  const postsBase = locale === "ja" ? "/posts" : "/en/posts";

  // ライト既定・トグルでダーク（data-theme）
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);
  const toggleTheme = useCallback(() => {
    setDark((d) => {
      const nv = !d;
      document.documentElement.setAttribute("data-theme", nv ? "dark" : "light");
      return nv;
    });
  }, []);

  useEffect(() => {
    const on = () => setScrolled((window.scrollY || 0) > 6);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => { clearTimeout(t); document.body.style.overflow = ""; };
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const ql = q.trim().toLowerCase();
  const results = ql
    ? searchIndex.filter((a) => a.t.toLowerCase().includes(ql) || a.c.toLowerCase().includes(ql))
    : searchIndex;

  return (
    <>
      <header className={`td-hdr td-scope${scrolled ? " td-scrolled" : ""}`} role="banner">
        <div className="td-wrap">
          <div className="td-mrow">
            <Link className="td-brand" href={`${base}/`} aria-label="Tokyo Decoded ホーム">
              <Image className="td-logo" src="/brand/logo-horizontal.svg" alt="Tokyo Decoded" width={230} height={30} priority />
            </Link>
            <div className="td-rightc">
              <nav className="td-mnav" aria-label={locale === "ja" ? "カテゴリ" : "Categories"}>
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href === "guides" ? postsBase : `${postsBase}?cat=${n.href}`}>
                    {locale === "ja" ? n.ja : n.en}
                  </Link>
                ))}
              </nav>
              <button className="td-tbtn" type="button" aria-label={locale === "ja" ? "記事を検索" : "Search"} onClick={() => setOpen(true)}>{SearchIcon}</button>
              <button className="td-tbtn" type="button" aria-label={locale === "ja" ? "ダークモード切り替え" : "Toggle dark mode"} onClick={toggleTheme}>{dark ? Sun : Moon}</button>
              <div className="td-lang">
                <Link href={pathForLocale("ja")} className={locale === "ja" ? "td-on" : ""}>JP</Link>
                <Link href={pathForLocale("en")} className={locale === "en" ? "td-on" : ""}>EN</Link>
              </div>
            </div>
          </div>
          <div className="td-dateline">
            <span>{locale === "ja" ? "東京発・海外⇄日本のトレンドを翻訳する編集部" : "Decoding global trends from Tokyo"}</span>
            <span>{locale === "ja" ? "海外⇄日本のトレンド翻訳" : "Bilingual editorial"}</span>
          </div>
        </div>
      </header>

      {open && (
        <div className="td-searchov td-scope">
          <div className="td-sbackdrop" onClick={() => setOpen(false)} />
          <div className="td-spanel" role="dialog" aria-label={locale === "ja" ? "記事を検索" : "Search articles"}>
            <div className="td-sbar">
              {SearchIcon}
              <input ref={inputRef} className="td-sinput" type="text" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder={locale === "ja" ? "キーワードで記事を探す（例：節約 / Z世代 / 睡眠）" : "Search articles"} />
              <button className="td-sclose" type="button" onClick={() => setOpen(false)}>{locale === "ja" ? "閉じる" : "Close"}</button>
            </div>
            <div className="td-sresults">
              <div className="td-shead">{ql ? `${results.length} ${locale === "ja" ? "件の記事" : "results"}` : `${locale === "ja" ? "全" : "All"} ${searchIndex.length} ${locale === "ja" ? "記事" : "articles"}`}</div>
              {results.length === 0 ? (
                <div className="td-snone">{locale === "ja" ? `「${q}」に一致する記事は見つかりませんでした。` : `No results for “${q}”.`}</div>
              ) : (
                results.map((a) => (
                  <Link key={a.u} className="td-sr" href={a.u} onClick={() => setOpen(false)}>
                    <span className={`td-src ${a.cc}`}>{a.c}</span>
                    <span className="td-srk">{a.k}</span>
                    <span className="td-srt">{a.t}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  function pathForLocale(l: Locale): string {
    if (typeof window === "undefined") return l === "ja" ? "/" : "/en";
    const p = window.location.pathname;
    if (l === "en") return p.startsWith("/en") ? p : `/en${p === "/" ? "" : p}`;
    return p.startsWith("/en") ? p.slice(3) || "/" : p;
  }
}
