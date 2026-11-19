"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import oceanBgImg from "@/public/images/ocean-bg.jpg";

/**
 * Deep ocean atmospheric backdrop pairing the sunlit reef seascape with
 * dark abyssal contrast gradients that persist across the entire site to the end.
 */
export default function OceanBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02060f]"
    >
      {/* Underwater sunlit ocean reef photograph continuing to the end */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={oceanBgImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </motion.div>

      {/* Directional dark abyssal overlay so left-side typography stays razor-crisp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(96deg, rgba(2, 8, 16, 0.88) 0%, rgba(2, 11, 22, 0.6) 46%, rgba(2, 12, 24, 0.28) 100%)",
        }}
      />

      {/* Radial vignette preserving bright sunlit center-right water */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 95% at 62% 45%, transparent 38%, rgba(1, 5, 11, 0.82) 100%)",
        }}
      />

      {/* Subtle bottom ocean-floor deepening gradient */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#01040a]/80 via-[#01040a]/40 to-transparent" />

      {/* Minimalist agency framing accents */}
      <div className="absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent lg:block" />
    </div>
  );
}
