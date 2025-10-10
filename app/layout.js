// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Script from "next/script";
import GA4RouteListener from "@/components/GA4RouteListener";
import { Suspense } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuabogadocerca.com.ar"),
  title: {
    default: "Estudio Hadjes | Abogados Laborales en Capital Federal y GBA",
    template: "%s | Estudio Hadjes",
  },
  description:
    "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en Capital Federal y GBA.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, maxSnippet: -1, maxImagePreview: "large", maxVideoPreview: -1 },
  },
  openGraph: {
    type: "website",
    siteName: "Estudio Hadjes",
    title: "Estudio Hadjes | Abogados Laborales en Capital Federal y GBA",
    description:
      "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en Capital Federal y GBA.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Estudio Hadjes" }],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Hadjes | Abogados Laborales en Capital Federal y GBA",
    description:
      "Abogados especializados en accidentes de trabajo, despidos sin causa y reclamos a ART en Capital Federal y GBA.",
    images: ["/og-default.jpg"],
  },
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Estudio Hadjes",
  url: "https://tuabogadocerca.com.ar",
  telephone: "+54 11 3026-1498",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hipolito Yirigoyen 766, Planta Baja",
    addressRegion: "Quilmes, Buenos Aires",
    addressCountry: "AR",
  },
  areaServed: ["Capital Federal", "GBA"],
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body className={inter.className}>
        {/* JSON-LD global */}
        <JsonLd data={orgLd} />

        <Header />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XM7QCMV29D"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-XM7QCMV29D', {
              anonymize_ip: true,
              page_path: window.location.pathname
            });
          `}
        </Script>

        <Suspense fallback={null}>
        {/* GA4: escucha de cambios de ruta */}
        <GA4RouteListener measurementId="G-XM7QCMV29D" />
        </Suspense>

        {children}

        <Footer />

        {/* GA4 base */}

        {/* FAB WhatsApp en todo el sitio */}
        <WhatsAppButton />
        
      </body>
    </html>
  );
}
