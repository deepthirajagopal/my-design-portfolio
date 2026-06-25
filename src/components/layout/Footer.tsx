import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="mt-auto border-t border-white/[0.08] bg-slate-900"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:px-8">
        <h2 id="footer-heading" className="sr-only">
          Contact
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              Let&apos;s work together
            </p>
            <p className="mt-2 max-w-md text-[15px] text-slate-400">
              Open to principal design roles and selective freelance projects in
              cybersecurity and agentic product design.
            </p>
          </div>

          <LinkButton
            href="mailto:hello@deepthirajagopal.com"
            className="h-10 bg-indigo-600 px-5 hover:bg-indigo-500"
          >
            Get in touch
          </LinkButton>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Deepthi Rajagopal. All rights reserved.</p>
          <Link
            href="/case-studies"
            className="transition-colors hover:text-slate-200"
          >
            View all case studies
          </Link>
        </div>
      </div>
    </footer>
  );
}
