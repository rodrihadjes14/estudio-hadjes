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
          Volvé a la <Link href="/servicios" className="underline underline-offset-2">lista de servicios</Link>.
        </p>
      </main>
    );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/servicios/${slug}`;

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

  // Contenidos base (fallbacks)
  const title = svc.h1 || svc.title || "Servicio";
  const intro = svc.intro || svc.description || "";
  const bullets =
    svc.bullets ||
    (Array.isArray(svc.faqs) ? svc.faqs.map((f) => f.q).filter(Boolean) : []) ||
    [];

  const heroSrc = svc.hero; // e.g. "/img/servicios/accidentes.jpg"
  const heroAlt = svc.heroAlt || title;

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
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <JsonLd data={breadcrumbLd} />
      <JsonLd data={legalServiceLd} />

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
        <h2 className="text-xl font-semibold">Recursos relacionados</h2>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <Link href="/faq" className="underline underline-offset-2">Preguntas frecuentes</Link>
          </li>
          <li>
            <Link href="/blog" className="underline underline-offset-2">Artículos</Link>
          </li>
          <li>
            <Link href="/" className="underline underline-offset-2">Volver al inicio</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
