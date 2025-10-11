// components/Footer.js
import { NAP } from "@/lib/services";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

export default function Footer() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NAP.name || "HH Legales",
    url: base,
    logo: `${base}/favicon.ico`,
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: NAP.phone || "+5491130261498",
        contactType: "customer service",
        areaServed: (NAP.areaServed || []).join(", ") || "AR",
        availableLanguage: ["es"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.address || "Hipolito Yrigoyen 766, Planta Baja",
      addressLocality: "Quilmes, Buenos Aires",
      addressCountry: "AR",
    },
  };

  return (
    <footer className="site-footer">
  <div className="site-footer__inner">
    <div className="site-footer__grid">
      {/* Columna 1: Información de contacto */}
      <div className="site-footer__col">
        <p className="m-0 font-semibold">{NAP.name}</p>
        <p className="m-0 mt-1">
          Dirección: {NAP.address} · Tel: {NAP.phone} · Email: {NAP.email}
        </p>

        <nav className="site-footer__nav">
          <Link href="/servicios">Servicios</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>

      {/* Columna 2: Servicios */}
      <div className="site-footer__col">
        <h3 className="site-footer__title">Servicios</h3>
        <ul className="site-footer__list">
          <li><Link href="/servicios/accidentes-de-trabajo" className="link">Accidentes de trabajo</Link></li>
          <li><Link href="/servicios/despidos-sin-causa" className="link">Despidos sin causa</Link></li>
          <li><Link href="/servicios/enfermedades-laborales" className="link">Enfermedades laborales</Link></li>
          <li><Link href="/servicios/accidentes-de-transito" className="link">Accidentes de tránsito</Link></li>
          <li><Link href="/servicios/defensa-al-consumidor" className="link">Defensa al consumidor</Link></li>
          <li><Link href="/servicios/reclamos-a-art" className="link">Reclamos a ART</Link></li>
        </ul>
      </div>

      {/* Columna 3: Recursos útiles */}
      <div className="site-footer__col">
        <h3 className="site-footer__title">Recursos útiles</h3>
        <ul className="site-footer__list">
          <li><Link href="/faq" className="link">Preguntas frecuentes</Link></li>
          <li><Link href="/blog" className="link">Artículos y guías</Link></li>
          <li><Link href="/#calc" className="link">Calculadora de indemnización</Link></li>
          <li><Link href="/contacto" className="link">Contactanos</Link></li>
        </ul>
      </div>
    </div>

    <small className="site-footer__legal">
      Atención {(NAP.areaServed || []).join(" y ")} — © {new Date().getFullYear()} {NAP.name}
    </small>

    <JsonLd data={orgLd} />
  </div>
</footer>


  );
}
