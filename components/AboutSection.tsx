"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SanctuaryProtocol {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
  botanicalPairing: string;
}

const PROTOCOLS: SanctuaryProtocol[] = [
  {
    id: "blackwater",
    number: "01",
    title: "Botanical Blackwater Chemistry",
    subtitle: "Indian Almond Leaf & Humic Acid Steeping",
    description:
      "Unlike sterile glass tanks, our nursery biotopes are enriched with dried Indian almond leaves (Terminalia catappa) and wild alder cones. Natural tannins lower fungal risk, buffer pH naturally between 6.4 and 7.0, and deepen the iridescent blue and crimson pigments of our showlines.",
    specs: [
      { label: "Target pH", value: "6.4 – 6.9 Tannin Buffered" },
      { label: "Water Tint", value: "Golden-Amber Tea Clarity" },
      { label: "Immunity Benefit", value: "Antimicrobial Slime Coat Hardening" },
      { label: "Substrate", value: "Fine Inert River Sand & Leaf Litter" },
    ],
    botanicalPairing: "Grade-A Catappa Bark & Driftwood",
  },
  {
    id: "genetics",
    number: "02",
    title: "Selective F3–F4 Show Pedigrees",
    subtitle: "Mathematical 180° Caudal Symmetry & Clean Ray Splitting",
    description:
      "Every breeding cycle at Midhula Farm Hut pairs documented showlines focusing on full 180-degree caudal flare posture, uncurled outer fin margins, and luminous dragon scale coverage. We select strictly for robust swimming vitality and calm, curious temperaments.",
    specs: [
      { label: "Caudal Spread", value: "True 180° Flat D-Shape" },
      { label: "Ray Division", value: "Secondary & Tertiary Branching" },
      { label: "Scale Density", value: "Even Metallic Guanine Matrix" },
      { label: "Lineage", value: "Selective Closed Showline Colony" },
    ],
    botanicalPairing: "Floating Frogbit & Hornwort Canopy",
  },
  {
    id: "nutrition",
    number: "03",
    title: "Artisan Live Micro-Culturing",
    subtitle: "Instinct-Driven Hunting & Astaxanthin Enrichment",
    description:
      "We raise our fry and prime adults on live cultures cultivated on-site—including newly hatched Artemia nauplii, freshwater Moina, and Daphnia. Live prey stimulates natural predatory hunting instincts and guarantees vibrant natural colors without synthetic dyes.",
    specs: [
      { label: "Primary Diet", value: "Live Artemia Nauplii & Moina" },
      { label: "Carotenoid Source", value: "Natural Astaxanthin & Spirulina" },
      { label: "Feeding Frequency", value: "Twice Daily Live Micro-Feedings" },
      { label: "Digestion Index", value: "Clean Zero-Waste Conversion" },
    ],
    botanicalPairing: "Micro-Fauna Infused Moss Mats",
  },
  {
    id: "vessel",
    number: "04",
    title: "Individual Low-Flow Vessels",
    subtitle: "Spacious Planted Biotope Conditioning",
    description:
      "We reject cramped mass breeding jars. Each developing male transitions early into an individual, densely planted conditioning vessel with gentle baffled filtration and resting surface perches, ensuring pristine, unbroken fin growth.",
    specs: [
      { label: "Minimum Space", value: "20L Planted Biotope Per Resident" },
      { label: "Flow Velocity", value: "< 0.02 m/s Baffled Sponge" },
      { label: "Oxygenation", value: "Natural Surface Plants & Labyrinth Air" },
      { label: "Resting Perches", value: "Submerged Broad Anubias Foliage" },
    ],
    botanicalPairing: "Anubias Nana & Floating Pistia",
  },
];

const METRICS = [
  { value: "26.8°C", label: "Thermal Stability", note: "Digitally Regulated" },
  { value: "180°", label: "Caudal Flare Target", note: "Clean Ray Bifurcation" },
  { value: "F3–F4", label: "Documented Lineages", note: "Pedigree Verified" },
  { value: "100%", label: "Live Micro-Fed", note: "Zero Mass Pellets" },
];

