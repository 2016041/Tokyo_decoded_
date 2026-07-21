"use client";
// components/redesign/FooterTD.tsx — REDESIGN フッター（Editor's Toolsバンド＋主要メニュー/補足ページを分離・ロゴ入り）
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FooterTD() {
  const pathname = usePathname() ?? "/";
  const ja = !pathname.startsWith("/en");
  const b = ja ? "" : "/en";

  const mainMenu = [
    { href: `${b}/posts`, label: ja ? "記事一覧" : "Articles" },
    { href: `${b}/about`, label: ja ? "編集部について" : "About" },
    { href: `${b}/tools`, label: "Editor's Tools" },
    { href: `${b}/contact`, label: ja ? "お問い合わせ" : "Contact" },
  ];
  const legal = [
    { href: `${b}/editorial-policy`, label: ja ? "編集ポリシー" : "Editorial Policy" },
    { href: `${b}/disclosure`, label: ja ? "開示" : "Disclosure" },
    { href: `${b}/privacy`, label: ja ? "プライバシー" : "Privacy" },
  ];

  return (
    <footer className="td-scope" role="contentinfo">
      <div className="td-band">
        <div className="td-wrap">
          <div className="td-bandin">
            <div>
              <h3>{ja ? "Editor's Tools — 無料で受け取る" : "Editor's Tools — Free"}</h3>
              <p>{ja ? "編集部が実際に使う家計テンプレ・リサーチブリーフを配布中。" : "Free templates and research briefs from the editorial team."}</p>
            </div>
            <Link className="td-btn" href={`${b}/tools`}>{ja ? "ツールを受け取る" : "Get the tools"}</Link>
          </div>
        </div>
      </div>

      <div className="td-wrap">
        <div className="td-fmain">
          <div className="td-fbrand">
            <Link href={`${b}/`} aria-label="Tokyo Decoded ホーム">
              <Image className="td-logo" src="/brand/logo-horizontal.svg" alt="Tokyo Decoded" width={230} height={30} />
            </Link>
            <p className="td-ftag">
              {ja
                ? "東京拠点のバイリンガル編集部。海外⇄日本のトレンドを、データと出典で読み解いて届けています。"
                : "A Tokyo-based bilingual editorial team, decoding global trends for Japan with data and sources."}
            </p>
          </div>
          <nav className="td-fnav" aria-label={ja ? "フッター主要メニュー" : "Footer menu"}>
            <span className="td-fnavh">{ja ? "メニュー" : "Menu"}</span>
            {mainMenu.map((m) => (
              <Link key={m.href} className="td-fmenu" href={m.href}>{m.label}</Link>
            ))}
          </nav>
        </div>

        <div className="td-fbottom">
          <div className="td-flegal">
            {legal.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>
          <span className="td-fcopy">© 2026 Tokyo Decoded</span>
          <span className="td-en">DECODE THE WORLD FROM TOKYO</span>
        </div>
      </div>
    </footer>
  );
}
