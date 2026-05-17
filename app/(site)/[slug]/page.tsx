import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageView, { projectMetadata } from "@/components/projects/ProjectPageView";
import ContentPageView, { contentPageMetadata } from "@/components/site/ContentPageView";
import { RESERVED_ROUTE_SLUGS } from "@/lib/cms/contentPages";
import { getContentPageBySlug, getProjectPayload } from "@/lib/cms/getters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_ROUTE_SLUGS.has(slug)) return {};
  const contentPage = await getContentPageBySlug(slug);
  if (contentPage) return contentPageMetadata(contentPage);
  const project = await getProjectPayload(slug);
  if (!project) return {};
  return projectMetadata(project);
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED_ROUTE_SLUGS.has(slug)) notFound();

  const contentPage = await getContentPageBySlug(slug);
  if (contentPage) return <ContentPageView page={contentPage} />;

  const project = await getProjectPayload(slug);
  if (!project) notFound();
  return <ProjectPageView data={project} />;
}
