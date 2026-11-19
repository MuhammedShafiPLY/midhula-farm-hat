"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  onExploreClick?: () => void;
}

const NAV_ITEMS = [
  {
    index: "01",
    label: "Living Hero",
    description: "Interactive 3D Halfmoon Betta sanctuary",
    href: "#top",
  },
  {
    index: "02",
    label: "Collection",
    description: "Curated Sapphire, Scarlet & Emerald lineages",
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
    label: "Sanctuary",
    description: "Natural blackwater husbandry at Midhula Farm Hut",
    href: "#about",
  },
  {
    index: "05",
    label: "Inquiry",
    description: "Reserve specimens or consult our hatchery",
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
        className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between bg-gradient-to-b from-[#02060f]/80 via-[#02060f]/25 to-transparent px-6 py-5 backdrop-blur-[2px] sm:px-10 md:px-14"
      >
        <a
          href="#top"
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <span className="font-display text-xs font-semibold tracking-[0.26em] text-white uppercase transition-colors group-hover:text-sky-200 sm:text-sm">
            Midhula Farm Hut
          </span>
        </a>

        <div className="flex items-center gap-5">
          <nav
            aria-label="Primary quick links"
            className="hidden items-center gap-7 md:flex"
          >
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.index}
                href={item.href}
                className="text-[11px] font-medium tracking-[0.24em] text-slate-300/80 uppercase transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Minimal 3-dot vertical/minimalist menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition-colors hover:border-sky-300/50 hover:bg-white/[0.07]"
          >
            <span className="flex flex-col items-center gap-[4px]">
              <span
                className={`block h-[3px] w-[3px] rounded-full bg-white transition-transform duration-300 ${
                  menuOpen ? "translate-y-[7px] scale-125 bg-sky-300" : ""
                }`}
              />
              <span
                className={`block h-[3px] w-[3px] rounded-full bg-white/80 transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[3px] w-[3px] rounded-full bg-white transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[7px] scale-125 bg-sky-300" : ""
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
            className="fixed inset-0 z-[60] flex justify-end bg-[#01040b]/75 backdrop-blur-md cursor-pointer"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="flex h-full w-full max-w-md flex-col justify-between border-l border-white/10 bg-[#030b17] p-8 sm:p-10 cursor-default"
              aria-label="Site navigation drawer"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="font-display text-xs font-semibold tracking-[0.28em] text-sky-200/80 uppercase">
                    Midhula Farm Hut
                  </span>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-slate-300 transition-colors hover:border-sky-300/60 hover:text-white"
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
                        className="group flex items-start gap-4 border border-transparent px-3 py-4 transition-all hover:border-white/10 hover:bg-white/[0.03]"
                      >
                        <span className="font-display pt-1 text-[11px] font-semibold tracking-[0.25em] text-sky-400/75">
                          {item.index}
                        </span>
                        <div>
                          <span className="font-display block text-lg font-semibold tracking-wide text-white transition-colors group-hover:text-sky-200">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-xs text-slate-400">
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
                    onClick={() => {
                      setMenuOpen(false);
                      onExploreClick();
                    }}
                    className="mb-5 flex w-full items-center justify-between border border-sky-300/35 bg-sky-400/10 px-4 py-3 text-xs font-medium tracking-[0.22em] text-sky-100 uppercase transition-colors hover:border-sky-300 hover:bg-sky-400/20"
                  >
                    <span>Inspect Specimen 01</span>
                    <span aria-hidden="true">→</span>
                  </button>
                ) : null}
                <p className="text-[11px] leading-relaxed tracking-wide text-slate-400">
                  Boutique aquatic sanctuary dedicated to rare showline Halfmoon and
                  Crowntail Betta splendens.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
