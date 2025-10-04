import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Accidentes de Trabajo en CABA | Consulta sin cargo",
    description: "LP para campañas: respuesta rápida, WhatsApp y llamada. No indexar.",
    path: "/lp/accidentes-trabajo-caba",
  }),
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function LP() {
  return (
    <main style={{maxWidth: 720, margin: "40px auto", padding: "0 16px", lineHeight: 1.7}}>
      <h1>Accidentes de Trabajo en CABA — Respuesta en el día</h1>
      <p>Atención a trabajadores. Orientación inicial sin cargo. Plazos y pasos claros.</p>

      <div style={{display:"flex", gap:12, marginTop:16}}>
        <a href="/contacto" style={{padding:"10px 16px", border:"1px solid #888", borderRadius:6}}>Escribinos</a>
        <a href="tel:[PLACEHOLDER_TELEFONO]" style={{padding:"10px 16px", border:"1px solid #888", borderRadius:6}}>Llamar ahora</a>
        <a href="https://wa.me/54[NUMERO_SIN_0Y15]" style={{padding:"10px 16px", border:"1px solid #888", borderRadius:6}}>WhatsApp</a>
      </div>

      <ul style={{marginTop:24}}>
        <li>Sin adelantos — honorarios por resultado (según normativa aplicable)</li>
        <li>Gestión ante ART y Superintendencia</li>
        <li>Atención CABA y GBA</li>
      </ul>
    </main>
  );
}
