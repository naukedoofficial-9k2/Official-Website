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

    // Safety timeout: forces intro to complete after 2.5s even if an animation errors or stalls
    const safetyTimer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 2500);

    return () => clearTimeout(safetyTimer);
  }, [shouldReduceMotion]);

  return (
    <IntroContext.Provider value={{ isIntroComplete, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}
