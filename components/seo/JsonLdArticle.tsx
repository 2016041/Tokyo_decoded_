import type { StructuredDataArticle } from "@/content/types";

type Props = {
  data: StructuredDataArticle;
};

export default function JsonLdArticle({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
