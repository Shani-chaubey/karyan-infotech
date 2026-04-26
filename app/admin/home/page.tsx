import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import HomePortalForm from "@/components/admin/HomePortalForm";

export default async function AdminHomeEditorPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell
      title="Home page"
      subtitle="Every block below maps to a section on your public homepage. Open a section, edit in plain language, then save."
      breadcrumbs={[{ label: "Overview", href: "/admin" }, { label: "Home page" }]}
      userEmail={session.email}
    >
      <HomePortalForm />
    </AdminShell>
  );
}
