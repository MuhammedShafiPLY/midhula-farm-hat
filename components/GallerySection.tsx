"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SPECIMENS, type Specimen } from "@/lib/specimens";

interface GallerySectionProps {
  activeSpecimenId?: "01" | "02" | "03";
  onSelectSpecimen: (specimen: Specimen) => void;
  onActivate3DSpecimen: (specimen: Specimen) => void;
}

export default function GallerySection({
  activeSpecimenId = "01",
  onSelectSpecimen,
  onActivate3DSpecimen,
}: GallerySectionProps) {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#020812]/55 px-6 py-24 backdrop-blur-[2px] sm:px-10 sm:py-32 md:px-14"
    >
      {/* Subtle deep-water ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-sky-500/[0.06] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="relative pl-5 sm:pl-7">
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 h-10 w-[1px] bg-gradient-to-b from-sky-300/70 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 h-[1px] w-4 bg-sky-300/70"
            />
            <p className="font-display text-[11px] font-semibold tracking-[0.38em] text-sky-300/80 uppercase">
              Curated Specimens • 01 — 03
            </p>
            <h2
              id="gallery-heading"
              className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white uppercase sm:text-5xl"
            >
              Living Collection
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Click any specimen below to morph the live 3D swimmer into its color
            palette or inspect its detailed fin geometry and lineage notes.
          </p>
        </motion.div>

        {/* 3-card specimen grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {SPECIMENS.map((specimen, index) => {
            const isCurrent3D = specimen.id === activeSpecimenId;

            return (
              <motion.article
                key={specimen.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative flex flex-col border transition-all duration-300 ${
                  isCurrent3D
                    ? "border-sky-300/75 shadow-[0_0_28px_rgba(56,189,248,0.22)]"
                    : "border-white/10 hover:border-sky-300/40"
                } bg-[#040d1c]/80 backdrop-blur-md`}
              >
                {/* Specimen portrait frame - clicking activates 3D swimmer and opens dossier */}
                <button
                  type="button"
                  data-cursor="interactive"
                  onClick={() => {
                    onSelectSpecimen(specimen);
                    onActivate3DSpecimen(specimen);
                  }}
                  aria-label={`Open dossier for ${specimen.name} and activate 3D swimmer`}
                  className="cursor-pointer relative aspect-[4/3] w-full overflow-hidden bg-[#020710] text-left focus:outline-none"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-75"
                    style={{
                      background: `radial-gradient(circle at 55% 45%, ${specimen.accentHex}2a, transparent 68%)`,
                    }}
                  />
                  <Image
                    src={specimen.image}
                    alt={`${specimen.name} — ${specimen.subtitle}`}
                    sizes="(max-width: 1024px) 92vw, 31vw"
                    className={
                      specimen.isCutout
                        ? "relative z-10 h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                        : "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    }
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040d1c] via-transparent to-transparent opacity-80" />

                  {/* Hover prompt to open dossier */}
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-sky-950/25 backdrop-blur-[1px]">
                    <span className="border border-sky-300/60 bg-[#020712]/90 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-sky-100 uppercase shadow-lg shadow-black/80">
                      Inspect Dossier ↗
                    </span>
                  </div>

                  {/* Floating card index + status pill */}
                  <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between">
                    <span className="font-display text-xs font-semibold tracking-[0.28em] text-white/80">
                      {specimen.id}
                    </span>
                    <span
                      className={`px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase backdrop-blur-sm transition-colors ${
                        isCurrent3D
                          ? "border border-sky-300/80 bg-sky-400/25 font-semibold text-sky-100 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                          : "border border-white/15 bg-[#02060f]/75 text-sky-200/85"
                      }`}
                    >
                      {isCurrent3D ? "✦ Active 3D" : specimen.availability}
                    </span>
                  </div>
                </button>

                {/* Card typography & specs */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.28em] text-sky-300/70 uppercase">
                      {specimen.lineage}
                    </p>
                    <button
                      type="button"
                      data-cursor="interactive"
                      onClick={() => {
                        onSelectSpecimen(specimen);
                        onActivate3DSpecimen(specimen);
                      }}
                      className="cursor-pointer text-left font-display mt-2 text-xl font-bold tracking-tight text-white transition-colors hover:text-sky-200"
                    >
                      {specimen.name}
                    </button>
                    <p className="mt-1 text-xs text-slate-400">
                      {specimen.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300/90">
                      {specimen.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="mb-5 grid grid-cols-2 gap-3 text-xs">
                      {specimen.habitatSpecs.slice(0, 2).map((spec) => (
                        <div key={spec.label}>
                          <span className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                            {spec.label}
                          </span>
                          <span className="mt-0.5 block font-medium text-slate-200">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        data-cursor="interactive"
                        onClick={() => onSelectSpecimen(specimen)}
                        className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-sky-200 uppercase transition-colors hover:text-white"
                      >
                        <span>Inspect Dossier</span>
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </button>

                      <button
                        type="button"
                        data-cursor="interactive"
                        onClick={() => onActivate3DSpecimen(specimen)}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-all ${
                          isCurrent3D
                            ? "border border-sky-300/80 bg-sky-400/20 text-sky-200"
                            : "border border-white/20 text-slate-300 hover:border-sky-300/60 hover:text-white"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCurrent3D ? "bg-sky-300 animate-pulse" : "bg-slate-500"
                          }`}
                        />
                        <span>{isCurrent3D ? "Swimming" : "Swim in 3D"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
