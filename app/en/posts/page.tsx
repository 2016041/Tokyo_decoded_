import type { Metadata } from "next";
import { PostsArchive } from "@/components/sections/PostsArchive";
import { postCategories } from "@/content/posts";
import { metadataForPage } from "@/lib/i18n";
import { listPosts } from "@/lib/posts";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return metadataForPage("posts", "en");
}

export default function EnPostsPage() {
  return <PostsArchive locale="en" items={listPosts()} categories={postCategories} />;
}
