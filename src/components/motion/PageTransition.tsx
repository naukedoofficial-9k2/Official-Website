"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const SWEEP = { duration: 0.58, ease: [0.76, 0, 0.24, 1] as const };

export default function PageTransition() {
  const pathname = usePathname();
  const [sweepKey, setSweepKey] = useState<string | null>(null);
  const isFirstMount = useRef(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setSweepKey(pathname);
  }, [pathname]);

  if (shouldReduceMotion || !sweepKey) return null;

  return (
    <div key={sweepKey} className="fixed inset-0 z-[99999] overflow-hidden pointer-events-none">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={SWEEP}
        className="absolute inset-0 bg-brand-ink"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{ ...SWEEP, delay: 0.07 }}
        className="absolute inset-0 bg-brand-red flex items-center justify-center"
      >
        <div className="relative h-16 w-48 sm:h-20 sm:w-56">
          <Image src="/brand/logo-white.svg" alt="" fill priority className="object-contain" />
        </div>
      </motion.div>
    </div>
  );
}
