"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const statement = "Most brands whisper. We turn them up until people stop scrolling.";
const accentFrom = statement.split(" ").length - 2;

interface StatementWordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function StatementWord({ word, index, total, progress }: StatementWordProps) {
  // Scroll-linked keyframes must span 0 to 1, or words crash the page or fade back out
  const start = 0.001 + (index / total) * 0.8;
  const opacity = useTransform(progress, [0, start, start + 0.15, 1], [0.12, 0.12, 1, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`js-reveal inline-block mr-[0.24em] ${index >= accentFrom ? "text-brand-red" : ""}`}
    >
      {word}
    </motion.span>
  );
}

export default function ScrollStatement() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const words = statement.split(" ");

  if (shouldReduceMotion) {
    return (
      <section className="bg-brand-cream px-4 min-[361px]:px-5 sm:px-6 lg:px-8 py-20 sm:py-32">
        <p className="statement-title font-black text-brand-ink max-w-[100rem] mx-auto">{statement}</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-brand-cream h-[170vh] lg:h-[220vh]">
      <div className="sticky top-0 h-svh flex items-center px-4 min-[361px]:px-5 sm:px-6 lg:px-8">
        <p aria-label={statement} className="statement-title font-black text-brand-ink max-w-[100rem] mx-auto w-full">
          {words.map((word, idx) => (
            <StatementWord key={idx} word={word} index={idx} total={words.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}
