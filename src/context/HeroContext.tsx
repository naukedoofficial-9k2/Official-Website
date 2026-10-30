"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface HeroContextType {
  isHeroLoud: boolean;
  setHeroLoud: (isLoud: boolean) => void;
}

const HeroContext = createContext<HeroContextType>({
  isHeroLoud: true,
  setHeroLoud: () => {},
});

export function useHero() {
  return useContext(HeroContext);
}

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [isHeroLoud, setHeroLoud] = useState(true);
  const value = useMemo(() => ({ isHeroLoud, setHeroLoud }), [isHeroLoud]);

  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
}
