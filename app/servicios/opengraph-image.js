// app/servicios/[slug]/opengraph-image.js
import { ImageResponse } from "next/og";
import { SERVICES } from "@/lib/services";

// ✅ App Router: exports válidos
export const runtime = "edge";
export const revalidate = 3600;          // 1 hora (literal, no 60*60)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function GET(req, { params }) {
  const { slug } = params || {};
  const svc = SERVICES[slug] || {};
  const title = svc.h1 || svc.title || "Servicio legal";
  const subtitle = svc.intro || "Asesoramiento en CABA y GBA";

  // Si querés usar la hero del servicio como fondo:
  const origin = new URL(req.url).origin;
  const bg = svc.hero ? `${origin}${svc.hero}` : null; // ej: /hero/accidentes-trabajo.jpg

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#0a0a0a",
          color: "#fff",
          position: "relative",
        }}
      >
        {bg && (
          // Fondo opcional con leve opacidad
          <img
            src={bg}
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              objectFit: "cover",
              opacity: 0.35,
            }}
          />
        )}
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.92 }}>
          {subtitle}
        </div>
        <div style={{ position: "absolute", bottom: 32, left: 64, fontSize: 24, opacity: 0.9 }}>
          Estudio Hadjes
        </div>
      </div>
    ),
    size
  );
}
