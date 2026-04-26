import { cookies } from "next/headers";
import { COOKIE_NAME, verifyAdminToken } from "./jwt";

export type AdminSession = { sub: string; email: string };

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const payload = await verifyAdminToken(token);
    const sub = payload.sub;
    const email = typeof payload.email === "string" ? payload.email : undefined;
    if (!sub || !email) return null;
    return { sub, email };
  } catch {
    return null;
  }
}
