"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SPECIMENS, type Specimen, getWhatsAppOrderUrl } from "@/lib/specimens";

interface SpecimenModalProps {
  specimen: Specimen | null;
  open: boolean;
  onClose: () => void;
  onSelectSpecimen?: (specimen: Specimen) => void;
  onInquire?: (specimen: Specimen) => void;
}

export default function SpecimenModal({
  specimen,
  open,
  onClose,
  onSelectSpecimen,
  onInquire,
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
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b0f13]/85 p-4 backdrop-blur-md sm:p-6 cursor-pointer"
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
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-white/10 bg-[#151c24]/95 shadow-2xl shadow-black/90 cursor-default"
          >
            {/* Subtle top accent hairline matching specimen color */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${specimen.accentHex}, transparent)`,
              }}
            />

            {/* Specimen switcher tabs for instant access between 01, 02, and 03 */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0e141b]/95 px-5 py-2.5 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.24em] text-amber-400 uppercase">
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
                        onClick={() => onSelectSpecimen?.(item)}
                        className={`cursor-pointer px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
                          isCurrent
                            ? "border border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                            : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200"
                        }`}
                      >
                        {item.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              <span className="text-[10px] tracking-[0.22em] text-[#94a3b8] uppercase hidden sm:inline">
                Click outside or [ ✕ ] to close
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Specimen portrait */}
              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-b border-white/10 bg-[#0b0f13] md:col-span-5 md:min-h-[420px] md:border-b-0 md:border-r">
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
                      ? "relative z-10 h-60 w-auto object-contain p-4 drop-shadow-[0_18px_28px_rgba(0,0,0,0.9)] md:h-72"
                      : "h-full w-full object-cover"
                  }
                />
                <div className="pointer-events-none absolute bottom-4 left-4 z-10 border border-white/15 bg-[#0b0f13]/85 px-2.5 py-1 text-[10px] tracking-[0.28em] text-amber-300 uppercase backdrop-blur-sm">
                  Specimen {specimen.id}
                </div>
              </div>

              {/* Dossier details */}
              <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[10px] font-bold tracking-[0.34em] text-amber-400 uppercase">
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
                      className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-slate-300 transition-colors hover:border-amber-400 hover:text-white"
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
                        <span className="block text-[10px] tracking-[0.24em] text-[#94a3b8] uppercase">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-white">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 border-l-2 border-amber-400/60 pl-3.5 text-xs leading-relaxed text-[#94a3b8]">
                    {specimen.careNotes}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    {specimen.availability}
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={getWhatsAppOrderUrl(specimen.name, specimen.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="interactive"
                      className="cursor-pointer inline-flex items-center gap-2 border border-emerald-400 bg-emerald-500/20 px-3.5 py-2 text-xs font-bold tracking-[0.18em] text-emerald-200 uppercase transition-all hover:bg-emerald-500/35 hover:text-white shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.09 7.41 8.86 7.66C8.63 7.91 8 8.5 8 9.71C8 10.92 8.89 12.09 9.01 12.25C9.13 12.41 10.74 14.9 13.2 15.96C13.78 16.21 14.24 16.37 14.6 16.48C15.19 16.67 15.72 16.64 16.14 16.58C16.61 16.51 17.58 15.99 17.78 15.42C17.98 14.86 17.98 14.37 17.92 14.28C17.86 14.18 17.71 14.12 17.48 14.01C17.26 13.9 16.15 13.35 15.94 13.27C15.73 13.2 15.58 13.16 15.43 13.39C15.28 13.62 14.85 14.12 14.72 14.28C14.59 14.43 14.46 14.45 14.24 14.34C14.01 14.23 13.29 13.99 12.43 13.22C11.76 12.63 11.31 11.89 11.18 11.66C11.05 11.43 11.17 11.31 11.28 11.2C11.39 11.09 11.52 10.92 11.63 10.79C11.75 10.65 11.79 10.55 11.86 10.4C11.94 10.25 11.9 10.12 11.84 10.01C11.78 9.9 11.34 8.81 11.15 8.37C10.97 7.93 10.79 8 10.66 8C10.53 8 10.38 7.98 10.23 7.98C10.08 7.98 9.85 8.04 9.66 8.24" />
                      </svg>
                      <span>Order on WhatsApp</span>
                    </a>

                    <a
                      href="#contact"
                      data-cursor="interactive"
                      onClick={() => {
                        onInquire?.(specimen);
                        onClose();
                      }}
                      className="cursor-pointer inline-flex items-center gap-1.5 border border-white/20 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:border-amber-400 hover:text-amber-200"
                    >
                      Inquire
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
