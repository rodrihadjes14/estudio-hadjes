import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Teléfono inválido").optional().or(z.literal("")),
  message: z.string().min(10, "Contanos un poco más"),
  website: z.string().max(0).optional(), // honeypot: vacío
});

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

export async function POST(req) {
  try {
    const data = await req.json().catch(() => null);
    if (!data) return json({ ok: false, error: "Payload inválido" }, { status: 400 });

    const parsed = ContactSchema.safeParse(data);
    if (!parsed.success) {
      const errs = parsed.error.flatten().fieldErrors;
      return json({ ok: false, errors: errs }, { status: 400 });
    }

    console.log("Lead recibido:", parsed.data);

    // TODO: enviar email / guardar en Sheets
    return json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("Error en /api/contact:", e);
    return json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
