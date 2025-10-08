import Link from "next/link";
import CalculadoraIndemnizacion from "@/components/CalculadoraIndemnizacion";
import Image from "next/image";
import HomeLeadForm from "../components/HomeLeadForm";
import HomeFaqSection from "@/components/HomeFaqSection";
import HeroLeadMiniForm from "@/components/HeroLeadMiniForm";




export default function Home() {
  return (
    <main className="page-wrap">
    {/* HERO */}
    <section id="hero" className="hero hero--lg">
  {/* Fondo */}
  <Image
    src="/hero/abogado-laboral.jpeg"
    alt="Abogado despido Capital Federal"
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
      <h1 className="hero__title">Estudio Hadjes</h1>
      <p className="hero__subtitle">
        Ejerciendo representación de los derechos de los trabajadores, contamos con un grupo experto de abogados laboralistas y de defensa al consumidor. 
      </p>
      <HeroLeadMiniForm source="hero-servicio" />
      </div>
    </div>
  </section>



      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <h2 className="section-title">Servicios</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Link href="/servicios/accidentes-de-trabajo" className="card-link group">
      <h3 className="text-lg font-semibold">Accidentes de trabajo</h3>
      <p className="mt-1 opacity-80">Asesoramiento y reclamos ante ART.</p>
      </Link>

      <Link href="/servicios/despidos-sin-causa" className="card-link group">
      <h3 className="text-lg font-semibold">Despidos sin causa</h3>
      <p className="mt-1 opacity-80">Cálculo de indemnización y acciones.</p>
      </Link>

      <Link href="/servicios/enfermedades-laborales" className="card-link group">
      <h3 className="text-lg font-semibold">Enfermedades laborales</h3>
      <p className="mt-1 opacity-80">Gestión integral del reclamo.</p>
      </Link>

      <Link href="/servicios/accidentes-de-transito" className="card-link group">
      <h3 className="text-lg font-semibold">Accidente de tránsito</h3>
      <p className="mt-1 opacity-80">Defensa y compensaciones.</p>
    </Link>

      <Link href="/servicios/defensa-al-consumidor" className="card-link group">
      <h3 className="text-lg font-semibold">Defensa del consumidor</h3>
      <p className="mt-1 opacity-80">Reclamos por servicios y productos.</p>
      </Link>

      <Link href="/servicios/reclamos-a-art" className="card-link group">
      <h3 className="text-lg font-semibold">Reclamos a ART</h3>
      <p className="mt-1 opacity-80">Gestión integral ante la Aseguradora de Riesgos del Trabajo.</p>
    </Link>
    </div>

      </section>

      {/* FAQ breve */}
        <section id="faq" className="section">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <HomeFaqSection />
        </section>

      {/* CALCULADORA + LEAD FORM (lado a lado) */}
<section id="calc-lead" className="section">
  <div className="page-wrap grid gap-6 lg:grid-cols-2 items-start">
    {/* Columna: CALCULADORA */}
    <div id="calc">
      <h2 className="section-title">Calculadora de Indemnización por Despido</h2>
      <div className="mt-4">
        <CalculadoraIndemnizacion />
      </div>
    </div>

    {/* Columna: LEAD FORM (conservamos el id para el ancla del hero) */}
    {/* LEAD FORM */}
    <div id="lead-form">
    <h2 className="section-title">Hacenos tu consulta gratuita</h2>
    <HomeLeadForm />
    </div>

  </div>
</section>

    </main>
  );
}
