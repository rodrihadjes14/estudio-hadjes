// app/servicios/[slug]/page.js
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { LeadBlock, BulletList, CtaPrimary } from "@/components/ServiceSeoBlocks";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const { slug } = params || {};
  const svc = SERVICES[slug];
  if (!svc) return {};
  return pageMeta({
    title: svc.metaTitle || `${svc.h1} en CABA y GBA`,
    description: svc.metaDescription || svc.intro || "",
    path: `/servicios/${slug}`,
    ogImage: `/og/${slug}.jpg`,
  });
}

export default function ServicePage({ params }) {
  const { slug } = params || {};
  const svc = SERVICES[slug];

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

  // Hero opcional
  const heroSrc = svc.hero;
  const title = svc.h1 || svc.title || "Servicio";
  const heroAlt = svc.heroAlt || title;

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

  // Contenido base
  const intro = svc.intro || svc.description || "";
  const bullets =
    svc.bullets ||
    (Array.isArray(svc.faqs) ? svc.faqs.map((f) => f.q).filter(Boolean) : []) ||
    [];

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
      {heroSrc && (
        <div className="mb-4">
          <Image
            src={heroSrc}
            alt={heroAlt}
            width={1200}
            height={630}
            priority
            className="h-auto w-full rounded-lg"
          />
        </div>
      )}

      <JsonLd data={breadcrumbLd} />
      <JsonLd data={legalServiceLd} />

      {/* Breadcrumb visible */}
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span>{" "}
        <Link href="/servicios">Servicios</Link> <span className="mx-1">/</span>{" "}
        <span>{title}</span>
      </nav>

      <h1 className="text-3xl font-semibold">{title}</h1>

      {/* Intro + bullets + CTA (manteniendo tus bloques actuales) */}
      <section className="section">
        <h2 className="section-title">¿En qué te ayudamos?</h2>
        <LeadBlock>
          {intro}
          {!!bullets.length && <BulletList items={bullets} />}
          <CtaPrimary href="/contacto">Contanos tu caso</CtaPrimary>
        </LeadBlock>
      </section>

      {/* Próximos pasos */}
      <section className="section">
        <h2 className="section-title">Próximos pasos</h2>
        <div className="card mt-2">
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
