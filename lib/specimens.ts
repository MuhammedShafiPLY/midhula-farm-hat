import type { StaticImageData } from "next/image";
import bettaSapphireImg from "@/public/images/betta-fish.png";
import specimenEmeraldImg from "@/public/images/specimen-emerald.jpg";
import specimenScarletImg from "@/public/images/specimen-scarlet.jpg";

export interface Specimen {
  id: "01" | "02" | "03";
  slug: string;
  name: string;
  subtitle: string;
  scientificName: string;
  lineage: string;
  tailSpread: string;
  temperament: string;
  availability: string;
  accentHex: string;
  image: StaticImageData;
  isCutout: boolean;
  habitatSpecs: {
    label: string;
    value: string;
  }[];
  summary: string;
  careNotes: string;
}

export const SPECIMENS: Specimen[] = [
  {
    id: "01",
    slug: "royal-sapphire-halfmoon",
    name: "Royal Sapphire Halfmoon",
    subtitle: "Iridescent Cobalt & Coral Flame",
    scientificName: "Betta splendens",
    lineage: "Midhula Select Showline • F4",
    tailSpread: "180° Symmetrical Halfmoon",
    temperament: "Alert & Curiously Responsive",
    availability: "Showpiece Resident",
    accentHex: "#38bdf8",
    image: bettaSapphireImg,
    isCutout: true,
    habitatSpecs: [
      { label: "Water Temp", value: "26.5°C – 28.0°C" },
      { label: "Target pH", value: "6.6 – 7.2 Soft-Neutral" },
      { label: "Minimum Vessel", value: "20L Planted Blackwater" },
      { label: "Filtration", value: "Low-Flow Sponge / Baffled" },
    ],
    summary:
      "Bred for dense metallic cobalt scaling along the dorsal saddle fading into translucent coral-crimson fin membranes with full 180-degree caudal flare.",
    careNotes:
      "Conditioned on live Artemia nauplii, daphnia, and Indian almond leaf tannins at Midhula Farm Hut for glassy fin clarity and confident interactive temperament.",
  },
  {
    id: "02",
    slug: "scarlet-abyss-halfmoon",
    name: "Scarlet Abyss Halfmoon",
    subtitle: "Velvet Crimson & Ultraviolet Rim",
    scientificName: "Betta splendens",
    lineage: "Crimson Silk Line • F3",
    tailSpread: "180° Feather-Ray Halfmoon",
    temperament: "Stately & Territorial Flaring",
    availability: "Limited Collector Pair",
    accentHex: "#fb7185",
    image: specimenScarletImg,
    isCutout: false,
    habitatSpecs: [
      { label: "Water Temp", value: "26.0°C – 28.0°C" },
      { label: "Target pH", value: "6.4 – 7.0 Light Tannin" },
      { label: "Minimum Vessel", value: "25L Low-Light Biotope" },
      { label: "Botanicals", value: "Catappa Bark & Driftwood" },
    ],
    summary:
      "Deep velvet crimson flanks carry violet iridescence under directional reef lighting, unfurling a gossamer caudal veil with fine branched rays.",
    careNotes:
      "Thrive best under diffused overhead canopy light with floating frogbit and gentle water movement to protect long, delicate marginal fin rays.",
  },
  {
    id: "03",
    slug: "emerald-auric-crowntail",
    name: "Emerald Auric Crowntail",
    subtitle: "Oceanic Teal & Warm Gold Spikes",
    scientificName: "Betta splendens",
    lineage: "Auric Seafoam Crowntail • F4",
    tailSpread: "165° Double-Ray Crowntail",
    temperament: "Agile & Highly Active",
    availability: "Curated Spawn Available",
    accentHex: "#2dd4bf",
    image: specimenEmeraldImg,
    isCutout: false,
    habitatSpecs: [
      { label: "Water Temp", value: "27.0°C – 28.5°C" },
      { label: "Target pH", value: "6.8 – 7.4 Mineral Balanced" },
      { label: "Minimum Vessel", value: "20L Dark-Substrate Aquascape" },
      { label: "Flow Rate", value: "Gentle Current Tolerant" },
    ],
    summary:
      "Sculpted oceanic turquoise iridescence meets golden-ochre filigree rays extending cleanly past the webbing for an unmistakable crown silhouette.",
    careNotes:
      "Maintained in warm tannin-kissed spring water with resting Anubias leaves near the surface to support labyrinth breathing and crisp ray extension.",
  },
];

