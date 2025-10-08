// app/contacto/page.js
"use client";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Contacto() {
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    if (loading) return;
    setLoading(true);

    const formEl = formRef.current || e.currentTarget;
    const form = new FormData(formEl);

    // Honeypot anti-spam
    if (form.get("website")) {
      setStatus({ type: "error", msg: "Error al enviar." });
      setLoading(false);
      return;
    }

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
        setStatus({ type: "error", msg: msg || "Error al enviar" });
        return;
      }

      setStatus({ type: "success", msg: "¡Gracias! Te contactaremos a la brevedad." });
      if (formEl && typeof formEl.reset === "function") formEl.reset();

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "lead_submit", { form_location: "contacto" });
      }
    } catch (err) {
      console.error("fetch /api/contact falló:", err);
      setStatus({ type: "error", msg: "Error de red. Intentá nuevamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      {/* Breadcrumb visible */}
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span> <span>Contacto</span>
      </nav>

      <h1 className="text-3xl font-semibold">Contacto</h1>

      <section className="section section-center">
        <p className="max-w-2xl">
          Contanos tu caso y te respondemos a la brevedad. También podés usar la{" "}
          <Link href="/#calc" className="link">calculadora de indemnización</Link>.
        </p>

        <form ref={formRef} onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          {/* dentro del form de /contacto */}
        <input type="hidden" name="form_location" value="contacto" />

          <label className="flex flex-col">
            <span className="text-sm">Nombre y apellido</span>
            <input
              name="name"
              required
              placeholder="Tu nombre"
              autoComplete="name"
              className="input-base focus-ring mt-1"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="tucorreo@ejemplo.com"
              autoComplete="email"
              className="input-base focus-ring mt-1"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm">Teléfono (opcional)</span>
            <input
              name="phone"
              placeholder="+54 11 ..."
              autoComplete="tel"
              className="input-base focus-ring mt-1"
            />
          </label>

          <label className="flex flex-col sm:col-span-2">
            <span className="text-sm">Mensaje</span>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Contanos brevemente tu situación..."
              className="input-base focus-ring mt-1"
            />
          </label>

          {/* Honeypot */}
          <input
            name="website"
            type="text"
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="btn focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>

            <div aria-live="polite" className="mt-2">
              {status.msg && (
                <p className={status.type === "success" ? "text-green-500" : "text-red-500"}>
                  {status.msg}
                </p>
              )}
            </div>
          </div>
        </form>
      </section>

      <section className="section">
        <h2 className="section-title">Otras vías</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Email:{" "}
            <a href="mailto:info@estudiohadjes.com.ar" className="link">
              info@estudiohadjes.com.ar
            </a>
          </li>
          <li>
            Teléfono/WhatsApp:{" "}
            <a href="tel:+541130261498" className="link">
              +54 11 3026 1498
            </a>
          </li>
          <li>
            <Link href="/faq" className="link">
              Preguntas frecuentes
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
