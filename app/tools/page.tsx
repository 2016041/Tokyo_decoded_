import type { Metadata } from "next";
import { EditorsToolsForm } from "@/components/sections/EditorsToolsForm";
import ToolsListTD from "@/components/redesign/ToolsListTD";
import { tools } from "@/content/tools";
import { metadataForPage } from "@/lib/i18n";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return metadataForPage("tools", "ja");
}

export default function ToolsPage() {
  return (
    <>
      <ToolsListTD locale="ja" items={tools} />
      <div className="td-scope" id="tools-form">
        <EditorsToolsForm locale="ja" />
      </div>
    </>
  );
}
