"use client";

import { useState } from "react";

export default function HeroLeadMiniForm({ source = "hero" }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState({ type: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "idle", msg: "" });

    const form = e.currentTarget;
    const fd   = new FormData(form);

    // Honeypot
    if (fd.get("website")) {
      setStatus({ type: "error", msg: "Error de validación." });
      return;
    }

    const name  = (fd.get("name")  || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();

    // Validaciones mínimas y seguras
    const phoneDigits = phone.replace(/\D/g, "");
    if (name.length < 3) {
      setStatus({ type: "error", msg: "Ingresá tu nombre y apellido." });
      return;
    }
    if (phoneDigits.length < 6) {
      setStatus({ type: "error", msg: "Ingresá un teléfono válido." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead-hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.ok !== true) {
        throw new Error(body?.error || "No se pudo enviar el formulario.");
      }

      setStatus({ type: "success", msg: "Gracias. Te contactaremos a la brevedad." });
      form.reset();
    } catch (err) {
      setStatus({ type: "error", msg: err?.message || "Error inesperado. Intentá nuevamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto mt-3 max-w-sm grid gap-3 text-left">
      <label className="flex flex-col">
        <span className="sr-only">Nombre y apellido</span>
        <input
          name="name"
          required
          placeholder="Nombre y apellido"
          className="input-base focus-ring mt-1 bg-white text-neutral-900 placeholder-neutral-500"
        />
      </label>

      <label className="flex flex-col">
        <span className="sr-only">Número de teléfono</span>
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          placeholder="Número de teléfono"
          className="input-base focus-ring mt-1 bg-white text-neutral-900 placeholder-neutral-500"
        />
      </label>

      {/* Honeypot anti-spam (no completar) */}
      <input name="website" type="text" className="sr-only" tabIndex={-1} autoComplete="off" />

      <div className="flex justify-center">
        <button type="submit" disabled={loading} className="btn focus-ring bg-white text-neutral-900 hover:bg-white/90">
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {/* Mensaje inline (verde en éxito) */}
      {status.type !== "idle" && (
        <div
          className={
            status.type === "success"
              ? "rounded-md border border-green-200 bg-green-50 text-green-700 p-3 text-center"
              : "rounded-md border border-red-200 bg-red-50 text-red-700 p-3 text-center"
          }
          role="status"
          aria-live="polite"
        >
          {status.msg}
        </div>
      )}
    </form>
  );
}
