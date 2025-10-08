import copy from "@/lib/service-copy.json";


// Estructura esperada del JSON:
// { "helpH2": { "<slug>": "<texto H2>" } }
export const HELP_H2 = copy?.helpH2 || {};

export function getHelpH2(slug, svc) {
  const fromJson = (HELP_H2[slug] || "").trim();
  if (fromJson) return fromJson;

  const fromSvc = (svc?.helpH2 || "").trim();
  if (fromSvc) return fromSvc;

  return `¿En qué te ayudamos en ${svc?.title || svc?.h1 || "este servicio"}?`;
}

