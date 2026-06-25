"use client";

import { useCallback, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Eye, EyeOff, Lock, X } from "lucide-react";
import { unlockCaseStudy } from "@/actions/unlock-case-study";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type GateState = "default" | "loading" | "error" | "success";

type PasswordGateProps = {
  slug: string;
  title: string;
  subtitle?: string;
};

const CONFETTI_COLORS = [
  "#4F46E5",
  "#14B8A6",
  "#6366F1",
  "#0D9488",
  "#818CF8",
  "#2DD4BF",
];

function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CONFETTI_COLORS.map((color, index) => (
        <motion.span
          key={color}
          className="absolute left-1/2 top-1/3 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ opacity: 1, scale: 0, x: "-50%", y: 0 }}
          animate={{
            opacity: 0,
            scale: 1,
            x: `${-50 + (index - 2.5) * 18}%`,
            y: -40 - Math.random() * 30,
          }}
          transition={{ duration: 0.65, delay: index * 0.04, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function PasswordGate({ slug, title, subtitle }: PasswordGateProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<GateState>("default");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault();
      setMessage("");
      setState("loading");

      const result = await unlockCaseStudy(slug, password);

      if (!result.ok) {
        setState("error");
        setMessage(result.error);
        return;
      }

      setState("success");
      setMessage("Access granted — welcome in.");
      setTimeout(() => router.refresh(), 900);
    },
    [password, router, slug]
  );

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && state !== "loading" && state !== "success") {
      void handleSubmit();
    }
  }

  const Icon =
    state === "error" ? AlertTriangle : state === "success" ? Check : Lock;

  const iconWrapClass = {
    default: "bg-indigo-600/15 border-indigo-600/30 text-indigo-400",
    loading: "bg-indigo-600/15 border-indigo-600/30 text-indigo-400",
    error: "bg-red-600/12 border-red-600/30 text-red-500",
    success: "bg-teal-600/15 border-teal-600/30 text-teal-500",
  }[state];

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-4 py-12">
      {/* Blurred backdrop preview */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
        aria-hidden
      >
        <div className="mx-auto max-w-4xl px-6 pt-16 blur-md">
          <div className="h-4 w-32 rounded bg-slate-700" />
          <div className="mt-6 h-10 w-2/3 rounded bg-slate-700" />
          <div className="mt-4 h-4 w-full rounded bg-slate-800" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-800" />
          <div className="mt-10 aspect-[16/10] rounded-xl bg-slate-800" />
        </div>
      </div>

      {/* Modal backdrop */}
      <motion.div
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        aria-hidden
      />

      {/* Modal */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-gate-title"
        aria-describedby="password-gate-description"
        className="relative z-10 w-full max-w-[380px]"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 px-9 py-10 text-center shadow-[0_32px_64px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
          {state === "success" && <ConfettiBurst />}

          <button
            type="button"
            onClick={() => router.push("/case-studies")}
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close and return to case studies"
          >
            <X className="size-3.5" />
          </button>

          <motion.div
            className={cn(
              "relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border",
              iconWrapClass
            )}
            aria-hidden
            animate={state === "error" ? { x: [0, -4, 4, -4, 4, 0] } : {}}
            transition={{ duration: 0.35 }}
          >
            <Icon className="size-6" />
          </motion.div>

          <h1
            id="password-gate-title"
            className="font-display text-[26px] font-semibold text-white"
          >
            {state === "success" ? "Access Granted" : "NDA Protected"}
          </h1>
          <p
            id="password-gate-description"
            className="mt-1.5 text-[13px] leading-relaxed text-slate-400"
          >
            {state === "success" ? (
              "You're in. Loading the full case study…"
            ) : (
              <>
                <span className="font-medium text-slate-300">{title}</span>
                {subtitle ? ` — ${subtitle}` : ""} is under NDA. Enter the access
                password to view the full project details.
              </>
            )}
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            <AnimatePresence mode="wait">
              {state !== "success" && (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative mb-3">
                    <label htmlFor="case-study-password" className="sr-only">
                      Password for {title}
                    </label>
                    <Input
                      id="case-study-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      autoFocus
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        if (state === "error") setState("default");
                      }}
                      onKeyDown={handleKeyDown}
                      disabled={state === "loading"}
                      className={cn(
                        "h-12 border-slate-700 bg-slate-800 pr-11 font-mono-label tracking-widest text-white placeholder:text-slate-500",
                        state === "error" &&
                          "animate-shake border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.15)]",
                        state === "loading" && "opacity-70"
                      )}
                      placeholder="Enter password"
                      aria-invalid={state === "error"}
                      aria-describedby={message ? "password-message" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {message && (
                <motion.p
                  id="password-message"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "mb-4 text-left text-xs",
                    state === "error" ? "text-red-500" : "text-teal-500"
                  )}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            {state !== "success" && (
              <Button
                type="submit"
                disabled={state === "loading"}
                className={cn(
                  "h-11 w-full text-sm font-semibold transition-all duration-300",
                  state === "loading"
                    ? "cursor-not-allowed bg-slate-700 text-slate-400"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                )}
              >
                {state === "loading" ? "Verifying…" : "Unlock Case Study"}
              </Button>
            )}

            {state === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Button
                  type="button"
                  className="h-11 w-full bg-teal-600 text-sm font-semibold hover:bg-teal-500"
                  onClick={() => router.refresh()}
                >
                  View Case Study →
                </Button>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
