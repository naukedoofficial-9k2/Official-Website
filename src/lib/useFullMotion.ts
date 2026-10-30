"use client";

import { useSyncExternalStore } from "react";

const FULL_MOTION_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

interface DeviceHints {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

function isLowPowerDevice() {
  const nav = navigator as Navigator & DeviceHints;

  return (
    nav.connection?.saveData === true ||
    (nav.deviceMemory ?? 8) <= 2 ||
    (nav.hardwareConcurrency ?? 8) <= 2
  );
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(FULL_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(FULL_MOTION_QUERY).matches && !isLowPowerDevice();
}

// True on mouse-driven large screens. Touch and low-power devices get lighter effects.
export function useFullMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
