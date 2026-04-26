import { getAdminSession } from "@/lib/auth/session";
import { redirect, notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProjectPortalForm from "@/components/admin/ProjectPortalForm";

const labels: Record<string, string> = {
  "karyan-square": "Karyan Square",
  "karyan-citywalk": "Karyan CityWalk",
  "karyan-trevana": "Karyan Trevana",
  "karyan-avenue-iv": "Avenue IV",
};

const allowed = new Set(Object.keys(labels));

export default async function AdminProjectEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const { slug } = await params;
  if (!allowed.has(slug)) notFound();

  const name = labels[slug] ?? slug;

  return (
    <AdminShell
      title={name}
      subtitle="Structured sections mirror the public project page from hero to footer CTA."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Project pages", href: "/admin/projects" },
        { label: name },
      ]}
      userEmail={session.email}
    >
      <ProjectPortalForm key={slug} slug={slug} />
    </AdminShell>
  );
}
