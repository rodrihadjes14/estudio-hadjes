// app/faq/page.js
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;

export function generateMetadata() {
  return pageMeta({
    title: "Preguntas frecuentes",
    description:
      "Respuestas claras sobre accidentes de trabajo, despidos, ART y procesos en CABA y GBA.",
    path: "/faq",
  });
}

const FAQS = [
  { q: "¿Cómo sé si me corresponde indemnización?", a: "Depende del tipo de despido, tu antigüedad y remuneración. Evaluamos tu caso y te orientamos con precisión." },
  { q: "¿Qué hago si tuve un accidente en el trabajo?", a: "Informalo de inmediato al empleador y solicitá derivación médica por ART. Guardá toda la documentación." },
  { q: "¿Cuánto tarda el trámite?", a: "Varía según el tipo de reclamo y la instancia (administrativa o judicial). Te damos una estimación en la primera consulta." },
  { q: "¿Atienden en CABA y GBA?", a: "Sí. Podemos coordinar atención remota y presencial." },
  { q: "¿Qué documentación tengo que reunir?", a: "Recibos de sueldo, comunicaciones con el empleador o ART, informes/constancias médicas y cualquier evidencia relevante." },
];

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

      <section className="section">
        <p className="max-w-2xl">
          Respuestas breves y claras a las consultas más comunes. Si tu caso requiere análisis específico,{" "}
          <Link href="/contacto" className="link">contactanos</Link>. También podés estimar tu caso con la{" "}
          <Link href="/#calc" className="link">calculadora de indemnización</Link>.
        </p>
      </section>

      {/* Acordeón accesible */}
      <section className="section">
        <h2 className="section-title">Respuestas rápidas</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="card">
              <summary className="cursor-pointer select-none font-semibold">{f.q}</summary>
              <div className="mt-2">{f.a}</div>
            </details>
          ))}
        </div>
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
