import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  normalizeContentPageSlug,
  RESERVED_ROUTE_SLUGS,
} from "@/lib/cms/contentPages";
import type { ContentPagePayload } from "@/lib/cms/types";
import { connectMongo } from "@/lib/mongodb";
import { ContentPageModel } from "@/models/ContentPage";
import { ProjectPageModel } from "@/models/ProjectPage";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectMongo();
  const rows = await ContentPageModel.find().sort({ title: 1 }).lean();
  return NextResponse.json({
    pages: rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      body: r.body ?? "",
      metaTitle: r.metaTitle,
      metaDescription: r.metaDescription,
      seo: r.seo ?? undefined,
    })),
  });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = (await req.json()) as Partial<ContentPagePayload>;
  const slug = normalizeContentPageSlug(String(body.slug ?? ""));
  const title = String(body.title ?? "").trim();

  if (!slug) {
    return NextResponse.json({ error: "URL slug is required." }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: "Page name is required." }, { status: 400 });
  }
  if (RESERVED_ROUTE_SLUGS.has(slug)) {
    return NextResponse.json(
      { error: `The slug "${slug}" is reserved for a system page.` },
      { status: 409 }
    );
  }

  await connectMongo();
  const takenContent = await ContentPageModel.findOne({ slug }).lean();
  if (takenContent) {
    return NextResponse.json({ error: "That slug is already used by another page." }, { status: 409 });
  }
  const takenProject = await ProjectPageModel.findOne({ slug }).lean();
  if (takenProject) {
    return NextResponse.json(
      { error: "That slug is already used by a project page." },
      { status: 409 }
    );
  }

  const metaTitle = String(body.metaTitle ?? title).trim() || title;
  const metaDescription = String(body.metaDescription ?? "").trim();
  const pageBody = String(body.body ?? "");

  await ContentPageModel.create({
    slug,
    title,
    body: pageBody,
    metaTitle,
    metaDescription,
    seo: body.seo ?? undefined,
  });

  revalidatePath(`/${slug}`);
  return NextResponse.json({ ok: true, slug });
}
