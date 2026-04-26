import { notFound } from "next/navigation";
import { getProjectPayload } from "@/lib/cms/getters";
import ProjectPageView, { projectMetadata } from "@/components/projects/ProjectPageView";

export async function generateMetadata() {
  const data = await getProjectPayload("karyan-trevana");
  if (!data) return {};
  return projectMetadata(data);
}

export default async function TrevanaPage() {
  const data = await getProjectPayload("karyan-trevana");
  if (!data) notFound();
  return <ProjectPageView data={data} />;
}
