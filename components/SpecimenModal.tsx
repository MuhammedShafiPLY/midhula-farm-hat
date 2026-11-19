"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SPECIMENS, type Specimen } from "@/lib/specimens";

interface SpecimenModalProps {
  specimen: Specimen | null;
  open: boolean;
  onClose: () => void;
  onSelectSpecimen?: (specimen: Specimen) => void;
  onInquire?: (specimen: Specimen) => void;
  onActivate3D?: (specimen: Specimen) => void;
  is3DActive?: boolean;
}

export default function SpecimenModal({
  specimen,
  open,
  onClose,
  onSelectSpecimen,
  onInquire,
  onActivate3D,
  is3DActive = false,
}: SpecimenModalProps) {
  // Prevent background scroll and register Escape key listener while modal is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && specimen ? (
        <motion.div
          key="specimen-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#01040b]/85 p-4 backdrop-blur-md sm:p-6 cursor-pointer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="specimen-modal-title"
        >
          <motion.div
            key={specimen.id}
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-sky-200/20 bg-[#040d1c]/95 shadow-2xl shadow-black/90 cursor-default"
          >
            {/* Subtle top accent hairline matching specimen color */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${specimen.accentHex}, transparent)`,
              }}
            />

            {/* Specimen switcher tabs for instant access between 01, 02, and 03 */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#020713]/90 px-5 py-2.5 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-[0.26em] text-slate-400 uppercase">
                  Dossier:
                </span>
                <div className="flex items-center gap-1.5">
                  {SPECIMENS.map((item) => {
                    const isCurrent = item.id === specimen.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-cursor="interactive"
                        onClick={() => {
                          onSelectSpecimen?.(item);
                          onActivate3D?.(item);
                        }}
                        className={`cursor-pointer px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all ${
                          isCurrent
                            ? "border border-sky-300/80 bg-sky-400/20 text-white shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                            : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200"
                        }`}
                      >
                        {item.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              <span className="text-[10px] tracking-[0.22em] text-slate-400 uppercase hidden sm:inline">
                Click outside or [ ✕ ] to close
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Specimen portrait */}
              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-b border-white/10 bg-[#020812] md:col-span-5 md:min-h-[420px] md:border-b-0 md:border-r">
                <div
                  className="pointer-events-none absolute inset-0 opacity-45"
                  style={{
                    background: `radial-gradient(circle at 50% 45%, ${specimen.accentHex}33, transparent 70%)`,
                  }}
                />
                <Image
                  src={specimen.image}
                  alt={`${specimen.name} — ${specimen.subtitle}`}
                  sizes="(max-width: 768px) 92vw, 340px"
                  className={
                    specimen.isCutout
                      ? "relative z-10 h-60 w-auto object-contain p-4 drop-shadow-[0_18px_28px_rgba(2,12,28,0.9)] md:h-72"
                      : "h-full w-full object-cover"
                  }
                />
                <div className="pointer-events-none absolute bottom-4 left-4 z-10 border border-white/15 bg-[#02060f]/75 px-2.5 py-1 text-[10px] tracking-[0.28em] text-sky-200/85 uppercase backdrop-blur-sm">
                  Specimen {specimen.id}
                </div>
              </div>

              {/* Dossier details */}
              <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[10px] font-semibold tracking-[0.34em] text-sky-300/75 uppercase">
                        {specimen.lineage}
                      </p>
                      <h2
                        id="specimen-modal-title"
                        className="font-display mt-2 text-2xl font-bold tracking-tight text-white sm:text-[26px]"
                      >
                        {specimen.name}
                      </h2>
                      <p className="mt-1 text-xs italic tracking-wide text-slate-400">
                        {specimen.scientificName} • {specimen.tailSpread}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      data-cursor="interactive"
                      aria-label="Close specimen dossier"
                      className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-slate-300 transition-colors hover:border-sky-300/60 hover:text-white"
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

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {specimen.summary}
                  </p>

                  {/* Habitat specification grid */}
                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    {specimen.habitatSpecs.map((item) => (
                      <div
                        key={item.label}
                        className="border border-white/10 bg-white/[0.025] px-3.5 py-2.5"
                      >
                        <span className="block text-[10px] tracking-[0.24em] text-slate-400 uppercase">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs font-medium text-sky-100">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 border-l border-sky-400/40 pl-3.5 text-xs leading-relaxed text-slate-400">
                    {specimen.careNotes}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <span className="text-[11px] tracking-[0.2em] text-sky-200/70 uppercase">
                    {specimen.availability}
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      data-cursor="interactive"
                      onClick={() => onActivate3D?.(specimen)}
                      className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium tracking-[0.18em] uppercase transition-all ${
                        is3DActive
                          ? "border border-sky-300/80 bg-sky-400/20 text-sky-200"
                          : "border border-white/20 bg-white/[0.04] text-slate-300 hover:border-sky-300/60 hover:text-white"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          is3DActive ? "bg-sky-300 animate-pulse" : "bg-slate-400"
                        }`}
                      />
                      <span>{is3DActive ? "Active in 3D" : "Swim in 3D"}</span>
                    </button>

                    <a
                      href="#contact"
                      data-cursor="interactive"
                      onClick={() => {
                        onInquire?.(specimen);
                        onClose();
                      }}
                      className="cursor-pointer inline-flex items-center gap-2 border border-sky-300/45 bg-sky-400/10 px-4 py-2 text-xs font-medium tracking-[0.18em] text-sky-100 uppercase transition-colors hover:border-sky-300 hover:bg-sky-400/20"
                    >
                      Inquire
                      <span aria-hidden="true">→</span>
                    </a>
                    <button
                      type="button"
                      data-cursor="interactive"
                      onClick={onClose}
                      className="cursor-pointer px-3 py-2 text-xs tracking-[0.18em] text-slate-400 uppercase transition-colors hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
