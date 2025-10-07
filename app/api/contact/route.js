// app/api/contact/route.js
import { NextResponse } from "next/server";

// IMPORTANTE: poné en .env.local tu URL del Web App de Apps Script:
const G_SHEETS_WEBAPP_URL = process.env.G_SHEETS_WEBAPP_URL; // ej.: https://script.google.com/macros/s/AKfycbx.../exec

export const runtime = "nodejs"; // asegura runtime Node

async function parsePayload(req) {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  // JSON
  if (ct.includes("application/json")) {
    return await req.json();
  }

  // Form-data o urlencoded
  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData();
    return Object.fromEntries(fd.entries());
  }

  // Intento final (JSON)
  try { return await req.json(); } catch { return null; }
}

function sanitizeString(v) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, 2000);
}

export async function POST(req) {
  try {
    if (!G_SHEETS_WEBAPP_URL) {
      return NextResponse.json({ ok: false, error: "Falta G_SHEETS_WEBAPP_URL" }, { status: 500 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    const payload = await parsePayload(req);
    if (!payload) {
      return NextResponse.json({ ok: false, error: "Carga útil inválida" }, { status: 400 });
    }

    // Honeypot simple
    if (payload.website) {
      return NextResponse.json({ ok: false, error: "Spam detectado" }, { status: 400 });
    }

    // Normalización de campos esperados
    const data = {
      name: sanitizeString(payload.name),
      email: sanitizeString(payload.email),
      phone: sanitizeString(payload.phone),
      message: sanitizeString(payload.message),
      form_location: sanitizeString(payload.form_location || ""), // "home" | "contacto" | etc.
      userAgent: sanitizeString(req.headers.get("user-agent") || ""),
      referer: sanitizeString(req.headers.get("referer") || ""),
      ip,
      timestamp: new Date().toISOString(),
    };

    // Validaciones mínimas
    const errors = [];
    if (!data.name) errors.push("Nombre es requerido.");
    if (!data.email) errors.push("Email es requerido.");
    if (!data.message) errors.push("Mensaje es requerido.");
    if (errors.length) {
      return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
    }

    // Envío a Google Apps Script Web App (escribe en Google Sheets)
    const res = await fetch(G_SHEETS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // timeout “manual” simple
      signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined,
    });

    let body = null;
    try { body = await res.json(); } catch {}

    if (!res.ok || !body?.ok) {
      return NextResponse.json(
        { ok: false, error: body?.error || `Error Sheets ${res.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json({ ok: false, error: "Error inesperado" }, { status: 500 });
  }
}
