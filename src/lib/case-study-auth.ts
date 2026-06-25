import { createHmac, timingSafeEqual } from "crypto";
import { caseStudies } from "@/content/case-studies";

const COOKIE_PREFIX = "cs-unlock-";
const UNLOCK_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function slugToEnvKey(slug: string): string {
  return `CASE_STUDY_PASSWORD_${slug.toUpperCase().replace(/-/g, "_")}`;
}

export function getUnlockCookieName(slug: string): string {
  return `${COOKIE_PREFIX}${slug}`;
}

export function isProtectedSlug(slug: string): boolean {
  const study = caseStudies.find((s) => s.slug === slug);
  return study?.protected ?? false;
}

export function getCaseStudyPassword(slug: string): string | undefined {
  const slugKey = slugToEnvKey(slug);
  const slugPassword = process.env[slugKey];

  if (slugPassword) {
    return slugPassword;
  }

  return (
    process.env.CASE_STUDY_PASSWORD_DEFAULT ??
    process.env.CASE_STUDY_PASSWORD ??
    undefined
  );
}

function getCookieSecret(): string {
  const secret = process.env.CASE_STUDY_COOKIE_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("CASE_STUDY_COOKIE_SECRET must be set in production");
  }
  return secret ?? "dev-only-case-study-secret";
}

export function createUnlockToken(slug: string): string {
  return createHmac("sha256", getCookieSecret())
    .update(slug)
    .digest("hex");
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function isValidUnlockToken(slug: string, token: string | undefined): boolean {
  if (!token) {
    return false;
  }
  return safeCompare(createUnlockToken(slug), token);
}

export function isValidCaseStudyPassword(slug: string, password: string): boolean {
  const expected = getCaseStudyPassword(slug);
  if (!expected) {
    return false;
  }
  return safeCompare(password, expected);
}

export function getUnlockCookieOptions(slug: string) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: `/case-studies/${slug}`,
    maxAge: UNLOCK_MAX_AGE_SECONDS,
  };
}

export { UNLOCK_MAX_AGE_SECONDS };
