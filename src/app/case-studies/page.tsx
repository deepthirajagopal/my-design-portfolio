import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Cybersecurity and agentic UX case studies — incident response, threat visualization, and AI triage.",
};

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <FadeIn>
        <header className="max-w-2xl">
          <p className="font-mono-label mb-3 text-[10px] uppercase tracking-[0.16em] text-teal-500">
            Portfolio
          </p>
          <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
            Research, information architecture, and high-fidelity product design
            for security operations. Select projects are NDA-protected — click a
            locked card to request access.
          </p>
        </header>
      </FadeIn>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <FadeIn key={study.slug} as="li" delay={index * 0.05}>
            <CaseStudyCard study={study} />
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}
