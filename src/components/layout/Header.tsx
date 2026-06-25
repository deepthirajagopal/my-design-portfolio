"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-slate-900/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-xl font-semibold text-white transition-colors hover:text-indigo-400"
          aria-label="Deepthi Rajagopal — Home"
        >
          D.
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/case-studies" && pathname.startsWith("/case-studies");

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton
            href="/#contact"
            size="sm"
            className="hidden h-8 bg-indigo-600 px-4 text-[13px] font-semibold hover:bg-indigo-500 sm:inline-flex"
          >
            Get in touch
          </LinkButton>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-white md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-slate-900">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-white">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <LinkButton
                      href="/#contact"
                      className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500"
                    />
                  }
                >
                  Get in touch
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
