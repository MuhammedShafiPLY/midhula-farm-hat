"use client";

import { motion } from "framer-motion";
import { FARM_INSTAGRAM_URL, FARM_YOUTUBE_URL } from "@/lib/specimens";

const REVIEWS = [
  {
    quote:
      "Ordered 3 pairs of exotic guppies to Ernakulam. The thermocol packaging with oxygen was immaculate—fish were active, colorful, and feeding within 15 minutes of acclimation!",
    author: "Vishnu N.",
    location: "Kochi, Kerala",
    verified: "Verified Live Delivery",
    tag: "Exotic Guppy Pair",
  },
  {
    quote:
      "Electric blue crayfish arrived safely all the way to Bangalore. Zero claw damage, vibrant cobalt coloration, and healthy behavior. Midhula is easily the most reliable farm in Kerala.",
    author: "Arjun M.",
    location: "Bengaluru, Karnataka",
    verified: "Verified Live Delivery",
    tag: "Electric Blue Crayfish",
  },
  {
    quote:
      "Super responsive on WhatsApp. They sent me a live video of the exact platy stock before sealing the oxygen bag. Very professional insulated packaging.",
    author: "Sujith K.",
    location: "Kozhikode, Kerala",
    verified: "Verified Live Delivery",
    tag: "Golden Sun Platies",
  },
];

export default function CommunitySection() {
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#0b0f13]/85 px-6 py-24 backdrop-blur-[2px] sm:px-10 sm:py-32 md:px-14"
    >
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
              Social Proof & Real Keepers
            </p>
            <h2
              id="community-heading"
              className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#f8fafc] uppercase sm:text-5xl"
            >
              Happy Keepers & Vlogs
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#94a3b8]">
            Join over 75,000 hobbyists following our daily pond updates, live feed cultures, and safe door-to-door fish unboxing deliveries.
          </p>
        </motion.div>

        {/* Social Channel Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* YouTube Card */}
          <div className="border border-white/10 bg-[#151c24]/90 p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 border border-red-500/40 bg-red-500/10 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-red-400 uppercase">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  YouTube Channel
                </span>
                <span className="font-mono text-xs font-bold text-slate-300">75K+ SUBSCRIBERS</span>
              </div>
              <h3 className="font-display mt-4 text-2xl font-bold text-white">
                Midhula Farm Hut Vlogs
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
                Over 1,500+ video guides covering live fish breeding, outdoor pond tub setups in Kerala, water conditioning with Catappa, and unboxing customer orders.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#94a3b8]">1,500+ Video Uploads</span>
              <a
                href={FARM_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="cursor-pointer inline-flex items-center gap-2 border border-red-500/60 bg-red-500/15 px-4 py-2 text-xs font-bold tracking-[0.18em] text-red-200 uppercase transition-all hover:bg-red-500 hover:text-white"
              >
                <span>Watch On YouTube</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="border border-white/10 bg-[#151c24]/90 p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-amber-300 uppercase">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Instagram Community
                </span>
                <span className="font-mono text-xs font-bold text-slate-300">28.8K+ FOLLOWERS</span>
              </div>
              <h3 className="font-display mt-4 text-2xl font-bold text-white">
                @midhula_farm_hut
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
                Daily reels showcasing freshly hatched fry, collector pair updates, live parcel dispatch preparation, and direct hobbyist interactions.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#94a3b8]">Daily Farm Stories</span>
              <a
                href={FARM_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="cursor-pointer inline-flex items-center gap-2 border border-amber-400/80 bg-amber-400/20 px-4 py-2 text-xs font-bold tracking-[0.18em] text-amber-200 uppercase transition-all hover:bg-amber-400 hover:text-[#0b0f13]"
              >
                <span>Follow On Instagram</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Customer Reviews Carousel / Grid */}
        <div className="mt-12">
          <span className="block text-[10px] font-bold tracking-[0.26em] text-amber-400 uppercase mb-6">
            Hobbyist Feedback Across India:
          </span>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-white/10 bg-[#151c24]/75 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      ✓ {review.verified}
                    </span>
                    <span className="text-[10px] tracking-widest text-[#94a3b8] uppercase">
                      {review.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {review.author}
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">
                    {review.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
