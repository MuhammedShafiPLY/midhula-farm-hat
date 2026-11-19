"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const DOT_SPRING = { stiffness: 900, damping: 38, mass: 0.14 };
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

/**
 * Minimal dot-only custom cursor for fine-pointer devices.
 * Acts as a luminous underwater point that the 3D Betta fish follows.
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const hasFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    () => false
  );
  const enabled = hasFinePointer && !prefersReducedMotion;

  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);

  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor-enabled");

    const isInteractiveTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "a, button, input, textarea, select, [role='button'], [data-cursor='interactive'], label, [tabindex]"
        )
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
      setInteractive(isInteractiveTarget(event.target));
    };

    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    root.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      root.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      root.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const dotScale = pressed ? 0.72 : interactive ? 1.45 : 1;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
        className="fixed left-0 top-0 will-change-transform"
      >
        <motion.span
          animate={{
            scale: dotScale,
            backgroundColor: interactive ? "#38bdf8" : "#ffffff",
          }}
          transition={{ type: "spring", stiffness: 520, damping: 28 }}
          className="-translate-x-1/2 -translate-y-1/2 block h-2.5 w-2.5 rounded-full shadow-[0_0_12px_rgba(56,189,248,1),0_0_24px_rgba(14,165,233,0.75)] ring-1 ring-white/80"
        />
      </motion.div>
    </div>
  );
}
