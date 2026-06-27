import { NextResponse, type NextRequest } from "next/server";
import { caseStudies } from "@/content/case-studies";

const protectedSlugs = new Set(
  caseStudies.filter((study) => study.protected).map((study) => study.slug)
);

export function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/case-studies\/([^/]+)$/);
  
  if (!match) {
    return NextResponse.next();
  }

  const slug = decodeURIComponent(match[1]);
  const response = NextResponse.next();

  if (protectedSlugs.has(slug)) {
    response.headers.set("Cache-Control", "private, no-store");
  }

  return response;
}

export const config = {
  matcher: ["/case-studies/:slug*"],  // Updated matcher for safety
};