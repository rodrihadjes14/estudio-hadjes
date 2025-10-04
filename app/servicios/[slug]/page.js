// app/servicios/[slug]/page.js
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
      <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
        <h1>Servicio no encontrado</h1>
        <p>
          Volvé a la <Link href="/servicios">lista de servicios</Link>.
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

  // Contenidos base (fallbacks por si faltan claves en SERVICES)
  const title = svc.h1 || svc.title || "Servicio";
  const intro = svc.intro || svc.description || "";
  const bullets =
    svc.bullets ||
    (Array.isArray(svc.faqs) ? svc.faqs.map((f) => f.q).filter(Boolean) : []) ||
    [];

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px", lineHeight: 1.75 }}>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={legalServiceLd} />

      <h1>{title}</h1>

      <LeadBlock title="¿En qué te ayudamos?">
        {intro}
        {!!bullets.length && <BulletList items={bullets} />}
        <CtaPrimary href="/contacto">Contanos tu caso</CtaPrimary>
      </LeadBlock>

      <section style={{ marginTop: 24 }}>
        <h2>Próximos pasos</h2>
        <BulletList
          items={[
            "Enviá tu consulta con la mayor cantidad de detalles posible.",
            "Te respondemos con una evaluación preliminar.",
            "Te guiamos en los pasos administrativos iniciales.",
          ]}
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Recursos relacionados</h2>
        <ul>
          <li>
            <Link href="/faq">Preguntas frecuentes</Link>
          </li>
          <li>
            <Link href="/blog">Artículos</Link>
          </li>
          <li>
            <Link href="/">Volver al inicio</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
