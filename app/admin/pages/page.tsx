import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { ArrowRight } from "lucide-react";

const pages = [
  {
    slug: "about",
    label: "About us",
    blurb: "Company story, stats, and why-invest band.",
    url: "/about",
  },
  {
    slug: "contact",
    label: "Contact",
    blurb: "Hero line, phone/email rows, map, and form headings.",
    url: "/contact",
  },
  {
    slug: "projects",
    label: "Projects listing",
    blurb: "Portfolio grid — titles, blurbs, and links to each project.",
    url: "/projects",
  },
  {
    slug: "blog",
    label: "Blog intro",
    blurb: "Eyebrow and heading above the article list (not the articles themselves).",
    url: "/blog",
  },
];

export default async function AdminPagesIndex() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell
      title="Marketing pages"
      subtitle="Edit standalone pages that are not the home page or individual project detail templates."
      breadcrumbs={[{ label: "Overview", href: "/admin" }, { label: "Marketing pages" }]}
      userEmail={session.email}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/pages/${p.slug}`}
            className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="font-display text-lg font-semibold text-lux-navy">{p.label}</h2>
            <p className="mt-1 text-sm text-stone-600">{p.blurb}</p>
            <p className="mt-3 text-xs text-stone-500">
              Public page: <span className="font-mono text-stone-700">{p.url}</span>
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lux-navy">
              Open editor
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
