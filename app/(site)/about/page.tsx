import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { getSitePage } from "@/lib/cms/getters";
import AboutPageContent, {
  type AboutPayload,
} from "@/components/site/AboutPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getSitePage("about");
  if (!doc) return { title: "About Us" };
  return { title: doc.metaTitle, description: doc.metaDescription };
}

export default async function AboutPage() {
  const doc = await getSitePage("about");
  if (!doc) notFound();
  const payload = doc.payload as AboutPayload;
  return (
    <>
      <PageHeader
        title={payload.headerHeading || doc.metaTitle}
        subheading={payload.headerSubheading}
        bgImage={payload.headerBgImage}
        breadcrumbs={[{ label: "About Us" }]}
      />
      <AboutPageContent payload={payload} />
    </>
  );
}
