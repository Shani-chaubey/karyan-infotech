import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongo } from "@/lib/mongodb";
import { UserModel } from "@/models/User";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectMongo();
  const users = await UserModel.find().select("email role name createdAt").lean();
  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json();
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = body.role === "editor" ? "editor" : "admin";
  if (!email || password.length < 8) {
    return NextResponse.json(
      { error: "Valid email and password (min 8 chars) required" },
      { status: 400 }
    );
  }
  await connectMongo();
  const exists = await UserModel.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await UserModel.create({ email, passwordHash, role });
  return NextResponse.json({ ok: true });
}
