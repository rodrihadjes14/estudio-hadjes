"use client";
import { useState, useRef } from "react";

export default function Contacto() {
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type:"", msg:"" });
    if (loading) return;
    setLoading(true);

    // Guardar referencia *antes* de los await
    const formEl = formRef.current || e.currentTarget;

    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let body = null;
      try { body = await res.json(); } catch {}

      if (!res.ok) {
        const msg =
          (body && body.error) ||
          (body && body.errors && Object.values(body.errors).flat().join(" · ")) ||
          `Error ${res.status}`;
        setStatus({ type:"error", msg: msg || "Error al enviar" });
        return;
      }

      setStatus({ type:"success", msg:"¡Gracias! Te contactaremos a la brevedad." });

      // ✅ Reset seguro usando la referencia guardada
      if (formEl && typeof formEl.reset === "function") formEl.reset();

      // Evento GA4 opcional
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "lead_submit", { form_location: "contacto" });
      }
    } catch (err) {
      console.error("fetch /api/contact falló:", err);
      setStatus({ type:"error", msg:"Error de red. Intentá nuevamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1>Contacto</h1>
      <p>Contanos tu caso y te responderemos a la brevedad.</p>

      <form ref={formRef} onSubmit={onSubmit} style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Nombre y apellido</label><br />
          <input name="name" required placeholder="Tu nombre" style={{ width:"100%", padding:"8px" }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Email</label><br />
          <input name="email" type="email" required placeholder="tucorreo@ejemplo.com" style={{ width:"100%", padding:"8px" }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Teléfono (opcional)</label><br />
          <input name="phone" placeholder="+54 11 ..." style={{ width:"100%", padding:"8px" }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Mensaje</label><br />
          <textarea name="message" rows={6} required placeholder="Contanos brevemente tu situación..." style={{ width:"100%", padding:"8px" }} />
        </div>

        {/* Honeypot anti-spam: mantener oculto */}
        <input name="website" type="text" style={{ display:"none" }} tabIndex={-1} autoComplete="off" />

        <button type="submit" disabled={loading} style={{ padding:"10px 16px", border:"1px solid #888", borderRadius:6 }}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {status.msg && (
          <p style={{ marginTop: 12, color: status.type === "success" ? "green" : "crimson" }}>
            {status.msg}
          </p>
        )}
      </form>
    </main>
  );
}
