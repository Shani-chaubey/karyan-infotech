import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { connectMongo } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import CreateAdminForm from "./CreateAdminForm";
import UserCreateForm from "./UserCreateForm";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  await connectMongo();
  const users = await UserModel.find().select("email role").sort({ email: 1 }).lean();

  return (
    <AdminShell
      title="People & access"
      subtitle="Invite colleagues who may log into this studio. These accounts are not shown on the public website."
      breadcrumbs={[{ label: "Overview", href: "/admin" }, { label: "People & access" }]}
      userEmail={session.email}
    >
      <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-5">
        <h2 className="font-display text-lg font-semibold text-lux-navy">Who has access</h2>
        <p className="mt-2 text-sm text-stone-600">
          Only people listed here can sign in at{" "}
          <span className="font-mono text-stone-800">/admin/login</span> when their role is{" "}
          <span className="font-medium">admin</span> or <span className="font-medium">editor</span>.
        </p>

        <ul className="mt-5 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white text-sm">
          {users.length === 0 ? (
            <li className="px-4 py-6 text-stone-500">No users yet — create an admin below.</li>
          ) : (
            users.map((u) => (
              <li key={String(u._id)} className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="font-medium text-stone-900">{u.email}</span>
                <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">
                  {u.role}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      <CreateAdminForm />
      <UserCreateForm />
    </AdminShell>
  );
}
