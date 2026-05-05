import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongo } from "@/lib/mongodb";
import { ProjectPageModel } from "@/models/ProjectPage";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { slug } = await ctx.params;
  await connectMongo();
  const doc = await ProjectPageModel.findOne({ slug }).lean();
  return NextResponse.json({ slug, payload: doc?.payload ?? null });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { slug } = await ctx.params;
  const payload = await req.json();
  await connectMongo();
  await ProjectPageModel.findOneAndUpdate(
    { slug },
    { $set: { slug, payload } },
    { upsert: true }
  );
  revalidatePath(`/${slug}`);
  revalidatePath("/projects");
  return NextResponse.json({ ok: true });
}
