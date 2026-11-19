import type { StaticImageData } from "next/image";
import bettaSapphireImg from "@/public/images/betta-fish.png";
import specimenEmeraldImg from "@/public/images/specimen-emerald.jpg";
import specimenScarletImg from "@/public/images/specimen-scarlet.jpg";

export type SpecimenCategory =
  | "All"
  | "Exotic Guppies"
  | "Platies"
  | "Crayfish & Shrimp"
  | "Aquatic Care";

export interface Specimen {
  id: "01" | "02" | "03";
  slug: string;
  category: SpecimenCategory;
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
    slug: "fiery-red-exotic-guppy",
    category: "Exotic Guppies",
    name: "Fiery Red Exotic Guppy",
    subtitle: "High-Contrast Crimson & Iridescent Veil",
    scientificName: "Poecilia reticulata var. fiery",
    lineage: "Nooluvally Select Showline • F4",
    tailSpread: "Delta Broadtail • 70° Full Veil",
    temperament: "Active Schooler & Curious",
    availability: "In Stock • Live Shipping",
    accentHex: "#ef4444",
    image: specimenScarletImg,
    isCutout: false,
    habitatSpecs: [
      { label: "Water Temp", value: "24.0°C – 28.0°C" },
      { label: "Target pH", value: "6.8 – 7.6 Tropical Buffer" },
      { label: "Minimum Vessel", value: "15L Planted Nano / Community" },
      { label: "Diet", value: "Live Artemia & Micro-Pellets" },
    ],
    summary:
      "Cultivated in Midhula Farm Hut's sun-warmed breeding tubs in Nooluvally, this signature exotic guppy line features intense fiery crimson caudal finnage, metallic dorsal highlights, and robust schooling vitality.",
    careNotes:
      "Acclimated to natural Kerala blackwater and planted biotopes. Fasted for 24 hours prior to insulated oxygen-packed shipping to ensure pristine transit water quality.",
  },
  {
    id: "02",
    slug: "electric-blue-crayfish",
    category: "Crayfish & Shrimp",
    name: "Electric Blue Crayfish",
    subtitle: "Vibrant Cobalt Carapace & Armoured Claws",
    scientificName: "Cherax quadricarinatus var. blue",
    lineage: "Cherax Select Morph • F3",
    tailSpread: "Segmented Pleon & Broad Fan",
    temperament: "Stately Bottom Forager",
    availability: "Limited Collector Pairs",
    accentHex: "#3b82f6",
    image: bettaSapphireImg,
    isCutout: true,
    habitatSpecs: [
      { label: "Water Temp", value: "22.0°C – 26.5°C" },
      { label: "Target pH", value: "7.0 – 8.0 Mineral Rich" },
      { label: "Minimum Vessel", value: "40L with Driftwood Caves" },
      { label: "Diet", value: "Sinking Kelp Wafers & Crustacean Diet" },
    ],
    summary:
      "A prized freshwater centerpiece exhibiting striking cobalt-blue chitin armor, heavy protective chelae, and confident daytime exploration. Perfectly acclimated to Indian water parameters.",
    careNotes:
      "Provide secure hiding shelters using Catappa bark or natural rock caves. Dispatched in individual moisture-sealed breathable containers with live arrival guarantee.",
  },
  {
    id: "03",
    slug: "golden-sun-platy",
    category: "Platies",
    name: "Golden Sun Platy & Showlines",
    subtitle: "Warm Sunburst Amber & Iridescent Fins",
    scientificName: "Xiphophorus maculatus var. auric",
    lineage: "Kerala Hatchery Showline • F4",
    tailSpread: "Round Keel • Symmetrical Margins",
    temperament: "Hardy, Social & Peaceful",
    availability: "Curated Spawn Available",
    accentHex: "#f59e0b",
    image: specimenEmeraldImg,
    isCutout: false,
    habitatSpecs: [
      { label: "Water Temp", value: "22.5°C – 27.5°C" },
      { label: "Target pH", value: "7.0 – 7.8 Moderate Hardness" },
      { label: "Minimum Vessel", value: "20L Planted Biotope" },
      { label: "Plant Pairing", value: "Java Moss & Floating Guppy Grass" },
    ],
    summary:
      "Bred for luminous sunburst amber saturation and mirror-like scale iridescence under natural sunlight. Renowned among Kerala hobbyists for exceptional hardiness and peaceful community behavior.",
    careNotes:
      "Thrives in sunlit planted setups with live micro-fauna and gentle sponge filtration. Packed in double-lined thermocol boxes with courier dispatch across Kerala and all India.",
  },
];

export const FARM_WHATSAPP_NUMBER = "918129120437";
export const FARM_WHATSAPP_DISPLAY = "+91 81291 20437";
export const FARM_LOCATION = "Nooluvally, Thrissur, Kerala";
export const FARM_INSTAGRAM_URL = "https://www.instagram.com/midhula_farm_hut/";
export const FARM_YOUTUBE_URL = "https://www.youtube.com/@midhula_farm_hut";

export function getWhatsAppOrderUrl(specimenName?: string, specimenId?: string): string {
  const message = specimenName
    ? `Hi Midhula Farm Hut, I would like to order the ${specimenName} (Specimen ${specimenId || "01"}). Please share current stock availability and live shipping details to my pincode.`
    : "Hi Midhula Farm Hut, I would like to check current live stock availability and shipping details across Kerala / India.";
  return `https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
