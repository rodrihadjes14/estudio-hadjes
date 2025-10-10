// components/Footer.js
import { NAP } from "@/lib/services";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

export default function Footer() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NAP.name || "Tu Abogado Cerca",
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
    <footer className="mt-10 border-t border-neutral-700">
  <div className="page-wrap py-6 text-sm leading-relaxed">
    {/* Grid de 3 columnas en desktop, espaciado uniforme */}
    <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 items-start">
      {/* Columna 1: Información de contacto (exactamente como en la izquierda actual) */}
      <div className="md:px-4">
        <p className="m-0 font-semibold">{NAP.name}</p>
        <p className="m-0 mt-1">
          Dirección: {NAP.address} · Tel: {NAP.phone} · Email: {NAP.email}
        </p>

        <nav className="mt-2 flex gap-4">
          <Link href="/servicios" className="hover:underline underline-offset-2">
            Servicios
          </Link>
          <Link href="/blog" className="hover:underline underline-offset-2">
            Blog
          </Link>
          <Link href="/faq" className="hover:underline underline-offset-2">
            FAQ
          </Link>
          <Link href="/contacto" className="hover:underline underline-offset-2">
            Contacto
          </Link>
        </nav>
      </div>

      {/* Columna 2: Servicios */}
      <div className="md:px-4">
        <h3 className="m-0 font-semibold">Servicios</h3>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>
            <Link href="/servicios/accidentes-de-trabajo" className="link">
              Accidentes de trabajo
            </Link>
          </li>
          <li>
            <Link href="/servicios/despidos-sin-causa" className="link">
              Despidos sin causa
            </Link>
          </li>
          <li>
            <Link href="/servicios/enfermedades-laborales" className="link">
              Enfermedades laborales
            </Link>
          </li>
          <li>
            <Link href="/servicios/accidentes-de-transito" className="link">
              Accidentes de tránsito
            </Link>
          </li>
          <li>
            <Link href="/servicios/defensa-al-consumidor" className="link">
              Defensa al consumidor
            </Link>
          </li>
          <li>
            <Link href="/servicios/reclamos-a-art" className="link">
              Reclamos a ART
            </Link>
          </li>
        </ul>
      </div>

      {/* Columna 3: Recursos útiles */}
      <div className="md:px-4">
        <h3 className="m-0 font-semibold">Recursos útiles</h3>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>
            <Link href="/faq" className="link">
              Preguntas frecuentes
            </Link>
          </li>
          <li>
            <Link href="/blog" className="link">
              Artículos y guías
            </Link>
          </li>
          {/* Ancla a la calculadora: funciona desde cualquier página */}
          <li>
            <Link href="/#calc" className="link">
              Calculadora de indemnización
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="link">
              Contactanos
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <small className="mt-4 block opacity-80">
      Atención {(NAP.areaServed || []).join(" y ")} — © {new Date().getFullYear()} {NAP.name}
    </small>

    <JsonLd data={orgLd} />
  </div>
</footer>

  );
}