export default function AboutSection() {
  const [activeProtocol, setActiveProtocol] = useState<SanctuaryProtocol>(
    PROTOCOLS[0]
  );

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#020610]/75 px-6 py-24 backdrop-blur-[2px] sm:px-10 sm:py-32 md:px-14"
    >
      {/* Deep-water ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/[0.04] blur-[150px]"
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
              className="absolute top-1 left-0 h-10 w-[1px] bg-gradient-to-b from-sky-300/70 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 h-[1px] w-4 bg-sky-300/70"
            />
            <p className="font-display text-[11px] font-semibold tracking-[0.38em] text-sky-300/80 uppercase">
              Sanctuary Standards • Midhula Farm Hut
            </p>
            <h2
              id="about-heading"
              className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white uppercase sm:text-5xl"
            >
              The Sanctuary Craft
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Nestled in quiet husbandry traditions, Midhula Farm Hut raises
            small-batch Betta splendens not on mass racks, but inside balanced,
            sunlit blackwater ecosystems with unhurried care.
          </p>
        </motion.div>

        {/* Minimalist 4-Metric Showcase Bar */}
        <div className="mt-14 grid grid-cols-2 gap-4 border-y border-white/10 py-7 lg:grid-cols-4 lg:gap-8">
          {METRICS.map((metric) => (
            <div key={metric.label} className="border-l border-white/10 pl-4 sm:pl-6">
              <span className="font-display block text-2xl font-black tracking-tight text-white sm:text-3xl">
                {metric.value}
              </span>
              <span className="mt-1 block text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">
                {metric.label}
              </span>
              <span className="mt-0.5 block text-[11px] text-slate-500">
                {metric.note}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Sanctuary Protocols Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Protocol Selector Tabs */}
          <div className="space-y-3 lg:col-span-5">
            <span className="block text-[10px] font-semibold tracking-[0.26em] text-slate-400 uppercase mb-4">
              Explore Husbandry Pillars:
            </span>
            {PROTOCOLS.map((protocol) => {
              const isSelected = activeProtocol.id === protocol.id;
              return (
                <button
                  key={protocol.id}
                  type="button"
                  data-cursor="interactive"
                  onClick={() => setActiveProtocol(protocol)}
                  className={`cursor-pointer group flex w-full flex-col border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-sky-300/80 bg-[#040e22]/90 shadow-[0_0_24px_rgba(56,189,248,0.18)]"
                      : "border-white/10 bg-[#030915]/50 hover:border-sky-300/40 hover:bg-[#030915]/80"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest ${
                        isSelected ? "text-sky-300" : "text-slate-500"
                      }`}
                    >
                      {protocol.number}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-transform ${
                        isSelected
                          ? "bg-sky-300 scale-125 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
                          : "bg-white/20 group-hover:bg-white/50"
                      }`}
                    />
                  </div>
                  <h3 className="font-display mt-2 text-base font-bold text-white group-hover:text-sky-100 sm:text-lg">
                    {protocol.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {protocol.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Protocol Deep-Dive Inspection Card */}
          <div className="border border-sky-300/20 bg-[#040d1e]/95 p-6 shadow-2xl shadow-black/80 lg:col-span-7 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProtocol.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] tracking-widest text-sky-300 uppercase">
                      MIDHULA SANCTUARY PILLAR [{activeProtocol.number} • 04]
                    </span>
                    <span className="border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10px] tracking-wider text-slate-300 uppercase">
                      {activeProtocol.botanicalPairing}
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {activeProtocol.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium tracking-wide text-sky-200/80">
                    {activeProtocol.subtitle}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {activeProtocol.description}
                </p>

                {/* Technical Specifications Grid */}
                <div>
                  <span className="block text-[10px] font-semibold tracking-[0.24em] text-slate-400 uppercase mb-3">
                    Conditioning Criteria:
                  </span>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeProtocol.specs.map((item) => (
                      <div
                        key={item.label}
                        className="border border-white/10 bg-white/[0.025] px-4 py-3"
                      >
                        <span className="block text-[10px] tracking-[0.22em] text-slate-400 uppercase">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-sky-100">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Callout & Link to Contact */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <span className="text-xs text-slate-400">
                    Need guidance tailoring your planted biotope?
                  </span>
                  <a
                    href="#contact"
                    data-cursor="interactive"
                    className="cursor-pointer inline-flex items-center gap-2 border border-sky-300/60 bg-sky-400/15 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-sky-100 uppercase transition-colors hover:border-sky-300 hover:bg-sky-400/25"
                  >
                    <span>Consult Our Hatchery</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
