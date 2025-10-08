// app/api/lead-hero/route.js
export async function POST(req) {
  try {
    const data = await req.json().catch(() => ({}));

    const name = (data.name || "").toString().trim();
    const phone = (data.phone || "").toString().trim();
    const source = (data.source || "hero").toString();

    // Validaciones de front/back simples y seguras
    const phoneDigits = phone.replace(/\D/g, "");
    if (name.length < 3 || phoneDigits.length < 6) {
      return Response.json(
        { ok: false, error: "Completá nombre y un teléfono válido." },
        { status: 400 }
      );
    }

    const url = process.env.G_SHEETS_WEBAPP_URL;
    if (!url) {
      return Response.json(
        { ok: false, error: "Falta G_SHEETS_WEBAPP_URL en el entorno del servidor." },
        { status: 500 }
      );
    }

    // Payload hacia Apps Script (Google Sheets)
    const payload = {
      name,
      phone,
      form_location: source,            // para identificar origen ("hero")
      timestamp: new Date().toISOString()
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Si tu Apps Script espera form-urlencoded, cambiá a URLSearchParams
      body: JSON.stringify(payload),
      // credentials: "omit"  // Apps Script público no necesita cookies
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return Response.json(
        { ok: false, error: `Sheets WebApp respondió ${r.status}`, details: text },
        { status: 502 }
      );
    }

    // Intentamos parsear JSON, pero si es texto plano no fallamos
    let out = {};
    try { out = await r.json(); } catch { /* ignore */ }

    return Response.json({ ok: true, result: out });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || "Error inesperado." },
      { status: 500 }
    );
  }
}
