"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StrikethroughTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function StrikethroughText({
  children,
  className = "",
  delay = 0.2,
}: StrikethroughTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={`line-through opacity-60 ${className}`}>{children}</span>;
  }

  return (
    <span className={`relative inline-block opacity-70 ${className}`}>
      <span>{children}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-brand-red rounded-full"
      />
    </span>
  );
}
