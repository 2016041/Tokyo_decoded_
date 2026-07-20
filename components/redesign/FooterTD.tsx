"use client";
// components/redesign/FooterTD.tsx — REDESIGN フッター（Editor's Toolsバンド＋リンク）
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterTD() {
  const pathname = usePathname() ?? "/";
  const ja = !pathname.startsWith("/en");
  const b = ja ? "" : "/en";
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
        <div className="td-foot">
          <span>
            © 2026 Tokyo Decoded —{" "}
            <Link href={`${b}/about`}>{ja ? "編集部について" : "About"}</Link> /{" "}
            <Link href={`${b}/editorial-policy`}>{ja ? "編集ポリシー" : "Editorial Policy"}</Link> /{" "}
            <Link href={`${b}/disclosure`}>{ja ? "開示" : "Disclosure"}</Link> /{" "}
            <Link href={`${b}/privacy`}>{ja ? "プライバシー" : "Privacy"}</Link> /{" "}
            <Link href={`${b}/tools`}>Editor&apos;s Tools</Link>
          </span>
          <span className="td-en">DECODE THE WORLD FROM TOKYO</span>
        </div>
      </div>
    </footer>
  );
}
