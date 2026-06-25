import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedCaseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

export function FeaturedWork() {
  const featured = getFeaturedCaseStudies();

  return (
    <section aria-labelledby="featured-heading" className="border-b border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono-label mb-3 text-[10px] uppercase tracking-[0.16em] text-teal-500">
                02 — Featured Work
              </p>
              <h2
                id="featured-heading"
                className="font-display text-3xl font-semibold text-white sm:text-4xl"
              >
                Selected case studies
              </h2>
              <p className="mt-3 max-w-xl text-[15px] text-slate-400">
                Incident response orchestration, threat visualization, and
                AI-assisted triage — with NDA-protected deep dives behind a
                password gate.
              </p>
            </div>

            <Link
              href="/case-studies"
              className="inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              View all case studies
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((study) => (
            <StaggerItem key={study.slug}>
              <CaseStudyCard study={study} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
