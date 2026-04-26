import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "karyan_admin";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET must be set to a string of at least 16 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(payload: { sub: string; email: string }) {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getSecretKey());
  return payload as { sub?: string; email?: string };
}

export { COOKIE_NAME };
