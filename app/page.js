// app/page.js
import Link from "next/link";
import CalculadoraIndemnizacion from "@/components/CalculadoraIndemnizacion";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto my-10 px-4 leading-relaxed">
      {/* HERO */}
      <section id="hero" className="mb-6 bg-blue-500 text-white">
        <h1 className="text-3xl font-semibold">Abogados Laborales en CABA y GBA</h1>
        <p className="mt-2">Accidentes de trabajo, despidos sin causa y reclamos a ART.</p>
        <div className="mt-3 flex gap-3">
          <Link href="/contacto" className="btn-primary inline-block rounded-md border px-4 py-2">
            Contactanos
          </Link>
          <a href="#lead-form" className="btn-secondary inline-block rounded-md border px-4 py-2">
            Quiero una consulta
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mt-6">
        <h2 className="text-2xl font-semibold">Servicios</h2>
        <div className="grid gap-4 mt-3 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-neutral-700 p-4">
            <h3 className="font-semibold">Accidentes de trabajo</h3>
            <p className="mt-1">Asesoramiento y reclamos ante ART.</p>
            <Link className="underline underline-offset-2 mt-2 inline-block" href="/servicios/accidentes-de-trabajo">
              Ver más
            </Link>
          </article>

          <article className="rounded-lg border border-neutral-700 p-4">
            <h3 className="font-semibold">Despidos sin causa</h3>
            <p className="mt-1">Cálculo de indemnización y acciones.</p>
            <Link className="underline underline-offset-2 mt-2 inline-block" href="/servicios/despidos-sin-causa">
              Ver más
            </Link>
          </article>

          <article className="rounded-lg border border-neutral-700 p-4">
            <h3 className="font-semibold">Enfermedades laborales</h3>
            <p className="mt-1">Gestión integral del reclamo.</p>
            <Link className="underline underline-offset-2 mt-2 inline-block" href="/servicios/enfermedades-laborales">
              Ver más
            </Link>
          </article>

          <article className="rounded-lg border border-neutral-700 p-4">
            <h3 className="font-semibold">Accidentes de tránsito</h3>
            <p className="mt-1">Defensa y compensaciones.</p>
            <Link className="underline underline-offset-2 mt-2 inline-block" href="/servicios/accidentes-de-transito">
              Ver más
            </Link>
          </article>

          <article className="rounded-lg border border-neutral-700 p-4">
            <h3 className="font-semibold">Defensa del consumidor</h3>
            <p className="mt-1">Reclamos por servicios y productos.</p>
            <Link className="underline underline-offset-2 mt-2 inline-block" href="/servicios/defensa-al-consumidor">
              Ver más
            </Link>
          </article>

          <article className="rounded-lg border border-neutral-700 p-4">
            <h3 className="font-semibold">Reclamos a ART</h3>
            <p className="mt-1">Gestión integral ante la Aseguradora de Riesgos del Trabajo.</p>
            <Link className="underline underline-offset-2 mt-2 inline-block" href="/servicios/reclamos-a-art">
              Ver más
            </Link>
          </article>
        </div>
      </section>

      {/* FAQ breve */}
      <section id="faq" className="mt-6">
        <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
        <div className="mt-3 space-y-2">
          <details className="rounded-md border border-neutral-700 p-3">
            <summary className="cursor-pointer font-medium">
              ¿Cómo sé si me corresponde indemnización?
            </summary>
            <p className="mt-2">Depende del tipo de despido y tu antigüedad. Debajo podés estimarla.</p>
          </details>
          <details className="rounded-md border border-neutral-700 p-3">
            <summary className="cursor-pointer font-medium">¿Cuánto tarda el trámite?</summary>
            <p className="mt-2">Varía según el caso. Te orientamos en la primera consulta.</p>
          </details>
          <details className="rounded-md border border-neutral-700 p-3">
            <summary className="cursor-pointer font-medium">¿Cuánto cuesta la consulta?</summary>
            <p className="mt-2">La primera consulta es sin costo.</p>
          </details>
        </div>
      </section>

      {/* CALCULADORA */}
      <CalculadoraIndemnizacion />

      {/* LEAD FORM (envía a /api/contact) */}
      <section id="lead-form" className="mt-6">
        <h2 className="text-2xl font-semibold">Solicitá tu consulta</h2>
        <form method="POST" action="/api/contact" className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm">Nombre</span>
            <input name="name" required className="mt-1 rounded-md border border-neutral-700 px-3 py-2 bg-transparent" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm">Email</span>
            <input name="email" type="email" required className="mt-1 rounded-md border border-neutral-700 px-3 py-2 bg-transparent" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm">Teléfono</span>
            <input name="phone" type="tel" className="mt-1 rounded-md border border-neutral-700 px-3 py-2 bg-transparent" />
          </label>
          <label className="flex flex-col sm:col-span-2">
            <span className="text-sm">Consulta</span>
            <textarea name="message" rows={4} required className="mt-1 rounded-md border border-neutral-700 px-3 py-2 bg-transparent" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary inline-block rounded-md border px-4 py-2">
              Enviar
            </button>
          </div>
        </form>
      </section>

      {/* RECURSOS / INTERLINKING */}
      <section id="recursos" className="mt-8">
        <h2 className="text-2xl font-semibold">Recursos útiles</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li><Link href="/servicios" className="underline underline-offset-2">Ver todos los servicios</Link></li>
          <li><Link href="/faq" className="underline underline-offset-2">Preguntas frecuentes</Link></li>
          <li><Link href="/blog" className="underline underline-offset-2">Artículos y guías</Link></li>
          <li><a href="#calc" className="underline underline-offset-2">Ir a la calculadora de indemnización</a></li>
          <li><Link href="/contacto" className="underline underline-offset-2">Contactanos</Link></li>
        </ul>
      </section>
    </main>
  );
}
