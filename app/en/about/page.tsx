import type { Metadata } from "next";
import { AboutPageBody } from "@/components/sections/AboutPageBody";
import { metadataForPage } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return metadataForPage("about", "en");
}

export default function EnAboutPage() {
  return <AboutPageBody locale="en" />;
}
