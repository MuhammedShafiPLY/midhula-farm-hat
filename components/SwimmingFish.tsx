"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import type { PointerTracker } from "./fish3d/FishCanvas3D";

export type { PointerTracker };

interface WaterRipple {
  id: number;
  x: number;
  y: number;
  kind: "nibble" | "click";
}

interface SwimmingFishProps {
  pointerRef: React.MutableRefObject<PointerTracker>;
  activeSpecimenId?: "01" | "02" | "03";
}

// Dynamically load WebGL 3D scene client-side only so SSR & hero typography paint instantaneously
const FishCanvas3D = dynamic(() => import("./fish3d/FishCanvas3D"), {
  ssr: false,
});

/**
 * Full-stage 3D underwater aquarium layer hosting the WebGL Three.js Betta fish
 * and responsive water ripple rings on nibbles and clicks.
 */
export default function SwimmingFish({
  pointerRef,
  activeSpecimenId = "01",
}: SwimmingFishProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const rippleIdRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const lastHandledClickRef = useRef(0);

  const spawnRipple = useCallback(
    (clientX: number, clientY: number, kind: "nibble" | "click") => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const id = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-4), { id, x, y, kind }]);
      const timer = window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 950);
      timersRef.current.push(timer);
    },
    []
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Poll click signal only on pointerdown listener to mirror water ripple rings cleanly
  useEffect(() => {
    const handleWindowDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("a, button, input, textarea, select, [role='button']")
      ) {
        return;
      }
      const p = pointerRef.current;
      if (p.lastClickAt > lastHandledClickRef.current) {
        lastHandledClickRef.current = p.lastClickAt;
        spawnRipple(event.clientX, event.clientY, "click");
      }
    };
    window.addEventListener("pointerdown", handleWindowDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handleWindowDown);
  }, [pointerRef, spawnRipple]);

  const handleNibble = useCallback(
    (clientX: number, clientY: number) => {
      spawnRipple(clientX, clientY, "nibble");
    },
    [spawnRipple]
  );

  return (
    <div
      ref={stageRef}
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      <FishCanvas3D
        pointerRef={pointerRef}
        activeSpecimenId={activeSpecimenId}
        onNibble={handleNibble}
      />

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden="true"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ opacity: 0.6, scale: 0.25 }}
            animate={{
              opacity: 0,
              scale: ripple.kind === "click" ? 2.4 : 1.65,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-sky-300/55 shadow-[0_0_16px_rgba(56,189,248,0.35)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
