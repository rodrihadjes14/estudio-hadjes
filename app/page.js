import Link from "next/link";
import CalculadoraIndemnizacion from "@/components/CalculadoraIndemnizacion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="page-wrap">
    {/* HERO */}
    <section id="hero" className="hero hero--lg">
  {/* Fondo */}
  <Image
    src="/hero/abogado-laboral.jpeg"
    alt="Reclamo ART CABA y GBA"
    fill
    priority
    sizes="100vw"
    className="hero__img"
  />

  {/* Overlay */}
  <div className="hero__overlay" aria-hidden="true" />

  {/* Contenido */}
  <div className="hero__inner">
    <div>
      <h1 className="hero__title">Abogados laborales en CABA y GBA</h1>
      <p className="hero__subtitle">
        Accidentes de trabajo, despidos sin causa y reclamos a ART.
      </p>
      <div className="mt-4 flex justify-center gap-3">
        <Link href="/contacto" className="btn focus-ring bg-white text-neutral-900 hover:bg-white/90">
          Contactanos
        </Link>
        {/* Ancla interna: <a> es correcto */}
        <a href="#lead-form" className="btn focus-ring bg-white/10 hover:bg-white/20">
          Quiero una consulta
        </a>
      </div>
    </div>
  </div>
</section>



      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <h2 className="section-title">Servicios</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="card">
            <h3 className="text-lg font-semibold">Accidentes de trabajo</h3>
            <p className="mt-1 opacity-80">Asesoramiento y reclamos ante ART.</p>
            <Link className="link mt-2 inline-block" href="/servicios/accidentes-de-trabajo">
              Ver más
            </Link>
          </article>

          <article className="card">
            <h3 className="text-lg font-semibold">Despidos sin causa</h3>
            <p className="mt-1 opacity-80">Cálculo de indemnización y acciones.</p>
            <Link className="link mt-2 inline-block" href="/servicios/despidos-sin-causa">
              Ver más
            </Link>
          </article>

          <article className="card">
            <h3 className="text-lg font-semibold">Enfermedades laborales</h3>
            <p className="mt-1 opacity-80">Gestión integral del reclamo.</p>
            <Link className="link mt-2 inline-block" href="/servicios/enfermedades-laborales">
              Ver más
            </Link>
          </article>

          <article className="card">
            <h3 className="text-lg font-semibold">Accidentes de tránsito</h3>
            <p className="mt-1 opacity-80">Defensa y compensaciones.</p>
            <Link className="link mt-2 inline-block" href="/servicios/accidentes-de-transito">
              Ver más
            </Link>
          </article>

          <article className="card">
            <h3 className="text-lg font-semibold">Defensa del consumidor</h3>
            <p className="mt-1 opacity-80">Reclamos por servicios y productos.</p>
            <Link className="link mt-2 inline-block" href="/servicios/defensa-al-consumidor">
              Ver más
            </Link>
          </article>

          <article className="card">
            <h3 className="text-lg font-semibold">Reclamos a ART</h3>
            <p className="mt-1 opacity-80">
              Gestión integral ante la Aseguradora de Riesgos del Trabajo.
            </p>
            <Link className="link mt-2 inline-block" href="/servicios/reclamos-a-art">
              Ver más
            </Link>
          </article>
        </div>
      </section>

      {/* FAQ breve */}
      <section id="faq" className="section">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <div className="mt-4 space-y-3">
          <details className="card">
            <summary className="cursor-pointer font-semibold">
              ¿Cómo sé si me corresponde indemnización?
            </summary>
            <p className="mt-2">
              Depende del tipo de despido y tu antigüedad. Debajo podés estimarla.
            </p>
          </details>
          <details className="card">
            <summary className="cursor-pointer font-semibold">¿Cuánto tarda el trámite?</summary>
            <p className="mt-2">Varía según el caso. Te orientamos en la primera consulta.</p>
          </details>
          <details className="card">
            <summary className="cursor-pointer font-semibold">¿Cuánto cuesta la consulta?</summary>
            <p className="mt-2">La primera consulta es sin costo.</p>
          </details>
        </div>
        <div className="mt-3">
          <Link href="/faq" className="link">
            Ver más preguntas
          </Link>
        </div>
      </section>

      {/* CALCULADORA */}
      <section id="calc" className="section">
        <h2 className="section-title">Calculadora de indemnización</h2>
        <div className="mt-4">
          <CalculadoraIndemnizacion />
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="lead-form" className="section">
        <h2 className="section-title">Solicitá tu consulta</h2>
        <form method="POST" action="/api/contact" className="mt-4 grid gap-3 sm:grid-cols-2">
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

          {/* Honeypot anti-spam */}
          <input name="website" type="text" className="sr-only" tabIndex={-1} autoComplete="off" />

          <div className="sm:col-span-2">
            <button type="submit" className="btn focus-ring">
              Enviar
            </button>
          </div>
        </form>
      </section>

      {/* RECURSOS / INTERLINKING */}
      <section id="recursos" className="section">
        <h2 className="section-title">Recursos útiles</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li><Link href="/servicios/accidentes-de-trabajo" className="link">Accidentes de trabajo</Link></li>
          <li><Link href="/servicios/despidos-sin-causa" className="link">Despidos sin causa</Link></li>
          <li><Link href="/servicios/enfermedades-laborales" className="link">Enfermedades laborales</Link></li>
          <li><Link href="/servicios/accidentes-de-transito" className="link">Accidentes de tránsito</Link></li>
          <li><Link href="/servicios/defensa-al-consumidor" className="link">Defensa del consumidor</Link></li>
          <li><Link href="/servicios/reclamos-a-art" className="link">Reclamos a ART</Link></li>
          <li><Link href="/servicios" className="link">Ver todos los servicios</Link></li>
          <li><Link href="/faq" className="link">Preguntas frecuentes</Link></li>
          <li><Link href="/blog" className="link">Artículos y guías</Link></li>
          <li><a href="#calc" className="link">Calculadora de indemnización</a></li>
          <li><Link href="/contacto" className="link">Contactanos</Link></li>
        </ul>
      </section>
    </main>
  );
}
