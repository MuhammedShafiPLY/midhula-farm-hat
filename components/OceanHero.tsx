"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

interface OceanHeroProps {
  onInspectFeatured?: () => void;
}

/**
 * Fullscreen showcase hero for Midhula Farm Hut (Nooluvally, Thrissur, Kerala)
 * featuring architectural editorial typography, dual amber & emerald CTAs,
 * and a real-farm social proof strip floating above the persistent 3D living fish canvas.
 */
export default function OceanHero({ onInspectFeatured }: OceanHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Midhula Farm Hut Exotic Aquatics Hero"
      className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Main Split Hero Content */}
      <div className="relative z-20 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-8 px-6 pt-28 pb-6 sm:px-12 sm:pt-32 lg:grid-cols-12 lg:gap-4 lg:px-16">
        {/* Left Column: Editorial Typography with architectural corner accent */}
        <div className="relative flex flex-col items-start lg:col-span-6">
          {/* Thin editorial L-bracket framing headline */}
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE_EDITORIAL }}
            className="pointer-events-none absolute -top-4 -left-4 hidden h-32 w-16 border-t-2 border-l-2 border-amber-400/40 sm:block lg:-left-6"
          />

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE_EDITORIAL }}
            className="flex flex-wrap items-center gap-2.5 sm:pl-4"
          >
            <span className="border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.28em] text-amber-300 uppercase">
              NOOLUVALLY, THRISSUR • KERALA
            </span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-emerald-400 sm:inline-block animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.24em] text-emerald-400 uppercase">
              Live Stock In Stock
            </span>
          </motion.div>

          <div className="mt-3 overflow-hidden sm:mt-5">
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_EDITORIAL }}
              className="font-display text-[clamp(3.8rem,9.5vw,8.5rem)] font-black leading-[0.88] tracking-[-0.035em] text-[#f8fafc] select-none"
            >
              EXOTIC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                AQUATICS
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE_EDITORIAL }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-[#94a3b8] sm:text-base sm:pl-4"
          >
            Welcome to <strong className="font-semibold text-white">Midhula Farm Hut</strong> — an artisanal ornamental fish farm in Nooluvally, Thrissur. Specializing in high-grade exotic guppies, platies, electric blue crayfish, and insulated live fish dispatch with 100% arrival assurance across Kerala & all India.
          </motion.p>

          {/* Dual-CTA Cluster */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: EASE_EDITORIAL }}
            className="mt-8 flex flex-wrap items-center gap-4 sm:pl-4"
          >
            <a
              href="#gallery"
              data-cursor="interactive"
              className="cursor-pointer inline-flex items-center gap-2.5 border border-amber-400 bg-amber-400 px-6 py-3.5 text-xs font-bold tracking-[0.22em] text-[#0b0f13] uppercase shadow-[0_0_24px_rgba(245,158,11,0.35)] transition-all hover:bg-amber-300 hover:shadow-[0_0_32px_rgba(245,158,11,0.55)]"
            >
              <span>Explore Live Stock</span>
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="https://wa.me/918129120437?text=Hi%20Midhula%20Farm%20Hut%2C%20I%20would%20like%20to%20check%20current%20live%20stock."
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
              className="cursor-pointer inline-flex items-center gap-2.5 border border-emerald-400/80 bg-emerald-500/15 px-6 py-3.5 text-xs font-bold tracking-[0.22em] text-emerald-300 uppercase backdrop-blur-sm transition-all hover:border-emerald-300 hover:bg-emerald-500/25 hover:text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-emerald-400"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.09 7.41 8.86 7.66C8.63 7.91 8 8.5 8 9.71C8 10.92 8.89 12.09 9.01 12.25C9.13 12.41 10.74 14.9 13.2 15.96C13.78 16.21 14.24 16.37 14.6 16.48C15.19 16.67 15.72 16.64 16.14 16.58C16.61 16.51 17.58 15.99 17.78 15.42C17.98 14.86 17.98 14.37 17.92 14.28C17.86 14.18 17.71 14.12 17.48 14.01C17.26 13.9 16.15 13.35 15.94 13.27C15.73 13.2 15.58 13.16 15.43 13.39C15.28 13.62 14.85 14.12 14.72 14.28C14.59 14.43 14.46 14.45 14.24 14.34C14.01 14.23 13.29 13.99 12.43 13.22C11.76 12.63 11.31 11.89 11.18 11.66C11.05 11.43 11.17 11.31 11.28 11.2C11.39 11.09 11.52 10.92 11.63 10.79C11.75 10.65 11.79 10.55 11.86 10.4C11.94 10.25 11.9 10.12 11.84 10.01C11.78 9.9 11.34 8.81 11.15 8.37C10.97 7.93 10.79 8 10.66 8C10.53 8 10.38 7.98 10.23 7.98C10.08 7.98 9.85 8.04 9.66 8.24" />
              </svg>
              <span>Order on WhatsApp</span>
            </a>
          </motion.div>
        </div>

        {/* Right column: Spacer reserving open water stage for the living 3D swimmer + quick card */}
        <div className="relative min-h-[28vh] lg:col-span-6 lg:min-h-[46vh] flex items-end justify-end">
          {onInspectFeatured ? (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.6 }}
              className="border border-white/10 bg-[#151c24]/85 p-5 backdrop-blur-md max-w-xs shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] font-bold tracking-[0.24em] text-amber-400 uppercase">
                  Signature Strain
                </span>
                <span className="text-[10px] tracking-widest text-slate-400">01 // 03</span>
              </div>
              <h3 className="font-display mt-2 text-base font-bold text-white">
                Fiery Red Exotic Guppy
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Delta broadtail with high-contrast crimson veil & active schooling personality.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={onInspectFeatured}
                  data-cursor="interactive"
                  className="cursor-pointer text-xs font-semibold tracking-wider text-amber-300 hover:text-white transition-colors"
                >
                  View Dossier →
                </button>
                <span className="text-[10px] font-semibold tracking-widest text-emerald-400 uppercase">
                  In Stock
                </span>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Social Proof Strip at bottom of Hero */}
      <div className="relative z-20 w-full border-t border-white/10 bg-[#151c24]/90 py-4.5 px-6 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs font-semibold tracking-[0.2em] text-[#94a3b8] uppercase">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold">28.8K+</span>
            <span>Instagram Community</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-white font-bold">75K+</span>
            <span>YouTube Subscribers</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-white font-bold">1,500+</span>
            <span>Farm Updates</span>
          </div>

          <div className="flex items-center gap-2.5 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.5l-4-4l1.41-1.41L11 13.67l6.59-6.59L19 8.5l-8 8z" />
            </svg>
            <span>Safe Live Fish Shipping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
