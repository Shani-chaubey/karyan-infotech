import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongo } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectMongo();
  const doc = await SiteSettingsModel.findOne({ key: "default" }).lean();
  if (!doc) return NextResponse.json({ nav: null, footer: null });
  return NextResponse.json({ nav: doc.nav, footer: doc.footer });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json();
  if (!body?.nav || !body?.footer) {
    return NextResponse.json({ error: "nav and footer required" }, { status: 400 });
  }
  await connectMongo();
  await SiteSettingsModel.findOneAndUpdate(
    { key: "default" },
    { $set: { key: "default", nav: body.nav, footer: body.footer } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true });
}
