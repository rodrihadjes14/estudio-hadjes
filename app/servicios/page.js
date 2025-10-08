// app/servicios/page.js
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
export const revalidate = 60;
import serviciosHero from "@/public/hero/servicios.jpg";


export function generateMetadata() {
  return pageMeta({
    title: "Servicios legales",
    description:
      "Asesoramiento a trabajadores en Capital Federal y GBA. Elegí tu servicio para ver pasos, preguntas frecuentes y próximos pasos.",
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
      summary: SERVICES[slug].intro || SERVICES[slug].description || "",
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
    <main className="page-wrap">
      <JsonLd data={breadcrumbLd} />

      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span> <span>Servicios</span>
      </nav>

      <section id="hero" className="hero hero--lg">
      {/* Fondo */}
      <Image
        src={serviciosHero}                // static import => habilita placeholder="blur"
        alt="Servicios legales laborales en Capital Federal y GBA"
        fill
        priority
        sizes="100vw"
        quality={60}                       // reduce peso sin pérdida visible
        placeholder="blur"
        className="hero__img object-center md:object-[50%_30%]" // encuadre (arriba en desktop)
      />

      {/* Overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Contenido centrado */}
      <div className="hero__inner">
        <div>
          <h1 className="hero__title">Servicios legales</h1>
          <p className="hero__subtitle">
            Enfocados en trabajadores de Capital Federal y GBA. Analizamos tu caso, definimos la estrategia
            y te acompañamos durante todo el proceso.
          </p>
          <HeroLeadMiniForm source="hero-servicio" />

          </div>
          </div>
        </section>

      <section className="section">
        <h2 className="section-title">Elegí un servicio</h2>
       

      </section>
    </main>
  );
}
