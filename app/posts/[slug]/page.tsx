import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLdArticle from "@/components/seo/JsonLdArticle";
import { PostBody } from "@/components/sections/PostBody";
import { postCategories, posts } from "@/content/posts";
import { defaultMetadata, pageMetadata, structuredDataTemplates } from "@/content/seo";
import { absoluteUrl } from "@/lib/i18n";
import { getPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  const key = `posts/${post.slug}` as keyof typeof pageMetadata;
  const meta = pageMetadata[key];
  const title = meta?.title_ja ?? post.title_ja;
  const description = meta?.description_ja ?? post.excerpt_ja;
  const category =
    postCategories.find((item) => item.slug === post.category)?.label_ja ?? post.category;
  const ogUrl = `/api/og?title=${encodeURIComponent(post.title_ja)}&category=${encodeURIComponent(category)}`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/posts/${post.slug}`),
      languages: {
        ja: absoluteUrl(`/posts/${post.slug}`),
        en: absoluteUrl(`/en/posts/${post.slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/posts/${post.slug}`),
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
      locale: "ja_JP",
      alternateLocale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      site: defaultMetadata.twitterSite,
      creator: defaultMetadata.twitterCreator,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleData = {
    ...structuredDataTemplates.articleTemplate,
    headline: post.title_ja,
    description: post.excerpt_ja,
    image: absoluteUrl(post.thumbnail),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "ja",
  };

  return (
    <>
      <JsonLdArticle data={articleData} />
      <PostBody post={post} locale="ja" />
    </>
  );
}
