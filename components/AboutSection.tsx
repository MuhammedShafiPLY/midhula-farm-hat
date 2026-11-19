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
    id: "shipping",
    number: "01",
    title: "Oxygenated Live Fish Shipping",
    subtitle: "Insulated Thermocol Packing with 100% Live Arrival Guarantee",
    description:
      "We take pride in our proven all-India live fish transit methodology. Every specimen is fasted for 24 hours to preserve pure water chemistry, packed with medical-grade oxygen in heavy-gauge double bags, and insulated inside durable thermocol boxes labeled 'LIVE ORNAMENTAL FISH' for express door-to-door delivery across Kerala and India.",
    specs: [
      { label: "Dispatch Coverage", value: "All Kerala & Pan-India Express" },
      { label: "Transit Method", value: "Double-Bagged Pure Oxygen" },
      { label: "Box Thermal Guard", value: "High-Density Thermocol Insulation" },
      { label: "Arrival Assurance", value: "100% Live Arrival Guarantee" },
    ],
    botanicalPairing: "Catappa Infused Transit Water",
  },
  {
    id: "blackwater",
    number: "02",
    title: "Natural Pond Tub Husbandry",
    subtitle: "Sun-Warmed Kerala Blackwater Biotopes",
    description:
      "Unlike sterile indoor racks, our breeding colonies thrive in outdoor black tubs steeped with dried Indian almond leaves (Terminalia catappa) and natural river gravel. Gentle sun exposure and beneficial tannins fortify fish slime coats, prevent fungal vectors, and enhance natural iridescence.",
    specs: [
      { label: "Target pH", value: "6.8 – 7.4 Tannin Buffered" },
      { label: "Water Tint", value: "Golden-Amber Tea Clarity" },
      { label: "Natural Lighting", value: "Dappled Tropical Canopy Sun" },
      { label: "Environment", value: "Spacious Outdoor Conditioning Tubs" },
    ],
    botanicalPairing: "Dried Catappa Bark & Indian Botanicals",
  },
  {
    id: "genetics",
    number: "03",
    title: "Selective F3–F4 Showlines",
    subtitle: "Mathematical Symmetrical Fins & Dragon Scales",
    description:
      "Our breeding pairs focus on delta veil expansion in exotic guppies, clean symmetrical ray splitting, vibrant cobalt exoskeletons in electric blue crayfish, and radiant sunburst platies. Every strain is selected for high disease immunity and active, confident schooling temperament.",
    specs: [
      { label: "Guppy Tail Spread", value: "Delta Broadtail 70° Veil" },
      { label: "Crayfish Chitin", value: "Solid Cobalt-Blue Exoskeleton" },
      { label: "Immunity Index", value: "Acclimated to Indian Tap Water" },
      { label: "Lineage Record", value: "Controlled F3–F4 Hatchery Colony" },
    ],
    botanicalPairing: "Floating Guppy Grass & Java Moss",
  },
  {
    id: "aquatic-care",
    number: "04",
    title: "Live Feed & Prophylactic Care",
    subtitle: "Live Artemia Nauplii & Monitored KMnO₄ Baths",
    description:
      "Healthy fish start with living food. Fry and breeders receive daily live Artemia nauplii, Moina, and Daphnia rich in natural astaxanthin. Prior to dispatch, fish receive a monitored Potassium Permanganate (KMnO₄) conditioning dip to eliminate external protozoa and ensure a pathogen-free arrival.",
    specs: [
      { label: "Live Food Culturing", value: "Fresh Artemia Nauplii & Moina" },
      { label: "Parasite Control", value: "Mild KMnO₄ Prophylactic Dip" },
      { label: "Feeding Rhythm", value: "Twice Daily Live Micro-Feedings" },
      { label: "Growth Factor", value: "Natural Astaxanthin Pigment" },
    ],
    botanicalPairing: "Clean Micro-Fauna Infused Moss",
  },
];

const METRICS = [
  { value: "26.8°C", label: "Tropical Pond Stability", note: "Naturally Sunlit Tubs" },
  { value: "100%", label: "Oxygenated Box Shipping", note: "Safe All-India Transit" },
  { value: "F3–F4", label: "Tracked Pedigree Lines", note: "Nooluvally Showlines" },
  { value: "75K+", label: "Kerala Aquarist Community", note: "YouTube & Instagram" },
];

