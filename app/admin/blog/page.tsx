import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import BlogPortalForm from "@/components/admin/BlogPortalForm";

export default async function AdminBlogPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell
      title="Blog posts"
      subtitle="Each card is one article shown on the blog listing. Slugs and links are generated for you if you leave them blank."
      breadcrumbs={[{ label: "Overview", href: "/admin" }, { label: "Blog posts" }]}
      userEmail={session.email}
    >
      <BlogPortalForm />
    </AdminShell>
  );
}
