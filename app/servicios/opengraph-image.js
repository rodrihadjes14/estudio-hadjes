// app/servicios/[slug]/opengraph-image.js
import { ImageResponse } from "next/og";
import { SERVICES } from "@/lib/services";

export const runtime = "edge";                         // + rápido en el edge
export const size = { width: 1200, height: 630 };     // tamaño OG estándar
export const contentType = "image/png";
export const revalidate = 60 * 60 * 24;               // 1 día (cache en Next)

export default async function OpengraphImage({ params }) {
  const { slug } = params || {};
  const svc = SERVICES[slug];

  const title = svc?.h1 || svc?.title || "Servicio";
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://estudiohadjes.com.ar";

  // Fondo: usamos la misma convención que para el hero.
  // Si definiste svc.hero (ej: "/hero/accidentes-de-trabajo.jpg") se usa; si no, fallback genérico.
  const heroPath = svc?.hero || "/hero/servicios.jpg";
  const bgUrl = heroPath.startsWith("/") ? `${base}${heroPath}` : `${base}/${heroPath}`;

  // (Opcional) fuente para el título; si no existe, lo ignora sin romper
  let interSemiBold = null;
  try {
    interSemiBold = await fetch(
      new URL("../../../fonts/Inter-SemiBold.woff", import.meta.url)
    ).then((r) => r.arrayBuffer());
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center", // podés mover el encuadre: "50% 30%", etc.
        }}
      >
        {/* Cinta inferior oscura para contraste */}
        <div
          style={{
            width: "100%",
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            padding: "36px 48px",
            fontSize: 54,
            lineHeight: 1.1,
            // Si no cargó la fuente, cae en sans-serif del sistema
            fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
            fontWeight: 600,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      // Cache robusto en el edge (Cloudflare lo respeta)
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
      fonts: interSemiBold
        ? [{ name: "Inter", data: interSemiBold, weight: 600, style: "normal" }]
        : [],
    }
  );
}
