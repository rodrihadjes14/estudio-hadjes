"use client";

import { useMemo, useState } from "react";

/* =========================
   Helpers de validación
   ========================= */

// Verifica formato YYYY-MM-DD y que sea una fecha válida
function safeParseDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(s + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

// Acepta "123456.78", "123.456,78" o "123456" y devuelve Number >= 0
function parseARSNumber(input) {
  if (typeof input === "number") return isFinite(input) && input >= 0 ? input : NaN;
  if (typeof input !== "string") return NaN;
  const trimmed = input.trim();

  // Si viene de <input type="number"> suele ser "123456.78"
  const n1 = Number(trimmed);
  if (!Number.isNaN(n1) && n1 >= 0) return n1;

  // Soporte a formato argentino: "1.234.567,89"
  const normalized = trimmed
    .replace(/\./g, "") // quita separador de miles
    .replace(",", "."); // coma decimal -> punto
  const n2 = Number(normalized);
  return !Number.isNaN(n2) && n2 >= 0 ? n2 : NaN;
}

// Años completos entre fechas (0 si end < start o fechas inválidas)
function yearsBetween(start, end) {
  if (!(start instanceof Date) || isNaN(start)) return 0;
  if (!(end instanceof Date) || isNaN(end)) return 0;
  if (end < start) return 0;
  let y = end.getFullYear() - start.getFullYear();
  const mDiff = end.getMonth() - start.getMonth();
  const dDiff = end.getDate() - start.getDate();
  if (mDiff < 0 || (mDiff === 0 && dDiff < 0)) y -= 1;
  return Math.max(0, y);
}

function formatARS(n) {
  try {
    return n.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    });
  } catch {
    // Fallback simple si el entorno no soporta Intl
    return `ARS ${Math.round(n * 100) / 100}`;
  }
}

// Retorna objeto de errores por campo
function validateFields({ fechaIngreso, fechaDespido, remuneracion }) {
  const errors = {};

  const dIng = safeParseDate(fechaIngreso);
  const dDes = safeParseDate(fechaDespido);
  const R = parseARSNumber(remuneracion);

  if (!fechaIngreso) errors.fechaIngreso = "Ingresá la fecha de ingreso.";
  else if (!dIng) errors.fechaIngreso = "Fecha de ingreso no válida (usar formato AAAA-MM-DD).";

  if (!fechaDespido) errors.fechaDespido = "Ingresá la fecha de despido.";
  else if (!dDes) errors.fechaDespido = "Fecha de despido no válida (usar formato AAAA-MM-DD).";

  if (dIng && dDes && dDes < dIng) {
    errors.fechaDespido = "La fecha de despido debe ser posterior a la fecha de ingreso.";
  }

  if (remuneracion === "" || remuneracion === null || remuneracion === undefined) {
    errors.remuneracion = "Ingresá la remuneración.";
  } else if (Number.isNaN(R)) {
    errors.remuneracion = "Remuneración no válida.";
  } else if (R <= 0) {
    errors.remuneracion = "La remuneración debe ser mayor a 0.";
  }

  return errors;
}

/* =========================
   Componente principal
   ========================= */

