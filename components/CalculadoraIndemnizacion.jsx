"use client";

import { useState } from "react";

export default function CalculadoraIndemnizacion() {
  // Inputs
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaDespido, setFechaDespido] = useState("");
  const [remuneracion, setRemuneracion] = useState("");
  const [tope245, setTope245] = useState("");
  const [sinPreaviso, setSinPreaviso] = useState(true);

  // Salida y errores
  const [errores, setErrores] = useState([]);
  const [resultado, setResultado] = useState(null);

  // ---- Helpers seguros (sin crash) ----
  function parseFechaYYYYMMDD(str) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
    const [y, m, d] = str.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return dt;
  }
  function diasEnMes(year, monthIndex0) { return new Date(year, monthIndex0 + 1, 0).getDate(); }
  function finDeMes(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0); }
  function diffYMD(a, b) {
    let y = b.getFullYear() - a.getFullYear();
    let m = b.getMonth() - a.getMonth();
    let d = b.getDate() - a.getDate();
    if (d < 0) { m -= 1; const prevMonth = new Date(b.getFullYear(), b.getMonth(), 0); d += prevMonth.getDate(); }
    if (m < 0) { y -= 1; m += 12; }
    return { years: y, months: m, days: d };
  }
  function mesesPrecisos(a, b) {
    const { years, months, days } = diffYMD(a, b);
    const baseMonths = years * 12 + months;
    const dim = diasEnMes(b.getFullYear(), b.getMonth());
    return baseMonths + days / dim;
  }
  function formatoARS(n) {
    return n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ---- Cálculo principal ----
  function calcular() {
    try {
      const errs = [];

      const ingreso = parseFechaYYYYMMDD(fechaIngreso);
      if (!ingreso) errs.push("Ingresá una Fecha de Ingreso válida (YYYY-MM-DD).");

      const despido = parseFechaYYYYMMDD(fechaDespido);
      if (!despido) errs.push("Ingresá una Fecha de Despido válida (YYYY-MM-DD).");

      const rem = Number(remuneracion);
      if (!Number.isFinite(rem) || rem <= 0) errs.push("Ingresá una Remuneración válida (número mayor que 0).");

      let tope = tope245 === "" ? null : Number(tope245);
      if (tope245 !== "" && (!Number.isFinite(tope) || tope <= 0)) {
        errs.push("Ingresá un Tope Art. 245 válido (número mayor que 0) o dejalo vacío.");
        tope = null;
      }

      if (ingreso && despido && despido < ingreso) errs.push("La Fecha de Despido debe ser posterior a la Fecha de Ingreso.");

      if (errs.length) {
        setErrores(errs);
        setResultado(null);
        return;
      }

      const antig = diffYMD(ingreso, despido);
      const antigMesesPrec = mesesPrecisos(ingreso, despido);

      const B = tope ? Math.min(rem, tope) : rem;

      const fraccionMeses = antig.months + antig.days / diasEnMes(despido.getFullYear(), despido.getMonth());
      const F = fraccionMeses > 3 ? 1 : 0;
      const baseAnios = antig.years + F;
      const indem245 = Math.max(baseAnios * B, 1 * B);

      let indemPreaviso = 0;
      if (sinPreaviso) {
        const sueldoDiario30 = rem / 30;
        if (antigMesesPrec < 3) {
          indemPreaviso = 15 * sueldoDiario30;
        } else if (antig.years <= 5) {
          indemPreaviso = 1 * rem;
        } else {
          indemPreaviso = 2 * rem;
        }
      }

      let integracionMes = 0;
      if (sinPreaviso) {
        const lastDay = finDeMes(despido).getDate();
        const diasRestantes = lastDay - despido.getDate();
        if (diasRestantes > 0) {
          const sueldoDiario30 = rem / 30;
          integracionMes = diasRestantes * sueldoDiario30;
        }
      }

      const diasVacacionesPorAntig = (years) => {
        if (years < 5) return 14;
        if (years < 10) return 21;
        if (years < 20) return 28;
        return 35;
      };
      const diasVac = diasVacacionesPorAntig(antig.years);
      const valorDiaVac = rem / 25;

      const despMes = despido.getMonth();
      const despDia = despido.getDate();
      const dimDesp = diasEnMes(despido.getFullYear(), despMes);
      const mesesTrabEnAnio = despMes + despDia / dimDesp;
      const vacProporc = diasVac * valorDiaVac * (mesesTrabEnAnio / 12);

      const semestreInicioMes = despMes < 6 ? 0 : 6;
      const mesesEnSemestre = (despMes - semestreInicioMes) + despDia / dimDesp;
      const sacProporc = rem * (mesesEnSemestre / 12);

      const total = indem245 + indemPreaviso + integracionMes + vacProporc + sacProporc;

      setErrores([]);
      setResultado({
        resumen: {
          "Indemnización Art. 245": indem245,
          "Preaviso (Arts. 231–232)": indemPreaviso,
          "Integración mes (Art. 233)": integracionMes,
          "Vacaciones proporcionales (Arts. 156/155)": vacProporc,
          "SAC proporcional (Arts. 122/123)": sacProporc,
        },
        total,
        detalle: {
          antiguedad: `${antig.years} años, ${antig.months} meses, ${antig.days} días`,
          baseArt245: B,
          fraccionMayor3Meses: F === 1 ? "Sí" : "No",
        },
      });
    } catch (e) {
      setErrores(["Ocurrió un error inesperado en el cálculo. Revisá los datos e intentá nuevamente."]);
      setResultado(null);
    }
  }

  return (
    <section id="calc" className="calc">
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="calc-grid">
          <label className="row">
            Fecha de Ingreso
            <input
              type="date"
              name="fechaIngreso"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              required
              aria-invalid={errores.some(x => x.toLowerCase().includes("ingreso"))}
            />
          </label>

          <label className="row">
            Fecha de Despido
            <input
              type="date"
              name="fechaDespido"
              value={fechaDespido}
              onChange={(e) => setFechaDespido(e.target.value)}
              required
              aria-invalid={errores.some(x => x.toLowerCase().includes("despido"))}
            />
          </label>

          <label className="row">
            Remuneración (MRMNH)
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              name="remuneracion"
              value={remuneracion}
              onChange={(e) => setRemuneracion(e.target.value)}
              placeholder="Ej: 650000.00"
              required
              aria-invalid={errores.some(x => x.toLowerCase().includes("remuneración"))}
            />
          </label>

          <label className="row">
            Tope Art. 245 (opcional)
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              name="tope245"
              value={tope245}
              onChange={(e) => setTope245(e.target.value)}
              placeholder="Ej: 900000.00"
              aria-describedby="ayuda-tope"
            />
          </label>

          <small id="ayuda-tope" className="help">Si se deja vacío, no se aplica tope.</small>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={sinPreaviso}
              onChange={(e) => setSinPreaviso(e.target.checked)}
            />
            Despido sin preaviso (calcula indemnización sustitutiva e integración del mes)
          </label>

          <div className="actions">
            <button type="button" onClick={calcular} className="btn">Calcular</button>
          </div>

          {errores.length > 0 && (
            <div role="alert" aria-live="assertive" className="errors">
              {errores.map((er, i) => <div key={i}>• {er}</div>)}
            </div>
          )}

          <div id="calc-out" aria-live="polite">
            {resultado && (
              <div style={{ marginTop: 8 }}>
                <strong>Antigüedad:</strong> {resultado.detalle.antiguedad}<br />
                <strong>Base Art. 245 (B):</strong> ${formatoARS(resultado.detalle.baseArt245)}<br />
                <strong>Fracción &gt; 3 meses:</strong> {resultado.detalle.fraccionMayor3Meses}
                <hr />
                <div>
                  {Object.entries(resultado.resumen).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <span>{k}</span>
                      <span>${formatoARS(v)}</span>
                    </div>
                  ))}
                </div>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                  <span>Total estimado</span>
                  <span>${formatoARS(resultado.total)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      <p className="disclaimer">
        Resultado orientativo. Puede variar por CCT, topes, conceptos remunerativos/no remunerativos, y particularidades del caso.
      </p>

      {/* ====== Estilos: alineación y skins ====== */}
      <style jsx>{`
        .calc {
          background: #f2f2f2;           /* Fondo gris de toda la calculadora */
          padding: 20px 16px;
          border-radius: 12px;
          border: 1px solid #e2e2e2;
          max-width: 640px;
        }
        .calc-grid {
          display: grid;
          gap: 12px;
        }
        /* Cada fila (label + input) es una grilla de 2 columnas:
           - Columna izquierda: texto flexible
           - Columna derecha: input de ancho fijo -> alinea verticalmente todos los inputs */
        .row {
          display: grid;
          grid-template-columns: 1fr 260px; /* controla el ancho común de todos los inputs */
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }
        /* Ayuda y acciones usan el ancho de la "columna derecha" para alinear visualmente */
        .help {
          justify-self: end;              /* se alinea con la columna de inputs */
          width: 260px;                   /* mismo ancho que los inputs */
          color: #555;
        }
        .checkbox {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }
        .actions {
          display: flex;
          justify-content: flex-end;      /* botón a la derecha, bajo la columna de inputs */
        }

        /* Inputs: fondo negro y texto blanco */
        .row :global(input[type="text"]),
        .row :global(input[type="number"]),
        .row :global(input[type="date"]) {
          width: 100%;
          box-sizing: border-box;
          background: #000;
          color: #fff;
          border: 1px solid #444;
          border-radius: 8px;
          padding: 10px 12px;
          outline: none;
        }
        /* Mejora date inputs en dark */
        .row :global(input[type="date"]) {
          color-scheme: dark;
        }
        /* Placeholder legible */
        .row :global(input::placeholder) {
          color: #cfcfcf;
          opacity: 1;
        }
        /* Foco accesible */
        .row :global(input:focus) {
          border-color: #888;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.25);
        }
        /* Error visual si aria-invalid=true */
        .row :global(input[aria-invalid="true"]) {
          border-color: #b00020;
          box-shadow: 0 0 0 3px rgba(176,0,32,0.2);
        }

        .btn {
          background: #111;
          color: #fff;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 10px 14px;
          cursor: pointer;
        }
        .btn:hover { background: #000; }

        .errors { color: #b00020; }

        .disclaimer { margin-top: 12px; }

        /* Responsivo: en pantallas angostas, que el input ocupe todo el ancho */
        @media (max-width: 480px) {
          .row { grid-template-columns: 1fr; }
          .help { justify-self: start; width: 100%; }
          .actions { justify-content: flex-start; }
        }
      `}</style>
    </section>
  );
}
