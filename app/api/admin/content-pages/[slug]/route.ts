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

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { slug } = await ctx.params;
  await connectMongo();
  const normalized = normalizeContentPageSlug(slug);
  const doc = await ContentPageModel.findOne({ slug: normalized }).lean();
  if (!doc) {
    return NextResponse.json({ slug: normalized, page: null });
  }
  return NextResponse.json({
    slug: normalized,
    page: {
      slug: doc.slug,
      title: doc.title,
      body: doc.body ?? "",
      metaTitle: doc.metaTitle,
      metaDescription: doc.metaDescription,
      seo: doc.seo ?? undefined,
    } satisfies ContentPagePayload,
  });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { slug: routeSlug } = await ctx.params;
  const normalizedCurrent = normalizeContentPageSlug(routeSlug);
  const body = (await req.json()) as Partial<ContentPagePayload> & {
    nextSlug?: string;
  };

  const renameTo = body.nextSlug
    ? normalizeContentPageSlug(body.nextSlug)
    : normalizedCurrent;
  const title = String(body.title ?? "").trim();

  if (!renameTo) {
    return NextResponse.json({ error: "URL slug cannot be empty." }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: "Page name is required." }, { status: 400 });
  }
  if (RESERVED_ROUTE_SLUGS.has(renameTo)) {
    return NextResponse.json(
      { error: `The slug "${renameTo}" is reserved for a system page.` },
      { status: 409 }
    );
  }

  await connectMongo();

  if (renameTo !== normalizedCurrent) {
    const taken = await ContentPageModel.findOne({ slug: renameTo }).lean();
    if (taken) {
      return NextResponse.json({ error: "That slug is already used." }, { status: 409 });
    }
    const projectTaken = await ProjectPageModel.findOne({ slug: renameTo }).lean();
    if (projectTaken) {
      return NextResponse.json(
        { error: "That slug is already used by a project page." },
        { status: 409 }
      );
    }
  }

  const metaTitle = String(body.metaTitle ?? title).trim() || title;
  const metaDescription = String(body.metaDescription ?? "").trim();
  const pageBody = String(body.body ?? "");

  if (renameTo !== normalizedCurrent) {
    await ContentPageModel.findOneAndUpdate(
      { slug: renameTo },
      {
        $set: {
          slug: renameTo,
          title,
          body: pageBody,
          metaTitle,
          metaDescription,
          seo: body.seo ?? undefined,
        },
      },
      { upsert: true }
    );
    await ContentPageModel.deleteOne({ slug: normalizedCurrent });
    revalidatePath(`/${normalizedCurrent}`);
    revalidatePath(`/${renameTo}`);
    return NextResponse.json({ ok: true, slug: renameTo });
  }

  await ContentPageModel.findOneAndUpdate(
    { slug: normalizedCurrent },
    {
      $set: {
        slug: normalizedCurrent,
        title,
        body: pageBody,
        metaTitle,
        metaDescription,
        seo: body.seo ?? undefined,
      },
    },
    { upsert: true }
  );

  revalidatePath(`/${normalizedCurrent}`);
  return NextResponse.json({ ok: true, slug: normalizedCurrent });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { slug } = await ctx.params;
  const normalized = normalizeContentPageSlug(slug);
  await connectMongo();
  await ContentPageModel.deleteOne({ slug: normalized });
  revalidatePath(`/${normalized}`);
  return NextResponse.json({ ok: true });
}
