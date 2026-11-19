import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midhula Farm Hut — Exotic Aquatics, Guppies & Crayfish | Thrissur, Kerala",
  description:
    "Official showcase of Midhula Farm Hut, Nooluvally, Thrissur. Premium exotic guppies, platies, electric blue crayfish, and safe all-India live fish shipping.",
  keywords: [
    "Midhula Farm Hut",
    "ornamental fish farm Thrissur",
    "exotic guppies Kerala",
    "electric blue crayfish India",
    "live fish shipping Kerala",
    "platies",
    "Nooluvally fish farm",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#0b0f13] font-sans text-[#f8fafc] selection:bg-amber-400/30 selection:text-amber-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
