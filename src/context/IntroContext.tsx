"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface IntroContextType {
  isIntroComplete: boolean;
  setIntroComplete: () => void;
}

const IntroContext = createContext<IntroContextType>({
  isIntroComplete: true,
  setIntroComplete: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  const setIntroComplete = useCallback(() => {
    setIsIntroComplete(true);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsIntroComplete(true);
      return;
    }

    // Hero load animation starts 200ms after mount (no full-screen intro)
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <IntroContext.Provider value={{ isIntroComplete, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}
