// components/redesign/CardTD.tsx — REDESIGN 記事カード（サーバー）
import Link from "next/link";
import type { Post } from "@/content/types";
import { catClass, catLabel, kindLabel, postHref, title, excerpt, fmtDot } from "@/lib/td";

type Locale = "ja" | "en";

export default function CardTD({ post, locale }: { post: Post; locale: Locale }) {
  return (
    <Link className="td-c" href={postHref(post, locale)}>
      <div className="td-ci" style={{ backgroundImage: `url(${post.thumbnail})` }} />
      <div className="td-cmeta">
        <span className={`td-ck ${catClass(post.category)}`}>{catLabel(post.category, locale)}</span>
        <span className="td-ct">{kindLabel(post, locale)}</span>
        <span className="td-cd">{fmtDot(post.publishedAt)}</span>
      </div>
      <h3>{title(post, locale)}</h3>
      <p>{excerpt(post, locale)}</p>
      <span className="td-more">{locale === "ja" ? "続きを読む →" : "Read more →"}</span>
    </Link>
  );
}
