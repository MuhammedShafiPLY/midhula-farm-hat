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
  title: "Midhula Farm Hut — Beauty of the Ocean",
  description:
    "An immersive deep-ocean showcase celebrating the luminous elegance and vivid iridescence of the Betta fish.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#02060f] font-sans text-slate-50 selection:bg-sky-400/30 selection:text-sky-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
