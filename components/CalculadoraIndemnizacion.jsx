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
    // Acepta sólo 'YYYY-MM-DD' y construye Date local (evita desfases de TZ)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
    const [y, m, d] = str.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return dt;
  }

  function diasEnMes(year, monthIndex0) {
    return new Date(year, monthIndex0 + 1, 0).getDate();
  }

  function finDeMes(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  function diffYMD(a, b) {
    // Diferencia b - a en años, meses, días (calendario)
    let y = b.getFullYear() - a.getFullYear();
    let m = b.getMonth() - a.getMonth();
    let d = b.getDate() - a.getDate();

    if (d < 0) {
      m -= 1;
      const prevMonth = new Date(b.getFullYear(), b.getMonth(), 0);
      d += prevMonth.getDate();
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }
    return { years: y, months: m, days: d };
  }

  function mesesPrecisos(a, b) {
    // Meses (con decimales) entre a y b
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

      // Validaciones de entrada
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

      // Datos derivados
      const antig = diffYMD(ingreso, despido); // {years, months, days}
      const antigMesesPrec = mesesPrecisos(ingreso, despido);

      // Base Art. 245 (MRMNH topeada si corresponde)
      const B = tope ? Math.min(rem, tope) : rem;

      // 1.1 Indemnización por antigüedad (Art. 245 LCT)
      // Años completos = antig.years
      // F = 1 si fracción > 3 meses; caso contrario 0; mínimo 1 sueldo
      const fraccionMeses = antig.months + antig.days / diasEnMes(despido.getFullYear(), despido.getMonth());
      const F = fraccionMeses > 3 ? 1 : 0;
      const baseAnios = antig.years + F;
      const indem245 = Math.max(baseAnios * B, 1 * B);

      // 1.2 Preaviso (Arts. 231–232) — sólo si "sin preaviso"
      // - 15 días si antig < 3 meses
      // - 1 mes si antig ≤ 5 años
      // - 2 meses si antig > 5 años
      let indemPreaviso = 0;
      if (sinPreaviso) {
        const sueldoDiario30 = rem / 30;
        if (antigMesesPrec < 3) {
          // Período de prueba
          indemPreaviso = 15 * sueldoDiario30;
        } else if (antig.years <= 5) {
          indemPreaviso = 1 * rem;
        } else {
          indemPreaviso = 2 * rem;
        }
      }

      // 1.3 Integración del mes de despido (Art. 233) — sólo si "sin preaviso" y no cae último día
      let integracionMes = 0;
      if (sinPreaviso) {
        const lastDay = finDeMes(despido).getDate();
        const diasRestantes = lastDay - despido.getDate();
        if (diasRestantes > 0) {
          const sueldoDiario30 = rem / 30;
          integracionMes = diasRestantes * sueldoDiario30;
        }
      }

      // 1.4 Vacaciones no gozadas proporcionales (Arts. 156 y 155)
      // Días según antigüedad (Art. 150): 14 (<5), 21 (≥5 y <10), 28 (≥10 y <20), 35 (≥20)
      const diasVacacionesPorAntig = (years) => {
        if (years < 5) return 14;
        if (years < 10) return 21;
        if (years < 20) return 28;
        return 35;
      };
      const diasVac = diasVacacionesPorAntig(antig.years);
      const valorDiaVac = rem / 25; // mensualizados (Art. 155 inc. a)
      // Proporción del año trabajado hasta el despido (meses/12 con fracción del mes)
      const despMes = despido.getMonth(); // 0..11
      const despDia = despido.getDate();
      const dimDesp = diasEnMes(despido.getFullYear(), despMes);
      const mesesTrabEnAnio = despMes + despDia / dimDesp; // 0..12
      const vacProporc = diasVac * valorDiaVac * (mesesTrabEnAnio / 12);

      // 1.5 SAC proporcional (Arts. 122–123)
      // Proporción sobre fracción del semestre: rem * (mesesFraccion / 12)
      const semestreInicioMes = despMes < 6 ? 0 : 6; // ene o jul
      const mesesEnSemestre = (despMes - semestreInicioMes) + despDia / dimDesp; // 0..6
      const sacProporc = rem * (mesesEnSemestre / 12);

      // Total
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
    <section id="calc">
      

      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <div style={{ display: "grid", gap: "12px", maxWidth: 560 }}>
          <label>
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

          <label>
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

          <label>
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

          <label>
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
          <small id="ayuda-tope">Si se deja vacío, no se aplica tope.</small>

          <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={sinPreaviso}
              onChange={(e) => setSinPreaviso(e.target.checked)}
            />
            Despido sin preaviso (calcula indemnización sustitutiva e integración del mes)
          </label>

          <div>
            <button type="button" onClick={calcular}>Calcular</button>
          </div>

          {errores.length > 0 && (
            <div role="alert" aria-live="assertive" style={{ color: "#b00020" }}>
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

      <p className="disclaimer" style={{ marginTop: 12 }}>
        Resultado orientativo. Puede variar por CCT, topes, conceptos remunerativos/no remunerativos, y particularidades del caso.
      </p>
    </section>
  );
}
