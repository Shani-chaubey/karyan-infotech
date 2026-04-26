import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongo } from "@/lib/mongodb";
import { HomeContentModel } from "@/models/HomeContent";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectMongo();
  const doc = await HomeContentModel.findOne({ key: "default" }).lean();
  return NextResponse.json({ data: doc?.data ?? null });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const data = await req.json();
  await connectMongo();
  await HomeContentModel.findOneAndUpdate(
    { key: "default" },
    { $set: { key: "default", data } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true });
}
