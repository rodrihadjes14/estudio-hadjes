// app/faq/page.js
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;

export function generateMetadata() {
  return pageMeta({
    title: "Preguntas Frecuentes (FAQ)",
    description:
      "Respuestas claras sobre accidentes de trabajo, despidos, ART y procesos en CABA y GBA.",
    path: "/faq",
  });
}

// Ajustá/extendé las preguntas según tus casos reales
const FAQS = [
  {
    q: "¿Cómo sé si me corresponde indemnización?",
    a: "Depende del tipo de despido, tu antigüedad y remuneración. Evaluamos tu caso y te orientamos con precisión.",
  },
  {
    q: "¿Qué hago si tuve un accidente en el trabajo?",
    a: "Informalo de inmediato al empleador y solicitá derivación médica por ART. Guardá toda la documentación.",
  },
  {
    q: "¿Cuánto tarda el trámite?",
    a: "Varía según el tipo de reclamo y la instancia (administrativa o judicial). Te damos una estimación en la primera consulta.",
  },
  {
    q: "¿Atienden en CABA y GBA?",
    a: "Sí. Podemos coordinar atención remota y presencial.",
  },
  {
    q: "¿Qué documentación tengo que reunir?",
    a: "Recibos de sueldo, comunicaciones con el empleador o ART, informes/constancias médicas y cualquier evidencia relevante.",
  },
];

export default function FAQPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // JSON-LD: FAQPage
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // JSON-LD: Breadcrumbs
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: base },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${base}/faq` },
    ],
  };

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px", lineHeight: 1.7 }}>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <nav style={{ fontSize: 14, marginBottom: 16 }}>
        <Link href="/">Inicio</Link> &nbsp;/&nbsp; <span>Preguntas frecuentes</span>
      </nav>

      <h1>Preguntas frecuentes</h1>
      <p>
        Respuestas breves y claras a las consultas más comunes. Si tu caso requiere análisis específico,{" "}
        <Link href="/contacto">contactanos</Link>. También podés estimar tu caso con la{" "}
        <Link href="/#calc">calculadora de indemnización</Link>.
      </p>

      <section style={{ marginTop: 24 }}>
        {FAQS.map((f, i) => (
          <details key={i} style={{ margin: "16px 0", padding: "12px 16px", border: "1px solid #444", borderRadius: 8 }}>
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>{f.q}</summary>
            <div style={{ marginTop: 8 }}>{f.a}</div>
          </details>
        ))}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Recursos relacionados</h2>
        <ul>
          <li><Link href="/servicios/accidentes-de-trabajo">Accidentes de Trabajo</Link></li>
          <li><Link href="/servicios/despidos-sin-causa">Despidos sin Causa</Link></li>
          <li><Link href="/servicios/reclamos-a-art">Reclamos a ART</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/#calc">Calculadora de indemnización</Link></li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <Link href="/contacto" style={{ display: "inline-block", padding: "10px 16px", border: "1px solid #888", borderRadius: 6 }}>
          Consultá tu caso
        </Link>
      </section>
    </main>
  );
}
