"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import bettaFishImg from "@/public/images/betta-fish.png";

export interface AnatomyHotspot {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  category: "ANATOMY" | "HYDRODYNAMICS" | "GENETICS";
  x: number; // percentage from left
  y: number; // percentage from top
  summary: string;
  metricLabel: string;
  metricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  husbandryNote: string;
  highlightTag: string;
}

const HOTSPOTS: AnatomyHotspot[] = [
  {
    id: "caudal",
    number: "01",
    name: "180° Symmetrical Caudal Veil",
    subtitle: "Gossamer Membrane & 4-Tier Ray Bifurcation",
    category: "HYDRODYNAMICS",
    x: 77,
    y: 48,
    summary:
      "The hallmark of Midhula Farm Hut showline breeding. At full flare, the outer caudal rays form a straight 180-degree capital 'D' silhouette with quad-branched secondary rays preventing fin edge curling.",
    metricLabel: "Flare Spread",
    metricValue: "180° True Flat 'D'",
    secondaryMetricLabel: "Ray Architecture",
    secondaryMetricValue: "Primary + Tertiary Bifurcation",
    husbandryNote:
      "Trained with daily 5-minute mirror flaring sessions in calm Nooluvally pond water steeped with Indian almond leaves.",
    highlightTag: "SHOWLINE BENCHMARK",
  },
  {
    id: "labyrinth",
    number: "02",
    name: "Labyrinth Respiration Organ",
    subtitle: "Auxiliary Atmospheric Oxygen Chamber",
    category: "ANATOMY",
    x: 23,
    y: 46,
    summary:
      "Situated dorsal to the gills, this vascular labyrinth of folded bony plates lets the fish breathe atmospheric air directly from the surface, allowing robust survival even in still, low-oxygen tropical breeding tubs.",
    metricLabel: "Breathing Cycle",
    metricValue: "Every 2–5 Mins In Repose",
    secondaryMetricLabel: "Surface Layer Req.",
    secondaryMetricValue: "Warm & Humid (26°C–28°C)",
    husbandryNote:
      "Covered biotope tanks retain a warm, humid air layer critical for protecting sensitive respiratory membranes from thermal shock.",
    highlightTag: "BIOLOGICAL ADAPTATION",
  },
  {
    id: "scales",
    number: "03",
    name: "Metallic Guanine Scale Matrix",
    subtitle: "Crystalline Multi-Layered Photonic Armour",
    category: "GENETICS",
    x: 39,
    y: 40,
    summary:
      "Reflective guanine crystals embedded deep within the epidermal layers act as biological prisms, refracting natural Kerala sunlight into intense metallic iridescence and deep dragon-scale coverage.",
    metricLabel: "Scale Coverage",
    metricValue: "Full Dragon Saddle Spread",
    secondaryMetricLabel: "Iridescence Type",
    secondaryMetricValue: "Structural Photonic Refraction",
    husbandryNote:
      "Nourished on live Artemia nauplii and astaxanthin-rich spirulina to amplify crystalline density and natural pigment clarity.",
    highlightTag: "STRUCTURAL COLOR",
  },
  {
    id: "dorsal",
    number: "04",
    name: "Dorsal Ray Crest",
    subtitle: "Broad-Base Upright Pitch Stabilizer",
    category: "HYDRODYNAMICS",
    x: 52,
    y: 22,
    summary:
      "An upright sail of 8 to 11 elongated rays that matches the curve of the caudal fin. It counteracts yaw during directional bursts and unfurls into a magnificent forward-curving crest during display postures.",
    metricLabel: "Forward Overlap",
    metricValue: "15% Caudal Ray Interlock",
    secondaryMetricLabel: "Vertical Lift",
    secondaryMetricValue: "75° Elevation Angle",
    husbandryNote:
      "Baffled water flow in Nooluvally outdoor tubs prevents ray flutter and micro-tears, preserving unbroken fin integrity.",
    highlightTag: "DYNAMIC STABILITY",
  },
  {
    id: "ventral",
    number: "05",
    name: "Ventral Sensory Feelers",
    subtitle: "Tactile Pelvic Chemosensory Antennas",
    category: "ANATOMY",
    x: 34,
    y: 76,
    summary:
      "Elongated pelvic fins lined with sensory taste buds and tactile nerve endings. They brush against submerged botanicals, test substrate textures, and detect micro-vibrations from approaching live prey.",
    metricLabel: "Sensitivity",
    metricValue: "Sub-Millimeter Current Radar",
    secondaryMetricLabel: "Fin Structure",
    secondaryMetricValue: "Dual-Thread Elongated Rays",
    husbandryNote:
      "Natural leaf litter and rounded river gravel ensure the sensitive filament tips remain unfrayed and pristine.",
    highlightTag: "NEUROSENSORY RADAR",
  },
  {
    id: "anal",
    number: "06",
    name: "Anal Keel & Lateral Line",
    subtitle: "Continuous Ventral Roll Control & Acoustic Radar",
    category: "HYDRODYNAMICS",
    x: 54,
    y: 74,
    summary:
      "Extending along the lower abdomen, the anal fin forms a continuous hydrofoil keel that counters rotational roll during strikes. Together with the lateral line, it maps acoustic pressure waves in dark tannin water.",
    metricLabel: "Ray Density",
    metricValue: "22–25 Parallel Micro-Rays",
    secondaryMetricLabel: "Hydrodynamic Role",
    secondaryMetricValue: "Anti-Roll Keel Stabilization",
    husbandryNote:
      "Steeped with aged Indian almond leaf tannins to harden the protective mucosal sheath covering each ray tip.",
    highlightTag: "PRESSURE SENSING",
  },
];

