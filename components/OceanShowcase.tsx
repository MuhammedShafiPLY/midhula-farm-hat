"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import AboutSection from "@/components/AboutSection";
import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import FishExplanationSection from "@/components/FishExplanationSection";
import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import OceanBackdrop from "@/components/OceanBackdrop";
import OceanHero from "@/components/OceanHero";
import SpecimenModal from "@/components/SpecimenModal";
import SwimmingFish, { PointerTracker } from "@/components/SwimmingFish";
import { SPECIMENS, type Specimen } from "@/lib/specimens";

export default function OceanShowcase() {
  const [activeSpecimen, setActiveSpecimen] = useState<Specimen | null>(null);
  const [inquirySlug, setInquirySlug] = useState<string>(SPECIMENS[0].slug);
  const prefersReducedMotion = useReducedMotion();

  const pointerRef = useRef<PointerTracker>({
    x: 0,
    y: 0,
    active: false,
    lastClickAt: 0,
    clickX: 0,
    clickY: 0,
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (activeSpecimen) return;
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        pointerRef.current.x = event.clientX;
        pointerRef.current.y = event.clientY;
        pointerRef.current.active = true;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (activeSpecimen) return;
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.active = true;

      const target = event.target;
      if (
        !(
          target instanceof Element &&
          target.closest(
            "a, button, input, textarea, select, [role='button']"
          )
        )
      ) {
        pointerRef.current.lastClickAt = performance.now();
        pointerRef.current.clickX = event.clientX;
        pointerRef.current.clickY = event.clientY;
      }
    };

    const handleMouseLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeSpecimen, prefersReducedMotion]);

  const handleTriggerFishAction = () => {
    if (typeof window === "undefined") return;
    pointerRef.current.x = window.innerWidth * 0.45;
    pointerRef.current.y = window.innerHeight * 0.45;
    pointerRef.current.active = true;
    pointerRef.current.lastClickAt = performance.now();
    pointerRef.current.clickX = window.innerWidth * 0.45;
    pointerRef.current.clickY = window.innerHeight * 0.45;
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f13] text-white selection:bg-amber-400/30 selection:text-white">
      {/* Full-viewport persistent ocean backdrop continuing to the end */}
      <OceanBackdrop />

      {/* Full-viewport persistent 3D swimming Betta fish moving continuously through all sections */}
      <SwimmingFish
        pointerRef={pointerRef}
        activeSpecimenId="01"
      />

      <CustomCursor />
      <Header
        onExploreClick={() => {
          setActiveSpecimen(SPECIMENS[0]);
        }}
      />

      <main className="relative z-20">
        <OceanHero
          onInspectFeatured={() => {
            setActiveSpecimen(SPECIMENS[0]);
          }}
        />
        <GallerySection
          onSelectSpecimen={(specimen) => setActiveSpecimen(specimen)}
        />
        <FishExplanationSection onTriggerFishAction={handleTriggerFishAction} />
        <AboutSection />
        <CommunitySection />
        <ContactSection
          selectedSpecimenSlug={inquirySlug}
          onSpecimenSlugChange={setInquirySlug}
        />
      </main>

      <SpecimenModal
        specimen={activeSpecimen}
        open={Boolean(activeSpecimen)}
        onClose={() => setActiveSpecimen(null)}
        onSelectSpecimen={(specimen) => setActiveSpecimen(specimen)}
        onInquire={(specimen) => setInquirySlug(specimen.slug)}
      />
    </div>
  );
}
