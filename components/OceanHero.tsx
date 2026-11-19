"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

interface OceanHeroProps {
  onInspectFeatured?: () => void;
}

/**
 * Fullscreen deep-ocean showcase hero featuring staggered editorial typography,
 * architectural framing, and bottom-right CTA, floating seamlessly above the
 * persistent 3D swimming Betta and oceanic water column.
 */
export default function OceanHero({ onInspectFeatured }: OceanHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Midhula Farm Hut Betta Sanctuary Hero"
      className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Main Split Hero Content */}
      <div className="pointer-events-none relative z-20 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-6 px-6 pt-24 pb-4 sm:px-12 sm:pt-28 lg:grid-cols-12 lg:gap-0 lg:px-16">
        {/* Left Column: Editorial Typography with architectural corner accent */}
        <div className="relative flex flex-col items-start lg:col-span-5">
          {/* Thin editorial L-bracket framing headline */}
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE_EDITORIAL }}
            className="pointer-events-none absolute -top-3 -left-4 hidden h-28 w-14 border-t border-l border-white/25 sm:block lg:-left-6"
          />

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE_EDITORIAL }}
            className="font-display text-[11px] font-semibold tracking-[0.36em] text-sky-200/85 uppercase sm:pl-4 sm:text-xs"
          >
            Beauty of the Ocean
          </motion.p>

          <div className="mt-3 overflow-hidden sm:mt-4">
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_EDITORIAL }}
              className="font-display text-[clamp(4.75rem,14vw,11.5rem)] font-black leading-[0.86] tracking-[-0.04em] text-white select-none"
            >
              FISH
            </motion.h1>
          </div>

          {/* Numeric Indicator: "01" ——— "0:29" */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.42, ease: EASE_EDITORIAL }}
            className="mt-7 flex items-center gap-4 sm:mt-9 sm:gap-5"
          >
            <span className="font-display text-sm font-bold tracking-[0.18em] text-white/95 tabular-nums sm:text-base">
              01
            </span>
            <motion.span
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, delay: 0.55, ease: EASE_EDITORIAL }}
              className="block h-px w-14 origin-left bg-gradient-to-r from-sky-300/85 via-white/40 to-white/10 sm:w-24"
            />
            <span className="font-mono text-xs tracking-[0.22em] text-white/55 tabular-nums sm:text-sm">
              0:29
            </span>
          </motion.div>
        </div>

        {/* Right half / spacer reserving open water stage for the living 3D swimmer */}
        <div className="min-h-[30vh] lg:col-span-7 lg:min-h-[42vh]" />
      </div>

      {/* Bottom Row: Subtle "WONDER" corner tag + Bottom Right Editorial Copy & Explore CTA */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col items-end justify-between gap-6 px-6 pt-2 pb-8 sm:flex-row sm:items-end sm:px-12 sm:pb-10 lg:px-16 lg:pb-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="pointer-events-none hidden items-center gap-3 self-end sm:flex"
        >
          <span className="font-display text-[10px] font-medium tracking-[0.42em] text-white/45 uppercase">
            Wonder
          </span>
          <span className="h-px w-10 bg-white/25" />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: EASE_EDITORIAL }}
          className="w-full max-w-sm lg:mr-4"
        >
          <p className="text-[13px] leading-relaxed text-slate-200/80 sm:text-sm">
            Beauty of the Ocean — A living 3D sanctuary crafted by{" "}
            <span className="text-white">Midhula Farm Hut</span>, where fluid
            iridescence drifts and chases light beneath deep waters.
          </p>

          <div className="mt-5 flex items-center gap-6">
            <a
              href="#gallery"
              data-cursor="interactive"
              className="group inline-flex items-center gap-3 text-xs font-semibold tracking-[0.26em] text-white uppercase transition-colors duration-300 hover:text-sky-300 focus:outline-none"
            >
              <span className="relative pb-1">
                Explore
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-50 bg-sky-300/60 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-sky-300" />
              </span>
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                aria-hidden="true"
                className="text-sky-300 transition-transform duration-300 group-hover:translate-x-1.5"
              >
                <path
                  d="M1 6H18.5M18.5 6L13.5 1M18.5 6L13.5 11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {onInspectFeatured ? (
              <button
                type="button"
                onClick={onInspectFeatured}
                className="pb-1 text-[11px] font-medium tracking-[0.22em] text-sky-200/75 uppercase transition-colors hover:text-white"
              >
                Dossier 01
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
