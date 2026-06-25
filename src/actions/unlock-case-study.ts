"use server";

import { cookies } from "next/headers";
import { getCaseStudy } from "@/content/case-studies";
import {
  createUnlockToken,
  getUnlockCookieName,
  getUnlockCookieOptions,
  isValidCaseStudyPassword,
} from "@/lib/case-study-auth";

export type UnlockCaseStudyResult =
  | { ok: true }
  | { ok: false; error: string };

export async function unlockCaseStudy(
  slug: string,
  password: string
): Promise<UnlockCaseStudyResult> {
  const study = getCaseStudy(slug);

  if (!study) {
    return { ok: false, error: "Case study not found." };
  }

  if (!study.protected) {
    return { ok: true };
  }

  if (!password.trim()) {
    return { ok: false, error: "Please enter a password." };
  }

  if (!isValidCaseStudyPassword(slug, password.trim())) {
    return { ok: false, error: "Incorrect password. Try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    getUnlockCookieName(slug),
    createUnlockToken(slug),
    getUnlockCookieOptions(slug)
  );

  return { ok: true };
}
