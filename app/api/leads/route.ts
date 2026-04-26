import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { LeadSubmissionModel } from "@/models/LeadSubmission";

const MAX_LEN = { name: 200, email: 320, mobile: 80, project: 120, message: 8000, pagePath: 500 };

function trim(str: unknown, max: number): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = trim(body.name, MAX_LEN.name);
  const email = trim(body.email, MAX_LEN.email);
  const mobile = trim(body.mobile, MAX_LEN.mobile);
  if (!name || !email || !mobile) {
    return NextResponse.json({ error: "Name, email, and mobile are required." }, { status: 400 });
  }

  const rawSource = typeof body.source === "string" ? body.source : "";
  const source =
    rawSource === "contact_page" || rawSource === "contact" ? "contact_page" : "enquiry_modal";

  const project = trim(body.project, MAX_LEN.project);
  const message = trim(body.message, MAX_LEN.message);
  const pagePath = trim(body.pagePath, MAX_LEN.pagePath);

  try {
    await connectMongo();
    await LeadSubmissionModel.create({
      source,
      name,
      email,
      mobile,
      project,
      message,
      pagePath,
    });
  } catch (e) {
    console.error("Lead save failed", e);
    return NextResponse.json({ error: "Could not save. Try again later." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
