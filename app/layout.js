// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Estudio Hadjes",
  url: "https://estudiohadjes.com.ar",
  telephone: "+54 11 XXXX-XXXX",
  address: {
    "@type": "PostalAddress",
    addressLocality: "CABA",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  areaServed: ["CABA", "GBA"],
  sameAs: [
    // perfiles si existen (Google Business, Maps, LinkedIn, etc.)
  ],
};



const inter = Inter({ subsets: ["latin"], display: "swap" });

// app/layout.js (solo el bloque de metadata)
export const metadata = {
  // Base absoluta para construir URLs (canonical, og:url, etc.)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://estudiohadjes.com.ar"),

  title: {
    default: "Estudio Hadjes | Abogados Laborales en CABA y GBA",
    template: "%s | Estudio Hadjes",
  },

  description:
    "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en CABA y GBA.",

  // NO seteamos alternates.canonical acá para no forzar "/" globalmente.
  // Los canonicals se definen por página con pageMeta()/generateMetadata().

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
    siteName: "Estudio Hadjes",
    // og:url por defecto se resuelve con metadataBase + la ruta de cada página
    title: "Estudio Hadjes | Abogados Laborales en CABA y GBA",
    description:
      "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en CABA y GBA.",
    images: [
      { url: "/og-default.jpg", width: 1200, height: 630, alt: "Estudio Hadjes" },
    ],
    locale: "es_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "Estudio Hadjes | Abogados Laborales en CABA y GBA",
    description:
      "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en CABA y GBA.",
    images: ["/og-default.jpg"],
  },

  // Opcional: pequeñas mejoras de UX/perf
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body>
        {/* JSON-LD global de la organización/servicio legal */}
        <JsonLd data={orgLd} />

       
         <Header />

        {children}

        
         <Footer /> 
      </body>
    </html>
  );
}

