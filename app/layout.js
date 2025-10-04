import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Estudio Hadjes | Abogados Laborales en CABA y GBA",
    template: "%s | Estudio Hadjes",
  },
  description:
    "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en CABA y GBA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
