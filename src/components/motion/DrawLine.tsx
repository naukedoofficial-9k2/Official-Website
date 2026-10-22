"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface DrawLineProps {
  className?: string;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DrawLine({ className = "", targetRef }: DrawLineProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const activeRef = targetRef || localRef;

  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: ["start 80%", "end 60%"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={localRef} className={`relative w-full h-1 bg-brand-border/60 overflow-hidden ${className}`}>
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="h-full bg-brand-red w-full"
      />
    </div>
  );
}