interface FishExplanationSectionProps {
  onTriggerFishAction?: () => void;
}

export default function FishExplanationSection({
  onTriggerFishAction,
}: FishExplanationSectionProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<AnatomyHotspot>(
    HOTSPOTS[0]
  );
  const [filterCategory, setFilterCategory] = useState<
    "ALL" | "ANATOMY" | "HYDRODYNAMICS" | "GENETICS"
  >("ALL");

  const filteredHotspots =
    filterCategory === "ALL"
      ? HOTSPOTS
      : HOTSPOTS.filter((item) => item.category === filterCategory);

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#0b0f13]/85 px-6 py-24 backdrop-blur-[2px] sm:px-10 sm:py-32 md:px-14"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/[0.04] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-10 h-[400px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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
              Biomechanics & Lineage Biology
            </p>
            <h2
              id="anatomy-heading"
              className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#f8fafc] uppercase sm:text-5xl"
            >
              The Anatomy Of Living Silk
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#94a3b8]">
            Click any anatomical hotspot or inspect diagnostic metrics below to explore the evolutionary engineering, hydrodynamic fin flare, and Kerala pond conditioning behind our showpiece specimens.
          </p>
        </motion.div>

        {/* Filter mode pills */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <span className="mr-2 text-[10px] font-bold tracking-[0.24em] text-[#94a3b8] uppercase">
            Filter System:
          </span>
          {(
            [
              { id: "ALL", label: "Complete Specimen (06 Nodes)" },
              { id: "HYDRODYNAMICS", label: "Hydrodynamics & Veil" },
              { id: "ANATOMY", label: "Internal & Respiration" },
              { id: "GENETICS", label: "Photonic Scales & Armour" },
            ] as const
          ).map((filter) => {
            const active = filterCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                data-cursor="interactive"
                onClick={() => setFilterCategory(filter.id)}
                className={`cursor-pointer px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition-all ${
                  active
                    ? "border border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    : "border border-white/10 bg-[#151c24]/50 text-[#94a3b8] hover:border-amber-400/40 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Specimen Stage + Anatomy Inspection Board */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left/Center Visual Anatomy Display */}
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-[#151c24]/90 p-4 shadow-2xl lg:col-span-7 sm:p-8 backdrop-blur-md">
            {/* Subtle technical HUD background grid lines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Corner architectural crosshairs updated to Nooluvally, Thrissur, Kerala */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-3 left-3 text-[10px] font-mono text-amber-300/70"
            >
              {"+ 10°31'N 76°12'E • MFH-BIO 01"}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-3 right-3 text-[10px] font-mono text-amber-300/70"
            >
              {"HUD-ANATOMY • THRISSUR v2.4"}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-3 text-[10px] font-mono text-[#94a3b8]"
            >
              {"NOOLUVALLY ORNAMENTAL HATCHERY"}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 text-[10px] font-mono text-emerald-400"
            >
              {"180° SYMMETRY LOCKED"}
            </span>

            {/* Specimen High-Res Image with Glow */}
            <div className="relative flex h-full w-full items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent blur-2xl"
              />
              <Image
                src={bettaFishImg}
                alt="Midhula Farm Hut Anatomical Blueprint"
                priority
                className="relative z-10 max-h-[88%] w-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
              />

              {/* Pulsing Anatomy Hotspots */}
              {HOTSPOTS.map((hotspot) => {
                const isSelected = selectedHotspot.id === hotspot.id;
                const isDimmed =
                  filterCategory !== "ALL" &&
                  hotspot.category !== filterCategory;

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    data-cursor="interactive"
                    onClick={() => setSelectedHotspot(hotspot)}
                    aria-label={`Inspect ${hotspot.name}`}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                    }}
                    className={`group cursor-pointer absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isDimmed ? "opacity-25 pointer-events-none" : "opacity-100"
                    }`}
                  >
                    {/* Pulsing radar wave ring */}
                    <span
                      aria-hidden="true"
                      className={`absolute -inset-2.5 rounded-full transition-opacity ${
                        isSelected
                          ? "bg-amber-400/35 animate-ping"
                          : "bg-white/10 group-hover:bg-amber-400/25"
                      }`}
                    />

                    {/* Central hotspot badge */}
                    <div
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-mono font-bold transition-transform duration-300 ${
                        isSelected
                          ? "scale-125 border-amber-400 bg-amber-400 text-[#0b0f13] shadow-[0_0_16px_rgba(245,158,11,0.9)]"
                          : "border-white/30 bg-[#151c24]/95 text-white group-hover:scale-110 group-hover:border-amber-400/80 group-hover:text-amber-200"
                      }`}
                    >
                      {hotspot.number}
                    </div>

                    {/* Tooltip on hover */}
                    <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap border border-white/15 bg-[#0b0f13]/95 px-2 py-0.5 text-[9px] font-bold tracking-[0.16em] text-amber-300 uppercase opacity-0 transition-opacity group-hover:opacity-100 shadow-md">
                      {hotspot.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Specimen Biopsy & Anatomy Card */}
          <div className="flex flex-col justify-between border border-white/10 bg-[#151c24]/95 p-6 shadow-2xl lg:col-span-5 sm:p-8 backdrop-blur-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHotspot.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Hotspot Header */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-block border border-amber-400/50 bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.24em] text-amber-300 uppercase">
                      {selectedHotspot.highlightTag}
                    </span>
                    <span className="font-mono text-xs tracking-widest text-[#94a3b8]">
                      NODE [{selectedHotspot.number} • 06]
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-white">
                    {selectedHotspot.name}
                  </h3>
                  <p className="mt-1 text-xs italic tracking-wide text-amber-200/80">
                    {selectedHotspot.subtitle}
                  </p>
                </div>

                {/* Biological summary */}
                <p className="text-sm leading-relaxed text-slate-300">
                  {selectedHotspot.summary}
                </p>

                {/* Metrics diagnostic grid */}
                <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                  <div className="border border-white/10 bg-white/[0.025] p-3">
                    <span className="block text-[10px] tracking-[0.2em] text-[#94a3b8] uppercase">
                      {selectedHotspot.metricLabel}
                    </span>
                    <span className="mt-1 block text-xs font-bold text-amber-300">
                      {selectedHotspot.metricValue}
                    </span>
                  </div>
                  <div className="border border-white/10 bg-white/[0.025] p-3">
                    <span className="block text-[10px] tracking-[0.2em] text-[#94a3b8] uppercase">
                      {selectedHotspot.secondaryMetricLabel}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-slate-200">
                      {selectedHotspot.secondaryMetricValue}
                    </span>
                  </div>
                </div>

                {/* Husbandry insight */}
                <div className="border-l-2 border-amber-400/80 bg-amber-400/[0.04] p-3.5 text-xs leading-relaxed text-slate-300">
                  <span className="block font-bold tracking-[0.18em] text-amber-300 uppercase mb-1">
                    Midhula Conditioning Protocol:
                  </span>
                  {selectedHotspot.husbandryNote}
                </div>

                {/* Interactive action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <span className="text-[11px] font-mono tracking-wider text-[#94a3b8]">
                    LOC: X:{selectedHotspot.x}% Y:{selectedHotspot.y}%
                  </span>

                  {onTriggerFishAction ? (
                    <button
                      type="button"
                      data-cursor="interactive"
                      onClick={onTriggerFishAction}
                      className="cursor-pointer inline-flex items-center gap-2 border border-amber-400/80 bg-amber-400/20 px-4 py-2 text-xs font-bold tracking-[0.2em] text-amber-200 uppercase transition-all hover:bg-amber-400 hover:text-[#0b0f13] shadow-md shadow-amber-950/40"
                    >
                      <span>Flare 3D Fish</span>
                      <span aria-hidden="true">✦</span>
                    </button>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Node Selector Pills Ribbon */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {filteredHotspots.map((item) => {
            const isSelected = selectedHotspot.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-cursor="interactive"
                onClick={() => setSelectedHotspot(item)}
                className={`cursor-pointer group flex flex-col items-start border p-3 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-amber-400/90 bg-amber-400/20 shadow-[0_0_16px_rgba(245,158,11,0.22)]"
                    : "border-white/10 bg-[#151c24]/60 hover:border-amber-400/40 hover:bg-[#151c24]/90"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isSelected ? "text-amber-400" : "text-[#94a3b8]"
                    }`}
                  >
                    0{item.number}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSelected ? "bg-amber-400 animate-pulse" : "bg-white/20"
                    }`}
                  />
                </div>
                <span className="mt-2 text-xs font-semibold tracking-wide text-white group-hover:text-amber-200 line-clamp-1">
                  {item.name.split(" ")[0]} {item.name.split(" ")[1]}
                </span>
                <span className="mt-0.5 text-[10px] tracking-wider text-[#94a3b8] uppercase line-clamp-1">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
