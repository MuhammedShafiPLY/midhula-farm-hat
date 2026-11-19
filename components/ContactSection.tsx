"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { SPECIMENS } from "@/lib/specimens";

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
  } | null>(null);

  const selectedSpecimen =
    SPECIMENS.find((item) => item.slug === selectedSpecimenSlug) ?? null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !contactInfo.trim()) return;

    setSubmittedRecord({
      name: name.trim(),
      specimenLabel: selectedSpecimen
        ? `${selectedSpecimen.id} — ${selectedSpecimen.name}`
        : "General Biotope & Stock Inquiry",
    });
    setNotes("");
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-white/10 bg-[#020812]/70 px-6 pt-24 pb-12 backdrop-blur-[2px] sm:px-10 sm:pt-32 md:px-14"
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
                className="absolute top-1 left-0 h-10 w-[1px] bg-gradient-to-b from-sky-300/70 to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute top-1 left-0 h-[1px] w-4 bg-sky-300/70"
              />
              <p className="font-display text-[11px] font-semibold tracking-[0.38em] text-sky-300/80 uppercase">
                Reservations & Sanctuary Visits
              </p>
              <h2
                id="contact-heading"
                className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl"
              >
                Begin A Conversation
              </h2>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">
              Inquire about current spawn availability, private viewing
              appointments at Midhula Farm Hut, or custom planted-vessel
              conditioning advice before bringing your Betta home.
            </p>

            <dl className="mt-9 space-y-5 border-t border-white/10 pt-7 text-sm">
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <dt className="text-[11px] tracking-[0.25em] text-slate-500 uppercase">
                  Sanctuary
                </dt>
                <dd className="text-right font-medium text-slate-200">
                  Midhula Farm Hut Hatchery
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <dt className="text-[11px] tracking-[0.25em] text-slate-500 uppercase">
                  Viewing Hours
                </dt>
                <dd className="text-right font-medium text-slate-200">
                  Tue – Sun • 10:00 to 18:00
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11px] tracking-[0.25em] text-slate-500 uppercase">
                  Acclimation & Dispatch
                </dt>
                <dd className="text-right font-medium text-slate-200">
                  Oxygenated Thermal Box Care
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Right column: minimalist architectural inquiry form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/10 bg-[#040d1c]/85 p-6 sm:p-10 lg:col-span-7"
          >
            {submittedRecord ? (
              <div className="flex h-full flex-col justify-center py-8 text-left">
                <span className="font-display text-[11px] font-semibold tracking-[0.35em] text-sky-300 uppercase">
                  Inquiry Recorded
                </span>
                <h3 className="font-display mt-3 text-2xl font-bold text-white">
                  Thank you, {submittedRecord.name}.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
                  Your interest in{" "}
                  <span className="font-medium text-sky-200">
                    {submittedRecord.specimenLabel}
                  </span>{" "}
                  is noted. Our hatchery team prepares live acclimation notes
                  and video previews for every inquiry before confirmation.
                </p>
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => setSubmittedRecord(null)}
                    className="border border-white/20 px-5 py-2.5 text-xs font-medium tracking-[0.22em] text-white uppercase transition-colors hover:border-sky-300/60 hover:text-sky-200"
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
                      className="block text-[10px] font-semibold tracking-[0.28em] text-slate-400 uppercase"
                    >
                      Your Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Aarav Menon"
                      className="mt-2 w-full border border-white/15 bg-[#020710]/90 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-sky-300/70 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-contact"
                      className="block text-[10px] font-semibold tracking-[0.28em] text-slate-400 uppercase"
                    >
                      Phone or Email
                    </label>
                    <input
                      id="inquiry-contact"
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(event) => setContactInfo(event.target.value)}
                      placeholder="+91 ... or you@example.com"
                      className="mt-2 w-full border border-white/15 bg-[#020710]/90 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-sky-300/70 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-specimen"
                    className="block text-[10px] font-semibold tracking-[0.28em] text-slate-400 uppercase"
                  >
                    Specimen Interest
                  </label>
                  <select
                    id="inquiry-specimen"
                    value={selectedSpecimenSlug}
                    onChange={(event) =>
                      onSpecimenSlugChange(event.target.value)
                    }
                    className="mt-2 w-full border border-white/15 bg-[#020710]/90 px-4 py-3 text-sm text-white transition-colors focus:border-sky-300/70 focus:outline-none"
                  >
                    <option value="general">
                      General Hatchery & Aquascape Consultation
                    </option>
                    {SPECIMENS.map((item) => (
                      <option key={item.id} value={item.slug}>
                        {item.id} — {item.name} ({item.lineage})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block text-[10px] font-semibold tracking-[0.28em] text-slate-400 uppercase"
                  >
                    Aquarium Setup & Notes
                  </label>
                  <textarea
                    id="inquiry-notes"
                    rows={4}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Share your tank volume, water temperature, or whether you prefer a single centerpiece male or breeding pair..."
                    className="mt-2 w-full resize-none border border-white/15 bg-[#020710]/90 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-sky-300/70 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] tracking-wide text-slate-500">
                    Hand-selected video previews shared before dispatch.
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 border border-sky-300/50 bg-sky-400/12 px-7 py-3 text-xs font-semibold tracking-[0.26em] text-white uppercase transition-all hover:border-sky-300 hover:bg-sky-400/22"
                  >
                    <span>Send Inquiry</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Minimal editorial footer */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[11px] tracking-[0.24em] text-slate-500 uppercase sm:flex-row sm:items-center">
          <span>Midhula Farm Hut — Beauty of the Ocean</span>
          <div className="flex items-center gap-6">
            <a href="#top" className="transition-colors hover:text-slate-200">
              Back to Surface ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
