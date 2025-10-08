// app/faq/page.js
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { FAQS } from "@/lib/faqs";
import FaqAccordion from "@/components/FaqAccordion";


export const revalidate = 60;

export function generateMetadata() {
  return pageMeta({
    title: "Preguntas frecuentes",
    description:
      "Respuestas claras sobre accidentes de trabajo, despidos, ART y procesos en Capital Federal y GBA.",
    path: "/faq",
  });
}



export default function FAQPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: base },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${base}/faq` },
    ],
  };

  return (
    <main className="page-wrap">
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumb visible */}
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span> <span>Preguntas frecuentes</span>
      </nav>

      <h1 className="text-3xl font-semibold">Preguntas frecuentes</h1>

      <section className="section text-center">
      <p className="max-w-2xl mx-auto text-white">
      Te brindamos respuestas a las preguntas mas comunes que hacen nuestros clientes. Vas a encontrar informacion relacionada a la forma de tramitar reclamos, plazos y documentación que tenés que tener en cuenta. Si tu caso requiere análisis específico,{" "}
      <Link href="/contacto" className="link">contactanos</Link>. Tu primer consulta es gratuita. También podés estimar tu caso con la{" "}
      <Link href="/#calc" className="link">calculadora de indemnización</Link>.
      </p>
      </section>


      {/* Acordeón accesible */}
      <section className="section">
        <h2 className="section-title">Respuestas rápidas</h2>
        <FaqAccordion items={FAQS} />
      </section>

      {/* Interlinking interno */}
      <section className="section">
        <h2 className="section-title">Recursos relacionados</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li><Link href="/servicios/accidentes-de-trabajo" className="link">Accidentes de Trabajo</Link></li>
          <li><Link href="/servicios/despidos-sin-causa" className="link">Despidos sin Causa</Link></li>
          <li><Link href="/servicios/reclamos-a-art" className="link">Reclamos a ART</Link></li>
          <li><Link href="/blog" className="link">Blog</Link></li>
          <li><Link href="/#calc" className="link">Calculadora de indemnización</Link></li>
        </ul>
      </section>

      {/* CTA final */}
      <section className="section">
        <Link href="/contacto" className="btn focus-ring">
          Consultá tu caso
        </Link>
      </section>
    </main>
  );
}
