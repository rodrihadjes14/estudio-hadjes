 import { pageMeta } from "@/lib/seo";
 import JsonLd from "@/components/JsonLd";
 import Link from "next/link";

 const FAQS = [
   { q: "¿La consulta inicial tiene costo?", a: "Ofrecemos una orientación inicial sin cargo para evaluar tu situación y próximos pasos." },
   { q: "¿Atienden en CABA y GBA?", a: "Sí. Atendemos tanto en CABA como en GBA. Podemos coordinar atención remota y presencial." },
   { q: "¿Qué documentación debo reunir para empezar?", a: "Recibos de sueldo, comunicaciones con el empleador o ART, informes o constancias médicas y cualquier otra evidencia relevante." },
   { q: "¿Cómo es el proceso ante la ART por accidentes o enfermedades?", a: "Asistimos en la denuncia, seguimiento de prestaciones y, si corresponde, impugnación y reclamos ante la Superintendencia." },
   { q: "¿Cuánto tarda un reclamo laboral?", a: "Depende del caso, la vía administrativa o judicial elegida y la prueba. Te explicamos escenarios y tiempos estimados." },
 ];

 export async function generateMetadata() {
   return pageMeta({
     title: "Preguntas frecuentes",
     description: "FAQ del Estudio: alcance de atención, documentación, ART, plazos y orientación inicial sin cargo.",
     path: "/faq",
   });
 }

 export default function FAQPage() {
-  const faqLd = {
+  const faqLd = {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     mainEntity: FAQS.map(item => ({
       "@type": "Question",
       name: item.q,
       acceptedAnswer: { "@type": "Answer", text: item.a }
     }))
   };
+  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
+  const breadcrumbLd = {
+    "@context": "https://schema.org",
+    "@type": "BreadcrumbList",
+    itemListElement: [
+      { "@type": "ListItem", position: 1, name: "Inicio", item: base },
+      { "@type": "ListItem", position: 2, name: "FAQ", item: `${base}/faq` },
+    ],
+  };

   return (
-    <main style={{maxWidth: 960, margin: "40px auto", padding: "0 16px", lineHeight: 1.7}}>
-      <JsonLd data={faqLd} />
-      <nav style={{fontSize:14, marginBottom:16}}>
-        <Link href="/">Inicio</Link> &nbsp;/&nbsp; <span>Preguntas frecuentes</span>
-      </nav>
+    <main style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px", lineHeight: 1.7 }}>
+      <JsonLd data={faqLd} />
+      <JsonLd data={breadcrumbLd} />
+      <nav style={{ fontSize: 14, marginBottom: 16 }}>
+        <Link href="/">Inicio</Link> &nbsp;/&nbsp; <span>Preguntas frecuentes</span>
+      </nav>

       <h1>Preguntas frecuentes</h1>
-      <p>Respuestas breves y claras a las consultas más comunes. Si tu caso requiere análisis específico, <a href="/contacto">contactanos</a>.</p>
+      <p>
+        Respuestas breves y claras a las consultas más comunes. Si tu caso requiere análisis específico,{" "}
+        <Link href="/contacto">contactanos</Link>. También podés estimar tu caso con la{" "}
+        <Link href="/#calc">calculadora de indemnización</Link>.
+      </p>

       <section style={{marginTop:24}}>
-        <ul style={{listStyle:"none", padding:0}}>
-          {FAQS.map((f, i) => (
-            <li key={i} style={{margin:"16px 0", padding:"12px 16px", border:"1px solid #444", borderRadius:8}}>
-              <h2 style={{margin:"0 0 6px 0", fontSize:"1.1rem"}}>{f.q}</h2>
-              <p style={{margin:0}}>{f.a}</p>
-            </li>
-          ))}
-        </ul>
+        {FAQS.map((f, i) => (
+          <details key={i} style={{ margin: "16px 0", padding: "12px 16px", border: "1px solid #444", borderRadius: 8 }}>
+            <summary style={{ cursor: "pointer", fontWeight: 600 }}>{f.q}</summary>
+            <div style={{ marginTop: 8 }}>{f.a}</div>
+          </details>
+        ))}
       </section>

       <section style={{marginTop:24}}>
         <h2>Recursos relacionados</h2>
         <ul>
           <li><Link href="/servicios/accidentes-de-trabajo">Accidentes de Trabajo</Link></li>
           <li><Link href="/servicios/despidos-sin-causa">Despidos sin Causa</Link></li>
           <li><Link href="/servicios/reclamos-a-art">Reclamos a ART</Link></li>
           <li><Link href="/blog">Blog</Link></li>
+          <li><Link href="/#calc">Calculadora de indemnización</Link></li>
         </ul>
       </section>

       <section style={{marginTop:24}}>
-        <a href="/contacto" style={{display:"inline-block", padding:"10px 16px", border:"1px solid #888", borderRadius:6}}>
-          Consultá tu caso
-        </a>
+        <Link href="/contacto" style={{ display: "inline-block", padding: "10px 16px", border: "1px solid #888", borderRadius: 6 }}>
+          Consultá tu caso
+        </Link>
       </section>
     </main>
   );
 }
