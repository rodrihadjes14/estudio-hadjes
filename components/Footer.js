import { NAP } from "@/lib/services";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";


export default function Footer() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // JSON-LD Organization (E-E-A-T / NAP consistente)
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NAP.name || "Estudio Hadjes",
    url: base,
    // Reemplazá por un logo real cuando lo tengas en /public
    logo: `${base}/favicon.ico`,
    sameAs: [
      // Agregá perfiles reales cuando existan:
      // "https://www.facebook.com/...",
      // "https://www.instagram.com/...",
      // "https://www.linkedin.com/company/...",
      // "https://g.page/..."
    ],
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
    <footer style={{borderTop:"1px solid #333", marginTop:40}}>
      <div style={{maxWidth:1200, margin:"0 auto", padding:"16px"}}>
        {/* Bloque NAP visible (consistencia local) */}
        <p style={{margin:"6px 0"}}><strong>{NAP.name}</strong></p>
        <p style={{margin:"6px 0"}}>
          Dirección: {NAP.address} · Tel: {NAP.phone} · Email: {NAP.email}
        </p>
        <p style={{margin:"6px 0"}}>Matrícula profesional: {NAP.matricula}</p>
        <nav style={{marginTop:8}}>
          <Link href="/servicios" style={{marginRight:16}}>Servicios</Link>
          <Link href="/blog" style={{marginRight:16}}>Blog</Link>
          <Link href="/faq" style={{marginRight:16}}>FAQ</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
        <small style={{display:"block", marginTop:8, opacity:0.8}}>
          Atención {(NAP.areaServed || []).join(" y ")} — © {new Date().getFullYear()} {NAP.name}
        </small>

        {/* JSON-LD en <body> (válido para Google) */}
        <JsonLd data={orgLd} />
      </div>
    </footer>
  );
}
