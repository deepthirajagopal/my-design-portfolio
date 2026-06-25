import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Card className="group overflow-hidden border-white/[0.08] bg-slate-800 py-0 ring-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:ring-white/15">
      <Link href={`/case-studies/${study.slug}`} className="block">
        <div className="relative h-[120px] overflow-hidden">
          <Image
            src={study.coverImage}
            alt=""
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-[1.02]",
              study.protected && "blur-[6px] brightness-[0.6]"
            )}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {study.protected && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-600/40 bg-amber-600/15">
                <Lock className="size-4 text-amber-500" aria-hidden />
              </div>
              <span className="font-mono-label rounded bg-amber-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                NDA · Click to unlock
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <p className="font-mono-label mb-1.5 text-[10px] text-slate-500">
            {study.timeline} · {study.tags[0]?.toUpperCase() ?? "CASE STUDY"}
          </p>

          <h2 className="text-sm font-semibold leading-snug text-white">
            {study.title}
            <span className="font-normal text-slate-400"> — {study.subtitle}</span>
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
            {study.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {study.tags.slice(0, 2).map((tag) => (
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
        </CardContent>
      </Link>
    </Card>
  );
}
