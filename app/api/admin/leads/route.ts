import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { listLeadSubmissions } from "@/lib/leads/listLeads";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const leads = await listLeadSubmissions();
  return NextResponse.json({ leads });
}
