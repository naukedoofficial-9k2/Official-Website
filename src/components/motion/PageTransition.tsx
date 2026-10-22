"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PageTransition() {
  const pathname = usePathname();
  const [isPresent, setIsPresent] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsPresent(true);
    const timer = setTimeout(() => {
      setIsPresent(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence mode="wait">
      {isPresent && (
        <motion.div
          key={`transition-${pathname}`}
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-brand-red flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-12 w-36"
          >
            <Image
              src="/brand/logo-white.svg"
              alt="Nau K Do"
              fill
              priority
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
