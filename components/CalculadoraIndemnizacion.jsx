// components/CalculadoraIndemnizacion.js
"use client";

import { useState } from "react";

export default function CalculadoraIndemnizacion() {
  const [sueldo, setSueldo] = useState("");
  const [antiguedad, setAntiguedad] = useState("");
  const [estimado, setEstimado] = useState("");

  function calcularEstimado() {
    const s = Number(sueldo || 0);
    const a = Number(antiguedad || 0);

    // ⚠️ Lógica básica actual: sueldo * años
    // Luego se puede reemplazar con fórmula oficial LRT
    const e = Math.max(0, s * a);
    setEstimado(e ? `Estimado: $ ${e.toLocaleString("es-AR")}` : "");
  }

  return (
    <section id="calc">
      <h2>Calculadora de indemnización (estimativo)</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Sueldo bruto promedio:
          <input
            type="number"
            name="sueldo"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            placeholder="Ej: 500000"
          />
        </label>
        <label>
          Años de antigüedad:
          <input
            type="number"
            name="antiguedad"
            value={antiguedad}
            onChange={(e) => setAntiguedad(e.target.value)}
            placeholder="Ej: 3"
          />
        </label>
        <button type="button" onClick={calcularEstimado}>
          Calcular
        </button>
        <div id="calc-out" aria-live="polite">{estimado}</div>
      </form>
      <p className="disclaimer">
        El resultado es orientativo y no reemplaza el asesoramiento profesional.
      </p>
    </section>
  );
}
