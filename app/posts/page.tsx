import type { Metadata } from "next";
import { PostsArchive } from "@/components/sections/PostsArchive";
import { postCategories } from "@/content/posts";
import { listPosts } from "@/lib/posts";
import { metadataForPage } from "@/lib/i18n";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return metadataForPage("posts", "ja");
}

export default function PostsPage() {
  return <PostsArchive locale="ja" items={listPosts()} categories={postCategories} />;
}
