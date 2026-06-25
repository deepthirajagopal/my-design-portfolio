"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-white/[0.08]"
    >
      <div className="pointer-events-none absolute inset-0 gradient-hero" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <motion.p
          className="font-mono-label mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-teal-500"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Senior Principal Designer · Agentic UX
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="font-display text-balance text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[56px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I design the systems
          <br />
          <em>that hold the line.</em>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-slate-400 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          High-stakes cybersecurity and agentic operations UX. I build the mental
          models, interaction patterns, and decision architectures that let
          security teams — and the AI agents assisting them — act with clarity
          under extreme pressure.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <LinkButton
            href="/case-studies"
            className="h-10 bg-indigo-600 px-5 text-[13px] font-semibold hover:bg-indigo-500"
          >
            View Case Studies
          </LinkButton>
          <LinkButton
            href="#about"
            variant="outline"
            className="h-10 border-slate-600 bg-transparent px-5 text-[13px] font-medium text-slate-300 hover:border-slate-400 hover:bg-transparent hover:text-white"
          >
            About Me
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
}
