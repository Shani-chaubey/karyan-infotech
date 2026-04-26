import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "karyan_admin";

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) return null;
  return new TextEncoder().encode(s);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const key = secret();
  if (!key) {
    return NextResponse.redirect(new URL("/admin/login?err=config", request.url));
  }

  const token = request.cookies.get(COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, key);
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete(COOKIE);
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
