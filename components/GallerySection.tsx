"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SPECIMENS,
  type Specimen,
  type SpecimenCategory,
  getWhatsAppOrderUrl,
} from "@/lib/specimens";

interface GallerySectionProps {
  activeSpecimenId?: "01" | "02" | "03";
  onSelectSpecimen: (specimen: Specimen) => void;
  onActivate3DSpecimen: (specimen: Specimen) => void;
}

const CATEGORIES: SpecimenCategory[] = [
  "All",
  "Exotic Guppies",
  "Platies",
  "Crayfish & Shrimp",
  "Aquatic Care",
];

export default function GallerySection({
  activeSpecimenId = "01",
  onSelectSpecimen,
  onActivate3DSpecimen,
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<SpecimenCategory>("All");

  const filteredSpecimens =
    selectedCategory === "All"
      ? SPECIMENS
      : SPECIMENS.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#0b0f13]/80 px-6 py-24 backdrop-blur-[2px] sm:px-10 sm:py-32 md:px-14"
    >
      {/* Subtle deep-water ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-amber-500/[0.04] blur-[140px]"
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
              className="absolute top-1 left-0 h-10 w-[2px] bg-gradient-to-b from-amber-400 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 h-[2px] w-5 bg-amber-400"
            />
            <p className="font-display text-[11px] font-bold tracking-[0.34em] text-amber-400 uppercase">
              Nooluvally Breeding Program • Live Stock
            </p>
            <h2
              id="gallery-heading"
              className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#f8fafc] uppercase sm:text-5xl"
            >
              Curated Specimens
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#94a3b8]">
            Click any specimen below to morph the living Three.js 3D swimmer into its color palette, inspect water parameters, or order directly via WhatsApp with all-India live fish delivery assurance.
          </p>
        </motion.div>

        {/* Category filter pills */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-5">
          <span className="mr-2 text-[10px] font-bold tracking-[0.24em] text-[#94a3b8] uppercase">
            Filter Collection:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                data-cursor="interactive"
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase transition-all ${
                  isActive
                    ? "border border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_14px_rgba(245,158,11,0.25)]"
                    : "border border-white/10 bg-[#151c24]/60 text-[#94a3b8] hover:border-amber-400/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Specimen Grid / Aquatic Care Card */}
        {selectedCategory === "Aquatic Care" ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-emerald-400/30 bg-[#151c24]/90 p-8 shadow-2xl backdrop-blur-md">
              <span className="inline-block border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.22em] text-emerald-300 uppercase">
                Prophylactic Treatment
              </span>
              <h3 className="font-display mt-3 text-2xl font-bold text-white">
                Potassium Permanganate (KMnO₄) Dip
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
                Every batch dispatched from Midhula Farm Hut undergoes a mild, monitored KMnO₄ conditioning bath to eliminate external parasites, flukes, and protozoan vectors before packing in oxygenated bags.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-slate-400">Standard Quarantine Protocol</span>
                <a
                  href={getWhatsAppOrderUrl("Aquatic Care Consultation", "KMnO4")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="interactive"
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-emerald-400 hover:text-emerald-300"
                >
                  <span>Ask Farm Protocol</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="border border-amber-400/30 bg-[#151c24]/90 p-8 shadow-2xl backdrop-blur-md">
              <span className="inline-block border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.22em] text-amber-300 uppercase">
                Natural Botanicals
              </span>
              <h3 className="font-display mt-3 text-2xl font-bold text-white">
                Aged Indian Almond (Catappa) Leaves
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
                Hand-harvested dried Catappa leaves infused into live transit water. Natural humic acids and tannins harden the slime coat, maintain mild anti-bacterial acidity (pH 6.8), and ensure zero transit stress.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-slate-400">Available with Live Order</span>
                <a
                  href={getWhatsAppOrderUrl("Catappa Leaf Pack", "Botanical")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="interactive"
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-400 hover:text-amber-300"
                >
                  <span>Add To Order</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {filteredSpecimens.map((specimen, index) => {
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
                      ? "border-amber-400/80 shadow-[0_0_28px_rgba(245,158,11,0.22)]"
                      : "border-white/10 hover:border-amber-400/40"
                  } bg-[#151c24]/90 backdrop-blur-md`}
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
                    className="cursor-pointer relative aspect-[4/3] w-full overflow-hidden bg-[#0e141b] text-left focus:outline-none"
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
                          ? "relative z-10 h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_16px_28px_rgba(0,0,0,0.8)]"
                          : "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      }
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151c24] via-transparent to-transparent opacity-80" />

                    {/* Hover prompt to open dossier */}
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-[1px]">
                      <span className="border border-amber-400/80 bg-[#0b0f13]/90 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-amber-300 uppercase shadow-xl">
                        Inspect Dossier & 3D ↗
                      </span>
                    </div>

                    {/* Floating card index + status pill */}
                    <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between">
                      <span className="font-display text-xs font-bold tracking-[0.24em] text-white/90">
                        SPECIMEN {specimen.id}
                      </span>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm transition-colors ${
                          isCurrent3D
                            ? "border border-amber-400 bg-amber-400/25 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                            : "border border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                        }`}
                      >
                        {isCurrent3D ? "✦ Swimming in 3D" : specimen.availability}
                      </span>
                    </div>
                  </button>

                  {/* Card typography & specs */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold tracking-[0.28em] text-amber-400 uppercase">
                          {specimen.lineage}
                        </p>
                        <span className="text-[10px] font-mono text-slate-400">
                          {specimen.category}
                        </span>
                      </div>
                      <button
                        type="button"
                        data-cursor="interactive"
                        onClick={() => {
                          onSelectSpecimen(specimen);
                          onActivate3DSpecimen(specimen);
                        }}
                        className="cursor-pointer text-left font-display mt-2 text-xl font-bold tracking-tight text-white transition-colors hover:text-amber-300"
                      >
                        {specimen.name}
                      </button>
                      <p className="mt-1 text-xs text-[#94a3b8]">
                        {specimen.subtitle}
                      </p>
                      <p className="mt-3.5 text-sm leading-relaxed text-slate-300">
                        {specimen.summary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <div className="mb-5 grid grid-cols-2 gap-3 text-xs">
                        {specimen.habitatSpecs.slice(0, 2).map((spec) => (
                          <div key={spec.label}>
                            <span className="block text-[10px] tracking-[0.2em] text-[#94a3b8] uppercase">
                              {spec.label}
                            </span>
                            <span className="mt-0.5 block font-semibold text-slate-200">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card actions: Dossier, WhatsApp Order, and Swim in 3D */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                        <button
                          type="button"
                          data-cursor="interactive"
                          onClick={() => onSelectSpecimen(specimen)}
                          className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] text-amber-300 uppercase transition-colors hover:text-white"
                        >
                          <span>Dossier</span>
                          <span aria-hidden="true">→</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            data-cursor="interactive"
                            onClick={() => onActivate3DSpecimen(specimen)}
                            className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-all ${
                              isCurrent3D
                                ? "border border-amber-400/80 bg-amber-400/20 text-amber-200"
                                : "border border-white/20 text-slate-300 hover:border-amber-400/60 hover:text-white"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isCurrent3D ? "bg-amber-400 animate-pulse" : "bg-slate-500"
                              }`}
                            />
                            <span>{isCurrent3D ? "Swimming" : "Swim in 3D"}</span>
                          </button>

                          <a
                            href={getWhatsAppOrderUrl(specimen.name, specimen.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="interactive"
                            className="cursor-pointer inline-flex items-center gap-1.5 border border-emerald-400/60 bg-emerald-500/15 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-emerald-300 uppercase transition-colors hover:bg-emerald-500/25 hover:text-white"
                          >
                            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true">
                              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.09 7.41 8.86 7.66C8.63 7.91 8 8.5 8 9.71C8 10.92 8.89 12.09 9.01 12.25C9.13 12.41 10.74 14.9 13.2 15.96C13.78 16.21 14.24 16.37 14.6 16.48C15.19 16.67 15.72 16.64 16.14 16.58C16.61 16.51 17.58 15.99 17.78 15.42C17.98 14.86 17.98 14.37 17.92 14.28C17.86 14.18 17.71 14.12 17.48 14.01C17.26 13.9 16.15 13.35 15.94 13.27C15.73 13.2 15.58 13.16 15.43 13.39C15.28 13.62 14.85 14.12 14.72 14.28C14.59 14.43 14.46 14.45 14.24 14.34C14.01 14.23 13.29 13.99 12.43 13.22C11.76 12.63 11.31 11.89 11.89 11.66C11.05 11.43 11.17 11.31 11.28 11.2C11.39 11.09 11.52 10.92 11.63 10.79C11.75 10.65 11.79 10.55 11.86 10.4C11.94 10.25 11.9 10.12 11.84 10.01C11.78 9.9 11.34 8.81 11.15 8.37C10.97 7.93 10.79 8 10.66 8C10.53 8 10.38 7.98 10.23 7.98C10.08 7.98 9.85 8.04 9.66 8.24" />
                            </svg>
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
