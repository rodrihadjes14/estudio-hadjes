// app/contacto/page.js
"use client";
import { useState, useRef } from "react";
import Link from "next/link";

export const revalidate = 60;

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
    <main className="max-w-5xl mx-auto my-10 px-4 leading-relaxed">
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span> <span>Contacto</span>
      </nav>

      <h1 className="text-3xl font-semibold">Contacto</h1>
      <p className="mt-2">
        Contanos tu caso y te respondemos a la brevedad. También podés usar la{" "}
        <Link href="/#calc" className="underline underline-offset-2">
          calculadora de indemnización
        </Link>.
      </p>

      <form ref={formRef} onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm">Nombre y apellido</span>
          <input
            name="name"
            required
            placeholder="Tu nombre"
            autoComplete="name"
            className="mt-1 rounded-md border border-neutral-700 bg-transparent px-3 py-2"
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
            className="mt-1 rounded-md border border-neutral-700 bg-transparent px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm">Teléfono (opcional)</span>
          <input
            name="phone"
            placeholder="+54 11 ..."
            autoComplete="tel"
            className="mt-1 rounded-md border border-neutral-700 bg-transparent px-3 py-2"
          />
        </label>

        <label className="flex flex-col sm:col-span-2">
          <span className="text-sm">Mensaje</span>
          <textarea
            name="message"
            rows={6}
            required
            placeholder="Contanos brevemente tu situación..."
            className="mt-1 rounded-md border border-neutral-700 bg-transparent px-3 py-2"
          />
        </label>

        {/* Honeypot */}
        <input name="website" type="text" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`inline-block rounded-md border border-neutral-500 px-4 py-2 hover:bg-neutral-900 ${loading ? "cursor-not-allowed opacity-60" : ""}`}
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

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Otras vías</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Email:{" "}
            <a href="mailto:info@estudiohadjes.com.ar" className="underline underline-offset-2">
              info@estudiohadjes.com.ar
            </a>
          </li>
          <li>
            Teléfono/WhatsApp:{" "}
            <a href="tel:+5411XXXXXXX" className="underline underline-offset-2">
              +54 11 XXXX-XXXX
            </a>
          </li>
          <li>
            <Link href="/faq" className="underline underline-offset-2">
              Preguntas frecuentes
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
