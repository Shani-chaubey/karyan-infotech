import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongo } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { COOKIE_NAME, signAdminToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    await connectMongo();
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await signAdminToken({
      sub: String(user._id),
      email: user.email,
    });
    const res = NextResponse.json({ ok: true, email: user.email });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
