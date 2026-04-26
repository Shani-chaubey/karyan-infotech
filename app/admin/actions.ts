"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/lib/auth/jwt";

export async function logoutAdmin() {
  (await cookies()).delete(COOKIE_NAME);
  redirect("/admin/login");
}
