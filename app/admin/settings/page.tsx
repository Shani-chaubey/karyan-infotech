import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SiteSettingsPortalForm from "@/components/admin/SiteSettingsPortalForm";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell
      title="Site settings"
      subtitle="Navigation, footer, phone numbers, and social links that repeat across the whole website."
      breadcrumbs={[{ label: "Overview", href: "/admin" }, { label: "Site settings" }]}
      userEmail={session.email}
    >
      <SiteSettingsPortalForm />
    </AdminShell>
  );
}
