import { getAdminSession } from "@/lib/auth/session";
import { redirect, notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SitePagePortalForm from "@/components/admin/SitePagePortalForm";

const titles: Record<string, string> = {
  about: "About us",
  contact: "Contact page",
  projects: "Projects listing",
  blog: "Blog intro",
};

const allowed = new Set(Object.keys(titles));

export default async function AdminSitePageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const { slug } = await params;
  if (!allowed.has(slug)) notFound();

  const title = titles[slug] ?? slug;

  return (
    <AdminShell
      title={title}
      subtitle="Plain-language fields grouped the same way visitors scroll the page."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Marketing pages", href: "/admin/pages" },
        { label: title },
      ]}
      userEmail={session.email}
    >
      <SitePagePortalForm key={slug} slug={slug} />
    </AdminShell>
  );
}
