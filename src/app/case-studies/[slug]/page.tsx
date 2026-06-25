import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PasswordGate } from "@/components/case-studies/password-gate";
import { CaseStudyContent } from "@/components/case-studies/case-study-content";
import { getCaseStudy, caseStudies } from "@/content/case-studies";
import { isCaseStudyUnlocked } from "@/lib/case-study-access";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case study not found" };
  }

  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const unlocked = await isCaseStudyUnlocked(slug);

  if (study.protected && !unlocked) {
    return (
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="py-6">
          <Link
            href="/case-studies"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            ← Back to case studies
          </Link>
        </nav>
        <PasswordGate slug={study.slug} title={study.title} subtitle={study.subtitle} />
      </div>
    );
  }

  return <CaseStudyContent study={study} />;
}