export default function AboutSection() {
  const [activeProtocol, setActiveProtocol] = useState<SanctuaryProtocol>(
    PROTOCOLS[0]
  );

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#0b0f13]/85 px-6 py-24 backdrop-blur-[2px] sm:px-10 sm:py-32 md:px-14"
    >
      {/* Deep pond ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/[0.04] blur-[150px]"
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
              Farm Husbandry & Shipping • Midhula Farm Hut
            </p>
            <h2
              id="about-heading"
              className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#f8fafc] uppercase sm:text-5xl"
            >
              The Sanctuary Craft
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#94a3b8]">
            Nestled in Nooluvally, Thrissur, Midhula Farm Hut combines natural outdoor breeding tub aquaculture with professional insulated courier transit, dispatching disease-free, vibrant stock across India.
          </p>
        </motion.div>

        {/* Minimalist 4-Metric Showcase Bar */}
        <div className="mt-14 grid grid-cols-2 gap-4 border-y border-white/10 py-7 lg:grid-cols-4 lg:gap-8 bg-[#151c24]/50 backdrop-blur-md px-6">
          {METRICS.map((metric) => (
            <div key={metric.label} className="border-l-2 border-amber-400/50 pl-4 sm:pl-6">
              <span className="font-display block text-2xl font-black tracking-tight text-white sm:text-3xl">
                {metric.value}
              </span>
              <span className="mt-1 block text-xs font-bold tracking-[0.18em] text-amber-300 uppercase">
                {metric.label}
              </span>
              <span className="mt-0.5 block text-[11px] text-[#94a3b8]">
                {metric.note}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Sanctuary Protocols Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Protocol Selector Tabs */}
          <div className="space-y-3 lg:col-span-5">
            <span className="block text-[10px] font-bold tracking-[0.26em] text-[#94a3b8] uppercase mb-4">
              Explore Farm Husbandry Standards:
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
                      ? "border-amber-400/80 bg-[#151c24] shadow-[0_0_24px_rgba(245,158,11,0.18)]"
                      : "border-white/10 bg-[#151c24]/50 hover:border-amber-400/40 hover:bg-[#151c24]/80"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest ${
                        isSelected ? "text-amber-400" : "text-[#94a3b8]"
                      }`}
                    >
                      {protocol.number}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-transform ${
                        isSelected
                          ? "bg-amber-400 scale-125 shadow-[0_0_8px_rgba(245,158,11,0.9)]"
                          : "bg-white/20 group-hover:bg-white/50"
                      }`}
                    />
                  </div>
                  <h3 className="font-display mt-2 text-base font-bold text-white group-hover:text-amber-200 sm:text-lg">
                    {protocol.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#94a3b8] line-clamp-1">
                    {protocol.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Protocol Deep-Dive Inspection Card */}
          <div className="border border-white/10 bg-[#151c24]/95 p-6 shadow-2xl lg:col-span-7 sm:p-10 backdrop-blur-md">
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
                    <span className="font-mono text-[11px] font-bold tracking-widest text-amber-400 uppercase">
                      MIDHULA SANCTUARY PILLAR [{activeProtocol.number} • 04]
                    </span>
                    <span className="border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">
                      {activeProtocol.botanicalPairing}
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {activeProtocol.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-amber-300/90">
                    {activeProtocol.subtitle}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  {activeProtocol.description}
                </p>

                {/* Technical Specifications Grid */}
                <div>
                  <span className="block text-[10px] font-bold tracking-[0.24em] text-[#94a3b8] uppercase mb-3">
                    Conditioning & Transit Criteria:
                  </span>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeProtocol.specs.map((item) => (
                      <div
                        key={item.label}
                        className="border border-white/10 bg-white/[0.025] px-4 py-3"
                      >
                        <span className="block text-[10px] tracking-[0.22em] text-[#94a3b8] uppercase">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-white">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Callout & Link to Contact / WhatsApp */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <span className="text-xs text-[#94a3b8]">
                    Questions regarding safe delivery to your pincode?
                  </span>
                  <a
                    href="#contact"
                    data-cursor="interactive"
                    className="cursor-pointer inline-flex items-center gap-2 border border-amber-400 bg-amber-400 px-4 py-2.5 text-xs font-bold tracking-[0.2em] text-[#0b0f13] uppercase transition-all hover:bg-amber-300 shadow-md shadow-amber-950/40"
                  >
                    <span>Check Live Shipping</span>
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
