import { NextResponse } from "next/server";
import { getCaseStudy } from "@/content/case-studies";
import {
  createUnlockToken,
  getUnlockCookieName,
  getUnlockCookieOptions,
  isValidCaseStudyPassword,
} from "@/lib/case-study-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string; slug?: string };

  if (!body.slug || !body.password) {
    return NextResponse.json({ error: "Missing slug or password" }, { status: 400 });
  }

  const study = getCaseStudy(body.slug);

  if (!study) {
    return NextResponse.json({ error: "Case study not found" }, { status: 404 });
  }

  if (!study.protected) {
    return NextResponse.json({ success: true, slug: body.slug });
  }

  if (!isValidCaseStudyPassword(body.slug, body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, slug: body.slug });
  response.cookies.set(
    getUnlockCookieName(body.slug),
    createUnlockToken(body.slug),
    getUnlockCookieOptions(body.slug)
  );

  return response;
}
