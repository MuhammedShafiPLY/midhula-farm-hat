"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FARM_WHATSAPP_NUMBER } from "@/lib/specimens";

interface HeaderProps {
  onExploreClick?: () => void;
}

const NAV_ITEMS = [
  {
    index: "01",
    label: "Living Hero",
    description: "Interactive 3D living fish sanctuary",
    href: "#top",
  },
  {
    index: "02",
    label: "Live Stock",
    description: "Exotic guppies, platies, and crayfish",
    href: "#gallery",
  },
  {
    index: "03",
    label: "Anatomy",
    description: "Hydrodynamic 180° flare & biological blueprint",
    href: "#anatomy",
  },
  {
    index: "04",
    label: "Farm & Shipping",
    description: "Nooluvally pond husbandry & oxygenated transit",
    href: "#about",
  },
  {
    index: "05",
    label: "Community",
    description: "75K+ YouTube subscribers & customer reviews",
    href: "#community",
  },
  {
    index: "06",
    label: "Order / Contact",
    description: "WhatsApp direct inquiry & farm appointments",
    href: "#contact",
  },
];

export default function Header({ onExploreClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between bg-gradient-to-b from-[#0b0f13]/90 via-[#0b0f13]/50 to-transparent px-6 py-5 backdrop-blur-[4px] sm:px-10 md:px-14 border-b border-white/[0.04]"
      >
        <a
          href="#top"
          className="group flex flex-col items-start text-left focus:outline-none"
        >
          <span className="font-display text-xs font-black tracking-[0.24em] text-white uppercase transition-colors group-hover:text-amber-300 sm:text-sm">
            Midhula Farm Hut
          </span>
          <span className="text-[9px] font-bold tracking-[0.22em] text-amber-400 uppercase">
            Nooluvally • Thrissur
          </span>
        </a>

        <div className="flex items-center gap-6">
          <nav
            aria-label="Primary quick links"
            className="hidden items-center gap-7 lg:flex"
          >
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.index}
                href={item.href}
                className="text-[11px] font-semibold tracking-[0.2em] text-[#94a3b8] uppercase transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick WhatsApp pill */}
          <a
            href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=Hi%20Midhula%20Farm%20Hut%2C%20I%20would%20like%20to%20check%20live%20stock.`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="interactive"
            className="hidden sm:inline-flex items-center gap-2 border border-emerald-400/80 bg-emerald-500/15 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-emerald-300 uppercase backdrop-blur-sm transition-all hover:bg-emerald-500/25 hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Order WhatsApp</span>
          </a>

          {/* Minimal 3-dot vertical trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            data-cursor="interactive"
            className="group relative flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.03] transition-colors hover:border-amber-400/60 hover:bg-white/[0.07] cursor-pointer"
          >
            <span className="flex flex-col items-center gap-[4px]">
              <span
                className={`block h-[3px] w-[3px] rounded-full bg-white transition-transform duration-300 ${
                  menuOpen ? "translate-y-[7px] scale-125 bg-amber-400" : ""
                }`}
              />
              <span
                className={`block h-[3px] w-[3px] rounded-full bg-white/80 transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[3px] w-[3px] rounded-full bg-white transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[7px] scale-125 bg-amber-400" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[60] flex justify-end bg-[#0b0f13]/85 backdrop-blur-md cursor-pointer"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="flex h-full w-full max-w-md flex-col justify-between border-l border-white/10 bg-[#151c24] p-8 sm:p-10 cursor-default shadow-2xl"
              aria-label="Site navigation drawer"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <span className="font-display block text-xs font-black tracking-[0.26em] text-white uppercase">
                      Midhula Farm Hut
                    </span>
                    <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                      Nooluvally, Thrissur, Kerala
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    data-cursor="interactive"
                    aria-label="Close menu"
                    className="cursor-pointer flex h-9 w-9 items-center justify-center border border-white/15 text-slate-300 transition-colors hover:border-amber-400 hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                <ul className="mt-8 space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.index}>
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        data-cursor="interactive"
                        className="cursor-pointer group flex items-start gap-4 border border-transparent px-3 py-3.5 transition-all hover:border-white/10 hover:bg-white/[0.03]"
                      >
                        <span className="font-display pt-1 text-[11px] font-bold tracking-[0.25em] text-amber-400">
                          {item.index}
                        </span>
                        <div>
                          <span className="font-display block text-base font-bold tracking-wide text-white transition-colors group-hover:text-amber-300">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-[#94a3b8]">
                            {item.description}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6">
                {onExploreClick ? (
                  <button
                    type="button"
                    data-cursor="interactive"
                    onClick={() => {
                      setMenuOpen(false);
                      onExploreClick();
                    }}
                    className="cursor-pointer mb-5 flex w-full items-center justify-between border border-amber-400 bg-amber-400 px-4 py-3 text-xs font-bold tracking-[0.22em] text-[#0b0f13] uppercase transition-all hover:bg-amber-300"
                  >
                    <span>Inspect Featured Specimen</span>
                    <span aria-hidden="true">→</span>
                  </button>
                ) : null}
                <p className="text-[11px] leading-relaxed text-[#94a3b8]">
                  Artisanal ornamental fish farm in Nooluvally, Thrissur. Double-bagged oxygen packaging with safe courier transit across Kerala and India.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
