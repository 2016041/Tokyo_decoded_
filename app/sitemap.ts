import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { defaultMetadata, robotsPolicy } from "@/content/seo";

type SitemapPriorityKey = keyof typeof robotsPolicy.sitemapPriorities;
type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = defaultMetadata.siteUrl;
  const staticPaths: Array<{
    path: string;
    key: SitemapPriorityKey;
    freq: ChangeFrequency;
  }> = [
    { path: "", key: "/", freq: "weekly" },
    { path: "/about", key: "/about", freq: "monthly" },
    { path: "/posts", key: "/posts", freq: "daily" },
    { path: "/tools", key: "/tools", freq: "monthly" },
    { path: "/contact", key: "/contact", freq: "yearly" },
    { path: "/privacy", key: "/privacy", freq: "yearly" },
    { path: "/disclosure", key: "/disclosure", freq: "yearly" },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((page) => [
    {
      url: `${base}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.freq,
      priority: robotsPolicy.sitemapPriorities[page.key],
    },
    {
      url: `${base}/en${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.freq,
      priority: robotsPolicy.sitemapPriorities[page.key],
    },
  ]);

  const postPages: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${base}/posts/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: robotsPolicy.sitemapPriorities["/posts/[slug]"],
    },
    {
      url: `${base}/en/posts/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: robotsPolicy.sitemapPriorities["/posts/[slug]"],
    },
  ]);

  return [...staticPages, ...postPages];
}
