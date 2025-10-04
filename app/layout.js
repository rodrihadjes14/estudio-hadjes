// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";





const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://estudiohadjes.com.ar"),
  title: {
    default: "Estudio Hadjes | Abogados Laborales en CABA y GBA",
    template: "%s | Estudio Hadjes",
  },
  description:
    "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en CABA y GBA.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://estudiohadjes.com.ar/",
    siteName: "Estudio Hadjes",
    title: "Estudio Hadjes | Abogados Laborales en CABA y GBA",
    description:
      "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en CABA y GBA.",
    images: [
      { url: "/og-default.jpg", width: 1200, height: 630, alt: "Estudio Hadjes" }, // reemplazar cuando tengas imagen real
    ],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Hadjes | Abogados Laborales en CABA y GBA",
    description:
      "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en CABA y GBA.",
    images: ["/og-default.jpg"], // reemplazar cuando tengas imagen real
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
