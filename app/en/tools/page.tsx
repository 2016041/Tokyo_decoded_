import type { Metadata } from "next";
import { EditorsToolsForm } from "@/components/sections/EditorsToolsForm";
import { ToolsList } from "@/components/sections/ToolsList";
import { tools } from "@/content/tools";
import { metadataForPage } from "@/lib/i18n";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return metadataForPage("tools", "en");
}

export default function EnToolsPage() {
  return (
    <>
      <ToolsList locale="en" items={tools} />
      <EditorsToolsForm locale="en" />
    </>
  );
}