export default function CalculadoraIndemnizacion() {
  const [remuneracion, setRemuneracion] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaDespido, setFechaDespido] = useState("");

  const [detalle, setDetalle] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const dIng = useMemo(() => safeParseDate(fechaIngreso), [fechaIngreso]);
  const dDes = useMemo(() => safeParseDate(fechaDespido), [fechaDespido]);

  const anosServicio = useMemo(() => yearsBetween(dIng, dDes), [dIng, dDes]);

  function handleBlur() {
    // Valida onBlur para mostrar ayudas tempranas sin bloquear la edición
    setErrors(validateFields({ fechaIngreso, fechaDespido, remuneracion }));
  }

  function calcular() {
    setSubmitted(true);
    const v = validateFields({ fechaIngreso, fechaDespido, remuneracion });
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setDetalle(null);
      return;
    }

    // Variables seguras
    const R = parseARSNumber(remuneracion);
    const diaDespido = dDes ? dDes.getDate() : 0;

    // Fórmula indicada por el usuario:
    // Total = (Años*R) + (Años>5 ? 2R : 1R) + (diaDespido>30 ? R/30*(30 - diaDespido) : 0) + (R/25) + R
    const c1 = anosServicio * R;
    const c2 = anosServicio > 5 ? 2 * R : 1 * R;
    const c3 = diaDespido > 30 ? (R / 30) * (30 - diaDespido) : 0; // puede ser negativo si el día = 31
    const c4 = R / 25;
    const c5 = R;

    const total = c1 + c2 + c3 + c4 + c5;

    setDetalle({
      R,
      anosServicio,
      diaDespido,
      partes: { c1, c2, c3, c4, c5 },
      total,
    });
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section id="calc">
      <h2 className="section-title">Calculadora de indemnización (Despido)</h2>

      {/* Ayuda general de errores al enviar */}
      {submitted && hasErrors && (
        <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          Revisá los campos marcados para continuar.
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-3 grid gap-3 sm:grid-cols-3"
        noValidate
      >
        <label className="flex flex-col">
          <span className="text-sm">Fecha de ingreso</span>
          <input
            type="date"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            onBlur={handleBlur}
            className="input-base focus-ring mt-1"
            aria-invalid={Boolean(errors.fechaIngreso)}
          />
          {errors.fechaIngreso && (
            <span className="mt-1 text-xs text-red-600">{errors.fechaIngreso}</span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="text-sm">Fecha de despido</span>
          <input
            type="date"
            value={fechaDespido}
            onChange={(e) => setFechaDespido(e.target.value)}
            onBlur={handleBlur}
            className="input-base focus-ring mt-1"
            aria-invalid={Boolean(errors.fechaDespido)}
          />
          {errors.fechaDespido && (
            <span className="mt-1 text-xs text-red-600">{errors.fechaDespido}</span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="text-sm">Remuneración</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Ej: 500000"
            value={remuneracion}
            onChange={(e) => setRemuneracion(e.target.value)}
            onBlur={handleBlur}
            className="input-base focus-ring mt-1"
            aria-invalid={Boolean(errors.remuneracion)}
          />
          {errors.remuneracion && (
            <span className="mt-1 text-xs text-red-600">{errors.remuneracion}</span>
          )}
          <span className="mt-1 text-[11px] text-gray-500">
            Acepta “123456.78” o “123.456,78”.
          </span>
        </label>

        <div className="sm:col-span-3 flex items-end justify-between">
          <div className="text-sm text-gray-600">
            Años de servicio (automático): <strong>{anosServicio}</strong>
          </div>
          <button
            type="button"
            className="btn focus-ring"
            onClick={calcular}
            // Podés deshabilitar si querés bloquear hasta que no haya errores:
            // disabled={hasErrors}
          >
            Calcular
          </button>
        </div>
      </form>

      {detalle && (
        <div id="calc-out" className="mt-4 grid gap-2">
          <h3 className="text-base font-medium">Resultado</h3>
          <div className="rounded-lg border p-3 grid gap-1 text-sm">
            <div>Remuneración (R): <strong>{formatARS(detalle.R)}</strong></div>
            <div>Años de servicio: <strong>{detalle.anosServicio}</strong></div>
            <div>Día del despido: <strong>{detalle.diaDespido || "-"}</strong></div>
            <hr className="my-2" />
            <div>c1 = Años × R: <strong>{formatARS(detalle.partes.c1)}</strong></div>
            <div>c2 = {detalle.anosServicio > 5 ? "2 × R" : "1 × R"}: <strong>{formatARS(detalle.partes.c2)}</strong></div>
            <div>
              c3 = {detalle.diaDespido > 30 ? "(R/30) × (30 − día)" : "0"}:{" "}
              <strong>{formatARS(detalle.partes.c3)}</strong>
            </div>
            <div>c4 = R / 25: <strong>{formatARS(detalle.partes.c4)}</strong></div>
            <div>c5 = R: <strong>{formatARS(detalle.partes.c5)}</strong></div>
            <hr className="my-2" />
            <div className="text-base">
              Total: <strong>{formatARS(detalle.total)}</strong>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Este cálculo es orientativo y sigue la fórmula especificada.
          </p>
        </div>
      )}
    </section>
  );
}
