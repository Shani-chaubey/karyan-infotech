import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { getSitePage } from "@/lib/cms/getters";
import ProjectsPageContent, {
  type ProjectsListPayload,
} from "@/components/site/ProjectsPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getSitePage("projects");
  if (!doc) return { title: "Our Projects" };
  return { title: doc.metaTitle, description: doc.metaDescription };
}

export default async function ProjectsPage() {
  const doc = await getSitePage("projects");
  if (!doc) notFound();
  const payload = doc.payload as ProjectsListPayload;
  return (
    <>
      <PageHeader title={doc.metaTitle} breadcrumbs={[{ label: "Projects" }]} />
      <ProjectsPageContent payload={payload} />
    </>
  );
}
