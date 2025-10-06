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

// app/servicios/[slug]/page.js
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
      <main className="max-w-2xl mx-auto my-10 px-4">
        <h1 className="text-2xl font-semibold">Servicio no encontrado</h1>
        <p className="mt-2">
          Volvé a la{" "}
          <Link href="/servicios" className="underline underline-offset-2">
            lista de servicios
          </Link>.
        </p>
      </main>
    );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/servicios/${slug}`;

  // Hero (opcional, si existe en SERVICES)
  const heroSrc = svc.hero;
  const heroAlt = svc.heroAlt || svc.h1 || svc.title || "Servicio";

  // JSON-LD: Breadcrumbs + LegalService
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: base },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${base}/servicios` },
      { "@type": "ListItem", position: 3, name: svc.h1 || svc.title, item: canonical },
    ],
  };

  const legalServiceLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `Estudio Hadjes — ${svc.h1 || svc.title}`,
    url: canonical,
    areaServed: "AR",
    serviceType: svc.h1 || svc.title,
  };

  // Contenidos base
  const title = svc.h1 || svc.title || "Servicio";
  const intro = svc.intro || svc.description || "";
  const bullets =
    svc.bullets ||
    (Array.isArray(svc.faqs) ? svc.faqs.map((f) => f.q).filter(Boolean) : []) ||
    [];

  // IL-2: relacionados por servicio
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
    <main className="max-w-3xl mx-auto my-10 px-4 leading-relaxed">
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

      <nav className="mb-4 text-sm">
      <Link href="/">Inicio</Link> <span className="mx-1">/</span>{" "}
      <Link href="/servicios">Servicios</Link> <span className="mx-1">/</span>{" "}
      <span>{title}</span>
      </nav>


      <h1 className="text-2xl font-semibold">{title}</h1>

      <LeadBlock title="¿En qué te ayudamos?">
        {intro}
        {!!bullets.length && <BulletList items={bullets} />}
        <CtaPrimary href="/contacto">Contanos tu caso</CtaPrimary>
      </LeadBlock>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Próximos pasos</h2>
        <BulletList
          items={[
            "Enviá tu consulta con la mayor cantidad de detalles posible.",
            "Te respondemos con una evaluación preliminar.",
            "Te guiamos en los pasos administrativos iniciales.",
          ]}
        />
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Servicios relacionados</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/servicios/${r.slug}`} className="underline underline-offset-2">
                {r.title}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-4 text-lg font-semibold">Recursos</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            <Link href="/faq" className="underline underline-offset-2">
              Preguntas frecuentes
            </Link>
          </li>
          <li>
            <Link href="/#calc" className="underline underline-offset-2">
              Calculadora de indemnización
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="underline underline-offset-2">
              Contactanos
            </Link>
          </li>
        </ul>
      </section>
    </main>

  );
}
