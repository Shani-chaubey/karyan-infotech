import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getContentPages } from "@/lib/cms/getters";
import { ArrowRight, Plus } from "lucide-react";

export default async function AdminContentPagesIndex() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const pages = await getContentPages();

  return (
    <AdminShell
      title="Content pages"
      subtitle="Legal pages, policies, and other standalone content — each has its own URL slug."
      breadcrumbs={[{ label: "Overview", href: "/admin" }, { label: "Content pages" }]}
      userEmail={session.email}
    >
      <div className="mb-6">
        <Link
          href="/admin/content-pages/new"
          className="inline-flex items-center gap-2 rounded-xl bg-lux-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-lux-navy-mid"
        >
          <Plus className="h-4 w-4" />
          Add page
        </Link>
      </div>

      {pages.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-200 bg-white px-5 py-8 text-sm text-stone-600">
          No content pages yet. Add one above or run{" "}
          <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs">npm run seed:privacy-policy</code>{" "}
          to create the Privacy Policy.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/content-pages/${p.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-gradient-to-br from-white to-stone-50/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-lux-navy">{p.title}</h2>
              <p className="mt-3 text-xs text-stone-500">
                Live URL: <span className="font-mono text-stone-700">/{p.slug}</span>
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lux-navy">
              Edit page
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
