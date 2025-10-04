import Link from "next/link";

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section id="hero">
        <h1>Abogados Laborales en CABA y GBA</h1>
        <p>Accidentes de trabajo, despidos sin causa y reclamos a ART.</p>
        <div>
          <Link href="/contacto" className="btn-primary">Contactanos</Link>
          <a href="#lead-form" className="btn-secondary">Quiero una consulta</a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios">
        <h2>Servicios</h2>
        <div className="grid">
          <article>
            <h3>Accidentes de trabajo</h3>
            <p>Asesoramiento y reclamos ante ART.</p>
            <Link href="/servicios/accidentes-de-trabajo">Ver más</Link>
          </article>
          <article>
            <h3>Despidos sin causa</h3>
            <p>Cálculo de indemnización y acciones.</p>
            <Link href="/servicios/despidos-sin-causa">Ver más</Link>
          </article>
          <article>
            <h3>Enfermedades laborales</h3>
            <p>Gestión integral del reclamo.</p>
            <Link href="/servicios/enfermedades-laborales">Ver más</Link>
          </article>
          <article>
            <h3>Accidentes de tránsito</h3>
            <p>Defensa y compensaciones.</p>
            <Link href="/servicios/accidentes-de-transito">Ver más</Link>
          </article>
          <article>
            <h3>Defensa del consumidor</h3>
            <p>Reclamos por servicios y productos.</p>
            <Link href="/servicios/defensa-del-consumidor">Ver más</Link>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2>Preguntas frecuentes</h2>
        <details>
          <summary>¿Cómo sé si me corresponde indemnización?</summary>
          <p>Depende del tipo de despido y tu antigüedad. Debajo podés estimarla.</p>
        </details>
        <details>
          <summary>¿Cuánto tarda el trámite?</summary>
          <p>Varía según el caso. Te orientamos en la primera consulta.</p>
        </details>
        <details>
          <summary>¿Cuánto cuesta la consulta?</summary>
          <p>La primera consulta es sin costo.</p>
        </details>
      </section>

      {/* CALCULADORA (placeholder simple) */}
      <section id="calc">
        <h2>Calculadora de indemnización (estimativo)</h2>
        <form id="calc-form" onSubmit={(e)=>e.preventDefault()}>
          <label>
            Sueldo bruto promedio:
            <input type="number" name="sueldo" placeholder="Ej: 500000" />
          </label>
          <label>
            Años de antigüedad:
            <input type="number" name="antiguedad" placeholder="Ej: 3" />
          </label>
          <button type="button" onClick={()=>{
            const f = document.getElementById('calc-form');
            const sueldo = Number(f.sueldo.value||0);
            const antig = Number(f.antiguedad.value||0);
            const estimado = Math.max(0, sueldo * antig);
            const out = document.getElementById('calc-out');
            out.textContent = estimado ? `Estimado: $ ${estimado.toLocaleString('es-AR')}` : '';
          }}>Calcular</button>
          <div id="calc-out" aria-live="polite"></div>
        </form>
        <p className="disclaimer">El resultado es orientativo y no reemplaza el asesoramiento profesional.</p>
      </section>

      {/* LEAD FORM */}
      <section id="lead-form">
        <h2>Solicitá tu consulta</h2>
        <form method="POST" action="/api/contact">
          <label>
            Nombre
            <input name="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Teléfono
            <input name="phone" type="tel" />
          </label>
          <label>
            Consulta
            <textarea name="message" rows={4} required />
          </label>
          <button type="submit" className="btn-primary">Enviar</button>
        </form>
      </section>

    </main>
  );
}
