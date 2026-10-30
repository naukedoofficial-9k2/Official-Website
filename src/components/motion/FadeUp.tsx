"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  yOffset = 24,
}: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className={`js-reveal ${className}`}
    >
      {children}
    </motion.div>
  );
}
