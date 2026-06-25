"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/content/case-studies";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  "Agentic UX": "border-indigo-200 bg-indigo-100 text-indigo-700",
  Security: "border-teal-200 bg-teal-100 text-teal-700",
  "Enterprise B2B": "border-white/10 bg-white/[0.07] text-slate-300",
  "Data Viz": "border-indigo-200 bg-indigo-100 text-indigo-700",
  "Threat intelligence": "border-teal-200 bg-teal-100 text-teal-700",
  "Fortune 500": "border-white/10 bg-white/[0.07] text-slate-300",
  NDA: "border-[#fde68a] bg-amber-100 text-amber-600",
  "Ed-tech": "border-teal-200 bg-teal-100 text-teal-700",
};

type CaseStudyContentProps = {
  study: CaseStudy;
};

export function CaseStudyContent({ study }: CaseStudyContentProps) {
  return (
    <motion.article
      className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/case-studies"
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          ← Back to case studies
        </Link>
      </nav>

      <header>
        <p className="font-mono-label mb-3 text-[10px] uppercase tracking-[0.16em] text-teal-500">
          {study.timeline} · Case Study
        </p>

        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Badge
              key={tag}
              className={cn(
                "h-auto rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                tagStyles[tag] ?? "border-white/10 bg-white/[0.07] text-slate-300"
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-2 text-xl text-slate-400">{study.subtitle}</p>

        <dl className="mt-6 flex flex-wrap gap-6 text-sm">
          <div>
            <dt className="font-mono-label text-[10px] uppercase tracking-[0.1em] text-slate-500">
              Role
            </dt>
            <dd className="text-slate-200">{study.role}</dd>
          </div>
          <div>
            <dt className="font-mono-label text-[10px] uppercase tracking-[0.1em] text-slate-500">
              Timeline
            </dt>
            <dd className="text-slate-200">{study.timeline}</dd>
          </div>
        </dl>

        <p className="mt-8 text-lg leading-relaxed text-slate-400">{study.summary}</p>
      </header>

      <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900 ring-1 ring-white/5">
        <Image
          src={study.coverImage}
          alt={`${study.title} cover`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <div className="mt-16 space-y-16">
        {study.sections.map((section, index) => (
          <motion.section
            key={section.title}
            aria-labelledby={`section-${section.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            {index > 0 && <Separator className="mb-16 bg-white/10" />}
            <h2
              id={`section-${section.title}`}
              className="font-display text-2xl font-semibold text-white"
            >
              {section.title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-400">{section.body}</p>

            {section.image && (
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900 ring-1 ring-white/5">
                <Image
                  src={section.image}
                  alt={section.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            )}
          </motion.section>
        ))}
      </div>
    </motion.article>
  );
}
