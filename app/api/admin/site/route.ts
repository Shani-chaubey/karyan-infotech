import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongo } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cms/defaults/siteSettings";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectMongo();
  const doc = await SiteSettingsModel.findOne({ key: "default" }).lean();
  if (!doc) return NextResponse.json({ nav: null, footer: null, themeColors: null, pageHeader: null, enquiryFloatPromo: null });
  const promo =
    doc.enquiryFloatPromo && typeof doc.enquiryFloatPromo === "object"
      ? { ...DEFAULT_SITE_SETTINGS.enquiryFloatPromo, ...(doc.enquiryFloatPromo as object) }
      : DEFAULT_SITE_SETTINGS.enquiryFloatPromo;
  const pageHeader =
    doc.pageHeader && typeof doc.pageHeader === "object"
      ? { ...DEFAULT_SITE_SETTINGS.pageHeader, ...(doc.pageHeader as object) }
      : DEFAULT_SITE_SETTINGS.pageHeader;
  const themeColors =
    doc.themeColors && typeof doc.themeColors === "object"
      ? { ...DEFAULT_SITE_SETTINGS.themeColors, ...(doc.themeColors as object) }
      : DEFAULT_SITE_SETTINGS.themeColors;
  return NextResponse.json({ nav: doc.nav, footer: doc.footer, themeColors, pageHeader, enquiryFloatPromo: promo });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json();
  if (!body?.nav || !body?.footer) {
    return NextResponse.json({ error: "nav and footer required" }, { status: 400 });
  }
  const enquiryFloatPromo =
    body.enquiryFloatPromo && typeof body.enquiryFloatPromo === "object"
      ? { ...DEFAULT_SITE_SETTINGS.enquiryFloatPromo, ...body.enquiryFloatPromo }
      : DEFAULT_SITE_SETTINGS.enquiryFloatPromo;
  const pageHeader =
    body.pageHeader && typeof body.pageHeader === "object"
      ? { ...DEFAULT_SITE_SETTINGS.pageHeader, ...body.pageHeader }
      : DEFAULT_SITE_SETTINGS.pageHeader;
  const themeColors =
    body.themeColors && typeof body.themeColors === "object"
      ? { ...DEFAULT_SITE_SETTINGS.themeColors, ...body.themeColors }
      : DEFAULT_SITE_SETTINGS.themeColors;
  await connectMongo();
  await SiteSettingsModel.findOneAndUpdate(
    { key: "default" },
    { $set: { key: "default", nav: body.nav, footer: body.footer, themeColors, pageHeader, enquiryFloatPromo } },
    { upsert: true }
  );
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
