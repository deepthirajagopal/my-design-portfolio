import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/motion/fade-in";

const highlights = [
  { label: "Focus", value: "Cybersecurity & agentic UX" },
  { label: "Strengths", value: "Research → UI systems" },
  { label: "Experience", value: "8+ years enterprise 0→1" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-white/[0.08]"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <FadeIn>
          <p className="font-mono-label mb-3 text-[10px] uppercase tracking-[0.16em] text-teal-500">
            01 — About
          </p>
          <h2
            id="about-heading"
            className="font-display text-3xl font-semibold text-white sm:text-4xl"
          >
            Designing under fire
          </h2>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-400">
            <p>
              I&apos;m a principal product designer who works across research,
              information architecture, and high-fidelity UI — with a bias toward
              systems that stay legible when the stakes are high.
            </p>
            <p>
              My recent work spans agentic SOC platforms, attack-path
              visualization, AI-assisted triage workflows, and enterprise
              security products where operator trust and time-to-containment are
              the metrics that matter.
            </p>
            <p>
              I collaborate closely with engineering and product partners, and I
              care deeply about accessibility, responsive layouts, and craft that
              earns trust in adversarial environments.
            </p>
          </div>

          <Separator className="my-8 bg-white/10" />

          <dl className="grid gap-6 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt className="font-mono-label text-[10px] uppercase tracking-[0.1em] text-slate-500">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-slate-200">{item.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900 ring-1 ring-white/5">
            <Image
              src="/assets/logo.png"
              alt="Deepthi Rajagopal brand mark"
              fill
              className="object-contain p-12"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
