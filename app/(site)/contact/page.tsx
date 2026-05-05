import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { getSitePage } from "@/lib/cms/getters";
import ContactPageContent, {
  type ContactPayload,
} from "@/components/site/ContactPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getSitePage("contact");
  if (!doc) return { title: "Contact" };
  return { title: doc.metaTitle, description: doc.metaDescription };
}

export default async function ContactPage() {
  const doc = await getSitePage("contact");
  if (!doc) notFound();
  const payload = doc.payload as ContactPayload;
  return (
    <>
      <PageHeader
        title={payload.headerHeading || doc.metaTitle}
        subheading={payload.headerSubheading}
        bgImage={payload.headerBgImage}
        breadcrumbs={[{ label: "Contact" }]}
      />
      <ContactPageContent payload={payload} />
    </>
  );
}
