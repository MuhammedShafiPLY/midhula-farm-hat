# 🌊 Midhula Farm Hut — Beauty of the Ocean

> **An immersive 3D WebGL aquatic showcase, living Halfmoon Betta sanctuary, and biological anatomy exploration crafted for Midhula Farm Hut.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features & Highlights

- **🐟 Living 3D WebGL Betta Swimmer (`Three.js`):**
  - Continuous full-viewport 3D underwater simulation with organic fin undulation shaders.
  - Interactive mouse tracking: the Betta gracefully chases the luminous dot cursor, turns with dynamic banking angles, and generates interactive water ripples on nibbles and clicks.
  - Dynamic palette morphing between **Royal Sapphire (01)**, **Scarlet Abyss (02)**, and **Emerald Auric (03)** with celebratory bubble particle bursts.

- **🔬 The Anatomy of Living Silk (Interactive Biomechanics HUD):**
  - Precision architectural stage inspecting 6 critical anatomical nodes:
    1. **180° Symmetrical Caudal Veil** (True flat 'D' silhouette & 4-tier ray bifurcation)
    2. **Labyrinth Respiration Organ** (Atmospheric breathing chamber)
    3. **Metallic Guanine Scale Matrix** (Photonic crystalline light refraction)
    4. **Dorsal Ray Crest** (Pitch stabilizer & 75° elevation angle)
    5. **Ventral Sensory Feelers** (Tactile chemosensory current radar)
    6. **Anal Keel & Lateral Line** (Anti-roll stabilization & acoustic pressure sensing)
  - Diagnostic metric boards and *"Flare 3D Betta ✦"* interactive trigger.

- **📜 Curated Specimen Collection & Instant Dossier:**
  - Interactive specimen cards with instant 3D color activation.
  - Accessible specimen modal featuring water chemistry parameters (pH, temperature, botanicals, lineage pedigree) and quick specimen switcher tabs (`[ 01 ] [ 02 ] [ 03 ]`).

- **🌿 The Sanctuary Craft (About Midhula Farm Hut):**
  - Interactive exploration of natural blackwater husbandry: Indian almond leaf (*Terminalia catappa*) steeping, live micro-culturing (Artemia nauplii & Daphnia), selective F3–F4 breeding, and individual planted biotope conditioning.

- **✨ Luminous Underwater Dot Cursor:**
  - Fine-pointer custom cursor with interactive element scaling, glowing cyan aura, and top-layer `z-[9999]` isolation.

- **📬 Sanctuary Reservations & Inquiries:**
  - Architectural booking form for private viewing appointments and custom planted-vessel conditioning advice.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React 19](https://react.dev/)
- **3D Graphics & WebGL:** [Three.js](https://threejs.org/) (`@types/three`)
- **Animation & Transitions:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)

---

## 📁 Project Structure

```text
midhula-farm-hat/
├── app/
│   ├── globals.css           # Tailwind v4 theme, custom cursor rules, dark oceanic backdrop
│   ├── layout.tsx            # Metadata, Montserrat & Inter font configuration
│   └── page.tsx              # Root entry point mounting OceanShowcase
├── components/
│   ├── fish3d/
│   │   ├── bettaTextures.ts  # Procedural canvas textures (scales, fins, bubbles)
│   │   ├── buildBettaFish.ts # Watertight 3D Betta geometry, fin bones, color palettes
│   │   └── FishCanvas3D.tsx  # Three.js WebGL rendering loop, camera & pointer tracking
│   ├── AboutSection.tsx      # Interactive sanctuary husbandry pillars & live metrics
│   ├── ContactSection.tsx    # Reservation inquiry form & sanctuary details
│   ├── CustomCursor.tsx      # High-z-index luminous cursor dot
│   ├── FishExplanationSection.tsx # 6-node anatomical blueprint & biomechanics HUD
│   ├── GallerySection.tsx    # Curated specimens grid with 3D color morphing
│   ├── Header.tsx            # Fixed glassmorphic navigation & slide-out drawer
│   ├── OceanBackdrop.tsx     # Deep-ocean lighting gradient & sun rays
│   ├── OceanHero.tsx         # Editorial typography & split hero stage
│   ├── OceanShowcase.tsx     # Master state orchestrator (3D sync, modal, pointer)
│   ├── SpecimenModal.tsx     # Accessible specimen dossier with switcher tabs
│   └── SwimmingFish.tsx      # WebGL container layer & water ripple rings
├── lib/
│   └── specimens.ts          # Lineage, habitat specs, and metadata for specimens 01-03
├── public/
│   └── images/               # High-res Betta cutouts and oceanic photography
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and build scripts
└── tsconfig.json             # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.18.0 or newer recommended).

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/midhula-farm-hat.git
cd midhula-farm-hat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the sanctuary.

### 4. Build for production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

### 5. Code Quality & Verification

```bash
# Run ESLint
npm run lint

# Run TypeScript type check
npx tsc --noEmit
```

---

## 🌐 Publishing to GitHub

To publish this project to your GitHub account:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `midhula-farm-hat`).
2. Run the following commands in your terminal:

```bash
# Rename branch to main (if not already)
git branch -M main

# Add your GitHub repository remote
git remote add origin https://github.com/<your-username>/midhula-farm-hat.git

# Push the code to GitHub
git push -u origin main
```

---

## 📜 License

Created for **Midhula Farm Hut**. All rights reserved.
