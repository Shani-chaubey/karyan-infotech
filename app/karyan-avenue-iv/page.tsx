import { notFound } from "next/navigation";
import { getProjectPayload } from "@/lib/cms/getters";
import ProjectPageView, { projectMetadata } from "@/components/projects/ProjectPageView";

export async function generateMetadata() {
  const data = await getProjectPayload("karyan-avenue-iv");
  if (!data) return {};
  return projectMetadata(data);
}

export default async function AvenueIVPage() {
  const data = await getProjectPayload("karyan-avenue-iv");
  if (!data) notFound();
  return <ProjectPageView data={data} />;
}
