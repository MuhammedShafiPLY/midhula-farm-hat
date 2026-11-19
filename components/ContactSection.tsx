"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  SPECIMENS,
  FARM_LOCATION,
  FARM_WHATSAPP_DISPLAY,
  FARM_WHATSAPP_NUMBER,
  FARM_INSTAGRAM_URL,
  FARM_YOUTUBE_URL,
} from "@/lib/specimens";

interface ContactSectionProps {
  selectedSpecimenSlug: string;
  onSpecimenSlugChange: (slug: string) => void;
}

export default function ContactSection({
  selectedSpecimenSlug,
  onSpecimenSlugChange,
}: ContactSectionProps) {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedRecord, setSubmittedRecord] = useState<{
    name: string;
    specimenLabel: string;
    whatsappUrl: string;
  } | null>(null);

  const selectedSpecimen =
    SPECIMENS.find((item) => item.slug === selectedSpecimenSlug) ?? null;

  const buildWhatsAppMessage = () => {
    const specimenName = selectedSpecimen
      ? `${selectedSpecimen.id} — ${selectedSpecimen.name}`
      : "General Live Stock & Biotope Care";
    return `Hi Midhula Farm Hut,
Name: ${name || "Hobbyist"}
Contact: ${contactInfo || "N/A"}
Specimen of Interest: ${specimenName}
Notes: ${notes || "Looking for stock availability and live delivery details to my pincode."}`;
  };

  const handleWhatsAppDirect = () => {
    if (!name.trim()) {
      alert("Please enter your name first.");
      return;
    }
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !contactInfo.trim()) return;

    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setSubmittedRecord({
      name: name.trim(),
      specimenLabel: selectedSpecimen
        ? `${selectedSpecimen.id} — ${selectedSpecimen.name}`
        : "General Live Stock & Biotope Care",
      whatsappUrl,
    });
    setNotes("");
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-white/10 bg-[#0b0f13]/90 px-6 pt-24 pb-12 backdrop-blur-[2px] sm:px-10 sm:pt-32 md:px-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left column: hatchery details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
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
                Reservations & Live Dispatch
              </p>
              <h2
                id="contact-heading"
                className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#f8fafc] uppercase sm:text-4xl"
              >
                Connect With Farm
              </h2>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#94a3b8] sm:text-base">
              Inquire about current spawn batches, private viewing appointments at our Nooluvally facility in Thrissur, or get custom water conditioning advice before receiving your fish.
            </p>

            <dl className="mt-9 space-y-5 border-t border-white/10 pt-7 text-sm">
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <dt className="text-[11px] font-bold tracking-[0.22em] text-[#94a3b8] uppercase">
                  Farm Location
                </dt>
                <dd className="text-right font-semibold text-white">
                  {FARM_LOCATION}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <dt className="text-[11px] font-bold tracking-[0.22em] text-[#94a3b8] uppercase">
                  WhatsApp Direct
                </dt>
                <dd className="text-right">
                  <a
                    href={`https://wa.me/${FARM_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {FARM_WHATSAPP_DISPLAY}
                  </a>
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <dt className="text-[11px] font-bold tracking-[0.22em] text-[#94a3b8] uppercase">
                  Viewing Hours
                </dt>
                <dd className="text-right font-medium text-slate-200">
                  Mon – Sun • 09:30 to 18:30 (Confirm on WhatsApp)
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <dt className="text-[11px] font-bold tracking-[0.22em] text-[#94a3b8] uppercase">
                  Live Dispatch
                </dt>
                <dd className="text-right font-medium text-slate-200">
                  Insulated Oxygen Thermocol Packaging (Kerala & All India)
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <dt className="text-[11px] font-bold tracking-[0.22em] text-[#94a3b8] uppercase">
                  Social Channels
                </dt>
                <dd className="flex items-center gap-4 text-xs font-semibold">
                  <a
                    href={FARM_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-white transition-colors"
                  >
                    Instagram (28.8K+)
                  </a>
                  <span className="text-slate-600">•</span>
                  <a
                    href={FARM_YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-white transition-colors"
                  >
                    YouTube (75K+)
                  </a>
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Right column: inquiry form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/10 bg-[#151c24]/90 p-6 sm:p-10 lg:col-span-7 shadow-2xl backdrop-blur-md"
          >
            {submittedRecord ? (
              <div className="flex h-full flex-col justify-center py-8 text-left">
                <span className="font-display text-[11px] font-bold tracking-[0.3em] text-emerald-400 uppercase">
                  Inquiry Prepared
                </span>
                <h3 className="font-display mt-3 text-2xl font-bold text-white">
                  Thank you, {submittedRecord.name}.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
                  Your interest in{" "}
                  <span className="font-bold text-amber-300">
                    {submittedRecord.specimenLabel}
                  </span>{" "}
                  is noted. For fastest response and live video preview of current stock before packing, send directly to our farm WhatsApp:
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={submittedRecord.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="interactive"
                    className="cursor-pointer inline-flex items-center gap-2.5 border border-emerald-400 bg-emerald-500 px-6 py-3 text-xs font-bold tracking-[0.2em] text-[#0b0f13] uppercase shadow-[0_0_24px_rgba(16,185,129,0.35)] transition-all hover:bg-emerald-400"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.09 7.41 8.86 7.66C8.63 7.91 8 8.5 8 9.71C8 10.92 8.89 12.09 9.01 12.25C9.13 12.41 10.74 14.9 13.2 15.96C13.78 16.21 14.24 16.37 14.6 16.48C15.19 16.67 15.72 16.64 16.14 16.58C16.61 16.51 17.58 15.99 17.78 15.42C17.98 14.86 17.98 14.37 17.92 14.28C17.86 14.18 17.71 14.12 17.48 14.01C17.26 13.9 16.15 13.35 15.94 13.27C15.73 13.2 15.58 13.16 15.43 13.39C15.28 13.62 14.85 14.12 14.72 14.28C14.59 14.43 14.46 14.45 14.24 14.34C14.01 14.23 13.29 13.99 12.43 13.22C11.76 12.63 11.31 11.89 11.18 11.66C11.05 11.43 11.17 11.31 11.28 11.2C11.39 11.09 11.52 10.92 11.63 10.79C11.75 10.65 11.79 10.55 11.86 10.4C11.94 10.25 11.9 10.12 11.84 10.01C11.78 9.9 11.34 8.81 11.15 8.37C10.97 7.93 10.79 8 10.66 8C10.53 8 10.38 7.98 10.23 7.98C10.08 7.98 9.85 8.04 9.66 8.24" />
                    </svg>
                    <span>Open In WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedRecord(null)}
                    className="border border-white/20 px-5 py-3 text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors hover:border-amber-400 hover:text-amber-300"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-[10px] font-bold tracking-[0.26em] text-[#94a3b8] uppercase"
                    >
                      Your Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="e.g. Rahul Menon"
                      className="mt-2 w-full border border-white/15 bg-[#0b0f13]/90 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-contact"
                      className="block text-[10px] font-bold tracking-[0.26em] text-[#94a3b8] uppercase"
                    >
                      Phone Number or WhatsApp
                    </label>
                    <input
                      id="inquiry-contact"
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(event) => setContactInfo(event.target.value)}
                      placeholder="+91 98... or your email"
                      className="mt-2 w-full border border-white/15 bg-[#0b0f13]/90 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-specimen"
                    className="block text-[10px] font-bold tracking-[0.26em] text-[#94a3b8] uppercase"
                  >
                    Specimen / Stock Interest
                  </label>
                  <select
                    id="inquiry-specimen"
                    value={selectedSpecimenSlug}
                    onChange={(event) =>
                      onSpecimenSlugChange(event.target.value)
                    }
                    className="mt-2 w-full border border-white/15 bg-[#0b0f13]/90 px-4 py-3 text-sm text-white transition-colors focus:border-amber-400 focus:outline-none"
                  >
                    <option value="general">
                      General Live Stock & Dispatch Inquiry
                    </option>
                    {SPECIMENS.map((item) => (
                      <option key={item.id} value={item.slug}>
                        {item.id} — {item.name} ({item.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block text-[10px] font-bold tracking-[0.26em] text-[#94a3b8] uppercase"
                  >
                    Your Pincode & Tank Details
                  </label>
                  <textarea
                    id="inquiry-notes"
                    rows={4}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Enter your delivery pincode, desired pairs/quantity, or ask questions about tank parameters..."
                    className="mt-2 w-full resize-none border border-white/15 bg-[#0b0f13]/90 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] tracking-wide text-[#94a3b8]">
                    Live video previews shared on WhatsApp before packing.
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      data-cursor="interactive"
                      className="cursor-pointer inline-flex items-center gap-2 border border-emerald-400/80 bg-emerald-500/15 px-5 py-3 text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase transition-all hover:bg-emerald-500/30 hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.09 7.41 8.86 7.66C8.63 7.91 8 8.5 8 9.71C8 10.92 8.89 12.09 9.01 12.25C9.13 12.41 10.74 14.9 13.2 15.96C13.78 16.21 14.24 16.37 14.6 16.48C15.19 16.67 15.72 16.64 16.14 16.58C16.61 16.51 17.58 15.99 17.78 15.42C17.98 14.86 17.98 14.37 17.92 14.28C17.86 14.18 17.71 14.12 17.48 14.01C17.26 13.9 16.15 13.35 15.94 13.27C15.73 13.2 15.58 13.16 15.43 13.39C15.28 13.62 14.85 14.12 14.72 14.28C14.59 14.43 14.46 14.45 14.24 14.34C14.01 14.23 13.29 13.99 12.43 13.22C11.76 12.63 11.31 11.89 11.18 11.66C11.05 11.43 11.17 11.31 11.28 11.2C11.39 11.09 11.52 10.92 11.63 10.79C11.75 10.65 11.79 10.55 11.86 10.4C11.94 10.25 11.9 10.12 11.84 10.01C11.78 9.9 11.34 8.81 11.15 8.37C10.97 7.93 10.79 8 10.66 8C10.53 8 10.38 7.98 10.23 7.98C10.08 7.98 9.85 8.04 9.66 8.24" />
                      </svg>
                      <span>Send On WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      data-cursor="interactive"
                      className="cursor-pointer inline-flex items-center gap-2 border border-amber-400 bg-amber-400 px-6 py-3 text-xs font-bold tracking-[0.2em] text-[#0b0f13] uppercase transition-all hover:bg-amber-300 shadow-md shadow-amber-950/40"
                    >
                      <span>Submit Inquiry</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Minimal editorial footer */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[11px] tracking-[0.24em] text-[#94a3b8] uppercase sm:flex-row sm:items-center">
          <span>Midhula Farm Hut — Nooluvally, Thrissur, Kerala</span>
          <div className="flex items-center gap-6">
            <a
              href={FARM_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amber-400"
            >
              Instagram
            </a>
            <a
              href={FARM_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-red-400"
            >
              YouTube
            </a>
            <a href="#top" className="transition-colors hover:text-white">
              Back to Surface ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
