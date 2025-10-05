// components/Footer.js
import { NAP } from "@/lib/services";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

export default function Footer() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NAP.name || "Estudio Hadjes",
    url: base,
    logo: `${base}/favicon.ico`,
    sameAs: [],
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: NAP.phone || "",
      contactType: "customer service",
      areaServed: (NAP.areaServed || []).join(", ") || "AR",
      availableLanguage: ["es"]
    }],
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.address || "",
      addressLocality: "CABA",
      addressCountry: "AR"
    }
  };

  return (
    <footer className="mt-10 border-t border-neutral-700">
      <div className="mx-auto max-w-6xl px-4 py-4 text-sm leading-relaxed">
        <p className="m-0 font-semibold">{NAP.name}</p>
        <p className="m-0 mt-1">
          Dirección: {NAP.address} · Tel: {NAP.phone} · Email: {NAP.email}
        </p>
        <p className="m-0 mt-1">Matrícula profesional: {NAP.matricula}</p>

        <nav className="mt-2 flex gap-4">
          <Link href="/servicios" className="hover:underline underline-offset-2">Servicios</Link>
          <Link href="/blog" className="hover:underline underline-offset-2">Blog</Link>
          <Link href="/faq" className="hover:underline underline-offset-2">FAQ</Link>
          <Link href="/contacto" className="hover:underline underline-offset-2">Contacto</Link>
        </nav>

        <small className="mt-2 block opacity-80">
          Atención {(NAP.areaServed || []).join(" y ")} — © {new Date().getFullYear()} {NAP.name}
        </small>

        <JsonLd data={orgLd} />
      </div>
    </footer>
  );
}
