import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ContentPagePortalForm from "@/components/admin/ContentPagePortalForm";

export default async function AdminContentPageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const { slug } = await params;
  const isNew = slug === "new";

  return (
    <AdminShell
      title={isNew ? "New content page" : "Edit content page"}
      subtitle="Name, URL slug, and rich-text body — same editor as blog articles."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Content pages", href: "/admin/content-pages" },
        { label: isNew ? "New" : slug },
      ]}
      userEmail={session.email}
    >
      <ContentPagePortalForm slug={slug} isNew={isNew} />
    </AdminShell>
  );
}
