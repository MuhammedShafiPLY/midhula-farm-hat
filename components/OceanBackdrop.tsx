"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import oceanBgImg from "@/public/images/ocean-bg.jpg";

/**
 * Deep pond & aquatic atmospheric backdrop pairing sunlit water depth with
 * deep pond charcoal contrast gradients that persist across the entire site.
 */
export default function OceanBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0b0f13]"
    >
      {/* Underwater sunlit aquatic photograph continuing across all sections */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.88, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={oceanBgImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none opacity-80"
        />
      </motion.div>

      {/* Directional deep pond charcoal overlay keeping typography and specimen cards razor-crisp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(96deg, rgba(11, 15, 19, 0.94) 0%, rgba(11, 17, 24, 0.75) 48%, rgba(11, 17, 24, 0.4) 100%)",
        }}
      />

      {/* Radial vignette preserving warm organic water lighting in the center-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 95% at 62% 45%, transparent 35%, rgba(11, 15, 19, 0.88) 100%)",
        }}
      />

      {/* Deep pond bottom grounding gradient */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0b0f13] via-[#0b0f13]/70 to-transparent" />

      {/* Subtle architectural vertical alignment divider */}
      <div className="absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-amber-400/[0.08] to-transparent lg:block" />
    </div>
  );
}
