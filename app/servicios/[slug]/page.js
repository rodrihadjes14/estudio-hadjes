// app/servicios/[slug]/page.js
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { LeadBlock, BulletList, CtaPrimary } from "@/components/ServiceSeoBlocks";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { getHelpH2 } from "@/lib/serviceCopy";
import FaqAccordion from "@/components/FaqAccordion";
import HeroLeadMiniForm from "@/components/HeroLeadMiniForm";




export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const { slug } = params || {};
  const svc = SERVICES[slug];
  if (!svc) return {};

  return pageMeta({
    title: svc.metaTitle || `${svc.h1} en Capital Federal y GBA`,
    description: svc.metaDescription || svc.intro || "",
    path: `/servicios/${slug}`,
    ogImage: `/servicios/${slug}/opengraph-image`, // ✅ dinámico
  });
}


export default function ServicePage({ params }) {
  const { slug } = params || {};
  const svc = SERVICES[slug];
  const helpH2 = getHelpH2(slug, svc);



  if (!svc) {
    return (
      <main className="page-wrap">
        <h1 className="text-2xl font-semibold">Servicio no encontrado</h1>
        <p className="mt-2">
          Volvé a la{" "}
          <Link href="/servicios" className="link">
            lista de servicios
          </Link>.
        </p>
      </main>
    );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/servicios/${slug}`;

  // Hero (convención de archivos en /public/hero/<slug>.jpg)
const title   = svc.h1 || svc.title || "Servicio";
const intro   = svc.intro || svc.description || "";
const sub = svc.sub || "";
const heroSrc = `/hero/${slug}.jpg`;          // requiere el archivo en /public/hero/
const heroAlt = svc.heroAlt || title;
const heroPos = svc.heroPos || "object-center"; // opcional: encuadre (object-top/bottom/…)


  // JSON-LD
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: base },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${base}/servicios` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };

  const legalServiceLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `Estudio Hadjes — ${title}`,
    url: canonical,
    areaServed: "AR",
    serviceType: title,
  };

  // Bullets base
  const bullets =
    svc.bullets ||
    (Array.isArray(svc.faqs) ? svc.faqs.map((f) => f.q).filter(Boolean) : []) ||
    [];

    const faqs = Array.isArray(svc?.faqs)
  ? svc.faqs
      .map((f) => (f ? { q: String(f.q || "").trim(), a: String(f.a || "").trim() } : null))
      .filter((f) => f && f.q && f.a)
  : [];


  // Relacionados
  const RELATED_MAP = {
    "accidentes-de-trabajo": ["reclamos-a-art", "enfermedades-laborales", "despidos-sin-causa"],
    "despidos-sin-causa": ["accidentes-de-trabajo", "reclamos-a-art", "defensa-al-consumidor"],
    "enfermedades-laborales": ["accidentes-de-trabajo", "reclamos-a-art", "despidos-sin-causa"],
    "accidentes-de-transito": ["defensa-al-consumidor", "despidos-sin-causa", "accidentes-de-trabajo"],
    "defensa-al-consumidor": ["accidentes-de-transito", "despidos-sin-causa", "reclamos-a-art"],
    "reclamos-a-art": ["accidentes-de-trabajo", "enfermedades-laborales", "despidos-sin-causa"],
  };

  const relatedSlugs =
    RELATED_MAP[slug] ||
    Object.keys(SERVICES).filter((s) => s !== slug).slice(0, 3);

  const related = relatedSlugs
    .map((s) => ({ slug: s, title: SERVICES[s]?.h1 || SERVICES[s]?.title }))
    .filter(Boolean);

  return (
    <main className="page-wrap">
      {/* JSON-LD */}
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={legalServiceLd} />

      {/* Breadcrumb visible (debajo del header) */}
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span>{" "}
        <Link href="/servicios">Servicios</Link> <span className="mx-1">/</span>{" "}
        <span>{title}</span>
      </nav>

      {/* HERO unificado */}
      <section id="hero" className="hero hero--lg">
  {heroSrc && (
    <Image
      src={heroSrc}
      alt={heroAlt}
      fill
      priority
      sizes="100vw"
      quality={60}
      className={`hero__img ${heroPos}`} // p.ej. 'object-center' / 'object-[50%_30%]'
    />
  )}

  <div className="hero__overlay" aria-hidden="true" />

  {/* Contenido centrado (usa utilidades globales hero__inner/hero__title/hero__subtitle) */}
  <div className="hero__inner">
    <div>
      <h1 className="hero__title">{title}</h1>
      {intro && <p className="hero__subtitle">{intro}</p>}

      <HeroLeadMiniForm source="hero-servicio" />

    </div>
  </div>
    </section>


        
    <section className="section">
      <h2 className="section-title">{helpH2}</h2>


      {sub && (
     <p className="mt-2 text-base leading-relaxed text-white text-center">
      {sub}
      </p>
      )}

      {/* Texto/CTA igual que antes */} 
      <div className="mt-4 flex justify-center">
        <CtaPrimary href="/contacto">Contanos tu caso</CtaPrimary>
      </div>

      {/* NUEVO: Acordeón de preguntas y respuestas (igual que Home/FAQ) */}
      {faqs.length > 0 && (
      <div className="mt-4 text-white">
    <FaqAccordion items={faqs} />
      </div>
    )}

      </section>


      {/* Próximos pasos */}
    <section className="section text-center">
      <h2 className="section-title">Próximos pasos</h2>
      <div className="card mt-2 centered-list text-white">
      <BulletList
      items={[
        "Enviá tu consulta con la mayor cantidad de detalles posible.",
        "Te respondemos con una evaluación preliminar.",
        "Te guiamos en los pasos administrativos iniciales.",
      ]}
      />
    </div>
    </section>


      {/* Relacionados + recursos */}
      <section className="section">
        <h2 className="section-title">Servicios relacionados</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/servicios/${r.slug}`} className="link">
                {r.title}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold">Recursos</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            <Link href="/faq" className="link">
              Preguntas frecuentes
            </Link>
          </li>
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
      </section>
    </main>
  );
}
