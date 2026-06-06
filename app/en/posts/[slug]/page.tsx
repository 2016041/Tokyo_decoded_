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
  const title = meta?.title_en ?? post.title_en;
  const description = meta?.description_en ?? post.excerpt_en;
  const category =
    postCategories.find((item) => item.slug === post.category)?.label_en ?? post.category;
  const ogUrl = `/api/og?title=${encodeURIComponent(post.title_en)}&category=${encodeURIComponent(category)}`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/en/posts/${post.slug}`),
      languages: {
        ja: absoluteUrl(`/posts/${post.slug}`),
        en: absoluteUrl(`/en/posts/${post.slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/en/posts/${post.slug}`),
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      alternateLocale: "ja_JP",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      site: defaultMetadata.twitterSite,
      creator: defaultMetadata.twitterCreator,
    },
  };
}

export default async function EnPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleData = {
    ...structuredDataTemplates.articleTemplate,
    headline: post.title_en,
    description: post.excerpt_en,
    image: absoluteUrl(post.thumbnail),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "en",
  };

  return (
    <>
      <JsonLdArticle data={articleData} />
      <PostBody post={post} locale="en" />
    </>
  );
}
