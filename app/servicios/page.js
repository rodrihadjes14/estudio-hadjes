import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata() {
  return pageMeta({
    title: "Servicios",
    description: "Accidentes de trabajo, despidos, enfermedades laborales, reclamos a ART, accidentes de tránsito y defensa del consumidor.",
    path: "/servicios",
  });
}

export default function Servicios() {
  const items = Object.entries(SERVICES);
  return (
    <main style={{maxWidth:960, margin:"40px auto", padding:"0 16px"}}>
      <h1>Servicios</h1>
      <ul>
        {items.map(([slug, s]) => (
          <li key={slug} style={{margin:"10px 0"}}>
            <Link href={`/servicios/${slug}`}><strong>{s.h1}</strong></Link>
            <p style={{margin:"6px 0"}}>{s.metaDescription}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default function Home() {
  return (
    <div className="container">
      <main>
        <h1>Bienvenido a Estudio Hadjes</h1>
        <p>Abogados especializados en accidentes de trabajo y derecho laboral en CABA y GBA.</p>
        <a href="/contacto" className="btn">Contáctanos</a>
      </main>
    </div>
  );
}
