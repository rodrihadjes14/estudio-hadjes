import { pageMeta } from "@/lib/seo";

export async function generateMetadata() {
  return pageMeta({
    title: "Contacto",
    description: "Contactanos para consultas legales laborales en Capital Federal y GBA.",
    path: "/contacto",
  });
}
