"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export default function RevealText({
  text,
  className = "",
  as: Component = "h2",
  delay = 0,
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            damping: 18,
            stiffness: 140,
          },
    },
    hidden: {
      opacity: 0,
      y: 28,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="js-reveal inline-block"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-2 -mb-2">
            <motion.span variants={child} className="js-reveal inline-block pb-0.5">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
