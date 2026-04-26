"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserCreateForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg(typeof j.error === "string" ? j.error : "Failed");
      return;
    }
    setMsg("User created.");
    setEmail("");
    setPassword("");
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 max-w-md space-y-3 rounded-lg border border-stone-200 bg-white p-4"
    >
      <h2 className="text-sm font-semibold text-stone-800">Create user (admin or editor)</h2>
      <p className="text-xs text-stone-500">
        Use this if you need an extra admin or an editor account. For a dedicated admin-only flow, use{" "}
        <strong>Create admin</strong> above.
      </p>
      <input
        type="email"
        required
        placeholder="Email"
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        required
        minLength={8}
        placeholder="Password (min 8 chars)"
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "editor")}
      >
        <option value="editor">editor</option>
        <option value="admin">admin</option>
      </select>
      <button type="submit" className="rounded bg-stone-800 px-4 py-2 text-sm font-medium text-white">
        Create user
      </button>
      {msg ? <p className="text-sm text-stone-600">{msg}</p> : null}
    </form>
  );
}
