// app/servicios/page.js
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { LeadBlock } from "@/components/ServiceSeoBlocks";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;

export function generateMetadata() {
  return pageMeta({
    title: "Servicios legales",
    description:
      "Asesoramiento a trabajadores en CABA y GBA. Elegí tu servicio para ver pasos, preguntas frecuentes y próximos pasos.",
    path: "/servicios",
  });
}

export default function ServiciosIndex() {
  // Orden editorial deseado; si algún slug no existe en SERVICES, se omite
  const ORDER = [
    "accidentes-de-trabajo",
    "despidos-sin-causa",
    "enfermedades-laborales",
    "accidentes-de-transito",
    "defensa-al-consumidor",
    "reclamos-a-art",
  ];

  const items = ORDER
    .filter((slug) => SERVICES[slug])
    .map((slug) => ({
      slug,
      title: SERVICES[slug].h1 || SERVICES[slug].title || "Servicio",
    }));

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: base },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${base}/servicios` },
    ],
  };

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <JsonLd data={breadcrumbLd} />

      <nav className="mb-4 text-sm">
  <Link href="/">Inicio</Link> <span className="mx-1">/</span> <span>Servicios</span>
</nav>

      <h1>Servicios legales</h1>

      <LeadBlock title="Cómo trabajamos">
        Enfocados en trabajadores de CABA y GBA. Analizamos tu caso, definimos la estrategia y te
        acompañamos durante todo el proceso.
      </LeadBlock>

      <ul style={{ marginTop: 16, lineHeight: 1.9 }}>
        {items.map((it) => (
          <li key={it.slug}>
            <Link href={`/servicios/${it.slug}`}>{it.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
