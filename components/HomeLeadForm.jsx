"use client";

import { useState } from "react";

export default function HomeLeadForm() {
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "idle", msg: "" });

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: si el bot completa "website", abortamos
    if (fd.get("website")) {
      setStatus({ type: "error", msg: "Error de validación." });
      return;
    }

    const payload = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      phone: (fd.get("phone") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
      form_location: "home",
    };

    // Validaciones mínimas de front
    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: "error", msg: "Completá Nombre, Email y Consulta." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body?.ok) {
        throw new Error(body?.error || "No se pudo enviar el formulario.");
      }

      setStatus({ type: "success", msg: "¡Gracias! Tu consulta fue enviada correctamente." });
      form.reset();
    } catch (err) {
      setStatus({ type: "error", msg: err.message || "Error inesperado. Intentá nuevamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-2" noValidate>
      <label className="flex flex-col">
        <span className="text-sm">Nombre</span>
        <input name="name" required className="input-base focus-ring mt-1" />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Email</span>
        <input name="email" type="email" required className="input-base focus-ring mt-1" />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Teléfono</span>
        <input name="phone" type="tel" className="input-base focus-ring mt-1" />
      </label>

      <label className="flex flex-col sm:col-span-2">
        <span className="text-sm">Consulta</span>
        <textarea name="message" rows={4} required className="input-base focus-ring mt-1" />
      </label>

      {/* Honeypot anti-spam (no completar) */}
      <input name="website" type="text" className="sr-only" tabIndex={-1} autoComplete="off" />

      <div className="sm:col-span-2">
        <button type="submit" className="btn focus-ring" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {/* Mensaje de estado en la misma página */}
      {status.type !== "idle" && (
        <div className="sm:col-span-2">
          <div
            className={
              status.type === "success"
                ? "rounded-md border border-green-200 bg-green-50 text-green-700 p-3"
                : "rounded-md border border-red-200 bg-red-50 text-red-700 p-3"
            }
            role="status"
            aria-live="polite"
          >
            {status.msg}
          </div>
        </div>
      )}
    </form>
  );
}
