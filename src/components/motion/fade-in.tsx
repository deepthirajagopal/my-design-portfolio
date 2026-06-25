"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeInProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: defaultVariants.hidden,
        visible: {
          ...defaultVariants.visible,
          transition: {
            ...(typeof defaultVariants.visible === "object" &&
            defaultVariants.visible !== null &&
            "transition" in defaultVariants.visible
              ? defaultVariants.visible.transition
              : {}),
            delay,
          },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerChildren({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={defaultVariants}>
      {children}
    </motion.div>
  );
}
