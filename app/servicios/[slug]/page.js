
import { notFound } from "next/navigation";
import { SERVICES, NAP } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { LeadBlock, BulletList, CtaPrimary } from "@/components/ServiceSeoBlocks";
import Image from "next/image";
import Link from "next/link";



export async function generateStaticParams() {
  return Object.keys(SERVICES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = SERVICES[slug];
  if (!s) return {};
  return pageMeta({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/servicios/${slug}`,
  });
}

export default async function Servicio({ params }) {
  const { slug } = await params;
  const s = SERVICES[slug];
  if (!s) return notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/servicios/${slug}`;

  const legalServiceLd = {
    "@context":"https://schema.org",
    "@type":"LegalService",
    name: `${NAP.name} — ${s.h1}`,
    areaServed: NAP.areaServed,
    url: canonical,
    address: { "@type":"PostalAddress", streetAddress: NAP.address },
    telephone: NAP.phone
  };

  const faqLd = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    mainEntity: (s.faqs||[]).map(q => ({
      "@type":"Question",
      name:q.q,
      acceptedAnswer:{ "@type":"Answer", text:q.a }
    }))
  };

  return (
    <main style={{maxWidth:960, margin:"40px auto", padding:"0 16px", lineHeight:1.7}}>
      {/* JSON-LD válido para Google, en <body> */}
      <JsonLd data={legalServiceLd} />
      <JsonLd data={faqLd} />

      <nav style={{fontSize:14, marginBottom:16}}>
        <Link href="/">Inicio</Link> &nbsp;/&nbsp; <Link href="/servicios">Servicios</Link> &nbsp;/&nbsp; <span>{s.h1}</span>
      </nav>

      <h1>{s.h1}</h1>
      <p>{s.intro}</p>

      {/* ======= BLOQUES SEO ======= */}
      <LeadBlock title="¿Cuándo conviene iniciar el reclamo?">
        <p>
          Cuanto antes reúnas documentación (parte médico, recibos, comunicaciones de la ART/empleador), mejor.
          Te guiamos en los plazos críticos para CABA y GBA y armamos la estrategia probatoria desde el inicio.
        </p>
        <BulletList items={[
          "Parte médico y derivación/atención",
          "Comprobantes de gastos y estudios",
          "Datos de testigos y comunicaciones formales",
        ]}/>
      </LeadBlock>

      <LeadBlock title="Documentación mínima">
        <BulletList items={[
          "Últimos recibos de sueldo y datos del empleador",
          "Constancias/diagnósticos médicos y órdenes",
          "Cartas documento, emails o rechazos de ART",
        ]}/>
      </LeadBlock>

      <LeadBlock title="Cómo trabajamos">
        <p>
          Evaluamos viabilidad, riesgos y montos estimados. Definimos si conviene instancia administrativa o judicial
          y coordinamos estudios médicos. Nuestro enfoque es práctico y orientado a resultados.
        </p>
      </LeadBlock>

      <CtaPrimary>Consulta sin cargo</CtaPrimary>
      {/* ======= FIN BLOQUES SEO ======= */}

      {/* Bloque E-E-A-T visible */}
      <section style={{marginTop:24, padding:"12px 16px", border:"1px solid #444", borderRadius:8}}>
        <h2 style={{marginTop:0}}>Tu equipo legal</h2>
        <p><strong>{NAP.name}</strong>. Matrícula: <strong>{NAP.matricula}</strong>.</p>
        <p>Atendemos {NAP.areaServed.join(" y ")}. Dirección: {NAP.address}. Tel: {NAP.phone}. Email: {NAP.email}.</p>
      </section>

      {/* Interlinking interno recomendado */}
      <LeadBlock title="Recursos relacionados">
        <ul style={{marginTop:8}}>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/servicios">Servicios</Link></li>
          <li><a href="/contacto">Contactanos para evaluar tu caso</a></li>
        </ul>
      </LeadBlock>

      <section style={{marginTop:24}}>
        <h2>Preguntas frecuentes</h2>
        <ul>
          {(s.faqs||[]).map((f,i)=>(
            <li key={i} style={{margin:"10px 0"}}>
              <strong>{f.q}</strong><br/>{f.a}
            </li>
          ))}
        </ul>
      </section>

      <section style={{marginTop:24}}>
        <a href="/contacto" style={{display:"inline-block", padding:"10px 16px", border:"1px solid #888", borderRadius:6}}>
          Consultá tu caso
        </a>
      </section>
    </main>
  );
}
