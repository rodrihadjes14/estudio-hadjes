// app/servicios/page.js
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
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
    src="/hero/servicios.jpg" // colocá la imagen en /public/hero/servicios.jpg
    alt="Despido y accidente de trabajo ART CABA GBA"
    fill
    priority
    sizes="100vw"
    className="hero__img"
  />

  {/* Overlay */}
  <div className="hero__overlay" aria-hidden="true" />

  {/* Contenido */}
  <div className="hero__content">
    <h1 className="text-3xl font-semibold">Servicios legales</h1>
    <p className="mt-2 max-w-2xl">
      Enfocados en trabajadores de CABA y GBA. Analizamos tu caso, definimos la estrategia y te
      acompañamos durante todo el proceso.
    </p>
    <div className="mt-4 flex gap-3">
      <Link href="/contacto" className="btn focus-ring bg-white text-neutral-900 hover:bg-white/90">
        Contactanos
      </Link>
      <Link href="/faq" className="btn focus-ring bg-white/10 hover:bg-white/20">
        Ver preguntas
      </Link>
    </div>
  </div>
</section>

      <section className="section">
        <h2 className="section-title">Elegí un servicio</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.slug} className="card">
              <h3 className="text-lg font-semibold">
                <Link href={`/servicios/${it.slug}`} className="link">
                  {it.title}
                </Link>
              </h3>
              {it.summary ? <p className="mt-1 opacity-80">{it.summary}</p> : null}
              <div className="mt-3">
                <Link href={`/servicios/${it.slug}`} className="btn focus-ring">
                  Ver más
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
