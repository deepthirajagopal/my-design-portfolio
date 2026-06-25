import { cookies } from "next/headers";
import {
  getUnlockCookieName,
  isProtectedSlug,
  isValidUnlockToken,
} from "@/lib/case-study-auth";

export async function isCaseStudyUnlocked(slug: string): Promise<boolean> {
  if (!isProtectedSlug(slug)) {
    return true;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(getUnlockCookieName(slug))?.value;

  return isValidUnlockToken(slug, token);
}
