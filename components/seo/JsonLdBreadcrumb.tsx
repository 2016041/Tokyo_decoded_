import type { StructuredDataBreadcrumb } from "@/content/types";

type Props = {
  data: StructuredDataBreadcrumb;
};

export default function JsonLdBreadcrumb({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
